import LegoEditor from './src/index.jsx'

LegoEditor.install = function(Vue) {
  Vue.component(LegoEditor.name, LegoEditor)
}

export default LegoEditor
