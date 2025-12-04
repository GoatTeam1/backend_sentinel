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
exports.ipInfoController = void 0;
const ipInfoModel_1 = require("../models/ipInfoModel");
const ipInfo = new ipInfoModel_1.ipInfoModel();
exports.ipInfoController = {
    getIpInfos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ipInfos = yield ipInfo.getAllIpInfos();
                res.status(200).json(ipInfos);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    },
    getIpInfoById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const foundIpInfo = yield ipInfo.getIpInfoById(id);
                res.status(200).json(foundIpInfo);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    },
    createIpInfo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newIpInfo = yield ipInfo.createIpInfo(req.body);
                res.status(201).json(newIpInfo);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    },
    deleteIpInfo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ip = req.params.ip;
                yield ipInfo.deleteIpInfo(ip);
                res.status(204).send();
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    },
    updateIpInfo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ip = req.params.ip;
                const updatedIpInfo = yield ipInfo.updateIpInfo(ip, req.body);
                res.status(200).json(updatedIpInfo);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    },
    cleanByLastActivity(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { threshold } = req.body;
                const deletedCount = yield ipInfo.cleanByLastActivity(new Date(threshold));
                res.status(200).json({ deletedCount });
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
};
