import Vue from 'vue'
import { Message } from 'element-ui'
import { handleInjectPorpsAndEvents } from '../utils/index'
import { isTrue } from '../utils/index'

/**
 * @file 包装el-radio
 */

export default (ctx) => {
  const {
    props: { component, schema, defaultValueByConfig = null, spAnalysisApp = null, fileName = '', index, currentFileParent }
  } = ctx
  const { options } = schema

  const ATOMIC_KEY = `${fileName}${index}`

  /**
   * 渲染子项
   * @param {any} data
   * @param {Boolean} 是否需要转换成component
   * @returns
   */
  const renderOptions = (data, component = true) => {
    // 允许空数组
    if (!data || !Array.isArray(eval(data))) {
      Message({
        showClose: true,
        message: '组件设计器error,请检查当前组件原子option是否配置data',
        type: 'error'
      })
      throw new Error('组件设计器error,请检查当前组件原子option是否配置data')
    }

    let finaSelectOptions = []
    if (typeof data === 'string') {
      finaSelectOptions = eval(data)
    }
    // 处理全量数据
    if (defaultValueByConfig === 0 || defaultValueByConfig) {
      finaSelectOptions = finaSelectOptions.filter(option => {
        return Array.isArray(defaultValueByConfig) ? defaultValueByConfig.includes(option.value) : option.value === defaultValueByConfig
      })
    }
    spAnalysisApp.optionsDataMap[ ATOMIC_KEY ] = finaSelectOptions

    if (component) {
      return finaSelectOptions.map((option) => {
        return (
          <el-radio
            key={option.value}
            label={option.value}
          >{option.label}
          </el-radio>
        )
      })
    } else {
      return finaSelectOptions
    }
  }

  const componentItems = renderOptions(options?.data, false) || []
  const currentAllOptionValueArr = componentItems.map(item => item.value)

  // 不匹配的情况
  if (isTrue(currentFileParent(spAnalysisApp.formData)[fileName]) && !currentAllOptionValueArr.includes(currentFileParent(spAnalysisApp.formData)[fileName])) {
    Vue.set(currentFileParent(spAnalysisApp.formData), fileName, currentAllOptionValueArr[0])
  }

  // 没有默认值的情况
  if (!isTrue(currentFileParent(spAnalysisApp.formData)[fileName])) {
    Vue.set(currentFileParent(spAnalysisApp.formData), fileName, currentAllOptionValueArr[0])
  }

  // 皮肤组件
  if (component === 'BLMRadioGroup') {
    // eslint-disable-next-line no-undef
    return handleInjectPorpsAndEvents(<BLMRadioGroup value={currentFileParent(spAnalysisApp.formData)[fileName]}
      onInput={(val) => { Vue.set(currentFileParent(spAnalysisApp.formData), fileName, val) }} data={componentItems}/>, options)
  }

  return (
    handleInjectPorpsAndEvents(
      <el-radio-group
        value={currentFileParent(spAnalysisApp.formData)[fileName]}
        onInput={(val) => { Vue.set(currentFileParent(spAnalysisApp.formData), fileName, val) }}
        onChange={() => {
          ctx.listeners.blur()
        }}
      >
        {renderOptions(options?.data)}
      </el-radio-group>
      , options, spAnalysisApp
    )
  )
}

