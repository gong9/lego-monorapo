/**
 * 节流--时间戳版本
 * @param {function} func 要处理的函数
 * @param {number} delay 截流时间
 * @returns a handle after function
 */
const throttle = (func, delay = 20) => {
  let prev = 0
  return function(...arg) {
    const now = Date.now()
    if (now - prev > delay) {
      func.apply(this, arg)
      prev = now
    }
  }
}

export default throttle
