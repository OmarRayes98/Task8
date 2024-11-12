import { z } from "zod";




const signUpSchema = z
  .object({
    first_name: z.string().min(1, { message: "First name is required" }),
    last_name: z.string().min(1, { message: "Last name is required" }),
    email: z.string().min(1, { message: "Email address is required" }).email(),
    profile_image: z.instanceof(File).refine(
      (file) => file !== null && file !== undefined,
      { message: "Please select a file" }
    ),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters longs" })
      .regex(/.*[!@#$%^&*()_+{}|[\]\\:";'<>?,./].*/, {
        message: "Password should contain at least 1 special character",
      }),
      password_confirmation: z
      .string()
      .min(1, { message: "Confirm Password is required" }),
  })
  .refine((input) => input.password === input.password_confirmation, {
    message: "Password and Confirm Password does not match",
    path: ["password_confirmation"],
  });

type signUpType = z.infer<typeof signUpSchema>;

export { signUpSchema, type signUpType };
