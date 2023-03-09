import { model, Schema } from "mongoose";

export interface User {
  address: string;
  name?: string;
  balance: string;
  avatarUrl?: string;
}
const UserSchema = new Schema({
  address: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    default: 0,
  },
  avatarUrl: {
    type: String,
  },
});

const UserModel = model("User", UserSchema);
export default UserModel;
