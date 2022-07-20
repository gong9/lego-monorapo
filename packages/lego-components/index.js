import LegoSelectAndSearch from './components/LegoSelectAndSearch/index'

const allComponents = [LegoSelectAndSearch]

const install = function(Vue) {
  allComponents.forEach((component) => {
    Vue.component(component.name, component)
  })
}

export default {
  install,
  LegoSelectAndSearch
}
