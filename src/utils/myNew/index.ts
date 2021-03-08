/**
 * 手写New
 * 1、判断首参是不是函数。
 * 2、创建新对象并 原型链指向 构造函数 的原型。
 * 3、通过apply或者call修改this指向，执行构造函数。
 * 4、判断构造函数是否有返回值，且返回值是否是引用类型。是返回构造函数返回的结果，不是返回新创建的obj
 */
const myNew = (fun, ...args) => {
  // 1、判断首参是否是函数
  if (typeof fun !== 'function') {
    throw '首参必须是函数';
  }

  // 2、创建对象并设置原型链
  const obj = Object.create(fun.prototype);

  // 3、修改this指向执行构造函数
  let result = fun.apply(obj, args);

  // 4、判断结果类型并返回
  const isObject = typeof result === 'object' && typeof result !== null;
  const isFunction = typeof result === 'function';
  return isObject || isFunction ? result : obj;
};

export default myNew;
