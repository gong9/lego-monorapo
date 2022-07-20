/* eslint-disable no-undef */
import * as monaco from 'monaco-editor'
import 'monaco-editor/esm/vs/editor/contrib/find/findController'
// import prettier from '@/assets/prettier.mjs'
// import parserBabel from '@/assets/parserBabel.mjs'
import { rules } from './rule'

import 'monaco-editor/esm/vs/basic-languages/css/css.contribution'
import 'monaco-editor/esm/vs/basic-languages/xml/xml.contribution'
import 'monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution'
import './index.scss'

export default {
  name: 'MonacoEditor',
  props: {
    language: {
      type: String,
      default: 'javascript'
    },
    value: {
      type: String,
      default: () => ''
    },
    editorHight: {
      type: String,
      default: () => '200px'
    },
    editorWidth: {
      type: String,
      default: () => '100%'
    },
    disabled: {
      type: Boolean,
      default: () => false
    },
    openDiff: {
      type: Boolean,
      default: () => false
    }
  },
  data() {
    return {
      monacoEditor: null,
      valueClone: '',
      setValueFlag: false, // 本身value改变时为false
      oldValue: null,
      diffFlag: false,
      layoutWidth: null,
      layoutHeight: null,
      model: null
    }
  },
  watch: {
    value: {
      deep: true,
      immediate: true,
      handler(val) {
        if (val && !this.oldValue) {
          this.oldValue = this.value
        }
        this.valueClone = val
        this.monacoEditor && this.monacoEditor.setValue(this.valueClone)
      }
    }
  },
  mounted() {
    this.monacoEditor = this.initMonacoEditor()
    const model = this.createModel(this.monacoEditor)
    this.model = model
    this.monacoEditor.setModel(model)
    this.addEditorDataListener(this.monacoEditor)

    // let timer = null
    // model.onDidChangeContent(() => {
    //   if (timer) clearTimeout(timer)
    //   timer = setTimeout(() => {
    //     // this.verify(model)
    //   }, 500)
    // })

    this.initEvents(this.$refs.jsEditor)
  },
  destroyed() {
    this.$refs.jsEditor?.removeEventListener('keydown', this.format)
    this.monacoEditor.dispose()
  },
  methods: {
    /**
     * 初始化编辑器实例
     * @return 编辑器实例
     */
    initMonacoEditor() {
      const editor = monaco.editor.create(this.$refs.jsEditor, {
        language: this.language,
        theme: 'vs',
        minimap: {
          enabled: false
        },
        value: this.valueClone,
        lineNumbers: 'off'
      })
      return editor
    },

    /**
     * 创建编辑器模型
     */
    createModel() {
      return monaco.editor.createModel(
        this.valueClone,
        this.language
      )
    },

    /**
     * 初始化事件
     */
    initEvents(node) {
      // node && node.addEventListener('keydown', this.format)
    },

    /**
     * 输入时拿到当前编辑器内容
     * @param {object} editor
     */
    addEditorDataListener(editor) {
      editor.onDidBlurEditorText(
        () => {
          this.valueClone = editor.getValue()
          this.$emit('input', this.valueClone)
          this.$emit('change', this.valueClone)
        }
      )
    },

    /**
     * 执行eslint校验
     * @param {object} model 编辑器模型
     */
    verify(model) {
      const value = model.getValue()
      const errs = linter.esLinter.verify(value, {
        rules,
        parserOptions: {
          ecmaVersion: 'latest',
          sourceType: 'module',
          ecmaFeatures: {
            jsx: true
          }
        },
        env: {
          browser: true
        }
      })

      const ruleDefines = linter.esLinter.getRules()
      const markers = errs.map(err => ({
        code: {
          value: err.ruleId,
          target: ruleDefines.get(err.ruleId)?.meta.docs.url
        },
        startLineNumber: err.line,
        endLineNumber: err.endLine,
        startColumn: err.column,
        endColumn: err.endColumn,
        message: err.message,
        source: 'eslint'
      }))

      // 标记 eslint markers
      monaco.editor.setModelMarkers(model, 'eslint', markers)
    },

    /**
     * 退出全屏
     */
    exitFullScreen() {
      const el = document
      const cfs = el.cancelFullScreen || el.webkitCancelFullScreen ||
          el.mozCancelFullScreen || el.exitFullScreen
      if (typeof cfs !== 'undefined' && cfs) {
        cfs.call(el)
      } else if (typeof window.ActiveXObject !== 'undefined') {
        // for IE，这里和fullScreen相同，模拟按下F11键退出全屏
        const wscript = new ActiveXObject('WScript.Shell')
        if (wscript != null) {
          wscript.SendKeys('{F11}')
        }
      }
    },

    /**
     * 是否全屏
     */
    isFullScreen() {
      return document.fullscreenElement !== null
    },

    /**
     * 设置全屏
     */
    fullScreen() {
      if (this.isFullScreen()) {
        this.monacoEditor.layout({
          width: this.layoutWidth,
          height: this.layoutHeight
        })
        this.exitFullScreen()
        return
      }

      this.layoutWidth = this.monacoEditor.getLayoutInfo().width
      this.layoutHeight = this.monacoEditor.getLayoutInfo().height

      const elem = this.$refs.jsEditor

      const requestMethod = elem.requestFullScreen || elem.webkitRequestFullScreen || elem.mozRequestFullScreen || elem.msRequestFullScreen

      if (requestMethod) {
        this.monacoEditor.layout({
          width: window.screen.width,
          height: window.screen.height
        })
        requestMethod.call(elem)
      } else if (typeof window.ActiveXObject !== 'undefined') {
        const wscript = new ActiveXObject('WScript.Shell')

        if (wscript !== null) {
          wscript.SendKeys('{F11}')
        }
      }
    },

    /**
     * 格式化
     */
    format(e) {
      if ((e.ctrlKey || e.metaKey) && e.keyCode === 83) {
        e.preventDefault()
        const code = prettier.format(`${this.model.getValue()}`, {
          parser: 'babel',
          plugins: [parserBabel]
        })
        this.monacoEditor.setValue(code)
      }
    }

  },

  render(h) {
    return (
      <div class='editor-con' style={{ height: this.editorHight, width: this.editorWidth }}>
        <div style={{ width: this.editorWidth, height: '100%', position: 'relative', visibility: !this.diffFlag ? 'visible' : 'hidden' }} ref='jsEditor' class='editor'>
          <span class='el-icon-full-screen full-screen' onClick={this.fullScreen.bind(this)}></span>
          {
            this.$props.disabled ? (
              <input style={{
                outline: 'none',
                position: 'absolute',
                width: 'inherit',
                height: 'inherit',
                zIndex: 99,
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                cursor: 'not-allowed'
              }} disabled />
            ) : null
          }
        </div>

      </div >
    )
  }
}
