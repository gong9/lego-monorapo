import draggable from 'vuedraggable'
import BaseAnalysis from '../BaseAnalysis/index.jsx'
import eventBus from '../util/eventBus'
import './center.scss'
let flagIndex = 0

export default {
  name: 'NestedDraggable',
  components: {
    draggable,
    BaseAnalysis
  },
  props: {
    tasks: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      isSelected: false
    }
  },
  methods: {
    renderChunk(schema, index, list) {
      const { label } = schema
      return (
        <el-form-item label={label} class='chunk-node' >
          <el-row gutter={20}>
            <el-col span={19} class='cover'>
              <div class='cover-box' />
              <BaseAnalysis schema={schema} />
            </el-col>
            <el-col span={1}>
              <span class='el-icon-delete' onClick={() => this.handleDelete(list, index)}></span>
            </el-col>
          </el-row>
        </el-form-item>
      )
    },

    renderContainer(containerNode, index, list) {
      const { type, children } = containerNode

      switch (type) {
        default:
          return (
            <div class={
              {
                'container-node-outside': true
              }
            }>
              <el-row gutter={20}>
                <el-col span={19} class='cover'>
                  <nestedDraggable tag='div' tasks={children} />
                </el-col>
                <el-col span={1}>
                  <span class='el-icon-delete' onClick={() => this.handleDelete(list, index)}></span>
                </el-col>
              </el-row>

            </div>
          )
      }
    },

    handleClickNode(data) {
      eventBus.emit('setConfig', data)
    },

    handleDelete(list, index) {
      list.splice(index, 1)
    }
  },
  render(h) {
    return (
      <draggable
        tag='div'
        class='container-node'
        list={this.tasks}
        group={{ put: true }}
        scrollSensitivity='10px'
      >
        {this.tasks.map((task, index) => {
          return (
            <div key={++flagIndex} onClick={(e) => { e.stopPropagation(); this.handleClickNode(task) }}>
              {task.children ? (
                this.renderContainer(task, index, this.tasks)
              ) : (
                this.renderChunk(task, index, this.tasks)
              )}
            </div>
          )
        })}
      </draggable>
    )
  }
}
