import Image from "next/image";
import Link from "next/link";
import { listClassroomsWithContacts } from "@/lib/cms/classrooms";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { linkButtonOutlineSm } from "@/lib/button-link-classes";
import { buildPageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata = buildPageMetadata({
    title: "Třídy",
    description:
        "Přehled tříd MŠ Tyršovka: Jahodová, Meruňková, Borůvková, Citrónová, Jablková a Hrušková.",
    path: "/tridy",
});

export default async function TridyPage() {
    const classrooms = await listClassroomsWithContacts();
    return (
        <main className="flex-1 text-zinc-900">
            <div className="page-shell section-shell">
                <div className="flex flex-wrap items-end justify-between gap-4">
                    <div className="max-w-3xl">
                        <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
                            O škole
                        </p>
                        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
                            Třídy
                        </h1>
                        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                            Šest tříd s ovocným symbolem, barvou a stručným představením.
                        </p>
                    </div>
                    <Link href="/o-nas" className={linkButtonOutlineSm}>
                        ← Představení školy
                    </Link>
                </div>

                <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {classrooms.map((classroom) => (
                        <Link key={classroom.slug} href={`/tridy/${classroom.slug}`} className="group">
                            <Card className="h-full overflow-hidden bg-card">
                                <div className={`px-5 py-3 text-sm font-semibold ${classroom.barClass}`}>
                                    <span aria-hidden="true">{classroom.symbol}</span> {classroom.name}
                                </div>
                                <div className="relative aspect-square bg-[oklch(0.97_0.01_90)]">
                                    {classroom.imageKey ? (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img
                                            src={classroom.image}
                                            alt={classroom.fullName}
                                            className="absolute inset-0 size-full object-contain p-6"
                                        />
                                    ) : (
                                        <Image
                                            src={classroom.image}
                                            alt={classroom.fullName}
                                            fill
                                            className="object-contain p-6"
                                            sizes="(max-width: 768px) 100vw, 33vw"
                                        />
                                    )}
                                </div>
                                <CardHeader className="pb-2">
                                    <p className="text-sm text-muted-foreground">{classroom.age}</p>
                                    <h2 className="text-xl font-semibold tracking-tight">
                                        {classroom.fullName}
                                    </h2>
                                </CardHeader>
                                <CardContent>
                                    <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                                        {classroom.paragraphs[0]}
                                    </p>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </main>
    );
}
