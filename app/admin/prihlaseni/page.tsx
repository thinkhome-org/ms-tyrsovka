import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/cms/auth";
import { LoginForm } from "./login-form";

export const dynamic = "force-dynamic";

export default async function LoginPage() {
    if (await isAdmin()) {
        redirect("/admin");
    }

    return (
        <main className="flex flex-1 items-center justify-center px-5 py-16">
            <div className="w-full max-w-md">
                <p className="text-center text-[0.7rem] font-medium uppercase tracking-[0.28em] text-muted-foreground">
                    Jen pro školku
                </p>
                <h1 className="mt-3 text-center font-heading text-4xl font-semibold tracking-tight">
                    Nástěnka
                </h1>
                <p className="mx-auto mt-3 max-w-sm text-center text-sm leading-relaxed text-muted-foreground">
                    Sem se připínají novinky pro rodiče. Stejné heslo používá vedení
                    školky.
                </p>
                <LoginForm />
            </div>
        </main>
    );
}
