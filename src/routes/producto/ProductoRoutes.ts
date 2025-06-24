import { Router } from "express";

import { allProducts } from "../../controllers/ProductoController";


const router = Router()

router.get("/", allProducts);

export default router;
