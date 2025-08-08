import { Router } from "express";

import { allRealState } from "../../controllers/realStateController/AllRealState";
import { createRealState } from "../../controllers/realStateController/CreateRealState";
import { getRealStateById } from "../../controllers/realStateController/GetRealStateById";


const router = Router()

router.get("/all-projects", allRealState);
router.post("/create-project", createRealState);
router.get("/get-project-by-id/:id", getRealStateById);

export default router;
