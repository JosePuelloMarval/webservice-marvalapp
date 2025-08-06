import { Router } from "express";

import { createAccountStatus } from "../../controllers/accountStatus/CreateAccountStatus";
import { getAllAccountStatus } from "../../controllers/accountStatus/GetAllAccountStatus";
import { getAccountStatusById } from "../../controllers/accountStatus/GetAccountStatusById";

const router = Router()

router.post("/create-account-status", createAccountStatus);
router.get("/get-all-account-status", getAllAccountStatus);
router.get("/get-account-status-by-id/:id", getAccountStatusById);

export default router;