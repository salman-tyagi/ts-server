import express from 'express';
import morgan from 'morgan';
import cookieSession from 'cookie-session';

import loginRouter from './routes/loginRoutes';
import { router as routerController } from './controllers/decorators/controller';
import './controllers/LoginController';

const app = express();

app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieSession({ keys: ['loginCookie'] }));

app.use(loginRouter);
app.use(routerController);

export default app;
