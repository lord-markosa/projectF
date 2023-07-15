import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import defaultRoute from "./routes/defaultRoute";
import { mongodbPass, mongodbUser, port } from "./constants";
import authRoutes from "./routes/authRoutes";
import setHeaderConfig from "./middleware/setHeaderConfig";
import errorHandler from "./middleware/errorHandler";
import restaurantRoutes from "./routes/restaurantRoutes";
import dishRoutes from "./routes/dishRoutes";

const app = express();

app.use(cors());
app.use(helmet());
app.use(setHeaderConfig);
app.use(bodyParser.json());

app.use("/auth", authRoutes);
app.use("/restaurant", restaurantRoutes);
app.use("/dish", dishRoutes);
app.use("/", defaultRoute);
app.use(errorHandler);

// DATABASE CONNECTION
const url = `mongodb+srv://${mongodbUser}:${mongodbPass}@projectv.5nrvym2.mongodb.net/testF`;

mongoose.connect(url).then((result) => {
    app.listen(port);
});
