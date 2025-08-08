import { Router } from "express";

import { loginHandler } from "../controllers/authController/authController";
import Usuario from "./user/UserRoutes";
import RealState from "./realstate/RealStateRoutes";
import AccountStatus from "./accountStatus/AccountStatusRoutes";
import PqrRoutes from "./pqr/PqrRoutes";

const router = Router()

router.post('/login', loginHandler);

router.use("/users", Usuario);
router.use("/projects", RealState);
router.use("/account-status", AccountStatus);
router.use("/pqr", PqrRoutes);

export default router;
