import LegoEditor from './src/index.jsx'

LegoEditor.install = function(Vue) {
  Vue.component(LegoEditor.name, LegoEditor)
}
console.log(111)
export default LegoEditor
