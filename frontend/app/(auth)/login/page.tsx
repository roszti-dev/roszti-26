"use client";

import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import type z from "zod";
import { login } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { loginSchema } from "@/types/auth.types";

export default function LoginPage() {
  const router = useRouter();

  const form = useForm<z.infer<typeof loginSchema>>({
    defaultValues: { identifier: "", password: "" },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      await login(data);
      router.push("/");
      toast.success("Logged in successfully!");
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
      console.error("Login failed:", error);
    }
  });

  return (
    <div className="flex grow items-center justify-center">
      <div className="space-y-4 rounded-md border bg-card p-4">
        <p className="font-semibold text-2xl">Sign In</p>
        <form onSubmit={onSubmit} className="min-w-md space-y-4">
          <FieldGroup className="gap-4">
            <Controller
              name="identifier"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field className="">
                  <FieldLabel>Email</FieldLabel>
                  <Input
                    {...field}
                    aria-invalid={fieldState.invalid}
                    className="w-full"
                  />
                  {fieldState.invalid ? (
                    <FieldError errors={[fieldState.error]} />
                  ) : null}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field className="">
                  <FieldLabel>Password</FieldLabel>
                  <Input
                    {...field}
                    type="password"
                    aria-invalid={fieldState.invalid}
                    className="w-full"
                  />
                  {fieldState.invalid ? (
                    <FieldError errors={[fieldState.error]} />
                  ) : null}
                </Field>
              )}
            />
          </FieldGroup>
          <Button type="submit" className="w-full">
            Sign In
          </Button>
        </form>
      </div>
    </div>
  );
}
