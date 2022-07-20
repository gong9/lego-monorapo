
import legoSelect from './components/Select/index.jsx'
import legoSwitch from './components/Switch/index.jsx'
import legoInput from './components/Input/index.jsx'
import legoJsEditor from './components/Input/index.jsx'
import legoInputNumber from './components/Input/index.jsx'
export default {
  components: {
    'lego-select': legoSelect,
    'lego-input': legoInput,
    'lego-switch': legoSwitch,
    'lego-jsEditor': legoJsEditor,
    'lego-input-number': legoInputNumber
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
  created() {
    this.componentName = 'LegoConfigComponent'
  },
  methods: {
    renderConfigComponent(schema, value) {
      const { component } = schema
      return <component schema={schema} value={value}/>
    }
  },
  render(h) {
    return this.renderConfigComponent(this.schema, this.value)
  }
}
