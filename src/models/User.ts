import { Schema, model } from "mongoose";
import IUser from "../schema/IUser";

const userSchema = new Schema<IUser>({
    phoneNumber: { type: String, required: true },
    password: { type: String, required: true },
});

const User = model<IUser>("User", userSchema);

export default User;
