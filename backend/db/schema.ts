import { relations } from "drizzle-orm";
import {
  pgTable,
  primaryKey,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  displayName: text("display_name").notNull(),
  userName: text("user_name").notNull().unique(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),

  status: text("status").notNull().default("active"),

  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const userRelations = relations(usersTable, ({ many }) => ({
  rolesToUsers: many(rolesToUsersTable),
}));

export const permissionsTable = pgTable("permissions", {
  id: uuid("id").primaryKey().defaultRandom(),

  displayName: text("display_name").notNull(),
  description: text("description"),
});

export const permissionRelations = relations(permissionsTable, ({ many }) => ({
  permissionsToRoles: many(permissionsToRolesTable),
}));

export const rolesTable = pgTable("roles", {
  id: uuid("id").primaryKey().defaultRandom(),

  displayName: text("display_name").notNull(),
  description: text("description"),
});

export const roleRelations = relations(rolesTable, ({ many }) => ({
  permissionsToRoles: many(permissionsToRolesTable),
  rolesToUsers: many(rolesToUsersTable),
}));

export const rolesToUsersTable = pgTable(
  "roles_to_users",
  {
    roleId: uuid("role_id")
      .notNull()
      .references(() => rolesTable.id),
    userId: uuid("user_id")
      .notNull()
      .references(() => usersTable.id),
  },
  (t) => [
    primaryKey({
      columns: [t.roleId, t.userId],
    }),
  ]
);

export const rolesToUsersRelations = relations(
  rolesToUsersTable,
  ({ one }) => ({
    role: one(rolesTable, {
      fields: [rolesToUsersTable.roleId],
      references: [rolesTable.id],
    }),
    user: one(usersTable, {
      fields: [rolesToUsersTable.userId],
      references: [usersTable.id],
    }),
  })
);

export const permissionsToRolesTable = pgTable(
  "permissions_to_roles",
  {
    permissionId: uuid("permission_id")
      .notNull()
      .references(() => permissionsTable.id),
    roleId: uuid("role_id")
      .notNull()
      .references(() => rolesTable.id),
  },
  (t) => [
    primaryKey({
      columns: [t.permissionId, t.roleId],
    }),
  ]
);

export const permissionsToRolesRelations = relations(
  permissionsToRolesTable,
  ({ one }) => ({
    permission: one(permissionsTable, {
      fields: [permissionsToRolesTable.permissionId],
      references: [permissionsTable.id],
    }),
    role: one(rolesTable, {
      fields: [permissionsToRolesTable.roleId],
      references: [rolesTable.id],
    }),
  })
);
