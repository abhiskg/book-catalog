import { z } from "zod";
import { userRoles } from "../user/user.constant";

const updateUserZodSchema = z.object({
  body: z
    .object({
      role: z.enum(userRoles).optional(),
      password: z.string().optional(),
      phoneNumber: z.string().optional(),
      name: z
        .object({
          firstName: z.string().optional(),
          lastName: z.string().optional(),
        })
        .optional(),
      address: z.string().optional(),
      budget: z.number().optional(),
      income: z.number().optional(),
    })
    .strict(),
});

export const UserValidation = {
  updateUserZodSchema,
};
