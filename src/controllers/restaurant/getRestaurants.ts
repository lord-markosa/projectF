import { RequestHandler } from "express";
import Restaurant from "../../models/Restaurant";
import IResponseBody from "../../schema/IResponseBody";
import createError from "../../util/createError";

const getRestaurants: RequestHandler = async (req, res, next) => {
    try {
        const restaurants = await Restaurant.find().populate("menu");

        const responseBody: IResponseBody = {
            statusCode: 200,
            message: "Fetched all",
            restaurants,
        };

        res.status(200).json(responseBody);
    } catch (err) {
        const newError = createError((err as Error).message, 500);
        next(newError);
    }
};

export default getRestaurants;
