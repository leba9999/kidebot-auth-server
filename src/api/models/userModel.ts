import mongoose from "mongoose";
import { User } from "../../interfaces/User";

const userModel = new mongoose.Schema<User>({
  username: {
    type: String,
    required: true,
  },
  kideId: {
    type: String,
    required: true,
  },
  admin: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

// Duplicate the ID field.
userModel.virtual("id").get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
userModel.set("toJSON", {
  virtuals: true,
});

export default mongoose.model<User>("users", userModel);
