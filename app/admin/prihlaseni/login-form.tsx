"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginForm() {
    const router = useRouter();
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [pending, setPending] = useState(false);

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setPending(true);
        setError("");
        try {
            const response = await fetch("/api/admin/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password }),
            });
            if (!response.ok) {
                const payload = (await response.json().catch(() => null)) as
                    | { error?: string }
                    | null;
                setError(payload?.error || "Přihlášení se nepovedlo.");
                return;
            }
            router.push("/admin");
            router.refresh();
        } finally {
            setPending(false);
        }
    }

    return (
        <form
            onSubmit={onSubmit}
            className="mt-10 rounded-2xl border border-border bg-card/90 p-6 shadow-[0_18px_50px_-28px_rgba(40,28,12,0.45)] sm:p-8"
        >
            <div className="flex flex-col gap-2">
                <Label htmlFor="password">Heslo redakce</Label>
                <Input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                />
            </div>
            {error ? (
                <p className="mt-3 text-sm text-destructive" role="alert">
                    {error}
                </p>
            ) : null}
            <Button type="submit" className="mt-6 w-full" disabled={pending}>
                {pending ? "Otevírám…" : "Vstoupit"}
            </Button>
        </form>
    );
}
