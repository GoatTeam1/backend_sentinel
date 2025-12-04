import { userModel } from "../models/userModel";
import { Request, Response } from "express";
import { generateToken } from "../utils/jwt";
import { z } from "zod";

const user = new userModel();

const signInSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
});

const authController = {
    async signIn(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            console.log("Sign In Request Body:", req.body);
            const userLogin = await user.signIn(email, password);
            if (userLogin) {
                const token = generateToken(userLogin.id, userLogin.username);
                res.status(200).json({ user: userLogin, token });
            } else {
                res.status(401).json({ message: "Invalid credentials" });
            }
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    }
}

export default authController;