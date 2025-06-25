import { Router } from "express";

import { loginHandler } from "../controllers/authController/authController";
import { requireAuth } from "../middlewares/requireAuth";
import Usuario from "./user/UserRoutes";
import RealState from "./realstate/RealStateRoutes";

const router = Router()

router.post('/login', loginHandler);

router.use("/users", requireAuth, Usuario);
router.use("/projets",requireAuth, RealState);

export default router;
