import * as monaco from 'monaco-editor'
import './index.scss'

export default {
  name: 'js-editor',
  props: {},
  data() {
    return {
      defaultOpts: {
        value: '',
        theme: 'vs',
        roundedSelection: true,
        autoIndent: true,
        language: 'json'
      },
      monacoEditor: {}
    }
  },
  mounted() {
    this.initEditor()
    console.log(monaco.languages.getLanguages())
  },
  methods: {
    /**
     * 初始化编辑器
     */
    initEditor() {
      this.monacoEditor = monaco.editor.create(this.$refs.container, this.defaultOpts)
    }
  },
  render(h) {
    return (
      <div style={{ width: '400px', height: '400px' }} ref='container' class='js-editor'></div>
    )
  }
}
