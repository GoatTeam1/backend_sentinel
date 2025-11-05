import { userModel } from "../models/userModel";
import { Request, Response, NextFunction } from "express";

const user = new userModel();

const userController = {
    async getAllUsers(req: Request, res: Response, next: NextFunction) {
        try {
            const users = await user.getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    }
    ,
    async createUser(req: Request, res: Response, next: NextFunction) {
        console.log("Request Body:", req.body);
        try {
            const newUser = await user.createUser(req.body);
            res.status(201).json(newUser);
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    },
    async getUserById(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.params.id;
            const foundUser = await user.getUserById(userId);
            res.status(200).json(foundUser);
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    },
    async deleteUser(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.params.id;
            await user.deleteUser(userId);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    },
    async updateUser(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.params.id;
            const updatedUser = await user.updateUser(userId, req.body);
            res.status(200).json(updatedUser);
        }
        catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    }
}
export default userController;