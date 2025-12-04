import { Router } from "express";
import { attackController } from "../controllers/attackController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.get('/', authMiddleware, attackController.getAttacks);
router.get('/:id', authMiddleware, attackController.getAttackById);
router.post('/', attackController.createAttack);
router.put('/:id', authMiddleware, attackController.updateAttack);
router.delete('/delete/:id', authMiddleware, attackController.deleteAttack);
router.put('/:id/geolocation', authMiddleware, attackController.updateGeolocation);

export default router;
