import express from 'express';
import morgan from 'morgan';
import cookieSession from 'cookie-session';

import { router as routerController } from './controllers/decorators/controller';
import './controllers/LoginController';
import './controllers/RootController';

const app = express();

app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieSession({ keys: ['loginCookie'] }));

app.use(routerController);

export default app;
