import { Router } from "express";
import addDish from "../controllers/menu/addDish";
import deleteDish from "../controllers/menu/deleteDish";
import updateDish from "../controllers/menu/updateDish";
import dishValidation from "../middleware/dishVallidation";
import isAuth from "../middleware/isAuth";

const dishRoutes = Router();

dishRoutes.use(isAuth);
dishRoutes.post("/:restaurantId", dishValidation, addDish);
dishRoutes.put("/:restaurantId/:dishId", dishValidation, updateDish);
dishRoutes.delete("/:restaurantId/:dishId", deleteDish);

export default dishRoutes;
