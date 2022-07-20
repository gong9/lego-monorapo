export const chunksData = [
  {
    'id': 327,
    'name': null,
    'sceneId': 21,
    'sceneName': null,
    'componentConfig': "{\"label\":\"奖励上限\",\"name\":\"rewardUpperLimitMoney_v4\",\"type\":\"chunk\",\"operations\":\"((function() {\\n    return {\\n        maximumRewardLimitFe: {\\n            option: [-1,0,1]\\n        }\\n    }\\n}))\",\"options\":{\"interaction\":\"(function() {\\n    return {}\\n})\"},\"fields\":[{\"field\":\"305\",\"defaultValue\":\"\",\"hubbleDefaultValue\":\"(function(schema) {\\n    // 这里的data为哈勃筛选过后的最新data @zhangjie\\n    return [ schema.options.data[0].value ]\\n})\",\"component\":\"el-checkbox-group\",\"options\":{\"data\":\"[\\n  {\\n    'label': '不设上限',\\n    'value': -1,\\n    'mutex': true\\n  },\\n  {\\n    'label': '订单总量',\\n    'value': 0\\n  },\\n  {\\n    'label': '奖励总额',\\n    'value': 1\\n  },\\n  {\\n    'label': '每单奖励上限',\\n    'value': 2\\n  }\\n]\\n\",\"attrs\":\"(function() {\\n    return {\\n    }\\n})\",\"rules\":\"(function() {\\n    return [\\n        {\\n            required: true,\\n            type: 'array',\\n            min: 1,\\n            message: '请选择奖励上限',\\n            trigger: 'change'\\n        }\\n    ]\\n})\",\"on\":\"(function() {\\n    return {}\\n})\",\"interaction\":\"(function() {\\n  return {\\n    display: function(form, oldForm) {\\n      if (!Array.isArray(form.taskList) || form.taskList.length === 0) return false\\n\\n      const currentTargetData = form.taskList[0]\\n\\n      // 此原子状态发生改变时，需要执行清空逻辑\\n      if (currentTargetData.rewardUpperLimitOrderNum && !currentTargetData.maximumRewardLimitFe.includes(0)) {\\n        this.formData.taskList[0].rewardUpperLimitOrderNum = undefined\\n      }\\n\\n      if (currentTargetData.rewardUpperLimitMoney && !currentTargetData.maximumRewardLimitFe.includes(1)) {\\n        this.formData.taskList[0].rewardUpperLimitMoney = undefined\\n      }\\n\\n      if (currentTargetData.rewardUpperLimitPerOrderMoney && !currentTargetData.maximumRewardLimitFe.includes(2)) {\\n        this.formData.taskList[0].rewardUpperLimitPerOrderMoney = undefined\\n      }\\n      return true\\n    }\\n  }\\n})\\n\",\"options\":\"[\\n]\",\"special\":\"{\\n}\"}},{\"field\":\"313\",\"defaultValue\":\"\",\"hubbleDefaultValue\":\"(function(schema) {\\n    return null\\n})\",\"component\":\"span\",\"options\":{\"attrs\":\"(function () {\\n  const { getRelationChunk } = this.utils;\\n  const {\\n    options: { hubbleDescription },\\n  } = getRelationChunk(\\\"rewardUpperLimitMoney_v2\\\")[0];\\n\\n  let text = \\\"每日\\\";\\n\\n  if (hubbleDescription && hubbleDescription.includes(\\\"每日\\\")) {\\n    text = \\\"每日\\\";\\n  } else {\\n    text = \\\"活动周期内\\\";\\n  }\\n\\n  return {\\n    text: `${text}:     `,\\n    inline: true,\\n  };\\n});\\n\",\"rules\":\"(function() {\\n    return []\\n})\",\"on\":\"(function() {\\n    return {}\\n})\",\"interaction\":\"(function() {\\n    return {}\\n})\",\"options\":\"[\\n]\",\"special\":\"{\\n}\"}},{\"field\":\"315\",\"defaultValue\":\"\",\"hubbleDefaultValue\":\"(function(schema) {\\n    return null\\n})\",\"component\":\"span\",\"options\":{\"attrs\":\"(function() {\\n    return {\\n      text: \\\"无奖励上限\\\",\\n      inline: true\\n    }\\n})\",\"rules\":\"(function() {\\n    return []\\n})\",\"on\":\"(function() {\\n    return {}\\n})\",\"interaction\":\"(function() {\\n  return {\\n    display: function(form) {\\n      if (!Array.isArray(form.taskList) || form.taskList.length === 0) return false\\n      // 0,1,2,3 分别对应 不设上限、订单总量、订单总额、每单上限\\n\\n      return Array.isArray(form.taskList[0].maximumRewardLimitFe) && form.taskList[0].maximumRewardLimitFe.includes(-1)\\n    }\\n  }\\n})\",\"options\":\"[\\n]\",\"special\":\"{\\n}\"}},{\"field\":\"309\",\"defaultValue\":\"\",\"component\":\"el-input-number\",\"options\":{\"attrs\":\"(function () {\\n  const { getRelationChunk } = this.utils;\\n  const rewardPerOrderRangeData = getRelationChunk(\\\"rewardPerOrderRange_v2\\\");\\n  let text = \\\"最多奖励\\\";\\n\\n  if (rewardPerOrderRangeData.length > 0) {\\n    const schema = rewardPerOrderRangeData[0];\\n\\n    const { options } = schema;\\n    if (\\\"rewardPerOrderRangeMoney\\\" in options) {\\n      text = \\\"最多奖励到第\\\";\\n    }\\n  }\\n\\n  return {\\n    controls: false,\\n    min: 1,\\n    max: 999,\\n    prefix: text,\\n    suffix: \\\"单；\\\",\\n    precision: 0,\\n    inline: true,\\n  };\\n});\\n\",\"rules\":\"(function (_, __, ___, tag) {\\n  // @ gongzhen\\n  // 大于最高阶梯单量\\n  const { taskNum } = tag;\\n  const { spAnalysisApp } = ___;\\n  return [\\n    {\\n      validator: (rule, value, callback) => {\\n        const awardRules = this.formData.taskList[taskNum]?.awardRules;\\n        let realVal = null;\\n        let range = false;\\n\\n        if (value !== 0 && !value) {\\n          return callback(\\\"请填写订单总量\\\");\\n        }\\n\\n        if (awardRules.length > 0) {\\n          // 取最高层级完单量\\n          const orderNum = awardRules[awardRules.length - 1]?.orderNum;\\n          if (orderNum && orderNum[1]) {\\n            range = true;\\n            realVal = orderNum[1];\\n          } else {\\n            realVal = orderNum[0];\\n          }\\n        }\\n\\n        if (realVal && !range && value <= realVal) {\\n          return callback(\\\"单量上限需大于最高阶梯的单量\\\");\\n        }\\n        // 区间的值是系统设置的所以可以相等\\n        if (realVal && range && value < realVal) {\\n          return callback(\\\"单量上限需大于最高阶梯的单量\\\");\\n        }\\n        return callback();\\n      },\\n      trigger: \\\"blur\\\",\\n    },\\n    {\\n      validator: (rule, value, callback) => {\\n        const { opinion = {} } = spAnalysisApp.cloud;\\n        const moment = spAnalysisApp.utils.moment;\\n\\n        // 非全部人群不校验\\n        if (_[\\\"driverTag\\\"] !== 1) {\\n          return callback();\\n        }\\n        // 周期任务\\n        if (_[\\\"taskPeriod\\\"] === 2 && _[\\\"actTime\\\"].length) {\\n          const start = moment(_[\\\"actTime\\\"][0]).date();\\n          const end = moment(_[\\\"actTime\\\"][1]).date();\\n          const duration = end - start + 1;\\n          if (\\n            Number((value / duration).toFixed(2)) > opinion[\\\"onThresholdNum\\\"]\\n          ) {\\n            return callback(\\n              `#活动规则超出每日${opinion[\\\"onThresholdNum\\\"]}单上限值，可能造成引导司机疲劳驾驶的风险，建议针对指定人群的司机配置活动#`\\n            );\\n          }\\n        }\\n\\n        // 每日任务\\n        if (_[\\\"taskPeriod\\\"] === 0 && +value > opinion[\\\"onThresholdNum\\\"]) {\\n          return callback(\\n            `#活动规则超出每日${opinion[\\\"onThresholdNum\\\"]}单上限值，可能造成引导司机疲劳驾驶的风险，建议针对指定人群的司机配置活动#`\\n          );\\n        }\\n        return callback();\\n      },\\n      trigger: \\\"blur\\\",\\n    },\\n    {\\n      required: true,\\n      type: \\\"number\\\",\\n      message: \\\"请填写订单总量\\\",\\n      trigger: \\\"blur\\\",\\n    },\\n  ];\\n});\\n\",\"on\":\"(function() {\\n    return {}\\n})\",\"interaction\":\"(function() {\\n  return {\\n    display: function(form) {\\n      if (!Array.isArray(form.taskList) || form.taskList.length === 0) return false\\n      // 0,1,2,3 分别对应 不设上限、订单总量、订单总额、每单上限\\n\\n      return Array.isArray(form.taskList[0].maximumRewardLimitFe) && form.taskList[0].maximumRewardLimitFe.includes(0)\\n    }\\n  }\\n})\",\"options\":\"[\\n]\",\"special\":\"{\\n}\"}},{\"field\":\"157\",\"defaultValue\":\"\",\"component\":\"el-input-number\",\"options\":{\"attrs\":\"(function() {\\n  return {\\n    controls: false,\\n    min: 0,\\n    max: 9999.99,\\n    precision: 2,\\n    prefix: '最多奖励',\\n    suffix: '元；',\\n    inline: true\\n  }\\n})\\n\",\"rules\":\"(function(_, __, ___, tag) {\\n  const orderNumInfo = this.specialField.filter(item => item.relationField === 'orderNum')[0] // 是否是拼单还是拼单奖区间\\n  const { taskNum } = tag\\n  return [\\n    {\\n      required: true,\\n      type: 'number',\\n      message: '请填写订单总额',\\n      trigger: 'blur'\\n    },\\n    {\\n      validator: (rule, value, callback) => {\\n        const awardRules = this.formData.taskList[taskNum]?.awardRules\\n\\n        // 拼单奖\\n        let realVal = null\\n        let finalMoney = null\\n        if (awardRules && awardRules.length > 0) {\\n          // 取最高层级完单量\\n          const orderNum = awardRules[awardRules.length - 1]?.orderNum\\n          finalMoney = awardRules[awardRules.length - 1]?.rewardPerOrderMoney\\n          if (orderNum[1]) {\\n            realVal = orderNum[1]\\n          } else {\\n            realVal = orderNum[0]\\n          }\\n        }\\n\\n        // 拼单奖区间 金额上限＞∑阶梯奖励总额\\n        const allMoney = []\\n        let finalMoney2 = null\\n        if (awardRules && awardRules.length > 0) {\\n          for (let i = 0; i < awardRules.length; i++) {\\n            const currentOrderNum = awardRules[i]?.orderNum\\n            const currentMoney = awardRules[i]?.rewardPerOrderRangeMoney\\n            if (i === awardRules.length - 1) {\\n              allMoney.push(currentOrderNum[0] * currentMoney)\\n            } else {\\n              allMoney.push((currentOrderNum[1] - currentOrderNum[0] + 1) * currentMoney)\\n            }\\n          }\\n        }\\n\\n        finalMoney2 = allMoney.reduce((pre, current) => current + pre, 0)\\n\\n        if (orderNumInfo && !orderNumInfo.isInterval) {\\n          // 拼单奖  奖励总额上限＞最高阶梯的每单奖励金额*最高阶梯的单量\\n          if (realVal && finalMoney && value <= Number((realVal * finalMoney).toPrecision(3))) {\\n            return callback('奖励总额上限需大于最高阶梯的每单奖励金额*最高阶梯的单量')\\n          }\\n        } else {\\n          //   金额上限＞∑阶梯奖励总额\\n          if (finalMoney2 && value <= finalMoney2) {\\n            return callback('金额上限需大于任意阶梯奖励总额总合')\\n          }\\n        }\\n\\n        return callback()\\n      },\\n      trigger: 'blur'\\n    }\\n  ]\\n})\\n\\n\",\"on\":\"(function() {\\n    return {}\\n})\",\"interaction\":\"(function() {\\n  return {\\n    display: function(form) {\\n      if (!Array.isArray(form.taskList) || form.taskList.length === 0) return false\\n      // 0,1,2,3 分别对应 不设上限、订单总量、订单总额、每单上限\\n\\n      return Array.isArray(form.taskList[0].maximumRewardLimitFe) && form.taskList[0].maximumRewardLimitFe.includes(1)\\n    }\\n  }\\n})\",\"options\":\"[\\n]\",\"special\":\"{\\n}\"}},{\"field\":\"311\",\"defaultValue\":\"\",\"component\":\"el-input-number\",\"options\":{\"attrs\":\"(function () {\\n    return {\\n        controls: false,\\n        min: 0,\\n        max: 9999.99,\\n        precision: 2,\\n        prefix: '每笔订单最多奖励',\\n        suffix: '元；',\\n        inline: true\\n    }\\n})\",\"rules\":\"(function() {\\n    return [\\n       {\\n      required: true,\\n      type: 'number',\\n      message: '请填写每单奖励上限',\\n      trigger: 'blur'\\n    }\\n    ]\\n})\",\"on\":\"(function() {\\n    return {}\\n})\",\"interaction\":\"(function() {\\n  return {\\n    display: function(form) {\\n      if (!Array.isArray(form.taskList) || form.taskList.length === 0) return false\\n      // 0,1,2,3 分别对应 不设上限、订单总量、订单总额、每单上限\\n\\n      return Array.isArray(form.taskList[0].maximumRewardLimitFe) && form.taskList[0].maximumRewardLimitFe.includes(2)\\n    }\\n  }\\n})\",\"options\":\"[\\n]\",\"special\":\"{\\n}\"}}]}",
    'ruleConfig': null,
    'status': null,
    'description': null,
    'createByName': null,
    'gmtCreate': null,
    'updateByName': null,
    'gmtModified': null
  },
  {
    'id': 325,
    'name': null,
    'sceneId': 21,
    'sceneName': null,
    'componentConfig': "{\"label\":\"出车时长\",\"name\":\"effectiveHour_v2\",\"type\":\"chunk\",\"options\":{},\"fields\":[{\"field\":\"115\",\"defaultValue\":\"\",\"component\":\"BLMIntervalValue\",\"operations\":\"{}\",\"options\":{\"attrs\":\"(function() {\\n    \\n    return {\\n        prefix: '达到',\\n        suffix: '小时',\\n        isRange: false,\\n        max1: 999.9,\\n        min1: 0.1,\\n        precision: 1\\n        \\n    }\\n})\",\"rules\":\"(function (form, _, __) {\\n  const _self = this;\\n  const { spAnalysisApp } = __;\\n  return [\\n    {\\n      validator: (rule, value, callback) => {\\n        if (!Array.isArray(value)) {\\n          return callback(new Error(\\\"请填写出车时长\\\"));\\n        }\\n\\n        if (value.includes(void 0)) {\\n          return callback(new Error(\\\"请填写出车时长\\\"));\\n        }\\n\\n        if (value.length === 0) {\\n          return callback(new Error(\\\"请填写出车时长\\\"));\\n        }\\n        return callback();\\n      },\\n      trigger: \\\"blur\\\",\\n    },\\n    {\\n      validator: (rule, value, callback) => {\\n        const { opinion = {} } = spAnalysisApp.cloud;\\n        const moment = spAnalysisApp.utils.moment;\\n        let realVal = null;\\n        if (value && value[1]) {\\n          realVal = value[1];\\n        } else {\\n          realVal = value[0];\\n        }\\n        // 非全部人群不校验\\n        if (form[\\\"driverTag\\\"] !== 1) {\\n          return callback();\\n        }\\n        // 周期任务\\n        if (form[\\\"taskPeriod\\\"] === 2 && form[\\\"actTime\\\"].length) {\\n          const start = moment(form[\\\"actTime\\\"][0]).date();\\n          const end = moment(form[\\\"actTime\\\"][1]).date();\\n          const duration = end - start + 1;\\n          if (\\n            Number((realVal / duration).toFixed(2)) > opinion[\\\"onThresholdTime\\\"]\\n          ) {\\n            return callback(\\n              `#活动规则超出每日${opinion[\\\"onThresholdTime\\\"]}小时上限值，可能造成引导司机疲劳驾驶的风险，建议针对指定人群的司机配置活动#`\\n            );\\n          }\\n        }\\n\\n        // 每日任务\\n        if (form[\\\"taskPeriod\\\"] === 0 && +realVal > opinion[\\\"onThresholdTime\\\"]) {\\n          return callback(\\n            `#活动规则超出每日${opinion[\\\"onThresholdTime\\\"]}小时上限值，可能造成引导司机疲劳驾驶的风险，建议针对指定人群的司机配置活动#`\\n          );\\n        }\\n        return callback();\\n      },\\n      trigger: \\\"blur\\\",\\n    },\\n    {\\n      required: true,\\n      message: \\\"请填写出车时长\\\",\\n      type: \\\"array\\\",\\n      trigger: \\\"blur\\\",\\n    },\\n  ];\\n});\\n\",\"on\":\"(function() {\\n    return {}\\n})\",\"interaction\":\"(function() {\\n    return {}\\n})\",\"options\":\"[\\n]\",\"special\":\"{\\n}\"}}]}",
    'ruleConfig': null,
    'status': null,
    'description': null,
    'createByName': null,
    'gmtCreate': null,
    'updateByName': null,
    'gmtModified': null
  },
  {
    'id': 323,
    'name': null,
    'sceneId': 21,
    'sceneName': null,
    'componentConfig': '{"label":"完单量","name":"orderNum_v4","type":"chunk","alias":"完成","options":{"interaction":"(function () {\\n  const ctx = this;\\n  const orderNumInfo = this.specialField.filter(\\n    (item) => item.relationField === \\"orderNum\\"\\n  )[0]; // 是否是拼车单还是拼车单区间\\n  // @gongzhen\\n  return {\\n    display: function (newFormData, oldFormData, tag) {\\n      if (orderNumInfo && orderNumInfo.isInterval) {\\n        if (tag) {\\n          const { ruleLayer, taskNum } = tag;\\n          debugger;\\n          const rewardUpperLimitOrderNum =\\n            ctx.formData.taskList[taskNum]?.rewardUpperLimitOrderNum; // 订单总量\\n          if (newFormData?.taskList[taskNum]?.awardRules.length - 1 < ruleLayer)\\n            return true;\\n\\n          if (ruleLayer !== 0) {\\n            let nextValue =\\n              ctx.formData?.taskList[taskNum]?.awardRules[ruleLayer]\\n                ?.orderNum[0];\\n            if (typeof nextValue !== \\"number\\") {\\n              nextValue = undefined;\\n            }\\n\\n            const nextValue2 =\\n              ctx.formData?.taskList[taskNum]?.awardRules[ruleLayer]\\n                ?.orderNum[1];\\n            const firstValue =\\n              ctx.formData?.taskList[taskNum]?.awardRules[ruleLayer - 1]\\n                ?.orderNum[0];\\n            const firstValue2 =\\n              ctx.formData?.taskList[taskNum]?.awardRules[ruleLayer - 1]\\n                ?.orderNum[1];\\n\\n            // 获取当前层级的上一次赋值\\n            const preNextValue =\\n              oldFormData &&\\n              oldFormData.formData?.taskList[taskNum]?.awardRules[ruleLayer]\\n                ?.orderNum[0];\\n            // 不再进行值的更新\\n            if (nextValue > 999) {\\n              ctx.$set(\\n                ctx.formData?.taskList[taskNum]?.awardRules[ruleLayer]\\n                  ?.orderNum,\\n                0,\\n                preNextValue\\n              );\\n            }\\n\\n            if (typeof nextValue === \\"number\\" && firstValue >= nextValue) {\\n              setTimeout(() => {\\n                ctx.$set(\\n                  ctx.formData?.taskList[taskNum].awardRules[ruleLayer]\\n                    ?.orderNum,\\n                  0,\\n                  firstValue + 1\\n                );\\n              });\\n            } else if (\\n              typeof nextValue === \\"number\\" &&\\n              firstValue < nextValue\\n            ) {\\n              ctx.$set(\\n                ctx.formData?.taskList[taskNum]?.awardRules[ruleLayer - 1]\\n                  ?.orderNum,\\n                1,\\n                nextValue - 1\\n              );\\n            } else if (\\n              !firstValue2 ||\\n              (firstValue2 && firstValue2 >= nextValue)\\n            ) {\\n              ctx.$set(\\n                ctx.formData?.taskList[taskNum]?.awardRules[ruleLayer - 1]\\n                  ?.orderNum,\\n                1,\\n                nextValue - 1\\n              );\\n            } else if (nextValue2 && nextValue2 < nextValue) {\\n              ctx.$set(\\n                ctx.formData?.taskList[taskNum]?.awardRules[ruleLayer]\\n                  ?.orderNum,\\n                1,\\n                nextValue\\n              );\\n            }\\n          }\\n\\n          // 最高层级删除第二值\\n          //   if (\\n          //     newFormData?.taskList[taskNum]?.awardRules.length - 1 ===\\n          //     ruleLayer\\n          //   ) {\\n          //     if (newFormData?.taskList[taskNum]?.awardRules[ruleLayer]) {\\n          //       ctx.$set(\\n          //         ctx.formData?.taskList[taskNum]?.awardRules[ruleLayer]\\n          //           ?.orderNum,\\n          //         1,\\n          //         undefined\\n          //       );\\n          //     }\\n          //   }\\n\\n          // 如果是最高层\\n          if (\\n            newFormData?.taskList[taskNum]?.awardRules.length - 1 ===\\n            ruleLayer\\n          ) {\\n            debugger;\\n            let nextValue =\\n              newFormData?.taskList[taskNum]?.awardRules[ruleLayer].orderNum[0];\\n            if (\\n              rewardUpperLimitOrderNum &&\\n              typeof nextValue === \\"number\\" &&\\n              rewardUpperLimitOrderNum >= nextValue\\n            ) {\\n              ctx.$set(\\n                ctx.formData?.taskList[taskNum]?.awardRules[ruleLayer]\\n                  ?.orderNum,\\n                1,\\n                rewardUpperLimitOrderNum\\n              );\\n            } else if (\\n              rewardUpperLimitOrderNum &&\\n              typeof nextValue === \\"number\\" &&\\n              rewardUpperLimitOrderNum < nextValue\\n            ) {\\n              debugger;\\n              ctx.$set(\\n                ctx.formData?.taskList[taskNum],\\n                \\"rewardUpperLimitOrderNum\\",\\n                nextValue\\n              );\\n            } else if (rewardUpperLimitOrderNum) {\\n              ctx.$set(\\n                ctx.formData?.taskList[taskNum]?.awardRules[ruleLayer]\\n                  ?.orderNum,\\n                1,\\n                rewardUpperLimitOrderNum\\n              );\\n            } else {\\n              if (newFormData?.taskList[taskNum]?.awardRules[ruleLayer]) {\\n                ctx.$set(\\n                  ctx.formData?.taskList[taskNum]?.awardRules[ruleLayer]\\n                    ?.orderNum,\\n                  1,\\n                  undefined\\n                );\\n              }\\n            }\\n          }\\n        }\\n      }\\n\\n      return true;\\n    },\\n  };\\n});\\n"},"fields":[{"field":"111","defaultValue":"","component":"BLMIntervalValue","operations":"{}","options":{"attrs":"(function (currentFileName, taskNum, ruleLayer) {\\n  // TODO 解析代码处理待优化\\n  const rewardRule = this.utils.findComponentsDownward(\\"rewardRule\\");\\n  const currentRuleLayer = rewardRule[taskNum]?.currentRuleData?.length; // 一共多少层\\n  const orderNumInfo = this.specialField.filter(\\n    (item) => item.relationField === \\"orderNum\\"\\n  )[0]; // 是否是拼单还是拼车单区间\\n\\n  const rewardUpperLimitOrderNum =\\n    this.formData.taskList[taskNum]?.rewardUpperLimitOrderNum;\\n\\n  /**\\n   * 当前层是否为最高层\\n   */\\n  const isHighest = () => {\\n    if (currentRuleLayer && (ruleLayer === 0 || ruleLayer)) {\\n      // 当前组件是否为最高层级\\n      if (currentRuleLayer - 1 === ruleLayer) {\\n        return true;\\n      } else {\\n        return false;\\n      }\\n    }\\n    return false;\\n  };\\n  if (orderNumInfo) {\\n    if (orderNumInfo.isInterval) {\\n      return {\\n        isRange: !isHighest() ? true : rewardUpperLimitOrderNum ? true : false,\\n        prefix: \\"第\\",\\n        suffix: isHighest() && !rewardUpperLimitOrderNum ? \\"单及以上 \\" : \\"单\\",\\n        maxLength: 3,\\n        max1: 999,\\n        min1: 1,\\n        max2: 999,\\n        min2: 1,\\n        precision: 0,\\n        dValue: 0,\\n        disabled2: !isHighest()\\n          ? true\\n          : rewardUpperLimitOrderNum\\n          ? true\\n          : false,\\n        \\"step-strictly\\": true,\\n      };\\n    } else {\\n      return {\\n        prefix: \\"\\",\\n        suffix: \\"单\\",\\n        isRange: false,\\n        maxLength: 3,\\n        max1: 999,\\n        min1: 1,\\n        max2: 999,\\n        min2: 1,\\n        precision: 0,\\n        \\"step-strictly\\": true,\\n      };\\n    }\\n  } else {\\n    return {\\n      prefix: \\"\\",\\n      suffix: \\"单\\",\\n      isRange: false,\\n      maxLength: 3,\\n      max1: 999,\\n      min2: 1,\\n      max2: 999,\\n      min1: 1,\\n      precision: 0,\\n      \\"step-strictly\\": true,\\n    };\\n  }\\n});\\n","rules":"(function (form, _, __, tag) {\\n  const { spAnalysisApp } = __;\\n  return [\\n    {\\n      validator: (rule, value, callback) => {\\n        if (!Array.isArray(value)) {\\n          return callback(new Error(\\"请填写完单量\\"));\\n        }\\n        if (value.length === 0) {\\n          return callback(new Error(\\"请填写完单量\\"));\\n        }\\n        if (!value[0]) {\\n          return callback(new Error(\\"请填写完单量\\"));\\n        }\\n\\n        if (value[1] && !value[0]) {\\n          return callback(new Error(\\"请填写完单量\\"));\\n        }\\n\\n        if ((value[0] && value[0] > 999) || (value[1] && value[1] > 999)) {\\n          debugger;\\n          return callback(new Error(\\"请检查数据范围\\"));\\n        }\\n        return callback();\\n      },\\n      trigger: \\"blur\\",\\n    },\\n    {\\n      validator: (rule, value, callback) => {\\n        const { opinion = {} } = spAnalysisApp.cloud;\\n        const moment = spAnalysisApp.utils.moment;\\n\\n        let realVal = null;\\n        if (value && value[1]) {\\n          realVal = value[1];\\n        } else {\\n          realVal = value[0];\\n        }\\n\\n        // 非全部人群不校验\\n        if (form[\\"driverTag\\"] !== 1) {\\n          return callback();\\n        }\\n\\n        // 周期任务\\n        if (form[\\"taskPeriod\\"] === 2 && form[\\"actTime\\"].length) {\\n          const start = moment(form[\\"actTime\\"][0]).date();\\n          const end = moment(form[\\"actTime\\"][1]).date();\\n          const duration = end - start + 1;\\n          if (\\n            Number((realVal / duration).toFixed(2)) > opinion[\\"onThresholdNum\\"]\\n          ) {\\n            return callback(\\n              `#活动规则超出每日${opinion[\\"onThresholdNum\\"]}单上限值，可能造成引导司机疲劳驾驶的风险，建议针对指定人群的司机配置活动#`\\n            );\\n          }\\n        }\\n\\n        // 每日任务\\n        if (form[\\"taskPeriod\\"] === 0 && +realVal > opinion[\\"onThresholdNum\\"]) {\\n          return callback(\\n            `#活动规则超出每日${opinion[\\"onThresholdNum\\"]}单上限值，可能造成引导司机疲劳驾驶的风险，建议针对指定人群的司机配置活动#`\\n          );\\n        }\\n        return callback();\\n      },\\n      trigger: \\"blur\\",\\n    },\\n    {\\n      required: true,\\n      message: \\"请填写完单量\\",\\n      type: \\"array\\",\\n      trigger: \\"blur\\",\\n    },\\n  ];\\n});\\n","on":"(function() {\\n    return {}\\n})","interaction":"(function() {\\n    return {}\\n})","options":"[\\n]","special":"{\\n}"}}]}',
    'ruleConfig': null,
    'status': null,
    'description': null,
    'createByName': null,
    'gmtCreate': null,
    'updateByName': null,
    'gmtModified': null
  },
  {
    'id': 321,
    'name': null,
    'sceneId': 21,
    'sceneName': null,
    'componentConfig': "{\"label\":\"风险控制\",\"name\":\"orderRiskControlPercentage_test\",\"type\":\"chunk\",\"options\":{},\"fields\":[{\"field\":\"123\",\"defaultValue\":\"\",\"component\":\"BLMIntervalValue\",\"operations\":\"{}\",\"options\":{\"attrs\":\"(function () {\\n  return {\\n    prefix: `达到阶梯要求，但当前任务获得<span style=\\\"font-weight:bolder\\\">全部奖励</span>大于等于<span style=\\\"font-weight:bolder\\\">抽佣后流水</span>的`,\\n    suffix: \\\"%时，会被认为有刷单行为，需要通过人工审核后才会发放奖励\\\",\\n    isRange: false,\\n    max1: 100,\\n    precision: 2,\\n    describe:\\n      '<p style=\\\"color:red\\\">重点关注：乐高场景的风险控制比例计算方法为获得奖励金额/司机佣后流水</br>示例：假设保底100元，当司机佣后流水低于70元时希望风控拦截。则司机获奖金额=30元，司机佣后流水70元，风控比例=30/70≈42.85%</p>',\\n  };\\n});\\n\",\"rules\":\"(function () {\\n  const orderRiskControlPercentageConfig = this?.utils?.getRelationChunk(\\n    \\\"orderRiskControlPercentage\\\",\\n    \\\"config\\\"\\n  )[0]; // TODO 多任务时传下当前任务层级\\n  // 哈勃是否配置了不必填\\n  const required = !!(\\n    orderRiskControlPercentageConfig?.orderRiskControlPercentage &&\\n    orderRiskControlPercentageConfig?.orderRiskControlPercentage?.required === 1\\n  );\\n\\n  return [\\n    {\\n      validator: (rule, value, callback) => {\\n        if (required && !Array.isArray(value)) {\\n          return callback(new Error(\\\"请填写风险控制\\\"));\\n        }\\n\\n        if (required && value.includes(void 0)) {\\n          return callback(new Error(\\\"请填写风险控制\\\"));\\n        }\\n\\n        if (required && value.length === 0) {\\n          return callback(new Error(\\\"请填写风险控制\\\"));\\n        }\\n        return callback();\\n      },\\n      trigger: \\\"blur\\\",\\n    },\\n    {\\n      required: required,\\n      message: \\\"请填写风险控制\\\",\\n      type: \\\"array\\\",\\n      trigger: \\\"blur\\\",\\n    },\\n  ];\\n});\\n\",\"on\":\"(function() {\\n    return {}\\n})\",\"interaction\":\"(function() {\\n    return {}\\n})\",\"options\":\"[\\n  {\\n    label: \\\"1.选项\\\",\\n    value: 0,\\n    key: \\\"option\\\",\\n    description: \\\"\\\",\\n    type: \\\"BlmBizFormRadioGroup\\\",\\n    props: {\\n      options: [\\n        {\\n          label: \\\"任务全部奖励/抽佣后流水\\\",\\n          value: 0,\\n        },\\n      ],\\n    },\\n  },\\n  {\\n    label: \\\"2.是否必填\\\",\\n    value: 1,\\n    key: \\\"required\\\",\\n    description: \\\"\\\",\\n    type: \\\"BlmBizFormRadioGroup\\\",\\n    props: {\\n      options: [\\n        {\\n          label: \\\"否\\\",\\n          value: 0,\\n        },\\n        {\\n          label: \\\"是\\\",\\n          value: 1,\\n        },\\n      ],\\n    },\\n  },\\n  {\\n    label: \\\"3.新增属性\\\",\\n    value: 1,\\n    key: \\\"required\\\",\\n    description: \\\"\\\",\\n    type: \\\"BlmBizFormRadioGroup\\\",\\n    props: {\\n      options: [\\n        {\\n          label: \\\"新增属性枚举1\\\",\\n          value: 0,\\n        },\\n        {\\n          label: \\\"新增属性枚举2\\\",\\n          value: 1,\\n        },\\n      ],\\n    },\\n  },\\n];\\n\",\"special\":\"{\\n}\"}}]}",
    'ruleConfig': null,
    'status': null,
    'description': null,
    'createByName': null,
    'gmtCreate': null,
    'updateByName': null,
    'gmtModified': null
  },
  {
    'id': 317,
    'name': null,
    'sceneId': 21,
    'sceneName': null,
    'componentConfig': '{"label":"皮肤选择","name":"selectSkin_v2","alias":"","type":"chunk","operations":"(function() {\\n    return {}\\n})","options":{"interaction":"(function() {\\n    return {}\\n})"},"fields":[{"field":"241","defaultValue":"","hubbleDefaultValue":"(function(schema) {\\n    return null\\n})","component":"BLMRadioGroup","options":{"attrs":"(function () {\\n  return {\\n    height: \\"auto\\",\\n    width: 200,\\n    margin: 6,\\n  };\\n});\\n","rules":"(function() {\\n    return []\\n})","on":"(function() {\\n    return {}\\n})","interaction":"(function() {\\n    return {}\\n})","options":"[\\n]","special":"{\\n}","dataSrc":"(function () {\\n  return [];\\n});\\n","data":"(async function () {\\n  const { data } = await this.request({\\n    url: \\"/admin/v1/marketing/lego/activity/skins\\",\\n    method: \\"post\\",\\n    data: {\\n      playId: this.$route.query[\\"sceneId\\"],\\n    },\\n  });\\n  return data || [];\\n});\\n"}}]}',
    'ruleConfig': null,
    'status': null,
    'description': null,
    'createByName': null,
    'gmtCreate': null,
    'updateByName': null,
    'gmtModified': null
  },
  {
    'id': 313,
    'name': null,
    'sceneId': 21,
    'sceneName': null,
    'componentConfig': '{"label":"活动对外名称","name":"actName_v2","type":"chunk","operations":"(function() {\\n    return {}\\n})","options":{"interaction":"(function() {\\n  return {}\\n})\\n"},"fields":[{"field":"63","defaultValue":"","hubbleDefaultValue":"(function(schema) {\\n    return null\\n})","component":"el-select","options":{"data":"[]","dataSrc":"(function() {\\n    return []\\n})","attrs":"(function() {\\n    return {}\\n})","rules":"(function() {\\n    return {}\\n})","on":"(function() {\\n    return {}\\n})","interaction":"(function() {\\n    return {}\\n})","options":"[\\n]","special":"{\\n}"}}]}',
    'ruleConfig': null,
    'status': null,
    'description': null,
    'createByName': null,
    'gmtCreate': null,
    'updateByName': null,
    'gmtModified': null
  },
  {
    'id': 311,
    'name': null,
    'sceneId': 21,
    'sceneName': null,
    'componentConfig': '{"label":"完单量","name":"orderNum_v3","type":"chunk","alias":"完成","options":{"interaction":"(function () {\\n  const ctx = this;\\n  const orderNumInfo = this.specialField.filter(\\n    (item) => item.relationField === \\"orderNum\\"\\n  )[0]; // 是否是拼车单还是拼车单区间\\n  // @gongzhen\\n  return {\\n    display: function (newFormData, oldFormData, tag) {\\n      if (orderNumInfo && orderNumInfo.isInterval) {\\n        if (tag) {\\n          const { ruleLayer, taskNum } = tag;\\n          debugger;\\n          const rewardUpperLimitOrderNum =\\n            ctx.formData.taskList[taskNum]?.rewardUpperLimitOrderNum; // 订单总量\\n          if (newFormData?.taskList[taskNum]?.awardRules.length - 1 < ruleLayer)\\n            return true;\\n\\n          if (ruleLayer !== 0) {\\n            let nextValue =\\n              ctx.formData?.taskList[taskNum]?.awardRules[ruleLayer]\\n                ?.orderNum[0];\\n            if (typeof nextValue !== \\"number\\") {\\n              nextValue = undefined;\\n            }\\n\\n            const nextValue2 =\\n              ctx.formData?.taskList[taskNum]?.awardRules[ruleLayer]\\n                ?.orderNum[1];\\n            const firstValue =\\n              ctx.formData?.taskList[taskNum]?.awardRules[ruleLayer - 1]\\n                ?.orderNum[0];\\n            const firstValue2 =\\n              ctx.formData?.taskList[taskNum]?.awardRules[ruleLayer - 1]\\n                ?.orderNum[1];\\n\\n            // 获取当前层级的上一次赋值\\n            const preNextValue =\\n              oldFormData &&\\n              oldFormData.formData?.taskList[taskNum]?.awardRules[ruleLayer]\\n                ?.orderNum[0];\\n            // 不再进行值的更新\\n            if (nextValue > 999) {\\n              ctx.$set(\\n                ctx.formData?.taskList[taskNum]?.awardRules[ruleLayer]\\n                  ?.orderNum,\\n                0,\\n                preNextValue\\n              );\\n            }\\n\\n            if (typeof nextValue === \\"number\\" && firstValue >= nextValue) {\\n              setTimeout(() => {\\n                ctx.$set(\\n                  ctx.formData?.taskList[taskNum].awardRules[ruleLayer]\\n                    ?.orderNum,\\n                  0,\\n                  firstValue + 1\\n                );\\n              });\\n            } else if (\\n              typeof nextValue === \\"number\\" &&\\n              firstValue < nextValue\\n            ) {\\n              ctx.$set(\\n                ctx.formData?.taskList[taskNum]?.awardRules[ruleLayer - 1]\\n                  ?.orderNum,\\n                1,\\n                nextValue - 1\\n              );\\n            } else if (\\n              !firstValue2 ||\\n              (firstValue2 && firstValue2 >= nextValue)\\n            ) {\\n              ctx.$set(\\n                ctx.formData?.taskList[taskNum]?.awardRules[ruleLayer - 1]\\n                  ?.orderNum,\\n                1,\\n                nextValue - 1\\n              );\\n            } else if (nextValue2 && nextValue2 < nextValue) {\\n              ctx.$set(\\n                ctx.formData?.taskList[taskNum]?.awardRules[ruleLayer]\\n                  ?.orderNum,\\n                1,\\n                nextValue\\n              );\\n            }\\n          }\\n\\n          // 最高层级删除第二值\\n          //   if (\\n          //     newFormData?.taskList[taskNum]?.awardRules.length - 1 ===\\n          //     ruleLayer\\n          //   ) {\\n          //     if (newFormData?.taskList[taskNum]?.awardRules[ruleLayer]) {\\n          //       ctx.$set(\\n          //         ctx.formData?.taskList[taskNum]?.awardRules[ruleLayer]\\n          //           ?.orderNum,\\n          //         1,\\n          //         undefined\\n          //       );\\n          //     }\\n          //   }\\n\\n          // 如果是最高层\\n          if (\\n            newFormData?.taskList[taskNum]?.awardRules.length - 1 ===\\n            ruleLayer\\n          ) {\\n            debugger;\\n            let nextValue =\\n              newFormData?.taskList[taskNum]?.awardRules[ruleLayer].orderNum[0];\\n            if (\\n              rewardUpperLimitOrderNum &&\\n              typeof nextValue === \\"number\\" &&\\n              rewardUpperLimitOrderNum >= nextValue\\n            ) {\\n              ctx.$set(\\n                ctx.formData?.taskList[taskNum]?.awardRules[ruleLayer]\\n                  ?.orderNum,\\n                1,\\n                rewardUpperLimitOrderNum\\n              );\\n            } else if (\\n              rewardUpperLimitOrderNum &&\\n              typeof nextValue === \\"number\\" &&\\n              rewardUpperLimitOrderNum < nextValue\\n            ) {\\n              debugger;\\n              ctx.$set(\\n                ctx.formData?.taskList[taskNum],\\n                \\"rewardUpperLimitOrderNum\\",\\n                nextValue\\n              );\\n            } else if (rewardUpperLimitOrderNum) {\\n              ctx.$set(\\n                ctx.formData?.taskList[taskNum]?.awardRules[ruleLayer]\\n                  ?.orderNum,\\n                1,\\n                rewardUpperLimitOrderNum\\n              );\\n            } else {\\n              if (newFormData?.taskList[taskNum]?.awardRules[ruleLayer]) {\\n                ctx.$set(\\n                  ctx.formData?.taskList[taskNum]?.awardRules[ruleLayer]\\n                    ?.orderNum,\\n                  1,\\n                  undefined\\n                );\\n              }\\n            }\\n          }\\n        }\\n      }\\n\\n      return true;\\n    },\\n  };\\n});\\n"},"fields":[{"field":"111","defaultValue":"","component":"BLMIntervalValue","operations":"{}","options":{"attrs":"(function (currentFileName, taskNum, ruleLayer) {\\n  // TODO 解析代码处理待优化\\n  const rewardRule = this.utils.findComponentsDownward(\\"rewardRule\\");\\n  const currentRuleLayer = rewardRule[taskNum]?.currentRuleData?.length; // 一共多少层\\n  const orderNumInfo = this.specialField.filter(\\n    (item) => item.relationField === \\"orderNum\\"\\n  )[0]; // 是否是拼单还是拼车单区间\\n\\n  const rewardUpperLimitOrderNum =\\n    this.formData.taskList[taskNum]?.rewardUpperLimitOrderNum;\\n\\n  /**\\n   * 当前层是否为最高层\\n   */\\n  const isHighest = () => {\\n    if (currentRuleLayer && (ruleLayer === 0 || ruleLayer)) {\\n      // 当前组件是否为最高层级\\n      if (currentRuleLayer - 1 === ruleLayer) {\\n        return true;\\n      } else {\\n        return false;\\n      }\\n    }\\n    return false;\\n  };\\n  if (orderNumInfo) {\\n    if (orderNumInfo.isInterval) {\\n      return {\\n        isRange: !isHighest() ? true : rewardUpperLimitOrderNum ? true : false,\\n        prefix: \\"第\\",\\n        suffix: isHighest() && !rewardUpperLimitOrderNum ? \\"单及以上 \\" : \\"单\\",\\n        maxLength: 3,\\n        max1: 999,\\n        min1: 1,\\n        max2: 999,\\n        min2: 1,\\n        precision: 0,\\n        dValue: 0,\\n        disabled2: !isHighest()\\n          ? true\\n          : rewardUpperLimitOrderNum\\n          ? true\\n          : false,\\n        \\"step-strictly\\": true,\\n      };\\n    } else {\\n      return {\\n        prefix: \\"\\",\\n        suffix: \\"单\\",\\n        isRange: false,\\n        maxLength: 3,\\n        max1: 999,\\n        min1: 1,\\n        max2: 999,\\n        min2: 1,\\n        precision: 0,\\n        \\"step-strictly\\": true,\\n      };\\n    }\\n  } else {\\n    return {\\n      prefix: \\"\\",\\n      suffix: \\"单\\",\\n      isRange: false,\\n      maxLength: 3,\\n      max1: 999,\\n      min2: 1,\\n      max2: 999,\\n      min1: 1,\\n      precision: 0,\\n      \\"step-strictly\\": true,\\n    };\\n  }\\n});\\n","rules":"(function (form, _, __, tag) {\\n  const { spAnalysisApp } = __;\\n  return [\\n    {\\n      validator: (rule, value, callback) => {\\n        if (!Array.isArray(value)) {\\n          return callback(new Error(\\"请填写完单量\\"));\\n        }\\n        if (value.length === 0) {\\n          return callback(new Error(\\"请填写完单量\\"));\\n        }\\n        if (!value[0]) {\\n          return callback(new Error(\\"请填写完单量\\"));\\n        }\\n\\n        if (value[1] && !value[0]) {\\n          return callback(new Error(\\"请填写完单量\\"));\\n        }\\n\\n        if ((value[0] && value[0] > 999) || (value[1] && value[1] > 999)) {\\n          debugger;\\n          return callback(new Error(\\"请检查数据范围\\"));\\n        }\\n        return callback();\\n      },\\n      trigger: \\"blur\\",\\n    },\\n    // {\\n    //   validator: (rule, value, callback) => {\\n    //     const { opinion = {} } = spAnalysisApp.cloud;\\n    //     const moment = spAnalysisApp.utils.moment;\\n    //     let realVal = null;\\n    //     if (value && value[1]) {\\n    //       realVal = value[1];\\n    //     } else {\\n    //       realVal = value[0];\\n    //     }\\n    //     // 周期任务\\n    //     if (form[\\"taskPeriod\\"] === 2 && form[\\"actTime\\"].length) {\\n    //       const start = moment(form[\\"actTime\\"][0]).date();\\n    //       const end = moment(form[\\"actTime\\"][1]).date();\\n    //       const duration = end - start + 1;\\n    //       if (Math.floor(realVal / duration) > opinion[\\"onThresholdNum\\"]) {\\n    //         return callback(\\n    //           `活动规则超出每日${opinion[\\"onThresholdNum\\"]}单上限值，可能造成引导司机疲劳驾驶的风险，建议针对指定人群的司机配置活动`\\n    //         );\\n    //       }\\n    //     }\\n\\n    //     // 每日任务\\n    //     if (form[\\"taskPeriod\\"] === 0 && +realVal > opinion[\\"onThresholdNum\\"]) {\\n    //       return callback(\\n    //         `活动规则超出每日${opinion[\\"onThresholdNum\\"]}单上限值，可能造成引导司机疲劳驾驶的风险，建议针对指定人群的司机配置活动`\\n    //       );\\n    //     }\\n    //     return callback();\\n    //   },\\n    //   trigger: \\"blur\\",\\n    // },\\n    {\\n      required: true,\\n      message: \\"请填写完单量\\",\\n      type: \\"array\\",\\n      trigger: \\"blur\\",\\n    },\\n  ];\\n});\\n","on":"(function() {\\n    return {}\\n})","interaction":"(function() {\\n    return {}\\n})","options":"[\\n]","special":"{\\n}"}}]}',
    'ruleConfig': null,
    'status': null,
    'description': null,
    'createByName': null,
    'gmtCreate': null,
    'updateByName': null,
    'gmtModified': null
  },
  {
    'id': 309,
    'name': null,
    'sceneId': 21,
    'sceneName': null,
    'componentConfig': '{"label":"皮肤选择","name":"selectSkin","alias":"","type":"chunk","operations":"(function() {\\n    return {}\\n})","options":{"interaction":"(function() {\\n    return {}\\n})"},"fields":[{"field":"241","defaultValue":"LGYXHD0002","hubbleDefaultValue":"(function(schema) {\\n    return null\\n})","component":"BLMRadioGroup","options":{"attrs":"(function () {\\n  return {\\n    height: \\"auto\\",\\n    width: 200,\\n    margin: 6,\\n  };\\n});\\n","rules":"(function() {\\n    return []\\n})","on":"(function() {\\n    return {}\\n})","interaction":"(function() {\\n    return {}\\n})","options":"[\\n]","special":"{\\n}","dataSrc":"(function () {\\n  return [];\\n});\\n","data":"[\\n  {\\n    label: \\"默认1\\",\\n    value: \\"LGYXHD0001\\",\\n    img: \\"https://cdntest.yueyuechuxing.cn/yueyue/admin/ops/daily/ops_static/img/skin1.44cd0ee.png\\",\\n  },\\n  {\\n    label: \\"默认2\\",\\n    value: \\"LGYXHD0002\\",\\n    img: \\"https://cdntest.yueyuechuxing.cn/yueyue/admin/ops/daily/ops_static/img/skin2.d56742f.png\\",\\n  },\\n];\\n"}}]}',
    'ruleConfig': null,
    'status': null,
    'description': null,
    'createByName': null,
    'gmtCreate': null,
    'updateByName': null,
    'gmtModified': null
  },
  {
    'id': 305,
    'name': null,
    'sceneId': 21,
    'sceneName': null,
    'componentConfig': "{\"label\":\"奖励上限\",\"name\":\"rewardUpperLimitMoney_v3\",\"type\":\"chunk\",\"operations\":\"((function() {\\n    return {\\n        maximumRewardLimitFe: {\\n            option: [-1,0,1]\\n        }\\n    }\\n}))\",\"options\":{\"interaction\":\"(function() {\\n    return {}\\n})\"},\"fields\":[{\"field\":\"305\",\"defaultValue\":\"\",\"hubbleDefaultValue\":\"(function(schema) {\\n    // 这里的data为哈勃筛选过后的最新data @zhangjie\\n    return [ schema.options.data[0].value ]\\n})\",\"component\":\"el-checkbox-group\",\"options\":{\"data\":\"[\\n  {\\n    'label': '不设上限',\\n    'value': -1,\\n    'mutex': true\\n  },\\n  {\\n    'label': '订单总量',\\n    'value': 0\\n  },\\n  {\\n    'label': '奖励总额',\\n    'value': 1\\n  },\\n  {\\n    'label': '每单奖励上限',\\n    'value': 2\\n  }\\n]\\n\",\"attrs\":\"(function() {\\n    return {\\n    }\\n})\",\"rules\":\"(function() {\\n    return [\\n        {\\n            required: true,\\n            type: 'array',\\n            min: 1,\\n            message: '请选择奖励上限',\\n            trigger: 'change'\\n        }\\n    ]\\n})\",\"on\":\"(function() {\\n    return {}\\n})\",\"interaction\":\"(function() {\\n  return {\\n    display: function(form, oldForm) {\\n      if (!Array.isArray(form.taskList) || form.taskList.length === 0) return false\\n\\n      const currentTargetData = form.taskList[0]\\n\\n      // 此原子状态发生改变时，需要执行清空逻辑\\n      if (currentTargetData.rewardUpperLimitOrderNum && !currentTargetData.maximumRewardLimitFe.includes(0)) {\\n        this.formData.taskList[0].rewardUpperLimitOrderNum = undefined\\n      }\\n\\n      if (currentTargetData.rewardUpperLimitMoney && !currentTargetData.maximumRewardLimitFe.includes(1)) {\\n        this.formData.taskList[0].rewardUpperLimitMoney = undefined\\n      }\\n\\n      if (currentTargetData.rewardUpperLimitPerOrderMoney && !currentTargetData.maximumRewardLimitFe.includes(2)) {\\n        this.formData.taskList[0].rewardUpperLimitPerOrderMoney = undefined\\n      }\\n      return true\\n    }\\n  }\\n})\\n\",\"options\":\"[\\n]\",\"special\":\"{\\n}\"}},{\"field\":\"313\",\"defaultValue\":\"\",\"hubbleDefaultValue\":\"(function(schema) {\\n    return null\\n})\",\"component\":\"span\",\"options\":{\"attrs\":\"(function () {\\n  const { getRelationChunk } = this.utils;\\n  const {\\n    options: { hubbleDescription },\\n  } = getRelationChunk(\\\"rewardUpperLimitMoney_v2\\\")[0];\\n\\n  let text = \\\"每日\\\";\\n\\n  if (hubbleDescription && hubbleDescription.includes(\\\"每日\\\")) {\\n    text = \\\"每日\\\";\\n  } else {\\n    text = \\\"活动周期内\\\";\\n  }\\n\\n  return {\\n    text: `${text}:     `,\\n    inline: true,\\n  };\\n});\\n\",\"rules\":\"(function() {\\n    return []\\n})\",\"on\":\"(function() {\\n    return {}\\n})\",\"interaction\":\"(function() {\\n    return {}\\n})\",\"options\":\"[\\n]\",\"special\":\"{\\n}\"}},{\"field\":\"315\",\"defaultValue\":\"\",\"hubbleDefaultValue\":\"(function(schema) {\\n    return null\\n})\",\"component\":\"span\",\"options\":{\"attrs\":\"(function() {\\n    return {\\n      text: \\\"无奖励上限\\\",\\n      inline: true\\n    }\\n})\",\"rules\":\"(function() {\\n    return []\\n})\",\"on\":\"(function() {\\n    return {}\\n})\",\"interaction\":\"(function() {\\n  return {\\n    display: function(form) {\\n      if (!Array.isArray(form.taskList) || form.taskList.length === 0) return false\\n      // 0,1,2,3 分别对应 不设上限、订单总量、订单总额、每单上限\\n\\n      return Array.isArray(form.taskList[0].maximumRewardLimitFe) && form.taskList[0].maximumRewardLimitFe.includes(-1)\\n    }\\n  }\\n})\",\"options\":\"[\\n]\",\"special\":\"{\\n}\"}},{\"field\":\"309\",\"defaultValue\":\"\",\"component\":\"el-input-number\",\"options\":{\"attrs\":\"(function () {\\n  const { getRelationChunk } = this.utils;\\n  const rewardPerOrderRangeData = getRelationChunk(\\\"rewardPerOrderRange_v2\\\");\\n  let text = \\\"最多奖励\\\";\\n\\n  if (rewardPerOrderRangeData.length > 0) {\\n    const schema = rewardPerOrderRangeData[0];\\n\\n    const { options } = schema;\\n    if (\\\"rewardPerOrderRangeMoney\\\" in options) {\\n      text = \\\"最多奖励到第\\\";\\n    }\\n  }\\n\\n  return {\\n    controls: false,\\n    min: 1,\\n    max: 999,\\n    prefix: text,\\n    suffix: \\\"单；\\\",\\n    precision: 0,\\n    inline: true,\\n  };\\n});\\n\",\"rules\":\"(function (_, __, ___, tag) {\\n  // @ gongzhen\\n  // 大于最高阶梯单量\\n  const { taskNum } = tag;\\n  const { spAnalysisApp } = ___;\\n  return [\\n    {\\n      validator: (rule, value, callback) => {\\n        const awardRules = this.formData.taskList[taskNum]?.awardRules;\\n        let realVal = null;\\n        let range = false;\\n\\n        if (value !== 0 && !value) {\\n          return callback(\\\"请填写订单总量\\\");\\n        }\\n\\n        if (awardRules.length > 0) {\\n          // 取最高层级完单量\\n          const orderNum = awardRules[awardRules.length - 1]?.orderNum;\\n          if (orderNum && orderNum[1]) {\\n            range = true;\\n            realVal = orderNum[1];\\n          } else {\\n            realVal = orderNum[0];\\n          }\\n        }\\n\\n        if (realVal && !range && value <= realVal) {\\n          return callback(\\\"单量上限需大于最高阶梯的单量\\\");\\n        }\\n        // 区间的值是系统设置的所以可以相等\\n        if (realVal && range && value < realVal) {\\n          return callback(\\\"单量上限需大于最高阶梯的单量\\\");\\n        }\\n        return callback();\\n      },\\n      trigger: \\\"blur\\\",\\n    },\\n    // {\\n    //   validator: (rule, value, callback) => {\\n    //     const { opinion = {} } = spAnalysisApp.cloud;\\n    //     const moment = spAnalysisApp.utils.moment;\\n    //     debugger;\\n    //     // 周期任务\\n    //     if (_[\\\"taskPeriod\\\"] === 2 && _[\\\"actTime\\\"].length) {\\n    //       const start = moment(_[\\\"actTime\\\"][0]).date();\\n    //       const end = moment(_[\\\"actTime\\\"][1]).date();\\n    //       const duration = end - start + 1;\\n    //       if (Math.floor(value / duration) > opinion[\\\"onThresholdNum\\\"]) {\\n    //         return callback(\\n    //           `活动规则超出每日${opinion[\\\"onThresholdNum\\\"]}单上限值，可能造成引导司机疲劳驾驶的风险，建议针对指定人群的司机配置活动`\\n    //         );\\n    //       }\\n    //     }\\n\\n    //     // 每日任务\\n    //     if (_[\\\"taskPeriod\\\"] === 0 && +value > opinion[\\\"onThresholdNum\\\"]) {\\n    //       return callback(\\n    //         `活动规则超出每日${opinion[\\\"onThresholdNum\\\"]}单上限值，可能造成引导司机疲劳驾驶的风险，建议针对指定人群的司机配置活动`\\n    //       );\\n    //     }\\n    //     return callback();\\n    //   },\\n    //   trigger: \\\"blur\\\",\\n    // },\\n    {\\n      required: true,\\n      type: \\\"number\\\",\\n      message: \\\"请填写订单总量\\\",\\n      trigger: \\\"blur\\\",\\n    },\\n  ];\\n});\\n\",\"on\":\"(function() {\\n    return {}\\n})\",\"interaction\":\"(function() {\\n  return {\\n    display: function(form) {\\n      if (!Array.isArray(form.taskList) || form.taskList.length === 0) return false\\n      // 0,1,2,3 分别对应 不设上限、订单总量、订单总额、每单上限\\n\\n      return Array.isArray(form.taskList[0].maximumRewardLimitFe) && form.taskList[0].maximumRewardLimitFe.includes(0)\\n    }\\n  }\\n})\",\"options\":\"[\\n]\",\"special\":\"{\\n}\"}},{\"field\":\"157\",\"defaultValue\":\"\",\"component\":\"el-input-number\",\"options\":{\"attrs\":\"(function() {\\n  return {\\n    controls: false,\\n    min: 0,\\n    max: 9999.99,\\n    precision: 2,\\n    prefix: '最多奖励',\\n    suffix: '元；',\\n    inline: true\\n  }\\n})\\n\",\"rules\":\"(function(_, __, ___, tag) {\\n  const orderNumInfo = this.specialField.filter(item => item.relationField === 'orderNum')[0] // 是否是拼单还是拼单奖区间\\n  const { taskNum } = tag\\n  return [\\n    {\\n      required: true,\\n      type: 'number',\\n      message: '请填写订单总额',\\n      trigger: 'blur'\\n    },\\n    {\\n      validator: (rule, value, callback) => {\\n        const awardRules = this.formData.taskList[taskNum]?.awardRules\\n\\n        // 拼单奖\\n        let realVal = null\\n        let finalMoney = null\\n        if (awardRules && awardRules.length > 0) {\\n          // 取最高层级完单量\\n          const orderNum = awardRules[awardRules.length - 1]?.orderNum\\n          finalMoney = awardRules[awardRules.length - 1]?.rewardPerOrderMoney\\n          if (orderNum[1]) {\\n            realVal = orderNum[1]\\n          } else {\\n            realVal = orderNum[0]\\n          }\\n        }\\n\\n        // 拼单奖区间 金额上限＞∑阶梯奖励总额\\n        const allMoney = []\\n        let finalMoney2 = null\\n        if (awardRules && awardRules.length > 0) {\\n          for (let i = 0; i < awardRules.length; i++) {\\n            const currentOrderNum = awardRules[i]?.orderNum\\n            const currentMoney = awardRules[i]?.rewardPerOrderRangeMoney\\n            if (i === awardRules.length - 1) {\\n              allMoney.push(currentOrderNum[0] * currentMoney)\\n            } else {\\n              allMoney.push((currentOrderNum[1] - currentOrderNum[0] + 1) * currentMoney)\\n            }\\n          }\\n        }\\n\\n        finalMoney2 = allMoney.reduce((pre, current) => current + pre, 0)\\n\\n        if (orderNumInfo && !orderNumInfo.isInterval) {\\n          // 拼单奖  奖励总额上限＞最高阶梯的每单奖励金额*最高阶梯的单量\\n          if (realVal && finalMoney && value <= Number((realVal * finalMoney).toPrecision(3))) {\\n            return callback('奖励总额上限需大于最高阶梯的每单奖励金额*最高阶梯的单量')\\n          }\\n        } else {\\n          //   金额上限＞∑阶梯奖励总额\\n          if (finalMoney2 && value <= finalMoney2) {\\n            return callback('金额上限需大于任意阶梯奖励总额总合')\\n          }\\n        }\\n\\n        return callback()\\n      },\\n      trigger: 'blur'\\n    }\\n  ]\\n})\\n\\n\",\"on\":\"(function() {\\n    return {}\\n})\",\"interaction\":\"(function() {\\n  return {\\n    display: function(form) {\\n      if (!Array.isArray(form.taskList) || form.taskList.length === 0) return false\\n      // 0,1,2,3 分别对应 不设上限、订单总量、订单总额、每单上限\\n\\n      return Array.isArray(form.taskList[0].maximumRewardLimitFe) && form.taskList[0].maximumRewardLimitFe.includes(1)\\n    }\\n  }\\n})\",\"options\":\"[\\n]\",\"special\":\"{\\n}\"}},{\"field\":\"311\",\"defaultValue\":\"\",\"component\":\"el-input-number\",\"options\":{\"attrs\":\"(function () {\\n    return {\\n        controls: false,\\n        min: 0,\\n        max: 9999.99,\\n        precision: 2,\\n        prefix: '每笔订单最多奖励',\\n        suffix: '元；',\\n        inline: true\\n    }\\n})\",\"rules\":\"(function() {\\n    return [\\n       {\\n      required: true,\\n      type: 'number',\\n      message: '请填写每单奖励上限',\\n      trigger: 'blur'\\n    }\\n    ]\\n})\",\"on\":\"(function() {\\n    return {}\\n})\",\"interaction\":\"(function() {\\n  return {\\n    display: function(form) {\\n      if (!Array.isArray(form.taskList) || form.taskList.length === 0) return false\\n      // 0,1,2,3 分别对应 不设上限、订单总量、订单总额、每单上限\\n\\n      return Array.isArray(form.taskList[0].maximumRewardLimitFe) && form.taskList[0].maximumRewardLimitFe.includes(2)\\n    }\\n  }\\n})\",\"options\":\"[\\n]\",\"special\":\"{\\n}\"}}]}",
    'ruleConfig': null,
    'status': null,
    'description': null,
    'createByName': null,
    'gmtCreate': null,
    'updateByName': null,
    'gmtModified': null
  },
  {
    'id': 291,
    'name': null,
    'sceneId': 21,
    'sceneName': null,
    'componentConfig': "{\"label\":\"完单量\",\"name\":\"orderNum_v2_test\",\"alias\":\"完成\",\"type\":\"chunk\",\"operations\":\"(function() {\\n    return {}\\n})\",\"options\":{\"interaction\":\"(function() {\\n  const ctx = this\\n  const orderNumInfo = this.specialField.filter(item => item.relationField === 'orderNum')[0] // 是否是拼车单还是拼车单区间\\n\\n  return {\\n    display: function(newFormData, oldFormData, tag) {\\n      if (orderNumInfo && orderNumInfo.isInterval) {\\n        if (tag) {\\n          const { ruleLayer, taskNum } = tag\\n          if (ruleLayer !== 0) {\\n            // 修改上一层级\\n            let nextValue = ctx.formData?.taskList[taskNum]?.awardRules[ruleLayer]?.orderNum[0]\\n            if (typeof nextValue === 'number') {\\n              nextValue = nextValue - 1\\n            } else {\\n              nextValue = undefined\\n            }\\n\\n            const firstValue = ctx.formData?.taskList[taskNum]?.awardRules[ruleLayer - 1]?.orderNum[0]\\n\\n            if (typeof nextValue === 'number' && firstValue > nextValue) {\\n              nextValue = firstValue + 1\\n              ctx.$set(ctx.formData?.taskList[taskNum].awardRules[ruleLayer]?.orderNum, 0, nextValue)\\n            }\\n\\n            ctx.$set(ctx.formData?.taskList[taskNum]?.awardRules[ruleLayer - 1]?.orderNum, 1, nextValue)\\n          }\\n        }\\n      }\\n\\n      return true\\n    }\\n  }\\n})\\n\\n\"},\"fields\":[{\"field\":\"111\",\"defaultValue\":\"\",\"component\":\"BLMIntervalValue\",\"options\":{\"attrs\":\"\\n(function(currentFileName, taskNum, ruleLayer) {\\n  // TODO 解析代码处理待优化\\n  const rewardRule = this.utils.findComponentsDownward('rewardRule')\\n  const currentRuleLayer = rewardRule[taskNum]?.currentRuleData?.length // 一共多少层\\n  const orderNumInfo = this.specialField.filter(item => item.relationField === 'orderNum')[0] // 是否是拼车单还是拼车单区间\\n\\n  /**\\n   * 当前层是否为最高层\\n   */\\n  const isHighest = () => {\\n    if (currentRuleLayer && (ruleLayer === 0 || ruleLayer)) {\\n      // 当前组件是否为最高层级\\n      if (currentRuleLayer - 1 === ruleLayer) {\\n        return true\\n      } else {\\n        return false\\n      }\\n    }\\n    return false\\n  }\\n\\n  if (orderNumInfo) {\\n    if (orderNumInfo.isInterval) {\\n      return {\\n        isRange: !isHighest(),\\n        suffix: isHighest() ? '单及以上; ' : '; ',\\n        maxLength: 3,\\n        max: 999,\\n        min: 1,\\n        precision: 0,\\n        disabled2: !isHighest(),\\n        'step-strictly': true\\n      }\\n    } else {\\n      return {\\n        suffix: '单',\\n        isRange: false,\\n        maxLength: 3,\\n        max: 999,\\n        min: 1,\\n        precision: 0,\\n        'step-strictly': true\\n      }\\n    }\\n  }\\n})\\n\",\"rules\":\"(function (form,_,__,tag) {\\n    const _self = this\\n    return [\\n        {\\n            validator: (rule, value,callback) => {\\n            if (!Array.isArray(value)) {\\n               return callback(new Error('请填写完单量'))\\n            }\\n            if (value.length === 0) {\\n                return callback(new Error('请填写完单量'))\\n            }\\n            if(!value[0]){\\n                return callback(new Error('请填写完单量'))\\n            }\\n            return callback()\\n            },\\n            trigger: 'blur'\\n        },\\n        {\\n            required: true,\\n            message: '请填写完单量',\\n            type: 'array',\\n            trigger: 'blur'\\n        }\\n       \\n    ]\\n})\",\"on\":\"(function() {\\n    return {}\\n})\",\"interaction\":\"(function() {\\n    return {}\\n})\",\"options\":\"[\\n]\",\"special\":\"{\\n}\"}}]}",
    'ruleConfig': null,
    'status': null,
    'description': null,
    'createByName': null,
    'gmtCreate': null,
    'updateByName': null,
    'gmtModified': null
  },
  {
    'id': 289,
    'name': null,
    'sceneId': 21,
    'sceneName': null,
    'componentConfig': "{\"label\":\"每单奖励\",\"name\":\"rewardPerOrder_v2_test\",\"alias\":\"\",\"type\":\"chunk\",\"operations\":\"(function() {\\n    return {}\\n})\",\"options\":{\"interaction\":\"(function() {\\n    return {}\\n})\"},\"fields\":[{\"field\":\"149\",\"defaultValue\":\"\",\"component\":\"el-input-number\",\"options\":{\"attrs\":\"(function(currentFileName) {\\n  debugger\\n  if (currentFileName && currentFileName === 'rewardPerOrderPercentage') {\\n    return {\\n      suffix: '%',\\n      width: '200px',\\n      controls: false,\\n      max: 100,\\n      precision: 2,\\n      min: 1\\n    }\\n  } else {\\n    return {\\n      suffix: '元',\\n      width: '200px',\\n      controls: false,\\n      max: 9999,\\n      precision: 2,\\n      min: 0\\n    }\\n  }\\n})\\n\",\"rules\":\"(function() {\\n  // 勿动 @gongzhen\\n  return [\\n    {\\n      required: true,\\n      type: 'number',\\n      message: '请填写每单奖励',\\n      trigger: 'blur'\\n    },\\n    {\\n      validator: (rule, value, callback) => {\\n        const fract = (num) => {\\n          return num - Math.trunc(num)\\n        }\\n        if (!value) {\\n          return callback(new Error('请填写每单奖励'))\\n        }\\n\\n        if (value < 0) {\\n          return callback(new Error('数据格式只能为正数'))\\n        }\\n        if (value > 100000) {\\n          return callback(new Error('小数点前至多4位'))\\n        }\\n\\n        // if (!/^[0-9]+$/.test(fract(value) * 100)) {\\n        //   return callback(new Error('小数点后至多2位'))\\n        // }\\n\\n        return callback()\\n      }\\n\\n    }\\n  ]\\n})\",\"on\":\"(function() {\\n    return {}\\n})\",\"interaction\":\"(function() {\\n    return {}\\n})\",\"options\":\"[\\n    {\\n      label: '1.奖项',\\n      value: 0,\\n      key: 'rewards',\\n      descrition: '',\\n      type: 'BlmBizFormRadioGroup',\\n      props: {\\n        options: [\\n          {\\n            label: '固定金额',\\n            value: 0\\n          },\\n          {\\n            label: '流水提成',\\n            value: 1\\n          }\\n        ]\\n      }\\n    },\\n     {\\n      label: '2.奖励上限',\\n      value: [-1,0,1,2],\\n      key: 'rewardsUpperLimit',\\n      description: '',\\n      type: 'BlmBizCheckboxGroup',\\n       linkage: {\\n            key: 'rewards',\\n            condition: function(value, form) {\\n                return value === 1\\n            },\\n      },\\n      props: {\\n         min: 1,\\n        options: [\\n          { label: '不设上限', value: -1 },\\n          { label: '订单总量', value: 0 },\\n          { label: '奖励总额', value: 1 },\\n          { label: '每单奖励上限', value: 2 }\\n        ]\\n      }\\n    },\\n    {\\n      label: '2.奖励上限',\\n      value: [-1,0,1],\\n      key: 'rewardsUpperLimit',\\n      description: '',\\n      type: 'BlmBizCheckboxGroup',\\n       linkage: {\\n            key: 'rewards',\\n            condition: function(value, form) {\\n                return value === 0\\n            },\\n      },\\n      props: {\\n        min: 1,\\n        options: [\\n          { label: '不设上限', value: -1 },\\n          { label: '订单总量', value: 0 },\\n          { label: '奖励总额', value: 1 },\\n        ]\\n      }\\n    }   \\n]\\n  \",\"special\":\"{\\n}\"}}]}",
    'ruleConfig': null,
    'status': null,
    'description': null,
    'createByName': null,
    'gmtCreate': null,
    'updateByName': null,
    'gmtModified': null
  },
  {
    'id': 287,
    'name': null,
    'sceneId': 21,
    'sceneName': null,
    'componentConfig': "{\"label\":\"奖励上限\",\"name\":\"rewardUpperLimitMoney_v2_test\",\"alias\":\"\",\"type\":\"chunk\",\"operations\":\"(function() {\\n    return {}\\n})\",\"options\":{\"interaction\":\"(function() {\\n    return {}\\n})\"},\"fields\":[{\"field\":\"305\",\"defaultValue\":\"[-1]\",\"component\":\"el-checkbox-group\",\"options\":{\"data\":\"[\\n  {\\n    'label': '不设上限',\\n    'value': -1,\\n    'mutex': true\\n  },\\n  {\\n    'label': '订单总量',\\n    'value': 0\\n  },\\n  {\\n    'label': '奖励总额',\\n    'value': 1\\n  },\\n  {\\n    'label': '每单奖励上限',\\n    'value': 2\\n  }\\n]\\n\",\"attrs\":\"(function() {\\n    return {\\n         min: 1\\n    }\\n})\",\"rules\":\"(function() {\\n    return {}\\n})\",\"on\":\"(function() {\\n    return {}\\n})\",\"interaction\":\"(function() {\\n  \\n  return {\\n    display: function(form, oldForm) {\\n      if (!Array.isArray(form.taskList) || form.taskList.length === 0) return false\\n\\n      const currentTargetData = form.taskList[0]\\n\\n      // 此原子状态发生改变时，需要执行清空逻辑\\n      if (currentTargetData.rewardUpperLimitOrderNum && !currentTargetData.maximumRewardLimitFe.includes(0)) {\\n        this.formData.taskList[0].rewardUpperLimitOrderNum = undefined\\n      }\\n\\n      if (currentTargetData.rewardUpperLimitMoney && !currentTargetData.maximumRewardLimitFe.includes(1)) {\\n        this.formData.taskList[0].rewardUpperLimitMoney = undefined\\n      }\\n\\n      if (currentTargetData.rewardUpperLimitPerOrderMoney && !currentTargetData.maximumRewardLimitFe.includes(2)) {\\n        this.formData.taskList[0].rewardUpperLimitPerOrderMoney = undefined\\n      }\\n      return true\\n    }\\n  }\\n})\\n\",\"options\":\"[\\n]\",\"special\":\"{\\n}\"}},{\"field\":\"309\",\"defaultValue\":\"\",\"component\":\"el-input-number\",\"options\":{\"attrs\":\"(function() {\\n    return {\\n        controls: false,\\n        min:1,\\n        prefix: '最多奖励',\\n        suffix: '单；',\\n        inline: true\\n    }\\n})\",\"rules\":\"(function() {\\n    return {}\\n})\",\"on\":\"(function() {\\n    return {}\\n})\",\"interaction\":\"(function() {\\n  return {\\n    display: function(form) {\\n      if (!Array.isArray(form.taskList) || form.taskList.length === 0) return false\\n      // 0,1,2,3 分别对应 不设上限、订单总量、订单总额、每单上限\\n\\n      return Array.isArray(form.taskList[0].maximumRewardLimitFe) && form.taskList[0].maximumRewardLimitFe.includes(0)\\n    }\\n  }\\n})\",\"options\":\"[\\n]\",\"special\":\"{\\n}\"}},{\"field\":\"157\",\"defaultValue\":\"\",\"component\":\"el-input-number\",\"options\":{\"attrs\":\"(function() {\\n    return {\\n        controls: false,\\n        min:1,\\n        prefix: '最多奖励',\\n        suffix: '元；',\\n        inline: true\\n    }\\n})\",\"rules\":\"(function() {\\n    return {}\\n})\",\"on\":\"(function() {\\n    return {}\\n})\",\"interaction\":\"(function() {\\n  return {\\n    display: function(form) {\\n      if (!Array.isArray(form.taskList) || form.taskList.length === 0) return false\\n      // 0,1,2,3 分别对应 不设上限、订单总量、订单总额、每单上限\\n\\n      return Array.isArray(form.taskList[0].maximumRewardLimitFe) && form.taskList[0].maximumRewardLimitFe.includes(1)\\n    }\\n  }\\n})\",\"options\":\"[\\n]\",\"special\":\"{\\n}\"}},{\"field\":\"311\",\"defaultValue\":\"\",\"component\":\"el-input-number\",\"options\":{\"attrs\":\"(function() {\\n    return {\\n        controls: false,\\n        min:1,\\n        prefix: '每笔订单最多奖励',\\n        suffix: '元；',\\n        inline: true\\n    }\\n})\",\"rules\":\"(function() {\\n    return {}\\n})\",\"on\":\"(function() {\\n    return {}\\n})\",\"interaction\":\"(function() {\\n  return {\\n    display: function(form) {\\n      if (!Array.isArray(form.taskList) || form.taskList.length === 0) return false\\n      // 0,1,2,3 分别对应 不设上限、订单总量、订单总额、每单上限\\n\\n      return Array.isArray(form.taskList[0].maximumRewardLimitFe) && form.taskList[0].maximumRewardLimitFe.includes(2)\\n    }\\n  }\\n})\",\"options\":\"[\\n]\",\"special\":\"{\\n}\"}}]}",
    'ruleConfig': null,
    'status': null,
    'description': null,
    'createByName': null,
    'gmtCreate': null,
    'updateByName': null,
    'gmtModified': null
  },
  {
    'id': 285,
    'name': null,
    'sceneId': 21,
    'sceneName': null,
    'componentConfig': "{\"label\":\"每单奖励\",\"name\":\"rewardPerOrderRange_v2_test\",\"alias\":\"\",\"type\":\"chunk\",\"operations\":\"(function() {\\n    return {}\\n})\",\"options\":{\"interaction\":\"(function() {\\n    return {}\\n})\"},\"fields\":[{\"field\":\"151\",\"defaultValue\":\"\",\"component\":\"el-input-number\",\"options\":{\"attrs\":\"(function(currentFileName) {\\n  const base = {\\n    width: '200px',\\n    controls: false\\n  }\\n  if (currentFileName) {\\n    if (currentFileName === 'rewardPerOrderRangePercentage') {\\n      return {\\n        ...base,\\n        suffix: 'ceshi'\\n      }\\n    }\\n  } else {\\n    return {\\n      ...base,\\n      suffix: '元',\\n      width: '200px',\\n      controls: false,\\n      min: 1\\n    }\\n  }\\n})\\n\\n\",\"rules\":\"(function() {\\n  // 勿动 @gongzhen\\n  return [\\n    {\\n      required: true,\\n      type: 'number',\\n      message: '请填写每单奖励',\\n      trigger: 'blur'\\n    },\\n    {\\n      validator: (rule, value, callback) => {\\n        const fract = (num) => {\\n          return num - Math.trunc(num)\\n        }\\n        if (!value) {\\n          return callback(new Error('请填写每单奖励'))\\n        }\\n\\n        if (value < 0) {\\n          return callback(new Error('数据格式只能为正数'))\\n        }\\n        if (value > 100000) {\\n          return callback(new Error('小数点前至多4位'))\\n        }\\n\\n        // if (!/^[0-9]+$/.test(fract(value) * 100)) {\\n        //   return callback(new Error('小数点后至多2位'))\\n        // }\\n\\n        return callback()\\n      }\\n\\n    }\\n  ]\\n})\",\"on\":\"(function() {\\n    return {}\\n})\",\"interaction\":\"(function() {\\n    return {}\\n})\",\"options\":\"[\\n    {\\n      label: '1.奖项',\\n      value: 0,\\n      key: 'rewards',\\n      descrition: '',\\n      type: 'BlmBizFormRadioGroup',\\n      props: {\\n        options: [\\n          {\\n            label: '固定金额',\\n            value: 0\\n          },\\n          {\\n            label: '流水提成',\\n            value: 1\\n          }\\n        ]\\n      }\\n    },\\n    {\\n      label: '2.奖励上限',\\n      value: [-1,0,1],\\n      key: 'rewardsUpperLimit',\\n      description: '',\\n      type: 'BlmBizCheckboxGroup',\\n       linkage: {\\n            key: 'rewards',\\n            condition: function(value, form) {\\n                return value === 0\\n            },\\n      },\\n      props: {\\n        min: 1,\\n        options: [\\n          { label: '不设上限', value: -1 },\\n          { label: '订单总量', value: 0 },\\n          { label: '奖励总额', value: 1 },\\n        ]\\n      }\\n    },\\n    {\\n      label: '2.奖励上限',\\n      value: [-1,0,1,2],\\n      key: 'rewardsUpperLimit',\\n      description: '',\\n      type: 'BlmBizCheckboxGroup',\\n       linkage: {\\n            key: 'rewards',\\n            condition: function(value, form) {\\n                return value === 1\\n            },\\n      },\\n      props: {\\n        min: 1,\\n        options: [\\n          { label: '不设上限', value: -1 },\\n          { label: '订单总量', value: 0 },\\n          { label: '奖励总额', value: 1 },\\n          { label: '每单奖励上限', value: 2 }\\n        ]\\n      }\\n    }\\n  ]\\n  \",\"special\":\"{\\n}\"}}]}",
    'ruleConfig': null,
    'status': null,
    'description': null,
    'createByName': null,
    'gmtCreate': null,
    'updateByName': null,
    'gmtModified': null
  },
  {
    'id': 283,
    'name': null,
    'sceneId': 21,
    'sceneName': null,
    'componentConfig': "{\"label\":\"每单奖励\",\"name\":\"rewardPerOrderRange_stag2\",\"alias\":\"\",\"type\":\"chunk\",\"operations\":\"(function() {\\n    return {}\\n})\",\"options\":{\"interaction\":\"(function() {\\n    return {}\\n})\"},\"fields\":[{\"field\":\"151\",\"defaultValue\":\"\",\"component\":\"el-input-number\",\"options\":{\"attrs\":\"(function() {\\n    return {\\n        suffix: '元',\\n        width: '200px',\\n        controls: false,\\n        min: 1\\n    }\\n})\",\"rules\":\"(function() {\\n    return {}\\n})\",\"on\":\"(function() {\\n    return {}\\n})\",\"interaction\":\"(function() {\\n    return {}\\n})\",\"options\":\"[\\n    {\\n      label: '1.奖项',\\n      value: 0,\\n      key: 'rewards',\\n      descrition: '',\\n      type: 'BlmBizFormRadioGroup',\\n      props: {\\n        options: [\\n          {\\n            label: '固定金额',\\n            value: 0\\n          },\\n          {\\n            label: '流水提成',\\n            value: 1\\n          }\\n        ]\\n      }\\n    },\\n    {\\n      label: '2.奖励上限',\\n      value: [-1,0,1],\\n      key: 'rewardsUpperLimit',\\n      description: '',\\n      type: 'BlmBizCheckboxGroup',\\n       linkage: {\\n            key: 'rewards',\\n            condition: function(value, form) {\\n                return value == 0\\n            },\\n      },\\n      props: {\\n        min: 1,\\n        options: [\\n          { label: '不设上限', value: -1 },\\n          { label: '订单总量', value: 0 },\\n          { label: '奖励总额', value: 1 },\\n        ]\\n      }\\n    },\\n    {\\n      label: '2.奖励上限',\\n      value: [-1,0,1,2],\\n      key: 'rewardsUpperLimit',\\n      description: '',\\n      type: 'BlmBizCheckboxGroup',\\n       linkage: {\\n            key: 'rewards',\\n            condition: function(value, form) {\\n                return value == 1\\n            },\\n      },\\n      props: {\\n        min: 1,\\n        options: [\\n          { label: '不设上限', value: -1 },\\n          { label: '订单总量', value: 0 },\\n          { label: '奖励总额', value: 1 },\\n          { label: '每单奖励上限', value: 2 }\\n        ]\\n      }\\n    }\\n  ]\\n  \",\"special\":\"{\\n}\"}}]}",
    'ruleConfig': null,
    'status': null,
    'description': null,
    'createByName': null,
    'gmtCreate': null,
    'updateByName': null,
    'gmtModified': null
  },
  {
    'id': 273,
    'name': null,
    'sceneId': 21,
    'sceneName': null,
    'componentConfig': "{\"label\":\"活动周期内最多奖励\",\"name\":\"rewardUpperLimitMoney_stag2\",\"alias\":\"\",\"type\":\"chunk\",\"operations\":\"(function() {\\n    return {}\\n})\",\"options\":{\"interaction\":\"(function() {\\n    return {}\\n})\"},\"fields\":[{\"field\":\"157\",\"defaultValue\":\"\",\"component\":\"el-input-number\",\"options\":{\"attrs\":\"(function() {\\n    return {\\n        controls: false,\\n        min:1,\\n        suffix: '单'\\n    }\\n})\",\"rules\":\"(function() {\\n    return {}\\n})\",\"on\":\"(function() {\\n    return {}\\n})\",\"interaction\":\"(function() {\\n    return {}\\n})\",\"options\":\"[\\n]\",\"special\":\"{\\n}\"}}]}",
    'ruleConfig': null,
    'status': null,
    'description': null,
    'createByName': null,
    'gmtCreate': null,
    'updateByName': null,
    'gmtModified': null
  },
  {
    'id': 269,
    'name': null,
    'sceneId': 21,
    'sceneName': null,
    'componentConfig': "{\"label\":\"完成\",\"name\":\"orderNum_stag2\",\"alias\":\"\",\"type\":\"chunk\",\"operations\":\"(function() {\\n    return {}\\n})\",\"options\":{\"interaction\":\"(function() {\\n    return {}\\n})\"},\"fields\":[{\"field\":\"111\",\"defaultValue\":\"\",\"component\":\"BLMIntervalValue\",\"options\":{\"attrs\":\"(function() {\\n    return {\\n        suffix: '单',\\n        isRange: false,\\n        maxLength: 3,\\n        max: 999,\\n        min: 1,\\n        precision: 0,\\n        'step-strictly': true\\n    }\\n})\",\"rules\":\"(function(form) {\\n  // 勿动 @gongzhen\\n  return [\\n    {\\n      validator: (rule, value, callback) => {\\n        if (!Array.isArray(value) || value.includes(void 0) || value.length === 0) {\\n          return callback(new Error('请填写完单量'))\\n        }\\n        if (Array.isArray(value)) {\\n          // 一期先处理一个区间\\n          const flag = /^[0-9]+$/.test(value[0])\\n          if (!flag) {\\n            return callback(new Error('数据格式为正整数'))\\n          }\\n          if (value[0] < 1) {\\n            return callback(new Error('数据必须大于等于1'))\\n          }\\n          if (value[0] > 10000) {\\n            return callback(new Error('数据限制为3位'))\\n          }\\n        }\\n        return callback()\\n      }\\n    },\\n    {\\n      required: true,\\n      message: '请填写完单量',\\n      type: 'array'\\n    }\\n  ]\\n})\",\"on\":\"(function() {\\n    return {}\\n})\",\"interaction\":\"(function() {\\n    return {}\\n})\",\"options\":\"[\\n]\",\"special\":\"{\\n}\"}}]}",
    'ruleConfig': null,
    'status': null,
    'description': null,
    'createByName': null,
    'gmtCreate': null,
    'updateByName': null,
    'gmtModified': null
  },
  {
    'id': 267,
    'name': null,
    'sceneId': 21,
    'sceneName': null,
    'componentConfig': "{\"label\":\"每单奖励\",\"name\":\"rewardPerOrder_stag2\",\"alias\":\"\",\"type\":\"chunk\",\"operations\":\"(function() {\\n    return {}\\n})\",\"options\":{\"interaction\":\"(function() {\\n    return {}\\n})\"},\"fields\":[{\"field\":\"153\",\"defaultValue\":\"\",\"component\":\"el-input-number\",\"options\":{\"attrs\":\"(function() {\\n    return {\\n        suffix: '元',\\n        width: '200px',\\n        controls: false,\\n        max: 9999,\\n        precision:2,\\n        min: 0\\n    }\\n})\",\"rules\":\"(function() {\\n  // 勿动 @gongzhen\\n  return [\\n    {\\n      required: true,\\n      type: 'number',\\n      message: '请填写每单奖励',\\n      trigger: 'blur'\\n    },\\n    {\\n      validator: (rule, value, callback) => {\\n        const fract = (num) => {\\n          return num - Math.trunc(num)\\n        }\\n        if (!value) {\\n          return callback(new Error('请填写每单奖励'))\\n        }\\n\\n        if (value < 0) {\\n          return callback(new Error('数据格式只能为正数'))\\n        }\\n        if (value > 100000) {\\n          return callback(new Error('小数点前至多4位'))\\n        }\\n\\n        // if (!/^[0-9]+$/.test(fract(value) * 100)) {\\n        //   return callback(new Error('小数点后至多2位'))\\n        // }\\n\\n        return callback()\\n      }\\n\\n    }\\n  ]\\n})\",\"on\":\"(function() {\\n    return {}\\n})\",\"interaction\":\"(function() {\\n    return {}\\n})\",\"options\":\"[\\n  {\\n    label: '1.奖项',\\n    value: 0,\\n    key: 'rewards',\\n    descrition: '',\\n    type: 'BlmBizFormRadioGroup',\\n    props: {\\n      options: [\\n        {\\n          label: '固定金额',\\n          value: 0\\n        },\\n        {\\n          label: '流水提成',\\n          value: 1\\n        }\\n      ]\\n    }\\n  },\\n  {\\n    label: '2.奖励上限',\\n    value: [-1,0,1],\\n    key: 'rewardsUpperLimit',\\n    description: '',\\n    type: 'BlmBizFormCheckboxGroup',\\n    props: {\\n      options: [\\n        { label: '不设上限', value: -1 },\\n        { label: '订单总量', value: 0 },\\n        { label: '奖励总额', value: 1 }\\n      ]\\n    }\\n  }\\n]\",\"special\":\"{\\n}\"}}]}",
    'ruleConfig': null,
    'status': null,
    'description': null,
    'createByName': null,
    'gmtCreate': null,
    'updateByName': null,
    'gmtModified': null
  },
  {
    'id': 0,
    'name': null,
    'sceneId': 21,
    'sceneName': null,
    'componentConfig': "{\"label\":\"每单奖励\",\"name\":\"rewardPerOrderRange\",\"alias\":\"\",\"type\":\"chunk\",\"operations\":\"(function() {\\n    return {}\\n})\",\"options\":{\"interaction\":\"(function() {\\n    return {}\\n})\"},\"fields\":[{\"field\":\"151\",\"defaultValue\":\"\",\"component\":\"el-input-number\",\"options\":{\"attrs\":\"(function(currentFileName) {\\n    return {\\n        suffix: '元',\\n        width: '200px',\\n        controls: false,\\n        min: 1\\n    }\\n})\",\"rules\":\"(function() {\\n    return []\\n})\",\"on\":\"(function() {\\n    return {}\\n})\",\"interaction\":\"(function() {\\n    return {}\\n})\",\"options\":\"[\\n    {\\n      label: '1.奖项',\\n      value: 0,\\n      key: 'rewards',\\n      descrition: '',\\n      type: 'BlmBizFormRadioGroup',\\n      props: {\\n        options: [\\n          {\\n            label: '固定金额',\\n            value: 0\\n          },\\n          {\\n            label: '流水提成',\\n            value: 1\\n          }\\n        ]\\n      }\\n    },\\n    {\\n      label: '2.奖励上限',\\n      value: [-1,0,1,2],\\n      key: 'rewardsUpperLimit',\\n      description: '',\\n      type: 'BlmBizCheckboxGroup',\\n       linkage: {\\n            key: 'rewards',\\n            condition: function(value, form) {\\n                return value === 1\\n            },\\n      },\\n      props: {\\n        min: 1,\\n        options: [\\n          { label: '不设上限', value: -1 },\\n          { label: '订单总量', value: 0 },\\n          { label: '奖励总额', value: 1 },\\n          { label: '每单奖励上限', value: 2 }\\n        ]\\n      }\\n    },\\n     {\\n      label: '2.奖励上限',\\n      value: [-1,0,1],\\n      key: 'rewardsUpperLimit',\\n      description: '',\\n      type: 'BlmBizCheckboxGroup',\\n       linkage: {\\n            key: 'rewards',\\n            condition: function(value, form) {\\n                return value === 0\\n            },\\n      },\\n      props: {\\n        min: 1,\\n        options: [\\n          { label: '不设上限', value: -1 },\\n          { label: '订单总量', value: 0 },\\n          { label: '奖励总额', value: 1 },\\n        ]\\n      }\\n    }\\n  ]\\n  \",\"special\":\"{\\n}\"}}]}",
    'ruleConfig': null,
    'status': null,
    'description': null,
    'createByName': null,
    'gmtCreate': null,
    'updateByName': null,
    'gmtModified': null
  },
  {
    'id': 275,
    'name': null,
    'sceneId': 21,
    'sceneName': null,
    'componentConfig': "{\"label\":\"每单奖励\",\"name\":\"rewardPerOrderRange_v2\",\"alias\":\"\",\"type\":\"chunk\",\"operations\":\"(function() {\\n    return {\\n        rewardPerOrderRange: {\\n            rewards: 0,\\n            rewardsUpperLimit: [-1, 0, 1]\\n        }\\n    }\\n})\",\"options\":{\"interaction\":\"(function() {\\n    return {}\\n})\"},\"fields\":[{\"field\":\"151\",\"defaultValue\":\"\",\"component\":\"el-input-number\",\"options\":{\"attrs\":\"(function(currentFileName) {\\n  // debugger\\n  if (currentFileName === 'rewardPerOrderRangePercentage') {\\n    return {\\n      suffix: '%',\\n      width: '200px',\\n      controls: false,\\n      max: 99,\\n      min: 1,\\n      precision: 0\\n    }\\n  }\\n   return {\\n        suffix: '元',\\n        width: '200px',\\n        controls: false,\\n        max: 9999,\\n        precision:2,\\n        min: 0,\\n        warning: \\\"${  selfValue >= 50  ? '*该配置可能有误，请检查并确认（此提示只为防止错配，不影响编辑提交）' : '' }\\\"\\n      }\\n  \\n})\\n\\n\",\"rules\":\"(function() {\\n  // 勿动 @gongzhen\\n  return [\\n    {\\n      required: true,\\n      type: 'number',\\n      message: '请填写每单奖励',\\n      trigger: 'blur'\\n    },\\n    {\\n      validator: (rule, value, callback) => {\\n        const fract = (num) => {\\n          return num - Math.trunc(num)\\n        }\\n        if (!value) {\\n          return callback(new Error('请填写每单奖励'))\\n        }\\n\\n        if (value < 0) {\\n          return callback(new Error('数据格式只能为正数'))\\n        }\\n        if (value > 100000) {\\n          return callback(new Error('小数点前至多4位'))\\n        }\\n\\n        // if (!/^[0-9]+$/.test(fract(value) * 100)) {\\n        //   return callback(new Error('小数点后至多2位'))\\n        // }\\n\\n        return callback()\\n      }\\n\\n    }\\n  ]\\n})\",\"on\":\"(function() {\\n    return {}\\n})\",\"interaction\":\"(function() {\\n    return {}\\n})\",\"options\":\"[\\n    {\\n      label: '1.奖项',\\n      value: 0,\\n      key: 'rewards',\\n      descrition: '',\\n      type: 'BlmBizFormRadioGroup',\\n      props: {\\n        options: [\\n          {\\n            label: '固定金额',\\n            value: 0\\n          },\\n          {\\n            label: '流水提成',\\n            value: 1\\n          }\\n        ]\\n      }\\n    },\\n    {\\n      label: '2.奖励上限',\\n      value: [-1,0,1],\\n      key: 'rewardsUpperLimit',\\n      description: '',\\n      type: 'BlmBizCheckboxGroup',\\n       linkage: {\\n            key: 'rewards',\\n            condition: function(value, form) {\\n                return value === 0\\n            },\\n      },\\n      props: {\\n        min: 1,\\n        options: [\\n          { label: '不设上限', value: -1 },\\n          { label: '订单总量', value: 0 },\\n          { label: '奖励总额', value: 1 },\\n        ]\\n      }\\n    },\\n    {\\n      label: '2.奖励上限',\\n      value: [-1,1,2],\\n      key: 'rewardsUpperLimit',\\n      description: '',\\n      type: 'BlmBizCheckboxGroup',\\n       linkage: {\\n            key: 'rewards',\\n            condition: function(value, form) {\\n                return value === 1\\n            },\\n      },\\n      props: {\\n        min: 1,\\n        options: [\\n          { label: '不设上限', value: -1 },\\n          // { label: '订单总量', value: 0 },\\n          { label: '奖励总额', value: 1 },\\n          { label: '每单奖励上限', value: 2 }\\n        ]\\n      }\\n    }\\n  ]\\n  \",\"special\":\"{\\n}\"}}]}",
    'ruleConfig': null,
    'status': null,
    'description': null,
    'createByName': null,
    'gmtCreate': null,
    'updateByName': null,
    'gmtModified': null
  },
  {
    'id': 265,
    'name': null,
    'sceneId': 21,
    'sceneName': null,
    'componentConfig': "{\"label\":\"动态数据取用方式\",\"name\":\"dynamicDriverTagType\",\"type\":\"chunk\",\"operations\":\"(function() {\\n    return {}\\n})\",\"options\":{\"interaction\":\"(function() {\\n  return {\\n    display: function(newValue, oldValue) {\\n      let displayByDriverTag = false\\n\\n      if (!oldValue || newValue.driverTag !== oldValue?.driverTag) {\\n        const driverTag = this.utils.findComponentsDownward('driverTag')\\n        const selectedParams = driverTag && driverTag[0] && driverTag[0].$children && driverTag[0].$children[0] && driverTag[0].$children[0].selectedParams || {}\\n\\n        displayByDriverTag = (selectedParams && selectedParams.label && selectedParams.label.indexOf('动') === 0) || false\\n        const isStaticDriverTag = (selectedParams && selectedParams.label && (selectedParams.label.indexOf('静') === 0 || selectedParams.label.indexOf('所有') === 0))\\n        if (isStaticDriverTag) {\\n          this.$delete(this.formData, 'dynamicDriverTagType')\\n        }\\n        if (displayByDriverTag) {\\n          return displayByDriverTag\\n        }\\n      }\\n\\n      const isHaveCurrentValue = this.formData?.dynamicDriverTagType\\n      const displayBySelf = isHaveCurrentValue || false\\n      return !!displayBySelf\\n    }\\n  }\\n})\\n\\n\"},\"fields\":[{\"field\":\"307\",\"defaultValue\":\"\",\"component\":\"el-radio-group\",\"options\":{\"data\":\"[\\n{\\n  value: 2,\\n  label: '有进有出'\\n},\\n{\\n  value: 1,\\n  label: '只进不出'\\n}\\n]\",\"attrs\":\"(function (currentFileName) {\\n    return {\\n        describe: () => {\\n            let text = null\\n            if (this.formData[currentFileName] === 1) {\\n                text = '您选择了“只进不出”，根据筛选条件，每日更新司机数据时，新增符合条件的司机会被圈入，即可以查看和参加活动，但不影响已经参加活动的司机的查看获得奖励'\\n            } else {\\n                text = '选择了“有进不出”，根据筛选条件，每日更新司机数据时，新增符合条件的司机会被圈入，不符合条件的司机会被删除，被删除的司机将无法查看和参与活动，也无法获得奖励'\\n            }\\n            return `<span style=\\\"color:red\\\"> ${text} </span>`\\n        }\\n    }\\n})\\n\",\"rules\":\"(function() {\\n    return []\\n})\",\"on\":\"(function() {\\n    return {}\\n})\",\"interaction\":\"(function() {\\n  return {\\n   \\n  }\\n})\",\"options\":\"[\\n]\",\"special\":\"{\\n}\"}}]}",
    'ruleConfig': null,
    'status': null,
    'description': null,
    'createByName': null,
    'gmtCreate': null,
    'updateByName': null,
    'gmtModified': null
  },
  {
    'id': 277,
    'name': null,
    'sceneId': 21,
    'sceneName': null,
    'componentConfig': "{\"label\":\"奖励上限\",\"name\":\"rewardUpperLimitMoney_v2\",\"type\":\"chunk\",\"operations\":\"((function() {\\n    return {\\n        maximumRewardLimitFe: {\\n            option: [-1,0,1]\\n        }\\n    }\\n}))\",\"options\":{\"interaction\":\"(function() {\\n    return {}\\n})\"},\"fields\":[{\"field\":\"305\",\"defaultValue\":\"\",\"hubbleDefaultValue\":\"(function(schema) {\\n    // 这里的data为哈勃筛选过后的最新data @zhangjie\\n    return [ schema.options.data[0].value ]\\n})\",\"component\":\"el-checkbox-group\",\"options\":{\"data\":\"[\\n  {\\n    'label': '不设上限',\\n    'value': -1,\\n    'mutex': true\\n  },\\n  {\\n    'label': '订单总量',\\n    'value': 0\\n  },\\n  {\\n    'label': '奖励总额',\\n    'value': 1\\n  },\\n  {\\n    'label': '每单奖励上限',\\n    'value': 2\\n  }\\n]\\n\",\"attrs\":\"(function() {\\n    return {\\n    }\\n})\",\"rules\":\"(function() {\\n    return [\\n        {\\n            required: true,\\n            type: 'array',\\n            min: 1,\\n            message: '请选择奖励上限',\\n            trigger: 'change'\\n        }\\n    ]\\n})\",\"on\":\"(function() {\\n    return {}\\n})\",\"interaction\":\"(function() {\\n  return {\\n    display: function(form, oldForm) {\\n      if (!Array.isArray(form.taskList) || form.taskList.length === 0) return false\\n\\n      const currentTargetData = form.taskList[0]\\n\\n      // 此原子状态发生改变时，需要执行清空逻辑\\n      if (currentTargetData.rewardUpperLimitOrderNum && !currentTargetData.maximumRewardLimitFe.includes(0)) {\\n        this.formData.taskList[0].rewardUpperLimitOrderNum = undefined\\n      }\\n\\n      if (currentTargetData.rewardUpperLimitMoney && !currentTargetData.maximumRewardLimitFe.includes(1)) {\\n        this.formData.taskList[0].rewardUpperLimitMoney = undefined\\n      }\\n\\n      if (currentTargetData.rewardUpperLimitPerOrderMoney && !currentTargetData.maximumRewardLimitFe.includes(2)) {\\n        this.formData.taskList[0].rewardUpperLimitPerOrderMoney = undefined\\n      }\\n      return true\\n    }\\n  }\\n})\\n\",\"options\":\"[\\n]\",\"special\":\"{\\n}\"}},{\"field\":\"313\",\"defaultValue\":\"\",\"hubbleDefaultValue\":\"(function(schema) {\\n    return null\\n})\",\"component\":\"span\",\"options\":{\"attrs\":\"(function() {\\n    return {\\n      text: \\\"活动周期内:     \\\",\\n      inline: true\\n    }\\n})\",\"rules\":\"(function() {\\n    return []\\n})\",\"on\":\"(function() {\\n    return {}\\n})\",\"interaction\":\"(function() {\\n    return {}\\n})\",\"options\":\"[\\n]\",\"special\":\"{\\n}\"}},{\"field\":\"315\",\"defaultValue\":\"\",\"hubbleDefaultValue\":\"(function(schema) {\\n    return null\\n})\",\"component\":\"span\",\"options\":{\"attrs\":\"(function() {\\n    return {\\n      text: \\\"无奖励上限\\\",\\n      inline: true\\n    }\\n})\",\"rules\":\"(function() {\\n    return []\\n})\",\"on\":\"(function() {\\n    return {}\\n})\",\"interaction\":\"(function() {\\n  return {\\n    display: function(form) {\\n      if (!Array.isArray(form.taskList) || form.taskList.length === 0) return false\\n      // 0,1,2,3 分别对应 不设上限、订单总量、订单总额、每单上限\\n\\n      return Array.isArray(form.taskList[0].maximumRewardLimitFe) && form.taskList[0].maximumRewardLimitFe.includes(-1)\\n    }\\n  }\\n})\",\"options\":\"[\\n]\",\"special\":\"{\\n}\"}},{\"field\":\"309\",\"defaultValue\":\"\",\"component\":\"el-input-number\",\"options\":{\"attrs\":\"(function () {\\n  return {\\n    controls: false,\\n    min: 1,\\n    max: 999,\\n    prefix: \\\"最多奖励\\\",\\n    suffix: \\\"单；\\\",\\n    precision: 0,\\n    inline: true,\\n  };\\n});\\n\",\"rules\":\"(function (_, __, ___, tag) {\\n  // @ gongzhen\\n  // 大于最高阶梯单量\\n  const { taskNum } = tag;\\n  return [\\n    {\\n      validator: (rule, value, callback) => {\\n        const awardRules = this.formData.taskList[taskNum]?.awardRules;\\n        let realVal = null;\\n\\n        if (value !== 0 && !value) {\\n          return callback(\\\"请填写订单总量\\\");\\n        }\\n\\n        if (awardRules.length > 0) {\\n          // 取最高层级完单量\\n          const orderNum = awardRules[awardRules.length - 1]?.orderNum;\\n          if (orderNum && orderNum[1]) {\\n            realVal = orderNum[1];\\n          } else {\\n            realVal = orderNum[0];\\n          }\\n        }\\n\\n        if (realVal && value <= realVal) {\\n          return callback(\\\"单量上限需大于最高阶梯的单量\\\");\\n        }\\n        return callback();\\n      },\\n      trigger: \\\"blur\\\",\\n    },\\n    {\\n      required: true,\\n      type: \\\"number\\\",\\n      message: \\\"请填写订单总量\\\",\\n      trigger: \\\"blur\\\",\\n    },\\n  ];\\n});\\n\",\"on\":\"(function() {\\n    return {}\\n})\",\"interaction\":\"(function () {\\n  return {\\n    display: function (form) {\\n      if (!Array.isArray(form.taskList) || form.taskList.length === 0) {\\n        return false;\\n      }\\n      // 0,1,2,3 分别对应 不设上限、订单总量、订单总额、每单上限\\n\\n      return (\\n        Array.isArray(form.taskList[0].maximumRewardLimitFe) &&\\n        form.taskList[0].maximumRewardLimitFe.includes(0)\\n      );\\n    },\\n  };\\n});\\n\",\"options\":\"[\\n]\",\"special\":\"{\\n}\"}},{\"field\":\"157\",\"defaultValue\":\"\",\"component\":\"el-input-number\",\"options\":{\"attrs\":\"(function() {\\n  return {\\n    controls: false,\\n    min: 0,\\n    max: 9999.99,\\n    precision: 2,\\n    prefix: '最多奖励',\\n    suffix: '元；',\\n    inline: true\\n  }\\n})\\n\",\"rules\":\"(function(_, __, ___, tag) {\\n  const orderNumInfo = this.specialField.filter(item => item.relationField === 'orderNum')[0] // 是否是拼单还是拼单奖区间\\n  const { taskNum } = tag\\n  return [\\n    {\\n      required: true,\\n      type: 'number',\\n      message: '请填写订单总额',\\n      trigger: 'blur'\\n    },\\n    {\\n      validator: (rule, value, callback) => {\\n        const awardRules = this.formData.taskList[taskNum]?.awardRules\\n\\n        // 拼单奖\\n        let realVal = null\\n        let finalMoney = null\\n        if (awardRules && awardRules.length > 0) {\\n          // 取最高层级完单量\\n          const orderNum = awardRules[awardRules.length - 1]?.orderNum\\n          finalMoney = awardRules[awardRules.length - 1]?.rewardPerOrderMoney\\n          if (orderNum[1]) {\\n            realVal = orderNum[1]\\n          } else {\\n            realVal = orderNum[0]\\n          }\\n        }\\n\\n        // 拼单奖区间 金额上限＞∑阶梯奖励总额\\n        const allMoney = []\\n        let finalMoney2 = null\\n        if (awardRules && awardRules.length > 0) {\\n          for (let i = 0; i < awardRules.length; i++) {\\n            const currentOrderNum = awardRules[i]?.orderNum\\n            const currentMoney = awardRules[i]?.rewardPerOrderRangeMoney\\n            if (i === awardRules.length - 1) {\\n              allMoney.push(currentOrderNum[0] * currentMoney)\\n            } else {\\n              allMoney.push((currentOrderNum[1] - currentOrderNum[0] + 1) * currentMoney)\\n            }\\n          }\\n        }\\n\\n        finalMoney2 = allMoney.reduce((pre, current) => current + pre, 0)\\n\\n        if (orderNumInfo && !orderNumInfo.isInterval) {\\n          // 拼单奖  奖励总额上限＞最高阶梯的每单奖励金额*最高阶梯的单量\\n          if (realVal && finalMoney && value <= Number((realVal * finalMoney).toPrecision(3))) {\\n            return callback('奖励总额上限需大于最高阶梯的每单奖励金额*最高阶梯的单量')\\n          }\\n        } else {\\n          //   金额上限＞∑阶梯奖励总额\\n          if (finalMoney2 && value <= finalMoney2) {\\n            return callback('金额上限需大于任意阶梯奖励总额总合')\\n          }\\n        }\\n\\n        return callback()\\n      },\\n      trigger: 'blur'\\n    }\\n  ]\\n})\\n\\n\",\"on\":\"(function() {\\n    return {}\\n})\",\"interaction\":\"(function() {\\n  return {\\n    display: function(form) {\\n      if (!Array.isArray(form.taskList) || form.taskList.length === 0) return false\\n      // 0,1,2,3 分别对应 不设上限、订单总量、订单总额、每单上限\\n\\n      return Array.isArray(form.taskList[0].maximumRewardLimitFe) && form.taskList[0].maximumRewardLimitFe.includes(1)\\n    }\\n  }\\n})\",\"options\":\"[\\n]\",\"special\":\"{\\n}\"}},{\"field\":\"311\",\"defaultValue\":\"\",\"component\":\"el-input-number\",\"options\":{\"attrs\":\"(function () {\\n    return {\\n        controls: false,\\n        min: 0,\\n        max: 9999.99,\\n        precision: 2,\\n        prefix: '每笔订单最多奖励',\\n        suffix: '元；',\\n        inline: true\\n    }\\n})\",\"rules\":\"(function() {\\n    return [\\n       {\\n      required: true,\\n      type: 'number',\\n      message: '请填写每单奖励上限',\\n      trigger: 'blur'\\n    }\\n    ]\\n})\",\"on\":\"(function() {\\n    return {}\\n})\",\"interaction\":\"(function() {\\n  return {\\n    display: function(form) {\\n      if (!Array.isArray(form.taskList) || form.taskList.length === 0) return false\\n      // 0,1,2,3 分别对应 不设上限、订单总量、订单总额、每单上限\\n\\n      return Array.isArray(form.taskList[0].maximumRewardLimitFe) && form.taskList[0].maximumRewardLimitFe.includes(2)\\n    }\\n  }\\n})\",\"options\":\"[\\n]\",\"special\":\"{\\n}\"}}]}",
    'ruleConfig': null,
    'status': null,
    'description': null,
    'createByName': null,
    'gmtCreate': null,
    'updateByName': null,
    'gmtModified': null
  },
  {
    'id': 127,
    'name': null,
    'sceneId': 21,
    'sceneName': null,
    'componentConfig': "{\"label\":\"活动周期内最多奖励\",\"name\":\"rewardUpperLimitMoney\",\"type\":\"chunk\",\"options\":{\"interaction\":\"(function() {\\n    return {}\\n})\"},\"fields\":[{\"field\":\"243\",\"defaultValue\":\"\",\"component\":\"el-input-number\",\"options\":{\"attrs\":\"(function() {\\n    return {\\n        controls: false,\\n        min:1,\\n        suffix: '单'\\n    }\\n})\",\"rules\":\"(function(formData) {\\n  // 勿动 @gongzhen\\n  return [\\n    {\\n      required: true,\\n      type: 'number',\\n      message: '请填写奖励上限',\\n      trigger: 'blur'\\n    },\\n    {\\n      validator: (rule, value, callback) => {\\n        debugger\\n        if (formData.taskList[0].rewardUpperLimitOrderNum) {\\n          // 分为订单总量\\n        } else if (formData.taskList[0].rewardUpperLimitMoney) {\\n          // 分为订单总额\\n        } else {\\n          return callback('请填写奖励上限')\\n        }\\n        return callback()\\n      }\\n\\n    }\\n  ]\\n})\\n\\n\\n\",\"on\":\"(function() {\\n    return {}\\n})\",\"interaction\":\"(function() {\\n    return {}\\n})\",\"options\":\"[\\n]\",\"special\":\"{\\n}\"}}]}",
    'ruleConfig': null,
    'status': null,
    'description': null,
    'createByName': null,
    'gmtCreate': null,
    'updateByName': null,
    'gmtModified': null
  },
  {
    'id': 119,
    'name': null,
    'sceneId': 21,
    'sceneName': null,
    'componentConfig': "{\"label\":\"人群标签\",\"name\":\"driverTag\",\"type\":\"chunk\",\"options\":{},\"fields\":[{\"field\":\"75\",\"defaultValue\":\"\",\"component\":\"BLMSelectAndSearch\",\"operations\":\"{}\",\"options\":{\"data\":\"[]\",\"dataSrc\":\"(async function () {\\n  if (this.$isInHubble) {\\n    return [];\\n  }\\n  const res = await this.request({\\n    url: \\\"/admin/v1/ops/common/driverListNew\\\",\\n    method: \\\"post\\\",\\n    data: {},\\n  });\\n  console.log(res, \\\"===res==\\\");\\n  if (res && res.code === 1) {\\n    if (!res.data) {\\n      return [];\\n    }\\n    if (!res.data.length) {\\n      return [];\\n    }\\n\\n    res.data.forEach((item, index) => {\\n      if (item.type === 1) {\\n        if (item.id !== 1) {\\n          item.name = \\\"静 - \\\" + item.name + \\\"(\\\" + item.id + \\\")\\\";\\n        }\\n      } else {\\n        item.name = \\\"动 - \\\" + item.name + \\\"(\\\" + item.id + \\\")\\\";\\n      }\\n    });\\n\\n    return res.data.map((i) => {\\n      return {\\n        label: i.name,\\n        value: i.id,\\n      };\\n    });\\n  }\\n  return [];\\n});\\n\",\"attrs\":\"(function () {\\n  return {\\n    option: {\\n      labelKey: \\\"label\\\",\\n      valueKey: \\\"value\\\",\\n    },\\n    filterable: true,\\n    class: \\\"crowdLabel\\\",\\n    popperAppendToBody: false,\\n    searchAction: async function (params) {\\n      const res = await this.$parent.spAnalysisApp.request({\\n        url: \\\"/admin/v1/ops/driver/drivertag/getPersonCountByTag\\\",\\n        method: \\\"post\\\",\\n        data: {\\n          driverTagId: params.value,\\n          driverTagName: params.label,\\n          taskType: 1,\\n          taskVersion: 1,\\n        },\\n      });\\n      return res.data;\\n    },\\n    searchResult:\\n      \\\"<p style='color: red'>根据您设定的条件筛选后，可参与的总人数为：${data}人</p>\\\",\\n  };\\n});\\n\",\"rules\":\"(function() {\\n    return [\\n        {required: true, message: '请选择人群标签', trigger: 'blur', type: 'number'}\\n    ]\\n})\",\"on\":\"(function() {\\n    return {\\n    }\\n})\",\"interaction\":\"(function() {\\n  return {\\n  }\\n})\",\"options\":\"[\\n]\",\"special\":\"{\\n}\"}}]}",
    'ruleConfig': null,
    'status': null,
    'description': null,
    'createByName': null,
    'gmtCreate': null,
    'updateByName': null,
    'gmtModified': null
  },
  {
    'id': 113,
    'name': null,
    'sceneId': 21,
    'sceneName': null,
    'componentConfig': "{\"label\":\"风险控制\",\"name\":\"orderRiskControlPercentage\",\"type\":\"chunk\",\"options\":{},\"fields\":[{\"field\":\"123\",\"defaultValue\":\"\",\"component\":\"BLMIntervalValue\",\"operations\":\"{}\",\"options\":{\"attrs\":\"(function () {\\n  return {\\n    prefix: `达到阶梯要求，但当前任务获得<span style=\\\"font-weight:bolder\\\">全部奖励</span>大于等于<span style=\\\"font-weight:bolder\\\">抽佣后流水</span>的`,\\n    suffix: \\\"%时，会被认为有刷单行为，需要通过人工审核后才会发放奖励\\\",\\n    isRange: false,\\n    max1: 100,\\n    precision: 2,\\n    describe:\\n      '<p style=\\\"color:red\\\">重点关注：乐高场景的风险控制比例计算方法为获得奖励金额/司机佣后流水</br>示例：假设保底100元，当司机佣后流水低于70元时希望风控拦截。则司机获奖金额=30元，司机佣后流水70元，风控比例=30/70≈42.85%</p>',\\n  };\\n});\\n\",\"rules\":\"(function () {\\n  const orderRiskControlPercentageConfig = this?.utils?.getRelationChunk(\\n    \\\"orderRiskControlPercentage\\\",\\n    \\\"config\\\"\\n  )[0]; // TODO 多任务时传下当前任务层级\\n  // 哈勃是否配置了不必填\\n  const required = !!(\\n    orderRiskControlPercentageConfig?.orderRiskControlPercentage &&\\n    orderRiskControlPercentageConfig?.orderRiskControlPercentage?.required === 1\\n  );\\n\\n  return [\\n    {\\n      validator: (rule, value, callback) => {\\n        if (required && !Array.isArray(value)) {\\n          return callback(new Error(\\\"请填写风险控制\\\"));\\n        }\\n\\n        if (required && value.includes(void 0)) {\\n          return callback(new Error(\\\"请填写风险控制\\\"));\\n        }\\n\\n        if (required && value.length === 0) {\\n          return callback(new Error(\\\"请填写风险控制\\\"));\\n        }\\n        return callback();\\n      },\\n      trigger: \\\"blur\\\",\\n    },\\n    {\\n      required: required,\\n      message: \\\"请填写风险控制\\\",\\n      type: \\\"array\\\",\\n      trigger: \\\"blur\\\",\\n    },\\n  ];\\n});\\n\",\"on\":\"(function() {\\n    return {}\\n})\",\"interaction\":\"(function() {\\n    return {}\\n})\",\"options\":\"[\\n    {\\n        label: '1.选项',\\n        value: 0,\\n        key: 'option',\\n        description: \\\"\\\",\\n        type: \\\"BlmBizFormRadioGroup\\\",\\n        props: {\\n            options: [\\n\\n                {\\n                    label: '任务全部奖励/抽佣后流水',\\n                    value: 0\\n                },\\n            ]\\n        }\\n    },\\n    {\\n        label: '2.是否必填',\\n        value: 1,\\n        key: 'required',\\n        description: \\\"\\\",\\n        type: \\\"BlmBizFormRadioGroup\\\",\\n        props: {\\n            options: [\\n\\n                {\\n                    label: '否',\\n                    value: 0\\n                },\\n                {\\n                    label: '是',\\n                    value: 1\\n                },\\n            ]\\n        }\\n    },\\n    \\n]\",\"special\":\"{\\n}\"}}]}",
    'ruleConfig': null,
    'status': null,
    'description': null,
    'createByName': null,
    'gmtCreate': null,
    'updateByName': null,
    'gmtModified': null
  },
  {
    'id': 111,
    'name': null,
    'sceneId': 21,
    'sceneName': null,
    'componentConfig': '{"label":"发奖条件","name":"rewardRequirement","type":"chunk","operations":"(function() {\\n    return {\\n    }\\n})","options":{},"fields":[{"field":"121","defaultValue":"","component":"BLMSelectAndNestedList","operations":"{}","options":{"data":"[\\n            {\\n                label: \\"完单量\\",\\n                value: \\"orderNum\\",\\n                prefix: \\"完单量 大于等于\\",\\n                suffix: \\"单\\"\\n            },\\n            {\\n                label: \\"出车时长\\",\\n                value: \\"effectiveHour\\",\\n                prefix: \\"出车时长 大于等于\\",\\n                suffix: \\"小时\\"\\n            }\\n        ]","dataSrc":"(function() {\\n    return []\\n})","attrs":"(function () {\\n  return {\\n    format: \\"HH:mm\\",\\n    maxLength: 3,\\n    timeMaxLength: 3,\\n    minStep: 30,\\n    width: 200,\\n    min: {\\n      orderNum: 1,\\n      effectiveHour: 0.1,\\n    },\\n    max: {\\n      orderNum: 999,\\n      effectiveHour: 999,\\n    },\\n    precision: {\\n      orderNum: 0,\\n      effectiveHour: 1,\\n    },\\n    defaultStartTime: \\"07:00\\",\\n  };\\n});\\n","rules":"(function (form, config) {\\n  const timeLimit =\\n    this.formData.taskList &&\\n    this.formData.taskList[0] &&\\n    this.formData.taskList[0].timeLimit;\\n  const rewardRequirementConfig = this?.utils?.getRelationChunk(\\n    \\"rewardRequirement\\",\\n    \\"config\\"\\n  )[0]; // TODO 多任务时传下当前任务层级\\n  // 哈勃是否配置了不必填\\n  const required = !!(\\n    rewardRequirementConfig.rewardLimitRules &&\\n    rewardRequirementConfig.rewardLimitRules.required === 1\\n  );\\n\\n  const spAnalysisApp = this;\\n\\n  //TODO 怎么进行处理呢\\n  return [\\n    {\\n      required,\\n      message: \\"发奖条件必填\\",\\n      type: \\"array\\",\\n      min: required ? 1 : 0,\\n      trigger: \\"change\\",\\n      defaultField: {\\n        type: \\"object\\",\\n        required: true,\\n        trigger: \\"change\\",\\n        validator: (rule, value, callback) => {\\n          const { orderNum, effectiveHour, timeSegment } = value;\\n\\n          // 校验时段\\n          if (timeSegment && Array.isArray(timeSegment)) {\\n            // 检查是否包含在时段要求内\\n            if (timeLimit && timeLimit.length) {\\n              const allBetween = timeSegment.every((timeItem, index) => {\\n                const start = new Date(`2021-01-01 ${timeItem[0]}`);\\n                const end = new Date(`2021-01-01 ${timeItem[1]}`);\\n                const isBetween = timeLimit.some((item, i) => {\\n                  const cStart = new Date(`2021-01-01 ${item[0]}`);\\n                  const cEnd = new Date(`2021-01-01 ${item[1]}`);\\n                  return start >= cStart && end <= cEnd;\\n                });\\n                console.debug(\\"isBetween\\", isBetween);\\n                return isBetween;\\n              });\\n              if (!allBetween) {\\n                return callback(\\"「发奖条件时段」不能超出「时段要求」范围\\");\\n              }\\n            }\\n            // 重复校验\\n            for (let index = 0; index < timeSegment.length; index++) {\\n              const currentTime = timeSegment[index];\\n              const start = new Date(`2021-01-01 ${currentTime[0]}`);\\n              const end = new Date(`2021-01-01 ${currentTime[1]}`);\\n              const no_repeat = timeSegment.every((item, i) => {\\n                if (index === i) {\\n                  return true;\\n                }\\n                const cStart = new Date(`2021-01-01 ${item[0]}`);\\n                const cEnd = new Date(`2021-01-01 ${item[1]}`);\\n                return end <= cStart || start >= cEnd;\\n              });\\n              if (!no_repeat) {\\n                return callback(new Error(\\"时间段不能重叠\\"));\\n              }\\n              if (start >= end) {\\n                return callback(new Error(\\"开始时段不能大于或等于结束时段\\"));\\n              }\\n              if (end.getTime() - start.getTime() < 30 * 60 * 1000 - 1000) {\\n                return callback(new Error(`时间间隔必须大于等于${30}分钟`));\\n              }\\n            }\\n          }\\n\\n          // 校验时段和完单量的必填\\n          if (orderNum || effectiveHour) {\\n            const realOrderNumValue = Array.isArray(orderNum)\\n              ? orderNum.filter((item) => item)\\n              : [];\\n            const realEffectiveHourValue = Array.isArray(effectiveHour)\\n              ? effectiveHour.filter((item) => item)\\n              : [];\\n\\n            if (\\n              realOrderNumValue.length === 0 &&\\n              realEffectiveHourValue.length === 0\\n            ) {\\n              return callback(\\"缺少必填项\\");\\n            }\\n          }\\n\\n          return callback();\\n        },\\n      },\\n    },\\n    {\\n      required,\\n      trigger: \\"change\\",\\n      type: \\"array\\",\\n      defaultField: {\\n        type: \\"object\\",\\n        trigger: \\"change\\",\\n        required: true,\\n        validator: (rule, value, callback) => {\\n          const moment = spAnalysisApp.utils.moment;\\n          const { orderNum, effectiveHour } = value;\\n          const {\\n            cloud: { opinion },\\n          } = spAnalysisApp;\\n\\n          // 非全部人群不校验\\n          if (form[\\"driverTag\\"] !== 1) {\\n            return callback();\\n          }\\n\\n          // 周期任务\\n          if (form[\\"taskPeriod\\"] === 2 && form[\\"actTime\\"].length) {\\n            const start = moment(form[\\"actTime\\"][0]).date();\\n            const end = moment(form[\\"actTime\\"][1]).date();\\n            const duration = end - start + 1;\\n            // orderNum 校验\\n\\n            if (\\n              Number((orderNum / duration).toFixed(2)) >\\n              opinion[\\"onThresholdNum\\"]\\n            ) {\\n              return callback(\\n                `#活动规则超出每日${opinion[\\"onThresholdNum\\"]}单上限值，可能造成引导司机疲劳驾驶的风险，建议针对指定人群的司机配置活动#`\\n              );\\n            }\\n\\n            // 出车时长校验\\n\\n            if (\\n              Number((effectiveHour / duration).toFixed(2)) >\\n              opinion[\\"onThresholdTime\\"]\\n            ) {\\n              return callback(\\n                `#活动规则超出每日${opinion[\\"onThresholdTime\\"]}小时上限值，可能造成引导司机疲劳驾驶的风险，建议针对指定人群的司机配置活动#`\\n              );\\n            }\\n          }\\n\\n          // 每日任务\\n          if (form[\\"taskPeriod\\"] === 0) {\\n            // orderNum 校验\\n\\n            if (orderNum > opinion[\\"onThresholdNum\\"]) {\\n              return callback(\\n                `#活动规则超出每日${opinion[\\"onThresholdNum\\"]}单上限值，可能造成引导司机疲劳驾驶的风险，建议针对指定人群的司机配置活动#`\\n              );\\n            }\\n\\n            // 出车时长校验\\n            if (effectiveHour > opinion[\\"onThresholdTime\\"]) {\\n              return callback(\\n                `#活动规则超出每日${opinion[\\"onThresholdTime\\"]}小时上限值，可能造成引导司机疲劳驾驶的风险，建议针对指定人群的司机配置活动#`\\n              );\\n            }\\n          }\\n\\n          return callback();\\n        },\\n      },\\n    },\\n  ];\\n});\\n","on":"(function() {\\n    return {}\\n})","interaction":"(function() {\\n    return {}\\n})","options":"[\\n  {\\n    label: \\"1.选项\\",\\n    value: [\\"orderNum\\", \\"effectiveHour\\"],\\n    key: \\"option\\",\\n    descrition: \\"\\",\\n    type: \\"BlmBizCheckboxGroup\\",\\n    props: {\\n      min: 1,\\n      options: [\\n        {\\n          label: \\"完单量\\",\\n          value: \\"orderNum\\",\\n        },\\n        {\\n          label: \\"出车时长\\",\\n          value: \\"effectiveHour\\",\\n        },\\n      ],\\n    },\\n  },\\n  {\\n    label: \\"2.条件间关系\\",\\n    value: \\"and\\",\\n    key: \\"relations\\",\\n    descrition: \\"\\",\\n    type: \\"BlmBizFormRadioGroup\\",\\n    props: {\\n      options: [\\n        {\\n          label: \\"满足全部条件\\",\\n          value: \\"and\\",\\n          description: \\"多条件时，需同时满足全部条件才能获得奖励。\\",\\n        },\\n        {\\n          label: \\"满足任意条件\\",\\n          value: \\"or\\",\\n          description: \\"多条件时，只要满足任意条件就能获得奖励。\\",\\n        },\\n      ],\\n    },\\n  },\\n  {\\n    label: \\"3.是否必填\\",\\n    value: 0,\\n    key: \\"required\\",\\n    description: \\"\\",\\n    type: \\"BlmBizFormRadioGroup\\",\\n    props: {\\n      options: [\\n        { label: \\"否\\", value: 0 },\\n        { label: \\"是\\", value: 1 },\\n      ],\\n    },\\n  },\\n];\\n","special":"{\\n}"}}]}',
    'ruleConfig': null,
    'status': null,
    'description': null,
    'createByName': null,
    'gmtCreate': null,
    'updateByName': null,
    'gmtModified': null
  },
  {
    'id': 281,
    'name': null,
    'sceneId': 21,
    'sceneName': null,
    'componentConfig': "{\"label\":\"每单奖励\",\"name\":\"rewardPerOrder_v2\",\"type\":\"chunk\",\"options\":{},\"fields\":[{\"field\":\"153\",\"defaultValue\":\"\",\"component\":\"el-input-number\",\"operations\":\"{}\",\"options\":{\"attrs\":\"(function(currentFileName) {\\n  if (currentFileName === 'rewardPerOrderPercentage') {\\n    return {\\n      suffix: '%',\\n      width: '200px',\\n      controls: false,\\n      max: 99,\\n      min: 1,\\n      precision: 0,\\n    }\\n  }\\n  return {\\n    suffix: '元',\\n    width: '200px',\\n    controls: false,\\n    max: 9999.99,\\n    precision: 2,\\n    min: 0,\\n    warning: \\\"${ selfValue >= 50  ? '*该配置可能有误，请检查并确认（此提示只为防止错配，不影响编辑提交）' : '' }\\\"\\n  }\\n})\\n\",\"rules\":\"(function(_,__,___,{fileName}) {\\n  // 勿动 @gongzhen\\n  return [\\n    {\\n      required: true,\\n      type: 'number',\\n      message: '请填写每单奖励',\\n      trigger: 'blur'\\n    },\\n    {\\n      validator: (rule, value, callback) => {\\n        \\n        const fract = (num) => {\\n          return num - Math.trunc(num)\\n        }\\n        if (!value) {\\n          return callback(new Error('请填写每单奖励'))\\n        }\\ndebugger\\n        if (value < 0) {\\n          return callback(new Error('数据格式只能为正数'))\\n        }\\n        if (value > 100000) {\\n          return callback(new Error('小数点前至多4位'))\\n        }\\n\\n        // if (!/^[0-9]+$/.test(fract(value) * 100)) {\\n        //   return callback(new Error('小数点后至多2位'))\\n        // }\\n\\n        return callback()\\n      }\\n\\n    }\\n  ]\\n})\",\"on\":\"(function() {\\n    return {}\\n})\",\"interaction\":\"(function() {\\n    return {}\\n})\",\"options\":\"[\\n    {\\n      label: '1.奖项',\\n      value: 0,\\n      key: 'rewards',\\n      descrition: '',\\n      type: 'BlmBizFormRadioGroup',\\n      props: {\\n        options: [\\n          {\\n            label: '固定金额',\\n            value: 0\\n          },\\n          {\\n            label: '流水提成',\\n            value: 1\\n          }\\n        ]\\n      }\\n    },\\n     {\\n      label: '2.奖励上限',\\n      value: [-1,0,1,2],\\n      key: 'rewardsUpperLimit',\\n      description: '',\\n      type: 'BlmBizCheckboxGroup',\\n       linkage: {\\n            key: 'rewards',\\n            condition: function(value, form) {\\n                return value === 1\\n            },\\n      },\\n      props: {\\n         min: 1,\\n        options: [\\n          { label: '不设上限', value: -1 },\\n          { label: '订单总量', value: 0 },\\n          { label: '奖励总额', value: 1 },\\n          { label: '每单奖励上限', value: 2 }\\n        ]\\n      }\\n    },\\n    {\\n      label: '2.奖励上限',\\n      value: [-1,0,1],\\n      key: 'rewardsUpperLimit',\\n      description: '',\\n      type: 'BlmBizCheckboxGroup',\\n       linkage: {\\n            key: 'rewards',\\n            condition: function(value, form) {\\n                return value === 0\\n            },\\n      },\\n      props: {\\n        min: 1,\\n        options: [\\n          { label: '不设上限', value: -1 },\\n          { label: '订单总量', value: 0 },\\n          { label: '奖励总额', value: 1 },\\n        ]\\n      }\\n    }\\n   \\n  ]\\n  \",\"special\":\"{\\n}\"}}]}",
    'ruleConfig': null,
    'status': null,
    'description': null,
    'createByName': null,
    'gmtCreate': null,
    'updateByName': null,
    'gmtModified': null
  },
  {
    'id': 109,
    'name': null,
    'sceneId': 21,
    'sceneName': null,
    'componentConfig': "{\"label\":\"每单奖励\",\"name\":\"rewardPerOrder\",\"type\":\"chunk\",\"options\":{},\"fields\":[{\"field\":\"153\",\"defaultValue\":\"\",\"component\":\"el-input-number\",\"operations\":\"{}\",\"options\":{\"attrs\":\"(function() {\\n    return {\\n        suffix: '元',\\n        width: '200px',\\n        controls: false,\\n        max: 9999,\\n        precision:2,\\n        min: 0\\n    }\\n})\",\"rules\":\"(function() {\\n    return []\\n})\",\"on\":\"(function() {\\n    return {}\\n})\",\"interaction\":\"(function() {\\n    return {}\\n})\",\"options\":\"[\\n  {\\n    label: '1.奖项',\\n    value: 0,\\n    key: 'rewards',\\n    descrition: '',\\n    type: 'BlmBizFormRadioGroup',\\n    props: {\\n      options: [\\n        {\\n          label: '固定金额',\\n          value: 0\\n        },\\n        {\\n          label: '流水提成',\\n          value: 1\\n        }\\n      ]\\n    }\\n  },\\n  {\\n    label: '2.奖励上限',\\n    value: [-1,0,1],\\n    key: 'rewardsUpperLimit',\\n    description: '',\\n    type: 'BlmBizFormCheckboxGroup',\\n    props: {\\n      options: [\\n        { label: '不设上限', value: -1 },\\n        { label: '订单总量', value: 0 },\\n        { label: '奖励总额', value: 1 }\\n      ]\\n    }\\n  }\\n]\\n\\n\",\"special\":\"{\\n}\"}}]}",
    'ruleConfig': null,
    'status': null,
    'description': null,
    'createByName': null,
    'gmtCreate': null,
    'updateByName': null,
    'gmtModified': null
  },
  {
    'id': 107,
    'name': null,
    'sceneId': 21,
    'sceneName': null,
    'componentConfig': "{\"label\":\"保底奖励\",\"name\":\"rewardGuaranteedMoney\",\"type\":\"chunk\",\"options\":{},\"fields\":[{\"field\":\"143\",\"defaultValue\":\"\",\"component\":\"el-input-number\",\"operations\":\"{}\",\"options\":{\"attrs\":\"(function() {\\n    return {\\n        prefix: '',\\n        suffix: '元',\\n        width: '200px',\\n        controls: false,\\n        min: 1,\\n        max: 9999.99,\\n        precision: 2,\\n        warning: \\\"${ selfValue >= ruleValue['orderNum'] * 20 || selfValue >= ruleValue['effectiveHour'] * 50 || selfValue >= ruleValue['moneyAfterCommission'] ? '*该配置可能有误，请检查并确认（此提示只为防止错配，不影响编辑提交）' : '' }\\\"\\n    }\\n})\",\"rules\":\"(function() {\\n    return [\\n        {\\n            required: true,\\n            message: '请填写保底奖励',\\n            type: 'number'\\n        }\\n    ]\\n})\",\"on\":\"(function() {\\n    return {}\\n})\",\"interaction\":\"(function() {\\n    return {}\\n})\",\"options\":\"[\\n    {\\n    label: '1.奖项',\\n    value: 0,\\n    key: 'rewards',\\n    descrition: '',\\n    type: 'BlmBizFormRadioGroup',\\n    props: {\\n      options: [\\n        {\\n          label: '固定金额',\\n          value: 0\\n        }\\n      ]\\n    }\\n  },\\n]\",\"special\":\"{\\n}\"}}]}",
    'ruleConfig': null,
    'status': null,
    'description': null,
    'createByName': null,
    'gmtCreate': null,
    'updateByName': null,
    'gmtModified': null
  },
  {
    'id': 105,
    'name': null,
    'sceneId': 21,
    'sceneName': null,
    'componentConfig': "{\"label\":\"抽佣后流水\",\"name\":\"moneyAfterCommission\",\"type\":\"chunk\",\"options\":{},\"fields\":[{\"field\":\"117\",\"defaultValue\":\"\",\"component\":\"BLMIntervalValue\",\"operations\":\"{}\",\"options\":{\"attrs\":\"(function() {\\n    return {\\n        prefix: '达到',\\n        suffix: '元',\\n        width: '200px',\\n        isRange: false,\\n        maxLength: 5,\\n        max1: 99999,\\n        min1: 1\\n    }\\n})\",\"rules\":\"(function(form) {\\n  // 勿动 @gongzhen\\n  return [\\n    {\\n      validator: (rule, value, callback) => {\\n        if (!Array.isArray(value) || value.includes(void 0) || value.length === 0) {\\n          return callback(new Error('请填写抽佣后流水'))\\n        }\\n\\n        if (Array.isArray(value)) {\\n          // 一期先处理一个区间\\n          const flag = /^[0-9]+$/.test(value[0])\\n          if (!flag || value[0] < 1) {\\n            return callback(new Error('数据格式为大于等于1的正整数'))\\n          }\\n        }\\n\\n        return callback()\\n      }\\n\\n    },\\n    {\\n      required: true,\\n      message: '请填写抽佣后流水',\\n      type: 'array'\\n    }\\n  ]\\n})\",\"on\":\"(function() {\\n    return {}\\n})\",\"interaction\":\"(function() {\\n    return {}\\n})\",\"options\":\"[\\n]\",\"special\":\"{\\n}\"}}]}",
    'ruleConfig': null,
    'status': null,
    'description': null,
    'createByName': null,
    'gmtCreate': null,
    'updateByName': null,
    'gmtModified': null
  },
  {
    'id': 103,
    'name': null,
    'sceneId': 21,
    'sceneName': null,
    'componentConfig': "{\"label\":\"出车时长\",\"name\":\"effectiveHour\",\"type\":\"chunk\",\"options\":{},\"fields\":[{\"field\":\"115\",\"defaultValue\":\"\",\"component\":\"BLMIntervalValue\",\"operations\":\"{}\",\"options\":{\"attrs\":\"(function() {\\n    \\n    return {\\n        prefix: '达到',\\n        suffix: '小时',\\n        isRange: false,\\n        max1: 999.9,\\n        min1: 0.1,\\n        precision: 1\\n        \\n    }\\n})\",\"rules\":\"(function (form, _, __) {\\n  const _self = this;\\n  const { spAnalysisApp } = __;\\n  return [\\n    {\\n      validator: (rule, value, callback) => {\\n        if (!Array.isArray(value)) {\\n          return callback(new Error(\\\"请填写出车时长\\\"));\\n        }\\n\\n        if (value.includes(void 0)) {\\n          return callback(new Error(\\\"请填写出车时长\\\"));\\n        }\\n\\n        if (value.length === 0) {\\n          return callback(new Error(\\\"请填写出车时长\\\"));\\n        }\\n        return callback();\\n      },\\n      trigger: \\\"blur\\\",\\n    },\\n    // {\\n    //   validator: (rule, value, callback) => {\\n    //     const { opinion = {} } = spAnalysisApp.cloud;\\n    //     const moment = spAnalysisApp.utils.moment;\\n    //     let realVal = null;\\n    //     if (value && value[1]) {\\n    //       realVal = value[1];\\n    //     } else {\\n    //       realVal = value[0];\\n    //     }\\n    //     // 周期任务\\n    //     if (form[\\\"taskPeriod\\\"] === 2 && form[\\\"actTime\\\"].length) {\\n    //       const start = moment(form[\\\"actTime\\\"][0]).date();\\n    //       const end = moment(form[\\\"actTime\\\"][1]).date();\\n    //       const duration = end - start + 1;\\n    //       if (Math.floor(realVal / duration) > opinion[\\\"onThresholdTime\\\"]) {\\n    //         return callback(\\n    //           `活动规则超出每日${opinion[\\\"onThresholdTime\\\"]}小时上限值，可能造成引导司机疲劳驾驶的风险，建议针对指定人群的司机配置活动`\\n    //         );\\n    //       }\\n    //     }\\n\\n    //     // 每日任务\\n    //     if (form[\\\"taskPeriod\\\"] === 0 && +realVal > opinion[\\\"onThresholdTime\\\"]) {\\n    //       return callback(\\n    //         `活动规则超出每日${opinion[\\\"onThresholdTime\\\"]}小时上限值，可能造成引导司机疲劳驾驶的风险，建议针对指定人群的司机配置活动`\\n    //       );\\n    //     }\\n    //     return callback();\\n    //   },\\n    //   trigger: \\\"blur\\\",\\n    // },\\n    {\\n      required: true,\\n      message: \\\"请填写出车时长\\\",\\n      type: \\\"array\\\",\\n      trigger: \\\"blur\\\",\\n    },\\n  ];\\n});\\n\",\"on\":\"(function() {\\n    return {}\\n})\",\"interaction\":\"(function() {\\n    return {}\\n})\",\"options\":\"[\\n]\",\"special\":\"{\\n}\"}}]}",
    'ruleConfig': null,
    'status': null,
    'description': null,
    'createByName': null,
    'gmtCreate': null,
    'updateByName': null,
    'gmtModified': null
  },
  {
    'id': 101,
    'name': null,
    'sceneId': 21,
    'sceneName': null,
    'componentConfig': "{\"label\":\"拼车单类型\",\"name\":\"carPoolType\",\"type\":\"chunk\",\"operations\":\"(function() {\\n    return {\\n        \\n    }\\n})\",\"options\":{\"interaction\":\"(function() {\\n    return {\\n        display: function(form) {\\n            console.log(form, !Array.isArray(form.taskList) || form.taskList.length == 0)\\n            if(!Array.isArray(form.taskList) || form.taskList.length == 0) {\\n                // delete form.taskList[0].carPoolType\\n                return false\\n            } else {\\n                console.log( form.taskList[0].carPoolEffective, '拼车单value')\\n             return form.taskList[0].carPoolEffective == 1\\n\\n            }\\n        }\\n    }\\n})\"},\"fields\":[{\"field\":\"211\",\"defaultValue\":\"0\",\"component\":\"el-radio-group\",\"options\":{\"data\":\"[\\n    {\\n        \\\"label\\\":\\\"不限\\\",\\n        \\\"value\\\":0\\n    },\\n    {\\n        \\\"label\\\":\\\"仅拼成单\\\",\\n        \\\"value\\\":1\\n    }\\n]\",\"dataSrc\":\"\",\"attrs\":\"(function() {\\n    return {}\\n})\",\"rules\":\"(function() {\\n    return []\\n})\",\"on\":\"(function() {\\n    return {}\\n})\",\"interaction\":\"(function() {\\n    return {\\n        // display: function(form) {   \\n        //     return form?.taskList[0]?.carPoolEffective === 1\\n        // }\\n    }\\n})\",\"options\":\"[\\n    {\\n        label: '1.选项',\\n        value: [0,1],\\n        key: 'option',\\n        type: 'BlmBizCheckboxGroup',\\n        describe: '',\\n        props: {\\n            min: 1,\\n            options: [\\n                {\\n                    label: \\\"不限\\\",\\n                    value: 0,\\n                    disabled: false,\\n                },\\n                {\\n                    label: \\\"拼成单\\\",\\n                    value: 1,\\n                    disabled: false,\\n                },\\n            ]\\n        },\\n       \\n    },\\n]\"}}]}",
    'ruleConfig': null,
    'status': null,
    'description': null,
    'createByName': null,
    'gmtCreate': null,
    'updateByName': null,
    'gmtModified': null
  },
  {
    'id': 99,
    'name': null,
    'sceneId': 21,
    'sceneName': null,
    'componentConfig': "{\"label\":\"总计奖励\",\"name\":\"rewardTotalMoney\",\"type\":\"chunk\",\"options\":{},\"fields\":[{\"field\":\"139\",\"defaultValue\":\"\",\"component\":\"el-input-number\",\"operations\":\"{}\",\"options\":{\"attrs\":\"(function() {\\n    return {\\n        prefix: '',\\n        suffix: '元',\\n        width: '200px',\\n        controls: false,\\n        max: 9999.99,\\n        precision:2,\\n        min: 0,\\n        warning: \\\"${ selfValue >= ruleValue['orderNum'] * 50 || selfValue >= ruleValue['effectiveHour'] * 20 || selfValue >= ruleValue['moneyAfterCommission'] ? '*该配置可能有误，请检查并确认（此提示只为防止错配，不影响编辑提交）' : '' }\\\"\\n    }\\n})\",\"rules\":\"(function() {\\n  // 勿动 @gongzhen\\n  return [\\n    {\\n      required: true,\\n      type: 'number',\\n      message: '请填写总计奖励',\\n     // trigger: 'blur'\\n    },\\n    {\\n      validator: (rule, value, callback) => {\\n        const fract = (num) => {\\n          return num - Math.trunc(num)\\n        }\\n        if (!value) {\\n          return callback(new Error('请填写总计奖励'))\\n        }\\n\\n        if (value < 0) {\\n          return callback(new Error('数据格式只能为正数'))\\n        }\\n        if (value > 100000) {\\n          return callback(new Error('小数点前至多4位'))\\n        }\\n\\n        // if (!/^[0-9]+$/.test(fract(value) * 100)) {\\n        //   return callback(new Error('小数点后至多2位'))\\n        // }\\n\\n        return callback()\\n      }\\n\\n    }\\n  ]\\n})\",\"on\":\"(function() {\\n    return {}\\n})\",\"interaction\":\"(function() {\\n    return {}\\n})\",\"options\":\"[\\n    {\\n        label: '1.选项',\\n        value: 0,\\n        key: 'option',\\n        descrition: '',\\n        type: 'BlmBizFormRadioGroup',\\n        props: {\\n            options: [\\n                {\\n                    label: \\\"固定金额\\\",\\n                    value: 0\\n                },\\n            ]\\n        }\\n    }\\n]\",\"special\":\"{\\n}\"}}]}",
    'ruleConfig': null,
    'status': null,
    'description': null,
    'createByName': null,
    'gmtCreate': null,
    'updateByName': null,
    'gmtModified': null
  },
  {
    'id': 279,
    'name': null,
    'sceneId': 21,
    'sceneName': null,
    'componentConfig': "{\"label\":\"完单量\",\"name\":\"orderNum_v2\",\"type\":\"chunk\",\"alias\":\"完成\",\"options\":{\"interaction\":\"(function() {\\n  const ctx = this\\n  const orderNumInfo = this.specialField.filter(item => item.relationField === 'orderNum')[0] // 是否是拼车单还是拼车单区间\\n\\n  // @gongzhen\\n  return {\\n    display: function(newFormData, oldFormData, tag) {\\n      if (orderNumInfo && orderNumInfo.isInterval) {\\n        if (tag) {\\n          const { ruleLayer, taskNum } = tag\\n          if (newFormData?.taskList[taskNum]?.awardRules.length - 1 < ruleLayer) return true\\n\\n          if (ruleLayer !== 0) {\\n            let nextValue = ctx.formData?.taskList[taskNum]?.awardRules[ruleLayer]?.orderNum[0]\\n            if (typeof nextValue !== 'number') {\\n              nextValue = undefined\\n            }\\n\\n            const nextValue2 = ctx.formData?.taskList[taskNum]?.awardRules[ruleLayer]?.orderNum[1]\\n            const firstValue = ctx.formData?.taskList[taskNum]?.awardRules[ruleLayer - 1]?.orderNum[0]\\n            const firstValue2 = ctx.formData?.taskList[taskNum]?.awardRules[ruleLayer - 1]?.orderNum[1]\\n\\n            // 获取当前层级的上一次赋值\\n            const preNextValue = oldFormData && oldFormData.formData?.taskList[taskNum]?.awardRules[ruleLayer]?.orderNum[0]\\n            // 不再进行值的更新\\n            if (nextValue > 999) {\\n              ctx.$set(ctx.formData?.taskList[taskNum]?.awardRules[ruleLayer]?.orderNum, 0, preNextValue)\\n            }\\n\\n            if (typeof nextValue === 'number' && ((firstValue + 2 > nextValue))) {\\n              setTimeout(() => {\\n                ctx.$set(ctx.formData?.taskList[taskNum].awardRules[ruleLayer]?.orderNum, 0, firstValue + 2)\\n              })\\n            } else if (typeof nextValue === 'number' && firstValue + 2 < nextValue) {\\n              ctx.$set(ctx.formData?.taskList[taskNum]?.awardRules[ruleLayer - 1]?.orderNum, 1, nextValue - 1)\\n            } else if (!firstValue2 || (firstValue2 && firstValue2 >= nextValue)) {\\n              ctx.$set(ctx.formData?.taskList[taskNum]?.awardRules[ruleLayer - 1]?.orderNum, 1, nextValue - 1)\\n            } else if (nextValue2 && nextValue2 <= nextValue) {\\n              ctx.$set(ctx.formData?.taskList[taskNum]?.awardRules[ruleLayer]?.orderNum, 1, nextValue + 1)\\n            }\\n          }\\n\\n            // 最高层级删除第二值\\n            if (newFormData?.taskList[taskNum]?.awardRules.length - 1 === ruleLayer) {\\n              if (newFormData?.taskList[taskNum]?.awardRules[ruleLayer]) {\\n                ctx.$set(ctx.formData?.taskList[taskNum]?.awardRules[ruleLayer]?.orderNum, 1, undefined)\\n              }\\n            }\\n        }\\n      }\\n\\n      return true\\n    }\\n  }\\n})\\n\\n\"},\"fields\":[{\"field\":\"111\",\"defaultValue\":\"\",\"component\":\"BLMIntervalValue\",\"operations\":\"{}\",\"options\":{\"attrs\":\"\\n(function(currentFileName, taskNum, ruleLayer) {\\n  // TODO 解析代码处理待优化\\n  const rewardRule = this.utils.findComponentsDownward('rewardRule')\\n  const currentRuleLayer = rewardRule[taskNum]?.currentRuleData?.length // 一共多少层\\n  const orderNumInfo = this.specialField.filter(item => item.relationField === 'orderNum')[0] // 是否是拼单还是拼车单区间\\n\\n  /**\\n     * 当前层是否为最高层\\n     */\\n  const isHighest = () => {\\n    if (currentRuleLayer && (ruleLayer === 0 || ruleLayer)) {\\n      // 当前组件是否为最高层级\\n      if (currentRuleLayer - 1 === ruleLayer) {\\n        return true\\n      } else {\\n        return false\\n      }\\n    }\\n    return false\\n  }\\n  if (orderNumInfo) {\\n    if (orderNumInfo.isInterval) {\\n      return {\\n        isRange: !isHighest(),\\n        prefix: '第',\\n        suffix: isHighest() ? '单及以上 ' : ' ',\\n        maxLength: 3,\\n        max1: 999,\\n        min1: 1,\\n        max2: 999,\\n        min2: 1,\\n        precision: 0,\\n        disabled2: !isHighest(),\\n        'step-strictly': true\\n      }\\n    } else {\\n      return {\\n        prefix: '',\\n        suffix: '单',\\n        isRange: false,\\n        maxLength: 3,\\n        max1: 999,\\n        min1: 1,\\n        max2: 999,\\n        min2: 1,\\n        precision: 0,\\n        'step-strictly': true\\n      }\\n    }\\n  } else {\\n    return {\\n      prefix: '',\\n      suffix: '单',\\n      isRange: false,\\n      maxLength: 3,\\n      max1: 999,\\n      min2: 1,\\n      max2: 999,\\n      min1: 1,\\n      precision: 0,\\n      'step-strictly': true\\n    }\\n  }\\n})\\n\\n\",\"rules\":\"(function(form, _, __, tag) {\\n  return [\\n    {\\n      validator: (rule, value, callback) => {\\n        if (!Array.isArray(value)) {\\n          return callback(new Error('请填写完单量'))\\n        }\\n        if (value.length === 0) {\\n          return callback(new Error('请填写完单量'))\\n        }\\n        if (!value[0]) {\\n          return callback(new Error('请填写完单量'))\\n        }\\n\\n        if (value[1] && !value[0]) {\\n          return callback(new Error('请填写完单量'))\\n        }\\n        \\n        \\n        if ((value[0] && value[0] > 999) || (value[1] && value[1] > 999)) {\\n          debugger\\n          return callback(new Error('请检查数据范围'))\\n        }\\n        return callback()\\n      },\\n      trigger: 'blur'\\n    },\\n    {\\n      required: true,\\n      message: '请填写完单量',\\n      type: 'array',\\n      trigger: 'blur'\\n    }\\n\\n  ]\\n})\\n\",\"on\":\"(function() {\\n    return {}\\n})\",\"interaction\":\"(function() {\\n    return {}\\n})\",\"options\":\"[\\n]\",\"special\":\"{\\n}\"}}]}",
    'ruleConfig': null,
    'status': null,
    'description': null,
    'createByName': null,
    'gmtCreate': null,
    'updateByName': null,
    'gmtModified': null
  },
  {
    'id': 97,
    'name': null,
    'sceneId': 21,
    'sceneName': null,
    'componentConfig': "{\"label\":\"完成\",\"name\":\"orderNum\",\"type\":\"chunk\",\"alias\":\"完成\",\"options\":{\"interaction\":\"(function() {\\n  const ctx = this\\n  const orderNumInfo = this.specialField.filter(item => item.relationField === 'orderNum')[0] // 是否是拼车单还是拼车单区间\\n\\n  // @gongzhen\\n  return {\\n    display: function(newFormData, oldFormData, tag) {\\n      if (orderNumInfo && orderNumInfo.isInterval) {\\n        if (tag) {\\n          const { ruleLayer, taskNum } = tag\\n          if (newFormData?.taskList[taskNum]?.awardRules.length - 1 < ruleLayer) return true\\n\\n          if (ruleLayer !== 0) {\\n            let nextValue = ctx.formData?.taskList[taskNum]?.awardRules[ruleLayer]?.orderNum[0]\\n            if (typeof nextValue !== 'number') {\\n              nextValue = undefined\\n            }\\n\\n            const nextValue2 = ctx.formData?.taskList[taskNum]?.awardRules[ruleLayer]?.orderNum[1]\\n            const firstValue = ctx.formData?.taskList[taskNum]?.awardRules[ruleLayer - 1]?.orderNum[0]\\n            const firstValue2 = ctx.formData?.taskList[taskNum]?.awardRules[ruleLayer - 1]?.orderNum[1]\\n\\n            // 获取当前层级的上一次赋值\\n            const preNextValue = oldFormData && oldFormData.formData?.taskList[taskNum]?.awardRules[ruleLayer]?.orderNum[0]\\n            // 不再进行值的更新\\n            if (nextValue > 999) {\\n              ctx.$set(ctx.formData?.taskList[taskNum]?.awardRules[ruleLayer]?.orderNum, 0, preNextValue)\\n            }\\n\\n            if (typeof nextValue === 'number' && ((firstValue + 2 > nextValue))) {\\n              setTimeout(() => {\\n                ctx.$set(ctx.formData?.taskList[taskNum].awardRules[ruleLayer]?.orderNum, 0, firstValue + 2)\\n              })\\n            } else if (typeof nextValue === 'number' && firstValue + 2 < nextValue) {\\n              ctx.$set(ctx.formData?.taskList[taskNum]?.awardRules[ruleLayer - 1]?.orderNum, 1, nextValue - 1)\\n            } else if (!firstValue2 || (firstValue2 && firstValue2 >= nextValue)) {\\n              ctx.$set(ctx.formData?.taskList[taskNum]?.awardRules[ruleLayer - 1]?.orderNum, 1, nextValue - 1)\\n            } else if (nextValue2 && nextValue2 <= nextValue) {\\n              ctx.$set(ctx.formData?.taskList[taskNum]?.awardRules[ruleLayer]?.orderNum, 1, nextValue + 1)\\n            }\\n          }\\n\\n            // 最高层级删除第二值\\n            if (newFormData?.taskList[taskNum]?.awardRules.length - 1 === ruleLayer) {\\n              if (newFormData?.taskList[taskNum]?.awardRules[ruleLayer]) {\\n                ctx.$set(ctx.formData?.taskList[taskNum]?.awardRules[ruleLayer]?.orderNum, 1, undefined)\\n              }\\n            }\\n        }\\n      }\\n\\n      return true\\n    }\\n  }\\n})\\n\\n\"},\"fields\":[{\"field\":\"111\",\"defaultValue\":\"\",\"component\":\"BLMIntervalValue\",\"operations\":\"{}\",\"options\":{\"attrs\":\"\\n(function(currentFileName, taskNum, ruleLayer) {\\n  // TODO 解析代码处理待优化\\n  const rewardRule = this.utils.findComponentsDownward('rewardRule')\\n  const currentRuleLayer = rewardRule[taskNum]?.currentRuleData?.length // 一共多少层\\n  const orderNumInfo = this.specialField.filter(item => item.relationField === 'orderNum')[0] // 是否是拼单还是拼车单区间\\n\\n  /**\\n     * 当前层是否为最高层\\n     */\\n  const isHighest = () => {\\n    if (currentRuleLayer && (ruleLayer === 0 || ruleLayer)) {\\n      // 当前组件是否为最高层级\\n      if (currentRuleLayer - 1 === ruleLayer) {\\n        return true\\n      } else {\\n        return false\\n      }\\n    }\\n    return false\\n  }\\n  if (orderNumInfo) {\\n    if (orderNumInfo.isInterval) {\\n      return {\\n        isRange: !isHighest(),\\n        prefix: '第',\\n        suffix: isHighest() ? '单及以上 ' : ' ',\\n        maxLength: 3,\\n        max1: 999,\\n        min1: 1,\\n        max2: 999,\\n        min2: 1,\\n        precision: 0,\\n        disabled2: !isHighest(),\\n        'step-strictly': true\\n      }\\n    } else {\\n      return {\\n        prefix: '',\\n        suffix: '单',\\n        isRange: false,\\n        maxLength: 3,\\n        max1: 999,\\n        min1: 1,\\n        max2: 999,\\n        min2: 1,\\n        precision: 0,\\n        'step-strictly': true\\n      }\\n    }\\n  } else {\\n    return {\\n      prefix: '',\\n      suffix: '单',\\n      isRange: false,\\n      maxLength: 3,\\n      max1: 999,\\n      min2: 1,\\n      max2: 999,\\n      min1: 1,\\n      precision: 0,\\n      'step-strictly': true\\n    }\\n  }\\n})\\n\\n\",\"rules\":\"(function(form, _, __, tag) {\\n  return [\\n    {\\n      validator: (rule, value, callback) => {\\n        if (!Array.isArray(value)) {\\n          return callback(new Error('请填写完单量'))\\n        }\\n        if (value.length === 0) {\\n          return callback(new Error('请填写完单量'))\\n        }\\n        if (!value[0]) {\\n          return callback(new Error('请填写完单量'))\\n        }\\n\\n        if (value[1] && !value[0]) {\\n          return callback(new Error('请填写完单量'))\\n        }\\n        \\n        \\n        if ((value[0] && value[0] > 999) || (value[1] && value[1] > 999)) {\\n          debugger\\n          return callback(new Error('请检查数据范围'))\\n        }\\n        return callback()\\n      },\\n      trigger: 'blur'\\n    },\\n    {\\n      required: true,\\n      message: '请填写完单量',\\n      type: 'array',\\n      trigger: 'blur'\\n    }\\n\\n  ]\\n})\\n\",\"on\":\"(function() {\\n    return {}\\n})\",\"interaction\":\"(function() {\\n    return {}\\n})\",\"options\":\"[\\n]\",\"special\":\"{\\n}\"}}]}",
    'ruleConfig': null,
    'status': null,
    'description': null,
    'createByName': null,
    'gmtCreate': null,
    'updateByName': null,
    'gmtModified': null
  },
  {
    'id': 93,
    'name': null,
    'sceneId': 21,
    'sceneName': null,
    'componentConfig': "{\"label\":\"区域要求\",\"name\":\"areaLimit\",\"type\":\"chunk\",\"options\":{},\"fields\":[{\"field\":\"91\",\"defaultValue\":\"\",\"component\":\"el-radio-group\",\"options\":{\"data\":\"[\\n    {\\n        label: \\\"不限\\\",\\n        value: -1\\n    },\\n    {\\n        label: \\\"区县\\\",\\n        value: 1\\n    },\\n    {\\n        label: \\\"电子围栏\\\",\\n        value: 2\\n    },\\n]\",\"dataSrc\":\"\",\"attrs\":\"(function() {\\n    return {}\\n})\",\"rules\":\"(function() {\\n    return [\\n        {required: true, message: '请输入区域要求', trigger: 'blur', type: 'number'},\\n    ]\\n})\",\"on\":\"(function() {\\n    return {}\\n})\",\"interaction\":\"(function() {\\n    return {\\n        display:function (newForm, oldForm) {\\n           if ((newForm.taskList && newForm.taskList[0] && newForm.taskList[0].areaLimit) && (oldForm && oldForm.taskList && oldForm.taskList[0] && oldForm.taskList[0].areaLimit) &&  (newForm.taskList[0].areaLimit !== oldForm.taskList[0].areaLimit) && newForm.taskList[0].areaLimit === -1) {\\n               this.$delete(this.formData.taskList[0], 'areaAdcodes')\\n               this.$delete(this.formData.taskList[0], 'sysFences')\\n           }\\n        } \\n    }\\n})\",\"options\":\"[\\n    {\\n        label: '1.选项',\\n        value: [-1,1,2],\\n        key: 'option',\\n        descrition: '',\\n        type: 'BlmBizCheckboxGroup',\\n        props: {\\n            min: 1,\\n            options: [\\n                {\\n                    label: \\\"不限\\\",\\n                    value: -1\\n                },\\n                {\\n                    label: \\\"区县\\\",\\n                    value: 1\\n                },\\n                {\\n                    label: \\\"电子围栏\\\",\\n                    value: 2\\n                },\\n            ]\\n        }\\n    },\\n    {\\n        label: '2.如果选择不限是否展示',\\n        value: 1,\\n        key: 'displayNoLimitEnable',\\n        description: '',\\n        type: 'BlmBizFormRadioGroup',\\n        props: {\\n            options: [\\n                {label: '是', value: 1},\\n                {label: '否', value: 0}\\n            ]\\n        }\\n    },\\n    {\\n        label: '3.说明',\\n        value: '选择全城的情况下，司机完成起点在任意区域的订单都会计入活动有效订单；\\\\n通过\\\"区/县\\\"或“电子围栏”的情况下，司机完成起点在限制区域内的订单才会计入活动有效订单。',\\n        key: 'description',\\n        description: '',\\n        type: 'BlmBizInput',\\n        props: {\\n        placeholder: '限200字',\\n           maxlength: 200,\\n           type: 'textarea'\\n        }\\n    }\\n]\"}},{\"field\":\"93\",\"defaultValue\":\"\",\"component\":\"el-select\",\"options\":{\"data\":\"[]\",\"dataSrc\":\"\",\"attrs\":\"(function() {\\n    return {\\n        multiple: true\\n    }\\n})\",\"rules\":\"(function(form) {\\n    // return []\\n    const _self = this\\n    return [\\n        {\\n            validator: (rule, value, callback ) => {\\n                \\n                if(_self.formData?.taskList[0]?.areaLimit !== 1) {\\n                    return callback()\\n                }\\n\\n                if (!Array.isArray(value)) {\\n                    return callback(new Error('请填写区县'))\\n                }\\n\\n                if (value.length === 0) {\\n                    return callback(new Error('请填写区县'))\\n                }\\n\\n                return callback()\\n            },\\n            trigger: 'blur',\\n            \\n        }\\n    ]\\n})\",\"on\":\"(function() {\\n    return {}\\n})\",\"interaction\":\"(function () {\\n  return {\\n    display: function (form, oldValue) {\\n      if (!Array.isArray(form.taskList)) return false;\\n\\n      //  属于数据联动@zhangjie\\n      // 活动城市清空，清空\\n      if (\\n        Array.isArray(form.adcodes) &&\\n        oldValue &&\\n        JSON.stringify(form.adcodes) !== JSON.stringify(oldValue.adcodes) &&\\n        Array.isArray(form.taskList[0][\\\"areaAdcodes\\\"]) &&\\n        form.taskList[0][\\\"areaAdcodes\\\"].length !== 0\\n      ) {\\n        this.$set(this.formData[\\\"taskList\\\"], 0, {\\n          ...form.taskList[0],\\n          areaAdcodes: [],\\n        });\\n        // form.taskList[0]['areaAdcodes'].length = 0\\n      }\\n      // 确保数据唯一@张熠\\n      if (\\n        form.taskList &&\\n        form.taskList[0] &&\\n        form.taskList[0].areaAdcodes &&\\n        oldValue &&\\n        oldValue.taskList &&\\n        oldValue.taskList[0] &&\\n        oldValue.taskList[0].areaAdcodes &&\\n        form.taskList[0].areaAdcodes.toString() !==\\n          oldValue.taskList[0].areaAdcodes.toString() &&\\n        form.taskList[0].areaLimit === 1\\n      ) {\\n        this.$delete(this.formData.taskList[0], \\\"sysFences\\\");\\n      }\\n      // 属于数据联动\\n      return form.taskList[0][\\\"areaLimit\\\"] === 1;\\n    },\\n    options: function (request, form) {\\n      if (\\n        !form[\\\"adcodes\\\"] ||\\n        !Array.isArray(form[\\\"adcodes\\\"]) ||\\n        form.adcodes.length !== 1\\n      ) {\\n        return Promise.resolve([]);\\n      }\\n\\n      return request\\n        .post(\\\"/admin/v1/ops/fence/getFenceAndArea\\\", {\\n          cityCode: form.adcodes.join(\\\",\\\"),\\n        })\\n        .then((res) => {\\n          if (res.code === 1 && Array.isArray(res.data)) {\\n            return res.data\\n              .filter((item) => item.type === 1)\\n              .map((item) => ({\\n                label: item.name,\\n                value: item.adCode,\\n              }));\\n          } else {\\n            return [];\\n          }\\n        });\\n    },\\n  };\\n});\\n\",\"options\":\"[\\n]\",\"special\":\"{\\n}\"}},{\"field\":\"95\",\"defaultValue\":\"\",\"component\":\"el-select\",\"options\":{\"data\":\"[]\",\"dataSrc\":\"\",\"attrs\":\"(function() {\\n    return {\\n        multiple: true\\n    }\\n})\",\"rules\":\"(function(form) {\\n    const _self = this\\n    return [\\n        {\\n            validator: (rule, value, callback ) => {\\n                \\n                if(_self.formData?.taskList[0]?.areaLimit !== 2) {\\n                    return callback()\\n                }\\n\\n                if (!Array.isArray(value)) {\\n                    return callback(new Error('请填写电子围栏'))\\n                }\\n\\n                if (value.length === 0) {\\n                    return callback(new Error('请填写电子围栏'))\\n                }\\n\\n                return callback()\\n            },\\n            trigger: 'blur',\\n            \\n        }\\n    ]\\n})\",\"on\":\"(function() {\\n    return {}\\n})\",\"interaction\":\"(function () {\\n  return {\\n    options: function (request, form) {\\n      if (\\n        !form[\\\"adcodes\\\"] ||\\n        !Array.isArray(form[\\\"adcodes\\\"]) ||\\n        form.adcodes.length !== 1\\n      ) {\\n        return Promise.resolve([]);\\n      }\\n\\n      return request({\\n        url: \\\"/admin/v1/ops/fence/findlist\\\",\\n        method: \\\"post\\\",\\n        data: {\\n          cityCode: form.adcodes.join(\\\",\\\"),\\n        },\\n      }).then((res) => {\\n        if (res.code === 1) {\\n          if (!res.data) {\\n            return [];\\n          }\\n\\n          if (!res.data.length) {\\n            return [];\\n          }\\n\\n          return res.data\\n            .filter((item) => {\\n              return item.cityCode === form.adcodes.join(\\\",\\\");\\n            })\\n            .map((item) => {\\n              return {\\n                label: item.fenceName,\\n                value: item.id,\\n              };\\n            });\\n        }\\n      });\\n    },\\n    display: function (form, oldValue) {\\n      if (!Array.isArray(form.taskList)) return false;\\n\\n      // 属于数据联动@zhangjie\\n      // 活动城市清空，清空\\n      if (\\n        Array.isArray(form.adcodes) &&\\n        oldValue &&\\n        JSON.stringify(form.adcodes) !== JSON.stringify(oldValue.adcodes) &&\\n        Array.isArray(form.taskList[0][\\\"sysFences\\\"]) &&\\n        form.taskList[0][\\\"sysFences\\\"].length !== 0\\n      ) {\\n        form.taskList[0][\\\"sysFences\\\"] = [];\\n      }\\n\\n      // 确保数据唯一@张熠\\n      if (\\n        form.taskList &&\\n        form.taskList[0] &&\\n        form.taskList[0].sysFences &&\\n        oldValue &&\\n        oldValue.taskList &&\\n        oldValue.taskList[0] &&\\n        oldValue.taskList[0].sysFences &&\\n        form.taskList[0].sysFences.toString() !==\\n          oldValue.taskList[0].sysFences.toString() &&\\n        form.taskList[0].areaLimit === 2\\n      ) {\\n        this.$delete(this.formData.taskList[0], \\\"areaAdcodes\\\");\\n      }\\n      // 属于数据联动\\n\\n      return form.taskList[0][\\\"areaLimit\\\"] === 2;\\n    },\\n  };\\n});\\n\",\"options\":\"[\\n]\",\"special\":\"{\\n}\"}}]}",
    'ruleConfig': null,
    'status': null,
    'description': null,
    'createByName': null,
    'gmtCreate': null,
    'updateByName': null,
    'gmtModified': null
  },
  {
    'id': 91,
    'name': null,
    'sceneId': 21,
    'sceneName': null,
    'componentConfig': "{\"label\":\"时段要求\",\"name\":\"timeLimit\",\"type\":\"chunk\",\"options\":{},\"fields\":[{\"field\":\"87\",\"defaultValue\":\"[]\",\"component\":\"BLMTimePickerListLimit\",\"operations\":\"{}\",\"options\":{\"data\":\"[\\n    {\\n        label: \\\"不限\\\",\\n        value: -1\\n    },\\n    {\\n        label: \\\"指定时段\\\",\\n        value: 1\\n    },\\n]\",\"attrs\":\"(function () {\\n  return {\\n    format: \\\"HH:mm\\\",\\n    timeMinLength: 1,\\n    timeMaxLength: 3,\\n    minLength: 0,\\n    maxLength: 5,\\n    minStep: 30,\\n    clearable: true,\\n    defaultValue: [],\\n    defaultStartTime: \\\"07:00\\\",\\n  };\\n});\\n\",\"rules\":\"(function(form, config) {\\n  const timeList = this.formData.taskList && this.formData.taskList[0] && this.formData.taskList[0].timeLimit || []\\n  return [\\n  {\\n    message: '请填写时段',\\n    type: 'array',\\n    required: !timeList.length === 0\\n  }, \\n  {\\n    validator: (rule, value, callback) => {\\n      if(value.length===0) return callback()\\n      for (let index = 0; index < value.length; index++) {\\n        const currentTime = value[index]\\n        console.debug('currentTime', JSON.stringify(currentTime))\\n        const start = new Date(`2021-01-01 ${currentTime[0]}`)\\n        const end = new Date(`2021-01-01 ${currentTime[1]}`)\\n        console.debug('start', start)\\n        console.debug('end', end)\\n        const no_repeat = value.every((item, i) => {\\n          if (index === i) {\\n            return true\\n          }\\n          const cStart = new Date(`2021-01-01 ${item[0]}`)\\n          const cEnd = new Date(`2021-01-01 ${item[1]}`)\\n          return end <= cStart || start >= cEnd\\n        })\\n        console.debug('no_repeat', no_repeat)\\n        if (!no_repeat) {\\n          return callback(new Error('时间段不能重叠'))\\n        }\\n        if (start >= end) {\\n          return callback(new Error('开始时段不能大于或等于结束时段'))\\n        }\\n        console.debug('end.getTime() - start.getTime()', end.getTime() - start.getTime())\\n        if (end.getTime() - start.getTime() < (30 * 60 * 1000 - 1000)) {\\n          return callback(new Error(`时间间隔必须大于等于${30}分钟`))\\n        }\\n      }\\n      debugger\\n      return callback()\\n    },\\n    trigger: 'change'\\n  }]\\n})\\n\",\"on\":\"(function() {\\n    return {}\\n})\",\"interaction\":\"(function() {\\n    return {}\\n})\",\"options\":\"[\\n    {\\n        label: '1.选项',\\n        value: [-1, 1],\\n        key: 'option',\\n        descrition: '',\\n        type: 'BlmBizCheckboxGroup',\\n        props: {\\n            min: 1,\\n            options: [\\n                {\\n                    label: \\\"不限\\\",\\n                    value: -1\\n                },\\n                {\\n                    label: \\\"指定时段\\\",\\n                    value: 1\\n                },\\n                \\n            ]\\n        }\\n    },\\n    {\\n        label: '2.如果选择不限是否展示',\\n        value: 1,\\n        key: 'displayNoLimitEnable',\\n        description: '',\\n        type: 'BlmBizFormRadioGroup',\\n        props: {\\n            options: [\\n                {label: '是', value: 1},\\n                {label: '否', value: 0}\\n            ]\\n        }\\n    }\\n]\",\"special\":\"{\\n}\"}}]}",
    'ruleConfig': null,
    'status': null,
    'description': null,
    'createByName': null,
    'gmtCreate': null,
    'updateByName': null,
    'gmtModified': null
  },
  {
    'id': 89,
    'name': null,
    'sceneId': 21,
    'sceneName': null,
    'componentConfig': "{\"label\":\"任务周期\",\"name\":\"taskPeriod\",\"type\":\"chunk\",\"operations\":\"(function() {\\n    return {\\n        taskPeriod: {\\n            option: 0\\n        }\\n    }\\n})\",\"options\":{},\"fields\":[{\"field\":\"105\",\"defaultValue\":\"0\",\"component\":\"el-radio-group\",\"options\":{\"data\":\"[\\n    {\\n        label: '每日任务',\\n        value: 0\\n    },\\n        {\\n        label: '周期任务',\\n        value: 2\\n    },\\n]\",\"dataSrc\":\"\",\"attrs\":\"(function() {\\n    return {}\\n})\",\"rules\":\"(function(form) {\\n    const _self = this\\n    return [\\n        {\\n            validator: (rule, value, callback) => {\\n                const taskPeriod = _self?.formData?.taskPeriod\\n                if (taskPeriod === 0) {\\n                    return callback() \\n                }\\n                if (!taskPeriod) {\\n                    return callback(new Error('请填写任务周期'))\\n                }\\n                return callback()\\n            },\\n            trigger: 'blur',\\n            type: 'number'\\n        },\\n        {\\n            required: true,\\n            message: '请填写任务周期',\\n            type:'number',\\n            trigger: 'blur'\\n        }\\n    ]\\n})\",\"on\":\"(function() {\\n    return {}\\n})\",\"interaction\":\"(function() {\\n    return {}\\n})\",\"options\":\"[\\n    {\\n        label: '1.选项',\\n        value: 0,\\n        key: 'option',\\n        description: \\\"\\\",\\n        type: \\\"BlmBizRadioGroup\\\",\\n        triggerChunk: [\\n            {\\n                chunk: 'settlementInterval',\\n                handle: function(triggerChunk, currentChunk) {\\n\\n                    if ( !triggerChunk || !currentChunk )  return\\n\\n                   \\n                    // 如果为周期任务\\n                    if ( currentChunk.operations && currentChunk.operations[ 'taskPeriod' ] && currentChunk.operations[ 'taskPeriod' ][ 'option' ] == 2 ) {\\n                          \\n                        // options可能为字符串，需要转换下\\n                        triggerChunk.fields[0].options.options = eval( triggerChunk.fields[0].options.options)\\n                        triggerChunk.fields[0].options.options[0].props.options[1].disabled = true\\n                        triggerChunk.fields[0].options.options[0].value = [ 0 ]\\n\\n                        if( triggerChunk.operations && triggerChunk.operations['settlementInterval'] ) {\\n                            triggerChunk.operations['settlementInterval'].option = [0]\\n                        } \\n                    } else {\\n\\n                         \\n                        triggerChunk.fields[0].options.options = eval( triggerChunk.fields[0].options.options)\\n                        triggerChunk.fields[0].options.options[0].props.options[1].disabled = false\\n                        if( triggerChunk.operations && triggerChunk.operations['settlementInterval'] ) {\\n                            triggerChunk.operations['settlementInterval'].option = triggerChunk.operations['settlementInterval'].option || [0,1]\\n                        } \\n                    }\\n\\n\\n                }\\n            }\\n        ],\\n        props: {\\n            options: [\\n\\n                {\\n                    label: '每日任务',\\n                    value: 0\\n                },\\n                {\\n                    label: '周期任务',\\n                    value: 2\\n                },\\n                \\n            ]\\n        }\\n    },\\n    \\n]\\n\"}}]}",
    'ruleConfig': null,
    'status': null,
    'description': null,
    'createByName': null,
    'gmtCreate': null,
    'updateByName': null,
    'gmtModified': null
  },
  {
    'id': 87,
    'name': null,
    'sceneId': 21,
    'sceneName': null,
    'componentConfig': '{"label":"任务间关系","name":"taskRelations","type":"chunk","fields":[{"field":"161","component":"span","options":{"attrs":"(function() {\\n    return {}\\n})","rules":"(function() {\\n    return {}\\n})","on":"(function() {\\n    return {}\\n})","interaction":"(function() {\\n    return {}\\n})","options":"[\\n    \\n]"}}]}',
    'ruleConfig': null,
    'status': null,
    'description': null,
    'createByName': null,
    'gmtCreate': null,
    'updateByName': null,
    'gmtModified': null
  },
  {
    'id': 85,
    'name': null,
    'sceneId': 21,
    'sceneName': null,
    'componentConfig': "{\"label\":\"结算周期\",\"name\":\"settlementInterval\",\"type\":\"chunk\",\"options\":{},\"fields\":[{\"field\":\"107\",\"defaultValue\":\"0\",\"component\":\"el-radio-group\",\"options\":{\"data\":\"[\\n    {\\n        label: '活动结束后次日发放',\\n        value: 0\\n    },\\n        {\\n        label: '每日结束后次日发放',\\n        value: 1\\n    },\\n]\",\"dataSrc\":\"\",\"attrs\":\"(function() {\\n    return {\\n        \\n    }\\n})\",\"rules\":\"(function(form) {\\n    const _self = this\\n    return [\\n        {\\n            validator: (rule, value, callback) => {\\n                const settlementInterval = _self?.formData?.settlementInterval\\n                if (settlementInterval === 0) {\\n                    return callback() \\n                }\\n                if (!settlementInterval) {\\n                    return callback(new Error('请填写结算周期'))\\n                }\\n                return callback()\\n            },\\n            trigger: 'blur',\\n            type: 'number'\\n        },\\n        {\\n            required: true,\\n            message: '请填写结算周期',\\n            type:'number',\\n            trigger: 'blur'\\n        }\\n    ]\\n})\",\"on\":\"(function() {\\n    return {}\\n})\",\"interaction\":\"(function() {\\n    return {}\\n})\",\"options\":\"[\\n  {\\n    label: \\\"1.选项\\\",\\n    value: [0, 1],\\n    key: \\\"option\\\",\\n    describe: `<span style=\\\"color:red\\\">*如果任务周期为活动期间累计，则结算周期只能选择活动结束后次日发放</span>`,\\n    type: \\\"BlmBizCheckboxGroup\\\",\\n    relatedChunk: [\\n      {\\n        chunk: \\\"taskPeriod\\\",\\n        handle: function (relatedChunk, currentChunk) {\\n          debugger;\\n          if (!relatedChunk || !currentChunk) return;\\n          // 如果为周期任务\\n          if (\\n            relatedChunk[\\\"operations\\\"] &&\\n            relatedChunk[\\\"operations\\\"][\\\"taskPeriod\\\"] &&\\n            relatedChunk[\\\"operations\\\"][\\\"taskPeriod\\\"][\\\"option\\\"] == 2\\n          ) {\\n            // options可能为字符串，需要转换下\\n            currentChunk.fields[0].options.options = eval(\\n              currentChunk.fields[0].options.options\\n            );\\n            currentChunk.fields[0].options.options[0].props.options[1].disabled = true;\\n            if (\\n              \\\"operations\\\" in currentChunk &&\\n              \\\"settlementInterval\\\" in currentChunk.operations\\n            ) {\\n              currentChunk.operations[\\\"settlementInterval\\\"][\\\"option\\\"] = [0];\\n            }\\n          } else {\\n            // options可能为字符串，需要转换下\\n            currentChunk.fields[0].options.options = eval(\\n              currentChunk.fields[0].options.options\\n            );\\n            currentChunk.fields[0].options.options[0].props.options[1].disabled = false;\\n            if (\\n              \\\"operations\\\" in currentChunk &&\\n              \\\"settlementInterval\\\" in currentChunk.operations\\n            ) {\\n              currentChunk.operations[\\\"settlementInterval\\\"][\\\"option\\\"] =\\n                currentChunk.operations[\\\"settlementInterval\\\"][\\\"option\\\"] || [\\n                  0, 1,\\n                ];\\n            }\\n          }\\n        },\\n      },\\n    ],\\n    props: {\\n      options: [\\n        {\\n          label: \\\"活动结束后次日发放\\\",\\n          value: 0,\\n          disabled: false,\\n        },\\n        {\\n          label: \\\"每日结束后次日发放\\\",\\n          value: 1,\\n          disabled: false,\\n        },\\n      ],\\n      min: 1,\\n    },\\n  },\\n];\\n\"}}]}",
    'ruleConfig': null,
    'status': null,
    'description': null,
    'createByName': null,
    'gmtCreate': null,
    'updateByName': null,
    'gmtModified': null
  },
  {
    'id': 83,
    'name': null,
    'sceneId': 21,
    'sceneName': null,
    'componentConfig': "{\"label\":\"活动城市\",\"name\":\"adcodes\",\"type\":\"chunk\",\"operations\":\"(function() {\\n    return {}\\n})\",\"options\":{\"interaction\":\"(function() {\\n    return {\\n    }\\n})\"},\"fields\":[{\"field\":\"67\",\"defaultValue\":\"[]\",\"component\":\"BLMBatchCitySelect\",\"operations\":\"{}\",\"options\":{\"data\":\"[]\",\"dataSrc\":\"(function (axios, params = {}) {\\n  const areaLimitConfig =\\n    this.utils &&\\n    this.utils.getRelationChunk &&\\n    this.utils.getRelationChunk(\\\"areaLimit\\\", \\\"config\\\");\\n\\n  let flag = false; // 区域要求是否有一个画布没有选择不限\\n\\n  if (Array.isArray(areaLimitConfig)) {\\n    const flagArr = areaLimitConfig.map((item) => {\\n      return item.areaLimit.option.includes(-1);\\n    });\\n    if (flagArr.some((item) => !item)) {\\n      flag = false;\\n    } else {\\n      flag = true;\\n    }\\n  }\\n  const userInfo = this.$store.getters[\\\"userInfo\\\"];\\n  const brandMode = this.$store.getters[\\\"brandMode\\\"];\\n  const isQuery = this.$route.query.environment === \\\"query\\\";\\n\\n  let cityCodeList = flag\\n    ? [\\n        {\\n          adCode: \\\"-1\\\",\\n          city: \\\"全选\\\",\\n        },\\n      ]\\n    : [];\\n\\n  if (isQuery) {\\n    let openedCities = [];\\n    if (this?.$isInHubble) {\\n      openedCities = this.$store.getters[\\\"allCities\\\"];\\n    } else {\\n      openedCities = this.$store.getters[\\\"openedCities\\\"];\\n    }\\n    cityCodeList = cityCodeList.concat(openedCities || []);\\n    if (flag) {\\n      cityCodeList.unshift({\\n        adCode: \\\"ALL\\\",\\n        city: \\\"不限城市\\\",\\n      });\\n    }\\n  } else {\\n    const openedCitiesV2 = this.$store.getters[\\\"openedCitiesV2\\\"];\\n    const brandList = this.$store.getters[\\\"brandList\\\"];\\n    if (brandMode) {\\n      const runTimeSEid = this.$route.query[\\\"runTimeSEid\\\"];\\n      const brand = brandList.find((brand) => brand.tenantId === +runTimeSEid);\\n      cityCodeList = cityCodeList.concat(brand.cityList || []);\\n    }\\n    if (!brandMode) {\\n      cityCodeList = cityCodeList.concat(openedCitiesV2);\\n    }\\n    const { brandTenantMap, tenantId } = userInfo;\\n    const cities =\\n      brandTenantMap[this.$route.query.runTimeSEid || tenantId] || {};\\n    if (flag && cities.allCity) {\\n      cityCodeList.unshift({\\n        adCode: \\\"ALL\\\",\\n        city: \\\"不限城市\\\",\\n      });\\n    }\\n  }\\n  return cityCodeList.map((i) => {\\n    return {\\n      label: i.city,\\n      value: i.adCode,\\n    };\\n  });\\n});\\n\",\"attrs\":\"(function (form, config) {\\n  const areaLimitConfig =\\n    this.utils &&\\n    this.utils.getRelationChunk &&\\n    this.utils.getRelationChunk(\\\"areaLimit\\\", \\\"config\\\");\\n\\n  let flag = false; // 【区县】哈勃配置是否选择了不限\\n\\n  if (Array.isArray(areaLimitConfig)) {\\n    const flagArr = areaLimitConfig.map((item) => {\\n      return item.areaLimit.option.includes(-1);\\n    });\\n    if (flagArr.some((item) => !item)) {\\n      flag = false;\\n    } else {\\n      flag = true;\\n    }\\n  }\\n\\n  const option = {\\n    labelKey: \\\"label\\\",\\n    valueKey: \\\"value\\\",\\n    allValue: \\\"-1\\\",\\n    unlimitedValue: \\\"ALL\\\",\\n    allLabel: \\\"全选\\\",\\n    unlimitedLabel: \\\"不限城市\\\",\\n  };\\n\\n  return {\\n    option,\\n    multiple: flag,\\n    collapseTags: true,\\n    filterable: true,\\n    clearable: true,\\n  };\\n});\\n\",\"rules\":\"(function(form) {\\n  return [\\n    {\\n      required: true,\\n      message: '请选择活动城市',\\n      trigger: 'blur',\\n      type: 'array',\\n      min: 1\\n    }\\n  ]\\n})\\n\",\"on\":\"(function() {\\n    return {}\\n})\",\"interaction\":\"(function() {\\n    return {}\\n})\",\"options\":\"[\\n]\",\"special\":\"{\\n}\"}}]}",
    'ruleConfig': null,
    'status': null,
    'description': null,
    'createByName': null,
    'gmtCreate': null,
    'updateByName': null,
    'gmtModified': null
  },
  {
    'id': 81,
    'name': null,
    'sceneId': 21,
    'sceneName': null,
    'componentConfig': "{\"label\":\"订单流水\",\"name\":\"orderPrice\",\"type\":\"chunk\",\"options\":{},\"fields\":[{\"field\":\"221\",\"defaultValue\":\"\",\"component\":\"el-select\",\"options\":{\"data\":\"[\\n  {\\n      label: '不限制',\\n      value: 'unlimited'\\n  },\\n      {\\n      label: '小于',\\n      value: 'lt'\\n  },\\n      {\\n      label: '小于等于',\\n      value: 'le'\\n  },\\n      {\\n      label: '大于',\\n      value: 'gt'\\n  },\\n      {\\n      label: '大于等于',\\n      value: 'ge'\\n  },\\n      {\\n      label: '区间值(闭区间)',\\n      value: 'bt'\\n  },\\n]\",\"dataSrc\":\"\",\"attrs\":\"(function() {\\n    return {}\\n})\",\"rules\":\"(function() {\\n    return [\\n        {\\n            required: true,\\n            trigger: 'blur',\\n            message: '请填写订单流水',\\n            type: 'string'\\n        }\\n    ]\\n})\",\"on\":\"(function() {\\n    return {}\\n})\",\"interaction\":\"(function() {\\n    return {\\n        display:function (newForm, oldForm) {\\n           if ((newForm.taskList && newForm.taskList[0] && newForm.taskList[0].orderPriceOperator) && (oldForm && oldForm.taskList && oldForm.taskList[0] && oldForm.taskList[0].orderPriceOperator) &&  (newForm.taskList[0].orderPriceOperator !== oldForm.taskList[0].orderPriceOperator) && newForm.taskList[0].orderPriceOperator === 'unlimited') {\\n               this.$delete(this.formData.taskList[0], 'orderPrice')\\n           }\\n        } \\n    }\\n})\",\"options\":\"[\\n    {\\n        label: '1.选项',\\n        value: ['unlimited', 'lt', 'le', 'gt', 'ge', 'bt'],\\n        key: 'option',\\n        description: \\\"\\\",\\n        type: \\\"BlmBizCheckboxGroup\\\",\\n        props: {\\n            min: 1,\\n            options: [\\n                {\\n                    label: '不限制',\\n                    value: 'unlimited'\\n                },\\n                    {\\n                    label: '小于',\\n                    value: 'lt'\\n                },\\n                    {\\n                    label: '小于等于',\\n                    value: 'le'\\n                },\\n                    {\\n                    label: '大于',\\n                    value: 'gt'\\n                },\\n                    {\\n                    label: '大于等于',\\n                    value: 'ge'\\n                },\\n                    {\\n                    label: '区间值(闭区间)',\\n                    value: 'bt'\\n                },\\n            ]\\n        }\\n    },\\n    {\\n        label: '2.如果选择不限是否展示',\\n        value: 1,\\n        key: 'displayNoLimitEnable',\\n        description: '',\\n        type: 'BlmBizFormRadioGroup',\\n        props: {\\n            options: [\\n                {label: '是', value: 1},\\n                {label: '否', value: 0}\\n            ]\\n        }\\n    }\\n]\"}},{\"field\":\"103\",\"defaultValue\":\"\",\"component\":\"BLMIntervalValue\",\"operations\":\"{}\",\"options\":{\"attrs\":\"(function() {\\n    return {\\n        suffix: '元',\\n        isRange: true,\\n        precision: 2,\\n        max: 9999.99,\\n        max1:9999.99,\\n        max2:9999.99,\\n        min1: 1\\n    }\\n})\",\"rules\":\"(function() {\\n    return [\\n         {\\n            validator: (rule, value, callback) => {\\n                if (value.some(i => !i)) {\\n                    return callback('请完成填写')\\n                }\\n                return callback()\\n            },\\n            trigger: 'blur'\\n        }\\n    ]\\n})\",\"on\":\"(function() {\\n    return {}\\n})\",\"interaction\":\"\\n(function() {\\n  return {\\n      display: function(form) {\\n          \\n          if ( !Array.isArray(form.taskList) || form.taskList.length == 0 ) return false\\n\\n        if(form.taskList[0].orderPriceOperator==='unlimited'){\\n          if( Array.isArray( form.taskList[0].orderPrice) &&  form.taskList[0].orderPrice.length != 0) {\\n              form.taskList[0].orderPrice=[]\\n          }\\n          \\n        }\\n          return form.taskList[0][ 'orderPriceOperator' ] === 'bt'\\n      },\\n  }\\n})\",\"options\":\"[\\n]\",\"special\":\"{\\n}\"}},{\"field\":\"103\",\"defaultValue\":\"\",\"component\":\"BLMIntervalValue\",\"operations\":\"{}\",\"options\":{\"attrs\":\"(function() {\\n    return {\\n        suffix: '元',\\n        isRange: false,\\n        precision: 2,\\n        max: 9999.99,\\n        max1:9999.99,\\n        max2:9999.99,\\n        min1: 1\\n    }\\n})\",\"rules\":\"(function() {\\n    return [\\n         {\\n            validator: (rule, value, callback) => {\\n                if (value.some(i => !i)) {\\n                    return callback('请完成填写')\\n                }\\n                return callback()\\n            },\\n            trigger: 'blur'\\n        }\\n    ]\\n})\",\"on\":\"(function() {\\n    return {}\\n})\",\"interaction\":\"(function() {\\n  return {\\n      display: function(form) {\\n    \\n          if ( !Array.isArray(form.taskList) || form.taskList.length == 0 ) return false\\n          \\n\\n        if(form.taskList[0].orderPriceOperator==='unlimited'){\\n         if(Array.isArray(form.taskList[0].orderPrice)&&form.taskList[0].orderPrice.length !==0) {\\n              form.taskList[0].orderPrice=[]\\n         }\\n        }\\n          return ['gt','ge','lt','le'].includes(form.taskList[0][ 'orderPriceOperator' ])\\n      },\\n  }\\n})\",\"options\":\"[\\n]\",\"special\":\"{\\n}\"}}]}",
    'ruleConfig': null,
    'status': null,
    'description': null,
    'createByName': null,
    'gmtCreate': null,
    'updateByName': null,
    'gmtModified': null
  },
  {
    'id': 79,
    'name': null,
    'sceneId': 21,
    'sceneName': null,
    'componentConfig': "{\"label\":\"订单里程\",\"name\":\"orderDistance\",\"type\":\"chunk\",\"options\":{},\"fields\":[{\"field\":\"217\",\"defaultValue\":\"\",\"component\":\"el-select\",\"options\":{\"data\":\"[\\n  {\\n      label: '不限制',\\n      value: 'unlimited'\\n  },\\n      {\\n      label: '小于',\\n      value: 'lt'\\n  },\\n      {\\n      label: '小于等于',\\n      value: 'le'\\n  },\\n      {\\n      label: '大于',\\n      value: 'gt'\\n  },\\n      {\\n      label: '大于等于',\\n      value: 'ge'\\n  },\\n      {\\n      label: '区间值(闭区间)',\\n      value: 'bt'\\n  },\\n]\",\"dataSrc\":\"\",\"attrs\":\"(function() {\\n    return {}\\n})\",\"rules\":\"(function(form, config) {\\n    return [\\n        {\\n            required: true,\\n            message: '请填写订单里程',\\n            type: 'string',\\n            trigger: 'blur'\\n        }\\n    ]\\n})\",\"on\":\"(function() {\\n    return {}\\n})\",\"interaction\":\"(function() {\\n    return {\\n        display:function (newForm, oldForm) {\\n           if ((newForm.taskList && newForm.taskList[0] && newForm.taskList[0].orderDistanceOperator) && (oldForm && oldForm.taskList && oldForm.taskList[0] && oldForm.taskList[0].orderDistanceOperator) &&  (newForm.taskList[0].orderDistanceOperator !== oldForm.taskList[0].orderDistanceOperator) && newForm.taskList[0].orderDistanceOperator === 'unlimited') {\\n               this.$delete(this.formData.taskList[0], 'orderDistance')\\n           }\\n        } \\n    }\\n})\",\"options\":\"[\\n    {\\n        label: '1.选项',\\n        value: ['unlimited','lt','le','gt','ge','bt'],\\n        key: 'option',\\n        description: \\\"\\\",\\n        type: \\\"BlmBizCheckboxGroup\\\",\\n        props: {\\n            min: 1,\\n            options: [\\n\\n                {\\n                    label: '不限制',\\n                    value: 'unlimited'\\n                },\\n                    {\\n                    label: '小于',\\n                    value: 'lt'\\n                },\\n                    {\\n                    label: '小于等于',\\n                    value: 'le'\\n                },\\n                    {\\n                    label: '大于',\\n                    value: 'gt'\\n                },\\n                    {\\n                    label: '大于等于',\\n                    value: 'ge'\\n                },\\n                    {\\n                    label: '区间值(闭区间)',\\n                    value: 'bt'\\n                },\\n            ]\\n        }\\n    },\\n    {\\n        label: '2.如果选择不限是否展示',\\n        value: 1,\\n        key: 'displayNoLimitEnable',\\n        description: '',\\n        type: 'BlmBizFormRadioGroup',\\n        props: {\\n            options: [\\n                {label: '是', value: 1},\\n                {label: '否', value: 0}\\n            ]\\n        }\\n    }\\n]\"}},{\"field\":\"101\",\"defaultValue\":\"\",\"component\":\"BLMIntervalValue\",\"operations\":\"{}\",\"options\":{\"attrs\":\"(function() {\\n    return {\\n        suffix:'公里',\\n        isRange:true,\\n        precision: 2,\\n        max: 9999,\\n        max1:9999,\\n        max2:9999,\\n        min1: 1\\n    }\\n})\",\"rules\":\"(function(form, config) {\\n    return [\\n        {\\n            validator: (rule, value, callback) => {\\n\\n                if (value.some(i => !i)) {\\n                    return callback('请完成填写')\\n                }\\n                return callback()\\n            },\\n            trigger: 'blur'\\n        }\\n    ]\\n})\",\"on\":\"(function() {\\n    return {}\\n})\",\"interaction\":\"(function() {\\n  return {\\n      display: function(form) {\\n        \\n        if ( !Array.isArray(form.taskList) || form.taskList.length == 0 ) return false\\n          \\n        if(form.taskList[0].orderDistanceOperator==='unlimited'){\\n\\n            if(Array.isArray(form.taskList[0].orderDistance) && form.taskList[0].orderDistance.length !== 0){\\n                form.taskList[0].orderDistance=[]\\n            }\\n          \\n        }\\n          return form.taskList[0][ 'orderDistanceOperator' ] == 'bt'\\n      },\\n  }\\n})\",\"options\":\"[\\n]\",\"special\":\"{\\n}\"}},{\"field\":\"101\",\"defaultValue\":\"\",\"component\":\"BLMIntervalValue\",\"operations\":\"{}\",\"options\":{\"attrs\":\"(function() {\\n    return {\\n        suffix:'公里',\\n        isRange:false,\\n        precision: 2,\\n        max: 9999,\\n        max1:9999,\\n        max2:9999,\\n        min1: 1\\n    }\\n})\",\"rules\":\"(function(form, config) {\\n    return [\\n        {\\n            validator: (rule, value, callback) => {\\n                if (value.some(i => !i)) {\\n                    return callback('请完成填写')\\n                }\\n                return callback()\\n            },\\n            trigger: 'blur'\\n        }\\n    ]\\n})\",\"on\":\"(function() {\\n    return {}\\n})\",\"interaction\":\"\\n(function() {\\n  return {\\n      display: function(form) {\\n        \\n          if ( !Array.isArray(form.taskList) || form.taskList.length == 0 ) return false\\n\\n        if(form.taskList[0].orderDistanceOperator==='unlimited'){\\n          if(Array.isArray( form.taskList[0].orderDistance) &&  form.taskList[0].orderDistance.length != 0) {\\n            form.taskList[0].orderDistance=[]\\n          }\\n        }\\n          return ['gt','ge','lt','le'].includes(form.taskList[0][ 'orderDistanceOperator' ])\\n      },\\n  }\\n})\",\"options\":\"[\\n]\",\"special\":\"{\\n}\"}}]}",
    'ruleConfig': null,
    'status': null,
    'description': null,
    'createByName': null,
    'gmtCreate': null,
    'updateByName': null,
    'gmtModified': null
  },
  {
    'id': 77,
    'name': null,
    'sceneId': 21,
    'sceneName': null,
    'componentConfig': "{\"label\":\"订单时效类型\",\"name\":\"orderType\",\"type\":\"chunk\",\"options\":{},\"fields\":[{\"field\":\"99\",\"defaultValue\":\"\",\"component\":\"el-radio-group\",\"options\":{\"data\":\"[\\n    {\\n        label: \\\"不限\\\",\\n        value: -1\\n    },\\n    {\\n        label: \\\"实时单\\\",\\n        value: 200\\n    },\\n    {\\n        label: \\\"预约单\\\",\\n        value: 201\\n    },\\n]\",\"dataSrc\":\"\",\"attrs\":\"(function() {\\n    return {}\\n})\",\"rules\":\"(function() {\\n    return [\\n         {\\n            required: true,\\n            type: 'number',\\n            message: '请选择订单时效类型',\\n            trigger: 'blur'\\n        }\\n    ]\\n})\",\"on\":\"(function() {\\n    return {}\\n})\",\"interaction\":\"(function() {\\n    return {}\\n})\",\"options\":\"[\\n    {\\n        label: '1.选项',\\n        value: [-1, 200, 201],\\n        key: 'option',\\n        descrition: '',\\n        type: 'BlmBizCheckboxGroup',\\n        props: {\\n            min: 1,\\n            options: [\\n                {\\n                    label: \\\"不限\\\",\\n                    value: -1\\n                },\\n                {\\n                    label: \\\"实时单\\\",\\n                    value: 200\\n                },\\n                {\\n                    label: \\\"预约单\\\",\\n                    value: 201\\n                },\\n    \\n            ]\\n        }\\n    },\\n    {\\n        label: '2.如果选择不限是否展示',\\n        value: 1,\\n        key: 'displayNoLimitEnable',\\n        description: '',\\n        type: 'BlmBizFormRadioGroup',\\n        props: {\\n            options: [\\n                {label: '是', value: 1},\\n                {label: '否', value: 0}\\n            ]\\n        }\\n    }\\n]\"}}]}",
    'ruleConfig': null,
    'status': null,
    'description': null,
    'createByName': null,
    'gmtCreate': null,
    'updateByName': null,
    'gmtModified': null
  },
  {
    'id': 75,
    'name': null,
    'sceneId': 21,
    'sceneName': null,
    'componentConfig': "{\"label\":\"拼车单\",\"name\":\"carPoolEffective\",\"type\":\"chunk\",\"operations\":\"(function() {\\n    return {\\n    }\\n})\",\"options\":{\"interaction\":\"(function() {\\n  return {\\n    display: (formData) => {\\n      // if (formData?.taskList[0]?.areaAdcodes) {\\n      //   formData.taskList[0].areaAdcodes = []\\n      // }\\n      // if (formData?.taskList[0]?.sysFences) {\\n      //   formData.taskList[0].sysFences = []\\n      // }\\n\\n      return true\\n    }\\n  }\\n})\\n\"},\"fields\":[{\"field\":\"97\",\"defaultValue\":\"0\",\"component\":\"el-radio-group\",\"operations\":\"(function() {\\n    return {\\n        carPoolEffective: {\\n            description: \\\"\\\",\\n            option: [0]\\n        }\\n    }\\n})\",\"options\":{\"data\":\"[\\n    {\\n        \\\"label\\\":\\\"不计入奖励\\\",\\n        \\\"value\\\":0\\n    },\\n    {\\n        \\\"label\\\":\\\"计入奖励\\\",\\n        \\\"value\\\":1\\n    }\\n]\",\"dataSrc\":\"\",\"attrs\":\"(function() {\\n    return {}\\n})\",\"rules\":\"(function() {\\n    console.log(\\\"look\\\")\\n    console.log(this.utils)\\n    return [\\n         {\\n            required: true,\\n            type: 'number',\\n            message: '请选择拼车单',\\n            trigger: 'blur'\\n        }\\n    ]\\n})\",\"on\":\"(function() {\\n    return {\\n        \\n    }\\n})\",\"interaction\":\"(function() {\\n    return {\\n        display: function(newForm, oldForm) {   \\n            const enumType = [0, 1]\\n           if ((newForm.taskList && newForm.taskList[0] && enumType.includes(newForm.taskList[0].carPoolEffective)) && (oldForm && oldForm.taskList && oldForm.taskList[0] && enumType.includes(oldForm.taskList[0].carPoolEffective)) &&  (newForm.taskList[0].carPoolEffective !== oldForm.taskList[0].carPoolEffective) && newForm.taskList[0].carPoolEffective === 0) {\\n               this.$delete(this.formData.taskList[0], 'carPoolType')\\n           }\\n        }\\n    }\\n})\",\"options\":\"[\\n    {\\n        label: '1.选项',\\n        value: [0,1],\\n        key: 'option',\\n        type: 'BlmBizCheckboxGroup',\\n        describe: '',\\n        props: {\\n            min: 1,\\n            options: [\\n                {\\n                    label: \\\"不计入奖励\\\",\\n                    value: 0,\\n                    disabled: false,\\n                    // description: `${configValue['description']}`\\n                },\\n                {\\n                    label: \\\"计入奖励\\\",\\n                    value: 1,\\n                    disabled: false,\\n                    // description: `${configValue['description']}`\\n                },\\n            ]\\n        },\\n        relatedChunk: [\\n            {\\n                chunk: 'moneyAfterCommission',\\n                handle: function(relatedChunk, currentChunk) {\\n                    console.log('111111111')\\n                    // 如果画布中有抽佣后流水字段\\n                    if ( relatedChunk ) {\\n                        currentChunk.fields[0].options.options = eval( currentChunk.fields[0].options.options)\\n                        currentChunk.fields[0].options.options[0].props.options[1].disabled = true\\n                        currentChunk.fields[0].options.options[0].value = [ 0 ]\\n                        console.log(currentChunk, '111111111111111111111111')\\n                         if ( 'operations' in currentChunk && 'carPoolEffective' in currentChunk.operations ) {\\n                            currentChunk.operations['carPoolEffective'].option = [ 0 ]\\n                              \\n                        }\\n                    } else {\\n                        console.log(11111111111111, '???')\\n                        currentChunk.fields[0].options.options = eval( currentChunk.fields[0].options.options)\\n                        currentChunk.fields[0].options.options[0].props.options[1].disabled = false\\n                        currentChunk.fields[0].options.options[0].value = [ 0, 1 ]\\n                        if ( 'operations' in currentChunk && 'carPoolEffective' in currentChunk.operations ) {\\n                            currentChunk.operations['carPoolEffective'].option = [ 0, 1 ]\\n                        }\\n                    }\\n                    \\n                    \\n                    \\n                    \\n                }\\n            },\\n            {\\n                chunk: 'rewardPerOrderRange_v2',\\n                handle: function(relatedChunk, currentChunk) {\\n                    \\n                    // 如果画布中有每单区间奖励\\n                    if ( relatedChunk) {\\n\\n                        if (relatedChunk.operations.rewardPerOrderRange.rewards === 1) {\\n                             console.log(123, '???')\\n                            currentChunk.fields[0].options.options = eval( currentChunk.fields[0].options.options)\\n                            currentChunk.fields[0].options.options[0].props.options[1].disabled = true\\n                            currentChunk.fields[0].options.options[0].value = [ 0 ]\\n\\n                             if ( 'operations' in currentChunk && 'carPoolEffective' in currentChunk.operations ) {\\n                                currentChunk.operations['carPoolEffective'].option = [ 0 ]\\n                            }\\n\\n                        }\\n                        \\n                        \\n                       \\n                        \\n                    } else {\\n                       \\n                    }\\n                    \\n                    \\n                    \\n                    \\n                }\\n            },\\n             {\\n                chunk: 'rewardPerOrder_v2',\\n                handle: function(relatedChunk, currentChunk) {\\n                    \\n                    // 如果画布中有每单区间奖励\\n                    if ( relatedChunk) {\\n\\n                        if (relatedChunk.operations.rewardPerOrderMoney.rewards === 1) {\\n                             console.log(456, '???')\\n                            currentChunk.fields[0].options.options = eval( currentChunk.fields[0].options.options)\\n                            currentChunk.fields[0].options.options[0].props.options[1].disabled = true\\n                            currentChunk.fields[0].options.options[0].value = [ 0 ]\\n\\n                             if ( 'operations' in currentChunk && 'carPoolEffective' in currentChunk.operations ) {\\n                                currentChunk.operations['carPoolEffective'].option = [ 0 ]\\n                            }\\n\\n                        }\\n                        \\n                        \\n                       \\n                        \\n                    } else {\\n                       \\n                    }\\n                    \\n                    \\n                    \\n                    \\n                }\\n            }\\n            \\n        ],\\n    },\\n    {\\n        label: '2.说明',\\n        value: '拼车业务, 会以拼车行程中的订单计入奖励订单数量,例如: 一个行\\\\n程拼了3单，且3单都在奖励时段内, 则奖励订单数会记为3单,不在\\\\n奖励时段内的订单不计入奖励',\\n        key: 'description',\\n        describe: '<span style=\\\"color:red;\\\" >*如果任务指标中有流水,则拼车单默认不能计入奖励</span>',\\n        type: 'BlmBizInput',\\n        props: {\\n           placeholder: '限200字',\\n           maxlength: 200,\\n           type: 'textarea'\\n        }\\n    }\\n]\",\"special\":\"\"}}]}",
    'ruleConfig': null,
    'status': null,
    'description': null,
    'createByName': null,
    'gmtCreate': null,
    'updateByName': null,
    'gmtModified': null
  },
  {
    'id': 73,
    'name': null,
    'sceneId': 21,
    'sceneName': null,
    'componentConfig': "{\"label\":\"听单模式\",\"name\":\"onlyReservationMode\",\"type\":\"chunk\",\"options\":{},\"fields\":[{\"field\":\"85\",\"defaultValue\":\"\",\"component\":\"el-radio-group\",\"options\":{\"data\":\"[\\n    {\\n        label: \\\"只听预约单模式计入时长奖励\\\",\\n        value: 0\\n    },\\n    {\\n        label: \\\"只听预约单模式不计入时长奖励\\\",\\n        value: 1\\n    },\\n]\",\"dataSrc\":\"\",\"attrs\":\"(function() {\\n    return {}\\n})\",\"rules\":\"(function() {\\n    return [\\n         {\\n            required: true,\\n            type: 'number',\\n            message: '请选择听单模式',\\n            trigger: 'blur'\\n        }\\n    ]\\n})\",\"on\":\"(function() {\\n    return {}\\n})\",\"interaction\":\"(function() {\\n    return {}\\n})\",\"options\":\"[\\n    {\\n        label: '1.选项',\\n        value: [0,1],\\n        key: 'option',\\n        descrition: '',\\n        type: 'BlmBizCheckboxGroup',\\n        props: {\\n            min: 1,\\n            options: [\\n                {\\n                    label: \\\"只听预约单模式计入时长奖励\\\",\\n                    value: 0\\n                },\\n                {\\n                    label: \\\"只听预约单模式不计入时长奖励\\\",\\n                    value: 1\\n                },\\n            ]\\n        }\\n    },\\n]\",\"special\":\"{\\n}\"}}]}",
    'ruleConfig': null,
    'status': null,
    'description': null,
    'createByName': null,
    'gmtCreate': null,
    'updateByName': null,
    'gmtModified': null
  },
  {
    'id': 71,
    'name': null,
    'sceneId': 21,
    'sceneName': null,
    'componentConfig': "{\"label\":\"司机类型\",\"name\":\"driverTypes\",\"type\":\"chunk\",\"options\":{},\"fields\":[{\"field\":\"79\",\"defaultValue\":\"[1,2,3]\",\"component\":\"el-checkbox-group\",\"options\":{\"data\":\"[\\n    {\\n        label: '自营',\\n        value: 1\\n    },\\n    {\\n        label: '无车加盟',\\n        value: 2\\n    },\\n    {\\n        label: '有车加盟',\\n        value: 3\\n    }\\n]\",\"dataSrc\":\"\",\"attrs\":\"(function() {\\n    return {}\\n})\",\"rules\":\"(function() {\\n    return [\\n         {required: true, message: '司机类型不能为空', trigger: 'blur', type: 'array' }\\n    ]\\n})\",\"on\":\"(function() {\\n    return {}\\n})\",\"interaction\":\"(function() {\\n    return {}\\n})\",\"options\":\"[\\n    \\n]\"}}]}",
    'ruleConfig': null,
    'status': null,
    'description': null,
    'createByName': null,
    'gmtCreate': null,
    'updateByName': null,
    'gmtModified': null
  },
  {
    'id': 69,
    'name': null,
    'sceneId': 21,
    'sceneName': null,
    'componentConfig': "{\"label\":\"司机业务类型\",\"name\":\"driverBizTypes\",\"type\":\"chunk\",\"options\":{},\"fields\":[{\"field\":\"77\",\"defaultValue\":\"[-1,3,4,5,300,301]\",\"component\":\"el-checkbox-group\",\"options\":{\"data\":\"[\\n    {\\n        label: '不限',\\n        mutex: true,\\n        value: -1\\n    },\\n    {\\n        label: '快车业务',\\n        value: 300\\n    },\\n    {\\n        label: '专车业务',\\n        value: 301\\n    },\\n    // {\\n    //     label: '出租车业务',\\n    //     value: 302\\n    // },\\n    // {\\n    //     label: '城际业务',\\n    //     value: 303\\n    // }\\n]\",\"dataSrc\":\"\",\"attrs\":\"(function() {\\n    return {}\\n})\",\"rules\":\"(function() {\\n    return [\\n         {required: true, message: '司机业务类型不能为空', trigger: 'blur', type: 'array'}\\n    ]\\n})\",\"on\":\"(function() {\\n    return {}\\n})\",\"interaction\":\"(function() {\\n    return {}\\n})\",\"options\":\"[\\n    \\n]\"}}]}",
    'ruleConfig': null,
    'status': null,
    'description': null,
    'createByName': null,
    'gmtCreate': null,
    'updateByName': null,
    'gmtModified': null
  },
  {
    'id': 67,
    'name': null,
    'sceneId': 21,
    'sceneName': null,
    'componentConfig': '{"label":"支付方式","name":"paymentMode","type":"chunk","fields":[{"field":"83","component":"el-radio-group","options":{"data":"[\\n    {\\n        value: -1\\n        lavel: \\"不限\\"\\n    },\\n    {\\n        value:  1\\n        lable: \\"仅线上支付订单\\"\\n    },\\n    {\\n        value: 2,\\n        label: \\"仅线下支付订单\\"\\n    }\\n]","dataSrc":"","attrs":"(function() {\\n    return {}\\n})","rules":"(function() {\\n    return [\\n        {\\n            require: true,\\n            message: \\"请选择支付方式\\"\\n        }\\n    ]\\n})","on":"(function() {\\n    return {}\\n})","interaction":"(function() {\\n    return {}\\n})","options":"[\\n    \\n]"}}]}',
    'ruleConfig': null,
    'status': null,
    'description': null,
    'createByName': null,
    'gmtCreate': null,
    'updateByName': null,
    'gmtModified': null
  },
  {
    'id': 65,
    'name': null,
    'sceneId': 21,
    'sceneName': null,
    'componentConfig': "{\"label\":\"活动时间\",\"name\":\"actTime\",\"type\":\"chunk\",\"operations\":\"(function() {\\n    return {\\n        actTime: {\\n            rule: 2,\\n            rule_day: 7\\n        }\\n    }\\n})\",\"options\":{},\"fields\":[{\"field\":\"69\",\"defaultValue\":\"[]\",\"component\":\"el-date-range\",\"options\":{\"attrs\":\"(function() {\\n    return {\\n        \\\"type\\\":\\\"daterange\\\",\\n        \\\"rangeSeparator\\\":\\\"-\\\",\\n        \\\"startPlaceholder\\\":\\\"开始时间\\\",\\n        \\\"endPlaceholder\\\":\\\"结束时间\\\",\\n        \\\"valueFormat\\\": \\\"timestamp\\\",\\n        \\\"type\\\": \\\"datetimerange\\\",\\n        \\\"defaultTime\\\":['00:00:00', '23:59:59'],\\n        \\\"format\\\": \\\"yyyy-MM-dd HH:mm\\\"\\n    }\\n})\",\"rules\":\"(function(form, config) {\\n   \\n    return [\\n        {required: true, message: '请输入活动时间', trigger: 'blur', type: 'array'},\\n        {\\n            validator: (rule, value, callback) => {\\n               \\n                // const {rule, rule_day, rule_days } = config\\n                \\n                if (!config?.rule) {\\n                    return callback()\\n                }\\n                \\n               \\n                const begintime = new Date(value[0]).getTime();  \\n                const endtime = new Date(value[1]).getTime();     \\n                let nTime = endtime  - begintime  ;  // 我不理解但是我大为震撼  \\n\\n                const hour = new Date(value[1]).getHours()\\n                const minutes = new Date(value[1]).getMinutes()\\n                const seconds = new Date(value[1]).getSeconds()\\n\\n                if(hour === 23 && minutes === 59 && seconds === 59) {\\n                    nTime += 1000\\n                }\\n                \\n                if(hour === 0 && minutes === 0 && seconds === 0) {\\n                    nTime += 1000\\n                }\\n\\n                const day = Math.floor(nTime/86400000 * 1000000) / 1000000  \\n                \\n                if (config?.rule === 2 &&  day > config.rule_day ) {\\n                    return callback(new Error('不得大于' + config.rule_day + '天'))\\n                }\\n\\n\\n                if (config?.rule === 4 &&  day !== config.rule_day) {\\n                    return callback(new Error('需等于' + config.rule_day + '天'))\\n                }\\n\\n                if (config?.rule === 3 && ( day < config.rule_days[0] ||  day > config.rule_days[1])) {\\n                    return callback(new Error('需在' + config.rule_days[0] + '-' + config.rule_days[1] + '天内'))\\n                }\\n\\n                return callback()\\n               \\n                \\n            },\\n            trigger: 'blur'\\n        }\\n    ]\\n})\",\"on\":\"(function() {\\n    return {}\\n})\",\"interaction\":\"(function() {\\n    return {}\\n})\",\"options\":\"[\\n    {\\n        label: '1.填写要求',\\n        value: 2,\\n        key: 'rule',\\n        describe: '',\\n        type: 'BlmBizFormRadioGroup',\\n        props: {\\n            options: [\\n            //     {\\n            //     label: '不限制',\\n            //     value: -1, \\n            //     description: `` \\n            // },\\n            // {\\n            //     label: '大于等于',\\n            //     value: 1,\\n            //     description: '最少设置${configValue[\\\"rule_day\\\"]}天'\\n            // },\\n            {\\n                label: '小于等于',\\n                value: 2,\\n                description: '最多设置${configValue[\\\"rule_day\\\"]}天'\\n            },\\n            {\\n                label: '区间值(闭)',\\n                value: 3,\\n                description: '请设置${configValue[\\\"rule_days\\\"][0]}' + '-'  + '${configValue[\\\"rule_days\\\"][1]}天'\\n            },\\n            {\\n                label: '等于',\\n                value: 4,\\n                description: '请设置${configValue[\\\"rule_day\\\"]}天'\\n            }\\n            ]\\n        },\\n    },\\n   \\n    // 大于等于\\n    // {\\n    //     lable: '',\\n    //     value: 1,\\n    //     key: 'rule_day',\\n    //     description: '<aside style=\\\"padding-left: 3px;color: #f00\\\"><aside>',\\n    //     type: 'BlmBizInputNumber',\\n    //     props: {\\n    //         size: 'mini',\\n    //         suffix: '天',\\n    //         min: 1,\\n    //         max: 99,\\n    //         precision: 0,\\n    //         controls: false\\n           \\n    //     },\\n    //     linkage: {\\n    //         key: 'rule',\\n    //         condition: function(value, form) {\\n    //             return value == 1\\n    //         },\\n    //     }\\n    // },\\n    // 等于\\n    {\\n        lable: '',\\n        value: 1,\\n        key: 'rule_day',\\n        description: '',\\n        type: 'BlmBizInputNumber',\\n        props: {\\n            size: 'mini',\\n            suffix: '天',\\n            min: 1,\\n            max: 31,\\n            precision: 0,\\n            controls: false\\n           \\n        },\\n        linkage: {\\n            key: 'rule',\\n            condition: function(value, form) {\\n                return value == 4\\n            },\\n        }\\n    },\\n    // 小于等于\\n    {\\n        lable: '',\\n        value: 7,\\n        key: 'rule_day',\\n        description: '',\\n        type: 'BlmBizInputNumber',\\n        props: {\\n            size: 'mini',\\n            suffix: '天',\\n            precision: 0,\\n            min: 1,\\n            max: 31,\\n            controls: false\\n        },\\n        linkage: {\\n            key: 'rule',\\n            condition: function(value, form) {\\n                return 2 == value\\n            },\\n        }\\n    },\\n\\n    {\\n        lable: '',\\n        value: [1,7],\\n        key: 'rule_days',\\n        description: '',\\n        type: 'BlmBizInputNumber',\\n        props: {\\n            size: 'mini',\\n            type: 'range',\\n            suffix: '天',\\n            min: 1,\\n            max: 31,\\n            precision: 0,\\n            controls: false\\n        },\\n        linkage: {\\n            key: 'rule',\\n            condition: function(value, form) {\\n                return value == 3\\n            },\\n        }\\n    }\\n]\"}}]}",
    'ruleConfig': null,
    'status': null,
    'description': null,
    'createByName': null,
    'gmtCreate': null,
    'updateByName': null,
    'gmtModified': null
  },
  {
    'id': 63,
    'name': null,
    'sceneId': 21,
    'sceneName': null,
    'componentConfig': "{\"label\":\"活动说明\",\"name\":\"actExplain\",\"type\":\"chunk\",\"options\":{},\"fields\":[{\"field\":\"73\",\"defaultValue\":\"\\\"\\\"\",\"component\":\"el-textarea\",\"options\":{\"attrs\":\"(function () {\\n  const mode = this.environment;\\n\\n  if (mode === \\\"query\\\") {\\n    // 查看\\n    return {\\n      placeholder: \\\"活动内容用户可见, 请谨慎填写，限1000字\\\",\\n      autosize: { minRows: 5 },\\n      disabled: true,\\n      class: \\\"set_copy\\\",\\n    };\\n  } else {\\n    //编辑 新建\\n    return {\\n      placeholder: \\\"活动内容用户可见, 请谨慎填写，限1000字\\\",\\n      rows: 5,\\n      disabled: false,\\n    };\\n  }\\n});\\n\",\"rules\":\"(function(form) {\\n    return [\\n        {required: true, message: '请输入活动说明', trigger: 'blur'},\\n        {\\n            max: 1000,\\n            message: '用户可见, 限1000字',\\n            trigger: 'blur'\\n        }\\n    ]\\n})\",\"on\":\"(function() {\\n    return {}\\n})\",\"interaction\":\"(function() {\\n    return {}\\n})\",\"options\":\"[\\n    \\n]\"}}]}",
    'ruleConfig': null,
    'status': null,
    'description': null,
    'createByName': null,
    'gmtCreate': null,
    'updateByName': null,
    'gmtModified': null
  },
  {
    'id': 61,
    'name': null,
    'sceneId': 21,
    'sceneName': null,
    'componentConfig': "{\"label\":\"活动可见时间\",\"name\":\"actOpenTime\",\"type\":\"chunk\",\"options\":{},\"fields\":[{\"field\":\"71\",\"defaultValue\":\"\",\"component\":\"el-date-picker\",\"options\":{\"attrs\":\"(function() {\\n    return {\\n        placeholder:\\\"活动开始展示时间\\\",\\n        valueFormat: \\\"timestamp\\\",\\n        type:\\\"datetime\\\",\\n        \\\"format\\\": \\\"yyyy-MM-dd HH:mm\\\"\\n    }\\n})\",\"rules\":\"(function (form) {\\n    return [\\n        {\\n            validator: (rule, value, callback) => {\\n               \\n                const actStatus = this.$route.query['actStatus']\\n                const environment = this.$route.query['environment']\\n                \\n                if(environment === 'query') {\\n                    return callback()\\n                }\\n\\n                if ((actStatus === '3' || actStatus === '4') && environment === 'edit' ) {\\n                    return callback()\\n                }\\n\\n                if (!value) return callback(new Error('请输入活动可见时间'))\\n\\n                if (!(this.formData.actTime && this.formData.actTime[0])) {\\n                    return callback(new Error('未填写活动时间'))\\n                }\\n\\n                const actStartTime = this.formData.actTime[0]\\n                const actEndTime = this.formData.actTime[1]\\n\\n                const actOpenTime = new Date(value).valueOf()\\n                console.log(actOpenTime)\\n                console.log(actOpenTime)\\n                // 不能晚于活动开始时间\\n                if (actOpenTime > actStartTime) {\\n                    return callback(new Error('不能晚于活动开始时间'))\\n                }\\n\\n                if (actOpenTime > actEndTime) {\\n                    return callback(new Error('开启时间需要早于活动时间'))\\n                }\\n\\n                // 不能早于当前时间\\n                if (actOpenTime < new Date().valueOf()) {\\n                    return new Error('不能早于当前时间')\\n                }\\n\\n                return callback()\\n            },\\n            trigger: 'blur'\\n        },\\n        { required: true, message: '请输入活动可见时间', trigger: 'blur', type: \\\"number\\\" },\\n    ]\\n})\",\"on\":\"(function() {\\n    return {}\\n})\",\"interaction\":\"(function() {\\n    return {}\\n})\",\"options\":\"[\\n]\"}}]}",
    'ruleConfig': null,
    'status': null,
    'description': null,
    'createByName': null,
    'gmtCreate': null,
    'updateByName': null,
    'gmtModified': null
  },
  {
    'id': 59,
    'name': null,
    'sceneId': 21,
    'sceneName': null,
    'componentConfig': "{\"label\":\"订单业务类型\",\"name\":\"orderBizTypes\",\"type\":\"chunk\",\"operations\":\"(function() {\\n    return {\\n     \\n    }\\n})\",\"options\":{},\"fields\":[{\"field\":\"81\",\"defaultValue\":\"\",\"component\":\"el-checkbox-group\",\"options\":{\"data\":\"[\\n    {\\n        label: \\\"不限\\\",\\n        mutex: true,\\n        value: -1\\n    },\\n    {\\n        label: \\\"快车\\\",\\n        value: 300\\n    },\\n    {\\n        label: \\\"专车\\\",\\n        value: 301\\n    },\\n    {\\n        label: \\\"城际\\\",\\n        value: 303\\n    }\\n]\",\"dataSrc\":\"\",\"attrs\":\"(function() {\\n    return {\\n       \\n    }\\n})\",\"rules\":\"(function() {\\n    return [\\n        {\\n            required: true,\\n            type: 'array',\\n            min: 1,\\n            message: '请选择订单业务类型',\\n            trigger: 'blur'\\n        }\\n    ]\\n})\",\"on\":\"(function(vnode) {\\n    return {\\n       \\n    }\\n})\",\"interaction\":\"(function() {\\n    return {}\\n})\",\"options\":\"[\\n    {\\n        label: '1.选项',\\n        value: [-1,300,301],\\n        key: 'option',\\n        descrition: '',\\n        type: 'BlmBizCheckboxGroup',\\n        props: {\\n            min: 1,\\n            options: [\\n                {\\n                    label: \\\"不限\\\",\\n                    value: -1\\n                },\\n                {\\n                    label: \\\"快车\\\",\\n                    value: 300\\n                },\\n                {\\n                    label: \\\"专车\\\",\\n                    value: 301\\n                },\\n                // {\\n                //     label: \\\"城际\\\",\\n                //     value: 303\\n                // }\\n            ]\\n        }\\n    },\\n    {\\n        label: '2.如果选择不限是否展示',\\n        value: 1,\\n        key: 'displayNoLimitEnable',\\n        description: '',\\n        type: 'BlmBizFormRadioGroup',\\n        props: {\\n            options: [\\n                {label: '是', value: 1},\\n                {label: '否', value: 0}\\n            ]\\n        }\\n    }\\n]\"}}]}",
    'ruleConfig': null,
    'status': null,
    'description': null,
    'createByName': null,
    'gmtCreate': null,
    'updateByName': null,
    'gmtModified': null
  },
  {
    'id': 57,
    'name': null,
    'sceneId': 21,
    'sceneName': null,
    'componentConfig': "{\"label\":\"内部活动名称\",\"name\":\"actInnerName\",\"type\":\"chunk\",\"options\":{\"interaction\":\"(function() {\\n    return {\\n        // display: function(form) {\\n        //     let flag = form.actExplain == 2\\n   \\n        //     if ( !flag ) {\\n        //         // 隐藏chunk时，清空表单数据\\n        //         form.actInnerName = null\\n        //     }\\n\\n        //     return  flag\\n        // }\\n    }\\n})\"},\"fields\":[{\"field\":\"65\",\"defaultValue\":\"\\\"\\\"\",\"component\":\"el-input\",\"options\":{\"attrs\":\"(function () {\\n  const isQuery = this.$route.query.environment === \\\"query\\\";\\n  return {\\n    placeholder: \\\"仅对内展示，限3-20字\\\",\\n    width: \\\"220px\\\",\\n    disabled: isQuery,\\n    class: \\\"set_copy\\\",\\n  };\\n});\\n\",\"rules\":\"(function () {\\n    return [\\n        // { required: true, message: '请输入内部活动名称', trigger: 'blur' },\\n        { max: 20, message: '仅对内展示，最多20字', trigger: 'blur' },\\n        { min: 3, message: '仅对内展示，最少3字', trigger: 'blur' }\\n    ]\\n})\",\"on\":\"(function() {\\n    return {}\\n})\",\"interaction\":\"(function() {\\n    return {\\n       \\n    }\\n})\",\"options\":\"[\\n    \\n]\"}}]}",
    'ruleConfig': null,
    'status': null,
    'description': null,
    'createByName': null,
    'gmtCreate': null,
    'updateByName': null,
    'gmtModified': null
  },
  {
    'id': 55,
    'name': null,
    'sceneId': 21,
    'sceneName': null,
    'componentConfig': "{\"label\":\"活动对外名称\",\"name\":\"actName\",\"type\":\"chunk\",\"operations\":\"(function() {\\n    return {}\\n})\",\"options\":{\"interaction\":\"(function() {\\n  return {}\\n})\\n\"},\"fields\":[{\"field\":\"63\",\"defaultValue\":\"\",\"component\":\"el-input\",\"options\":{\"attrs\":\"(function () {\\n  const isQuery = this.$route.query.environment === \\\"query\\\";\\n  return {\\n    placeholder: \\\"活动名称用户可见，请谨慎填写，限3-20字\\\",\\n    width: \\\"320px\\\",\\n    disabled: isQuery,\\n    class: \\\"set_copy\\\",\\n  };\\n});\\n\",\"rules\":\"(function(formData) {\\n  return [\\n    { required: true, message: '请输入活动对外名称', trigger: 'blur' },\\n    { max: 20,  message: '对外展示，最多20字', trigger: 'blur' },\\n    { min: 3,  message: '对外展示，最少3字', trigger: 'blur' },\\n  ]\\n})\\n\",\"on\":\"(function() {\\n    return {}\\n})\",\"interaction\":\"(function() {\\n    return {}\\n})\",\"options\":\"[\\n    \\n]\"}}]}",
    'ruleConfig': null,
    'status': null,
    'description': null,
    'createByName': null,
    'gmtCreate': null,
    'updateByName': null,
    'gmtModified': null
  }
]
export const filesData = [
  {
    'id': 45,
    'uniqueName': 'id',
    'valueType': 'String',
    'chineseName': 'ID',
    'pinyinAcronym': 'id',
    'options': [
      'eq'
    ],
    'uiSceneId': 21,
    'uiSceneName': '网约车',
    'qlExpress': null,
    'prefix': 'ID',
    'suffix': '',
    'isEnum': null,
    'enumValues': null,
    'detail': null
  },
  {
    'id': 49,
    'uniqueName': 'sceneType',
    'valueType': 'Integer',
    'chineseName': '场景类型',
    'pinyinAcronym': 'cjlx',
    'options': [
      'ne',
      'eq'
    ],
    'uiSceneId': 21,
    'uiSceneName': '网约车',
    'qlExpress': null,
    'prefix': '场景类型',
    'suffix': '',
    'isEnum': null,
    'enumValues': null,
    'detail': null
  },
  {
    'id': 51,
    'uniqueName': 'sceneCategory',
    'valueType': 'Integer',
    'chineseName': '场景分类',
    'pinyinAcronym': 'cjfl',
    'options': [
      'in',
      'ne',
      'eq'
    ],
    'uiSceneId': 21,
    'uiSceneName': '网约车',
    'qlExpress': null,
    'prefix': '场景分类',
    'suffix': '',
    'isEnum': null,
    'enumValues': null,
    'detail': null
  },
  {
    'id': 53,
    'uniqueName': 'sceneName',
    'valueType': 'String',
    'chineseName': '场景名称',
    'pinyinAcronym': 'cjmc',
    'options': [
      'eq'
    ],
    'uiSceneId': 21,
    'uiSceneName': '网约车',
    'qlExpress': null,
    'prefix': '场景名称',
    'suffix': '',
    'isEnum': null,
    'enumValues': null,
    'detail': null
  },
  {
    'id': 55,
    'uniqueName': 'sceneIcon',
    'valueType': 'String',
    'chineseName': '场景图标',
    'pinyinAcronym': 'cjtb',
    'options': [
      'eq'
    ],
    'uiSceneId': 21,
    'uiSceneName': '网约车',
    'qlExpress': null,
    'prefix': '场景图标',
    'suffix': '',
    'isEnum': null,
    'enumValues': null,
    'detail': null
  },
  {
    'id': 57,
    'uniqueName': 'sceneExplain',
    'valueType': 'String',
    'chineseName': '场景说明',
    'pinyinAcronym': 'cjsm',
    'options': [
      'eq'
    ],
    'uiSceneId': 21,
    'uiSceneName': '网约车',
    'qlExpress': null,
    'prefix': '场景说明',
    'suffix': '',
    'isEnum': null,
    'enumValues': null,
    'detail': null
  },
  {
    'id': 59,
    'uniqueName': 'sceneRemarks',
    'valueType': 'String',
    'chineseName': '场景备注',
    'pinyinAcronym': 'cjbz',
    'options': [
      'eq'
    ],
    'uiSceneId': 21,
    'uiSceneName': '网约车',
    'qlExpress': null,
    'prefix': '场景备注',
    'suffix': '',
    'isEnum': null,
    'enumValues': null,
    'detail': null
  },
  {
    'id': 61,
    'uniqueName': 'actTimeLimit',
    'valueType': 'Array',
    'chineseName': '活动时间限制（天）',
    'pinyinAcronym': 'hdsjxzts',
    'options': [
      'bt',
      'lt',
      'le',
      'eq',
      'gt',
      'ge'
    ],
    'uiSceneId': 21,
    'uiSceneName': '网约车',
    'qlExpress': null,
    'prefix': '活动时间',
    'suffix': '天',
    'isEnum': null,
    'enumValues': null,
    'detail': null
  },
  {
    'id': 63,
    'uniqueName': 'actName',
    'valueType': 'String',
    'chineseName': '活动对外名称',
    'pinyinAcronym': 'hddwmc',
    'options': [
      'eq'
    ],
    'uiSceneId': 21,
    'uiSceneName': '网约车',
    'qlExpress': null,
    'prefix': '',
    'suffix': '',
    'isEnum': null,
    'enumValues': null,
    'detail': null
  },
  {
    'id': 65,
    'uniqueName': 'actInnerName',
    'valueType': 'String',
    'chineseName': '内部活动名称',
    'pinyinAcronym': 'nbhdmc',
    'options': [
      'eq'
    ],
    'uiSceneId': 21,
    'uiSceneName': '网约车',
    'qlExpress': null,
    'prefix': '',
    'suffix': '',
    'isEnum': null,
    'enumValues': null,
    'detail': null
  },
  {
    'id': 67,
    'uniqueName': 'adcodes',
    'valueType': 'Array',
    'chineseName': '活动城市',
    'pinyinAcronym': 'hdcs',
    'options': [
      'in',
      'eq'
    ],
    'uiSceneId': 21,
    'uiSceneName': '网约车',
    'qlExpress': null,
    'prefix': '',
    'suffix': '',
    'isEnum': null,
    'enumValues': null,
    'detail': null
  },
  {
    'id': 69,
    'uniqueName': 'actTime',
    'valueType': 'Array',
    'chineseName': '活动时间',
    'pinyinAcronym': 'hdsj',
    'options': [
      'bt',
      'lt',
      'le',
      'eq',
      'gt',
      'ge'
    ],
    'uiSceneId': 21,
    'uiSceneName': '网约车',
    'qlExpress': null,
    'prefix': '',
    'suffix': '',
    'isEnum': null,
    'enumValues': null,
    'detail': null
  },
  {
    'id': 71,
    'uniqueName': 'actOpenTime',
    'valueType': 'Date',
    'chineseName': '活动可见时间',
    'pinyinAcronym': 'hdkjsj',
    'options': [
      'lt',
      'le',
      'eq',
      'gt',
      'ge'
    ],
    'uiSceneId': 21,
    'uiSceneName': '网约车',
    'qlExpress': null,
    'prefix': '',
    'suffix': '',
    'isEnum': null,
    'enumValues': null,
    'detail': null
  },
  {
    'id': 73,
    'uniqueName': 'actExplain',
    'valueType': 'String',
    'chineseName': '活动说明',
    'pinyinAcronym': 'hdsm',
    'options': [
      'eq'
    ],
    'uiSceneId': 21,
    'uiSceneName': '网约车',
    'qlExpress': null,
    'prefix': '',
    'suffix': '',
    'isEnum': null,
    'enumValues': null,
    'detail': null
  },
  {
    'id': 75,
    'uniqueName': 'driverTag',
    'valueType': 'Long',
    'chineseName': '人群标签',
    'pinyinAcronym': 'rqbq',
    'options': [
      'contain'
    ],
    'uiSceneId': 21,
    'uiSceneName': '网约车',
    'qlExpress': null,
    'prefix': '',
    'suffix': '',
    'isEnum': null,
    'enumValues': null,
    'detail': null
  },
  {
    'id': 77,
    'uniqueName': 'driverBizTypes',
    'valueType': 'Array',
    'chineseName': '司机业务类型',
    'pinyinAcronym': 'sjywlx',
    'options': [
      'in'
    ],
    'uiSceneId': 21,
    'uiSceneName': '网约车',
    'qlExpress': null,
    'prefix': '',
    'suffix': '',
    'isEnum': null,
    'enumValues': null,
    'detail': null
  },
  {
    'id': 79,
    'uniqueName': 'driverTypes',
    'valueType': 'Array',
    'chineseName': '司机类型',
    'pinyinAcronym': 'sjlx',
    'options': [
      'in'
    ],
    'uiSceneId': 21,
    'uiSceneName': '网约车',
    'qlExpress': null,
    'prefix': '',
    'suffix': '',
    'isEnum': null,
    'enumValues': null,
    'detail': null
  },
  {
    'id': 81,
    'uniqueName': 'orderBizTypes',
    'valueType': 'Array',
    'chineseName': '订单业务类型',
    'pinyinAcronym': 'ddywlx',
    'options': [
      'in'
    ],
    'uiSceneId': 21,
    'uiSceneName': '网约车',
    'qlExpress': null,
    'prefix': '订单业务类型',
    'suffix': '',
    'isEnum': null,
    'enumValues': null,
    'detail': null
  },
  {
    'id': 83,
    'uniqueName': 'paymentMode',
    'valueType': 'Integer',
    'chineseName': '支付方式',
    'pinyinAcronym': 'zffs',
    'options': [
      'eq'
    ],
    'uiSceneId': 21,
    'uiSceneName': '网约车',
    'qlExpress': null,
    'prefix': '支付方式',
    'suffix': '',
    'isEnum': null,
    'enumValues': null,
    'detail': null
  },
  {
    'id': 85,
    'uniqueName': 'onlyReservationMode',
    'valueType': 'Integer',
    'chineseName': '听单模式',
    'pinyinAcronym': 'tdms',
    'options': [
      'eq'
    ],
    'uiSceneId': 21,
    'uiSceneName': '网约车',
    'qlExpress': null,
    'prefix': '只听预约单模式',
    'suffix': '',
    'isEnum': null,
    'enumValues': null,
    'detail': null
  },
  {
    'id': 87,
    'uniqueName': 'timeLimit',
    'valueType': 'Integer',
    'chineseName': '时段要求',
    'pinyinAcronym': 'sdyq',
    'options': [
      'ne',
      'eq'
    ],
    'uiSceneId': 21,
    'uiSceneName': '网约车',
    'qlExpress': null,
    'prefix': '时段要求',
    'suffix': '',
    'isEnum': null,
    'enumValues': null,
    'detail': null
  },
  {
    'id': 89,
    'uniqueName': 'timeSegment',
    'valueType': 'Array',
    'chineseName': '时段',
    'pinyinAcronym': 'sd',
    'options': [
      'bt'
    ],
    'uiSceneId': 21,
    'uiSceneName': '网约车',
    'qlExpress': null,
    'prefix': '时段',
    'suffix': '',
    'isEnum': null,
    'enumValues': null,
    'detail': null
  },
  {
    'id': 91,
    'uniqueName': 'areaLimit',
    'valueType': 'Integer',
    'chineseName': '区域要求',
    'pinyinAcronym': 'qyyq',
    'options': [
      'eq'
    ],
    'uiSceneId': 21,
    'uiSceneName': '网约车',
    'qlExpress': null,
    'prefix': '区域要求',
    'suffix': '',
    'isEnum': null,
    'enumValues': null,
    'detail': null
  },
  {
    'id': 93,
    'uniqueName': 'areaAdcodes',
    'valueType': 'Array',
    'chineseName': '区/县',
    'pinyinAcronym': 'qx',
    'options': [
      'in'
    ],
    'uiSceneId': 21,
    'uiSceneName': '网约车',
    'qlExpress': null,
    'prefix': '区/县',
    'suffix': '',
    'isEnum': null,
    'enumValues': null,
    'detail': null
  },
  {
    'id': 95,
    'uniqueName': 'sysFences',
    'valueType': 'Array',
    'chineseName': '电子围栏',
    'pinyinAcronym': 'dzwl',
    'options': [
      'in'
    ],
    'uiSceneId': 21,
    'uiSceneName': '网约车',
    'qlExpress': null,
    'prefix': '电子围栏',
    'suffix': '',
    'isEnum': null,
    'enumValues': null,
    'detail': null
  },
  {
    'id': 97,
    'uniqueName': 'carPoolEffective',
    'valueType': 'Integer',
    'chineseName': '拼车单',
    'pinyinAcronym': 'pcd',
    'options': [
      'eq'
    ],
    'uiSceneId': 21,
    'uiSceneName': '网约车',
    'qlExpress': null,
    'prefix': '是否计算拼车单',
    'suffix': '',
    'isEnum': null,
    'enumValues': null,
    'detail': null
  },
  {
    'id': 99,
    'uniqueName': 'orderType',
    'valueType': 'Integer',
    'chineseName': '订单时效类型',
    'pinyinAcronym': 'ddsxlx',
    'options': [
      'eq'
    ],
    'uiSceneId': 21,
    'uiSceneName': '网约车',
    'qlExpress': null,
    'prefix': '订单时效类型',
    'suffix': '',
    'isEnum': null,
    'enumValues': null,
    'detail': null
  },
  {
    'id': 101,
    'uniqueName': 'orderDistance',
    'valueType': 'Array',
    'chineseName': '订单里程',
    'pinyinAcronym': 'ddlc',
    'options': [
      'bt',
      'lt',
      'le',
      'eq',
      'gt',
      'ge'
    ],
    'uiSceneId': 21,
    'uiSceneName': '网约车',
    'qlExpress': null,
    'prefix': '订单里程',
    'suffix': '千米',
    'isEnum': null,
    'enumValues': null,
    'detail': null
  },
  {
    'id': 103,
    'uniqueName': 'orderPrice',
    'valueType': 'Array',
    'chineseName': '订单流水',
    'pinyinAcronym': 'ddls',
    'options': [
      'bt',
      'lt',
      'le',
      'eq',
      'gt',
      'ge'
    ],
    'uiSceneId': 21,
    'uiSceneName': '网约车',
    'qlExpress': null,
    'prefix': '订单价格',
    'suffix': '元',
    'isEnum': null,
    'enumValues': null,
    'detail': null
  },
  {
    'id': 105,
    'uniqueName': 'taskPeriod',
    'valueType': 'Integer',
    'chineseName': '任务周期',
    'pinyinAcronym': 'rwzq',
    'options': [
      'eq'
    ],
    'uiSceneId': 21,
    'uiSceneName': '网约车',
    'qlExpress': null,
    'prefix': '',
    'suffix': '',
    'isEnum': null,
    'enumValues': null,
    'detail': null
  },
  {
    'id': 107,
    'uniqueName': 'settlementInterval',
    'valueType': 'Integer',
    'chineseName': '结算周期',
    'pinyinAcronym': 'jszq',
    'options': [
      'eq'
    ],
    'uiSceneId': 21,
    'uiSceneName': '网约车',
    'qlExpress': null,
    'prefix': '结算周期',
    'suffix': '',
    'isEnum': null,
    'enumValues': null,
    'detail': null
  },
  {
    'id': 109,
    'uniqueName': 'rewardRules',
    'valueType': 'Array',
    'chineseName': '奖励规则',
    'pinyinAcronym': 'jlgz',
    'options': [
      ''
    ],
    'uiSceneId': 21,
    'uiSceneName': '网约车',
    'qlExpress': null,
    'prefix': '',
    'suffix': '',
    'isEnum': null,
    'enumValues': null,
    'detail': null
  },
  {
    'id': 111,
    'uniqueName': 'orderNum',
    'valueType': 'Array',
    'chineseName': '完成单量',
    'pinyinAcronym': 'wdl',
    'options': [
      'bt',
      'lt',
      'le',
      'eq',
      'gt',
      'ge'
    ],
    'uiSceneId': 21,
    'uiSceneName': '网约车',
    'qlExpress': null,
    'prefix': '',
    'suffix': '单，',
    'isEnum': null,
    'enumValues': null,
    'detail': null
  },
  {
    'id': 115,
    'uniqueName': 'effectiveHour',
    'valueType': 'Array',
    'chineseName': '出车时长',
    'pinyinAcronym': 'ccsc',
    'options': [
      'bt',
      'lt',
      'le',
      'eq',
      'gt',
      'ge'
    ],
    'uiSceneId': 21,
    'uiSceneName': '网约车',
    'qlExpress': null,
    'prefix': '达到',
    'suffix': '小时，',
    'isEnum': null,
    'enumValues': null,
    'detail': null
  },
  {
    'id': 117,
    'uniqueName': 'moneyAfterCommission',
    'valueType': 'Array',
    'chineseName': '抽佣后流水',
    'pinyinAcronym': 'cyhls',
    'options': [
      'bt',
      'contain',
      'not in',
      'in',
      'like',
      'ne',
      'lt',
      'le',
      'eq',
      'gt',
      'ge'
    ],
    'uiSceneId': 21,
    'uiSceneName': '网约车',
    'qlExpress': null,
    'prefix': '达到',
    'suffix': '元，',
    'isEnum': null,
    'enumValues': null,
    'detail': null
  },
  {
    'id': 119,
    'uniqueName': 'rewardLimit',
    'valueType': 'Integer',
    'chineseName': '发奖条件',
    'pinyinAcronym': 'fjtj',
    'options': [
      'ne',
      'eq'
    ],
    'uiSceneId': 21,
    'uiSceneName': '网约车',
    'qlExpress': null,
    'prefix': '获奖要求',
    'suffix': '',
    'isEnum': null,
    'enumValues': null,
    'detail': null
  },
  {
    'id': 121,
    'uniqueName': 'rewardLimitRules',
    'valueType': 'Array',
    'chineseName': '发奖条件',
    'pinyinAcronym': 'fjtj',
    'options': [
      'bt',
      'lt',
      'le',
      'eq',
      'gt',
      'ge'
    ],
    'uiSceneId': 21,
    'uiSceneName': '网约车',
    'qlExpress': null,
    'prefix': '获奖要求',
    'suffix': '',
    'isEnum': null,
    'enumValues': null,
    'detail': null
  },
  {
    'id': 123,
    'uniqueName': 'orderRiskControlPercentage',
    'valueType': 'Array',
    'chineseName': '风险控制',
    'pinyinAcronym': 'fxkz',
    'options': [
      'bt',
      'lt',
      'le',
      'eq',
      'gt',
      'ge'
    ],
    'uiSceneId': 21,
    'uiSceneName': '网约车',
    'qlExpress': null,
    'prefix': '达到阶梯要求，但当前任务获得全部奖励大于等于抽佣后流水的',
    'suffix': '%时，会被认为有刷单的行为，需要通过人工审核后才会发放奖励。',
    'isEnum': null,
    'enumValues': null,
    'detail': null
  },
  {
    'id': 125,
    'uniqueName': 'allMissionRewardsPercentage',
    'valueType': 'Array',
    'chineseName': '任务全部奖励',
    'pinyinAcronym': 'rwqbjl',
    'options': [
      'bt',
      'lt',
      'le',
      'eq',
      'gt',
      'ge'
    ],
    'uiSceneId': 21,
    'uiSceneName': '网约车',
    'qlExpress': null,
    'prefix': '任务全部奖励',
    'suffix': '%',
    'isEnum': null,
    'enumValues': null,
    'detail': null
  },
  {
    'id': 127,
    'uniqueName': 'conditionRelations',
    'valueType': 'Integer',
    'chineseName': '条件间关系',
    'pinyinAcronym': 'tjjgx',
    'options': [
      'ne',
      'eq'
    ],
    'uiSceneId': 21,
    'uiSceneName': '网约车',
    'qlExpress': null,
    'prefix': '条件间关系',
    'suffix': '',
    'isEnum': null,
    'enumValues': null,
    'detail': null
  },
  {
    'id': 129,
    'uniqueName': 'displayNoLimitEnable',
    'valueType': 'Integer',
    'chineseName': '如果选择不限是否展示',
    'pinyinAcronym': 'rgxzbxsfzs',
    'options': [
      'eq'
    ],
    'uiSceneId': 21,
    'uiSceneName': '网约车',
    'qlExpress': null,
    'prefix': '如果选择不限是否展示',
    'suffix': '',
    'isEnum': null,
    'enumValues': null,
    'detail': null
  },
  {
    'id': 131,
    'uniqueName': 'required',
    'valueType': 'Integer',
    'chineseName': '是否必填',
    'pinyinAcronym': 'sfbt',
    'options': [
      'ne',
      'eq'
    ],
    'uiSceneId': 21,
    'uiSceneName': '网约车',
    'qlExpress': null,
    'prefix': '是否必填',
    'suffix': '',
    'isEnum': null,
    'enumValues': null,
    'detail': null
  },
  {
    'id': 133,
    'uniqueName': 'indicatorRelations',
    'valueType': 'Integer',
    'chineseName': '指标间关系',
    'pinyinAcronym': 'zbjgx',
    'options': [
      'ne',
      'eq'
    ],
    'uiSceneId': 21,
    'uiSceneName': '网约车',
    'qlExpress': null,
    'prefix': '指标间关系',
    'suffix': '',
    'isEnum': null,
    'enumValues': null,
    'detail': null
  },
  {
    'id': 135,
    'uniqueName': 'ladderUpperLimit',
    'valueType': 'Integer',
    'chineseName': '阶梯数量上限',
    'pinyinAcronym': 'jtslsx',
    'options': [
      'ne',
      'eq'
    ],
    'uiSceneId': 21,
    'uiSceneName': '网约车',
    'qlExpress': null,
    'prefix': '阶梯数量上限',
    'suffix': '个',
    'isEnum': null,
    'enumValues': null,
    'detail': null
  },
  {
    'id': 139,
    'uniqueName': 'rewardTotalMoney',
    'valueType': 'Decimal',
    'chineseName': '总计奖励',
    'pinyinAcronym': 'zjjl',
    'options': [
      'lt',
      'le',
      'eq',
      'gt',
      'ge'
    ],
    'uiSceneId': 21,
    'uiSceneName': '网约车',
    'qlExpress': null,
    'prefix': '',
    'suffix': '元。',
    'isEnum': null,
    'enumValues': null,
    'detail': null
  },
  {
    'id': 143,
    'uniqueName': 'rewardGuaranteedMoney',
    'valueType': 'Decimal',
    'chineseName': '保底奖励',
    'pinyinAcronym': 'bdjl',
    'options': [
      'lt',
      'le',
      'eq',
      'gt',
      'ge'
    ],
    'uiSceneId': 21,
    'uiSceneName': '网约车',
    'qlExpress': null,
    'prefix': '',
    'suffix': '元',
    'isEnum': null,
    'enumValues': null,
    'detail': null
  },
  {
    'id': 145,
    'uniqueName': 'rewards',
    'valueType': 'Integer',
    'chineseName': '奖项',
    'pinyinAcronym': 'jx',
    'options': [
      'ne',
      'eq'
    ],
    'uiSceneId': 21,
    'uiSceneName': '网约车',
    'qlExpress': null,
    'prefix': '奖项',
    'suffix': '',
    'isEnum': null,
    'enumValues': null,
    'detail': null
  },
  {
    'id': 147,
    'uniqueName': 'rewardsUpperLimit',
    'valueType': 'Integer',
    'chineseName': '奖励上限',
    'pinyinAcronym': 'jlsx',
    'options': [
      'ne',
      'eq'
    ],
    'uiSceneId': 21,
    'uiSceneName': '网约车',
    'qlExpress': null,
    'prefix': '奖励上限',
    'suffix': '',
    'isEnum': null,
    'enumValues': null,
    'detail': null
  },
  {
    'id': 149,
    'uniqueName': 'rewardPerOrder',
    'valueType': 'Integer',
    'chineseName': '每单奖励',
    'pinyinAcronym': 'mdjl',
    'options': [
      'ne',
      'eq'
    ],
    'uiSceneId': 21,
    'uiSceneName': '网约车',
    'qlExpress': null,
    'prefix': '每单奖励',
    'suffix': '',
    'isEnum': null,
    'enumValues': null,
    'detail': null
  },
  {
    'id': 151,
    'uniqueName': 'rewardPerOrderRange',
    'valueType': 'Integer',
    'chineseName': '每单奖励（区间）',
    'pinyinAcronym': 'mdjlqj',
    'options': [
      'ne',
      'eq'
    ],
    'uiSceneId': 21,
    'uiSceneName': '网约车',
    'qlExpress': null,
    'prefix': '每单奖励（区间）',
    'suffix': '',
    'isEnum': null,
    'enumValues': null,
    'detail': null
  },
  {
    'id': 153,
    'uniqueName': 'rewardPerOrderMoney',
    'valueType': 'Decimal',
    'chineseName': '每单奖励',
    'pinyinAcronym': 'mdjlje',
    'options': [
      'lt',
      'le',
      'eq',
      'gt',
      'ge'
    ],
    'uiSceneId': 21,
    'uiSceneName': '网约车',
    'qlExpress': null,
    'prefix': '每单奖励',
    'suffix': '元',
    'isEnum': null,
    'enumValues': null,
    'detail': null
  },
  {
    'id': 155,
    'uniqueName': 'rewardPerOrderPercentage',
    'valueType': 'Decimal',
    'chineseName': '每单奖励百分比',
    'pinyinAcronym': 'mdjlbfb',
    'options': [
      'lt',
      'le',
      'eq',
      'gt',
      'ge'
    ],
    'uiSceneId': 21,
    'uiSceneName': '网约车',
    'qlExpress': null,
    'prefix': '每单奖励',
    'suffix': '%',
    'isEnum': null,
    'enumValues': null,
    'detail': null
  },
  {
    'id': 157,
    'uniqueName': 'rewardUpperLimitMoney',
    'valueType': 'Decimal',
    'chineseName': '活动周期内最多奖励',
    'pinyinAcronym': 'jlsxje',
    'options': [
      'lt',
      'le',
      'eq',
      'gt',
      'ge'
    ],
    'uiSceneId': 21,
    'uiSceneName': '网约车',
    'qlExpress': null,
    'prefix': '活动周期内最多奖励',
    'suffix': '元',
    'isEnum': null,
    'enumValues': null,
    'detail': null
  },
  {
    'id': 159,
    'uniqueName': 'rewardUpperLimitPercentage',
    'valueType': 'Decimal',
    'chineseName': '奖励上限百分比',
    'pinyinAcronym': 'jlsxbfb',
    'options': [
      'lt',
      'le',
      'eq',
      'gt',
      'ge'
    ],
    'uiSceneId': 21,
    'uiSceneName': '网约车',
    'qlExpress': null,
    'prefix': '活动周期内最多奖励',
    'suffix': '单',
    'isEnum': null,
    'enumValues': null,
    'detail': null
  },
  {
    'id': 161,
    'uniqueName': 'taskRelations',
    'valueType': 'Integer',
    'chineseName': '任务间关系',
    'pinyinAcronym': 'rwjgx',
    'options': [
      'ne',
      'eq'
    ],
    'uiSceneId': 21,
    'uiSceneName': '网约车',
    'qlExpress': null,
    'prefix': '任务间关系',
    'suffix': '',
    'isEnum': null,
    'enumValues': null,
    'detail': null
  },
  {
    'id': 163,
    'uniqueName': 'taskList',
    'valueType': 'Array',
    'chineseName': '任务列表',
    'pinyinAcronym': 'rwlb',
    'options': [
      ''
    ],
    'uiSceneId': 21,
    'uiSceneName': '网约车',
    'qlExpress': null,
    'prefix': '',
    'suffix': '',
    'isEnum': null,
    'enumValues': null,
    'detail': null
  },
  {
    'id': 165,
    'uniqueName': 'noticeType',
    'valueType': 'Integer',
    'chineseName': '通知方式',
    'pinyinAcronym': 'tzfs',
    'options': [
      'ne',
      'eq'
    ],
    'uiSceneId': 21,
    'uiSceneName': '网约车',
    'qlExpress': null,
    'prefix': '通知方式',
    'suffix': '',
    'isEnum': null,
    'enumValues': null,
    'detail': null
  },
  {
    'id': 167,
    'uniqueName': 'noticeName',
    'valueType': 'String',
    'chineseName': '通知名称',
    'pinyinAcronym': 'tzmc',
    'options': [
      ''
    ],
    'uiSceneId': 21,
    'uiSceneName': '网约车',
    'qlExpress': null,
    'prefix': '通知名称',
    'suffix': '',
    'isEnum': null,
    'enumValues': null,
    'detail': null
  },
  {
    'id': 169,
    'uniqueName': 'noticeTime',
    'valueType': 'Integer',
    'chineseName': '通知节点',
    'pinyinAcronym': 'tzjd',
    'options': [
      'ne',
      'eq'
    ],
    'uiSceneId': 21,
    'uiSceneName': '网约车',
    'qlExpress': null,
    'prefix': '通知节点',
    'suffix': '',
    'isEnum': null,
    'enumValues': null,
    'detail': null
  },
  {
    'id': 171,
    'uniqueName': 'noticeTask',
    'valueType': 'Array',
    'chineseName': '通知任务',
    'pinyinAcronym': 'tzrw',
    'options': [
      ''
    ],
    'uiSceneId': 21,
    'uiSceneName': '网约车',
    'qlExpress': null,
    'prefix': '通知任务',
    'suffix': '',
    'isEnum': null,
    'enumValues': null,
    'detail': null
  },
  {
    'id': 173,
    'uniqueName': 'noticeInfo',
    'valueType': 'String',
    'chineseName': '通知文案',
    'pinyinAcronym': 'tzwa',
    'options': [
      'eq'
    ],
    'uiSceneId': 21,
    'uiSceneName': '网约车',
    'qlExpress': null,
    'prefix': '通知文案',
    'suffix': '',
    'isEnum': null,
    'enumValues': null,
    'detail': null
  },
  {
    'id': 209,
    'uniqueName': 'test',
    'valueType': 'String',
    'chineseName': '测试',
    'pinyinAcronym': 'cs',
    'options': [
      'bt'
    ],
    'uiSceneId': 21,
    'uiSceneName': '网约车',
    'qlExpress': null,
    'prefix': '',
    'suffix': '',
    'isEnum': null,
    'enumValues': null,
    'detail': null
  },
  {
    'id': 211,
    'uniqueName': 'carPoolType',
    'valueType': 'Integer',
    'chineseName': '拼车单类型',
    'pinyinAcronym': 'pcdlx',
    'options': [
      'eq'
    ],
    'uiSceneId': 21,
    'uiSceneName': '网约车',
    'qlExpress': null,
    'prefix': '拼车单类型',
    'suffix': '',
    'isEnum': null,
    'enumValues': null,
    'detail': null
  },
  {
    'id': 217,
    'uniqueName': 'orderDistanceOperator',
    'valueType': 'Integer',
    'chineseName': '订单里程选项',
    'pinyinAcronym': 'ddlcxx',
    'options': [
      'eq'
    ],
    'uiSceneId': 21,
    'uiSceneName': '网约车',
    'qlExpress': null,
    'prefix': '订单里程选项',
    'suffix': '',
    'isEnum': null,
    'enumValues': null,
    'detail': null
  },
  {
    'id': 221,
    'uniqueName': 'orderPriceOperator',
    'valueType': 'Integer',
    'chineseName': '订单流水选项',
    'pinyinAcronym': 'ddlsxx',
    'options': [
      'eq'
    ],
    'uiSceneId': 21,
    'uiSceneName': '网约车',
    'qlExpress': null,
    'prefix': '订单流水选项',
    'suffix': '',
    'isEnum': null,
    'enumValues': null,
    'detail': null
  },
  {
    'id': 241,
    'uniqueName': 'skinKey',
    'valueType': 'String',
    'chineseName': '皮肤',
    'pinyinAcronym': 'pf',
    'options': [
      'eq'
    ],
    'uiSceneId': 21,
    'uiSceneName': '网约车',
    'qlExpress': null,
    'prefix': '',
    'suffix': '',
    'isEnum': null,
    'enumValues': null,
    'detail': null
  },
  {
    'id': 243,
    'uniqueName': 'tagMaximumLimit',
    'valueType': 'String',
    'chineseName': '最高奖励限制（demo）',
    'pinyinAcronym': 'zgjl',
    'options': [
      'eq'
    ],
    'uiSceneId': 21,
    'uiSceneName': '网约车',
    'qlExpress': null,
    'prefix': '',
    'suffix': '',
    'isEnum': null,
    'enumValues': null,
    'detail': null
  },
  {
    'id': 245,
    'uniqueName': 'driverTagType',
    'valueType': 'Integer',
    'chineseName': '人群标签类型',
    'pinyinAcronym': 'rqbqlx',
    'options': [
      'eq'
    ],
    'uiSceneId': 21,
    'uiSceneName': '网约车',
    'qlExpress': null,
    'prefix': '',
    'suffix': '',
    'isEnum': null,
    'enumValues': null,
    'detail': null
  },
  {
    'id': 305,
    'uniqueName': 'maximumRewardLimitFe',
    'valueType': 'Array',
    'chineseName': '奖励上限',
    'pinyinAcronym': 'qdjlsx',
    'options': [
      'eq'
    ],
    'uiSceneId': 21,
    'uiSceneName': '网约车',
    'qlExpress': null,
    'prefix': '',
    'suffix': '',
    'isEnum': null,
    'enumValues': null,
    'detail': null
  },
  {
    'id': 307,
    'uniqueName': 'dynamicDriverTagType',
    'valueType': 'Integer',
    'chineseName': '动态数据取用方式',
    'pinyinAcronym': 'dtsjqyfs',
    'options': [
      'eq'
    ],
    'uiSceneId': 21,
    'uiSceneName': '网约车',
    'qlExpress': null,
    'prefix': '',
    'suffix': '',
    'isEnum': null,
    'enumValues': null,
    'detail': null
  },
  {
    'id': 309,
    'uniqueName': 'rewardUpperLimitOrderNum',
    'valueType': 'Integer',
    'chineseName': '奖励上限(订单总量)',
    'pinyinAcronym': 'jlsxddzl',
    'options': [
      'eq'
    ],
    'uiSceneId': 21,
    'uiSceneName': '网约车',
    'qlExpress': null,
    'prefix': '',
    'suffix': '',
    'isEnum': null,
    'enumValues': null,
    'detail': null
  },
  {
    'id': 311,
    'uniqueName': 'rewardUpperLimitPerOrderMoney',
    'valueType': 'Integer',
    'chineseName': '奖励上限(每单奖励上限)',
    'pinyinAcronym': 'jlsxmdjlsx',
    'options': [
      'eq'
    ],
    'uiSceneId': 21,
    'uiSceneName': '网约车',
    'qlExpress': null,
    'prefix': '',
    'suffix': '',
    'isEnum': null,
    'enumValues': null,
    'detail': null
  },
  {
    'id': 313,
    'uniqueName': 'feSpan',
    'valueType': 'String',
    'chineseName': '前端专用文本',
    'pinyinAcronym': 'qdzywb',
    'options': [
      'bt',
      'in',
      'like',
      'ne',
      'lt',
      'eq',
      'gt',
      'ge'
    ],
    'uiSceneId': 21,
    'uiSceneName': '网约车',
    'qlExpress': null,
    'prefix': '',
    'suffix': '',
    'isEnum': null,
    'enumValues': null,
    'detail': null
  },
  {
    'id': 315,
    'uniqueName': 'feSpan02',
    'valueType': 'String',
    'chineseName': '前端文本02',
    'pinyinAcronym': 'qdwb02',
    'options': [
      'eq'
    ],
    'uiSceneId': 21,
    'uiSceneName': '网约车',
    'qlExpress': null,
    'prefix': '',
    'suffix': '',
    'isEnum': null,
    'enumValues': null,
    'detail': null
  }
]
export const schema = {
  'name': 'stepComponent',
  'type': 'step',
  'label': '步骤',
  'options': {
    'relation': '',
    'tag': 2
  },
  'formatter': "(function(data,options,utils,config,attrs,icon){console.log(data,options,config,attrs,'======echoData=======');const iconStr=icon('该项为易错/高风险配置,请仔细防止错配');const errorMessage=`<span style='color:red'>*该配置可能有误，请检查并确认（此提示只为防止错配，不影响编辑提交)</span>`;const transform=[{title:'基础信息',step:0,children:[]},{title:'奖励对象',step:1,children:[]}];if('actInnerName'in data){transform[0]['children'].push({label:'内部活动名称',value:data['actInnerName']})}if('actName'in data){transform[0]['children'].push({label:'活动对外名称',value:data['actName']})}if('adcodes'in data){const template=[];options['adcodes'].forEach((item)=>{if(data['adcodes'].find((i)=>i===item.value)){template.push(item.label)}});transform[0]['children'].push({label:'活动城市',value:template.join(',')})}if('actTime'in data){const start=utils.moment(data['actTime'][0]).format('YYYY-MM-DD HH:mm');const end=utils.moment(data['actTime'][1]).format('YYYY-MM-DD HH:mm');transform[0]['children'].push({label:'活动时间',value:'<span>'+start+'-'+end+'</span>'})}if('actOpenTime'in data){transform[0]['children'].push({label:'活动开启时间',value:'<span>'+utils.moment(data['actOpenTime']).format('YYYY-MM-DD HH:mm')+'</span>'})}if('actExplain'in data){transform[0]['children'].push({label:'活动说明',value:'<span>'+data['actExplain']+'</span>'})}if('driverTag'in data){const template=[];const subTemplate=[];options['driverTag'].forEach((item)=>{if(item.value===data['driverTag']){template.push(item.label+`(${item.value})`)}});transform[1]['children'].push({label:'人群标签',value:`<span style=${+data['driverTag']===1?'color:red':''}>${template.join(',')}</span>`+ (+data['driverTag'] === 1 ? iconStr : '')});if('dynamicDriverTagType'in data){options['dynamicDriverTagType']&&options['dynamicDriverTagType'].forEach((item)=>{if(item.value===data['dynamicDriverTagType']){subTemplate.push(item.label)}});transform[1]['children'].push({label:'动态数据取用方式',value:'<span>'+subTemplate.join(',')+'</span>'})}}if('driverBizTypes'in data){const template=[];options['driverBizTypes'].forEach((item)=>{if(data['driverBizTypes'].find((v)=>v==item.value)){template.push(item.label)}});console.log(options,'driverBizTypes');transform[1]['children'].push({label:'司机业务类型',value:'<span>'+template.join(',')+'<span>'})}if('driverTypes'in data){const template=[];options['driverTypes'].forEach((item)=>{if(data['driverTypes'].find((i)=>i===item.value)){template.push(item.label)}});transform[1]['children'].push({label:'司机类型',value:'<span>'+template.join(',')+'<span>'})}const globalData={title:'活动规则(全局)',step:2,children:[]};if('orderBizTypes'in data){const template=[];options['orderBizTypes'].forEach((item)=>{if(data['orderBizTypes'].find((i)=>i===item.value)){template.push(item.label)}});globalData['children'].push({label:'订单业务类型',value:template.join(',')})}if('onlyReservationMode'in data){const tempalte=[];options['onlyReservationMode'].forEach((item)=>{if(data['onlyReservationMode']===item.value){tempalte.push(item.label)}});globalData['children'].push({label:'听单模式',value:tempalte.join(',')})}if('taskPeriod'in data){const tempalte=[];options['taskPeriod'].forEach((item)=>{if(data['taskPeriod']===item.value){tempalte.push(item.label)}});globalData['children'].push({label:'任务周期',value:tempalte.join(',')})}if('settlementInterval'in data){const tempalte=[];options['settlementInterval'].forEach((item)=>{if(data['settlementInterval']===item.value){tempalte.push(item.label)}});globalData['children'].push({label:'结算周期',value:tempalte.join(',')})}transform.push(globalData);console.log(data,'data');for(let i=0;i<data['taskList'].length;i++){const _task={title:'活动规则(任务'+(i+1)+')',step:2,children:[]};if('timeLimit'in data['taskList'][i]){let template='';data['taskList'][i]['timeLimit'].forEach((item)=>{template+=`<p>${item.join('-')}</p>`});if(data['taskList'][i]['timeLimit'].length==0){template='不限'}_task['children'].push({label:'时段要求',value:template})}if('areaLimit'in data['taskList'][i]){let result='';options['areaLimit'].forEach((item)=>{if(item.value===data['taskList'][i]['areaLimit']){result+=`<span>${item.label}</span>`}});if('areaAdcodes'in data['taskList'][i]){result+=`<div>${data['taskList'][i]['areaAdcodes'].map((item)=>{return((options['areaAdcodes'].find((k)=>k.value===item)||{label:''}).label||'')}).join(',')}</div>`}if('sysFences'in data['taskList'][i]){result+=`<div>${data['taskList'][i]['sysFences'].map((item)=>{return((options['sysFences'].find((k)=>k.value===item)||{label:''}).label||'')}).join(',')}</div>`}_task['children'].push({label:'区域要求',value:result})}if('carPoolEffective'in data['taskList'][i]){const tempalte=[];options['carPoolEffective'].forEach((item)=>{if(data['taskList'][i]['carPoolEffective']===item.value){tempalte.push(item.label)}});_task['children'].push({label:'拼车单',value:tempalte.join(',')})}if('carPoolType'in data['taskList'][i]&&data['taskList'][i]['carPoolEffective']===1){const tempalte=[];options['carPoolType'].forEach((item)=>{if(data['taskList'][i]['carPoolType']===item.value){tempalte.push(item.label)}});_task['children'].push({label:'拼车单类型',value:tempalte.join(',')})}if('orderType'in data['taskList'][i]){const tempalte=[];options['orderType'].forEach((item)=>{if(data['taskList'][i]['orderType']===item.value){tempalte.push(item.label)}});_task['children'].push({label:'订单时效类型',value:tempalte.join(',')})}if('orderDistanceOperator'in data['taskList'][i]){let result='';options['orderDistanceOperator'].forEach((item)=>{result+=data['taskList'][i]['orderDistanceOperator']===item.value?item.label:''});if('orderDistance'in data['taskList'][i]){result+=`${data['taskList'][i]['orderDistance'].join('-')}公里`}_task['children'].push({label:'订单里程',value:result})}if('orderPriceOperator'in data['taskList'][i]){let result='';options['orderPriceOperator'].forEach((item)=>{result+=data['taskList'][i]['orderPriceOperator']===item.value?item.label:''});if('orderPrice'in data['taskList'][i]){result+=`${data['taskList'][i]['orderPrice'].join('-')}元`}_task['children'].push({label:'订单流水',value:result})}if('awardRules'in data['taskList'][i]){var str='';var target=data['taskList'][i]['awardRules'][0];if('rewardPerOrderMoney'in target||'rewardTotalMoney'in target){str+='<p>当完成多个阶梯任务时, 仅能获得最高奖励阶梯</p>'}data['taskList'][i]['awardRules'].forEach((item,index)=>{if('orderNum'in item){let onlyOrderNum=true;if('rewardPerOrderMoney'in item||'rewardPerOrderPercentage'in item){str+='完成'+item.orderNum.filter((o)=>o).join('-')+'单';onlyOrderNum=false}if('rewardPerOrderRangeMoney'in item||'rewardPerOrderRangePercentage'in item){str+='完成'+'第'+item.orderNum.filter((o)=>o).join('-')+'单';if(index===data['taskList'][i]['awardRules'].length-1){str+='及以上'}onlyOrderNum=false}if(onlyOrderNum){str+='完成'+item.orderNum.filter((o)=>o).join('-')+'单'}}if('effectiveHour'in item){!('orderNum'in item)?(str+=`出车时长达到${item.effectiveHour||0}小时，</br>`):(str+=`${config.rewardRule.indexRelationship==='and'?'且':'或'}出车时长达到${item.effectiveHour||0}小时，</br>`)}if('moneyAfterCommission'in item){!('effectiveHour'in item)?(str+=`抽佣后流水达到${item.moneyAfterCommission||0}元，</br>`):(str+=`${config.rewardRule.indexRelationship==='and'?'且':'或'}抽佣后流水达到${item.moneyAfterCommission||0}元，</br>`)}const rewardPer=['rewardPerOrderMoney','rewardPerOrderPercentage','rewardPerOrderRangeMoney','rewardPerOrderRangePercentage'];rewardPer.forEach((r)=>{if(r in item){const isMoney=/money$/.test(r.toLowerCase());const isPercentage=/percentage$/.test(r.toLowerCase());const error=isMoney&&+item[r]>=50;str+=`<span style=${isMoney ? 'color:red' : ''}>`+'每单奖励'+item[r]+`${isMoney?'元,':''}`+`${isPercentage?'%,':''}`+'</span>';if(error)str+=iconStr+errorMessage;str+='</br>'}});if('rewardGuaranteedMoney'in item){str+=`<span>`+'保底奖励'+item.rewardGuaranteedMoney+'元'+'</span>';str+='</br>'}if('rewardTotalMoney'in item){str+=`<span>`+'总计奖励'+item.rewardTotalMoney+'元'+'</span>';str+='</br>'}});if(!('rewardTotalMoney'in data['taskList'][i]['awardRules'][0])){if(['rewardUpperLimitMoney','rewardUpperLimitOrderNum','rewardUpperLimitPerOrderMoney','rewardUpperLimitPerOrderMoney'].some((key)=>data['taskList'][i][key])){str+='</br>活动周期内:'}if('rewardUpperLimitMoney'in data['taskList'][i]&&data['taskList'][i]['rewardUpperLimitMoney']){str+=`最多奖励${data['taskList'][i]['rewardUpperLimitMoney']}元,`}if('rewardUpperLimitOrderNum'in data['taskList'][i]&&data['taskList'][i]['rewardUpperLimitOrderNum']){str+=`最多奖励${data['taskList'][i]['rewardUpperLimitOrderNum']}单,`}if('rewardUpperLimitPerOrderMoney'in data['taskList'][i]&&data['taskList'][i]['rewardUpperLimitPerOrderMoney']){str+=`每笔订单最多奖励${data['taskList'][i]['rewardUpperLimitPerOrderMoney']}元`}if(data['taskList'][i]['maximumRewardLimitFe']&&data['taskList'][i]['maximumRewardLimitFe'].includes(-1)){str+=`</br>奖励无上限`}}_task['children'].push({label:'奖励规则',value:str})}if('rewardLimitRules'in data['taskList'][i]){let str='<p>多条件时，需同时满足全部条件才能获得奖励</p>';data['taskList'][i]['rewardLimitRules'].forEach((item)=>{if('orderNum'in item&&item['orderNum'].length){str+='完单量≥'+item.orderNum[0]+'单，'+item.timeSegment.reduce((prev,next)=>((prev=prev+next[0]+'-'+next[1]+','),prev),'');str+='</br>'}if('effectiveHour'in item&&item['effectiveHour'].length){str+='出车时长≥'+item.effectiveHour[0]+'小时，'+item.timeSegment.reduce((prev,next)=>((prev=prev+next[0]+'-'+next[1]+','),prev),'');str+='</br>'}});_task['children'].push({label:'获奖要求',value:str})}if('orderRiskControlPercentage'in data['taskList'][i]){const prefix=attrs['orderRiskControlPercentage'].prefix||'';const suffix=attrs['orderRiskControlPercentage'].suffix||'';const str=`<span>${prefix}${data['taskList'][i]['orderRiskControlPercentage']}${suffix}</span>`;_task['children'].push({label:'风险控制',value:str})}transform.push(_task)}if('skinKey'in data){const template=[];options['skinKey'].forEach((item)=>{if(data['skinKey']===item.value){template.push(item.label)}});transform.push({title:'皮肤选择',step:3,children:[{label:'页面选择',value:template.join(',')}]})}console.log(transform);return transform})",
  'children': [
    {
      'name': 'baseInfo',
      'type': 'block',
      'label': '基本信息',
      'options': {
        'relation': 'and',
        'needCheck': [
          {
            'currentName': 'actTime',
            'dependsChunk': [],
            'validation': '',
            'message': '',
            'config': {
              'validation': "(data)=>data['actTime-actTime-rule']&&data['actTime-actTime-rule_day']||data['actTime-actTime-rule_days']",
              'message': '请填写活动时间限制'
            }
          }
        ]
      },
      'isCanvas': true,
      'children': [
        {
          'requestID': 'actInnerName',
          'name': 'actInnerName',
          'type': 'chunk',
          'label': '内部活动名称',
          'options': {
            'interaction': '(function() {\n    return {\n        // display: function(form) {\n        //     let flag = form.actExplain == 2\n   \n        //     if ( !flag ) {\n        //         // 隐藏chunk时，清空表单数据\n        //         form.actInnerName = null\n        //     }\n\n        //     return  flag\n        // }\n    }\n})',
            'canDelete': false
          },
          'nodeCompId': 3,
          'realVersion': 'actInnerName',
          'namePath': '/baseInfo/actInnerName',
          'operationareaLabel': '内部活动名称',
          'operations': {},
          'parentId': 2,
          'currentParantCompName': 'baseInfo'
        },
        {
          'requestID': 'actName',
          'name': 'actName',
          'type': 'chunk',
          'label': '活动对外名称',
          'options': {
            'interaction': '(function() {\n  return {}\n})\n',
            'canDelete': false
          },
          'nodeCompId': 4,
          'realVersion': 'actName',
          'namePath': '/baseInfo/actName',
          'operationareaLabel': '活动对外名称',
          'operations': {},
          'parentId': 2,
          'currentParantCompName': 'baseInfo'
        },
        {
          'requestID': 'adcodes',
          'name': 'adcodes',
          'type': 'chunk',
          'label': '活动城市',
          'options': {
            'interaction': '(function() {\n    return {\n    }\n})',
            'canDelete': false
          },
          'nodeCompId': 5,
          'realVersion': 'adcodes',
          'namePath': '/baseInfo/adcodes',
          'operationareaLabel': '活动城市',
          'operations': {},
          'parentId': 2,
          'currentParantCompName': 'baseInfo'
        },
        {
          'requestID': 'actTime',
          'name': 'actTime',
          'type': 'chunk',
          'label': '活动时间',
          'options': {
            'description': '最多设置7天',
            'canDelete': false,
            'limit': true,
            'limitOperator': 'bt',
            'limitDays': [
              3,
              4
            ],
            'operators': 'bt'
          },
          'nodeCompId': 6,
          'realVersion': 'actTime',
          'namePath': '/baseInfo/actTime',
          'operationareaLabel': '活动时间',
          'operations': {
            'actTime': {
              'rule': 2,
              'rule_day': 7
            }
          },
          'parentId': 2,
          'currentParantCompName': 'baseInfo'
        },
        {
          'requestID': 'actOpenTime',
          'name': 'actOpenTime',
          'type': 'chunk',
          'label': '活动可见时间',
          'options': {
            'canDelete': false,
            'show': false,
            'limit': true,
            'limitOperator': 'bt',
            'limitDays': [
              3,
              4
            ],
            'operators': 'bt'
          },
          'nodeCompId': 7,
          'realVersion': 'actOpenTime',
          'namePath': '/baseInfo/actOpenTime',
          'operationareaLabel': '活动可见时间',
          'operations': {},
          'parentId': 2,
          'currentParantCompName': 'baseInfo'
        },
        {
          'requestID': 'actExplain',
          'name': 'actExplain',
          'type': 'chunk',
          'label': '活动说明',
          'options': {
            'canDelete': false,
            'show': false,
            'limit': true,
            'limitOperator': 'bt',
            'limitDays': [
              3,
              4
            ],
            'operators': 'bt'
          },
          'nodeCompId': 8,
          'realVersion': 'actExplain',
          'namePath': '/baseInfo/actExplain',
          'operationareaLabel': '活动说明',
          'operations': {},
          'parentId': 2,
          'currentParantCompName': 'baseInfo'
        }
      ],
      'nodeCompId': 2,
      'hideLabel': true
    },
    {
      'name': 'rewardTarget',
      'type': 'block',
      'label': '奖励对象',
      'options': {
        'relation': 'and'
      },
      'isCanvas': true,
      'children': [
        {
          'requestID': 'driverTag',
          'name': 'driverTag',
          'type': 'chunk',
          'label': '人群标签',
          'options': {
            'canDelete': false,
            'show': false
          },
          'nodeCompId': 10,
          'realVersion': 'driverTag',
          'namePath': '/rewardTarget/driverTag',
          'operationareaLabel': '人群标签',
          'operations': {},
          'parentId': 9,
          'currentParantCompName': 'rewardTarget'
        },
        {
          'requestID': 'dynamicDriverTagType',
          'name': 'dynamicDriverTagType',
          'type': 'chunk',
          'label': '动态数据取用方式',
          'options': {
            'interaction': "(function() {\n  return {\n    display: function(newValue, oldValue) {\n      let displayByDriverTag = false\n\n      if (!oldValue || newValue.driverTag !== oldValue?.driverTag) {\n        const driverTag = this.utils.findComponentsDownward('driverTag')\n        const selectedParams = driverTag && driverTag[0] && driverTag[0].$children && driverTag[0].$children[0] && driverTag[0].$children[0].selectedParams || {}\n\n        displayByDriverTag = (selectedParams && selectedParams.label && selectedParams.label.indexOf('动') === 0) || false\n        const isStaticDriverTag = (selectedParams && selectedParams.label && (selectedParams.label.indexOf('静') === 0 || selectedParams.label.indexOf('所有') === 0))\n        if (isStaticDriverTag) {\n          this.$delete(this.formData, 'dynamicDriverTagType')\n        }\n        if (displayByDriverTag) {\n          return displayByDriverTag\n        }\n      }\n\n      const isHaveCurrentValue = this.formData?.dynamicDriverTagType\n      const displayBySelf = isHaveCurrentValue || false\n      return !!displayBySelf\n    }\n  }\n})\n\n",
            'canDelete': false,
            'show': false
          },
          'nodeCompId': 11,
          'realVersion': 'dynamicDriverTagType',
          'namePath': '/rewardTarget/dynamicDriverTagType',
          'operationareaLabel': '动态数据取用方式',
          'operations': {},
          'parentId': 9,
          'currentParantCompName': 'rewardTarget'
        },
        {
          'requestID': 'driverBizTypes',
          'name': 'driverBizTypes',
          'type': 'chunk',
          'label': '司机业务类型',
          'options': {
            'canDelete': false,
            'show': false
          },
          'nodeCompId': 12,
          'realVersion': 'driverBizTypes',
          'namePath': '/rewardTarget/driverBizTypes',
          'operationareaLabel': '司机业务类型',
          'operations': {},
          'parentId': 9,
          'currentParantCompName': 'rewardTarget'
        },
        {
          'requestID': 'driverTypes',
          'name': 'driverTypes',
          'type': 'chunk',
          'label': '司机类型',
          'options': {
            'canDelete': false,
            'show': false
          },
          'nodeCompId': 13,
          'realVersion': 'driverTypes',
          'namePath': '/rewardTarget/driverTypes',
          'operationareaLabel': '司机类型',
          'operations': {},
          'parentId': 9,
          'currentParantCompName': 'rewardTarget'
        }
      ],
      'nodeCompId': 9,
      'hideLabel': true
    },
    {
      'name': 'activityRule',
      'type': 'block',
      'label': '活动规则',
      'options': {
        'relation': 'and'
      },
      'children': [
        {
          'name': 'globalConfig',
          'type': 'block',
          'label': '全局配置',
          'options': {
            'relation': 'and',
            'needCheck': [
              {
                'currentName': 'taskPeriod',
                'dependsChunk': [
                  'settlementInterval'
                ],
                'validation': '',
                'message': '',
                'config': {
                  'validation': "(data)=>!(data['taskPeriod-taskPeriod-option']===2&&data['settlementInterval-settlementInterval-option'].includes(1))",
                  'message': '任务周期选择周期任务时，结算周期不可再选择每日结束后次日发放'
                }
              }
            ]
          },
          'isCanvas': true,
          'children': [
            {
              'name': 'rewardConditions',
              'type': 'block',
              'label': '奖励条件',
              'options': {
                'relation': 'and',
                'needSort': true
              },
              'children': [],
              'nodeCompId': 16
            },
            {
              'name': 'taskRule',
              'type': 'block',
              'label': '任务规则',
              'options': {
                'relation': 'and',
                'needSort': true
              },
              'children': [
                {
                  'requestID': 'taskPeriod',
                  'name': 'taskPeriod',
                  'type': 'chunk',
                  'label': '任务周期',
                  'options': {
                    'canDelete': false,
                    'notRemoveButton': true,
                    'show': true,
                    'value': 1,
                    'displayOrder': 1,
                    'parentField': -1
                  },
                  'nodeCompId': 20,
                  'realVersion': 'taskPeriod',
                  'namePath': '/activityRule/globalConfig/taskRule/taskPeriod',
                  'operationareaLabel': '任务周期',
                  'operations': {
                    'taskPeriod': {
                      'option': 0
                    }
                  },
                  'parentId': 19,
                  'currentParantCompName': 'taskRule'
                },
                {
                  'requestID': 'settlementInterval',
                  'name': 'settlementInterval',
                  'type': 'chunk',
                  'label': '结算周期',
                  'options': {
                    'canDelete': false,
                    'notRemoveButton': true,
                    'show': true,
                    'value': 1,
                    'displayOrder': 2,
                    'parentField': -1
                  },
                  'nodeCompId': 21,
                  'realVersion': 'settlementInterval',
                  'namePath': '/activityRule/globalConfig/taskRule/settlementInterval',
                  'operationareaLabel': '结算周期',
                  'operations': {
                    'settlementInterval': {
                      'option': [
                        0,
                        1
                      ]
                    }
                  },
                  'parentId': 19,
                  'currentParantCompName': 'taskRule'
                }
              ],
              'nodeCompId': 19
            }
          ],
          'nodeCompId': 15
        },
        {
          'name': 'taskList',
          'type': 'tab',
          'label': '任务列表',
          'options': {
            'relation': 3,
            'dependence': [
              [],
              [
                0,
                1
              ],
              []
            ],
            'childrenLimit': 5
          },
          'children': [
            {
              'name': 'taskInfo',
              'type': 'block',
              'label': '任务1',
              'options': {
                'relation': 'and',
                'needCheck': [
                  {
                    'currentName': 'orderNum_v2',
                    'dependsChunk': [
                      'moneyAfterCommission',
                      'effectiveHour'
                    ],
                    'validation': "(data)=>data['orderNum_v2']||data['moneyAfterCommission']||data['effectiveHour']",
                    'message': '任务指标组件必选其一',
                    'config': {
                      'validation': '',
                      'message': ''
                    }
                  },
                  {
                    'currentName': 'rewardTotalMoney',
                    'dependsChunk': [
                      'rewardPerOrder_v2',
                      'rewardPerOrderRange_v2',
                      'rewardGuaranteedMoney'
                    ],
                    'validation': "(data)=>data['rewardPerOrder_v2']||data['rewardTotalMoney']||data['rewardPerOrderRange_v2']||data['rewardGuaranteedMoney']",
                    'message': '权益内容组件必选其一',
                    'config': {
                      'validation': '',
                      'message': ''
                    }
                  }
                ],
                'disabledComChunk': [
                  'orderBizTypes',
                  'onlyReservationMode',
                  'settlementInterval',
                  'taskPeriod'
                ]
              },
              'isCanvas': true,
              'children': [
                {
                  'type': 'block',
                  'name': 'taskId',
                  'children': [],
                  'nodeCompId': 24
                },
                {
                  'name': 'rewardConditions',
                  'type': 'block',
                  'label': '奖励条件',
                  'options': {
                    'relation': 'and',
                    'needSort': true
                  },
                  'children': [
                    {
                      'requestID': 'timeLimit',
                      'name': 'timeLimit',
                      'type': 'chunk',
                      'label': '时段要求',
                      'options': {
                        'canDelete': true,
                        'show': true,
                        'displayOrder': 3
                      },
                      'nodeCompId': 28,
                      'realVersion': 'timeLimit',
                      'namePath': '/activityRule/taskList/taskInfo/rewardConditions/timeLimit',
                      'operationareaLabel': '时段要求',
                      'operations': {
                        'timeLimit': {
                          'option': [
                            -1,
                            1
                          ],
                          'displayNoLimitEnable': 1
                        }
                      },
                      'parentId': 25,
                      'currentParantCompName': 'rewardConditions',
                      'parentField': 0
                    },
                    {
                      'requestID': 'areaLimit',
                      'name': 'areaLimit',
                      'type': 'chunk',
                      'label': '区域要求',
                      'options': {
                        'description': "选择全城的情况下，司机完成起点在任意区域的订单都会计入活动有效订单；通过'区/县'或'电子围栏'的情况下，司机完成起点在限制区域内的订单才会计入活动有效订单。",
                        'canDelete': true,
                        'show': true,
                        'displayOrder': 4
                      },
                      'nodeCompId': 29,
                      'realVersion': 'areaLimit',
                      'namePath': '/activityRule/taskList/taskInfo/rewardConditions/areaLimit',
                      'operationareaLabel': '区域要求',
                      'operations': {
                        'areaLimit': {
                          'option': [
                            -1,
                            1,
                            2
                          ],
                          'displayNoLimitEnable': 1,
                          'description': '选择全城的情况下，司机完成起点在任意区域的订单都会计入活动有效订单；\n通过"区/县"或“电子围栏”的情况下，司机完成起点在限制区域内的订单才会计入活动有效订单。'
                        }
                      },
                      'parentId': 25,
                      'currentParantCompName': 'rewardConditions',
                      'parentField': 0
                    },
                    {
                      'requestID': 'carPoolEffective',
                      'name': 'carPoolEffective',
                      'type': 'chunk',
                      'label': '拼车单',
                      'options': {
                        'interaction': '(function() {\n  return {\n    display: (formData) => {\n      // if (formData?.taskList[0]?.areaAdcodes) {\n      //   formData.taskList[0].areaAdcodes = []\n      // }\n      // if (formData?.taskList[0]?.sysFences) {\n      //   formData.taskList[0].sysFences = []\n      // }\n\n      return true\n    }\n  }\n})\n',
                        'isRemoveAttrConfig': false,
                        'description': '拼车业务, 会以拼车行程中的订单计入奖励订单数量,例如: 一个行程拼了3单，且3单都在奖励时段内, 则奖励订单数会记为3单,不在奖励时段内的订单不计入奖励',
                        'canDelete': true,
                        'show': true,
                        'displayOrder': 5,
                        'deleteLimit': [
                          {
                            'chunkName': 'moneyAfterCommission',
                            'chunkLabel': '抽用后流水'
                          },
                          {
                            'chunkName': 'rewardPerOrderRange_v2',
                            'chunkLabel': '每单奖励(区间)',
                            'validation': 'chunk => chunk.operations.rewardPerOrderRange.rewards === 1'
                          },
                          {
                            'chunkName': 'rewardPerOrder_v2',
                            'chunkLabel': '每单奖励',
                            'validation': 'chunk => chunk.operations.rewardPerOrderMoney.rewards === 1'
                          }
                        ],
                        'relationPut': 'carPoolType',
                        'needDeleteNode': {
                          '_prevClass': 'el-icon-delete delete'
                        }
                      },
                      'nodeCompId': 30,
                      'realVersion': 'carPoolEffective',
                      'namePath': '/activityRule/taskList/taskInfo/rewardConditions/carPoolEffective',
                      'operationareaLabel': '拼车单',
                      'operations': {
                        'carPoolEffective': {
                          'option': [
                            0
                          ],
                          'description': '拼车业务, 会以拼车行程中的订单计入奖励订单数量,例如: 一个行\n程拼了3单，且3单都在奖励时段内, 则奖励订单数会记为3单,不在\n奖励时段内的订单不计入奖励'
                        }
                      },
                      'parentId': 25,
                      'currentParantCompName': 'rewardConditions',
                      'parentField': 0
                    },
                    {
                      'requestID': 'orderType',
                      'name': 'orderType',
                      'type': 'chunk',
                      'label': '订单时效类型',
                      'options': {
                        'canDelete': true,
                        'show': true,
                        'displayOrder': 6
                      },
                      'nodeCompId': 32,
                      'realVersion': 'orderType',
                      'namePath': '/activityRule/taskList/taskInfo/rewardConditions/orderType',
                      'operationareaLabel': '订单时效类型',
                      'operations': {
                        'orderType': {
                          'option': [
                            -1,
                            200,
                            201
                          ],
                          'displayNoLimitEnable': 1
                        }
                      },
                      'parentId': 25,
                      'currentParantCompName': 'rewardConditions',
                      'parentField': 0
                    },
                    {
                      'requestID': 'orderDistance',
                      'name': 'orderDistance',
                      'type': 'chunk',
                      'label': '订单里程',
                      'options': {
                        'canDelete': true,
                        'show': true,
                        'displayOrder': 7
                      },
                      'nodeCompId': 33,
                      'realVersion': 'orderDistance',
                      'namePath': '/activityRule/taskList/taskInfo/rewardConditions/orderDistance',
                      'operationareaLabel': '订单里程',
                      'operations': {
                        'orderDistanceOperator': {
                          'option': [
                            'unlimited',
                            'lt',
                            'le',
                            'gt',
                            'ge',
                            'bt'
                          ],
                          'displayNoLimitEnable': 1
                        }
                      },
                      'parentId': 25,
                      'currentParantCompName': 'rewardConditions',
                      'parentField': 0
                    },
                    {
                      'requestID': 'orderPrice',
                      'name': 'orderPrice',
                      'type': 'chunk',
                      'label': '订单流水',
                      'options': {
                        'canDelete': true,
                        'show': true,
                        'displayOrder': 8
                      },
                      'nodeCompId': 34,
                      'realVersion': 'orderPrice',
                      'namePath': '/activityRule/taskList/taskInfo/rewardConditions/orderPrice',
                      'operationareaLabel': '订单流水',
                      'operations': {
                        'orderPriceOperator': {
                          'option': [
                            'unlimited',
                            'lt',
                            'le',
                            'gt',
                            'ge',
                            'bt'
                          ],
                          'displayNoLimitEnable': 1
                        }
                      },
                      'parentId': 25,
                      'currentParantCompName': 'rewardConditions',
                      'parentField': 0
                    }
                  ],
                  'nodeCompId': 25
                },
                {
                  'name': 'taskRule',
                  'type': 'block',
                  'label': '任务规则',
                  'options': {
                    'relation': 'and',
                    'needSort': true
                  },
                  'children': [
                    {
                      'name': 'rewardLevel',
                      'type': 'block',
                      'label': '',
                      'options': {
                        'style': {
                          'target': 'canvas',
                          'border': '1px solid #ccc'
                        },
                        'relation': 'max',
                        'childrenLimit': 5,
                        'displayOrder': 3,
                        'needSort': true
                      },
                      'children': [
                        {
                          'name': 'rewardRule',
                          'type': 'rule',
                          'label': '奖励规则',
                          'operations': {
                            'rewardRule': {
                              'indexRelationship': 'and',
                              'numberSteps': 5
                            }
                          },
                          'options': {
                            'canDelete': false,
                            'notRemoveButton': true,
                            'relation': 'and',
                            'displayOrder': 2,
                            'description': '最多5个阶梯',
                            'style': {
                              'target': 'operationArea',
                              'padding': '5px',
                              'border': '1px solid #ccc',
                              'borderRadius': '5px'
                            },
                            'ruleConfig': [
                              {
                                'label': '1.指标间关系',
                                'value': 'and',
                                'key': 'indexRelationship',
                                'type': 'BlmBizRadioGroup',
                                'props': {
                                  'options': [
                                    {
                                      'label': '同时满足(且)',
                                      'value': 'and'
                                    },
                                    {
                                      'label': '任意满足(或)',
                                      'value': 'or'
                                    }
                                  ]
                                }
                              },
                              {
                                'label': '2.阶梯数量上限',
                                'type': 'BlmBizInputNumber',
                                'value': 5,
                                'key': 'numberSteps',
                                'props': {
                                  'min': 1,
                                  'max': 99,
                                  'precision': 0,
                                  'controls': false
                                }
                              }
                            ],
                            'finalDescription': '最多5个阶梯, 当完成多阶梯任务时，按最高阶梯发放每单奖励'
                          },
                          'children': [
                            {
                              'name': 'taskData',
                              'type': 'block',
                              'label': '任务指标',
                              'options': {
                                'hideLabel': 'canvas',
                                'relation': 'and',
                                'minChildrenLength': 1
                              },
                              'children': [
                                {
                                  'requestID': 'orderNum_v3',
                                  'name': 'orderNum_v2',
                                  'type': 'chunk',
                                  'label': '完成',
                                  'adoptLayoutLabel': true,
                                  'options': {
                                    'interaction': '(function () {\n  const ctx = this;\n  const orderNumInfo = this.specialField.filter(\n    (item) => item.relationField === "orderNum"\n  )[0]; // 是否是拼车单还是拼车单区间\n  // @gongzhen\n  return {\n    display: function (newFormData, oldFormData, tag) {\n      if (orderNumInfo && orderNumInfo.isInterval) {\n        if (tag) {\n          const { ruleLayer, taskNum } = tag;\n          debugger;\n          const rewardUpperLimitOrderNum =\n            ctx.formData.taskList[taskNum]?.rewardUpperLimitOrderNum; // 订单总量\n          if (newFormData?.taskList[taskNum]?.awardRules.length - 1 < ruleLayer)\n            return true;\n\n          if (ruleLayer !== 0) {\n            let nextValue =\n              ctx.formData?.taskList[taskNum]?.awardRules[ruleLayer]\n                ?.orderNum[0];\n            if (typeof nextValue !== "number") {\n              nextValue = undefined;\n            }\n\n            const nextValue2 =\n              ctx.formData?.taskList[taskNum]?.awardRules[ruleLayer]\n                ?.orderNum[1];\n            const firstValue =\n              ctx.formData?.taskList[taskNum]?.awardRules[ruleLayer - 1]\n                ?.orderNum[0];\n            const firstValue2 =\n              ctx.formData?.taskList[taskNum]?.awardRules[ruleLayer - 1]\n                ?.orderNum[1];\n\n            // 获取当前层级的上一次赋值\n            const preNextValue =\n              oldFormData &&\n              oldFormData.formData?.taskList[taskNum]?.awardRules[ruleLayer]\n                ?.orderNum[0];\n            // 不再进行值的更新\n            if (nextValue > 999) {\n              ctx.$set(\n                ctx.formData?.taskList[taskNum]?.awardRules[ruleLayer]\n                  ?.orderNum,\n                0,\n                preNextValue\n              );\n            }\n\n            if (typeof nextValue === "number" && firstValue >= nextValue) {\n              setTimeout(() => {\n                ctx.$set(\n                  ctx.formData?.taskList[taskNum].awardRules[ruleLayer]\n                    ?.orderNum,\n                  0,\n                  firstValue + 1\n                );\n              });\n            } else if (\n              typeof nextValue === "number" &&\n              firstValue < nextValue\n            ) {\n              ctx.$set(\n                ctx.formData?.taskList[taskNum]?.awardRules[ruleLayer - 1]\n                  ?.orderNum,\n                1,\n                nextValue - 1\n              );\n            } else if (\n              !firstValue2 ||\n              (firstValue2 && firstValue2 >= nextValue)\n            ) {\n              ctx.$set(\n                ctx.formData?.taskList[taskNum]?.awardRules[ruleLayer - 1]\n                  ?.orderNum,\n                1,\n                nextValue - 1\n              );\n            } else if (nextValue2 && nextValue2 < nextValue) {\n              ctx.$set(\n                ctx.formData?.taskList[taskNum]?.awardRules[ruleLayer]\n                  ?.orderNum,\n                1,\n                nextValue\n              );\n            }\n          }\n\n          // 最高层级删除第二值\n          //   if (\n          //     newFormData?.taskList[taskNum]?.awardRules.length - 1 ===\n          //     ruleLayer\n          //   ) {\n          //     if (newFormData?.taskList[taskNum]?.awardRules[ruleLayer]) {\n          //       ctx.$set(\n          //         ctx.formData?.taskList[taskNum]?.awardRules[ruleLayer]\n          //           ?.orderNum,\n          //         1,\n          //         undefined\n          //       );\n          //     }\n          //   }\n\n          // 如果是最高层\n          if (\n            newFormData?.taskList[taskNum]?.awardRules.length - 1 ===\n            ruleLayer\n          ) {\n            debugger;\n            let nextValue =\n              newFormData?.taskList[taskNum]?.awardRules[ruleLayer].orderNum[0];\n            if (\n              rewardUpperLimitOrderNum &&\n              typeof nextValue === "number" &&\n              rewardUpperLimitOrderNum >= nextValue\n            ) {\n              ctx.$set(\n                ctx.formData?.taskList[taskNum]?.awardRules[ruleLayer]\n                  ?.orderNum,\n                1,\n                rewardUpperLimitOrderNum\n              );\n            } else if (\n              rewardUpperLimitOrderNum &&\n              typeof nextValue === "number" &&\n              rewardUpperLimitOrderNum < nextValue\n            ) {\n              debugger;\n              ctx.$set(\n                ctx.formData?.taskList[taskNum],\n                "rewardUpperLimitOrderNum",\n                nextValue\n              );\n            } else if (rewardUpperLimitOrderNum) {\n              ctx.$set(\n                ctx.formData?.taskList[taskNum]?.awardRules[ruleLayer]\n                  ?.orderNum,\n                1,\n                rewardUpperLimitOrderNum\n              );\n            } else {\n              if (newFormData?.taskList[taskNum]?.awardRules[ruleLayer]) {\n                ctx.$set(\n                  ctx.formData?.taskList[taskNum]?.awardRules[ruleLayer]\n                    ?.orderNum,\n                  1,\n                  undefined\n                );\n              }\n            }\n          }\n        }\n      }\n\n      return true;\n    },\n  };\n});\n',
                                    'canDelete': true,
                                    'show': true,
                                    'operator': 'ge',
                                    'defaultPut': false,
                                    'deleteLimit': [
                                      {
                                        'chunkName': 'rewardPerOrderRange_v2',
                                        'chunkLabel': '每单奖励(区间)'
                                      }
                                    ]
                                  },
                                  'nodeCompId': 41,
                                  'realVersion': 'orderNum_v3',
                                  'namePath': '/activityRule/taskList/taskInfo/taskRule/rewardLevel/rewardRule/taskData/orderNum_v2',
                                  'operationareaLabel': '完单量',
                                  'operations': {},
                                  'parentId': 40,
                                  'currentParantCompName': 'taskData',
                                  'parentField': 0
                                },
                                {
                                  'requestID': 'moneyAfterCommission',
                                  'name': 'moneyAfterCommission',
                                  'type': 'chunk',
                                  'label': '抽佣后流水',
                                  'options': {
                                    'isPrefix': false,
                                    'isSuffix': false,
                                    'canDelete': true,
                                    'show': true,
                                    'relationPut': 'carPoolEffective'
                                  },
                                  'nodeCompId': 43,
                                  'realVersion': 'moneyAfterCommission',
                                  'namePath': '/activityRule/taskList/taskInfo/taskRule/rewardLevel/rewardRule/taskData/moneyAfterCommission',
                                  'operationareaLabel': '抽佣后流水',
                                  'operations': {},
                                  'parentId': 40,
                                  'currentParantCompName': 'taskData',
                                  'parentField': 0
                                }
                              ],
                              'nodeCompId': 40
                            },
                            {
                              'name': 'rewardData',
                              'type': 'block',
                              'label': '权益内容',
                              'options': {
                                'hideLabel': 'canvas',
                                'relation': '',
                                'numLimit': 1,
                                'minChildrenLength': '1'
                              },
                              'children': [
                                {
                                  'requestID': 'rewardPerOrder_v2',
                                  'name': 'rewardPerOrder_v2',
                                  'type': 'chunk',
                                  'label': '每单奖励',
                                  'options': {
                                    'relationPut': 'rewardUpperLimitMoney_v2',
                                    'notRemoveButton': true,
                                    'rewardUpperLimitOrderNum': '',
                                    'rewardUpperLimitMoney': '',
                                    'rewardPerOrderMoney': '',
                                    'canDelete': true,
                                    'show': true,
                                    'data': [],
                                    'varDescription': '当完成多阶梯任务时，按最高阶梯发放每单奖励'
                                  },
                                  'nodeCompId': 47,
                                  'realVersion': 'rewardPerOrder_v2',
                                  'namePath': '/activityRule/taskList/taskInfo/taskRule/rewardLevel/rewardRule/rewardData/rewardPerOrder_v2',
                                  'operationareaLabel': '每单奖励',
                                  'operations': {
                                    'rewardPerOrderMoney': {
                                      'rewards': 0,
                                      'rewardsUpperLimit': [
                                        -1,
                                        0,
                                        1
                                      ]
                                    }
                                  },
                                  'parentId': 44,
                                  'currentParantCompName': 'rewardData',
                                  'parentField': 0
                                }
                              ],
                              'nodeCompId': 44
                            }
                          ],
                          'nodeCompId': 39
                        },
                        {
                          'requestID': 'rewardUpperLimitMoney_v3',
                          'name': 'rewardUpperLimitMoney_v2',
                          'type': 'chunk',
                          'label': '奖励上限',
                          'options': {
                            'interaction': '(function() {\n    return {}\n})',
                            'hubbleDescription': '每日<span style="color: #f00">奖励无上限</span>',
                            'initHubbleDescription': '<span style="color: #f00">奖励无上限</span>',
                            'hide': true,
                            'isSuffix': false,
                            'canDelete': true,
                            'showDelete': false,
                            'relationOption': 'rewardPerOrder_v2',
                            'deleteLimit': [
                              {
                                'chunkName': 'rewardPerOrder_v2',
                                'chunkLabel': '每单奖励'
                              },
                              {
                                'chunkName': 'rewardPerOrderRange_v2',
                                'chunkLabel': '每单奖励(区间)'
                              }
                            ],
                            'displayOrder': 2
                          },
                          'nodeCompId': 49,
                          'realVersion': 'rewardUpperLimitMoney_v3',
                          'namePath': '/activityRule/taskList/taskInfo/taskRule/rewardLevel/rewardUpperLimitMoney_v2',
                          'operationareaLabel': '奖励上限',
                          'operations': {
                            'maximumRewardLimitFe': {
                              'option': [
                                -1,
                                0,
                                1
                              ]
                            }
                          },
                          'parentId': 38,
                          'currentParantCompName': 'rewardLevel',
                          'parentField': 0,
                          'replaceSuffix': {
                            'newSuffix': '元',
                            'target': 'tagMaximumLimit'
                          }
                        }
                      ],
                      'nodeCompId': 38
                    }
                  ],
                  'nodeCompId': 35
                },
                {
                  'name': 'rewardLimit',
                  'type': 'block',
                  'label': '获奖限制',
                  'options': {
                    'relation': 'and',
                    'needSort': true
                  },
                  'children': [],
                  'nodeCompId': 50
                }
              ],
              'nodeCompId': 23,
              'hideLabel': true
            }
          ],
          'nodeCompId': 22
        }
      ],
      'nodeCompId': 14,
      'hideLabel': true
    },
    {
      'name': 'selectSkin',
      'type': 'block',
      'label': '皮肤选择',
      'options': {},
      'isCanvas': true,
      'children': [
        {
          'requestID': 'selectSkin_v2',
          'name': 'selectSkin',
          'type': 'chunk',
          'label': '皮肤选择',
          'options': {
            'interaction': '(function() {\n    return {}\n})',
            'canDelete': false,
            'show': false
          },
          'nodeCompId': 54,
          'realVersion': 'selectSkin_v2',
          'namePath': '/selectSkin/selectSkin',
          'operationareaLabel': '皮肤选择',
          'operations': {},
          'parentId': 53,
          'currentParantCompName': 'selectSkin'
        }
      ],
      'nodeCompId': 53,
      'hideLabel': true
    }
  ],
  'nodeCompId': 1
}

