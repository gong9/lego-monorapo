import LegoConfigComponent from '../ConfigComponents/index.jsx'
import eventBus from '../util/eventBus'
import './right.scss'

export default {
  data() {
    return {
      currentSchema: {},
      formData: {
        options: {},
        defaultOptions: {}
      },
      activeName: 'component-config'
    }
  },
  watch: {
    currentSchema: {
      deep: true,
      immediate: true,
      handler(value) {
        console.log(JSON.stringify(value))
      }
    }
  },
  created() {
    eventBus.on('setConfig', (schema) => {
      this.currentSchema = schema
    })
  },
  methods: {
    /**
     * config渲染
     * @param {object} schema
     * @returns
     */
    renderConfig(schema) {
      const { config = {}, currentConfigValue = {}} = schema
      return (
        <el-form label-width='110px' size='mini'>
          {Object.keys(config).map(
            configItemKey => {
              const { label } = config[configItemKey]
              return (
                <el-form-item label={label}>
                  { this.renderConfigFormItem(configItemKey, config[configItemKey], currentConfigValue[configItemKey])}
                </el-form-item>
              )
            }
          )}
        </el-form>
      )
    },

    /**
     * config item 渲染
     * @param {string} configItemKey
     * @param {object} value
     * @param {any} defineValue
     * @returns
     */
    renderConfigFormItem(configItemKey, value, defineValue) {
      const { isBelongOption } = value
      return <LegoConfigComponent schema={value} defineValue={defineValue} value={this.formData[isBelongOption ? 'options' : 'defaultOptions'][configItemKey]} onChange={(value) => { this.handleConfigItemChange(value, configItemKey, isBelongOption) }}></LegoConfigComponent>
    },

    /**
     * 处理configItem change事件
     * @param {any} value
     * @param {string} configItemKey
     * @param {boolean} isBelongOption
     */
    handleConfigItemChange(value, configItemKey, isBelongOption) {
      this.$set(this.formData[isBelongOption ? 'options' : 'defaultOptions'], configItemKey, value)
      this.setChunkConfigData(this.currentSchema, isBelongOption, configItemKey, value)
    },

    /**
     * 组件属性值放置
     * @param {object} currentSchema 当前组件
     * @param {boolean} isBelongOption 放置位置
     * @param {string} currentKey 放置key
     * @param {any} currentValue 放置值
     */
    setChunkConfigData(currentSchema, isBelongOption, currentKey, currentValue) {
      currentSchema['options'] = currentSchema['options'] ?? {}
      if (!isBelongOption) {
        this.$set(currentSchema, currentKey, currentValue)
      } else {
        this.$set(currentSchema['options'], currentKey, currentValue)
      }
    }

  },
  render(h) {
    return (
      <div class='right-config'>
        <el-card>
          {
            Object.keys(this.currentSchema).length > 0
              ? (
                <el-tabs vModel={this.activeName} >
                  <el-tab-pane label='组件属性' name='component-config'>
                    {
                      this.renderConfig(this.currentSchema)
                    }
                  </el-tab-pane>
                  <el-tab-pane label='表单属性' name='form-config'>
                                        表单属性
                  </el-tab-pane>
                </el-tabs>
              )
              : (<div>暂无配置项</div>)
          }

        </el-card>
      </div>
    )
  }
}
