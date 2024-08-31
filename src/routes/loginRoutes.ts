import express, { NextFunction, Request, Response } from 'express';

interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined };
}

const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  if (!req.session?.loggedIn) {
    return res.status(403).send('Protected route. You`re not logged in');
  }

  next();
  return;
};

const router = express.Router();

router.get('/', (req: Request, res: Response): Response => {
  if (!req.session?.loggedIn) {
    return res.send(`
        <div>
          <div>You are not logged in</div>
          <a href="/login">Login</a>
        </div>
      `);
  }

  return res.send(`
      <div>
        <div>You are logged in</div>
        <a href="/logout">Logout</a>
      </div>
    `);
});

router.get('/login', (req: Request, res: Response): Response => {
  return res.send(`
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

router.get('/logout', (req: Request, res: Response): void => {
  req.session = undefined;
  res.redirect('/');
  return;
});

router.post(
  '/login',
  (req: RequestWithBody, res: Response): Response | void => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.send('Must provide email address and password');
    }

    if (email === 'test@email.com' && password === 'password') {
      req.session = { loggedIn: true };
      res.redirect('/');
      return;
    }

    return res.send('Incorrect email or password');
  }
);

router.get(
  '/protected',
  isAuthenticated,
  (req: Request, res: Response): Response => {
    return res.send('Your are allowed to access PROTECTED ROUTE');
  }
);

export default router;
