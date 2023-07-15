import { Router } from "express";
import auth from "../controllers/auth";
import authValidation from "../middleware/authValidation";

const authRoutes = Router();

authRoutes.post("/", authValidation, auth);

export default authRoutes;
