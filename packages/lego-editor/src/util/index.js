import _ from 'lodash'

import { blockConfigData, ruleConfigData, stepConfigData, taskConfigData } from '../configData'
import chunkConfigData from '../configData/config/index.json'

/**
 * 向vnode中注入prop
 * @param {object} vnode
 * @param {object} props
 * @returns vnode
 */
const handleInjectPorpsAndEvents = (vnode, props) => {
  let { attrs, on } = props
  if (typeof attrs === 'string' || typeof on === 'string') {
    try {
      attrs = eval(attrs)()
    } catch (error) {
      attrs = {}
      console.warn('attrs解析异常')
    }
    on = eval(on)()
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
 * 使某一祖先实例触发某种事件
 * @param {object} ctx
 * @param {string} componentName
 * @param {string} eventName
 * @param {string} params
 */
const dispatch = (ctx, componentName, eventName, params) => {
  let parent = ctx.$parent || ctx.$root
  let name = parent.componentName
  while (parent && (!name || name !== componentName)) {
    parent = parent.$parent
    if (parent) {
      name = parent.componentName
    }
  }
  if (parent) {
    parent.$emit.apply(parent, [eventName].concat(params))
  }
}

/**
 * 产出数据修剪
 * @param {array} schemaArr
 * @returns
 */
const filterUselessData = (schemaArr) => {
  const currentSchema = schemaArr[0] || {}
  const finalSchema = _.cloneDeep(currentSchema)

  const handleFilter = (node) => {
    const { currentConfigValue = {}} = node
    const options = {}
    Object.keys(currentConfigValue).forEach(key => {
      if (isBelongTo(key)) {
        options[key] = currentConfigValue[key]
      } else {
        node[key] = currentConfigValue[key]
      }
    })
    node.options = options
    node.config && delete node.config
    node.fields && delete node.fields
    node.currentConfigValue && delete node.currentConfigValue
    if (node.children && Array.isArray(node.children) && node.children.length > 0) {
      node.children.forEach(childNode => handleFilter(childNode))
    }
  }
  handleFilter(finalSchema)
  return finalSchema
}

/**
 * 反解 产出json转化为输入json
 * @param {object} schema
 * @returns
 */
const inverseParse = (schema) => {
  const finalSchema = _.cloneDeep(schema)

  const handleFilter = (node) => {
    addConfig(node)
    node.currentConfigValue = {
      name: 'block',
      isCanvas: false,
      isSort: false
    }
    if (node.children && Array.isArray(node.children) && node.children.length > 0) {
      node.children.forEach(childNode => handleFilter(childNode))
    }
  }
  handleFilter(finalSchema)
  return finalSchema
}

/**
 * 节点增加属性配置
 * @param {object} node
 */
const addConfig = (node) => {
  const { type } = node
  let config = {}
  switch (type) {
    case 'block':
      config = blockConfigData
      break
    case 'step':
      config = stepConfigData
      break
    case 'rule':
      config = ruleConfigData
      break
    case 'task':
      config = taskConfigData
      break
    case 'chunk':
      config = chunkConfigData
      break
    default:
      config = {}
      break
  }
  node.config = config
}

/**
 * 仅给chunk数据增加属性配置
 * @param {array} chunkData
 */
const addConfigOnlyChunk = (chunkData) => {
  return chunkData.map(
    chunk => {
      return {
        ...chunk,
        config: chunkConfigData
      }
    }
  )
}

const isBelongTo = (key) => {
  return !['name', 'isCanvas'].includes(key)
}

export {
  handleInjectPorpsAndEvents,
  dispatch,
  filterUselessData,
  inverseParse,
  addConfigOnlyChunk
}
