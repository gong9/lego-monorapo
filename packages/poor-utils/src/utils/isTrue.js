/**
 * 处理js真假问题
 * 仅undefined null false  才返回false,不考虑bigint
 * TODO 待考虑其他情况
 * @param {any} value
 */
const isTrue = (value) => {
  switch (Object.prototype.toString.call(value)) {
    case '[object Boolean]':
      return value
    case '[object String]':
    case '[object Number]':
    case '[object Object]':
    case '[object Array]':
    case '[object Function]':
      return true

    default:
      return false
  }
}

export default isTrue
