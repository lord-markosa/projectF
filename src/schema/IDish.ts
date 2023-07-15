import { Types } from "mongoose";

export default interface IDish {
    _id: Types.ObjectId;
    name: string;
    description: string;
    price: number;
    nonveg: boolean;
    reviews: Array<number>;
    imageUrl: string;
}
