import { Router } from "express";
import userController from "../controllers/userController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.get("/users", authMiddleware, userController.getAllUsers);
router.post("/users", authMiddleware, userController.createUser);
router.get("/users/:id", authMiddleware, userController.getUserById);
router.delete("/users/delete/:id", authMiddleware, userController.deleteUser);

export default router;