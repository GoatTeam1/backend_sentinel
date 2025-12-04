import { Request, Response } from "express";
import { loginAttempModel } from "../models/loginAttempModel";

const loginAttemp = new loginAttempModel();

export const loginAttempController = {
    async getAll(req: Request, res: Response) {
        try {
            const items = await loginAttemp.getAllLoginAttemps();
            res.status(200).json(items);
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    },

    async getById(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const item = await loginAttemp.getLoginAttempById(id);
            res.status(200).json(item);
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    },

    async create(req: Request, res: Response) {
        try {
            const newItem = await loginAttemp.createLoginAttemp(req.body);
            res.status(201).json(newItem);
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    },

    async delete(req: Request, res: Response) {
        try {
            const id = req.params.id;
            await loginAttemp.deleteLoginAttemp(id);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    },

    async getByUsername(req: Request, res: Response) {
        try {
            const username = req.params.username;
            const items = await loginAttemp.getAttemptsByUsername(username);
            res.status(200).json(items);
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    },

    async cleanOlder(req: Request, res: Response) {
        try {
            const { threshold } = req.body;
            const result = await loginAttemp.cleanOlderThan(new Date(threshold));
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    }
};
