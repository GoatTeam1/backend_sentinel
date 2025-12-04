"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const geolocationController_1 = require("../controllers/geolocationController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = (0, express_1.Router)();
// IpInfo geolocation
router.get('/ip-info/:id', authMiddleware_1.authMiddleware, geolocationController_1.geolocationController.getGeoForIpInfo);
router.put('/ip-info/:id', authMiddleware_1.authMiddleware, geolocationController_1.geolocationController.updateGeoForIpInfo);
// Attack geolocation
router.get('/attack/:id', authMiddleware_1.authMiddleware, geolocationController_1.geolocationController.getGeoForAttack);
router.put('/attack/:id', authMiddleware_1.authMiddleware, geolocationController_1.geolocationController.updateGeoForAttack);
exports.default = router;
