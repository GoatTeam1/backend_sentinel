import prisma from "../config/dbConnection";

export class ipInfoModel {
    async getAllIpInfos() {
        const ipInfos = await prisma.ipInfo.findMany();
        if (ipInfos.length === 0) {
            throw new Error("No IP info records found");
        }
        return ipInfos;
    }

    async getIpInfoById(id: string) {
        const ipInfo = await prisma.ipInfo.findUnique({
            where: { id },
        });
        if (!ipInfo) {
            throw new Error("IP info record not found");
        }
        return ipInfo;
    }

    async createIpInfo(data: IpInfo) {
        return await prisma.ipInfo.create({ data });
    }

    async updateIpInfo(id: string, data: Partial<IpInfo>) {
        const existingIpInfo = await prisma.ipInfo.findUnique({
            where: { id },
        });
        if (!existingIpInfo) {
            throw new Error("IP info record not found");
        }
        return await prisma.ipInfo.update({
            where: { id },
            data,
        });
    }

    async deleteIpInfo(id: string) {
        const existingIpInfo = await prisma.ipInfo.findUnique({
            where: { id },
        });
        if (!existingIpInfo) {
            throw new Error("IP info record not found");
        }
        return await prisma.ipInfo.delete({
            where: { id },
        });
    }

    async cleanByLastActivity(threshold: Date) {
        return await prisma.ipInfo.deleteMany({
            where: {
                lastActivity: { lt: threshold }  // Assuming 'lastActivity' is a Date field in IpInfo
            }
        });

    }
}