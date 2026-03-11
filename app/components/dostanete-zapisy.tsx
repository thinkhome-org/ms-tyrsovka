import Link from "next/link";
import { MapPinned } from "lucide-react";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { linkButtonPrimaryLg } from "@/lib/button-link-classes";

export default function DostaneteZapisy() {
    return (
        <section className="text-zinc-900">
            <div className="page-shell border-t border-border py-24 sm:py-32 lg:py-40">
                <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1.08fr_auto_0.92fr] lg:gap-20">
                    <div>
                        <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
                            Lokace
                        </p>
                        <CardHeader className="px-0 pb-6 pt-3">
                            <CardTitle className="text-3xl">
                                Jak se k nám dostanete
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="px-0">
                            <div className="overflow-hidden rounded-xl bg-background">
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

                            <div className="mt-8 flex items-start gap-3">
                                <div className="mt-0.5 text-primary">
                                    <MapPinned className="size-5" />
                                </div>
                                <div>
                                    <div className="text-sm font-medium text-foreground">
                                        Adresa
                                    </div>
                                    <div className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
                                        Lysinská 184/45, 143 00 Praha 4 -
                                        Modřany
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
                        <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground pt-10 lg:pt-0 lg:pl-12">
                            Pro zájemce
                        </p>
                        <CardHeader className="px-0 pb-8 pt-3 lg:pl-12">
                            <CardTitle className="text-3xl">Zápisy</CardTitle>
                        </CardHeader>
                        <CardContent className="px-0 lg:pl-12">
                            <p className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                                Sem přijde krátké info k zápisům, termínům a
                                potřebným dokumentům. Prozatím placeholder text,
                                který později nahradíme reálným obsahem.
                            </p>
                            <ul className="mt-10 space-y-4 border-y border-border py-6 text-sm leading-relaxed text-muted-foreground sm:text-base">
                                <li>Termíny a důležité informace k zápisu</li>
                                <li>Seznam dokumentů ke stažení</li>
                                <li>Postup podání a kontakty pro rodiče</li>
                            </ul>
                            <div className="mt-10">
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
