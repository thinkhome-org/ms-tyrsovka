"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { MAIN_NAV, type NavLink } from "@/lib/site-nav";
import { ClassBar } from "./class-bar";

function NavLinkItem({
    item,
    className,
    onClick,
}: {
    item: NavLink;
    className?: string;
    onClick?: () => void;
}) {
    return (
        <Link
            href={item.href}
            onClick={onClick}
            target={item.external ? "_blank" : undefined}
            rel={item.external ? "noopener noreferrer" : undefined}
            className={className}
        >
            {item.label}
            {item.external ? <ArrowUpRight className="size-3.5 opacity-70" /> : null}
        </Link>
    );
}

function MobileMenu({ onClose }: { onClose: () => void }) {
    const [openSection, setOpenSection] = useState<string | null>(null);
    const closeRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = prev;
        };
    }, []);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [onClose]);

    useEffect(() => {
        closeRef.current?.focus();
    }, []);

    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-label="Navigace"
            id="mobile-nav-dialog"
            className="fixed inset-0 z-9999 flex flex-col overflow-y-auto bg-background"
        >
            <div className="page-shell flex items-center justify-between gap-4 border-b border-border py-3">
                <Link href="/" onClick={onClose} className="flex shrink-0 items-center gap-3">
                    <div className="relative flex size-12 items-center justify-center overflow-hidden rounded-md bg-card">
                        <Image
                            src="/logo.png"
                            alt="MŠ Tyršovka logo"
                            width={161}
                            height={154}
                            className="h-auto w-11 object-contain"
                        />
                    </div>
                    <span className="text-base font-semibold tracking-tight">MŠ Tyršovka</span>
                </Link>
                <button
                    ref={closeRef}
                    type="button"
                    aria-label="Zavřít menu"
                    onClick={onClose}
                    className="flex size-10 shrink-0 items-center justify-center rounded-md border border-border bg-background text-foreground"
                >
                    <X className="size-5" />
                </button>
            </div>

            <nav className="page-shell flex flex-1 flex-col py-6">
                {MAIN_NAV.map((item) =>
                    item.sub ? (
                        <div key={item.label} className="border-b border-border">
                            <button
                                type="button"
                                aria-expanded={openSection === item.label}
                                onClick={() =>
                                    setOpenSection((s) => (s === item.label ? null : item.label))
                                }
                                className="flex w-full items-center justify-between py-4 text-left font-heading text-2xl font-semibold tracking-tight"
                            >
                                <span>{item.label}</span>
                                <ChevronDown
                                    className={cn(
                                        "size-5 shrink-0 text-muted-foreground transition-transform duration-200",
                                        openSection === item.label && "rotate-180",
                                    )}
                                />
                            </button>
                            {openSection === item.label ? (
                                <div className="flex flex-col gap-1 pb-4">
                                    {item.sub.map((sub) => (
                                        <NavLinkItem
                                            key={sub.label}
                                            item={sub}
                                            onClick={onClose}
                                            className="flex items-center gap-1 py-2 text-base text-muted-foreground"
                                        />
                                    ))}
                                </div>
                            ) : null}
                        </div>
                    ) : (
                        <div key={item.label} className="border-b border-border">
                            <NavLinkItem
                                item={{ label: item.label, href: item.href ?? "/" }}
                                onClick={onClose}
                                className="block py-4 font-heading text-2xl font-semibold tracking-tight"
                            />
                        </div>
                    ),
                )}
            </nav>
        </div>
    );
}

function DesktopNav() {
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setOpenDropdown(null);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    return (
        <div ref={containerRef} className="flex flex-wrap items-center gap-1">
            {MAIN_NAV.map((item) => (
                <div key={item.label} className="relative">
                    {item.sub ? (
                        <>
                            <button
                                type="button"
                                onClick={() =>
                                    setOpenDropdown((d) => (d === item.label ? null : item.label))
                                }
                                className={cn(
                                    buttonVariants({
                                        variant: openDropdown === item.label ? "secondary" : "ghost",
                                        size: "sm",
                                    }),
                                    "rounded-md px-3 text-sm",
                                )}
                            >
                                {item.label}
                                <ChevronDown
                                    className={cn(
                                        "size-4 text-muted-foreground transition-transform",
                                        openDropdown === item.label && "rotate-180",
                                    )}
                                />
                            </button>
                            {openDropdown === item.label ? (
                                <div className="absolute left-0 top-full z-50 mt-2 w-56">
                                    <Card className="border border-border bg-background p-1">
                                        {item.sub.map((sub) => (
                                            <NavLinkItem
                                                key={sub.label}
                                                item={sub}
                                                onClick={() => setOpenDropdown(null)}
                                                className="flex items-center justify-between gap-2 rounded px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                                            />
                                        ))}
                                    </Card>
                                </div>
                            ) : null}
                        </>
                    ) : (
                        <Link
                            href={item.href ?? "/"}
                            className={cn(
                                buttonVariants({ variant: "ghost", size: "sm" }),
                                "rounded-md px-3 text-sm",
                            )}
                        >
                            {item.label}
                        </Link>
                    )}
                </div>
            ))}
        </div>
    );
}

export default function Nav() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const canUsePortal = typeof document !== "undefined";

    useEffect(() => {
        const mq = window.matchMedia("(min-width: 1024px)");
        const onChange = (e: MediaQueryListEvent) => {
            if (e.matches) setMobileOpen(false);
        };
        mq.addEventListener("change", onChange);
        return () => mq.removeEventListener("change", onChange);
    }, []);

    return (
        <>
            <header data-site-nav className="sticky top-0 z-50 w-full border-b border-border bg-background">
                <div className="page-shell flex items-center justify-between gap-4 py-3">
                    <Link href="/" className="flex shrink-0 items-center gap-3">
                        <div className="relative flex size-12 items-center justify-center overflow-hidden rounded-md bg-card">
                            <Image
                                src="/logo.png"
                                alt="MŠ Tyršovka logo"
                                width={161}
                                height={154}
                                preload
                                className="h-auto w-11 object-contain"
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

                    <div className="hidden flex-1 items-center justify-end lg:flex">
                        <DesktopNav />
                    </div>

                    <button
                        type="button"
                        aria-label={mobileOpen ? "Zavřít menu" : "Otevřít menu"}
                        aria-expanded={mobileOpen}
                        aria-controls="mobile-nav-dialog"
                        onClick={() => setMobileOpen((o) => !o)}
                        className="inline-flex h-10 shrink-0 items-center gap-2 rounded-md border border-border bg-background px-3 text-sm font-medium text-foreground lg:hidden"
                    >
                        {mobileOpen ? <X className="size-4" /> : <Menu className="size-4" />}
                        Menu
                    </button>
                </div>
                <ClassBar />
            </header>

            {canUsePortal &&
                mobileOpen &&
                createPortal(<MobileMenu onClose={() => setMobileOpen(false)} />, document.body)}
        </>
    );
}
