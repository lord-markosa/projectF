import { model, Schema } from "mongoose";
import IDish from "../schema/IDish";

const dishSchema = new Schema<IDish>(
    {
        name: { type: String, required: true },
        description: { type: String },
        price: { type: Number, required: true },
        nonveg: { type: Boolean, required: true },
        reviews: { type: [Number], default: [] },
        imageUrl: { type: String },
    },
    { timestamps: true }
);

const Dish = model<IDish>("Dish", dishSchema);
export default Dish;
