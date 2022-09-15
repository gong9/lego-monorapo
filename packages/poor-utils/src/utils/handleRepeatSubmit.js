/**
 * 处理表单重复提交
 * @param {function} oldHandleFn 处理函数
 */
const handleRepeatSubmit = (oldHandleFn) => {
  let falg = true

  return async function(...arg) {
    const ctx = this

    if (falg) {
      // eslint-disable-next-line no-inner-declarations
      function * generatorHandle() {
        falg = false
        yield oldHandleFn.call(ctx, done, ...arg)
        falg = true
      }
      const iterator = generatorHandle()
      const done = () => {
        setTimeout(() => iterator.next())
      }

      iterator.next()
    }
  }
}

export default handleRepeatSubmit
