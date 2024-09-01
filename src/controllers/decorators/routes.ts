import 'reflect-metadata';

export function get(path: string): Function {
  return function (target: any, key: string, desc: PropertyDescriptor): void {
    Reflect.defineMetadata('path', path, target, key);
  };
}
