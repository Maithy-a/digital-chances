import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { profiles } from "../schema/profiles";

export async function getCurrentProfile(userId: string) {
    const result = await db
        .select()
        .from(profiles)
        .where(eq(profiles.authUserId, userId))
        .limit(1);

    return result[0] ?? null;
}