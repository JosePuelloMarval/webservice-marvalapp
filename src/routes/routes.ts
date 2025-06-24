import { Router } from "express";

import { loginHandler, signUpHandler } from "../controllers/authController";
import { requireAuth } from "../middlewares/requireAuth";
import Usuario from "../routes/usuario/UsuariosRoutes";
import Producto from "../routes/producto/ProductoRoutes";

const router = Router()

router.post('/login', loginHandler);
router.post('/signup', signUpHandler);

router.use("/users", requireAuth, Usuario);

// router.use("/products",requireAuth, Producto);

export default router;
