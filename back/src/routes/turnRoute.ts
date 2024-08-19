import { Router } from "express";
import { cancelTurn, createTurn, getTurnByUserId, getTurns, getTurnsById } from "../controllers/turnController";
const router = Router();

router.get('/turns', getTurns);
router.get('/turns/:id', getTurnsById);
router.get('/turns/user/:id', getTurnByUserId);

router.post('/turns/schedule', createTurn);
router.put('/turns/cancel/:id', cancelTurn);




export default router