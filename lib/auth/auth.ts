import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { betterAuth } from "better-auth";
import { db } from "@/lib/db";
import { profiles } from "@/app/db/schema/profiles";
import * as authSchema from "@/app/db/schema/auth";

if (!process.env.BETTER_AUTH_SECRET) {
    throw new Error("BETTER_AUTH_SECRET is not defined.");
}

if (!process.env.BETTER_AUTH_URL) {
    throw new Error("BETTER_AUTH_URL is not defined.");
}

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg",
        schema: authSchema,
    }),

    emailAndPassword: {
        enabled: true,
    },

    databaseHooks: {
        user: {
            create: {
                after: async (user) => {
                    await db.insert(profiles).values({
                        authUserId: user.id,
                    });
                },
            },
        },
    },

    session: {
        expiresIn: 60 * 60 * 24 * 7,
        updateAge: 60 * 60 * 24,
    },

    secret: process.env.BETTER_AUTH_SECRET,
    baseURL: process.env.BETTER_AUTH_URL,
});