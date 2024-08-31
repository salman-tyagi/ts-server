import express from 'express';
import morgan from 'morgan';

import app from './server';

app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import loginRouter from './routes/loginRoutes';

app.use(loginRouter);
