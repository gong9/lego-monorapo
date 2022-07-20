import { chunksData } from '../mock/legoAnalysis'
export default {
  data() {
    return {
      chunksData,
      layoutInfo: {},
      formData: { },
      demo: {}
    }
  },
  computed: {
    chunksDataByScene() {
      return this.chunksData.map(item => JSON.parse(item.componentConfig))
    }

  },
  methods: {
    /**
     * 布局发布
     */
    handlePublish() {
      alert('发布')
    }
  },
  render(h) {
    return (
      <div class='lego-editor'>
        <LegoEditor
          layoutJsx={(
            <el-form ref='form' label-width='80px'>
              <el-form-item label='布局名称'>
                <el-input vModel={this.formData.layoutName}></el-input>
              </el-form-item>
              <el-form-item label='所属场景'>
                <el-input vModel={this.formData.sceneId}></el-input>
              </el-form-item>
              <el-form-item label='布局描述'>
                <el-input vModel={this.formData.layoutDescription}></el-input>
              </el-form-item>
              <el-form-item label='版本说明'>
                <el-input vModel={this.formData.versionDesc}></el-input>
              </el-form-item>
            </el-form>
          )}
          baseChunk={this.chunksDataByScene}
          onPublish={this.handlePublish}
          value={JSON.stringify(this.demo)}
          onInput={(value) => {
            console.log(value)
          }}
        />
      </div>
    )
  }
}
