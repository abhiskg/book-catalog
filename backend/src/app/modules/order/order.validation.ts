import { Types } from "mongoose";
import { z } from "zod";

const createOrderZodSchema = z.object({
  body: z.object({
    cow: z
      .string({
        required_error: "Cow Id is Required",
      })
      .refine((value) => Types.ObjectId.isValid(value), {
        message: "Cow Id must be a valid ObjectId",
      }),
    buyer: z
      .string({
        required_error: "Buyer Id is Required",
      })
      .refine((value) => Types.ObjectId.isValid(value), {
        message: "Buyer Id must be a valid ObjectId",
      }),
  }),
});

export const OrderValidation = {
  createOrderZodSchema,
};
