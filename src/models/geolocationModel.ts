import { prisma } from "../lib/prisma"



export class geolocationModel {
    // Return geolocation stored inside an IpInfo
    async getGeoForIpInfo(id: string) {
        const ipInfo = await prisma.ipInfo.findUnique({ where: { id } });
        if (!ipInfo) throw new Error("IpInfo not found");
        return ipInfo.geolocation;
    }

    async updateGeoForIpInfo(id: string, geo: any) {
        const existing = await prisma.ipInfo.findUnique({ where: { id } });
        if (!existing) throw new Error("IpInfo not found");
        return await prisma.ipInfo.update({ where: { id }, data: { geolocation: geo } });
    }

    // Similar for Attack
    async getGeoForAttack(id: string) {
        const attack = await prisma.attack.findUnique({ where: { id } });
        if (!attack) throw new Error("Attack not found");
        return attack.geolocation;
    }

    async updateGeoForAttack(id: string, geo: any) {
        const existing = await prisma.attack.findUnique({ where: { id } });
        if (!existing) throw new Error("Attack not found");
        return await prisma.attack.update({ where: { id }, data: { geolocation: geo } });
    }
}
