"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = __importDefault(require("../controllers/userController"));
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = (0, express_1.Router)();
router.get("/", authMiddleware_1.authMiddleware, userController_1.default.getAllUsers);
router.post("/", authMiddleware_1.authMiddleware, userController_1.default.createUser);
router.get("/:id", authMiddleware_1.authMiddleware, userController_1.default.getUserById);
router.delete("/delete/:id", authMiddleware_1.authMiddleware, userController_1.default.deleteUser);
exports.default = router;
