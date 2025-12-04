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
exports.loginAttempController = void 0;
const loginAttempModel_1 = require("../models/loginAttempModel");
const loginAttemp = new loginAttempModel_1.loginAttempModel();
exports.loginAttempController = {
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const items = yield loginAttemp.getAllLoginAttemps();
                res.status(200).json(items);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    },
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const item = yield loginAttemp.getLoginAttempById(id);
                res.status(200).json(item);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    },
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newItem = yield loginAttemp.createLoginAttemp(req.body);
                res.status(201).json(newItem);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    },
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                yield loginAttemp.deleteLoginAttemp(id);
                res.status(204).send();
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    },
    getByUsername(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const username = req.params.username;
                const items = yield loginAttemp.getAttemptsByUsername(username);
                res.status(200).json(items);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    },
    cleanOlder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { threshold } = req.body;
                const result = yield loginAttemp.cleanOlderThan(new Date(threshold));
                res.status(200).json(result);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
};
