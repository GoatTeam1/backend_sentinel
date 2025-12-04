import { Request, Response } from "express";
import { ipInfoModel } from "../models/ipInfoModel";
const ipInfo = new ipInfoModel();
export const ipInfoController = {

    async getIpInfos(req: Request, res: Response) {
        try {
            const ipInfos = await ipInfo.getAllIpInfos();
            res.status(200).json(ipInfos);
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    },

    async getIpInfoById(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const foundIpInfo = await ipInfo.getIpInfoById(id);
            res.status(200).json(foundIpInfo);
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    },

    async createIpInfo(req: Request, res: Response) {
        try {
            const newIpInfo = await ipInfo.createIpInfo(req.body);
            res.status(201).json(newIpInfo);
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    },

    async deleteIpInfo(req: Request, res: Response) {
        try {
            const ip = req.params.ip;
            await ipInfo.deleteIpInfo(ip);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    },

    async updateIpInfo(req: Request, res: Response) {
        try {
            const ip = req.params.ip;
            const updatedIpInfo = await ipInfo.updateIpInfo(ip, req.body);
            res.status(200).json(updatedIpInfo);
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    },
    async cleanByLastActivity(req: Request, res: Response) {
        try {
            const { threshold } = req.body;
            const deletedCount = await ipInfo.cleanByLastActivity(new Date(threshold));
            res.status(200).json({ deletedCount });
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    }

}