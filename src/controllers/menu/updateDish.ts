import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import Dish from "../../models/Dish";
import Restaurant from "../../models/Restaurant";
import IDish from "../../schema/IDish";
import IError from "../../schema/IError";
import IRequest from "../../schema/IRequest";
import IResponseBody from "../../schema/IResponseBody";
import createError from "../../util/createError";

const updateDish: RequestHandler = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw createError("Validation Failed", 422, errors.array());
        }

        const restaurantId = req.params.restaurantId;
        const dishId = req.params.dishId;

        const restaurant = await Restaurant.findById(restaurantId);
        if (!restaurant) {
            throw createError("Invalid restaurantId", 404);
        }

        const idx = restaurant.menu.findIndex(
            (item) => item._id.toString() === dishId
        );
        const dish = await Dish.findById(dishId);

        if (idx === -1 || !dish) {
            throw createError("Invalid dishId", 404);
        }

        const loadedRequest = req as IRequest;
        if (restaurant.owner.toString() !== loadedRequest.user.userId) {
            throw createError("Unathorized User", 401);
        }

        const updates: IDish = req.body;
        dish.name = updates.name;
        dish.description = updates.description;
        dish.price = updates.price;
        dish.nonveg = updates.nonveg;

        await dish.save();

        const response: IResponseBody = {
            statusCode: 200,
            message: "Dish updated",
            dish,
        };

        res.status(200).json(response);
    } catch (err) {
        if (!(err as IError).statusCode) {
            const newError = createError((err as Error).message, 500);
            next(newError);
        } else {
            next(err);
        }
    }
};

export default updateDish;
