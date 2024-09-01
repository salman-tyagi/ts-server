import 'reflect-metadata';
import Methods from './Methods';

function routerBinder(method: string): Function {
  return function (path: string): Function {
    return function (target: any, key: string, desc: PropertyDescriptor): void {
      Reflect.defineMetadata('path', path, target, key);
      Reflect.defineMetadata('method', method, target, key);
    };
  };
}

const get = routerBinder(Methods.get);
const post = routerBinder(Methods.post);
const patch = routerBinder(Methods.patch);
const put = routerBinder(Methods.put);
const del = routerBinder(Methods.del);

export { get, post, patch, put, del };
