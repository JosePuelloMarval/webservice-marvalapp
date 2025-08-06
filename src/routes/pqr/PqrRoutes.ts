import { Router } from "express";

import { getPqrById } from "../../controllers/pqrController/GetPqrById";
import { createPqrHistorySummary } from "../../controllers/pqrController/CreatePqrController";
import { getAllPqr } from "../../controllers/pqrController/GetAllPqr";

const router = Router()

router.get("/get-pqr-by-id/:id", getPqrById);
router.post("/create-pqr", createPqrHistorySummary);
router.get("/get-all-pqr", getAllPqr);

export default router;
