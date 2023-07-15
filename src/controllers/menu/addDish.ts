import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import Dish from "../../models/Dish";
import Restaurant from "../../models/Restaurant";
import IError from "../../schema/IError";
import IRequest from "../../schema/IRequest";
import IResponseBody from "../../schema/IResponseBody";
import createError from "../../util/createError";

const addDish: RequestHandler = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw createError("Validation Failed", 422, errors.array());
        }

        const restaurantId = req.params.restaurantId;
        const restaurant = await Restaurant.findById(restaurantId);
        if (!restaurant) {
            throw createError("Invalid restaurantId", 404);
        }

        const loadedRequest = req as IRequest;

        if (restaurant.owner.toString() !== loadedRequest.user.userId) {
            throw createError("Unauthorized User", 401);
        }

        const dish = new Dish(req.body);
        restaurant.menu.push(dish._id);

        await Promise.all([await dish.save(), await restaurant.save()]);

        const response: IResponseBody = {
            statusCode: 201,
            message: "Dish created",
            dish,
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

export default addDish;
