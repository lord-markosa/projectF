import { Types } from "mongoose";

export default interface IUser {
    _id: Types.ObjectId;
    phoneNumber: string;
    password: string;
    // user details: []
    // user cart: []
    // orders: []
}
