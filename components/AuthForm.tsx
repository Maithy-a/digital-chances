"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { authFormSchema } from "@/lib/utils";
import { authClient } from "@/lib/auth/auth-client";

export function AuthForm({ type }: { type: string }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState("");

  const formSchema = authFormSchema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setAuthError("");

    try {
      if (type === "sign-up") {
        const { error } = await authClient.signUp.email({
          name: data.name ?? "",
          email: data.email,
          password: data.password,
        });

        if (error) {
          setAuthError(error.message || "Unable to create your account.");
          return;
        }
      }

      if (type === "sign-in") {
        const { error } = await authClient.signIn.email({
          email: data.email,
          password: data.password,
        });

        if (error) {
          setAuthError(error.message || "Invalid email or password.");
          return;
        }
      }

      router.push("/dashboard");
      router.refresh();
    } catch {
      setAuthError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  const isSignIn = type === "sign-in";

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-6"
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">
            {isSignIn ? "Welcome back" : "Create an account"}
          </h1>

          <p className="text-sm text-balance text-muted-foreground">
            {isSignIn
              ? "Login to your Digital Chances Inc account"
              : "Enter your information below to create your account."}
          </p>
        </div>

        {!isSignIn && (
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Full name</FieldLabel>

                <Input
                  {...field}
                  id={field.name}
                  type="text"
                  placeholder="Olive Smith"
                  autoComplete="name"
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        )}

        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Email</FieldLabel>

              <Input
                {...field}
                id={field.name}
                type="email"
                placeholder="smith@example.com"
                autoComplete="email"
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <div className="flex items-center">
                <FieldLabel htmlFor={field.name}>Password</FieldLabel>

                {isSignIn && (
                  <Link
                    href="/forgot-password"
                    className="ml-auto text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                )}
              </div>

              <Input
                {...field}
                id={field.name}
                type="password"
                placeholder="••••••••"
                autoComplete={isSignIn ? "current-password" : "new-password"}
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {authError && <FieldError>{authError}</FieldError>}

        <Field>
          <Button
            type="submit"
            size="lg"
            className="form-btn "
            disabled={isLoading}
          >
            {isLoading
              ? isSignIn
                ? "Signing in..."
                : "Signing up..."
              : isSignIn
                ? "Sign in"
                : "Sign up"}
          </Button>
        </Field>

        <Field>
          <FieldDescription className="px-6 text-center">
            {isSignIn ? (
              <>
                Don&apos;t have an account?{" "}
                <Link href="/sign-up" className="underline underline-offset-4">
                  Sign up
                </Link>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <Link href="/sign-in" className="underline underline-offset-4">
                  Sign in
                </Link>
              </>
            )}
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
