/* eslint-disable no-undef */
import RenderChunk from '../renderChunk/index.jsx'
import RenderTabs from '../renderTask/index.jsx'
import RenderRule from '../renderRule/index.jsx'

import Vue from 'vue'
import './index.scss'

/**
 * @file 渲染block
 * block 属于最顶级容器，里面可以放置chunk、rule
 */

export default {
  name: 'RenderBlock',
  inject: {
    spAnalysisApp: { default: {}}
  },

  props: {
    schema: {
      type: [Object, Array],
      default: () => {}
    },
    platform: {
      type: String,
      default: () => 'hubble'
    },
    parentField: {
      type: [Number, Boolean],
      default: () => false
    },
    ruleLayer: {
      type: [Boolean, String],
      default: () => false
    },
    fileTag: {
      type: [String, Boolean],
      default: () => false
    },
    currentStep: {
      type: [String, Number],
      default: () => null
    },
    ruleItemTag: {
      type: [String, Boolean],
      default: () => false
    }
  },
  methods: {
    /**
     * 开始渲染block
     * @param {object} schema block的schema
     */
    renderStart(schema) {
      let { children } = schema
      children = children && children.filter(child => child) || []

      return this.renderBlockChildren(children)
    },

    /**
     * 渲染block的children
     * @param {array} children block的孩子们 chunk、rule、block
     */
    renderBlockChildren(children) {
      return children.map((comp, index) => comp && this.renderSpecific(comp, index))
    },

    /**
     * 具体渲染逻辑
     * @param {object} copmSchema
     */
    renderSpecific(copmSchema, index) {
      const { type, nodeCompId } = copmSchema

      switch (type) {
        case 'item' :
        case 'chunk':
          return <RenderChunk ruleItemTag={this.ruleItemTag} fileTag={this.fileTag} ruleLayer={this.ruleLayer} parentField={this.parentField} platform={this.platform} schema={copmSchema} key={nodeCompId} index={index}/>
        case 'rule':
          return <RenderRule parentField={this.parentField} platform={this.platform} schema={copmSchema} key={nodeCompId}/>
        case 'tab':
          return <RenderTabs parentField={this.parentField} platform={this.platform} schema={copmSchema} key={nodeCompId}/>
        case 'block':
          // eslint-disable-next-line no-undef
          return <RenderBlock ruleItemTag={this.ruleItemTag} fileTag={this.fileTag} ruleLayer={this.ruleLayer} parentField={this.parentField} platform={this.platform} schema={copmSchema} key={nodeCompId}/>
        case 'text':
          return <div class='lego-form-item'>
            <el-form-item class='lego-form-item-text'>
              {copmSchema.message}
            </el-form-item>
          </div>
        default:
          return null
      }
    }

  },
  render(h) {
    const { type, label, hideLabel, children, tag } = this.schema

    // 塞一个皮肤,死逻辑[兼容老活动]
    if (label === '皮肤选择' && tag === 'deadCode') {
      return (
        <div class='select-skin'>
          { this.spAnalysisApp.openEditState && <div class='cover'/>}
          <BLMRadioGroup style='text-align:center' value={this.spAnalysisApp.formData.skinKey || 'LGYXHD0001' } onInput={value => Vue.set(this.spAnalysisApp.formData, 'skinKey', value)} height={'auto'} width={273} margin={20} data={this.spAnalysisApp.optionsDataMap.skinKey}/>
        </div>
      )
    }
    return (type === 'block' && children.length > 0) && (
      <div class='block'>
        { label && !hideLabel && <h3 class='block-label'>{label}</h3>}
        {this.renderStart(this.schema)}
      </div>
    )
  }

}

