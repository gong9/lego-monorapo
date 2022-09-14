import Vue from 'vue'
import ElementUI from 'element-ui'
import LegoEditor from 'lego-editor'
import 'element-ui/lib/theme-chalk/index.css'
import demo from 'js-editor-vue'
// import App from './App.jsx'

// import LegoEditorExample from './example/legoEditor'
console.log(demo.Test)
Vue.use(ElementUI)
Vue.use(LegoEditor)

new Vue({
  el: '#app',
  render: (h) => h(demo.Test)
})

