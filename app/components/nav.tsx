"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { ChevronDown, Shield } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
    { label: "Aktuality", href: "/aktuality" },
    { label: "Informace", href: "#", hasDropdown: true },
    { label: "O škole", href: "/o-nas", hasDropdown: true },
    { label: "Jídelníček", href: "#" },
    { label: "Fotogalerie", href: "#", hasDropdown: true },
    { label: "Správa MŠ", href: "/uredni-deska", icon: true },
    { label: "Kontakt", href: "#kontakt" },
];

const DROPDOWN_CONTENT = {
    Informace: [
        { label: "Důležité dokumenty", href: "#" },
        { label: "Provozní řád", href: "#" },
        { label: "Školní řád", href: "#" },
        { label: "Zápisy", href: "/zapisy" },
    ],
    "O škole": [
        { label: "O nás", href: "/o-nas" },
        { label: "Pedagogický tým", href: "/o-nas" },
        { label: "Vybavení", href: "#" },
        { label: "Akce a projekty", href: "#" },
    ],
    Fotogalerie: [
        { label: "Školní rok 2025/26", href: "#" },
        { label: "Školní rok 2024/25", href: "#" },
        { label: "Školní akce", href: "#" },
        { label: "Výlety", href: "#" },
    ],
};

export default function Nav() {
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (openDropdown && dropdownRefs.current[openDropdown]) {
                const dropdown = dropdownRefs.current[openDropdown];
                if (dropdown && !dropdown.contains(event.target as Node)) {
                    setOpenDropdown(null);
                }
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [openDropdown]);

    const toggleDropdown = (label: string) => {
        setOpenDropdown(openDropdown === label ? null : label);
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl">
            <nav className="page-shell overflow-visible py-3">
                <div className="flex items-center justify-between gap-4 overflow-visible">
                    <div className="flex min-w-0 items-center gap-4">
                        <Link href="/" className="flex items-center gap-3">
                            <div className="relative flex size-12 items-center justify-center overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm">
                                <Image
                                    src="/logo.png"
                                    alt="MS Tyršovka logo"
                                    width={44}
                                    height={44}
                                    priority
                                    className="object-contain"
                                />
                            </div>
                            <div className="hidden min-w-0 sm:block">
                                <div className="truncate text-base font-semibold tracking-tight">
                                    MŠ Tyršovka
                                </div>
                                <div className="truncate text-sm text-muted-foreground">
                                    Mateřská škola pro radost z pohybu
                                </div>
                            </div>
                        </Link>
                        <div className="hidden h-10 w-px bg-border/70 lg:block" />
                        <div className="hidden flex-wrap items-center gap-2 overflow-visible lg:flex">
                        {NAV_ITEMS.slice(0, 5).map((item) => (
                            <div
                                key={item.label}
                                className="relative"
                                ref={(el) => {
                                    if (item.hasDropdown) {
                                        dropdownRefs.current[item.label] = el;
                                    }
                                }}
                            >
                                {item.hasDropdown ? (
                                    <button
                                        onClick={() => toggleDropdown(item.label)}
                                        className={cn(
                                            buttonVariants({
                                                variant: openDropdown === item.label ? "secondary" : "ghost",
                                                size: "sm",
                                            }),
                                            "rounded-full px-4 text-sm"
                                        )}
                                    >
                                        {item.label}
                                        <ChevronDown
                                            className={cn(
                                                "size-4 text-muted-foreground transition-transform",
                                                openDropdown === item.label && "rotate-180"
                                            )}
                                        />
                                    </button>
                                ) : (
                                    <Link
                                        href={item.href}
                                        className={cn(
                                            buttonVariants({ variant: "ghost", size: "sm" }),
                                            "rounded-full px-4 text-sm"
                                        )}
                                    >
                                        {item.label}
                                    </Link>
                                )}

                                {item.hasDropdown && openDropdown === item.label && (
                                    <div className="absolute left-0 top-full z-50 mt-3 w-64">
                                        <Card className="rounded-2xl border-border/70 bg-background/95 p-2 backdrop-blur-xl">
                                            {DROPDOWN_CONTENT[item.label as keyof typeof DROPDOWN_CONTENT]?.map((dropdownItem) => (
                                                <Link
                                                    key={dropdownItem.label}
                                                    href={dropdownItem.href}
                                                    className="block rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                                                    onClick={() => setOpenDropdown(null)}
                                                >
                                                    {dropdownItem.label}
                                                </Link>
                                            ))}
                                        </Card>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <Link
                            href={NAV_ITEMS[5].href}
                            className={cn(
                                buttonVariants({ variant: "outline", size: "sm" }),
                                "hidden rounded-full px-4 md:inline-flex"
                            )}
                        >
                            <Shield className="size-4" />
                            {NAV_ITEMS[5].label}
                        </Link>
                        <Link
                            href={NAV_ITEMS[6].href}
                            className={cn(
                                buttonVariants({ variant: "dark", size: "sm" }),
                                "rounded-full px-4"
                            )}
                        >
                            {NAV_ITEMS[6].label}
                        </Link>
                    </div>
                </div>
            </nav>
        </header>
    );
}
