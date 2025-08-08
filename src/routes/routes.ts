import { Router } from "express";

import { loginHandler } from "../controllers/authController/authController";
import { requireAuth } from "../middlewares/requireAuth";
import Usuario from "./user/UserRoutes";
import RealState from "./realstate/RealStateRoutes";
import AccountStatus from "./accountStatus/AccountStatusRoutes";
import PqrRoutes from "./pqr/PqrRoutes";

const router = Router()

router.post('/login', loginHandler);

router.use("/users", Usuario);
router.use("/projects", RealState, requireAuth);
router.use("/account-status", AccountStatus, requireAuth);
router.use("/pqr", PqrRoutes, requireAuth);

export default router;
