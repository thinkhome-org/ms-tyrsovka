import Link from "next/link";
import Image from "next/image";
import { Check } from "lucide-react";
import { Card } from "@/components/ui/card";

const primaryButtonClass =
    "inline-flex h-10 items-center justify-center gap-2 rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export default function ProcMy() {
    return (
        <section className="bg-transparent text-zinc-900">
            <div className="page-shell section-shell border-t border-border">
                <div className="grid grid-cols-1 gap-10 pt-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
                    <div>
                        <h2 className="section-title">
                            Proč my
                        </h2>
                        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                            Sem přijde krátké vysvětlení, čím je naše školka
                            výjimečná. Prozatím placeholder text – později sem
                            doplníme konkrétní informace a benefity.
                        </p>
                        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                            Můžeš tu mít pár vět o přístupu k dětem, zázemí,
                            aktivitách nebo spolupráci s rodiči.
                        </p>

                        <div className="mt-8 grid gap-0 border-y border-border">
                            {[
                                "Přirozený rozvoj pohybu a zdravých návyků",
                                "Bezpečné prostředí a individuální přístup",
                                "Silná spolupráce s rodiči",
                                "Bohatý program během celého roku",
                            ].map((item) => (
                                <div
                                    key={item}
                                    className="flex items-start gap-3 border-b border-border py-4 last:border-b-0"
                                >
                                    <div className="mt-0.5 text-primary">
                                        <Check className="size-4" />
                                    </div>
                                    <p className="text-sm leading-relaxed text-muted-foreground">
                                        {item}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8">
                            <Link href="/o-nas" className={primaryButtonClass}>
                                O nás
                            </Link>
                        </div>
                    </div>

                    <div className="relative overflow-hidden rounded-lg border border-border bg-card">
                        <div className="relative h-64 w-full sm:h-80 md:h-[360px]">
                            <Image
                                src="/proc-my.png"
                                alt="Děti venku"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 40vw"
                                priority={false}
                            />
                        </div>
                        <div className="border-t border-border p-5">
                            <p className="text-sm leading-relaxed text-muted-foreground">
                                Místo, kde se děti učí skrze zážitek, pohyb a
                                bezpečné vztahy.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

