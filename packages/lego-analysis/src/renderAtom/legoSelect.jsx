/* eslint-disable no-undef */
import Vue from 'vue'
import { handleInjectPorpsAndEvents } from '../utils/index'
import './style.scss'

/**
 * @file 包装el-select
 */

export default (ctx) => {
  const {
    props: { schema, index, defaultValueByConfig = null, spAnalysisApp = null, fileName = '', currentFileParent, component, defaultValueInitVal }
  } = ctx

  const { options } = schema
  const ATOMIC_KEY = `${fileName}${index}`

  // handle options联动
  if (ATOMIC_KEY in spAnalysisApp.optionsInteraction) {
    // 已经初始化完，无需执行
  } else {
    // 首次不存在时执行一次即可
    if (!Array.isArray(spAnalysisApp.optionsDataMap[ ATOMIC_KEY ])) {
      const isData = !(typeof options.data === 'string' && options.data.replace(/\s/g, '') === '[]')
      if (isData) {
        const flag = !Array.isArray(defaultValueByConfig) || defaultValueByConfig.length === 0
        spAnalysisApp.optionsDataMap[ ATOMIC_KEY ] = (eval(options.data) || []).filter(option => flag ? option : defaultValueByConfig.includes(option.value))
      } else {
        const dataSrc = ((eval(options.dataSrc).bind(spAnalysisApp) || (() => Promise.resolve([])))())
        if (dataSrc instanceof Promise) {
          dataSrc.then((v) => {
            Vue.set(spAnalysisApp.optionsDataMap, ATOMIC_KEY, v || [])
          })
        } else {
          Vue.set(spAnalysisApp.optionsDataMap, ATOMIC_KEY, dataSrc || [])
        }
      }
    }
  }

  const componentItems = spAnalysisApp.optionsDataMap[ ATOMIC_KEY ] || []
  try {
    if (defaultValueInitVal) {
      !currentFileParent(spAnalysisApp.formData)[fileName] && Vue.set(currentFileParent(spAnalysisApp.formData), fileName, JSON.parse(defaultValueInitVal))
    }
    // 只针对订单里程/订单流水下拉框特殊处理
    if (componentItems.length && (fileName === 'orderDistanceOperator' || fileName === 'orderPriceOperator')) {
      !currentFileParent(spAnalysisApp.formData)[fileName] && Vue.set(currentFileParent(spAnalysisApp.formData), fileName, componentItems[0].value)
    }
  } catch (error) {
    !currentFileParent(spAnalysisApp.formData)[fileName] && Vue.set(currentFileParent(spAnalysisApp.formData), fileName, defaultValueInitVal)
  }

  const renderOptions = data => {
    return data.map((option) => {
      return (
        <el-option
          key={option.value}
          label={option.label}
          value={option.value}
        ></el-option>
      )
    })
  }

  if (component === 'BLMBatchCitySelect') {
    if (spAnalysisApp.environment === 'query') {
      const data = spAnalysisApp.optionsDataMap[ ATOMIC_KEY ]
      const value = currentFileParent(spAnalysisApp.formData)[fileName]

      const currentData = data.filter(item => value.includes(item.value))
      const currentLabelArr = currentData.map(item => item.label)
      let codeText = ''
      if (currentLabelArr.length === 0) {
        codeText = codeText = value.join(',')
      } else {
        codeText = currentLabelArr.join(',')
      }

      return (<el-input
        autosize= {{ minRows: 3 }}
        value={codeText}
        type='textarea'
      />)
    } else {
      return handleInjectPorpsAndEvents(<BLMBatchCitySelect
        value={currentFileParent(spAnalysisApp.formData)[fileName]}
        onInput={(val) => { Vue.set(currentFileParent(spAnalysisApp.formData), fileName, val) }}
        optionsData={spAnalysisApp.optionsDataMap[ ATOMIC_KEY ] || []}
        onChange={ctx.listeners.blur}
        size='medium'
      />, options, spAnalysisApp)
    }
  } else if (component === 'BLMSelectAndNestedList' || component === 'BLMSelectAndSearch') {
    return handleInjectPorpsAndEvents(<component
      class='crowdLabel'
      value={currentFileParent(spAnalysisApp.formData)[fileName]}
      onInput={(val) => { Vue.set(currentFileParent(spAnalysisApp.formData), fileName, val) }}
      data={spAnalysisApp.optionsDataMap[ ATOMIC_KEY ] || []}
      onChange={ctx.listeners.blur}
    />, options, spAnalysisApp)
  } else {
    return handleInjectPorpsAndEvents(
      <el-select
        value={currentFileParent(spAnalysisApp.formData)[fileName]}
        onInput={(val) => { Vue.set(currentFileParent(spAnalysisApp.formData), fileName, val) }}
      >
        {renderOptions(spAnalysisApp.optionsDataMap[ ATOMIC_KEY ] || [])}
      </el-select>, options, spAnalysisApp
    )
  }
}

