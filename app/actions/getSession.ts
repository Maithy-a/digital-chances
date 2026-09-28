"use server";

import { requireAuth } from "@/lib/auth/requireAuth";

export async function getSession() {
    try {
        const session = await requireAuth();

        return {
            success: true,
            session,
        };
    } catch (error) {
        console.error("GET SESSION ERROR:", error);

        return {
            success: false,
            error: error instanceof Error ? error.message : "Unknown error",
        };
    }
}