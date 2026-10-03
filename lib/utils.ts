import z from "zod";

export { cn } from "cn";

export const authFormSchema = (type: string) =>
  z.object({
    name:
      type === "sign-in"
        ? z.string().optional()
        : z.string().min(3, "Name must be at least 3 characters"),

    email: z.email("Please enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
  });
