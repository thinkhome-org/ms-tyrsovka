"""Rebuild the development graph with Graphify and reviewed semantic evidence.

Run with the Python interpreter containing graphifyy. No API keys required.
Semantic evidence is hash-checked: stale fragments are excluded, never replayed.
"""
import hashlib
import json
import re
import subprocess
from collections import Counter
from pathlib import Path

from graphify.analyze import god_nodes, surprising_connections, suggest_questions
from graphify.build import build_from_json
from graphify.cluster import cluster, score_all
from graphify.detect import detect, save_manifest
from graphify.diagnostics import diagnose_extraction, format_diagnostic_report
from graphify.export import to_json
from graphify.extract import extract
from graphify.report import generate

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "graphify-out"


def key(value):
    return re.sub(r"[^a-z0-9]+", "_", str(value).lower()).strip("_")


def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def write(name, value):
    (OUT / name).write_text(json.dumps(value, ensure_ascii=False, indent=2) + "\n")


def main():
    OUT.mkdir(exist_ok=True)
    detection = detect(ROOT)
    ast = extract([Path(p) for p in detection["files"]["code"]],
                  root=ROOT, cache_root=ROOT, max_workers=4)
    nodes = {n["id"]: n for n in ast["nodes"]}
    edges = ast["edges"]
    hyperedges = []
    stale = []
    semantic = json.loads((OUT / "semantic.json").read_text())
    valid = set()
    for path, expected in semantic["source_hashes"].items():
        source = ROOT / path
        if source.is_file() and digest(source) == expected:
            valid.add(path)
        else:
            stale.append(path)
    for node in semantic["nodes"]:
        if node["source_file"] in valid:
            nodes.setdefault(node["id"], node)
    edges.extend(e for e in semantic["edges"] if e["source_file"] in valid)
    hyperedges.extend(h for h in semantic.get("hyperedges", []) if h["source_file"] in valid)

    def node(nid, label, source, kind="concept", **attrs):
        nodes.setdefault(nid, dict(id=nid, label=label, source_file=source,
                                   source_location="L1", file_type=kind, **attrs))
        return nid

    def edge(source, target, relation, path, line=1):
        edges.append(dict(source=source, target=target, relation=relation,
                          confidence="EXTRACTED", confidence_score=1.0,
                          source_file=path, source_location=f"L{line}", weight=1.0))

    # Git inventory includes lockfiles/CSS which Graphify does not fully parse.
    inventory = subprocess.check_output(
        ["git", "ls-files", "--cached", "--others", "--exclude-standard", "-z"], cwd=ROOT
    ).decode().split("\0")
    inventory = sorted({p for p in inventory if p and not p.startswith("graphify-out/")
                        and (ROOT / p).is_file()})
    file_ids = {}
    for path in inventory:
        nid = "file_" + key(path)
        file_ids[path] = node(nid, path, path, "document", inventory_file=True,
                              sha256=digest(ROOT / path))
    # Materialize AST references omitted by the extractor (external modules,
    # JSON data and CSS); they are references, not invented implementations.
    missing = {e[k] for e in edges for k in ("source", "target") if e[k] not in nodes}
    for nid in missing:
        if nid == "app_globals":
            node(nid, "globals.css", "app/globals.css", "code")
        elif nid == "app_data_aktuality":
            node(nid, "aktuality.json", "app/data/aktuality.json", "code")
        elif nid.startswith("ref_"):
            node(nid, nid.removeprefix("ref_").replace("_", " "), "package.json",
                 external_module_reference=True)
        else:
            evidence = next((e for e in edges if e["target"] == nid
                             and e.get("context") == "import"), None)
            if evidence:
                node(nid, nid.replace("_", "."), evidence["source_file"],
                     external_module_reference=True)
    for n in list(nodes.values()):
        path = n.get("source_file", "")
        if Path(path).is_absolute():
            path = str(Path(path).relative_to(ROOT))
            n["source_file"] = path
        if path in file_ids and n["id"] != file_ids[path]:
            edge(file_ids[path], n["id"], "contains", path)

    routes = {}
    for page in sorted((ROOT / "app").rglob("page.tsx")):
        path = str(page.relative_to(ROOT))
        route = "/" + str(page.parent.relative_to(ROOT / "app")).replace(".", "")
        routes[route] = node(key(path) + "_route", route, path, route=route)
        edge(routes[route], file_ids[path], "implemented_by", path)
        edge(routes[route], file_ids["app/layout.tsx"], "wrapped_by", path)
    for endpoint, source in [("/sitemap.xml", "app/sitemap.ts"), ("/robots.txt", "app/robots.ts")]:
        routes[endpoint] = node(key(source) + "_route", endpoint, source, route=endpoint)
        edge(routes[endpoint], file_ids[source], "implemented_by", source)
    news = json.loads((ROOT / "app/data/aktuality.json").read_text())
    for item in news:
        route = "/aktuality/" + item["slug"]
        nid = node("app_data_aktuality_" + key(item["slug"]), route,
                   "app/data/aktuality.json", route=route)
        routes[route] = nid
        edge(nid, routes["/aktuality/[slug]"], "instantiates", "app/data/aktuality.json")
        edge(file_ids["app/data/aktuality.json"], nid, "defines_article", "app/data/aktuality.json")

    # Literal references are evidence of a reference, not proof of reachability.
    text_suffixes = {".ts", ".tsx", ".mjs", ".css", ".json", ".yaml", ".md", ".py"}
    for path in inventory:
        if Path(path).suffix not in text_suffixes or path in {"package-lock.json", "pnpm-lock.yaml"}:
            continue
        text = (ROOT / path).read_text()
        constants = dict(re.findall(r'const\s+(\w+)\s*=\s*"(https?://[^"\s]+)"', text))
        for match in re.finditer(r'`\$\{(\w+)\}([^`]+)`', text):
            if match.group(1) not in constants:
                continue
            url = constants[match.group(1)] + match.group(2)
            nid = node("external_" + hashlib.sha256(url.encode()).hexdigest()[:16],
                       url, path, source_url=url, external_reference=True)
            edge(file_ids[path], nid, "references_url", path, text[:match.start()].count("\n") + 1)
        for match in re.finditer(r"https?://[^\s\"'<>`)]+", text):
            url = match.group().rstrip(".,;")
            # Public source URLs only; this scanner never reads environment files.
            nid = node("external_" + hashlib.sha256(url.encode()).hexdigest()[:16],
                       url, path, source_url=url, external_reference=True)
            edge(file_ids[path], nid, "references_url", path, text[:match.start()].count("\n") + 1)
        for match in re.finditer(r'''["'`](/[^"'`\s]*)["'`]''', text):
            value = match.group(1)
            target = routes.get(value) or file_ids.get("public" + value)
            if target:
                edge(file_ids[path], target, "references", path, text[:match.start()].count("\n") + 1)

    package = json.loads((ROOT / "package.json").read_text())
    locked = json.loads((ROOT / "package-lock.json").read_text())["packages"]
    package_ids = {}
    for path, metadata in locked.items():
        if not path:
            continue
        name = path.rsplit("node_modules/", 1)[-1]
        package_ids[path] = node("package_lock_" + key(path),
                                name + "@" + metadata.get("version", "unknown"),
                                "package-lock.json", package_name=name,
                                version=metadata.get("version"), package_path=path)
    for path, metadata in locked.items():
        source = package_ids.get(path, file_ids["package.json"])
        for field in ("dependencies", "devDependencies", "optionalDependencies", "peerDependencies"):
            for name in metadata.get(field, {}):
                base = path
                while True:
                    candidate = (base + "/" if base else "") + "node_modules/" + name
                    if candidate in package_ids:
                        edge(source, package_ids[candidate], field, "package-lock.json")
                        break
                    if not base:
                        break  # Optional/peer package need not be installed.
                    base = base.rsplit("/node_modules/", 1)[0] if "/node_modules/" in base else ""
    for name, command in package["scripts"].items():
        nid = node("package_script_" + key(name), name + ": " + command, "package.json")
        edge(file_ids["package.json"], nid, "defines_script", "package.json")
    for nid in list(nodes):
        if nid.startswith("ref_"):
            for name in sorted({**package["dependencies"], **package["devDependencies"]}, key=len, reverse=True):
                if nid == "ref_" + key(name) or nid.startswith("ref_" + key(name) + "_"):
                    target = package_ids.get("node_modules/" + name)
                    if target:
                        edge(nid, target, "provided_by", "package.json")
                    break

    for e in edges:
        if Path(e.get("source_file", "")).is_absolute():
            e["source_file"] = str(Path(e["source_file"]).relative_to(ROOT))
        e.setdefault("confidence_score", 1.0 if e.get("confidence") == "EXTRACTED" else 0.75)
    # Keep every relation and provenance in extraction.json; Graphify's DiGraph
    # can collapse parallel relations. Health report quantifies that limitation.
    unique_edges = {json.dumps(e, sort_keys=True): e for e in edges}
    extraction = dict(nodes=list(nodes.values()), edges=list(unique_edges.values()),
                      hyperedges=hyperedges, input_tokens=0, output_tokens=0)
    write("extraction.json", extraction)
    health = diagnose_extraction(extraction, directed=True, root=str(ROOT))
    write("health.json", health)
    print(format_diagnostic_report(health))
    graph = build_from_json(extraction, root=ROOT, directed=True)
    assert graph.number_of_nodes(), "Refusing empty graph"
    communities = cluster(graph)
    cohesion = score_all(graph, communities)
    labels = {}
    for cid, members in communities.items():
        paths = [graph.nodes[n].get("source_file", "") for n in members]
        common = Counter(paths).most_common(1)[0][0]
        labels[cid] = "Balíčky a závislosti" if common == "package-lock.json" else common
    curated = OUT / "community-labels.json"
    if curated.exists():
        # Reuse labels only for identical membership, never by unstable cluster id.
        saved = json.loads(curated.read_text())
        for cid, members in communities.items():
            signature = hashlib.sha256("\n".join(sorted(members)).encode()).hexdigest()
            labels[cid] = saved.get(signature, labels[cid])
    gods = god_nodes(graph)
    surprises = surprising_connections(graph, communities)
    questions = suggest_questions(graph, communities, labels)
    if not to_json(graph, communities, str(OUT / "graph.json"), community_labels=labels):
        raise SystemExit("Graphify refused graph shrink; inspect before intentional replacement")
    report = generate(graph, communities, cohesion, labels, gods, surprises, detection,
                      {"input": 0, "output": 0}, str(ROOT), suggested_questions=questions)
    report += "\n## Evidence limits\n\nToken usage for host-agent semantic extraction is unavailable; zeros are placeholders, not measured free usage. External URLs were indexed from source, not fetched. See health.json for collapsed parallel relations; extraction.json retains the complete evidence.\n"
    if stale:
        report += "\nSemantic evidence excluded as stale: " + ", ".join(stale) + "\n"
    (OUT / "GRAPH_REPORT.md").write_text(report)
    write(".graphify_labels.json", {str(k): v for k, v in labels.items()})
    write(".graphify_analysis.json", dict(communities=communities, cohesion=cohesion,
                                         gods=gods, surprises=surprises, questions=questions))
    write("coverage.json", dict(files=inventory, routes=sorted(routes),
                                file_count=len(inventory), route_count=len(routes),
                                semantic_sources=sorted(valid), stale_semantic_sources=stale,
                                node_count=graph.number_of_nodes(), edge_count=graph.number_of_edges(),
                                relation_count=len(extraction["edges"])))
    corpus = {k: [p for p in paths if k == "code" or str(Path(p).relative_to(ROOT)) in valid]
              for k, paths in detection["files"].items()}
    save_manifest(corpus, root=ROOT, scan_corpus={p for paths in detection["files"].values() for p in paths})
    write("cost.json", dict(input_tokens=None, output_tokens=None,
                            note="Host-agent usage unavailable; AST is local and deterministic."))
    print(f"Graph: {graph.number_of_nodes()} nodes, {graph.number_of_edges()} edges; {len(inventory)} files")
    if stale:
        print("SEMANTIC REFRESH REQUIRED:", ", ".join(stale))


if __name__ == "__main__":
    main()
