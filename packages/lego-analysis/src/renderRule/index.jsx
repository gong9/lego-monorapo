import Vue from 'vue'
import { Message } from 'element-ui'
import RenderBlock from '../renderBlock/index.jsx'
import './index.scss'

/**
 * @file 渲染rule
 */

export default {
  inject: {
    spAnalysisApp: { default: {}}
  },
  provide() {
    return {
      spRuleApp: this
    }
  },
  props: {
    schema: {
      type: Object,
      default: () => {}
    },
    platform: {
      type: String,
      default: () => 'hubble'
    },
    parentField: {
      type: [Number, Boolean],
      default: () => false
    }
  },
  data() {
    return {
      currentRuleData: [],
      layer: 0,
      numberSteps: 5,
      ruleChunkValidator: {},
      baseValidator: [],
      noNeedIncreases: ['rewardPerOrderRangeMoney', 'rewardPerOrderRangePercentage'] // 不需要校验的权益
    }
  },
  created() {
    this.name = this.schema.name
    !('awardRules' in this.spAnalysisApp.formData.taskList[this.parentField]) && this.$set(this.spAnalysisApp.formData.taskList[this.parentField], 'awardRules', []) // rule字段 init
    // eslint-disable-next-line vue/no-mutating-props
    this.schema.children[0].children = this.pushLogicDescribe(this.schema)
    this.handleLayerInit()
    this.specialTreatment(this.schema.children[1].children[0]) // 收集每单奖每单奖励区间励属性，字段替换使用。此路径目前是死的不会进行改变

    const { operations } = this.schema
    if (operations) {
      this.numberSteps = operations?.rewardRule?.numberSteps
      Vue.set(this.spAnalysisApp.configMap, 'rewardRule', this.schema?.operations?.rewardRule)
    }
  },
  mounted() {
    if (!this.spAnalysisApp.fields[this.spAnalysisApp.currentStep]) {
      Vue.set(this.spAnalysisApp.fields, this.spAnalysisApp.currentStep, [])
    }
    this.spAnalysisApp.fields[this.spAnalysisApp.currentStep].push(this)
  },

  methods: {
    /**
     * rule 渲染
     * @param {object} schema
     */
    renderRuleStart(schema, layer) {
      // sp set rule-layer 数据结构
      !this.spAnalysisApp.formData.taskList[this.parentField].awardRules[layer] && this.$set(this.spAnalysisApp.formData.taskList[this.parentField].awardRules, layer, {})

      const { type, fileds, children } = schema
      if (type !== 'rule') throw new Error('rule解析组件只能解析rule')
      return (fileds || children).map(
        (filed, index) => {
          return (<RenderBlock ruleItemTag={index === 0 ? 'taskIndicators' : 'interests'} ruleLayer={String(layer)} fileTag='0' parentField={this.parentField} schema={filed} platform={this.platform}/>)
        }
      )
    },

    /**
     * 添加rule层级
     */
    async addLayer() {
      // 层级校验
      const flag = await this.validate()
      if (flag === 'error') return

      this.currentRuleData.push({ schema: this.schema, layer: this.currentRuleData.length })
    },

    /**
     * 删除rule层级
     * @param {object} ruleItem
     */
    async deleteRuleItem(ruleItem) {
      // TODO 后期考虑去掉删除校验，但是目前存在问题
      // 如是最高层级则直接删除

      if (ruleItem.layer !== this.currentRuleData.length - 1 && await this.validate() === 'error') {
        Message({
          showClose: true,
          message: '请先修正rule中的错误配置',
          type: 'error'
        })
        return
      }

      this.spAnalysisApp.formData.taskList[this.parentField].awardRules.splice(ruleItem.layer, 1)
      const currentIndex = this.currentRuleData.findIndex(item => item === ruleItem)
      this.currentRuleData.splice(currentIndex, 1)

      // 修正层级
      this.currentRuleData = this.currentRuleData.map((item, i) => {
        return {
          ...item,
          layer: i
        }
      })

      // 删除校验实例&修正校验层级
      delete this.ruleChunkValidator[ruleItem.layer]

      const oldRuleChunkValidator = this.ruleChunkValidator
      const newRuleChunkValidator = {}
      const currentOldValueArr = Object.values(oldRuleChunkValidator)

      for (let i = 0; i < currentOldValueArr.length; i++) {
        newRuleChunkValidator[i] = currentOldValueArr[i]
      }
      this.ruleChunkValidator = newRuleChunkValidator
    },

    /**
     * 阶层数据新建和回显
     */
    handleLayerInit() {
      const awardRulesData = this.spAnalysisApp.formData?.taskList[this.parentField]?.awardRules

      if (awardRulesData) {
        awardRulesData.forEach((item, index) => {
          if (Object.keys(item).length > 0) { this.currentRuleData.push({ schema: this.schema, layer: index }) }
        })
        if (this.currentRuleData.length === 0) {
          this.currentRuleData.push({ schema: this.schema, layer: 0 })
        }
      } else {
        this.currentRuleData.push({ schema: this.schema, layer: 0 })
      }
    },

    /**
     * 一些业务相关，目前写死的逻辑
     * @param {object} targetJson 目标数据信息
     */
    specialTreatment(targetJson) {
      const { name, operations: targetOperations, options } = targetJson
      // 每单奖和每单奖励的字段都会改变
      // TODO 每单奖和每单奖励区间为死逻辑  后面思考待解
      if (name === 'rewardPerOrder_v2') {
        // 收集起来等待动态切换 每单奖的固定金额和流水
        for (let i = 0; i < Object.keys(options).length; i++) {
          if (Object.keys(options)[i] === 'rewardPerOrderMoney' || Object.keys(options)[i] === 'rewardPerOrderPercentage') {
            this.spAnalysisApp.specialField.findIndex(item => item.relationField === 'rewardPerOrderMoney') === -1 && this.spAnalysisApp.specialField.push({ relationField: 'rewardPerOrderMoney', replace: Object.keys(options)[i] })
          }
        }
      }
      if (name === 'rewardPerOrderRange_v2') {
        // 收集起来等待动态切换 每单区间的固定金额和流水
        for (let i = 0; i < Object.keys(options).length; i++) {
          if (Object.keys(options)[i] === 'rewardPerOrderRangeMoney' || Object.keys(options)[i] === 'rewardPerOrderRangePercentage') {
            this.spAnalysisApp.specialField.findIndex(item => item.relationField === 'rewardPerOrderRange') === -1 && this.spAnalysisApp.specialField.push({ relationField: 'rewardPerOrderRange', replace: Object.keys(options)[i] })
          }
        }
      }
      // 收集最高奖励上限配置======>其配置在每单奖or每单区间组件上
      if (name === 'rewardPerOrder_v2' || name === 'rewardPerOrderRange_v2') {
        const currentPath = name === 'rewardPerOrder_v2' ? 'rewardPerOrderMoney' : 'rewardPerOrderRange'
        const tagetOptionArr = targetOperations[currentPath]?.rewardsUpperLimit || [] // 收集奖励上限的枚举

        this.spAnalysisApp.specialOption.findIndex(item => item.relationField === 'maximumRewardLimitFe') === -1 && this.spAnalysisApp.specialOption.push({ relationField: 'maximumRewardLimitFe', replaceOption: tagetOptionArr })

        // 通知完单量组件
        if (name === 'rewardPerOrder_v2') {
          this.spAnalysisApp.specialField.findIndex(item => item.relationField === 'orderNum') === -1 && this.spAnalysisApp.specialField.push({ relationField: 'orderNum', isInterval: false })
        } else {
          this.spAnalysisApp.specialField.findIndex(item => item.relationField === 'orderNum') === -1 && this.spAnalysisApp.specialField.push({ relationField: 'orderNum', isInterval: true })
        }
      }
      //! 一阶段老组件，需要代码兼容【收集最高奖励上限】
      if (name === 'rewardPerOrder') {
        for (let i = 0; i < Object.keys(options).length; i++) {
          if (Object.keys(options)[i] === 'rewardUpperLimitMoney' || Object.keys(options)[i] === 'rewardUpperLimitOrderNum') {
            this.spAnalysisApp.specialField.findIndex(item => item.relationField === 'tagMaximumLimit') === -1 && this.spAnalysisApp.specialField.push({ relationField: 'tagMaximumLimit', replace: Object.keys(options)[i] })
            break
          }
        }
      }
    },

    /**
     * rule 数据校验
     */
    async validate() {
      if (this.currentRuleData.length === 1) {
        const currentLayer = this.ruleChunkValidator[this.currentRuleData.length - 1].map((child) => child.validate(null, null, null, 0))
        const currentLayerStateArrRel = await Promise.all(currentLayer)
        const currentLayerState = currentLayerStateArrRel.some(itemStart => itemStart === 'error')
        if (currentLayerState) { return Promise.resolve('error') }
      } else {
        // 两两层级进行校验
        for (let i = Object.keys(this.ruleChunkValidator).length - 1; i - 1 >= 0; i--) {
          const preLayer = this.ruleChunkValidator[i - 1].map(child => {
            return child.validate(null, null, null, i - 1)
          })

          const currentLayer = this.ruleChunkValidator[i].map((child, index) => {
            let preVal = this.spAnalysisApp.formData.taskList[this.parentField].awardRules[i - 1][child.finlName]
            const currentVal = this.spAnalysisApp.formData.taskList[this.parentField].awardRules[i][child.finlName]

            if (Array.isArray(preVal)) {
              if (preVal[1]) {
                preVal = preVal[1] > preVal[0] ? preVal[1] : preVal[0]
              } else {
                preVal = preVal[0]
              }
            }

            return child.validate(null, [{
              validator: (rule, value, callback) => {
                let realVal = null

                Array.isArray(value) ? realVal = value[0] : realVal = value
                // 主要指标和权益内容，必须严格递增
                // 新逻辑： 每单奖励区间的奖励金额和流水提成不需要递增
                if ((index === 0 || child._props.ruleItemTag === 'interests') && (!this.noNeedIncreases.includes(child.finlName))) {
                  if (realVal <= preVal) {
                    return callback(new Error('必须大于上一层级'))
                  }
                } else {
                  if ((realVal < preVal) && (!this.noNeedIncreases.includes(child.finlName))) {
                    return callback(new Error('必须大于等于上一层级'))
                  }
                }

                return callback()
              }
            }], currentVal, i)
          })

          const preLayerStateArrRel = await Promise.all(preLayer)
          const currentLayerStateArrRel = await Promise.all(currentLayer)
          const preLayerState = preLayerStateArrRel.some(itemStart => itemStart === 'error')
          const currentLayerState = currentLayerStateArrRel.some(itemStart => itemStart === 'error')

          if (preLayerState || currentLayerState) { return Promise.resolve('error') }
        }
      }
    },

    /**
     * 对指标玩法数据进行改造，push 指标之间的逻辑描述（或且）
     * @param {object} schema
     */
    pushLogicDescribe(schema) {
      const { operations: { rewardRule: { indexRelationship }}} = schema
      const currentContainer = schema?.children[0]?.children || []
      const newContainer = []
      const isSet = currentContainer.findIndex(item => item.type === 'text') !== -1 // 检查是否设置过

      if (!isSet) {
        for (let i = 0; i < currentContainer.length; i++) {
          newContainer.push(currentContainer[i])
          if (i !== currentContainer.length - 1) {
            newContainer.push({
              type: 'text',
              message: indexRelationship && indexRelationship === 'and' ? '且' : '或'
            })
          }
        }
        return newContainer
      } else {
        return currentContainer
      }
    }

  },

  render(h) {
    return (
      <div class='rule'>
        <div class='rule-right'>
          <h4 class='rule-title'>{this.schema.label}</h4>
          <h4> {this.schema.options?.finalDescription || this.schema.options?.description || ''}</h4>
          {
            this.currentRuleData.map((ruleItem) => {
              if (!ruleItem) { return null }
              const { schema, layer } = ruleItem
              return (

                <div class='rule-item'>
                  {this.renderRuleStart(schema, layer)}
                  { !this.spAnalysisApp.openEditState && this.currentRuleData.length > 1 && <i class='delete-rule-item el-icon-delete' onClick={() => { this.deleteRuleItem(ruleItem) }}/>}
                </div>

              )
            })
          }
          <div class='add-layer'>
            {
              this.spAnalysisApp.environment !== 'query' && <el-button disabled={this.spAnalysisApp.openEditState || this.numberSteps === this.currentRuleData.length} type='primary' plain onClick={this.addLayer}>+添加层级</el-button>
            }
          </div>
        </div>
      </div>
    )
  }
}

