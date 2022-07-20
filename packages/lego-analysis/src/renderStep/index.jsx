/**
 * @file 渲染step
 */
import './index.scss'
export default {
  props: {
    value: {
      type: Number,
      default: () => 1
    },
    schema: {
      type: Object,
      default: () => {}
    },
    status: {
      default: () => 'error'
    }
  },

  mounted() {
    if (!this.schema.children.length) {
      return
    }
    this.nodes = document.querySelectorAll('.lego-step')
    const count = this.nodes?.length

    if (count !== this.schema.children.length) {
      return
    }

    this.handlers = []

    for (let i = 0; i < count; i++) {
      this.handlers.push(() => {
        this.$emit('click', i)
      })

      this.nodes[i].addEventListener('click', this.handlers[i])
    }
  },

  beforeDestroy() {
    const count = this.nodes?.length
    for (let i = 0; i < count; i++) {
      this.nodes[i].removeEventListener('click', this.handlers[i])
    }
  },

  methods: {
    /**
     * 开始渲染
     * @param {object} schema
     * @param {string} type
     */
    renderStepsStart(schema, type) {
      const { children } = schema

      if (type === 'title') {
        return children && children.map((child, index) => {
          return this.renderStepsItem(child, index)
        })
      }
      return null
    },

    /**
     * 渲染具体步骤标题
     * @param {object} childSchema
     */
    renderStepsItem(childSchema, index) {
      const { label } = childSchema
      childSchema.hideLabel = true
      return <el-step ref={`${index}`} status={this.status[index]} title={label} class='lego-step'></el-step>
    }
  },

  render(h) {
    return (
      <el-steps active={this.value} align-center >
        {this.renderStepsStart(this.schema, 'title')}
      </el-steps>
    )
  }
}

