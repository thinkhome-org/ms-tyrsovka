import Link from "next/link";

export default function UredniDeskaPage() {
    return (
        <main className="min-h-screen bg-[#f5f5f5] px-6 text-zinc-900">
            <div className="mx-auto w-full max-w-7xl pt-10 pb-16 md:pl-28 2xl:max-w-360">
                <div className="flex flex-wrap items-end justify-between gap-4">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight text-black sm:text-5xl">
                            Úřední deska
                        </h1>
                        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-600 sm:text-base">
                            Placeholder stránka – doplníme obsah později.
                        </p>
                    </div>

                    <Link
                        href="/"
                        className="inline-flex h-9 items-center rounded-lg border border-black/10 bg-white/80 px-4 text-sm font-medium uppercase tracking-wide text-zinc-800 shadow-sm transition hover:bg-[#A0C4FF]"
                    >
                        ← Zpět
                    </Link>
                </div>

                <div className="mt-10 rounded-2xl border border-black/10 bg-white/80 p-6 shadow-sm sm:p-8">
                    <p className="text-zinc-700 leading-relaxed">
                        Zde budou zveřejňované dokumenty a oznámení. Prozatím jen
                        kostra stránky, aby odkaz ve footeru fungoval.
                    </p>
                </div>
            </div>
        </main>
    );
}

