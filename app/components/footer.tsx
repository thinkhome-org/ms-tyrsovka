import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="w-full bg-black px-6 text-white">
            <div className="mx-auto w-full max-w-7xl py-12 md:pl-28 2xl:max-w-360">
                <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <div className="relative h-12 w-12 overflow-hidden rounded-xl border border-white/15 bg-white">
                                <Image
                                    src="/logo.png"
                                    alt="MŠ Tyršovka"
                                    fill
                                    className="object-contain p-1"
                                    sizes="48px"
                                />
                            </div>
                            <div>
                                <div className="text-lg font-semibold tracking-tight text-white">
                                    MŠ Tyršovka
                                </div>
                                <div className="text-sm text-white/70">
                                    Mateřská škola
                                </div>
                            </div>
                        </div>

                        <div className="text-sm text-white/75 leading-relaxed">
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
                            className="inline-flex h-10 items-center rounded-lg border border-white/20 bg-white/10 px-5 text-sm font-medium uppercase tracking-wide text-white shadow-sm transition hover:bg-white/15"
                        >
                            Úřední deska
                        </Link>
                    </div>

                    <div className="space-y-4 md:justify-self-end">
                        <div className="text-sm font-medium uppercase tracking-wide text-white/70">
                            Kontakt
                        </div>
                        <div className="text-sm text-white/75 leading-relaxed">
                            <div>
                                <span className="font-medium text-white">
                                    Telefon:
                                </span>{" "}
                                +420 000 000 000 (placeholder)
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

