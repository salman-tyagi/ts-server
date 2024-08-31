import app from './app';

const { PORT } = process.env;

app.listen(PORT, (): void => {
  console.log(`Listening on the port ${PORT}`);
});

export default app;
