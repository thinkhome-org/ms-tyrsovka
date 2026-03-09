"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronDown, Menu, Shield, X } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// ─── data ────────────────────────────────────────────────────────────────────

const NAV_ITEMS = [
    { label: "Aktuality", href: "/aktuality" },
    { label: "Informace", href: "#", sub: true },
    { label: "O škole", href: "/o-nas", sub: true },
    { label: "Jídelníček", href: "#" },
    { label: "Fotogalerie", href: "#", sub: true },
    { label: "Správa MŠ", href: "/uredni-deska" },
    { label: "Kontakt", href: "#kontakt" },
] as const;

const SUB_ITEMS: Record<string, { label: string; href: string }[]> = {
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

const DESKTOP_NAV = NAV_ITEMS.slice(0, 5);

// ─── Mobile overlay ───────────────────────────────────────────────────────────

function MobileMenu({ onClose }: { onClose: () => void }) {
    const [openSection, setOpenSection] = useState<string | null>(null);
    const closeRef = useRef<HTMLButtonElement>(null);

    // Lock scroll
    useEffect(() => {
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = prev;
        };
    }, []);

    // Escape to close
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [onClose]);

    // Focus the close button when menu opens
    useEffect(() => {
        closeRef.current?.focus();
    }, []);

    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-label="Navigace"
            style={{
                position: "fixed",
                inset: 0,
                zIndex: 9999,
                backgroundColor: "var(--background)",
                display: "flex",
                flexDirection: "column",
                overflowY: "auto",
            }}
        >
            {/* Header row — identical markup/classes to the sticky navbar */}
            <div className="page-shell flex items-center justify-between gap-4 border-b border-border/60 py-3">
                <Link
                    href="/"
                    onClick={onClose}
                    className="flex shrink-0 items-center gap-3"
                >
                    <div className="relative flex size-12 items-center justify-center overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm">
                        <Image
                            src="/logo.png"
                            alt="MŠ Tyršovka logo"
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
                    <span className="truncate text-base font-semibold tracking-tight sm:hidden">
                        MŠ Tyršovka
                    </span>
                </Link>

                <button
                    ref={closeRef}
                    type="button"
                    aria-label="Zavřít menu"
                    onClick={onClose}
                    className="flex size-10 shrink-0 items-center justify-center rounded-md border border-border/70 bg-background text-foreground"
                >
                    <X className="size-5" />
                </button>
            </div>

            {/* Nav links */}
            <nav className="page-shell flex flex-1 flex-col py-6">
                {DESKTOP_NAV.map((item) =>
                    "sub" in item ? (
                        <div
                            key={item.label}
                            style={{ borderBottom: "1px solid var(--border)" }}
                        >
                            <button
                                type="button"
                                aria-expanded={openSection === item.label}
                                onClick={() =>
                                    setOpenSection((s) =>
                                        s === item.label ? null : item.label
                                    )
                                }
                                style={{
                                    display: "flex",
                                    width: "100%",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    padding: "1.1rem 0",
                                    background: "none",
                                    border: "none",
                                    cursor: "pointer",
                                    textAlign: "left",
                                    fontSize: "1.5rem",
                                    fontWeight: 600,
                                    letterSpacing: "-0.02em",
                                    color: "var(--foreground)",
                                }}
                            >
                                <span>{item.label}</span>
                                <ChevronDown
                                    className={cn(
                                        "size-5 shrink-0 text-muted-foreground transition-transform duration-200",
                                        openSection === item.label && "rotate-180"
                                    )}
                                />
                            </button>

                            {openSection === item.label && (
                                <div style={{ paddingBottom: "1rem" }}>
                                    {SUB_ITEMS[item.label]?.map((sub) => (
                                        <Link
                                            key={sub.label}
                                            href={sub.href}
                                            onClick={onClose}
                                            style={{
                                                display: "block",
                                                padding: "0.55rem 0.25rem",
                                                fontSize: "1rem",
                                                color: "var(--muted-foreground)",
                                            }}
                                        >
                                            {sub.label}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    ) : (
                        <div
                            key={item.label}
                            style={{ borderBottom: "1px solid var(--border)" }}
                        >
                            <Link
                                href={item.href}
                                onClick={onClose}
                                style={{
                                    display: "block",
                                    padding: "1.1rem 0",
                                    fontSize: "1.5rem",
                                    fontWeight: 600,
                                    letterSpacing: "-0.02em",
                                    color: "var(--foreground)",
                                }}
                            >
                                {item.label}
                            </Link>
                        </div>
                    )
                )}

                {/* CTA buttons */}
                <div
                    style={{
                        marginTop: "2rem",
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.75rem",
                        paddingTop: "1.5rem",
                        borderTop: "1px solid var(--border)",
                    }}
                >
                    <Link
                        href={NAV_ITEMS[5].href}
                        onClick={onClose}
                        className={cn(
                            buttonVariants({ variant: "outline", size: "lg" }),
                            "w-full justify-center rounded-md"
                        )}
                    >
                        <Shield className="size-4" />
                        {NAV_ITEMS[5].label}
                    </Link>
                    <Link
                        href={NAV_ITEMS[6].href}
                        onClick={onClose}
                        className={cn(
                            buttonVariants({ variant: "dark", size: "lg" }),
                            "w-full justify-center rounded-md"
                        )}
                    >
                        {NAV_ITEMS[6].label}
                    </Link>
                </div>
            </nav>
        </div>
    );
}

// ─── Desktop dropdown ─────────────────────────────────────────────────────────

function DesktopNav() {
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(e.target as Node)
            ) {
                setOpenDropdown(null);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    return (
        <div ref={containerRef} className="flex flex-wrap items-center gap-2">
            {DESKTOP_NAV.map((item) => (
                <div key={item.label} className="relative">
                    {"sub" in item ? (
                        <>
                            <button
                                type="button"
                                onClick={() =>
                                    setOpenDropdown((d) =>
                                        d === item.label ? null : item.label
                                    )
                                }
                                className={cn(
                                    buttonVariants({
                                        variant:
                                            openDropdown === item.label
                                                ? "secondary"
                                                : "ghost",
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

                            {openDropdown === item.label && (
                                <div className="absolute left-0 top-full z-50 mt-3 w-64">
                                    <Card className="rounded-2xl border-border/70 bg-background/95 p-2 backdrop-blur-xl">
                                        {SUB_ITEMS[item.label]?.map((sub) => (
                                            <Link
                                                key={sub.label}
                                                href={sub.href}
                                                onClick={() => setOpenDropdown(null)}
                                                className="block rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                                            >
                                                {sub.label}
                                            </Link>
                                        ))}
                                    </Card>
                                </div>
                            )}
                        </>
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
                </div>
            ))}
        </div>
    );
}

// ─── Nav root ─────────────────────────────────────────────────────────────────

export default function Nav() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Close mobile menu when resizing to desktop
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
            <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl">
                <div className="page-shell flex items-center justify-between gap-4 py-3">
                    {/* Logo */}
                    <Link href="/" className="flex shrink-0 items-center gap-3">
                        <div className="relative flex size-12 items-center justify-center overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm">
                            <Image
                                src="/logo.png"
                                alt="MŠ Tyršovka logo"
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

                    {/* Desktop links */}
                    <div className="hidden flex-1 items-center gap-4 lg:flex">
                        <div className="h-10 w-px bg-border/70" />
                        <DesktopNav />
                    </div>

                    {/* Desktop CTAs */}
                    <div className="hidden items-center gap-2 lg:flex">
                        <Link
                            href={NAV_ITEMS[5].href}
                            className={cn(
                                buttonVariants({ variant: "outline", size: "sm" }),
                                "rounded-full px-4"
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

                    {/* Hamburger (mobile only) */}
                    <button
                        type="button"
                        aria-label={mobileOpen ? "Zavřít menu" : "Otevřít menu"}
                        aria-expanded={mobileOpen}
                        aria-controls="mobile-nav-dialog"
                        onClick={() => setMobileOpen((o) => !o)}
                        className="flex size-10 shrink-0 items-center justify-center rounded-md border border-border/70 bg-background text-foreground lg:hidden"
                    >
                        {mobileOpen ? (
                            <X className="size-5" />
                        ) : (
                            <Menu className="size-5" />
                        )}
                    </button>
                </div>
            </header>

            {/* Full-screen mobile overlay — portalled to <body> */}
            {mounted &&
                mobileOpen &&
                createPortal(
                    <MobileMenu onClose={() => setMobileOpen(false)} />,
                    document.body
                )}
        </>
    );
}
