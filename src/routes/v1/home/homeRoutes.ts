import { Router } from "express";
import homeController from "../../../controllers/home/homeController";
const router = Router();

router.get("/sliders", homeController.getSliders);

router.get("/categories", homeController.getCategories);

router.get("/brands", homeController.getBrands);

router.get('/top-products', homeController.getTopProducts);

router.get("/general-settings", homeController.generalSettings);

router.get("/product/:id",homeController.getProductDetails)



export default router;
