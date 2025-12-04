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
exports.userModel = void 0;
const bcrypt_1 = require("../utils/bcrypt");
const prisma_1 = require("../lib/prisma");
class userModel {
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield prisma_1.prisma.user.findMany();
            if (users.length === 0) {
                throw new Error("No users found");
            }
            return users;
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma_1.prisma.user.findUnique({
                where: { id },
            });
            if (!user) {
                throw new Error("User not found");
            }
            return user;
        });
    }
    createUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingUser = yield prisma_1.prisma.user.findFirst({
                where: {
                    OR: [
                        { email: data.email },
                        { username: data.username },
                    ],
                },
            });
            if (existingUser) {
                if (existingUser.email === data.email) {
                    throw new Error("Email already exists");
                }
                if (existingUser.username === data.username) {
                    throw new Error("Username already exists");
                }
            }
            data.password = yield (0, bcrypt_1.hashPassword)(data.password);
            return yield prisma_1.prisma.user.create({ data });
        });
    }
    updateUser(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingUser = yield prisma_1.prisma.user.findUnique({
                where: { id },
            });
            if (!existingUser) {
                throw new Error("User not found");
            }
            return yield prisma_1.prisma.user.update({
                where: { id },
                data,
            });
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingUser = yield prisma_1.prisma.user.findUnique({
                where: { id },
            });
            if (!existingUser) {
                throw new Error("User not found");
            }
            return yield prisma_1.prisma.user.delete({
                where: { id },
            });
        });
    }
    changePassword(id, newPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingUser = yield prisma_1.prisma.user.findUnique({
                where: { id },
            });
            if (!existingUser) {
                throw new Error("User not found");
            }
            existingUser.password = yield (0, bcrypt_1.hashPassword)(newPassword);
            return yield prisma_1.prisma.user.update({
                where: { id },
                data: { password: existingUser.password },
            });
        });
    }
    signIn(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma_1.prisma.user.findUnique({
                where: { email },
            });
            if (!user) {
                throw new Error("User not found");
            }
            const isPasswordValid = yield (0, bcrypt_1.comparePassword)(password, user.password);
            if (!isPasswordValid) {
                throw new Error("Invalid password");
            }
            return user;
        });
    }
}
exports.userModel = userModel;
