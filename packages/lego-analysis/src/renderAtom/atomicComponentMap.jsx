
/* eslint-disable no-undef */

import Vue from 'vue'
import _ from 'lodash'
import { handleInjectPorpsAndEvents, isTrue } from '../utils/index'
import legoSelect from './legoSelect.jsx'
import legoRadio from './legoRadio.jsx'
import legoCheckbox from './legoCheckbox.jsx'

import './style.scss'

/**
 * @file 原子组件map表【伪map表】
 */
export default {
  functional: true,
  inject: {
    spAnalysisApp: { default: {}}
  },
  render(h, renderContext) {
    const { props: { atomAttrs, component, schema, configValue, index, fileName, platform, validate = () => {}, fileTag, ruleLayer, newSuffix }, injections, parent } = renderContext
    const { option: defaultValueByConfig } = configValue // 取出哈勃配置option的数据
    let { options } = renderContext.props
    const { defaultValue: defaultValueInitVal } = schema
    const { spAnalysisApp } = injections
    let props = {}
    let describe = null
    let warning = '' // 防配错警告信息

    // 原子描述
    props = atomAttrs

    if (typeof props.describe === 'string') {
      describe = props.describe
    }
    if (typeof props.describe === 'function') {
      describe = props.describe.call(spAnalysisApp)
    }

    let cloneFileName = fileName
    let suffix = props.suffix || ''
    const ATOMIC_KEY = `${cloneFileName}${index}`

    // 扩展组件options
    options = {
      ...options,
      taskNum: fileTag ? Number(fileTag) : fileTag,
      ruleLayer: ruleLayer ? Number(ruleLayer) : ruleLayer
    }

    // 需要替换后缀
    if (newSuffix) {
      suffix = newSuffix
    }

    try {
      if /* 初始化原子交互逻辑，只在SP中执行 */ (
        platform === 'sp' &&
        !(ATOMIC_KEY in spAnalysisApp.atomicInteraction)
      ) {
        const interaction = eval(schema.options?.interaction || (() => {})).call(spAnalysisApp)
        if /* 原子存在options联动 */(typeof interaction?.options === 'function') {
          // 存联动关系
          Vue.set(spAnalysisApp.optionsInteraction, ATOMIC_KEY, {
            options: interaction.options
          })
          // 初始化options数据
          Promise.resolve(interaction.options(spAnalysisApp.request, spAnalysisApp.formData)).then(res => {
            Vue.set(spAnalysisApp.optionsDataMap, ATOMIC_KEY, res || [])
          })
        }

        // 原子存在联动
        typeof interaction?.display === 'function' && (Vue.set(spAnalysisApp.atomicInteraction, ATOMIC_KEY, {
          visible: interaction.display.call(spAnalysisApp, spAnalysisApp.formData),
          display: interaction.display
        }))
      }
    } catch (error) {
      console.error(schema, '交互代码配置错误，请自行检查')
    }

    /**
     *  设置原子一些样式
     */
    const setWidth = () => {
      const { width } = props
      if (width) {
        return {
          width
        }
      } else {
        return {}
      }
    }

    /**
     * 设置当前字段的parent path
     * @param {object} object
     */
    const currentFileParent = (object) => {
      if (fileTag) {
        if (ruleLayer) {
          // 流水和固定金额需要切换字段
          if (cloneFileName === 'rewardPerOrderMoney') {
            const target = spAnalysisApp.specialField.filter(item => item.relationField === 'rewardPerOrderMoney')
            if (target.length > 0) {
              cloneFileName = target[0].replace
              options = { ...options, currentFileName: target[0].replace }
            }
          }
          // 流水和固定金额需要切换字段
          if (cloneFileName === 'rewardPerOrderRange') {
            const target = spAnalysisApp.specialField.filter(item => item.relationField === 'rewardPerOrderRange')
            if (target.length > 0) {
              cloneFileName = target[0].replace
              options = { ...options, currentFileName: target[0].replace }
            }
          }

          return _.get(object, `taskList[${Number(fileTag)}].awardRules[${Number(ruleLayer)}]`)
        } else {
          // ! 兼容一阶段最高奖励上限
          // TODO 优化代码
          if (cloneFileName === 'tagMaximumLimit') {
            const target = spAnalysisApp.specialField.filter(item => item.relationField === 'tagMaximumLimit')
            if (target.length > 0) {
              cloneFileName = target[0].replace
              options = { ...options, currentFileName: target[0].replace }
            }
          }
          return _.get(object, `taskList[${Number(fileTag)}]`)
        }
      } else {
        return object
      }
    }

    // 设置字段默认值
    // 考虑什么时候可以设置默认值，
    try {
      if (defaultValueInitVal) {
        !isTrue(currentFileParent(spAnalysisApp.formData)[fileName]) && Vue.set(currentFileParent(spAnalysisApp.formData), cloneFileName, JSON.parse(defaultValueInitVal))
      }
      // 解析warning条件
      if (typeof props.warning === 'string' && spAnalysisApp.$route.query['environment'] !== 'query') {
        const ruleValue = spAnalysisApp?.formData['taskList'][options.taskNum]['awardRules'][options.ruleLayer]
        currentFileParent(spAnalysisApp.formData)[cloneFileName]
        // eslint-disable-next-line no-unused-vars
        const selfValue = ruleValue[cloneFileName]
        warning = eval(`\`${props.warning}\``)
      }
    } catch (error) {
      !isTrue(currentFileParent(spAnalysisApp.formData)[fileName]) && Vue.set(currentFileParent(spAnalysisApp.formData), cloneFileName, defaultValueInitVal)
    }

    /**
     * 具体渲染逻辑
     * todo 梳理组件进行合并
     * @returns vnode
     */
    const renderAtomic = () => {
      if (platform === 'sp') {
        const flag = spAnalysisApp.atomicInteraction?.[ ATOMIC_KEY ]?.visible
        const newArr = new Set(parent.noNeedCheck)
        if (typeof flag === 'boolean' ? flag : true) {
          // 再去查看是否必填
          parent.checkIsRequired()
          // 校验当前原子
          if (newArr.has(fileName)) {
            newArr.delete(fileName)
            parent.noNeedCheck = [...newArr]
          }
        } else {
          // 不校验当前原子
          newArr.add(fileName)
          parent.noNeedCheck = [...newArr]

          return
        }
      }

      switch (component) {
        case 'el-input':
          return <div class='input-content'> {props.prefix && <span class='prefix'>{props.prefix}</span>}
            {handleInjectPorpsAndEvents(
              (
                <el-input
                  value={ currentFileParent(spAnalysisApp.formData)[cloneFileName] }
                  onBlur={() => {
                    validate('blur')
                  }}
                  onInput={(val) => {
                    Vue.set(currentFileParent(spAnalysisApp.formData), cloneFileName, val)
                  }}
                  style={{ ...setWidth() }}
                />
              )
              , options, spAnalysisApp)}
            {suffix && <span class='suffix'>{suffix}</span>}

          </div>
        case 'el-textarea':
          return handleInjectPorpsAndEvents(
            <el-input
              value={currentFileParent(spAnalysisApp.formData)[cloneFileName] }
              onInput={(val) => {
                Vue.set(currentFileParent(spAnalysisApp.formData),
                  cloneFileName, val)
              }}
              onBlur={() => validate('blur')}
              type='textarea'
            />, options, spAnalysisApp)
        case 'el-checkbox-group':
          return <legoCheckbox defaultValueInitVal={defaultValueInitVal} index={index} fileTag={fileTag} currentFileParent={currentFileParent} defaultValueByConfig={defaultValueByConfig} spAnalysisApp={spAnalysisApp} fileName={cloneFileName} schema={schema} platform={platform} onBlur={() => {
            validate('blur')
          }}/>
        case 'el-radio-group':
        case 'BLMRadioGroup' :
          return (<div>
            <legoRadio component={component} defaultValueInitVal={defaultValueInitVal} fileTag={fileTag} index={index} currentFileParent={currentFileParent} defaultValueByConfig={defaultValueByConfig} spAnalysisApp={spAnalysisApp} platform={platform} fileName={cloneFileName} schema={schema} onBlur={() => { validate('blur') }}
            />
          </div>)
        case 'el-select':
        case 'BLMBatchCitySelect':
        case 'BLMSelectAndNestedList':
        case 'BLMSelectAndSearch':
          return <legoSelect defaultValueInitVal={defaultValueInitVal} fileTag={fileTag} currentFileParent={currentFileParent} index={index} component={component} defaultValueByConfig={defaultValueByConfig} spAnalysisApp={spAnalysisApp} platform={platform} fileName={cloneFileName} schema={schema} onBlur={() => validate('blur')}/>
        case 'el-time-select':
          return handleInjectPorpsAndEvents(
            <el-time-select
              value={currentFileParent(spAnalysisApp.formData)[cloneFileName] }
              onInput={(val) => { Vue.set(currentFileParent(spAnalysisApp.formData), cloneFileName, val) }}
              onBlur={() => validate('blur')} />, options, spAnalysisApp)
        case 'el-date-picker':
          return handleInjectPorpsAndEvents(
            <el-date-picker
              value={currentFileParent(spAnalysisApp.formData)[cloneFileName] }
              onInput={(val) => { Vue.set(currentFileParent(spAnalysisApp.formData), cloneFileName, val) }}
              onChange={() => {
                validate('blur')
              }}/>, options, spAnalysisApp)
        case 'el-date-range':
          return <div class='lego-date-range-content'>
            {
              handleInjectPorpsAndEvents(
                <el-date-picker
                  value={currentFileParent(spAnalysisApp.formData)[cloneFileName] }
                  onInput={(val) => { Vue.set(currentFileParent(spAnalysisApp.formData), cloneFileName, val) }}
                  onChange={() => validate('blur')}/>, options, spAnalysisApp)
            }
          </div>
        case 'BLMTimePickerListLimit':
          return handleInjectPorpsAndEvents(
            <BLMTimePickerListLimit
              data={ eval(options?.data).filter(item => defaultValueByConfig.includes(item.value)) || []}
              value={currentFileParent(spAnalysisApp.formData)[cloneFileName] || []}
              onInput={(val) => { Vue.set(currentFileParent(spAnalysisApp.formData), cloneFileName, val) }}
              onChange = {() => { validate('change') }}
              onBlur={() => validate('blur')}/>, options, spAnalysisApp)
        case 'el-input-number':
          return (
            <div class='input-content'> {props.prefix && <span class='prefix'>{props.prefix}</span>}
              {handleInjectPorpsAndEvents(
                <el-input-number
                  value={currentFileParent(spAnalysisApp.formData)[cloneFileName] }
                  onInput={(val) => { Vue.set(currentFileParent(spAnalysisApp.formData), cloneFileName, val) }}
                  onBlur={() => validate('blur')}
                />, options, spAnalysisApp)}
              {suffix && <span class='suffix'>{suffix}</span>}
              {warning && <span style={{ color: 'red', marginLeft: '5px', fontSize: '12px' }}>{warning}</span>}
            </div>)
        case 'span':
          return (
            <span style={{ marginRight: '6px' }}>{props.text} </span>
          )
        default:
          return handleInjectPorpsAndEvents(<component
            value={currentFileParent(spAnalysisApp.formData)[cloneFileName] || []}
            onInput={(val) => {
              Vue.set(currentFileParent(spAnalysisApp.formData), cloneFileName, val)
            }}
            onBlur={() => {
              validate('blur')
            }}/>, options, spAnalysisApp)
      }
    }
    const Atomic = renderAtomic()
    spAnalysisApp.attrsMap[cloneFileName] = Atomic?.data?.attrs || {}
    return (
      [
        <div class='atomic' style={{
          marginBottom: Atomic ? '16px' : '0'
        }}>
          {Atomic}
        </div>,
        describe ? <p class='describe' domPropsInnerHTML={describe}></p> : ''
      ]
    )
  }
}
