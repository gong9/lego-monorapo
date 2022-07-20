
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
    return <el-input onInput={(value) => dispatch(this, 'LegoConfigComponent', 'change', value)} value={this.value}></el-input>
  }
}

