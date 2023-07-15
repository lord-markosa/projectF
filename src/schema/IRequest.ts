import { Request } from "express";

interface User {
    userId: string;
    phoneNumber: string;
}

export default interface IRequest extends Request {
    user: User;
}
