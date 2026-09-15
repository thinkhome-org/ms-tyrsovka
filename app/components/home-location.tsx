import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SchoolMap } from "@/app/components/school-map";

export default function HomeLocation() {
    return (
        <section className="text-zinc-900">
            <div className="page-shell py-20 sm:py-24">
                <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
                    Kde nás najdete
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
                    Adresa a příchod
                </h2>
                <div className="mt-10">
                    <SchoolMap />
                </div>
                <div className="mt-6 flex justify-end">
                    <Link
                        href="/kontakty#adresa"
                        className="inline-flex items-center gap-2 text-sm font-medium hover:text-primary"
                    >
                        Kontakty
                        <ArrowRight className="size-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
