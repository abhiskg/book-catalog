import { z } from "zod";
import { adminRole } from "./admin.constant";

const createAdminZodSchema = z.object({
  body: z
    .object({
      role: z.enum(adminRole, {
        required_error: "Role is required",
      }),
      password: z.string({ required_error: "Password is required" }),
      phoneNumber: z.string({ required_error: "Phone number is required" }),
      name: z.object({
        firstName: z.string({ required_error: "First name is required" }),
        lastName: z.string({ required_error: "Last name is required" }),
      }),
      address: z.string({ required_error: "Address is required" }),
    })
    .strict(),
});

const loginAdminZodSchema = z.object({
  body: z
    .object({
      password: z.string({ required_error: "Password is required" }),
      phoneNumber: z.string({ required_error: "Phone number is required" }),
    })
    .strict(),
});

export const AdminValidation = {
  createAdminZodSchema,
  loginAdminZodSchema,
};
