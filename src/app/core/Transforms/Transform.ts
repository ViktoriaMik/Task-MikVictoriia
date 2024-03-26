import { map } from 'rxjs';

export function TransformResponse() {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      return originalMethod.apply(this, args).pipe(
        map((data: any) => {
          if (Array.isArray(data)) {
            return data.map((item) => transformKeys(item));
          } else if (typeof data === 'object') {
            return transformKeys(data);
          } else {
            return data;
          }
        })
      );
    };

    function transformKeys(obj: any): any {
      if (Array.isArray(obj)) {
        return obj.map((item) => transformKeys(item));
      } else if (typeof obj === 'object') {
        const transformedObj: any = {};

        for (const key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) {
            const transformedKey = key
              .split('_')
              .map((word, index) => (index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)))
              .join('');
            transformedObj[transformedKey] = transformKeys(obj[key]);
          }
        }

        return transformedObj;
      } else {
        return obj;
      }
    }

    return descriptor;
  };
}
