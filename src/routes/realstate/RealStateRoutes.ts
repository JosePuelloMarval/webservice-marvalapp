import { Router } from "express";

import { allRealState } from "../../controllers/realStateController/AllRealState";
import { createRealState } from "../../controllers/realStateController/CreateRealState";
import { getRealStateById } from "../../controllers/realStateController/GetRealStateById";
import { requireAuth } from "../../middlewares/requireAuth";

const router = Router()

router.get("/all-projects", allRealState, requireAuth);
router.post("/create-project", createRealState, requireAuth);
router.get("/get-project-by-id/:id", getRealStateById, requireAuth);

export default router;
