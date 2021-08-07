/**
 * 找到数组中符合条件的第一个值
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */
export function find (list, f) {
  // TODO: 为什么要用 filter？直接用 Array.prototype.find 不好吗？
  return list.filter(f)[0]
}

/**
 * 对象深拷贝
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */
export function deepCopy (obj, cache = []) {
  // just return if obj is immutable value
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  // if obj is hit, it is in circular structure
  // 用一个 cache 变量存储处理过的值，来规避引用死循环
  const hit = find(cache, c => c.original === obj)
  if (hit) {
    return hit.copy
  }

  const copy = Array.isArray(obj) ? [] : {}
  // put the copy into cache at first
  // because we want to refer it in recursive deepCopy
  cache.push({
    original: obj,
    copy
  })

  Object.keys(obj).forEach(key => {
    copy[key] = deepCopy(obj[key], cache)
  })

  return copy
}

/**
 * forEach for object
 */
export function forEachValue (obj, fn) {
  Object.keys(obj).forEach(key => fn(obj[key], key))
}

// 是否为一个对象。排除 null。
// 因为 typeof null === 'object', 这是 js 的一个经典陷阱。
export function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

// 是否为 Promise 实例。这里通过判断 then 是否为一个函数来解决问题
export function isPromise (val) {
  return val && typeof val.then === 'function'
}

// 断言。如果不符合条件，则抛出错误。在很多 vue 工具库里面，都有用到。
export function assert (condition, msg) {
  if (!condition) throw new Error(`[vuex] ${msg}`)
}

// 保留原始参数的闭包函数
export function partial (fn, arg) {
  return function () {
    return fn(arg)
  }
}
