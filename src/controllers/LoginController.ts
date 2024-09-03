import { Request, Response, NextFunction } from 'express';
import { get, controller, use, post, bodyValidator } from './decorators';

function logger(req: Request, res: Response, next: NextFunction): void {
  console.log('Request was made!');

  next();
  return;
}

@controller('/auth')
class LoginController {
  @get('/login')
  @use(logger)
  getLogin(req: Request, res: Response): Response {
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
  }

  @post('/login')
  @bodyValidator('email', 'password')
  postLogin(req: Request, res: Response): Response | void {
    const { email, password } = req.body;

    if (email === 'test@email.com' && password === 'password') {
      req.session = { loggedIn: true };
      res.redirect('/');
      return;
    }

    return res.send('Incorrect email or password');
  }

  @get('/logout')
  getLogout(req: Request, res: Response): void {
    req.session = undefined;
    res.redirect('/');
    return;
  }
}
