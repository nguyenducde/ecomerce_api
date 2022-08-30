import { Router } from "express";
import homeController from "../../../controllers/home/homeController";
const router = Router();

router.get("/sliders", homeController.getSliders);

export default router;
