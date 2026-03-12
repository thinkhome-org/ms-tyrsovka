import Image from "next/image";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export default function Footer() {
    return (
        <footer id="kontakt" className="w-full bg-black text-white">
            <div className="page-shell py-14 sm:py-16">
                <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.2fr_auto_0.8fr] md:items-start">
                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <div className="relative h-14 w-14 overflow-hidden rounded-md bg-white/10">
                                <Image src="/logo.png" alt="MŠ Tyršovka" fill className="object-contain p-2" sizes="56px" />
                            </div>
                            <div>
                                <div className="text-xl font-semibold tracking-tight text-white">MŠ Tyršovka</div>
                                <div className="text-sm text-white/65">Mateřská škola</div>
                            </div>
                        </div>

                        <div className="space-y-1 text-sm leading-relaxed text-white/75">
                            <div>
                                <span className="font-medium text-white">IČ:</span> 63109719
                            </div>
                            <div>
                                <span className="font-medium text-white">Datová schránka:</span> 9u4k2vr
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <Link href="/kontakty" className="inline-flex h-9 items-center justify-center rounded-md border border-white/20 bg-white/5 px-5 text-sm font-medium text-white transition-colors hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-foreground">
                                Kontakty
                            </Link>
                            <Link href="/uredni-deska" className="inline-flex h-9 items-center justify-center rounded-md border border-white/20 bg-white/5 px-5 text-sm font-medium text-white transition-colors hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-foreground">
                                Úřední deska
                            </Link>
                            <Link href="/projekty-a-vyzvy" className="inline-flex h-9 items-center justify-center rounded-md border border-white/20 bg-white/5 px-5 text-sm font-medium text-white transition-colors hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-foreground">
                                Projekty a výzvy
                            </Link>
                            <Link href="/spoluprace" className="inline-flex h-9 items-center justify-center rounded-md border border-white/20 bg-white/5 px-5 text-sm font-medium text-white transition-colors hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-foreground">
                                Spolupráce
                            </Link>
                        </div>
                    </div>

                    <Separator orientation="vertical" className="hidden min-h-32 bg-white/10 md:block" />

                    <div className="space-y-4 md:justify-self-end md:text-right">
                        <div className="text-sm font-medium uppercase tracking-[0.18em] text-white/55">Kontakt</div>
                        <div className="space-y-1 text-sm leading-relaxed text-white/75">
                            <div>
                                <span className="font-medium text-white">Telefon:</span> +420 737 381 935
                            </div>
                            <div>
                                <span className="font-medium text-white">E-mail:</span> reditelka@tyrsovka.cz
                            </div>
                            <div>
                                <span className="font-medium text-white">Adresa:</span> Lysinská 184/45, 143 00 Praha 4 - Modřany
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-12 flex justify-center border-t border-white/10 pt-8">
                    <a
                        href="https://thinkhome.org"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-6 items-center gap-2 opacity-50 transition-opacity hover:opacity-70"
                        aria-label="Vytvořeno Thinkhome"
                    >
                        <span className="text-xs leading-none text-white/70">Vytvořeno</span>
                        <Image
                            src="https://raw.githubusercontent.com/thinkhome-org/web-new/master/images/logo/primary/SVG%20Transparent/primary_white-on-transparent.svg"
                            alt="Thinkhome"
                            width={100}
                            height={21}
                            className="block h-5 w-auto"
                        />
                    </a>
                </div>
            </div>
        </footer>
    );
}
