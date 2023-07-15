import { RequestHandler } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { secretString } from "../constants";
import User from "../models/User";
import IError from "../schema/IError";
import IRequest from "../schema/IRequest";
import createError from "../util/createError";

interface CurrentUser {
    userId: string;
    phoneNumber: string;
}

const isAuth: RequestHandler = async (req, res, next) => {
    try {
        const token = req.get("Authorization");
        if (!token) {
            throw createError("Token not provided", 401);
        }

        const decodedToken = jwt.verify(token, secretString) as JwtPayload;
        if (!decodedToken) {
            throw createError("User not authorized", 401);
        }
        const user = decodedToken as CurrentUser;
        (req as IRequest).user = user;

        // TODO: conditions to check if it is a valid user

        next();
    } catch (err) {
        if (!(err as IError).statusCode) {
            const newError = createError((err as Error).message, 500);
            next(newError);
        } else {
            next(err);
        }
    }
};

export default isAuth;
