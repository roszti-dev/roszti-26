import { zValidator } from "@hono/zod-validator";
import { eq, or } from "drizzle-orm";
import { Hono } from "hono";
import { sign } from "hono/jwt";
import { db } from "../db";
import { usersTable } from "../db/schema";
import { loginSchema, registerSchema } from "../types/auth.types";

export const authRouter = new Hono();

async function hashPassword(password: string): Promise<string> {
  return await Bun.password.hash(password, {
    algorithm: "argon2id",
    memoryCost: 19456,
    timeCost: 2,
  });
}

async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return await Bun.password.verify(password, hashedPassword);
}

async function getToken(id: string, email: string, name: string) {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new Error("JWT_SECRET environment variable is not defined");
  }
  return sign(
    {
      id,
      email,
      name,
      exp: Math.floor(Date.now() / 1000) + 60 * 120,
    },
    jwtSecret
  );
}

authRouter.post("/login", zValidator("json", loginSchema), async (c) => {
  const { identifier, password } = c.req.valid("json");

  const user = await db.query.usersTable.findFirst({
    where: or(
      eq(usersTable.email, identifier),
      eq(usersTable.userName, identifier)
    ),
  });

  if (!user) {
    return c.json({ message: "Invalid credentials" }, 401);
  }

  const isPasswordValid = await verifyPassword(password, user.passwordHash);

  if (!isPasswordValid) {
    return c.json({ message: "Invalid credentials" }, 401);
  }

  const token = await getToken(user.id, user.email, user.displayName);

  return c.json({ token });
});

authRouter.post("/register", zValidator("json", registerSchema), async (c) => {
  const { displayName, userName, email, password } = c.req.valid("json");

  const existingUser = await db.query.usersTable.findFirst({
    where: or(eq(usersTable.email, email), eq(usersTable.userName, userName)),
  });

  if (existingUser) {
    return c.json({ message: "User already exists" }, 409);
  }

  const passwordHash = await hashPassword(password);

  const [newUser] = await db
    .insert(usersTable)
    .values({
      displayName,
      userName,
      email,
      passwordHash,
    })
    .returning();

  const token = await getToken(newUser.id, newUser.email, newUser.displayName);

  return c.json({ token }, 201);
});
