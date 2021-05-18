// 81.3% faster than  String(arg).
// 63% faster than  `${arg}`.
// (tested at  https://jsbench.me/)

export const toStr = (arg) => arg + '';
