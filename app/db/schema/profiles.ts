import {
    pgTable,
    text,
    timestamp,
    uuid,
} from "drizzle-orm/pg-core";
import {gendersEnum, rolesEnum} from "./enums";
import {relations} from "drizzle-orm";
import {user} from "@/app/db/schema/auth/user";

export const profiles = pgTable("profiles", {
    id: uuid("id")
        .defaultRandom()
        .primaryKey(),

    authUserId: text("auth_user_id")
        .notNull()
        .unique()
        .references(() => user.id, {
            onDelete: "cascade",
        }),

    role: rolesEnum()
        .default("EMPLOYEE")
        .notNull(),

    gender: gendersEnum(),

    createdAt: timestamp("created_at")
        .defaultNow()
        .notNull(),

    updatedAt: timestamp("updated_at")
        .defaultNow()
        .notNull()
        .$onUpdate(() => new Date()),
})

export const profileRelations = relations(profiles, ({one}) => ({
    user: one(user, {
        fields: [profiles.authUserId],
        references: [user.id],
    }),
}));