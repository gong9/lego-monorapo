<template>
  <div>
    <BLMVirtualSelect
      v-model="selectedValue"
      :options-data="data"
      :option="option"
      :multiple="multiple"
      v-bind="$attrs"
      style="display: inline-block"
      v-on="$listeners"
    />
    <el-button
      :disabled="!selectedValue"
      type="primary"
      style="margin-left: 10px"
      @click="doSearch"
    >
      {{ searchBtnTxt }}
    </el-button>
    <div v-html="resultHTML" />
  </div>
</template>

<script>
export default {
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
        }) || {}
      return item
    },
    validateState() {
      return this.elFormItem ? this.elFormItem.validateState : ''
    }
  },
  watch: {
    value: {
      handler(to) {
        this.selectedValue = to
      },
      immediate: true,
      deep: true
    },
    selectedValue: {
      handler(to, from) {
        if (to) {
          const selectedOption = this.data.find((item) => {
            return item[this.option.valueKey] === to
          })
          this.selectedOption = selectedOption || {}
        }
        if (to !== from) {
          this.$emit('input', to)
          this.$emit('change', to)
          if (this.validateEvent) {
            this.dispatch('ElFormItem', 'el.form.blur', [to])
            this.dispatch('ElFormItem', 'el.form.change', [to])
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
        const result = this.searchAction(this.selectedParams)
        const typeString = Object.prototype.toString.call(result)
        if (
          typeString === '[object Promise]' ||
          typeString === '[object AsyncFunction]'
        ) {
          return result
            .then(data => {
              try {
                if (![undefined, null].includes(data)) {
                  const resultHTML = eval(`\`${this.searchResult}\``)
                  this.resultHTML = resultHTML
                } else {
                  this.resultHTML = '查无结果！'
                }
              } catch (e) {
                console.log(e)
                this.resultHTML = '查询失败！'
              }
            })
            .catch(error => {
              console.log(error)
            })
        }
        const data = result
        try {
          if (![undefined, null].includes(data)) {
            const resultHTML = eval(`\`${this.searchResult}\``)
            this.resultHTML = resultHTML
          } else {
            this.resultHTML = '查无结果！'
          }
        } catch (e) {
          console.log(e)
          this.resultHTML = '查询失败！'
        }
      }
    },
    dispatch(componentName, eventName, params) {
      let parent = this.$parent || this.$root
      let name = parent.$options.componentName

      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent

        if (parent) {
          name = parent.$options.componentName
        }
      }
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params))
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
