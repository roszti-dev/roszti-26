"use server";

import { cookies } from "next/headers";
import type z from "zod";
import type { loginSchema } from "@/types/auth.types";

export async function login(dto: z.infer<typeof loginSchema>) {
  const jar = await cookies();

  console.log("API_URL:", process.env.API_URL);
  console.log("Login DTO:", dto);

  const response = await fetch(`${process.env.API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dto),
  });

  if (!response.ok) {
    throw new Error("Failed to sign in");
  }

  const data = await response.json();
  jar.set("access_token", data.token);
}

export async function logout() {
  const jar = await cookies();
  jar.delete("access_token");
}
