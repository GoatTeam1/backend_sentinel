"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const userModel_1 = require("../models/userModel");
const jwt_1 = require("../utils/jwt");
const zod_1 = require("zod");
const user = new userModel_1.userModel();
const signInSchema = zod_1.z.object({
    email: zod_1.z.string().email("Invalid email address"),
    password: zod_1.z.string().min(6, "Password must be at least 6 characters long"),
});
const authController = {
    signIn(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                console.log("Sign In Request Body:", req.body);
                const userLogin = yield user.signIn(email, password);
                if (userLogin) {
                    const token = (0, jwt_1.generateToken)(userLogin.id, userLogin.username);
                    res.status(200).json({ user: userLogin, token });
                }
                else {
                    res.status(401).json({ message: "Invalid credentials" });
                }
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
};
exports.default = authController;
