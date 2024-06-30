import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,

    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true  // Corrected from `timestamp` to `timestamps`
  }
);

const User = mongoose.model("user", userSchema);

export default User;
