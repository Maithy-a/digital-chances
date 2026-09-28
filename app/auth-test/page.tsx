"use client";

import { authClient } from "@/lib/auth/auth-client";
import { getSession } from "@/app/actions/getSession";

export default function AuthTestPage() {

    async function handleSignUp() {
        const { data, error } = await authClient
            .signUp
            .email({
                name: "Maithya Wambui",
                email: "wambuimwaithya@outlook.com",
                password: "#maithya123",
            });

        console.log("SIGN UP DATA:", data);
        console.log("SIGN UP ERROR:", error);
    }

    async function handleSignIn() {
        const { data, error } = await authClient
            .signIn
            .email({
                email: "wambuimwaithya@outlook.com",
                password: "#maithya123",
            });

        console.log("SIGN IN DATA:", data);
        console.log("SIGN IN ERROR", error)
    }

    async function handleGetSession() {
        const session = await getSession();

        console.log("SESSION:", session);
    }

    async function handleSignOut() {
        const { error } = await authClient.signOut();
        console.log("Error", error)
    }



    return (
        <main className="p-8 h-full min-h-full max-w-full flex items-center justify-center">
            <div className="gap-3 flex flex-col w-full">
                <button
                    type="button"
                    onClick={handleSignUp}
                    className="px-5 py-2.5 text-brand border-brand rounded-md font-medium text-sm">
                    Sign up
                </button>

                <button
                    type="button"
                    onClick={handleSignIn}
                    className="px-5 py-2.5 bg-brand text-white rounded-md font-medium text-sm"
                >
                    Sign in
                </button>

                <button
                    type="button"
                    onClick={handleSignOut}
                    className="px-5 py-2.5 border rounded-md font-medium text-sm"
                >
                    Sign Out
                </button>

                <button
                    type="button"
                    onClick={handleGetSession}
                    className="px-5 py-2.5 bg-black text-white rounded-md font-medium text-sm"
                >
                    Get Session
                </button>
            </div>
        </main>
    );
}