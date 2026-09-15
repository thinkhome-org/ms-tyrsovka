import Link from "next/link";
import { CLASSROOMS } from "@/lib/classrooms";
import { cn } from "@/lib/utils";

export function ClassBar() {
    return (
        <div className="border-b border-border/80 bg-background">
            <div className="page-shell">
                <nav
                    aria-label="Třídy"
                    className="-mx-6 flex overflow-x-auto md:-mx-10 xl:-mx-14"
                >
                    {CLASSROOMS.map((classroom) => (
                        <Link
                            key={classroom.slug}
                            href={`/tridy/${classroom.slug}`}
                            className={cn(
                                "flex min-w-[7.5rem] flex-1 items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold tracking-wide sm:min-w-0 sm:text-sm",
                                classroom.barClass,
                            )}
                        >
                            <span aria-hidden="true">{classroom.symbol}</span>
                            <span>{classroom.name}</span>
                        </Link>
                    ))}
                </nav>
            </div>
        </div>
    );
}
