import Vue from 'vue'
import RenderBlock from '../renderBlock/index.jsx'
import './index.scss'

/**
 * @file 渲染task
 * todo 一期不做实现，待优化样式
 */

export default {
  inject: {
    spAnalysisApp: { default: {}}
  },
  props: {
    schema: {
      type: Object,
      default: () => {}
    },
    platform: {
      type: String,
      default: () => 'hubble'
    }
  },
  created() {
    // 设置主task
    !this.spAnalysisApp.formData.taskList && Vue.set(this.spAnalysisApp.formData, 'taskList', [])

    // 设置多任务
    this.schema.children.forEach((child, i) => {
      !this.spAnalysisApp.formData.taskList[i] && Vue.set(this.spAnalysisApp.formData.taskList, i, {
        taskId: i + 1
      })
    })
  },
  methods: {
    /**
     * 渲染tasks
     * @param {object} schema
     */
    renderTabPane(schema) {
      const { children } = schema
      return children.map((child, i) => {
        const { label } = child
        child.hideLabel = true
        return (
          <el-tab-pane class='tabs' label={label}>
            <RenderBlock platform={this.platform} schema={child} parentField={i}/>
          </el-tab-pane>
        )
      })
    }
  },

  render(h) {
    return (
      <div class='tasks'>
        <el-tabs type='card' onTabRemove={this.removeTab} >
          {
            this.renderTabPane(this.schema)
          }
        </el-tabs>
      </div>
    )
  }
}

