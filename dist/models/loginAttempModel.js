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
exports.loginAttempModel = void 0;
const prisma_1 = require("../lib/prisma");
class loginAttempModel {
    getAllLoginAttemps() {
        return __awaiter(this, void 0, void 0, function* () {
            const items = yield prisma_1.prisma.loginAttemp.findMany();
            if (items.length === 0)
                throw new Error("No login attempts found");
            return items;
        });
    }
    getLoginAttempById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const item = yield prisma_1.prisma.loginAttemp.findUnique({ where: { id } });
            if (!item)
                throw new Error("Login attempt not found");
            return item;
        });
    }
    createLoginAttemp(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_1.prisma.loginAttemp.create({ data });
        });
    }
    deleteLoginAttemp(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const existing = yield prisma_1.prisma.loginAttemp.findUnique({ where: { id } });
            if (!existing)
                throw new Error("Login attempt not found");
            return yield prisma_1.prisma.loginAttemp.delete({ where: { id } });
        });
    }
    getAttemptsByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_1.prisma.loginAttemp.findMany({ where: { username } });
        });
    }
    cleanOlderThan(threshold) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_1.prisma.loginAttemp.deleteMany({ where: { timestamp: { lt: threshold } } });
        });
    }
}
exports.loginAttempModel = loginAttempModel;
