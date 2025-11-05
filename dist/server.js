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
exports.Server = void 0;
const cors_1 = __importDefault(require("cors"));
class Server {
    constructor(app) {
        this.app = app;
        this.configuration();
    }
    configuration() {
        this.app.set('port', process.env.SERVER_PORT || 3000);
    }
    middlewares() {
        this.app.use((0, cors_1.default)({
            origin: '*', 
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
            allowedHeaders: ['Content-Type', 'Authorization'],
        }));
    }
    listen() {
        this.app.listen(this.app.get('port'), () => __awaiter(this, void 0, void 0, function* () {
            console.log(`Server running on port ${this.app.get('port')}`);
           
        }));
    }
}
exports.Server = Server;
