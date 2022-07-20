
import { dispatch } from '../../../util'

export default {
  inject: {
    baseChunk: { default: [] }
  },
  props: {
    schema: {
      type: Object,
      default: () => {}
    },
    value: {
      type: [Object, String, Boolean, Array]
    }

  },
  methods: {
    renderOptions(schema) {
      const { componentOption } = schema
      if (componentOption === 'all-chunk-data') {
        return this.baseChunk.map(option => {
          const { label, name } = option
          return <el-option key={name} label={label} value={name}/>
        })
      } else if (Array.isArray(componentOption)) {
        return componentOption.map(option => {
          const { label, value } = option
          return <el-option key={value} label={label} value={value}/>
        })
      }
    }
  },
  render(h) {
    return (
      <el-select value={this.value} placeholder='请选择' onChange={(value) => { dispatch(this, 'LegoConfigComponent', 'change', value) }}>
        {this.renderOptions(this.schema)}
      </el-select>
    )
  }
}

