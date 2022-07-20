import { chunksData, filesData, schema } from './mock/legoAnalysis'
import './App.scss'

/**
 * 入参：
 * - 玩法schema
 * - 字段
 * - 组件
 */

export default {
  data() {
    return {
      chunksData,
      filesData,
      schema

    }
  },
  computed: {
    chunksDataByScene() {
      return this.chunksData.map(item => JSON.parse(item.componentConfig))
    }
  },
  methods: {
    handleChange(val) {
      console.log(val)
    }
  },
  render(h) {
    return (
      <div class='main'>
        <SpAnalysis
          schema={this.schema}
          chunksDataByScene={this.chunksDataByScene}
          fieldsByScene={this.filesData}
          environment='add'
          requestProps={() => { }}
          legoUtils={{}}
          onChange={this.handleChange}
        />
      </div>

    )
  }
}
