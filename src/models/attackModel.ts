import { PrismaClient } from "../generated/prisma/client";
const prisma = new PrismaClient();

export class attackModel {
    async getAllAttacks() {
        const attacks = await prisma.attack.findMany();
        if (attacks.length === 0) {
            throw new Error("No attacks found");
        }
        return attacks;
    }

    async getAttackById(id: string) {
        const attack = await prisma.attack.findUnique({ where: { id } });
        if (!attack) {
            throw new Error("Attack not found");
        }
        return attack;
    }

    async createAttack(data: any) {
        return await prisma.attack.create({ data });
    }

    async updateAttack(id: string, data: any) {
        const existing = await prisma.attack.findUnique({ where: { id } });
        if (!existing) {
            throw new Error("Attack not found");
        }
        return await prisma.attack.update({ where: { id }, data });
    }

    async deleteAttack(id: string) {
        const existing = await prisma.attack.findUnique({ where: { id } });
        if (!existing) {
            throw new Error("Attack not found");
        }
        return await prisma.attack.delete({ where: { id } });
    }

    // Geolocation helper: update geolocation for an attack
    async updateAttackGeolocation(id: string, geolocation: any) {
        const existing = await prisma.attack.findUnique({ where: { id } });
        if (!existing) throw new Error("Attack not found");
        return await prisma.attack.update({ where: { id }, data: { geolocation } });
    }
}
