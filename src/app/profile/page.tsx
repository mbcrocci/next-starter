import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { getSession } from "@/server/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await getSession();
  if (!session) {
    redirect("/auth/login");
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-6">
      <Label className="text-7xl font-bold">
        Hello {session.user.first_name} !
      </Label>
      <Label className="text-xl">Email: {session.user.email}</Label>

      <div className="flex flex-row items-center space-x-2">
        <Link href="/api/auth/logout">logout</Link>
        <Button variant="destructive">delete account</Button>
      </div>
    </div>
  );
}
