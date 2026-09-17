import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/cms/auth";
import { LogoutButton } from "./logout-button";
import { StudioNav } from "./studio-nav";

export const dynamic = "force-dynamic";

export default async function AdminStudioLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    if (!(await isAdmin())) {
        redirect("/admin/prihlaseni");
    }

    return (
        <div className="flex min-h-screen flex-col">
            <header className="sticky top-0 z-40 border-b border-border/80 bg-[color-mix(in_oklch,var(--admin-paper)_88%,white)]/90 backdrop-blur-md">
                <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
                    <Link href="/admin" className="flex min-w-0 items-center gap-3">
                        <div className="relative size-10 overflow-hidden rounded-md bg-card shadow-sm">
                            <Image
                                src="/logo.png"
                                alt=""
                                fill
                                className="object-contain p-1"
                                sizes="40px"
                            />
                        </div>
                        <div className="min-w-0">
                            <p className="text-[0.7rem] font-medium uppercase tracking-[0.22em] text-muted-foreground">
                                Nástěnka
                            </p>
                            <p className="truncate font-heading text-lg font-semibold tracking-tight">
                                Redakce
                            </p>
                        </div>
                    </Link>
                    <div className="flex min-w-0 flex-1 items-center justify-end gap-2 sm:gap-3">
                        <div className="hidden min-w-0 flex-1 justify-center lg:flex">
                            <StudioNav />
                        </div>
                        <Link
                            href="/"
                            className="hidden text-sm text-muted-foreground transition-colors hover:text-foreground sm:inline"
                        >
                            Zobrazit web
                        </Link>
                        <LogoutButton />
                    </div>
                </div>
                <div className="mx-auto w-full max-w-7xl px-5 pb-3 lg:hidden sm:px-8">
                    <StudioNav />
                </div>
            </header>
            <div className="flex-1">{children}</div>
        </div>
    );
}
