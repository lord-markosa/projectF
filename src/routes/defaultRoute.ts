import { Router } from "express";
import defaultController from "../controllers/defaultController";

const router = Router();

router.get("/", defaultController);

export default router;
