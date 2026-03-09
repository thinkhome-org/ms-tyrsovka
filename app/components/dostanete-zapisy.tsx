import Link from "next/link";
import { MapPinned } from "lucide-react";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { linkButtonPrimaryLg } from "@/lib/button-link-classes";

export default function DostaneteZapisy() {
    return (
        <section className="bg-transparent text-zinc-900">
            <div className="page-shell section-shell border-t border-border">
                <div className="grid grid-cols-1 pt-10 lg:grid-cols-[1.08fr_auto_0.92fr]">
                        <div>
                            <CardHeader className="px-0 pb-5">
                                <CardTitle className="text-3xl">
                                    Jak se k nám dostanete
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="px-0">
                                <div className="overflow-hidden rounded-lg border border-border bg-background">
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
                                        <MapPinned className="size-5" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-medium text-foreground">
                                            Adresa
                                        </div>
                                        <div className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
                                            Ulice 123, 100 00 Praha
                                            <br />
                                            (placeholder)
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </div>

                        <Separator
                            orientation="vertical"
                            className="hidden min-h-full bg-border lg:block"
                        />

                        <div>
                            <CardHeader className="px-0 pb-4 pt-10 lg:pt-0 lg:pl-10">
                                <CardTitle className="text-3xl">
                                    Zápisy
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="px-0 lg:pl-10">
                                <p className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                                    Sem přijde krátké info k zápisům, termínům a
                                    potřebným dokumentům. Prozatím placeholder
                                    text, který později nahradíme reálným obsahem.
                                </p>
                                <ul className="mt-8 space-y-3 border-y border-border py-5 text-sm leading-relaxed text-muted-foreground">
                                    <li>Termíny a důležité informace k zápisu</li>
                                    <li>Seznam dokumentů ke stažení</li>
                                    <li>Postup podání a kontakty pro rodiče</li>
                                </ul>
                                <div className="mt-8">
                                    <Link
                                        href="/zapisy"
                                        className={linkButtonPrimaryLg}
                                    >
                                        Zápisy
                                    </Link>
                                </div>
                            </CardContent>
                        </div>
                    </div>
            </div>
        </section>
    );
}

