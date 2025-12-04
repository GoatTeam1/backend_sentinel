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
exports.ipInfoModel = void 0;
const prisma_1 = require("../lib/prisma");
class ipInfoModel {
    getAllIpInfos() {
        return __awaiter(this, void 0, void 0, function* () {
            const ipInfos = yield prisma_1.prisma.ipInfo.findMany();
            if (ipInfos.length === 0) {
                throw new Error("No IP info records found");
            }
            return ipInfos;
        });
    }
    getIpInfoById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const ipInfo = yield prisma_1.prisma.ipInfo.findUnique({
                where: { id },
            });
            if (!ipInfo) {
                throw new Error("IP info record not found");
            }
            return ipInfo;
        });
    }
    createIpInfo(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_1.prisma.ipInfo.create({ data });
        });
    }
    updateIpInfo(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingIpInfo = yield prisma_1.prisma.ipInfo.findUnique({
                where: { id },
            });
            if (!existingIpInfo) {
                throw new Error("IP info record not found");
            }
            return yield prisma_1.prisma.ipInfo.update({
                where: { id },
                data,
            });
        });
    }
    deleteIpInfo(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingIpInfo = yield prisma_1.prisma.ipInfo.findUnique({
                where: { id },
            });
            if (!existingIpInfo) {
                throw new Error("IP info record not found");
            }
            return yield prisma_1.prisma.ipInfo.delete({
                where: { id },
            });
        });
    }
    cleanByLastActivity(threshold) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_1.prisma.ipInfo.deleteMany({
                where: {
                    lastActivity: { lt: threshold } // Assuming 'lastActivity' is a Date field in IpInfo
                }
            });
        });
    }
}
exports.ipInfoModel = ipInfoModel;
