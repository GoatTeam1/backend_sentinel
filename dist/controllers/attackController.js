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
exports.attackController = void 0;
const attackModel_1 = require("../models/attackModel");
const attack = new attackModel_1.attackModel();
exports.attackController = {
    getAttacks(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const attacks = yield attack.getAllAttacks();
                res.status(200).json(attacks);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    },
    getAttackById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const found = yield attack.getAttackById(id);
                res.status(200).json(found);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    },
    createAttack(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newAttack = yield attack.createAttack(req.body);
                res.status(201).json(newAttack);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    },
    updateAttack(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const updated = yield attack.updateAttack(id, req.body);
                res.status(200).json(updated);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    },
    deleteAttack(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                yield attack.deleteAttack(id);
                res.status(204).send();
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    },
    updateGeolocation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const geo = req.body;
                const updated = yield attack.updateAttackGeolocation(id, geo);
                res.status(200).json(updated);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
};
