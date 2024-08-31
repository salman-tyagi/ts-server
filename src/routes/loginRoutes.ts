import express, { Request, Response } from 'express';

interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined };
}

const router = express.Router();

router.get('/', (req: Request, res: Response): Response => {
  const { loggedIn } = req.cookies;

  if (loggedIn !== 'true') {
    return res.send(`
        <div>
          <div>You are not logged in!</div>
          <a href="/login">Login</a>
        </div>
      `);
  }

  return res.send('You are logged in');
});

router.get('/login', (req: Request, res: Response) => {
  res.send(`
      <form method="POST">
        <div>
          <label for="email">Email</label>
          <input id="email" name="email" />
        </div>

        <div>
          <label for="password">Password</label>
          <input id="password" name="password" type="password" />
        </div>

        <button>Submit</button>
      </form>
    `);
});

router.post(
  '/login',
  (req: RequestWithBody, res: Response): Response | void => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.send('Must provide email address and password');
    }

    if (email === 'test@email.com' && password === 'password') {
      res.cookie('loggedIn', true);
      return res.redirect('/');
    }

    return res.send('Incorrect email or password');
  }
);

export default router;
