"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function LogoutButton() {
    const router = useRouter();

    async function logout() {
        await fetch("/api/admin/logout", { method: "POST" });
        router.push("/admin/prihlaseni");
        router.refresh();
    }

    return (
        <Button type="button" variant="outline" size="sm" onClick={logout}>
            Odhlásit
        </Button>
    );
}
