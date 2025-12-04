import { Request, Response } from "express";
import { geolocationModel } from "../models/geolocationModel";

const geo = new geolocationModel();

export const geolocationController = {
    async getGeoForIpInfo(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const result = await geo.getGeoForIpInfo(id);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    },

    async updateGeoForIpInfo(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const updated = await geo.updateGeoForIpInfo(id, req.body);
            res.status(200).json(updated);
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    },

    async getGeoForAttack(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const result = await geo.getGeoForAttack(id);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    },

    async updateGeoForAttack(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const updated = await geo.updateGeoForAttack(id, req.body);
            res.status(200).json(updated);
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    }
};
