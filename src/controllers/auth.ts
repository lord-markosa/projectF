import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import IUser from "../schema/IUser";
import createError from "../util/createError";
import User from "../models/User";
import { secretString } from "../constants";
import IResponseBody from "../schema/IResponseBody";
import IError from "../schema/IError";

const auth: RequestHandler = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw createError("Validation Failed", 422, errors.array());
        }

        const { phoneNumber, password } = req.body;

        const existingUser = await User.findOne({
            phoneNumber: phoneNumber.substr(phoneNumber.length - 10),
        });

        let user: IUser;
        if (existingUser) {
            // if user is registered

            const isMatch = await bcrypt.compare(
                password,
                existingUser.password
            );
            if (!isMatch) {
                throw createError("Invalid password", 401, [
                    { path: "password" },
                ]);
            }
            user = existingUser;
        } else {
            // new user

            const hashedPassword = await bcrypt.hash(password, 12);
            const newUser = new User({
                phoneNumber: phoneNumber.substr(phoneNumber.length - 10),
                password: hashedPassword,
            });
            await newUser.save();
            user = newUser;
        }

        const token = jwt.sign(
            {
                userId: user._id.toString(),
                phoneNumber,
            },
            secretString,
            // remove expiry in prod
            { expiresIn: "12h" }
        );

        const response: IResponseBody = {
            statusCode: 201,
            message: existingUser ? "LoggedIn" : "User registered",
            user: { phoneNumber, userId: user._id.toString(), token },
        };

        res.status(201).json(response);
    } catch (err) {
        if (!(err as IError).statusCode) {
            const newError = createError((err as Error).message, 500);
            next(newError);
        } else {
            next(err);
        }
    }
};

export default auth;
