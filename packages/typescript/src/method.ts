/* eslint-disable @typescript-eslint/no-explicit-any */
export function Method(): any {
  console.log('Method(): factory evaluated')
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log(target)
    console.log(propertyKey)
    console.log(descriptor)
    console.log('Method(): called')
  }
}
