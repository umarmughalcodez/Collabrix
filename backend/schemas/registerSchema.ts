import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .min(3, "Name is Required")
    .max(50, "Name must be 50 characters or less"),
  username: z
    .string()
    .min(5, "Username must be at least 5 characters long")
    .max(50, "Username must not exceed 50 characters"),
  email: z.email("Invalid email format"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(50, "Password must be 50 characters or less"),
});

export type RegisterInput = z.infer<typeof registerSchema>;
