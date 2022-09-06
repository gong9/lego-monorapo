import * as monaco from 'monaco-editor'
import './index.scss'
export default {
  props: {
    // 编辑器主题
    theme: {
      type: String,
      default: () => 'vs-dark'
    },
    // 右侧不显示编辑器预览框
    roundedSelection: {
      type: Boolean,
      default: () => true
    },
    // 自动缩进
    autoIndent: {
      type: Boolean,
      default: () => true
    },
    // 是否只读
    readOnly: {
      type: Boolean,
      default: () => false
    },
    language: {
      type: String,
      default: () => 'javascript'
    }
  },
  data() {
    return {
      // 主要配置
      defaultOpts: {
        // 编辑器的值
        value: ''
      },
      // 编辑器对象
      monacoEditor: {}
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      // 初始化container的内容，销毁之前生成的编辑器
      this.$refs.container.innerHTML = ''
      const currentDefaultOpts = {
        ...this.defaultOpts,
        theme: this.theme,
        roundedSelection: this.roundedSelection,
        autoIndent: this.autoIndent,
        readOnly: this.readOnly,
        language: this.language
      }
      // 生成编辑器配置
      const editorOptions = Object.assign(currentDefaultOpts, this.opts)
      // 生成编辑器对象
      this.monacoEditor = monaco.editor.create(this.$refs.container, editorOptions)
      // 编辑器内容发生改变时触发
      this.monacoEditor.onDidChangeModelContent(() => {
        this.$emit('change', this.monacoEditor.getValue())
      })
    },
    // 手动编辑器中的内容
    getValue() {
      this.$message.info(this.$refs.monaco.getVal())
    }
  },
  render(h) {
    return (
      <div ref='container' class='monaco-editor'></div>
    )
  }
}
