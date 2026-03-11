import Link from "next/link";
import { MapPinned, ArrowRight, CalendarClock, FileText, Phone } from "lucide-react";

const ZAPISY_ITEMS = [
    { icon: CalendarClock, label: "Termíny a důležité informace k zápisu" },
    { icon: FileText,      label: "Seznam dokumentů ke stažení" },
    { icon: Phone,         label: "Postup podání a kontakty pro rodiče" },
];

export default function DostaneteZapisy() {
    return (
        <section className="text-zinc-900">
            <div className="page-shell py-20 sm:py-24 lg:py-28">
                <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-20">
                    {/* Lokace */}
                    <div>
                        <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
                            Lokace
                        </p>
                        <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
                            Jak se k nám dostanete
                        </h2>

                        <div className="mt-10 overflow-hidden rounded-xl bg-muted">
                            <div className="aspect-16/10 w-full">
                                <iframe
                                    title="Mapa – MŠ Tyršovka"
                                    src="https://www.google.com/maps?q=Praha&z=13&output=embed"
                                    className="h-full w-full"
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    allowFullScreen
                                />
                            </div>
                        </div>

                        <div className="mt-6 flex items-start gap-3">
                            <div className="mt-0.5 text-primary">
                                <MapPinned className="size-4" />
                            </div>
                            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                                Lysinská 184/45, 143 00 Praha 4 – Modřany
                            </p>
                        </div>
                    </div>

                    {/* Zápisy */}
                    <div>
                        <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
                            Pro zájemce
                        </p>
                        <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
                            Zápisy
                        </h2>

                        <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
                            Sem přijde krátké info k zápisům, termínům a
                            potřebným dokumentům. Prozatím placeholder text,
                            který později nahradíme reálným obsahem.
                        </p>

                        <div className="mt-10 border-t border-border">
                            {ZAPISY_ITEMS.map(({ icon: Icon, label }) => (
                                <div
                                    key={label}
                                    className="flex items-center gap-4 border-b border-border py-5"
                                >
                                    <Icon className="size-4 shrink-0 text-muted-foreground" />
                                    <span className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                                        {label}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-10">
                            <Link
                                href="/zapisy"
                                className="flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-primary"
                            >
                                Více o zápisech
                                <ArrowRight className="size-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
