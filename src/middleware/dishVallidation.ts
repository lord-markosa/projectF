import { body } from "express-validator";

const dishValidation = [
    body("name").trim().notEmpty().withMessage("Name cannot be empty"),
    body("description")
        .trim()
        .notEmpty()
        .withMessage("Description cannot be empty"),
    body("price")
        .trim()
        .notEmpty()
        .isNumeric()
        .withMessage("Provide a valid price (numeric only)"),
    body("nonveg")
        .trim()
        .isBoolean()
        .withMessage("Provide dish type: ver or non-veg"),
];

export default dishValidation;
