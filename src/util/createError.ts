import IError from "../schema/IError";

export default function createError(
    description: string,
    statusCode: number,
    data?: any
): IError {
    const error: IError = {
        ...new Error(),
        description,
        statusCode,
        data,
    };

    return error;
}
