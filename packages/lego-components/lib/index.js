var LegoSelectAndSearch = {
render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('BLMVirtualSelect',_vm._g(_vm._b({staticStyle:{"display":"inline-block"},attrs:{"options-data":_vm.data,"option":_vm.option,"multiple":_vm.multiple},model:{value:(_vm.selectedValue),callback:function ($$v) {_vm.selectedValue=$$v;},expression:"selectedValue"}},'BLMVirtualSelect',_vm.$attrs,false),_vm.$listeners)),_vm._v(" "),_c('el-button',{staticStyle:{"margin-left":"10px"},attrs:{"disabled":!_vm.selectedValue,"type":"primary"},on:{"click":_vm.doSearch}},[_vm._v("\n    "+_vm._s(_vm.searchBtnTxt)+"\n  ")]),_vm._v(" "),_c('div',{domProps:{"innerHTML":_vm._s(_vm.resultHTML)}})],1)},
staticRenderFns: [],
  name: 'LegoSelectAndSearch',
  inject: {
    elForm: {
      default: ''
    },
    elFormItem: {
      default: ''
    }
  },
  props: {
    data: {
      type: Array,
      default() {
        return []
      }
    },
    option: {
      type: Object,
      default: () => {
        return {
          labelKey: 'label',
          valueKey: 'id',
          allLabel: '全选',
          allValue: 'ALL',
          unlimitedLabel: '不限',
          unlimitedValue: '-1'
        }
      }
    },
    multiple: {
      type: Boolean,
      default: false
    },
    searchBtnTxt: {
      type: String,
      default: '搜索'
    },
    searchAction: {
      type: [Promise, Function],
      default: null
    },
    searchResult: {
      type: String,
      default: ''
    },
    value: {
      type: [Array, Number, String, Boolean],
      default() {
        return null
      }
    },
    form: {
      type: String,
      default: ''
    },
    validateEvent: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      selectedValue: null,
      selectedOption: {},
      resultHTML: ''
    }
  },
  computed: {
    selectedParams() {
      const item =
        this.data.find(item => {
          return item[this.option.valueKey] === this.selectedValue
        }) || {};
      return item
    },
    validateState() {
      return this.elFormItem ? this.elFormItem.validateState : ''
    }
  },
  watch: {
    value: {
      handler(to) {
        this.selectedValue = to;
      },
      immediate: true,
      deep: true
    },
    selectedValue: {
      handler(to, from) {
        if (to) {
          const selectedOption = this.data.find((item) => {
            return item[this.option.valueKey] === to
          });
          this.selectedOption = selectedOption || {};
        }
        if (to !== from) {
          this.$emit('input', to);
          this.$emit('change', to);
          if (this.validateEvent) {
            this.dispatch('ElFormItem', 'el.form.blur', [to]);
            this.dispatch('ElFormItem', 'el.form.change', [to]);
          }
        }
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    doSearch() {
      if (this.searchAction) {
        const result = this.searchAction(this.selectedParams);
        const typeString = Object.prototype.toString.call(result);
        if (
          typeString === '[object Promise]' ||
          typeString === '[object AsyncFunction]'
        ) {
          return result
            .then(data => {
              try {
                if (![undefined, null].includes(data)) {
                  const resultHTML = eval(`\`${this.searchResult}\``);
                  this.resultHTML = resultHTML;
                } else {
                  this.resultHTML = '查无结果！';
                }
              } catch (e) {
                console.log(e);
                this.resultHTML = '查询失败！';
              }
            })
            .catch(error => {
              console.log(error);
            })
        }
        const data = result;
        try {
          if (![undefined, null].includes(data)) {
            const resultHTML = eval(`\`${this.searchResult}\``);
            this.resultHTML = resultHTML;
          } else {
            this.resultHTML = '查无结果！';
          }
        } catch (e) {
          console.log(e);
          this.resultHTML = '查询失败！';
        }
      }
    },
    dispatch(componentName, eventName, params) {
      let parent = this.$parent || this.$root;
      let name = parent.$options.componentName;

      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;

        if (parent) {
          name = parent.$options.componentName;
        }
      }
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params));
      }
    }
  }
};

LegoSelectAndSearch.install = function (Vue) {
  Vue.component(LegoSelectAndSearch.name, LegoSelectAndSearch);
};

var allComponents = [LegoSelectAndSearch];

var install = function install(Vue) {
  allComponents.forEach(function (component) {
    Vue.component(component.name, component);
  });
};

var index = {
  install: install,
  LegoSelectAndSearch: LegoSelectAndSearch
};

export { index as default };
