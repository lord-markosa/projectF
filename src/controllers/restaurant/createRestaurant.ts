import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import { Types } from "mongoose";
import Restaurant from "../../models/Restaurant";
import IError from "../../schema/IError";
import IRequest from "../../schema/IRequest";
import IResponseBody from "../../schema/IResponseBody";
import createError from "../../util/createError";

const createRestaurant: RequestHandler = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw createError("Validation Failed", 422, errors.array());
        }

        const loadedRequest = req as IRequest;

        const restaurant = new Restaurant({
            name: req.body.name,
            owner: new Types.ObjectId(loadedRequest.user.userId),
        });

        await restaurant.save();

        const responseBody: IResponseBody = {
            statusCode: 201,
            message: "Restaurant created",
            restaurant,
        };

        res.status(201).json(responseBody);
    } catch (err) {
        if (!(err as IError).statusCode) {
            const newError = createError((err as Error).message, 500);
            next(newError);
        } else {
            next(err);
        }
    }
};

export default createRestaurant;
