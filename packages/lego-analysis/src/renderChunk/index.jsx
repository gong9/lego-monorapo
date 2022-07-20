import Vue from 'vue'
import ValidatorComp from '../renderAtom/index.jsx'
import './index.scss'

export default {
  inject: {
    spAnalysisApp: { default: {}}
  },
  props: ['schema', 'index', 'platform', 'ruleLayer', 'fileTag', 'ruleItemTag'],
  data() {
    return {
      state: {},
      update: {
        index: 1
      }
    }
  },
  computed: {
    chunk_id() {
      return `${this.schema.parentId}${this.schema.nodeCompId}${this.schema.name}${this.fileTag}${this.ruleLayer}`
    }
  },
  created() {
    this.initchunkInteraction(this.spAnalysisApp, this.chunk_id, this.fileTag, this.ruleLayer)

    if ((this.chunk_id in this.spAnalysisApp.chunkInteraction)) {
      this.updateTaskAndRuleLayer(this.spAnalysisApp, this.chunk_id, this.fileTag, this.ruleLayer)
    }
  },
  methods: {
    /**
     * 初始化chunk联动
     * @param {object} spAnalysisApp 根组件
     * @param {string} chunk_id chunk唯一标识
     * @param {string} fileTag 当前任务数
     * @param {string} ruleLayer 层级数
     */
    initchunkInteraction(spAnalysisApp, chunk_id, fileTag, ruleLayer) {
      if (!(chunk_id in spAnalysisApp.chunkInteraction)) {
        const interaction = eval(this.schema.options.interaction || (() => { })).call(spAnalysisApp) || {}
        typeof interaction.display === 'function' && (Vue.set(spAnalysisApp.chunkInteraction, chunk_id, {
          visible: interaction.display.call(spAnalysisApp, spAnalysisApp.formData),
          display: interaction.display,
          tag: {
            taskNum: fileTag ? Number(fileTag) : fileTag,
            ruleLayer: ruleLayer ? Number(ruleLayer) : ruleLayer
          }
        }))
      }
    },

    /**
     * 更新当前chunk的所属任务数&层级数
     * @param {object} spAnalysisApp
     * @param {string} fileTag
     * @param {string} ruleLayer
     */
    updateTaskAndRuleLayer(spAnalysisApp, chunk_id, fileTag, ruleLayer) {
      if (spAnalysisApp.chunkInteraction[chunk_id].tag.taskNum !== fileTag ? Number(fileTag) : fileTag) {
        spAnalysisApp.chunkInteraction[chunk_id].tag.taskNum = fileTag ? Number(fileTag) : fileTag
      }

      if (spAnalysisApp.chunkInteraction[chunk_id].tag.ruleLayer !== ruleLayer ? Number(ruleLayer) : ruleLayer) {
        spAnalysisApp.chunkInteraction[chunk_id].tag.ruleLayer = ruleLayer ? Number(ruleLayer) : ruleLayer
      }
    },

    /**
     * 开始渲染
     * @param {object} schema
     * @returns
     */
    startRender(schema) {
      const { fields, parentId, nodeCompId, replaceSuffix } = schema
      return fields && (
        <section class='lego-form-content'>
          {this.renderChunkChildren(fields, parentId + nodeCompId, replaceSuffix)}
          {schema.options.description ? <p class='desc'>{schema.options.description || ''}</p> : ''}
        </section>
      )
    },

    /**
     * 渲染chunk孩子
     * @param {array} fields
     * @param {string} chunkUnique
     * @param {object} replaceSuffix
     * @returns
     */
    renderChunkChildren(fields, chunkUnique, replaceSuffix) {
      return fields.map((field, index) =>
        this.renderAtomicComponent(field, index, chunkUnique, replaceSuffix)
      )
    },

    /**
     * 渲染具体原子
     * @param {object} field
     * @param {number} index
     * @param {string} chunkUnique
     * @param {object} replaceSuffix
     * @returns
     */
    renderAtomicComponent(field, index, chunkUnique, replaceSuffix) {
      const { component, options, field: fieldId } = field
      const { uniqueName } = this.spAnalysisApp.filedMap.filter(item => item.id === Number(fieldId))[0]
      let configValue = {}
      let newSuffix = ''

      if (this.schema.operations && this.schema.operations[uniqueName]) {
        configValue = this.schema.operations[uniqueName]
        Vue.set(this.spAnalysisApp.configMap, uniqueName, configValue)
      }

      if (replaceSuffix && replaceSuffix.target === uniqueName) {
        newSuffix = replaceSuffix.newSuffix
      }

      let currentTaskNum = null // 如在任务中，属于第几个任务
      if (this.schema.parentField === 0 || this.schema.parentField) {
        currentTaskNum = String(this.schema.parentField)
      } else {
        currentTaskNum = false
      }

      return <ValidatorComp ruleItemTag={this.ruleItemTag} newSuffix={newSuffix} chunkUnique={chunkUnique} onRequired={({ chunkUnique: chunkUniqueVal, isRequired }) => { Vue.set(this.state, chunkUniqueVal, isRequired); this.update.index = this.update.index + 1 }} index={index} ruleLayer={this.ruleLayer} fileTag={this.ruleLayer ? this.fileTag : currentTaskNum} platform={this.platform} fileName={uniqueName} key={fieldId} component={component} options={options} schema={field} configValue={configValue} />
    }
  },
  render(h) {
    const flag = this.spAnalysisApp.chunkInteraction?.[this.chunk_id]?.visible
    if (!(typeof flag === 'boolean' ? flag : true)) return (<div></div>)
    const { label, parentId, nodeCompId, name } = this.schema
    return (
      <div class='lego-form-item'>
        {this.spAnalysisApp.openEditState && !this.spAnalysisApp.editableChunkArr.includes(name) && <div class='cover' />}
        {/* 下边标签勿动 */}
        <div id='lego-form-seize' class={this.update.index} />
        <el-form-item class={this.state && this.state[parentId + nodeCompId] ? 'chunk1' : 'chunk2'} label={label} id={this.index}>
          {this.startRender(this.schema)}
        </el-form-item >
      </div>
    )
  }
}
