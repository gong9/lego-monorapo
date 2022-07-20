import center from './Editor/center.jsx'
import top from './Editor/top.jsx'
import left from './Editor/left.jsx'
import right from './Editor/right.jsx'

import { containerData } from './configData'
import { filterUselessData, inverseParse, addConfigOnlyChunk } from './util'

import './index.scss'

export default {
  name: 'LegoEditor',
  components: {
    center,
    left,
    right,
    top
  },
  provide() {
    return {
      baseChunk: this.baseChunk
    }
  },
  props: {
    baseChunk: {
      type: Array,
      default: () => []
    },
    layoutJsx: {
      type: Object,
      default: () => {}
    },
    value: {
      type: String,
      default: () => '{}'
    }
  },
  data() {
    return {
      list: [],
      allComponents: {}
    }
  },
  computed: {
    jsonSchema() {
      return JSON.stringify(filterUselessData(this.list), null, 2)
    }
  },
  watch: {
    list: {
      deep: true,
      immediate: true,
      handler() {
        this.$emit('input', JSON.stringify(filterUselessData(this.list), null, 2))
      }
    }
  },
  created() {
    this.componentName = 'LegoEditor'
    this.init()
  },
  methods: {
    init() {
      this.allComponents = {
        container: containerData,
        baseChunk: addConfigOnlyChunk(this.baseChunk)
      }
      this.list = this.value === '{}' ? [] : [inverseParse(JSON.parse(this.value))]
    }
  },
  render(h) {
    return (
      <div class='editor'>
        <top schema={this.list} layoutJsx={this.layoutJsx} jsonSchema={this.jsonSchema}/>
        <div class='editor-main'>
          <div class='left'>
            <left data={this.allComponents} />
          </div>
          <div class='center'>
            <el-form label-width='160px'>
              <center tasks={this.list} />
            </el-form>
          </div>
          <div class='right'>
            <right />
          </div>
        </div>
      </div>
    )
  }
}
