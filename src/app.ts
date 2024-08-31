import express, { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

import loginRouter from './routes/loginRoutes';

const app = express();

app.use(morgan('dev'));

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req: Request, res: Response, next: NextFunction): void => {
  console.log(req.cookies);

  next();
});

app.use(loginRouter);

export default app;
