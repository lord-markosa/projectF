import { ErrorRequestHandler } from "express";

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
    res.status(error.statusCode).json(error);
};
export default errorHandler;
