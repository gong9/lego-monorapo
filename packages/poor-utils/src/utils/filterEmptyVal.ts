/**
 * 过滤空值(undefined,null)
 * @param {object} resJson
 */
const filterEmptyVal = (resJson: object) => {
  const obj = resJson instanceof Array ? [] : {}
  for (const [k, v] of Object.entries(resJson)) {
    // 处理空值的情况
    if (!(v === undefined || v === null)) {
      obj[k] = typeof v === 'object' ? filterEmptyVal(v) : v
    }
  }

  return obj
}

export default filterEmptyVal
