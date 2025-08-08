import { Router } from "express";

import { getPqrById } from "../../controllers/pqrController/GetPqrById";
import { createPqrHistorySummary } from "../../controllers/pqrController/CreatePqrController";
import { getAllPqr } from "../../controllers/pqrController/GetAllPqr";
import { requireAuth } from "../../middlewares/requireAuth";


const router = Router()

router.get("/get-pqr-by-id/:id", getPqrById, requireAuth);
router.post("/create-pqr", createPqrHistorySummary, requireAuth);
router.get("/get-all-pqr", getAllPqr, requireAuth);

export default router;
