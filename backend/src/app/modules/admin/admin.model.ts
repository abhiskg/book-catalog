import bcrypt from "bcrypt";
import { Schema, model } from "mongoose";
import { adminRole } from "./admin.constant";
import type { AdminModel, IAdmin, IAdminMethods } from "./admin.interface";

const adminSchema = new Schema<IAdmin, AdminModel, IAdminMethods>(
  {
    role: {
      type: String,
      required: true,
      enum: adminRole,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      required: true,
      type: {
        firstName: {
          type: String,
          required: true,
        },
        lastName: {
          type: String,
          required: true,
        },
      },
    },
    address: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

adminSchema.set("toJSON", {
  transform: function (doc, ret) {
    delete ret.password;
    return ret;
  },
});

adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(this.password, salt);
  this.password = hashPassword;
});

adminSchema.methods.isPasswordMatched = async function (
  enteredPassword,
  savedPassword
) {
  return await bcrypt.compare(enteredPassword, savedPassword);
};

const Admin = model<IAdmin, AdminModel>("Admin", adminSchema);
export default Admin;
