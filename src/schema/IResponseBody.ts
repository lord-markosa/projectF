interface User {
    userId: string;
    phoneNumber: string;
    token: string;
}

export default interface IResponseBody {
    statusCode: number;
    message: string;
    user?: User;
}
