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
const user = new userModel_1.userModel();
const userController = {
    getAllUsers(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield user.getAllUsers();
                res.status(200).json(users);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    },
    createUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Request Body:", req.body);
            try {
                const newUser = yield user.createUser(req.body);
                res.status(201).json(newUser);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    },
    getUserById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.id;
                const foundUser = yield user.getUserById(userId);
                res.status(200).json(foundUser);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    },
    deleteUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.id;
                yield user.deleteUser(userId);
                res.status(204).send();
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    },
    updateUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.id;
                const updatedUser = yield user.updateUser(userId, req.body);
                res.status(200).json(updatedUser);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
};
exports.default = userController;
