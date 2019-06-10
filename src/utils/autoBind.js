import React from "react";

const wontBind = [
  "constructor",
  "render",
  "componentWillMount",
  "componentDidMount",
  "componentWillReceiveProps",
  "shouldComponentUpdate",
  "componentWillUpdate",
  "componentDidUpdate",
  "componentWillUnmount",
  "getSnapshotBeforeUpdate"
];
export default function autoBind(context) {
  const map = {};
  let proto = getPrototypeOf(context);
  /* eslint-disable */
  while (proto && proto !== React.Component.prototype) {
    Object.getOwnPropertyNames(proto)
      .filter(method => wontBind.indexOf(method) < 0 && !(method in map))
      .forEach(method => {
        const desc = Object.getOwnPropertyDescriptor(proto, method);
        if (typeof desc.value !== "function") {
          return;
        }

        map[method] = true;
        bind(proto, method, desc);
      });
    proto = getPrototypeOf(proto);
  }
}

function bind(proto, method, desc) {
  const fn = desc.value;

  Object.defineProperty(proto, method, {
    configurable: true,
    get() {
      if (this === proto || Object.prototype.hasOwnProperty.call(this, method))
        return fn;

      // bind 一次就够了，此 bind 会自动根据子类切换 this 环境
      // 如：
      // A1 => B, A2 => B
      // 如果 A1 autoBind 之后，B 上函数也会 autoBind 到 A1
      // 而在 A2 autoBind 之后，B 上函数不需要再 autoBind，但在 A2 上调用 B 上的方法是不会有问题的
      const boundFn = fn.bind(this);
      Object.defineProperty(this, method, {
        value: boundFn,
        configurable: true,
        writable: true
      });
      return boundFn;
    }
  });
}

function getPrototypeOf(obj) {
  return obj.__proto__ || Object.getPrototypeOf(obj);
}
