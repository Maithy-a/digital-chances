import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { profiles } from "@/app/db/schema/profiles";
import { requireAuth } from "./requireAuth";

type Role = "HR" | "SUPERVISOR" | "EMPLOYEE";

export async function requireRole(allowedRoles: Role[]) {
    const session = await requireAuth();

    const result = await db
        .select()
        .from(profiles)
        .where(eq(profiles.authUserId, session.user.id))
        .limit(1);

    const profile = result[0];

    if (!profile) {
        throw new Error("Profile not found");
    }

    if (!allowedRoles.includes(profile.role)) {
        throw new Error("Forbidden");
    }

    return {
        session,
        profile,
    };
}