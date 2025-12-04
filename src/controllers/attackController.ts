import { Request, Response } from "express";
import { attackModel } from "../models/attackModel";

const attack = new attackModel();

export const attackController = {
    async getAttacks(req: Request, res: Response) {
        try {
            const attacks = await attack.getAllAttacks();
            res.status(200).json(attacks);
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    },

    async getAttackById(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const found = await attack.getAttackById(id);
            res.status(200).json(found);
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    },

    async createAttack(req: Request, res: Response) {
        try {
            const newAttack = await attack.createAttack(req.body);
            res.status(201).json(newAttack);
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    },

    async updateAttack(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const updated = await attack.updateAttack(id, req.body);
            res.status(200).json(updated);
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    },

    async deleteAttack(req: Request, res: Response) {
        try {
            const id = req.params.id;
            await attack.deleteAttack(id);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    },

    async updateGeolocation(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const geo = req.body;
            const updated = await attack.updateAttackGeolocation(id, geo);
            res.status(200).json(updated);
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    }
};
