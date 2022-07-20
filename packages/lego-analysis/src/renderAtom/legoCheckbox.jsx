import Vue from 'vue'
import { Message } from 'element-ui'
import { handleInjectPorpsAndEvents, isTrue } from '../utils/index'

/**
 * @file 包装el-checkbox
 */

export default (ctx) => {
  const {
    props: { schema, defaultValueByConfig = null, index, spAnalysisApp = null, fileName = '', currentFileParent, defaultValueInitVal }
  } = ctx

  const { options } = schema
  const ATOMIC_KEY = `${fileName}${index}`

  /**
   * 渲染子项
   * @param {any} data
   * @returns
   */
  const handleData = (data) => {
    // 允许空数组
    if (!data || !Array.isArray(eval(data))) {
      Message({
        showClose: true,
        message: '组件设计器error,请检查当前组件原子option是否配置data',
        type: 'error'
      })
      throw new Error('组件设计器error,请检查当前组件原子option是否配置data1')
    }

    let finaSelectOptions = data
    if (typeof data === 'string') {
      finaSelectOptions = eval(data)
    }

    if (!Array.isArray(finaSelectOptions)) {
      throw new Error('原子checkbox枚举解析错误，请检查')
    }

    // 处理全量数据 [maximumRewardLimitFe 是一个特例，奖励上限]
    if (defaultValueByConfig && fileName !== 'maximumRewardLimitFe') {
      if (!Array.isArray(defaultValueByConfig)) {
        throw new Error('原子checkbox枚举解析错误，请检查option的数据格式')
      }

      finaSelectOptions = finaSelectOptions.filter(option => {
        return defaultValueByConfig.includes(option.value)
      })
    }

    // 特殊逻辑，拼单（最高奖励上限组件）
    // TODO 多任务后改造
    const match = spAnalysisApp.specialOption.filter(item => item.relationField === fileName)

    if (match.length > 0) {
      finaSelectOptions = finaSelectOptions.filter(item => match[0].replaceOption.includes(item.value))
    }

    spAnalysisApp.optionsDataMap[ ATOMIC_KEY ] = finaSelectOptions

    return finaSelectOptions
  }

  const componentItems = handleData(options?.data) || []
  let legoValueInitVal = [] // 默认值

  try {
    legoValueInitVal = eval(defaultValueInitVal) || []
  } catch (error) {
    legoValueInitVal = []
  }
  const currentAllOptionValueArr = componentItems.map(item => item.value)
  const finaAllOptionValueArr = legoValueInitVal.filter(item => currentAllOptionValueArr.includes(item))

  // 有默认值优先默认值
  if (finaAllOptionValueArr.length > 0) {
    if (currentFileParent(spAnalysisApp.formData)[fileName].filter(item => !currentAllOptionValueArr.includes(item)).length > 0) {
      Vue.set(currentFileParent(spAnalysisApp.formData), fileName, finaAllOptionValueArr)
    }
  } else {
    if (!isTrue(currentFileParent(spAnalysisApp.formData)[fileName])) {
      Vue.set(currentFileParent(spAnalysisApp.formData), fileName, [currentAllOptionValueArr[0]])
    }
  }

  return handleInjectPorpsAndEvents(
    // eslint-disable-next-line no-undef
    <BLM-checkbox-group
      value={currentFileParent(spAnalysisApp.formData)[fileName] || []}
      onInput={(val) => { Vue.set(currentFileParent(spAnalysisApp.formData), fileName, val) }}
      data={handleData(options?.data) || []}
      onChange={(val) => { ctx.listeners.blur() }}
    ></BLM-checkbox-group>, options, spAnalysisApp
  )
}

