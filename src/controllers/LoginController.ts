import { Request, Response } from 'express';
import { get } from './decorators/routes';
import { controller } from './decorators/controller';

@controller('/auth')
class LoginController {
  @get('/login')
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

export default LoginController;
