/**
 * 防抖
 * @param {function} fn
 * @param {number} wait
 * @return a handle after function
 */
const debounce = (fn, wait = 200) => {
  let timeout = null
  return (...args) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => {
      fn.apply(this, args)
    }, wait)
  }
}

export default debounce
