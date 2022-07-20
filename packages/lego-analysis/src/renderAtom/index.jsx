import Vue from 'vue'
import AsyncValidator from 'async-validator'
import _ from 'lodash'
import AtomicComponent from './atomicComponentMap.jsx'
import './style.scss'

export default {
  inject: {
    spAnalysisApp: { default: {}}
  },
  props: ['fileTag', 'platform', 'chunkIndex', 'fileName', 'component', 'schema', 'configValue', 'options', 'fieldId', 'ruleLayer', 'index', 'chunkUnique', 'newSuffix', 'ruleItemTag'],
  data() {
    return {
      validateState: '',
      validateMessage: '',
      currentRule: [],
      finalFileName: '',
      ruleFileName: '',
      name: this.fileName,
      finlName: '',
      flag: true,
      atomAttrs: {},
      needCheck: true
    }
  },
  created() {
    this.name = this.fileName
    this.finlName = this.fileName // 原子最终字段
    this.noNeedCheck = []

    // TODO 待优化 需要替换字段 拼单奖
    if (this.finlName === 'rewardPerOrderMoney') {
      const target = this.spAnalysisApp.specialField.filter(item => item.relationField === 'rewardPerOrderMoney')
      if (target.length > 0) {
        this.finlName = target[0].replace
      }
    }

    // TODO 待优化 需要替换字段 拼单奖区间
    if (this.fileName === 'rewardPerOrderRange') {
      const target = this.spAnalysisApp.specialField.filter(item => item.relationField === 'rewardPerOrderRange')
      if (target.length > 0) {
        this.finlName = target[0].replace
      }
    }

    // !需要替换字段 每单奖励 【一阶段兼容】
    if (this.fileName === 'tagMaximumLimit') {
      const target = this.spAnalysisApp.specialField.filter(item => item.relationField === 'tagMaximumLimit')
      if (target.length > 0) {
        this.finlName = target[0].replace
      }
    }

    const { attrs } = this.options

    this.atomAttrs = eval(attrs).call(this.spAnalysisApp, this.finlName, this.fileTag ? Number(this.fileTag) : this.fileTag, this.ruleLayer ? Number(this.ruleLayer) : this.ruleLayer)

    if (this.schema?.options?.rules) {
      this.getRules()
    }
  },
  mounted: function() {
    if (this.schema?.options?.rules) {
      if (!this.spAnalysisApp.fields[this.spAnalysisApp.currentStep]) {
        Vue.set(this.spAnalysisApp.fields, this.spAnalysisApp.currentStep, [])
      }

      // 收集一下rule中的组件
      if (this.ruleLayer) {
        if (!this.spRuleApp.ruleChunkValidator[this.ruleLayer]) {
          Vue.set(this.spRuleApp.ruleChunkValidator, this.ruleLayer, [])
        }

        this.spRuleApp.ruleChunkValidator[this.ruleLayer].push(this)
      } else {
        this.spAnalysisApp.fields[this.spAnalysisApp.currentStep].push(this)
      }
    }
  },

  methods: {
    /**
     * 获取全部rule
     */
    getRules() {
      try {
        this.currentRule = eval(this.options.rules).apply(this.spAnalysisApp, [this.spAnalysisApp.formData, this.configValue, this, {
          taskNum: this.fileTag ? Number(this.fileTag) : this.fileTag,
          ruleLayer: this.ruleLayer ? Number(this.ruleLayer) : this.ruleLayer,
          fileName: this.finlName
        }])
      } catch (error) {
        throw new Error('rule:配置错误')
      }
    },

    /**
     * 获取非顶层字段
     * @param {object} object
     * @returns
     */
    currentFileParent(object, customRuleLayer) {
      if (this.fileTag) {
        if (this.ruleLayer) {
          return _.get(object, `taskList[${Number(this.fileTag)}].awardRules[${Number((customRuleLayer === 0 || customRuleLayer) ? customRuleLayer : this.ruleLayer)}][${this.finlName}]`)
        } else {
          return _.get(object, `taskList[${Number(this.fileTag)}][${this.finlName}]`)
        }
      }
    },

    /**
     * 检查是否有必填属性
     * @param {array} rule
     */
    checkIsRequired(rule = this.currentRule) {
      if (this.flag) {
        const accordWith = rule.filter(ruleItem => { return ruleItem?.required })
        if (accordWith.length > 0) {
          // 通知其父组件
          this.$emit('required', { chunkUnique: this.chunkUnique, isRequired: true })
        } else {
          this.$emit('required', { chunkUnique: this.chunkUnique, isRequired: false })
        }
        this.flag = false
      }
    },

    /**
     * 获取符合条件的rule
     * @param {string} trigger
     */
    getFilteredRule(trigger) {
      const rules = this.currentRule || []

      if (Array.isArray(rules)) {
        return rules.filter((rule) => !trigger || rule.trigger === trigger)
      } else {
        return []
      }
    },

    /**
     * 校验
     * @param {string} trigger input or change
     */
    validate(trigger, customRule, currentVal, customRuleLayer) {
      // 不需要再进行校验的原子实例
      if (this.noNeedCheck.includes(this.finlName)) {
        return Promise.resolve().then(() => 'success')
      }

      let rules = null

      if (customRule) {
        rules = [
          ...customRule,
          ...this.getFilteredRule()
        ]
      } else {
        rules = this.getFilteredRule(trigger)
      }

      if (!rules || rules.length === 0) return true

      this.validateState = 'validating'

      const descriptor = {}
      const model = {}
      descriptor[this.finlName] = rules

      if (currentVal) {
        model[this.finlName] = currentVal
      } else {
        model[this.finlName] = this.fileTag ? this.currentFileParent(this.spAnalysisApp.formData, customRuleLayer) : this.spAnalysisApp.formData[this.finlName]
      }

      const validator = new AsyncValidator(descriptor)

      validator.validate(model, { firstFields: true }, (errors) => {
        this.validateState = !errors ? 'success' : 'error'
        this.validateMessage = errors ? errors[0].message : ''
      })

      return Promise.resolve().then(() => this.validateState)
    }
  },
  render(h) {
    const visibleAtomic = this.spAnalysisApp.atomicInteraction?.[ this.finlName + this.index ]?.visible
    return (
      <div style={{ display: this.atomAttrs.inline ? 'inline-block' : 'block' }}>
        <AtomicComponent atomAttrs={this.atomAttrs} chunkIndex={ this.chunkIndex } index={ this.index } ruleLayer={this.ruleLayer || false} fileTag={this.fileTag || false} platform={this.platform} key={this.fieldId} fileName={this.fileName} component={this.component} options={this.options} schema={this.schema} configValue={this.configValue} validate={this.validate} newSuffix={this.newSuffix}/>
        <div style={{ zIndex: this.index, backgroundColor: '#fff' }} class='el-form-item__error' vShow={ !!this.validateMessage && typeof visibleAtomic === 'boolean' ? visibleAtomic : true }>{this.validateMessage}</div>
      </div>
    )
  }
}

