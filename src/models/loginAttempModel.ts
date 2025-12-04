import { LoginAttemp } from "@prisma/client";
import { prisma } from "../lib/prisma"


export class loginAttempModel {
    async getAllLoginAttemps() {
        const items = await prisma.loginAttemp.findMany();
        if (items.length === 0) throw new Error("No login attempts found");
        return items;
    }

    async getLoginAttempById(id: string) {
        const item = await prisma.loginAttemp.findUnique({ where: { id } });
        if (!item) throw new Error("Login attempt not found");
        return item;
    }

    async createLoginAttemp(data: LoginAttemp) {
        return await prisma.loginAttemp.create({ data });
    }

    async deleteLoginAttemp(id: string) {
        const existing = await prisma.loginAttemp.findUnique({ where: { id } });
        if (!existing) throw new Error("Login attempt not found");
        return await prisma.loginAttemp.delete({ where: { id } });
    }

    async getAttemptsByUsername(username: string) {
        return await prisma.loginAttemp.findMany({ where: { username } });
    }

    async cleanOlderThan(threshold: Date) {
        return await prisma.loginAttemp.deleteMany({ where: { timestamp: { lt: threshold } } });
    }
}
