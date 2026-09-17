"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const MODULES = [
    { href: "/admin", label: "Aktuality" },
    { href: "/admin/uredni-deska", label: "Úřední deska" },
    { href: "/admin/plan-akci", label: "Plán akcí" },
    { href: "/admin/jidelnicek", label: "Jídelníček" },
    { href: "/admin/kontakty", label: "Kontakty" },
    { href: "/admin/nastaveni", label: "Nastavení" },
] as const;

function isActive(pathname: string, href: string) {
    if (href === "/admin") {
        return (
            pathname === "/admin" ||
            pathname.startsWith("/admin/nova") ||
            (pathname.startsWith("/admin/") &&
                MODULES.slice(1).every(
                    (item) =>
                        pathname !== item.href &&
                        !pathname.startsWith(`${item.href}/`),
                ))
        );
    }
    return pathname === href || pathname.startsWith(`${href}/`);
}

export function StudioNav() {
    const pathname = usePathname();

    return (
        <nav className="flex gap-1 overflow-x-auto pb-1">
            {MODULES.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            "shrink-0 rounded-full px-3 py-1.5 text-sm transition-colors",
                            active
                                ? "bg-foreground text-background"
                                : "text-muted-foreground hover:bg-accent hover:text-foreground",
                        )}
                    >
                        {item.label}
                    </Link>
                );
            })}
        </nav>
    );
}
