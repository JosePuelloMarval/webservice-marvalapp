import { Router } from "express";

import { allRealState } from "../../controllers/realStateController/AllRealState";
import { createRealState } from "../../controllers/realStateController/CreateRealState";
import { getRealStateById } from "../../controllers/realStateController/GetRealStateById";
import { requireAuth } from "../../middlewares/requireAuth";

const router = Router()

router.get("/all-projects", requireAuth, allRealState);
router.post("/create-project", requireAuth, createRealState);
router.get("/get-project-by-id/:id", requireAuth, getRealStateById);

export default router;
