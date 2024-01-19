import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center space-y-8">
      <h3 className="text-6xl font-bold">
        Welcome to <span className="text-primary">App</span>
      </h3>
      <Link
        className={cn(
          "bg-primary p-6 text-xl text-white",
          buttonVariants({ variant: "default" }),
        )}
        href="/auth/signup"
      >
        Start
      </Link>
    </main>
  );
}
