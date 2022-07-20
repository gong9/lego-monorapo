import LegoSelectAndSearch from './src/index.vue'

LegoSelectAndSearch.install = function(Vue) {
  Vue.component(LegoSelectAndSearch.name, LegoSelectAndSearch)
}

export default LegoSelectAndSearch
