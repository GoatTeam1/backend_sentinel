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
exports.attackModel = void 0;
const client_1 = require("../generated/prisma/client");
const prisma = new client_1.PrismaClient();
class attackModel {
    getAllAttacks() {
        return __awaiter(this, void 0, void 0, function* () {
            const attacks = yield prisma.attack.findMany();
            if (attacks.length === 0) {
                throw new Error("No attacks found");
            }
            return attacks;
        });
    }
    getAttackById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const attack = yield prisma.attack.findUnique({ where: { id } });
            if (!attack) {
                throw new Error("Attack not found");
            }
            return attack;
        });
    }
    createAttack(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.attack.create({ data });
        });
    }
    updateAttack(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const existing = yield prisma.attack.findUnique({ where: { id } });
            if (!existing) {
                throw new Error("Attack not found");
            }
            return yield prisma.attack.update({ where: { id }, data });
        });
    }
    deleteAttack(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const existing = yield prisma.attack.findUnique({ where: { id } });
            if (!existing) {
                throw new Error("Attack not found");
            }
            return yield prisma.attack.delete({ where: { id } });
        });
    }
    // Geolocation helper: update geolocation for an attack
    updateAttackGeolocation(id, geolocation) {
        return __awaiter(this, void 0, void 0, function* () {
            const existing = yield prisma.attack.findUnique({ where: { id } });
            if (!existing)
                throw new Error("Attack not found");
            return yield prisma.attack.update({ where: { id }, data: { geolocation } });
        });
    }
}
exports.attackModel = attackModel;
