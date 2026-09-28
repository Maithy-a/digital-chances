"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth/auth-client";

export default function RegisterPage() {
    const router = useRouter();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        setError("");

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setIsLoading(true);

        const { error } = await authClient.signUp.email({
            name,
            email,
            password,
        });

        if (error) {
            setError(error.message || "Unable to create your account.");
            setIsLoading(false);
            return;
        }

        router.push("/dashboard");
        router.refresh();
    }

    return (
        <div className="w-full max-w-md">
            <div className="mb-8">
                <p className="text-sm font-medium text-brand mb-2">
                    Staff registration
                </p>

                <h1 className="font-display text-3xl font-semibold tracking-tight">
                    Create your account
                </h1>

                <p className="mt-2 text-sm text-slate-500">
                    Create your Digital Chances HR staff account.
                </p>
            </div>

            <div className="rounded-xl border border-line bg-white p-6 shadow-sm">
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium mb-2"
                        >
                            Full name
                        </label>

                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            placeholder="Your full name"
                            required
                            autoComplete="name"
                            className="w-full rounded-md border border-line bg-panel px-3 py-2.5 text-sm outline-none transition focus:border-brand focus:ring-1 focus:ring-brand"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium mb-2"
                        >
                            Email
                        </label>

                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            placeholder="you@example.com"
                            required
                            autoComplete="email"
                            className="w-full rounded-md border border-line bg-panel px-3 py-2.5 text-sm outline-none transition focus:border-brand focus:ring-1 focus:ring-brand"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium mb-2"
                        >
                            Password
                        </label>

                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            placeholder="Create a password"
                            required
                            minLength={8}
                            autoComplete="new-password"
                            className="w-full rounded-md border border-line bg-panel px-3 py-2.5 text-sm outline-none transition focus:border-brand focus:ring-1 focus:ring-brand"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="confirmPassword"
                            className="block text-sm font-medium mb-2"
                        >
                            Confirm password
                        </label>

                        <input
                            id="confirmPassword"
                            type="password"
                            value={confirmPassword}
                            onChange={(event) =>
                                setConfirmPassword(event.target.value)
                            }
                            placeholder="Confirm your password"
                            required
                            minLength={8}
                            autoComplete="new-password"
                            className="w-full rounded-md border border-line bg-panel px-3 py-2.5 text-sm outline-none transition focus:border-brand focus:ring-1 focus:ring-brand"
                        />
                    </div>

                    {error && (
                        <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2.5">
                            <p className="text-sm text-red-600">
                                {error}
                            </p>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full rounded-md bg-brand px-4 py-2.5 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {isLoading ? "Creating account..." : "Create account"}
                    </button>
                </form>
            </div>

            <p className="mt-6 text-center text-sm text-slate-500">
                Already have an account?{" "}
                <Link
                    href="/login"
                    className="font-medium text-brand hover:underline"
                >
                    Sign in
                </Link>
            </p>
        </div>
    );
}