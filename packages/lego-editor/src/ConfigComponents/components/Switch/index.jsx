
import { dispatch } from '../../../util'

export default {
  props: {
    schema: {
      type: Object,
      default: () => {}
    },
    value: {
      type: [Object, String, Boolean, Array]
    }

  },
  render(h) {
    return (
      <el-switch
        onChange={(value) => { dispatch(this, 'LegoConfigComponent', 'change', value) }}
        value={this.value}
        active-color='#13ce66'
        inactive-color='#ff4949'>
      </el-switch>
    )
  }
}

