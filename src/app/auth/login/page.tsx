import { getSession } from "@/server/auth";
import LoginForm from "./login-form";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await getSession();
  if (session) {
    redirect("/profile");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center space-y-8">
      <LoginForm />
    </main>
  );
}
