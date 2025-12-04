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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToMongo = connectToMongo;
const client_1 = require("../generated/prisma/client");
const ora_1 = __importDefault(require("ora"));
const chalk_1 = __importDefault(require("chalk"));
const prisma = new client_1.PrismaClient();
function connectToMongo() {
    return __awaiter(this, void 0, void 0, function* () {
        const spinner = (0, ora_1.default)({
            text: chalk_1.default.blue("Conectando a Atlas database..."),
            spinner: "dots",
        }).start();
        try {
            yield prisma.$connect();
            yield new Promise((resolve) => setTimeout(resolve, 3000));
            spinner.succeed(chalk_1.default.green("Conectado a Atlas database"));
        }
        catch (error) {
            spinner.fail(chalk_1.default.red("❌ Error conectando a Atlas database"));
            console.error(chalk_1.default.gray(error));
        }
    });
}
exports.default = prisma;
