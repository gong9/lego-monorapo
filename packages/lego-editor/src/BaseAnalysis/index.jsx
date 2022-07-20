import legoSelect from './legoSelect.jsx'
import legoRadio from './legoRadio.jsx'
import legoCheckbox from './legoCheckbox.jsx'

import './style.scss'

import { handleInjectPorpsAndEvents } from '../util'
export default {
  props: {
    schema: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    renderAtom(schema) {
      const { fields } = schema
      const needRenderSchema = fields[0] || {}
      const { component, options } = needRenderSchema
      switch (component) {
        case 'el-input':
          return handleInjectPorpsAndEvents(<el-input/>, options)
        case 'el-textarea':
          return handleInjectPorpsAndEvents(<el-input type='textarea'/>, options)
        case 'el-checkbox-group':
          return <legoCheckbox />
        case 'el-radio-group':
        case 'BLMRadioGroup' :
          return <legoRadio />
        case 'el-select':
        case 'BLMBatchCitySelect':
        case 'BLMSelectAndNestedList':
        case 'BLMSelectAndSearch':
          return <legoSelect component={component} options={options}/>
        case 'el-time-select':
          return handleInjectPorpsAndEvents(<el-time-select/>, options)
        case 'el-date-picker':
          return handleInjectPorpsAndEvents(<el-date-picker/>, options)
        case 'el-date-range':
          return handleInjectPorpsAndEvents(<el-date-picker/>, options)
        case 'BLMTimePickerListLimit':
          return <legoRadio schema={schema} />
        case 'el-input-number':
          return handleInjectPorpsAndEvents(<el-input-number/>, options)
      }
    }
  },
  render(h) {
    return (
      <div class='chunk-node-atom'>
        {this.renderAtom(this.schema)}
      </div>
    )
  }
}
