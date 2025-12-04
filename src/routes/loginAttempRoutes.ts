import { Router } from "express";
import { loginAttempController } from "../controllers/loginAttempController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.get('/', authMiddleware, loginAttempController.getAll);
router.get('/:id', authMiddleware, loginAttempController.getById);
router.post('/', loginAttempController.create);
router.delete('/delete/:id', authMiddleware, loginAttempController.delete);
router.get('/by-user/:username', authMiddleware, loginAttempController.getByUsername);
router.delete('/clean', authMiddleware, loginAttempController.cleanOlder);

export default router;
