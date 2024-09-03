import { Request, Response, NextFunction } from 'express';
import { get, controller, use } from './decorators';

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

@controller('')
class RootController {
  @get('/')
  getRoot(req: Request, res: Response): Response {
    if (!req.session?.loggedIn) {
      return res.send(`
        <div>
          <div>You are not logged in</div>
          <a href="/auth/login">Login</a>
        </div>
      `);
    }

    return res.send(`
      <div>
        <div>You are logged in</div>
        <a href="/auth/logout">Logout</a>
      </div>
    `);
  }

  @get('/protected')
  @use(isAuthenticated)
  getAuthenticated(req: Request, res: Response): Response {
    return res.send('Your are allowed to access PROTECTED ROUTE');
  }
}
