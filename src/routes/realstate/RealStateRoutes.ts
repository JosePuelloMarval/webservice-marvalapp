import { Router } from "express";

import { allRealState } from "../../controllers/realStateController/AllRealState";
import { createRealState } from "../../controllers/realStateController/CreateRealState";


const router = Router()

router.get("/all-projects", allRealState);
router.post("/create-project", createRealState);

export default router;
