"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, Shield } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";

// ─── data ────────────────────────────────────────────────────────────────────

const NAV_ITEMS = [
    { label: "Život ve školce", href: "#", sub: true },
    { label: "Pro zájemce", href: "/pro-zajemce" },
    { label: "Informace", href: "#", sub: true },
    { label: "O škole", href: "/o-nas", sub: true },
    { label: "Správa MŠ", href: "https://nasems.cz/" },
    { label: "Kontakty", href: "/kontakty" },
] as const;

const SUB_ITEMS: Record<string, { label: string; href: string }[]> = {
    "Život ve školce": [
        { label: "Aktuality", href: "/aktuality" },
        { label: "Galerie", href: "/galerie" },
    ],
    Informace: [
        { label: "Jídelníček", href: "/jidelnicek" },
        { label: "Nově přijatí", href: "/nove-prijati" },
        {
            label: "Režim dne a provozní doba",
            href: "/rezim-dne-a-provozni-doba",
        },
        { label: "Plán akcí", href: "/plan-akci" },
    ],
    "O škole": [
        { label: "O nás", href: "/o-nas" },
        { label: "Třídy", href: "/tridy" },
        { label: "ŠVP", href: "/svp" },
    ],
};

const DESKTOP_NAV = NAV_ITEMS.slice(0, 4);

// ─── Mobile overlay ───────────────────────────────────────────────────────────

function MobileMenu({ onClose }: { onClose: () => void }) {
    return (
        <SheetContent side="right" className="w-full overflow-y-auto sm:max-w-none">
            <SheetHeader className="page-shell pr-16">
                <SheetTitle>Navigace MŠ Tyršovka</SheetTitle>
                <SheetDescription>Mateřská škola pro radost z pohybu</SheetDescription>
                <Link href="/" onClick={onClose} className="py-3">Úvodní stránka</Link>
            </SheetHeader>
            {/* Nav links */}
            <nav className="page-shell flex flex-1 flex-col py-6">
                <Accordion type="single" collapsible>
                {DESKTOP_NAV.map((item) =>
                    "sub" in item ? (
                        <AccordionItem key={item.label} value={item.label}>
                            <AccordionTrigger>{item.label}</AccordionTrigger>
                            <AccordionContent>
                                {SUB_ITEMS[item.label]?.map((sub) => (
                                    <Link key={sub.href} href={sub.href} onClick={onClose}
                                        className="block py-3 text-muted-foreground hover:text-foreground">
                                        {sub.label}
                                    </Link>
                                ))}
                            </AccordionContent>
                        </AccordionItem>
                    ) : (
                        <div
                            key={item.label}
                            style={{ borderBottom: "1px solid var(--border)" }}
                        >
                            <Link
                                href={item.href}
                                onClick={onClose}
                                className="block py-4 text-sm font-medium hover:underline"
                            >
                                {item.label}
                            </Link>
                        </div>
                    )
                )}

                </Accordion>

                {/* CTA buttons */}
                <div
                    style={{
                        marginTop: "2rem",
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.75rem",
                    }}
                >
                    <Link
                        href={NAV_ITEMS[4].href}
                        onClick={onClose}
                        className={cn(
                            buttonVariants({ variant: "outline", size: "lg" }),
                            "w-full justify-center rounded-md"
                        )}
                    >
                        <Shield className="size-4" />
                        {NAV_ITEMS[4].label}
                    </Link>
                    <Link
                        href={NAV_ITEMS[5].href}
                        onClick={onClose}
                        className={cn(
                            buttonVariants({ variant: "dark", size: "lg" }),
                            "w-full justify-center rounded-md"
                        )}
                    >
                        {NAV_ITEMS[5].label}
                    </Link>
                </div>
            </nav>
        </SheetContent>
    );
}

// ─── Desktop dropdown ─────────────────────────────────────────────────────────

function DesktopNav() {
    return (
        <NavigationMenu aria-label="Hlavní navigace">
            <NavigationMenuList>
                {DESKTOP_NAV.map((item) => (
                    <NavigationMenuItem key={item.label}>
                        {"sub" in item ? (
                            <>
                                <NavigationMenuTrigger>{item.label}</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="w-56">
                                        {SUB_ITEMS[item.label].map((sub) => (
                                            <li key={sub.href}>
                                                <NavigationMenuLink asChild>
                                                    <Link href={sub.href}>{sub.label}</Link>
                                                </NavigationMenuLink>
                                            </li>
                                        ))}
                                    </ul>
                                </NavigationMenuContent>
                            </>
                        ) : (
                            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                <Link href={item.href}>{item.label}</Link>
                            </NavigationMenuLink>
                        )}
                    </NavigationMenuItem>
                ))}
            </NavigationMenuList>
        </NavigationMenu>
    );
}

// ─── Nav root ─────────────────────────────────────────────────────────────────

export default function Nav() {
    const [mobileOpen, setMobileOpen] = useState(false);

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
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <header className="sticky top-0 z-50 w-full border-b border-border bg-background">
                <div className="page-shell flex items-center justify-between gap-4 py-3">
                    {/* Logo */}
                    <Link href="/" className="flex shrink-0 items-center gap-3">
                        <div className="relative flex size-12 items-center justify-center overflow-hidden rounded-md bg-card">
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
                            href={NAV_ITEMS[4].href}
                            className={cn(
                                buttonVariants({ variant: "outline", size: "sm" }),
                                "rounded-md px-4"
                            )}
                        >
                            <Shield className="size-4" />
                            {NAV_ITEMS[4].label}
                        </Link>
                        <Link
                            href={NAV_ITEMS[5].href}
                            className={cn(
                                buttonVariants({ variant: "dark", size: "sm" }),
                                "rounded-md px-4"
                            )}
                        >
                            {NAV_ITEMS[5].label}
                        </Link>
                    </div>

                    <SheetTrigger asChild>
                        <Button type="button" variant="outline" size="icon"
                            aria-label="Otevřít menu" className="size-11 lg:hidden">
                            <Menu />
                        </Button>
                    </SheetTrigger>
                </div>
            </header>

            <MobileMenu onClose={() => setMobileOpen(false)} />
        </Sheet>
    );
}
