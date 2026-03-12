import Image from "next/image";
import Link from "next/link";
import { linkButtonOutlineSm } from "@/lib/button-link-classes";
import { SPOLUPRACE_CONTENT } from "./content";

export default function SpolupracePage() {
    const { eyebrow, title, description, items } = SPOLUPRACE_CONTENT;

    return (
        <main className="flex-1 text-zinc-900">
            <div className="page-shell section-shell">
                {/* Header */}
                <header className="flex flex-wrap items-start justify-between gap-6">
                    <div className="min-w-0">
                        <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
                            {eyebrow}
                        </p>
                        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                            {title}
                        </h1>
                        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                            {description}
                        </p>
                    </div>
                    <Link href="/" className={linkButtonOutlineSm}>
                        ← Zpět
                    </Link>
                </header>

                {/* Partner list */}
                <div className="mt-16 border-t border-border">
                    {items.map((item, i) => (
                        <div
                            key={item.title}
                            className="grid grid-cols-1 items-center gap-6 border-b border-border py-8 sm:grid-cols-[auto_80px_1fr_2fr] sm:gap-10 sm:py-10"
                        >
                            <span className="hidden text-xs font-medium tabular-nums text-muted-foreground/60 sm:block sm:pt-0.5">
                                0{i + 1}
                            </span>

                            <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded-md bg-muted sm:h-14 sm:w-20">
                                <Image
                                    src={item.logo}
                                    alt={`Logo ${item.title}`}
                                    fill
                                    className="object-contain p-1"
                                    sizes="80px"
                                />
                            </div>

                            <div>
                                <p className="text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
                                    {item.category}
                                </p>
                                <h2 className="mt-1.5 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                                    {item.title}
                                </h2>
                            </div>

                            <p className="text-base leading-relaxed text-muted-foreground">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
