import { z } from "zod";
import { userRoles } from "../user/user.constant";

const signUpUserZodSchema = z
  .object({
    body: z
      .object({
        role: z.enum(userRoles, {
          required_error: "Role is required",
        }),
        password: z.string({ required_error: "Password is required" }),
        phoneNumber: z.string({ required_error: "Phone number is required" }),
        name: z.object({
          firstName: z.string({ required_error: "First name is required" }),
          lastName: z.string({ required_error: "Last name is required" }),
        }),
        address: z.string({ required_error: "Address is required" }),
        budget: z.number().optional(),
        income: z.number().optional(),
      })
      .strict(),
  })
  .refine(
    (field) =>
      (field.body.role === "buyer" && field.body.income === 0) ||
      (field.body.role === "seller" && field.body.budget === 0),
    (field) => ({
      message: `${field.body.role} can't have ${
        field.body.role === "buyer" ? "income" : "budget"
      }`,
    })
  );

const loginUserZodSchema = z.object({
  body: z
    .object({
      password: z.string({ required_error: "Password is required" }),
      phoneNumber: z.string({ required_error: "Phone number is required" }),
    })
    .strict(),
});

const refreshTokenZodSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: "Refresh Token is required",
    }),
  }),
});

export const AuthValidation = {
  signUpUserZodSchema,
  loginUserZodSchema,
  refreshTokenZodSchema,
};
