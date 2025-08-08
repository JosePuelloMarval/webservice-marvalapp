import { Router } from "express";

import { createAccountStatus } from "../../controllers/accountStatus/CreateAccountStatus";
import { getAllAccountStatus } from "../../controllers/accountStatus/GetAllAccountStatus";
import { getAccountStatusById } from "../../controllers/accountStatus/GetAccountStatusById";
import { requireAuth } from "../../middlewares/requireAuth";


const router = Router()

router.post("/create-account-status", createAccountStatus, requireAuth);
router.get("/get-all-account-status", getAllAccountStatus, requireAuth);
router.get("/get-account-status-by-id/:id", getAccountStatusById, requireAuth);

export default router;