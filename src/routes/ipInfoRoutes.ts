import { Router } from "express";
import { ipInfoController } from "../controllers/ipInfoController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.get('/', authMiddleware, ipInfoController.getIpInfos);
router.get('/:id', authMiddleware, ipInfoController.getIpInfoById);
router.post('/', ipInfoController.createIpInfo);
router.put('/:id', authMiddleware, ipInfoController.updateIpInfo);
router.delete('/delete/:id', authMiddleware, ipInfoController.deleteIpInfo);
router.delete('/clean', authMiddleware, ipInfoController.cleanByLastActivity);

export default router;