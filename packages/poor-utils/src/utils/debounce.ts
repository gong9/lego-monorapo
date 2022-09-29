/**
 * 防抖
 * @param {function} fn
 * @param {number} wait
 * @return a handle after function
 */
const debounce = (fn: Function, wait: number = 200) => {
  let timeout: ReturnType<typeof setTimeout>
  return (...args) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => {
      fn.apply(this, args)
    }, wait)
  }
}

export default debounce
