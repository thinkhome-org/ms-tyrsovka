import { buttonVariants } from "@/components/ui/button";

export const linkButtonOutlineSm = buttonVariants({ variant: "outline", size: "sm" });

// Preserve the existing 40px link height despite the historical Lg name.
export const linkButtonPrimaryLg = buttonVariants();
