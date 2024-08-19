import { Router } from "express";
import { verifyToken } from "../controllers/userController";

const router = Router();

router.get('/verify', verifyToken);

export default router;
