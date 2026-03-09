import Image from "next/image";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export default function Footer() {
    return (
        <footer id="kontakt" className="w-full bg-foreground text-background">
            <div className="page-shell py-14 sm:py-16">
                <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.2fr_auto_0.8fr] md:items-start">
                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <div className="relative h-14 w-14 overflow-hidden rounded-2xl border border-white/15 bg-white shadow-sm">
                                <Image
                                    src="/logo.png"
                                    alt="MŠ Tyršovka"
                                    fill
                                    className="object-contain p-2"
                                    sizes="56px"
                                />
                            </div>
                            <div>
                                <div className="text-xl font-semibold tracking-tight text-white">
                                    MŠ Tyršovka
                                </div>
                                <div className="text-sm text-white/65">
                                    Mateřská škola
                                </div>
                            </div>
                        </div>

                        <div className="space-y-1 text-sm leading-relaxed text-white/75">
                            <div>
                                <span className="font-medium text-white">
                                    IČO:
                                </span>{" "}
                                00000000 (placeholder)
                            </div>
                            <div>
                                <span className="font-medium text-white">
                                    Datová schránka:
                                </span>{" "}
                                abcdefg (placeholder)
                            </div>
                        </div>

                        <Link
                            href="/uredni-deska"
                            className="inline-flex h-9 items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-foreground"
                        >
                            Úřední deska
                        </Link>
                    </div>

                    <Separator
                        orientation="vertical"
                        className="hidden min-h-32 bg-white/10 md:block"
                    />

                    <div className="space-y-4 md:justify-self-end md:text-right">
                        <div className="text-sm font-medium uppercase tracking-[0.18em] text-white/55">
                            Kontakt
                        </div>
                        <div className="space-y-1 text-sm leading-relaxed text-white/75">
                            <div>
                                <span className="font-medium text-white">
                                    Telefon:
                                </span>{" "}
                                +420 000 000 000 (placeholder)
                            </div>
                            <div>
                                <span className="font-medium text-white">
                                    E-mail:
                                </span>{" "}
                                info@ms-tyrsovka.cz (placeholder)
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

