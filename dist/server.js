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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const ipInfoRoutes_1 = __importDefault(require("./routes/ipInfoRoutes"));
const attackRoutes_1 = __importDefault(require("./routes/attackRoutes"));
const loginAttempRoutes_1 = __importDefault(require("./routes/loginAttempRoutes"));
const geolocationRoutes_1 = __importDefault(require("./routes/geolocationRoutes"));
const errorApp_1 = require("./utils/errorApp");
const morgan_1 = __importDefault(require("morgan"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.configuration();
        this.middlewares();
        this.routes();
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
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.app.use((0, morgan_1.default)('dev'));
    }
    listen() {
        this.app.listen(this.app.get('port'), () => __awaiter(this, void 0, void 0, function* () {
            console.log(`Server running on port ${this.app.get('port')}`);
        }));
    }
    routes() {
        this.app.use('/healthcheck', (req, res) => {
            res.status(200).json({ message: 'Server is running' });
        });
        this.app.use('/api/users', userRoutes_1.default);
        this.app.use('/api/ip-info', ipInfoRoutes_1.default);
        this.app.use('/api/auth', authRoutes_1.default);
        this.app.use('/api/attacks', attackRoutes_1.default);
        this.app.use('/api/login-attempts', loginAttempRoutes_1.default);
        this.app.use('/api/geolocation', geolocationRoutes_1.default);
        this.app.use((req, res, next) => {
            next(new errorApp_1.errorApp('Route not found', 404));
        });
        return this.app;
    }
}
exports.Server = Server;
