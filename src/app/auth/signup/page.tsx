import { getSession } from "@/server/auth";
import SignupForm from "./signup-form";
import { redirect } from "next/navigation";

export default async function SignupPage() {
  const session = await getSession();
  if (session) {
    redirect("/profile");
  }

  console.log(session);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center space-y-8">
      <SignupForm />
    </main>
  );
}
