import Link from "next/link";
import Image from "next/image";

export default function ProcMy() {
    return (
        <section className="w-full bg-[#f5f5f5] px-6 text-zinc-900">
            <div className="mx-auto w-full max-w-7xl py-16 md:pl-28 2xl:max-w-360">
                <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.2fr_0.8fr] md:items-start">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight text-black sm:text-4xl">
                            Proč my
                        </h2>
                        <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-700 sm:text-lg">
                            Sem přijde krátké vysvětlení, čím je naše školka
                            výjimečná. Prozatím placeholder text – později sem
                            doplníme konkrétní informace a benefity.
                        </p>
                        <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-700 sm:text-lg">
                            Můžeš tu mít třeba pár vět o přístupu k dětem, zázemí,
                            aktivitách nebo spolupráci s rodiči.
                        </p>

                        <div className="mt-8">
                            <Link
                                href="/o-nas"
                                className="inline-flex h-10 items-center rounded-lg border border-black/10 bg-white/80 px-5 text-sm font-medium uppercase tracking-wide text-zinc-800 shadow-sm transition hover:bg-[#A0C4FF]"
                            >
                                O nás
                            </Link>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-black/10 bg-white/70 shadow-sm overflow-hidden">
                        <div className="relative h-64 w-full sm:h-80 md:h-[250px]">
                            <Image
                                src="/proc-my.png"
                                alt="Děti venku"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 40vw"
                                priority={false}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

