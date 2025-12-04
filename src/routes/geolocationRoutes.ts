import { Router } from "express";
import { geolocationController } from "../controllers/geolocationController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

// IpInfo geolocation
router.get('/ip-info/:id', authMiddleware, geolocationController.getGeoForIpInfo);
router.put('/ip-info/:id', authMiddleware, geolocationController.updateGeoForIpInfo);

// Attack geolocation
router.get('/attack/:id', authMiddleware, geolocationController.getGeoForAttack);
router.put('/attack/:id', authMiddleware, geolocationController.updateGeoForAttack);

export default router;
