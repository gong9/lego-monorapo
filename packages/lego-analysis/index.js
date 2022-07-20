import LegoAnalysis from './src/index.jsx'

LegoAnalysis.install = function(Vue) {
  Vue.component(LegoAnalysis.name, LegoAnalysis)
}

export default LegoAnalysis
