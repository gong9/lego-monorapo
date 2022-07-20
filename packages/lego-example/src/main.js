import Vue from 'vue'
import ElementUI from 'element-ui'
import leopardWebComponent from 'leopard-web-component'
import LegoComponents from 'lego-components'
import LegoEditor from 'lego-editor'
import 'element-ui/lib/theme-chalk/index.css'
import 'leopard-web-component/lib/leopard-web-component.css'
import 'lego-analysis/lib/index.css'

// import App from './App.jsx'
import LegoEditorExample from './example/legoEditor'

Vue.use(ElementUI)
Vue.use(leopardWebComponent)
Vue.use(LegoComponents)
Vue.use(LegoEditor)

new Vue({
  el: '#app',
  render: (h) => h(LegoEditorExample)
})
