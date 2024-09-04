import 'reflect-metadata';
import { RequestHandler } from 'express';

import Methods from './Methods';
import MetadataKeys from './MetadataKeys';

interface RequestHandlerDescriptor extends PropertyDescriptor {
  value?: RequestHandler;
}

function routerBinder(method: string) {
  return function (path: string) {
    return function (
      target: any,
      key: string,
      desc: RequestHandlerDescriptor
    ): void {
      Reflect.defineMetadata(MetadataKeys.path, path, target, key);
      Reflect.defineMetadata(MetadataKeys.method, method, target, key);
    };
  };
}

const get = routerBinder(Methods.get);
const post = routerBinder(Methods.post);
const patch = routerBinder(Methods.patch);
const put = routerBinder(Methods.put);
const del = routerBinder(Methods.delete);

export { get, post, patch, put, del };
