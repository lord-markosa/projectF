import { model, Schema } from "mongoose";
import IRestaurant from "../schema/IRestaurant";

const restaurantSchema = new Schema<IRestaurant>(
    {
        name: { type: String, required: true },
        reviews: { type: [Number], default: [] },
        menu: {
            type: [{ type: Schema.Types.ObjectId, ref: "Dish" }],
            default: [],
        },
        owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
    },
    { timestamps: true }
);

const Restaurant = model<IRestaurant>("Restaurant", restaurantSchema);
export default Restaurant;
