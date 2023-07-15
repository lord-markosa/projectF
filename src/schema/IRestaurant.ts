import { Types } from "mongoose";

export default interface IRestaurant {
    _id: Types.ObjectId;
    name: string;
    reviews: Array<number>;
    menu: Array<Types.ObjectId>;
    owner: Types.ObjectId;
    // moreInfo: {}
    // orders: [];
}
