import { Router } from "express";
import { generateReport } from "../controllers/reports";
import { authMiddleware } from "../middlewares/authMiddleware";
const router = Router();


router.get('/report', authMiddleware, generateReport)

export default router;