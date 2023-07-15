import { RequestHandler } from "express";
import Dish from "../../models/Dish";
import Restaurant from "../../models/Restaurant";
import IError from "../../schema/IError";
import IRequest from "../../schema/IRequest";
import IResponseBody from "../../schema/IResponseBody";
import createError from "../../util/createError";

const deleteDish: RequestHandler = async (req, res, next) => {
    try {
        const dishId = req.params.dishId;
        const restaurantId = req.params.restaurantId;

        const restaurant = await Restaurant.findById(restaurantId);
        if (!restaurant) {
            throw createError("Invalid RestaurantId", 404);
        }

        const idx = restaurant.menu.findIndex(
            (item) => item._id.toString() === dishId
        );

        if (idx == -1) {
            throw createError("Invalid DishId", 404);
        }

        const loadedRequest = req as IRequest;
        if (restaurant.owner.toString() !== loadedRequest.user.userId) {
            throw createError("Unauthorized User", 401);
        }

        restaurant.menu.splice(idx, 1);

        await Promise.all([
            await Dish.deleteOne({ _id: dishId }),
            await restaurant.save(),
        ]);

        const responseBody: IResponseBody = {
            statusCode: 200,
            message: "Dish deleted",
        };

        res.status(200).json(responseBody);
    } catch (err) {
        if (!(err as IError).statusCode) {
            const newError = createError((err as Error).message, 500);
            next(newError);
        } else {
            next(err);
        }
    }
};

export default deleteDish;
