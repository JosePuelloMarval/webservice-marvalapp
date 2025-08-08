import { Router } from "express";

import { createAccountStatus } from "../../controllers/accountStatus/CreateAccountStatus";
import { getAllAccountStatus } from "../../controllers/accountStatus/GetAllAccountStatus";
import { getAccountStatusById } from "../../controllers/accountStatus/GetAccountStatusById";
import { requireAuth } from "../../middlewares/requireAuth";


const router = Router()

router.post("/create-account-status", requireAuth, createAccountStatus);
router.get("/get-all-account-status", requireAuth, getAllAccountStatus);
router.get("/get-account-status-by-id/:id", requireAuth, getAccountStatusById);

export default router;