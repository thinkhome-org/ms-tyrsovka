import Link from "next/link";

export default function DostaneteZapisy() {
    return (
        <section className="w-full bg-white px-6 text-zinc-900">
            <div className="mx-auto w-full max-w-7xl py-16 md:pl-28 2xl:max-w-360">
                <div className="rounded-2xl border border-black/10 bg-white/80 shadow-sm">
                    <div className="grid grid-cols-1 divide-y divide-black/10 md:grid-cols-2 md:divide-y-0 md:divide-x">
                        <div className="p-6 sm:p-8">
                            <h2 className="text-2xl font-bold tracking-tight text-black sm:text-3xl">
                                Jak se k nám dostanete
                            </h2>

                            <div className="mt-6 overflow-hidden rounded-xl border border-black/10 bg-white">
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

                            <div className="mt-6">
                                <div className="text-sm font-medium uppercase tracking-wide text-zinc-600">
                                    Adresa
                                </div>
                                <div className="mt-2 text-zinc-700 leading-relaxed">
                                    Ulice 123, 100 00 Praha
                                    <br />
                                    (placeholder)
                                </div>
                            </div>
                        </div>

                        <div className="p-6 sm:p-8">
                            <h2 className="text-2xl font-bold tracking-tight text-black sm:text-3xl">
                                Zápisy
                            </h2>
                            <p className="mt-4 max-w-xl text-base leading-relaxed text-zinc-700 sm:text-lg">
                                Sem přijde krátké info k zápisům (termíny,
                                dokumenty, postup). Prozatím placeholder text –
                                doplníme později.
                            </p>

                            <div className="mt-8">
                                <Link
                                    href="/zapisy"
                                    className="inline-flex h-10 items-center rounded-lg border border-black/10 bg-white/80 px-5 text-sm font-medium uppercase tracking-wide text-zinc-800 shadow-sm transition hover:bg-[#A0C4FF]"
                                >
                                    Zápisy
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

