"""Runnable acceptance check for graph integrity, freshness and coverage."""
import hashlib
import json
import re
import subprocess
import yaml
from pathlib import Path

root = Path(__file__).resolve().parents[1]
out = root / "graphify-out"
graph = json.loads((out / "graph.json").read_text())
coverage = json.loads((out / "coverage.json").read_text())
extraction = json.loads((out / "extraction.json").read_text())
semantic = json.loads((out / "semantic.json").read_text())
health = json.loads((out / "health.json").read_text())
ids = {n["id"] for n in extraction["nodes"]}
assert len(ids) == len(extraction["nodes"]), "Duplicate node ids"
assert all(e["source"] in ids and e["target"] in ids for e in extraction["edges"]), "Dangling evidence"
assert all(h["nodes"] and set(h["nodes"]) <= ids for h in extraction["hyperedges"]), "Dangling hyperedge"
assert not health["dangling_endpoint_edges"] and not health["missing_endpoint_edges"]
assert not coverage["stale_semantic_sources"], "Semantic refresh required"
locked = yaml.safe_load((root / "pnpm-lock.yaml").read_text())
package = json.loads((root / "package.json").read_text())
for field in ("dependencies", "devDependencies"):
    assert package[field] == {
        name: data["specifier"]
        for name, data in locked["importers"]["."].get(field, {}).items()
    }, f"Manifest/pnpm drift: {field}"
represented_packages = {
    n["package_path"] for n in extraction["nodes"]
    if n.get("source_file") == "pnpm-lock.yaml" and "package_path" in n
}
assert represented_packages == set(locked["snapshots"]), "pnpm snapshot coverage drift"
for path, expected in semantic["source_hashes"].items():
    assert hashlib.sha256((root / path).read_bytes()).hexdigest() == expected, path
inventory = set(filter(None, subprocess.check_output(
    ["git", "ls-files", "--cached", "--others", "--exclude-standard", "-z"], cwd=root
).decode().split("\0")))
inventory = {p for p in inventory if not p.startswith("graphify-out/") and (root / p).is_file()}
assert inventory == set(coverage["files"]), "File inventory drift"
represented = {n.get("source_file") for n in graph["nodes"]}
assert inventory <= represented, "Files missing from exported graph"
for page in (root / "app").rglob("page.tsx"):
    route = "/" + str(page.parent.relative_to(root / "app")).replace(".", "")
    assert route in coverage["routes"], route
assert {"/sitemap.xml", "/robots.txt"} <= set(coverage["routes"])
assets = {str(p.relative_to(root)) for p in (root / "public").rglob("*") if p.is_file()}
assert assets <= set(semantic["source_hashes"]), "Asset not semantically inspected"
urls = {n.get("source_url") for n in graph["nodes"]}
gallery = (root / "app/galerie/content.ts").read_text()
photos = re.findall(r'`\$\{F\}([^`]+)`', gallery)
assert all("https://files.site.site3.eu" + p in urls for p in photos), "Gallery URL missing"
for doc in [root / "README.md", *sorted((root / "docs").glob("*.md"))]:
    for target in re.findall(r'\]\(([^)]+)\)', doc.read_text()):
        if "://" not in target and not target.startswith("#"):
            assert (doc.parent / target.split("#")[0]).exists(), (doc.name, target)
print(f"PASS: {len(inventory)} files, {len(coverage['routes'])} routes, {len(assets)} assets, "
      f"{len(photos)} gallery references; valid endpoints, hashes and documentation links.")
