import { body } from "express-validator";

const restaurantValidation = [
    body("name").trim().notEmpty().withMessage("Name cannot be empty"),
];

export default restaurantValidation;
