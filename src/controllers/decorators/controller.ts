import 'reflect-metadata';

export const controller = (routePrefix: string): Function => {
  return function (target: Function): void {
    for (const key in target.prototype) {
      const routeHandler = target.prototype[key];

      const path = Reflect.getMetadata('path', target.prototype, key);
    }
  };
};
