import { Router } from "express";
import createRestaurant from "../controllers/restaurant/createRestaurant";
import getRestaurants from "../controllers/restaurant/getRestaurants";
import isAuth from "../middleware/isAuth";
import restaurantValidation from "../middleware/restaurantValidation";

const restaurantRoutes = Router();

restaurantRoutes.use(isAuth);
restaurantRoutes.get("/", getRestaurants);
restaurantRoutes.post("/", restaurantValidation, createRestaurant);

export default restaurantRoutes;
