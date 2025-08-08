import { Router } from "express";

import { getPqrById } from "../../controllers/pqrController/GetPqrById";
import { createPqrHistorySummary } from "../../controllers/pqrController/CreatePqrController";
import { getAllPqr } from "../../controllers/pqrController/GetAllPqr";
import { requireAuth } from "../../middlewares/requireAuth";


const router = Router()

router.get("/get-pqr-by-id/:id", requireAuth, getPqrById);
router.post("/create-pqr", requireAuth, createPqrHistorySummary);
router.get("/get-all-pqr", requireAuth, getAllPqr);

export default router;
