import { Message } from 'element-ui'
let currentScenesAllChunk = []

/**
 * 防抖
 * @param {function} fn
 * @param {number} wait
 * @return a handle after function
 */
export const debounce = (fn, wait = 200) => {
  let timeout = null
  return (...args) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => {
      fn.apply(this, args)
    }, wait)
  }
}

/**
 * 节流--时间戳版本
 * @param {function} func 要处理的函数
 * @param {number} 截流时间
 * @returns a handle after function
 */
export const throttle = (func, delay = 20) => {
  let prev = 0
  return function(...arg) {
    const now = Date.now()
    if (now - prev > delay) {
      func.apply(this, arg)
      prev = now
    }
  }
}

/**
 * 向vnode中注入prop
 * @param {object} vnode
 * @param {object} props
 * @returns vnode
 */
export const handleInjectPorpsAndEvents = (vnode, props, ctx) => {
  const { currentFileName, taskNum, ruleLayer } = props
  let { attrs, on } = props

  if (typeof attrs === 'string' || typeof on === 'string') {
    if (ctx) {
      attrs = eval(attrs).call(ctx, currentFileName, taskNum, ruleLayer)
    } else {
      attrs = eval(attrs)()
    }

    on = eval(on)(vnode, props)
  }

  try {
    const vnodeProps = vnode.componentOptions.propsData
    const vnodeProps2 = vnode.data.attrs
    const vnodeEvent = vnode.componentOptions.listeners
    vnode.componentOptions.propsData = { ...vnodeProps, ...attrs }
    vnode.data.attrs = { ...vnodeProps2, ...attrs }
    vnode.componentOptions.listeners = { ...vnodeEvent, ...on }
  } catch (error) {
    console.error('注入属性&事件失败')
    console.error(error)
  }

  return vnode
}

/**
 * 将单词转换成首字母大写方式
 * @param {String} -- word 需要转换的单词
 * @returns {String} 首字母大写单词
 */
export function firstCharUpperCase(word = '') {
  word = word.toLowerCase()
  return word.charAt(0).toUpperCase() + word.slice(1)
}

/**
 * 处理表单重复提交
 * @param {function} oldHandleFn 处理函数
 */
export const handleRepeatSubmit = (oldHandleFn) => {
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

/**
 * get chunk数据
 * @param {string} chunkName
 * @returns
 */
const getChunkJsonByName = (chunkName, requestID) => {
  const uniquelyId = requestID || chunkName
  const chunkJson = currentScenesAllChunk.filter(({ name }) => name === uniquelyId)
  if (chunkJson.length === 1) {
    return chunkJson[0]
  } else {
    Message({
      showClose: true,
      message: `布局json错误：chunk ${chunkName}存在重复或者不存在`,
      type: 'error'
    })
    throw new Error(`布局json错误：chunk name存在重复或者不存在当前name!（chunkName名称：${chunkName}）`)
  }
}

/**
 * 仅组装chunk数据,回显和sp使用
 * @param {object} json
 */
export const setFilds = (json) => {
  const { type } = json
  if (type === 'chunk' || type === 'item') {
    const { name, requestID } = json
    const chunkJson = getChunkJsonByName(name, requestID)
    json.fields = chunkJson.fields
    json.options = Object.assign(json.options, chunkJson?.options || {})
    json.label = chunkJson.label
    json.defaultValue = chunkJson.defaultValue
  } else {
    json.children.forEach(nodeJson => {
      setFilds(nodeJson)
    })
  }
}

/**
 * 设置当前布局下的所有chunk
 * @param {array} arrChunk
 */
export const setCurrentScenesAllChunk = (arrChunk) => {
  currentScenesAllChunk = arrChunk
}

/**
 * 删除不要的key
 * @param {object} target -- 数据源
 * @param {array} target -- keyList
 * @returns
 */
export function deleteFile(data, target) {
  Object.keys(data).forEach(key => {
    if (Array.isArray(data[key])) {
      for (let i = 0; i < data[key].length; i++) {
        deleteFile(data[key][i], target)
      }
    }
    if (target.includes(key)) {
      delete data[key]
    }
  })
}

/**
 * 过滤空值 提交过滤
 * @param {object} resJson
 */
export const submitFilterEmptyVal = (resJson, parent, objKey) => {
  let obj = resJson instanceof Array ? [] : {}
  for (const [k, v] of Object.entries(resJson)) {
    // 处理空值的情况
    if (!(v === undefined || v === null)) {
      obj[k] = typeof v === 'object' ? submitFilterEmptyVal(v, resJson, k) : v
    }
  }

  if (Array.isArray(obj)) {
    obj = obj.filter(item => isTrue(item))
    if (obj.length === 0) { // 去除空数组
      delete parent[objKey]
    }
  }

  return obj
}

/**
 * 过滤空值 预览过滤
 * @param {object} resJson
 */
export const submitFilterEmptyVal2 = (resJson, parent, objKey) => {
  let obj = resJson instanceof Array ? [] : {}

  for (const [k, v] of Object.entries(resJson)) {
    // 处理空值的情况
    if (!(v === null)) {
      obj[k] = typeof v === 'object' ? submitFilterEmptyVal(v, resJson, k) : v
    }
  }

  if (Array.isArray(obj)) { obj = obj.filter(item => isTrue(item)) }

  return obj
}

/**
 * 获取玩法树相关chunk
 * @param {object} schema 玩法schema
 */
export const getRelationChunk = (schema) => {
  const getRelationChunk = (chunkName, type) => {
    const resChunkData = []
    const generator = (schema) => {
      if (schema.name === chunkName) {
        resChunkData.push(schema)
      } else {
        if (schema.children) {
          schema.children.forEach(child => generator(child))
        }
      }
    }

    generator(schema)

    // 返回配置信息
    if (type === 'config') {
      return resChunkData.map(item => item.operations)
    }
    // 返回option信息
    if (type === 'options') {
      return resChunkData.map(item => item.options)
    }
    return resChunkData
  }
  return getRelationChunk
}

/**
 * 获取目标组件实例
 * @param {object} context
 * @returns
 */
export const findComponentsDownward = (context) => {
  let currentComponentName = null
  const generator = (context) => {
    return context?.$children.reduce((pre, child) => {
      if (child.name === currentComponentName) return [...pre, child]
      else {
        if (child?.$children) {
          const foundChilds = generator(child)
          return [...pre, ...foundChilds]
        } else {
          return pre
        }
      }
    }, [])
  }

  return (componentName) => {
    if (!componentName) return null
    currentComponentName = componentName
    return generator(context)
  }
}

/**
 * 处理js真假问题
 * 仅undefined null false  才返回false,不考虑bigint
 * TODO 待考虑其他情况
 * @param {any} value
 */
export const isTrue = (value) => {
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

