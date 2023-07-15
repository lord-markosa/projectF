import { body } from "express-validator";

const authValidation = [
    body("phoneNumber").trim().notEmpty().isMobilePhone("en-IN"),
    body("password")
        .trim()
        .notEmpty()
        .withMessage("Password cannot be empty")
        .isLength({ max: 6, min: 6 })
        .isNumeric()
        .withMessage("Provide a 6 digit pin"),
];

export default authValidation;

// Password 6 digit pin
