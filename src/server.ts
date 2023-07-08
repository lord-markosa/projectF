import express from "express";
import bodyParser from "body-parser";
// import mongoose from "mongoose";
// import cors from "cors";
// import helmet from "helmet";
// import authRoutes from "./routes/authRoutes";
import defaultRoute from "./routes/defaultRoute";
import { port } from "./constants";

const app = express();

// app.use(cors());
// app.use(helmet());
// app.use(setHeaderConfig);
app.use(bodyParser.json());

// app.use("/auth", authRoutes);
app.use("/", defaultRoute);

// DATABASE CONNECTION
// const url = `mongodb+srv://${mongodbUser}:${mongodbPass}@projectv.5nrvym2.mongodb.net/`;

// mongoose.connect(url).then((result) => {
//     app.listen(port);
// });

app.listen(port);
