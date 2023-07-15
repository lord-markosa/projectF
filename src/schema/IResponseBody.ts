import IDish from "./IDish";
import IRestaurant from "./IRestaurant";

interface User {
    userId: string;
    phoneNumber: string;
    token: string;
}

export default interface IResponseBody {
    statusCode: number;
    message: string;
    user?: User;
    restaurant?: IRestaurant;
    restaurants?: Array<IRestaurant>;
    dish?: IDish;
}
