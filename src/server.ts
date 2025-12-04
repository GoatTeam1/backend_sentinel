import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';
import ipInfoRoutes from './routes/ipInfoRoutes';
import attackRoutes from './routes/attackRoutes';
import loginAttempRoutes from './routes/loginAttempRoutes';
import geolocationRoutes from './routes/geolocationRoutes';
import reportRoutes from './routes/repots';
import { errorApp } from './utils/errorApp';
import morgan from 'morgan';


export class Server {
    private app: express.Express;

    constructor() {
        this.app = express();
        this.configuration();
        this.middlewares();
        this.routes();
    }

    configuration() {
        this.app.set('port', process.env.SERVER_PORT || 3000);
    }

    middlewares() {
        this.app.use(
            cors({
                origin: '*',
                methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
                allowedHeaders: ['Content-Type', 'Authorization'],
            })
        );

        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(morgan('dev'));
    }

    listen() {
        this.app.listen(this.app.get('port'), async () => {
            console.log(`Server running on port ${this.app.get('port')}`);
        });

    }

    routes() {
        this.app.use('/healthcheck', (req, res) => {
            res.status(200).json({ message: 'Server is running' });
        });
        this.app.use('/api/users', userRoutes);
        this.app.use('/api/ip-info', ipInfoRoutes);
        this.app.use('/api/auth', authRoutes);
        this.app.use('/api/attacks', attackRoutes);
        this.app.use('/api/login-attempts', loginAttempRoutes);
        this.app.use('/api/geolocation', geolocationRoutes);
        this.app.use('/api', reportRoutes);


        this.app.use((req, res, next) => {
            next(new errorApp('Route not found', 404));
        });

        return this.app;
    }
}