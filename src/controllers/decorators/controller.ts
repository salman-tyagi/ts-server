import 'reflect-metadata';
import express, {
  NextFunction,
  Request,
  RequestHandler,
  Response,
} from 'express';

import Methods from './Methods';
import MetadataKeys from './MetadataKeys';

export const router = express.Router();

export function controller(routePrefix: string): Function {
  return function (target: Function): void {
    for (const key in target.prototype) {
      const routeHandler = target.prototype[key];
      const path = Reflect.getMetadata(
        MetadataKeys.path,
        target.prototype,
        key
      );

      const method: Methods = Reflect.getMetadata(
        MetadataKeys.method,
        target.prototype,
        key
      );

      const middlewares =
        Reflect.getMetadata(MetadataKeys.middleware, target.prototype, key) ||
        [];

      const validateBodyProps = Reflect.getMetadata(
        MetadataKeys.validator,
        target.prototype,
        key
      );

      const validateBody = (keys: string[] = []): RequestHandler => {
        return (
          req: Request,
          res: Response,
          next: NextFunction
        ): Response | void => {
          if (!req.body) {
            return res.status(422).send('Invalid request');
          }

          keys.forEach(prop => {
            if (!req.body[prop]) {
              return res
                .status(422)
                .send(
                  `${prop.at(0)?.toUpperCase()}${prop.slice(1)} is required`
                );
            }
          });

          next();
          return;
        };
      };

      if (path) {
        router[method](
          `${routePrefix}${path}`,
          ...middlewares,
          validateBody(validateBodyProps),
          routeHandler
        );
      }
    }
  };
}
