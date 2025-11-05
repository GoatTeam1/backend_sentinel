import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';
import { errorApp } from './utils/errorApp';
import morgan from 'morgan';
import { connectToMongo } from './config/dbConnection';

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
            await connectToMongo();
        });

    }

    routes() {
        this.app.use('/api', userRoutes);
        this.app.use('/api/auth', authRoutes);

        this.app.use((req, res, next) => {
            next(new errorApp('Route not found', 404));
        });

        return this.app;
    }
}