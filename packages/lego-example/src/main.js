import Vue from 'vue'
import ElementUI from 'element-ui'
import LegoEditor from 'lego-editor'
import 'element-ui/lib/theme-chalk/index.css'
import JsEditor from './example/jsEditor.jsx'

// import App from './App.jsx'
// import LegoEditorExample from './example/legoEditor'

Vue.use(ElementUI)
Vue.use(LegoEditor)

new Vue({
  el: '#app',
  render: (h) => h(JsEditor)
})
