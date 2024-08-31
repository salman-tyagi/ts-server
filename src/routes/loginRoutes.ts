import express, { Request, Response } from 'express';

interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined };
}

const router = express.Router();

router.get('/login', (req: Request, res: Response) => {
  res.send(`
      <form method="POST">
        <div>
          <label for="email">Email</label>
          <input id="email" name="em" />
        </div>

        <div>
          <label for="password">Password</label>
          <input id="password" name="pa type="password" />
        </div>

        <button>Submit</button>
      </form>
    `);
});

router.post('/login', (req: RequestWithBody, res: Response) => {
  const { email, password } = req.body;

  if (email) {
    res.send(email.toLocaleUpperCase());
  } else {
    res.send('Must provide email address!');
  }
});

export default router;
