import { Request, Response, NextFunction } from 'express';
import { get, controller, use } from './decorators';

function logger(req: Request, res: Response, next: NextFunction): void {
  console.log('Request was made!');

  next();
  return;
}

@controller('/auth')
class LoginController {
  @get('/login')
  @use(logger)
  getLogin(req: Request, res: Response): void {
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
  }
}
