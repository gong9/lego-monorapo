import RenderBlock from './renderBlock/index.jsx'
import RenderStep from './renderStep/index.jsx'
import { setFilds, setCurrentScenesAllChunk, getRelationChunk, findComponentsDownward } from './utils'

import './index.scss'

export default {
  name: 'SpAnalysis',
  components: {
    RenderBlock
  },
  provide() {
    return {
      spAnalysisApp: this
    }
  },
  props: {
    schema: {
      required: true,
      type: Object,
      default: () => { }
    },
    requestProps: {
      required: true,
      type: Function,
      default: function() {}
    },
    environment: {
      required: true,
      type: String,
      default: () => 'query'
    },
    chunksDataByScene: {
      required: true,
      type: Array,
      default: () => []
    },
    fieldsByScene: {
      required: true,
      type: Array,
      default: () => []
    },
    legoUtils: {
      type: Object,
      default: () => { }
    }

  },
  data() {
    return {
      currentStep: 0, // 当前所在step
      stepsNum: 2, // 总步骤数
      currentStepData: {}, // 当前步骤schema
      currentCanvasCompData: {}, // 玩法json
      formData: {}, // 全局form 字段
      atomicInteraction: {}, // 枚举所有atomic中有display交互的字段, 每次有表单变更去全量执行
      chunkInteraction: {}, // 枚举所有chunk中有display交互的字段, 每次有表单变更去全量执行
      optionsInteraction: {}, // 枚举所有原子中有options交互的字段, 每次有表单变更去全量执行
      optionsDataMap: {}, // 全局options
      atomicDataMap: {}, // 全局原子配置
      filedMap: [], // 字段map
      filedObjectMap: {}, // 字段map
      specialField: [], // 需要特殊处理的字段
      specialOption: [], // 需要特殊处理单选多选框枚举
      request: this.requestProps, // lego 使用
      allStepCheckState: {}, // all step check state
      fields: [], // 全局具有校验规则的原子组件实例
      openEditState: false, // 开启权限编辑
      editableChunkArr: [], // 权限编辑时可编辑的chunk
      utils: { // lego 使用的一些工具函数
        getRelationChunk: () => { },
        findComponentsDownward: findComponentsDownward(this),
        ...this.legoUtils
      },
      configMap: {},
      attrsMap: {}
    }
  },
  computed: {
    formDataClone() {
      return JSON.parse(JSON.stringify(this.formData))
    },
    dataSource() {
      return {
        schema: this.schema,
        chunksDataByScene: this.chunksDataByScene,
        fieldsByScene: this.fieldsByScene
      }
    }
  },

  watch: {
    formDataClone: {
      deep: true,
      immediate: true,
      handler(v, oldValue) {
        if (JSON.stringify(v) === JSON.stringify(oldValue)) return

        this.$emit('change', v)
        // 表单有变动，全量执行原子和chunk交互的的display

        // chunk
        Object.keys(this.chunkInteraction).forEach(k => {
          const item = this.chunkInteraction[k]
          item.visible = item.display.call(this, ...arguments, item.tag)
        })
        // 原子
        Object.keys(this.atomicInteraction).forEach(k => {
          const item = this.atomicInteraction[k]
          item.visible = item.display.call(this, ...arguments)
        })
        // 原子 options
        Object.keys(this.optionsInteraction).forEach(k => {
          const item = this.optionsInteraction[k]
          Promise.resolve(item.options(this.request, ...arguments)).then(res => {
            this.$set(this.optionsDataMap, k, res || [])
          })
        })
      }
    },
    currentStep: {
      async handler(value, oldValue) {
        // 对老步骤进行校验
        if (value !== oldValue) {
          if (!Array.isArray(this.fields[oldValue])) return

          const currentCheckStateArr = this.fields[oldValue].map((item) => item.validate())
          const currentCheckStateArrRel = await Promise.all(currentCheckStateArr)
          const currentCheckState = currentCheckStateArrRel.some(itemStart => itemStart === 'error')
          this.fields[oldValue] = null
          this.allStepCheckState[oldValue] = currentCheckState ? 'error' : 'success'
        }
      }
    },
    dataSource: {
      deep: true,
      immediate: true,
      handler(v) {
        if (!v.schema) return
        if (!v.chunksDataByScene || !Array.isArray(v.chunksDataByScene)) return
        if (!v.fieldsByScene || !Array.isArray(v.fieldsByScene)) return
        this.dataInit()
      }
    }
  },
  mounted() {
    this.utils.findComponentsDownward = findComponentsDownward(this)
  },
  methods: {
    /**
     * 处理进度条点击事件
     * @param {number} nValue
     */
    async handleClick(nValue) {
      // 处理当前步骤以前的步骤
      for (let i = 0; i < nValue; i++) {
        if (this.allStepCheckState[i] !== 'success') {
          this.allStepCheckState[i] = 'error'
        }
      }

      if (this.currentStep > nValue) {
        // 仍需触发当前校验
        setTimeout(() => {
          //  previous
          this.fields[this.currentStep].forEach((item) => item.validate())
        })
      } else {
        this.allStepCheckState[nValue] = 'process'
      }

      // 处理当前步骤以后的步骤
      for (let i = nValue + 1; i <= this.stepsNum; i++) {
        this.allStepCheckState[i] = 'wait'
      }

      this.currentStep = nValue
    },

    /**
     * 数据初始化
     */
    async dataInit() {
      // 拼装all数据
      const schema = this.schema
      setCurrentScenesAllChunk(this.chunksDataByScene)
      setFilds(schema) // 拼装所有chunk
      this.filedMap = this.fieldsByScene
      this.filedMap.reduce((obj, item) => { return ((obj[item.uniqueName] = item), obj) }, this.filedObjectMap)
      this.currentCanvasCompData = schema // set 玩法schema
      this.utils.getRelationChunk = getRelationChunk(schema)
      this.stepsNum = schema.children.length - 1 // set 总步数

      if (schema.children) {
        this.currentStepData = schema.children[0] // set 当前步骤schema
      }

      this.initAllStepCheckState(schema.children.length)
    },

    /**
     * 初始化每一步的校验状态
     * @param {number} length
     */
    initAllStepCheckState(length) {
      for (let i = 0; i < length; i++) {
        if (i === 0) {
          this.$set(this.allStepCheckState, i, 'process')
        } else {
          this.$set(this.allStepCheckState, i, 'wait')
        }
      }
    },

    /**
     * 获取sceneType
     */
    getSceneType() {
      return this.$route.query['sceneType'] || ''
    },

    getSceneId() {
      return this.$route.query['sceneId'] || ''
    },

    /**
     * next step
     */
    async nextStep() {
      if (this.stepsNum > this.currentStep) {
        // 处理step校验状态 current
        if (this.currentStep !== this.stepsNum) {
          const currentCheckStateArr = this.fields[this.currentStep].map((item) => item.validate())
          const currentCheckStateArrRel = await Promise.all(currentCheckStateArr)
          const currentCheckState = currentCheckStateArrRel.some(itemStart => itemStart === 'error')
          this.fields[this.currentStep] = null
          this.allStepCheckState[this.currentStep] = currentCheckState ? 'error' : 'success'
        }

        this.currentStep = this.currentStep + 1
        this.allStepCheckState[this.currentStep] = 'process'
        setTimeout(() => {
          // next
          if (this.currentStep !== this.stepsNum && this.allStepCheckState[this.currentStep] !== 'process') {
            this.fields[this.currentStep].forEach((item) => item.validate())
          }
        })
      }
    },

    /**
     * previous step
     */
    async previousStep() {
      if (this.currentStep > 0) {
        // 处理step校验状态 current
        if (this.currentStep !== this.stepsNum) {
          const currentCheckStateArr = this.fields[this.currentStep].map((item) => item.validate())
          const currentCheckStateArrRel = await Promise.all(currentCheckStateArr)
          const currentCheckState = currentCheckStateArrRel.some(itemStart => itemStart === 'error')
          this.fields[this.currentStep] = null
          this.allStepCheckState[this.currentStep] = currentCheckState ? 'error' : 'success'
        }
        this.allStepCheckState[this.currentStep] = 'wait'
        this.currentStep = this.currentStep - 1
        setTimeout(() => {
          //  previous
          if (this.currentStep !== this.stepsNum && this.allStepCheckState[this.currentStep] !== 'process') {
            this.fields[this.currentStep].forEach((item) => item.validate())
          }
        })
      }
    }
  },

  render(h) {
    if (!this.schema || (!this.chunksDataByScene || !Array.isArray(this.chunksDataByScene)) || (!this.fieldsByScene || !Array.isArray(this.fieldsByScene))) return

    return Object.keys(this.currentCanvasCompData).length !== 0 && (
      <div class='sp-form'>
        <RenderStep status={this.allStepCheckState} class='sp-form-step' schema={this.currentCanvasCompData} value={this.currentStep}
          onClick={this.handleClick}
        />
        <el-form class='lego-sp-form-form' {...{ props: { model: this.formData, labelWidth: '150px' }}}>
          <RenderBlock platform='sp' currentStep={this.currentStep} schema={this.currentCanvasCompData.children[this.currentStep]} />
        </el-form>
        <div class='lego-sp-form-btns' />
      </div>
    )
  }

}

