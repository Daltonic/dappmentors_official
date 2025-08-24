// Validation schema using Zod
import { z } from "zod";

export const signupSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters long")
    .max(50, "First name must not exceed 50 characters")
    .regex(
      /^[a-zA-Z\s'-]+$/,
      "First name can only contain letters, spaces, hyphens, and apostrophes",
    ),

  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters long")
    .max(50, "Last name must not exceed 50 characters")
    .regex(
      /^[a-zA-Z\s'-]+$/,
      "Last name can only contain letters, spaces, hyphens, and apostrophes",
    ),

  email: z
    .string()
    .email("Please enter a valid email address")
    .max(255, "Email must not exceed 255 characters")
    .toLowerCase(),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(128, "Password must not exceed 128 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number",
    ),

  acceptTerms: z
    .boolean()
    .refine(
      (val) => val === true,
      "You must accept the Terms of Service and Privacy Policy",
    ),
});

export const resendSchema = z.object({
  email: z.string().email("Please enter a valid email address").toLowerCase(),
});
