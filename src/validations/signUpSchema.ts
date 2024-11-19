import { z } from "zod";



// const imageSchema = z.any()
// // To not allow empty files
// .refine((files) => files?.length >= 1, { message: 'Photo is required.' })
// // To not allow files other than images




const signUpSchema = z
  .object({
    profile_image:z.custom<File>((val) => val instanceof File, "A image must be selected"),
    first_name: z.string().min(1, { message: "First name is required" }),
    last_name: z.string().min(1, { message: "Last name is required" }),
    email: z.string().min(1, { message: "Email address is required" }).email(),
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
