import express, { Request, Response } from 'express';

const router = express.Router();

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

router.post('/login', (req: Request, res: Response) => {
  const { email, password } = req.body;

  res.send(`
      <div>
        ${email} ${password}
      </div>
    `);
});

export default router;
