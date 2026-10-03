"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth/auth-client";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  async function handleSignOut() {
    const { error } = await authClient.signOut();
    console.log("Error", error);
    router.push("/sign-in");
    router.refresh();
  }

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-semibold">Dashboard</h1>

        <p className="mt-2 text-gray-500">Welcome to Digital Chances HR.</p>

        <div className="mt-8">
          <Button type="button" onClick={handleSignOut}>
            Logout
          </Button>
        </div>
      </div>
    </main>
  );
}
