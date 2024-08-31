import express, { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import cookieSession from 'cookie-session';

import loginRouter from './routes/loginRoutes';

const app = express();

app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieSession({ keys: ['loginCookie'] }));

app.use(loginRouter);

export default app;
