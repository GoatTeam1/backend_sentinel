import { Router } from "express";
import userController from "../controllers/userController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.get("/", authMiddleware, userController.getAllUsers);
router.post("/", authMiddleware, userController.createUser);
router.get("/:id", authMiddleware, userController.getUserById);
router.delete("/delete/:id", authMiddleware, userController.deleteUser);

export default router;