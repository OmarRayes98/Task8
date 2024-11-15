import { z } from "zod";

const addOrEditFormSchema = z.object({
  name: z.string().min(1, { message: "Name  is required" }),
  price: z.string().min(1, { message: "Price is required" }),
});

type formType = z.infer<typeof addOrEditFormSchema>;

export { addOrEditFormSchema, type formType };
