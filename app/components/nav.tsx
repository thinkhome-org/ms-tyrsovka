"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { MAIN_NAV, type NavLink, type NavTone } from "@/lib/site-nav";

const VEIL_LAYERS = [
    { blur: 2, height: "100%" },
    { blur: 6, height: "86%" },
    { blur: 14, height: "68%" },
    { blur: 24, height: "48%" },
    { blur: 40, height: "30%" },
    { blur: 56, height: "16%" },
];

function ProgressiveBlur() {
    return (
        <div className="nav-veil" aria-hidden="true">
            {VEIL_LAYERS.map((layer) => (
                <div
                    key={layer.blur}
                    className="nav-veil-layer"
                    style={{
                        height: layer.height,
                        backdropFilter: `blur(${layer.blur}px)`,
                        WebkitBackdropFilter: `blur(${layer.blur}px)`,
                    }}
                />
            ))}
            <div className="nav-veil-wash" />
        </div>
    );
}

function navChipClass(tone?: NavTone | "frost", active = false) {
    return cn(
        "btn-3d nav-chip backdrop-blur-xl backdrop-saturate-150",
        tone === "frost" || !tone ? "nav-chip-frost" : `nav-chip-${tone}`,
        active && "nav-chip-active",
    );
}

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

function SubNavItems({
    items,
    onClick,
    nested = false,
}: {
    items: NavLink[];
    onClick?: () => void;
    nested?: boolean;
}) {
    return (
        <ul className={nested ? "nav-menu nav-menu-nested" : "nav-menu"}>
            {items.map((sub) => (
                <li key={sub.label}>
                    <NavLinkItem
                        item={sub}
                        onClick={onClick}
                        className={cn("nav-menu-link", nested && "nav-menu-link-nested")}
                    />
                    {sub.children?.length ? (
                        <SubNavItems items={sub.children} onClick={onClick} nested />
                    ) : null}
                </li>
            ))}
        </ul>
    );
}

function BrandChip({ onClick }: { onClick?: () => void }) {
    return (
        <Link
            href="/"
            onClick={onClick}
            className={cn(navChipClass("frost"), "gap-2.5 py-0 pl-1.5 pr-1.5 sm:pr-4")}
        >
            <span className="relative flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-[0.9rem] bg-white/70">
                <Image
                    src="/logo.png"
                    alt="MŠ Tyršovka logo"
                    width={161}
                    height={154}
                    preload={!onClick}
                    className="h-auto w-8 object-contain"
                />
            </span>
            <span className="hidden min-w-0 text-left sm:block">
                <span className="block truncate text-sm font-semibold tracking-tight">
                    MŠ Tyršovka
                </span>
                <span className="block truncate text-[0.7rem] leading-tight text-current/65">
                    Mateřská škola pro radost z pohybu
                </span>
            </span>
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
            className="fixed inset-0 z-9999 flex flex-col overflow-y-auto bg-background/78 backdrop-blur-2xl"
        >
            <div className="page-shell flex items-center justify-between gap-4 py-3">
                <BrandChip onClick={onClose} />
                <button
                    ref={closeRef}
                    type="button"
                    aria-label="Zavřít menu"
                    onClick={onClose}
                    className={cn(navChipClass("frost"), "size-12 px-0")}
                >
                    <X className="size-5" />
                </button>
            </div>

            <nav className="page-shell flex flex-1 flex-col gap-2 py-6">
                {MAIN_NAV.map((item) =>
                    item.sub ? (
                        <div key={item.label} className={cn(navChipClass(item.tone), "h-auto flex-col items-stretch px-0 py-0")}>
                            <button
                                type="button"
                                aria-expanded={openSection === item.label}
                                onClick={() =>
                                    setOpenSection((s) => (s === item.label ? null : item.label))
                                }
                                className="flex w-full items-center justify-between px-4 py-3.5 text-left font-heading text-xl font-semibold tracking-tight"
                            >
                                <span>{item.label}</span>
                                <ChevronDown
                                    className={cn(
                                        "size-5 shrink-0 opacity-70 transition-transform duration-200",
                                        openSection === item.label && "rotate-180",
                                    )}
                                />
                            </button>
                            {openSection === item.label ? (
                                <div className="nav-menu-mobile px-1.5 pb-2">
                                    <SubNavItems items={item.sub} onClick={onClose} />
                                </div>
                            ) : null}
                        </div>
                    ) : (
                        <NavLinkItem
                            key={item.label}
                            item={{ label: item.label, href: item.href ?? "/" }}
                            onClick={onClose}
                            className={cn(
                                navChipClass(item.tone),
                                "h-auto justify-start px-4 py-3.5 font-heading text-xl font-semibold tracking-tight",
                            )}
                        />
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
        <div ref={containerRef} className="flex flex-wrap items-center justify-end gap-1.5">
            {MAIN_NAV.map((item) => (
                <div key={item.label} className="relative">
                    {item.sub ? (
                        <>
                            <button
                                type="button"
                                aria-expanded={openDropdown === item.label}
                                aria-haspopup="true"
                                onClick={() =>
                                    setOpenDropdown((d) => (d === item.label ? null : item.label))
                                }
                                className={navChipClass(item.tone, openDropdown === item.label)}
                            >
                                {item.label}
                                <ChevronDown
                                    className={cn(
                                        "size-3.5 opacity-70 transition-transform",
                                        openDropdown === item.label && "rotate-180",
                                    )}
                                />
                            </button>
                            {openDropdown === item.label ? (
                                <div className="absolute left-0 top-full z-50 mt-2 min-w-56">
                                    <div className={cn(navChipClass("frost"), "nav-chip-panel w-full")}>
                                        <SubNavItems
                                            items={item.sub}
                                            onClick={() => setOpenDropdown(null)}
                                        />
                                    </div>
                                </div>
                            ) : null}
                        </>
                    ) : (
                        <Link
                            href={item.href ?? "/"}
                            className={navChipClass(item.tone)}
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
            <header data-site-nav className="sticky top-0 z-50 w-full">
                <ProgressiveBlur />
                <div className="page-shell relative flex items-center justify-between gap-3 py-3">
                    <BrandChip />

                    <div className="hidden flex-1 items-center justify-end lg:flex">
                        <DesktopNav />
                    </div>

                    <div className="lg:hidden">
                        <button
                            type="button"
                            aria-label={mobileOpen ? "Zavřít menu" : "Otevřít menu"}
                            aria-expanded={mobileOpen}
                            aria-controls="mobile-nav-dialog"
                            onClick={() => setMobileOpen((o) => !o)}
                            className={cn(navChipClass("frost"), "gap-2 px-3.5")}
                        >
                            {mobileOpen ? <X className="size-4" /> : <Menu className="size-4" />}
                            Menu
                        </button>
                    </div>
                </div>
            </header>

            {canUsePortal &&
                mobileOpen &&
                createPortal(<MobileMenu onClose={() => setMobileOpen(false)} />, document.body)}
        </>
    );
}
