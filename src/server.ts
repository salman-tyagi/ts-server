import express from 'express';
import morgan from 'morgan';

const app = express();

app.use(morgan('dev'));

const { PORT } = process.env;

app.listen(PORT, (): void => {
  console.log(`Listening on the port ${PORT}`);
});

export default app;
