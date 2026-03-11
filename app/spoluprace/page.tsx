import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { linkButtonOutlineSm } from "@/lib/button-link-classes";
import { SPOLUPRACE_CONTENT } from "./content";

export default function SpolupracePage() {
    const content = SPOLUPRACE_CONTENT;

    return (
        <main className="flex-1 text-zinc-900">
            <div className="page-shell section-shell">
                <div className="mx-auto max-w-5xl">
                    <header className="flex flex-wrap items-end justify-between gap-6">
                        <div className="min-w-0 max-w-3xl">
                            <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
                                {content.eyebrow}
                            </p>
                            <h1 className="mt-2 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                                {content.title}
                            </h1>
                            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                                {content.description}
                            </p>
                        </div>

                        <Link href="/" className={linkButtonOutlineSm}>
                            ← Zpět
                        </Link>
                    </header>

                    <section className="mt-12 sm:mt-14">
                        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                            {content.items.map((item) => (
                                <Card
                                    key={item.title}
                                    className="content-card overflow-hidden"
                                >
                                    <div className="relative aspect-4/3 w-full bg-muted">
                                        <Image
                                            src={item.image}
                                            alt={item.imageAlt}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                                        />
                                    </div>

                                    <CardContent className="p-6 sm:p-7">
                                        <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                                            {item.title}
                                        </h2>
                                        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                                            {item.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}
