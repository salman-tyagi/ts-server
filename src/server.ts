import express from 'express';

const app = express();

const { PORT } = process.env;

app.listen(PORT, (): void => {
  console.log(`Listening on the port ${PORT}`);
});

export default app;
