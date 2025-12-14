import z from "zod";

export const loginSchema = z.object({
  identifier: z.string().min(1, "Identifier is required"),
  password: z.string().min(1, "Password is required"),
});

export const registerSchema = z.object({
  displayName: z.string().min(1, "Display name is required"),
  email: z.string().email("Invalid email address"),
  userName: z.string().min(1, "Username is required"),
  password: z.string().min(6, "Password must be at least 6 characters long"),

  status: z.string().optional(),
});
