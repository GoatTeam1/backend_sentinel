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
exports.geolocationController = void 0;
const geolocationModel_1 = require("../models/geolocationModel");
const geo = new geolocationModel_1.geolocationModel();
exports.geolocationController = {
    getGeoForIpInfo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const result = yield geo.getGeoForIpInfo(id);
                res.status(200).json(result);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    },
    updateGeoForIpInfo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const updated = yield geo.updateGeoForIpInfo(id, req.body);
                res.status(200).json(updated);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    },
    getGeoForAttack(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const result = yield geo.getGeoForAttack(id);
                res.status(200).json(result);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    },
    updateGeoForAttack(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const updated = yield geo.updateGeoForAttack(id, req.body);
                res.status(200).json(updated);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
};
