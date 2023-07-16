import { z } from "zod";
import { cowBreed, cowCategory, cowLabel, cowLocation } from "./cow.constant";
import { Types } from "mongoose";

const createCowZodSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "Name is required" }),
    age: z.number({ required_error: "Age is required" }),
    price: z.string({ required_error: "Price is required" }),
    location: z.enum(cowLocation, { required_error: "Location is required" }),
    breed: z.enum(cowBreed, { required_error: "Breed is required" }),
    weight: z.number({ required_error: "Weight is required" }),
    label: z.enum(cowLabel).optional(),
    category: z.enum(cowCategory, {
      required_error: "Category is required",
    }),
    seller: z
      .string({
        required_error: "Seller is Required",
      })
      .refine((value) => Types.ObjectId.isValid(value), {
        message: "Seller must be a valid ObjectId",
      }),
  }),
});
//   seller: objectIdSchema.or(z.lazy(() => userSchema)),

const updateCowZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    age: z.number().optional(),
    price: z.string().optional(),
    location: z.enum(cowLocation).optional(),
    breed: z.enum(cowBreed).optional(),
    weight: z.number().optional(),
    label: z.enum(cowLabel).optional(),
    category: z.enum(cowCategory).optional(),
    seller: z.instanceof(Types.ObjectId).optional(),
  }),
});

export const CowValidation = {
  createCowZodSchema,
  updateCowZodSchema,
};
