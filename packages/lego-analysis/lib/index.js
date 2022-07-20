import Vue from 'vue';
import AsyncValidator from 'async-validator';
import _ from 'lodash';
import { Message } from 'element-ui';

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }

  return target;
}

function _regeneratorRuntime() {
  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */

  _regeneratorRuntime = function () {
    return exports;
  };

  var exports = {},
      Op = Object.prototype,
      hasOwn = Op.hasOwnProperty,
      $Symbol = "function" == typeof Symbol ? Symbol : {},
      iteratorSymbol = $Symbol.iterator || "@@iterator",
      asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",
      toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    return Object.defineProperty(obj, key, {
      value: value,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), obj[key];
  }

  try {
    define({}, "");
  } catch (err) {
    define = function (obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
        generator = Object.create(protoGenerator.prototype),
        context = new Context(tryLocsList || []);
    return generator._invoke = function (innerFn, self, context) {
      var state = "suspendedStart";
      return function (method, arg) {
        if ("executing" === state) throw new Error("Generator is already running");

        if ("completed" === state) {
          if ("throw" === method) throw arg;
          return doneResult();
        }

        for (context.method = method, context.arg = arg;;) {
          var delegate = context.delegate;

          if (delegate) {
            var delegateResult = maybeInvokeDelegate(delegate, context);

            if (delegateResult) {
              if (delegateResult === ContinueSentinel) continue;
              return delegateResult;
            }
          }

          if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) {
            if ("suspendedStart" === state) throw state = "completed", context.arg;
            context.dispatchException(context.arg);
          } else "return" === context.method && context.abrupt("return", context.arg);
          state = "executing";
          var record = tryCatch(innerFn, self, context);

          if ("normal" === record.type) {
            if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
            return {
              value: record.arg,
              done: context.done
            };
          }

          "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
        }
      };
    }(innerFn, self, context), generator;
  }

  function tryCatch(fn, obj, arg) {
    try {
      return {
        type: "normal",
        arg: fn.call(obj, arg)
      };
    } catch (err) {
      return {
        type: "throw",
        arg: err
      };
    }
  }

  exports.wrap = wrap;
  var ContinueSentinel = {};

  function Generator() {}

  function GeneratorFunction() {}

  function GeneratorFunctionPrototype() {}

  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });
  var getProto = Object.getPrototypeOf,
      NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);

  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      define(prototype, method, function (arg) {
        return this._invoke(method, arg);
      });
    });
  }

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);

      if ("throw" !== record.type) {
        var result = record.arg,
            value = result.value;
        return value && "object" == typeof value && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {
          invoke("next", value, resolve, reject);
        }, function (err) {
          invoke("throw", err, resolve, reject);
        }) : PromiseImpl.resolve(value).then(function (unwrapped) {
          result.value = unwrapped, resolve(result);
        }, function (error) {
          return invoke("throw", error, resolve, reject);
        });
      }

      reject(record.arg);
    }

    var previousPromise;

    this._invoke = function (method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function (resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
    };
  }

  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];

    if (undefined === method) {
      if (context.delegate = null, "throw" === context.method) {
        if (delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel;
        context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);
    if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
    var info = record.arg;
    return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
  }

  function pushTryEntry(locs) {
    var entry = {
      tryLoc: locs[0]
    };
    1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal", delete record.arg, entry.completion = record;
  }

  function Context(tryLocsList) {
    this.tryEntries = [{
      tryLoc: "root"
    }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
  }

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) return iteratorMethod.call(iterable);
      if ("function" == typeof iterable.next) return iterable;

      if (!isNaN(iterable.length)) {
        var i = -1,
            next = function next() {
          for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;

          return next.value = undefined, next.done = !0, next;
        };

        return next.next = next;
      }
    }

    return {
      next: doneResult
    };
  }

  function doneResult() {
    return {
      value: undefined,
      done: !0
    };
  }

  return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) {
    var ctor = "function" == typeof genFun && genFun.constructor;
    return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
  }, exports.mark = function (genFun) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
  }, exports.awrap = function (arg) {
    return {
      __await: arg
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    void 0 === PromiseImpl && (PromiseImpl = Promise);
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
    return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () {
    return this;
  }), define(Gp, "toString", function () {
    return "[object Generator]";
  }), exports.keys = function (object) {
    var keys = [];

    for (var key in object) keys.push(key);

    return keys.reverse(), function next() {
      for (; keys.length;) {
        var key = keys.pop();
        if (key in object) return next.value = key, next.done = !1, next;
      }

      return next.done = !0, next;
    };
  }, exports.values = values, Context.prototype = {
    constructor: Context,
    reset: function (skipTempReset) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
    },
    stop: function () {
      this.done = !0;
      var rootRecord = this.tryEntries[0].completion;
      if ("throw" === rootRecord.type) throw rootRecord.arg;
      return this.rval;
    },
    dispatchException: function (exception) {
      if (this.done) throw exception;
      var context = this;

      function handle(loc, caught) {
        return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i],
            record = entry.completion;
        if ("root" === entry.tryLoc) return handle("end");

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc"),
              hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
          } else {
            if (!hasFinally) throw new Error("try statement without catch or finally");
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          }
        }
      }
    },
    abrupt: function (type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
      var record = finallyEntry ? finallyEntry.completion : {};
      return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
    },
    complete: function (record, afterLoc) {
      if ("throw" === record.type) throw record.arg;
      return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
    },
    finish: function (finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
      }
    },
    catch: function (tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;

          if ("throw" === record.type) {
            var thrown = record.arg;
            resetTryEntry(entry);
          }

          return thrown;
        }
      }

      throw new Error("illegal catch attempt");
    },
    delegateYield: function (iterable, resultName, nextLoc) {
      return this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
    }
  }, exports;
}

function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
}

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var currentScenesAllChunk = [];
/**
 * 向vnode中注入prop
 * @param {object} vnode
 * @param {object} props
 * @returns vnode
 */

var handleInjectPorpsAndEvents = function handleInjectPorpsAndEvents(vnode, props, ctx) {
  var currentFileName = props.currentFileName,
      taskNum = props.taskNum,
      ruleLayer = props.ruleLayer;
  var attrs = props.attrs,
      on = props.on;

  if (typeof attrs === 'string' || typeof on === 'string') {
    if (ctx) {
      attrs = eval(attrs).call(ctx, currentFileName, taskNum, ruleLayer);
    } else {
      attrs = eval(attrs)();
    }

    on = eval(on)(vnode, props);
  }

  try {
    var vnodeProps = vnode.componentOptions.propsData;
    var vnodeProps2 = vnode.data.attrs;
    var vnodeEvent = vnode.componentOptions.listeners;
    vnode.componentOptions.propsData = _objectSpread2(_objectSpread2({}, vnodeProps), attrs);
    vnode.data.attrs = _objectSpread2(_objectSpread2({}, vnodeProps2), attrs);
    vnode.componentOptions.listeners = _objectSpread2(_objectSpread2({}, vnodeEvent), on);
  } catch (error) {
    console.error('注入属性&事件失败');
    console.error(error);
  }

  return vnode;
};
/**
 * get chunk数据
 * @param {string} chunkName
 * @returns
 */

var getChunkJsonByName = function getChunkJsonByName(chunkName, requestID) {
  var uniquelyId = requestID || chunkName;
  var chunkJson = currentScenesAllChunk.filter(function (_ref2) {
    var name = _ref2.name;
    return name === uniquelyId;
  });

  if (chunkJson.length === 1) {
    return chunkJson[0];
  } else {
    Message({
      showClose: true,
      message: "\u5E03\u5C40json\u9519\u8BEF\uFF1Achunk ".concat(chunkName, "\u5B58\u5728\u91CD\u590D\u6216\u8005\u4E0D\u5B58\u5728"),
      type: 'error'
    });
    throw new Error("\u5E03\u5C40json\u9519\u8BEF\uFF1Achunk name\u5B58\u5728\u91CD\u590D\u6216\u8005\u4E0D\u5B58\u5728\u5F53\u524Dname!\uFF08chunkName\u540D\u79F0\uFF1A".concat(chunkName, "\uFF09"));
  }
};
/**
 * 仅组装chunk数据,回显和sp使用
 * @param {object} json
 */


var setFilds = function setFilds(json) {
  var type = json.type;

  if (type === 'chunk' || type === 'item') {
    var name = json.name,
        requestID = json.requestID;
    var chunkJson = getChunkJsonByName(name, requestID);
    json.fields = chunkJson.fields;
    json.options = Object.assign(json.options, (chunkJson === null || chunkJson === void 0 ? void 0 : chunkJson.options) || {});
    json.label = chunkJson.label;
    json.defaultValue = chunkJson.defaultValue;
  } else {
    json.children.forEach(function (nodeJson) {
      setFilds(nodeJson);
    });
  }
};
/**
 * 设置当前布局下的所有chunk
 * @param {array} arrChunk
 */

var setCurrentScenesAllChunk = function setCurrentScenesAllChunk(arrChunk) {
  currentScenesAllChunk = arrChunk;
};
/**
 * 获取玩法树相关chunk
 * @param {object} schema 玩法schema
 */

var getRelationChunk = function getRelationChunk(schema) {
  var getRelationChunk = function getRelationChunk(chunkName, type) {
    var resChunkData = [];

    var generator = function generator(schema) {
      if (schema.name === chunkName) {
        resChunkData.push(schema);
      } else {
        if (schema.children) {
          schema.children.forEach(function (child) {
            return generator(child);
          });
        }
      }
    };

    generator(schema); // 返回配置信息

    if (type === 'config') {
      return resChunkData.map(function (item) {
        return item.operations;
      });
    } // 返回option信息


    if (type === 'options') {
      return resChunkData.map(function (item) {
        return item.options;
      });
    }

    return resChunkData;
  };

  return getRelationChunk;
};
/**
 * 获取目标组件实例
 * @param {object} context
 * @returns
 */

var findComponentsDownward = function findComponentsDownward(context) {
  var currentComponentName = null;

  var generator = function generator(context) {
    return context === null || context === void 0 ? void 0 : context.$children.reduce(function (pre, child) {
      if (child.name === currentComponentName) return [].concat(_toConsumableArray(pre), [child]);else {
        if (child !== null && child !== void 0 && child.$children) {
          var foundChilds = generator(child);
          return [].concat(_toConsumableArray(pre), _toConsumableArray(foundChilds));
        } else {
          return pre;
        }
      }
    }, []);
  };

  return function (componentName) {
    if (!componentName) return null;
    currentComponentName = componentName;
    return generator(context);
  };
};
/**
 * 处理js真假问题
 * 仅undefined null false  才返回false,不考虑bigint
 * TODO 待考虑其他情况
 * @param {any} value
 */

var isTrue = function isTrue(value) {
  switch (Object.prototype.toString.call(value)) {
    case '[object Boolean]':
      return value;

    case '[object String]':
    case '[object Number]':
    case '[object Object]':
    case '[object Array]':
    case '[object Function]':
      return true;

    default:
      return false;
  }
};

/* eslint-disable no-undef */
/**
 * @file 包装el-select
 */

var legoSelect = {
  functional: true,
  render: function render(h, ctx) {
    var _ctx$props = ctx.props,
        schema = _ctx$props.schema,
        index = _ctx$props.index,
        _ctx$props$defaultVal = _ctx$props.defaultValueByConfig,
        defaultValueByConfig = _ctx$props$defaultVal === void 0 ? null : _ctx$props$defaultVal,
        _ctx$props$spAnalysis = _ctx$props.spAnalysisApp,
        spAnalysisApp = _ctx$props$spAnalysis === void 0 ? null : _ctx$props$spAnalysis,
        _ctx$props$fileName = _ctx$props.fileName,
        fileName = _ctx$props$fileName === void 0 ? '' : _ctx$props$fileName,
        currentFileParent = _ctx$props.currentFileParent,
        component = _ctx$props.component,
        defaultValueInitVal = _ctx$props.defaultValueInitVal;
    var options = schema.options;
    var ATOMIC_KEY = "".concat(fileName).concat(index); // handle options联动

    if (ATOMIC_KEY in spAnalysisApp.optionsInteraction) ; else {
      // 首次不存在时执行一次即可
      if (!Array.isArray(spAnalysisApp.optionsDataMap[ATOMIC_KEY])) {
        var isData = !(typeof options.data === 'string' && options.data.replace(/\s/g, '') === '[]');

        if (isData) {
          var flag = !Array.isArray(defaultValueByConfig) || defaultValueByConfig.length === 0;
          spAnalysisApp.optionsDataMap[ATOMIC_KEY] = (eval(options.data) || []).filter(function (option) {
            return flag ? option : defaultValueByConfig.includes(option.value);
          });
        } else {
          var dataSrc = (eval(options.dataSrc).bind(spAnalysisApp) || function () {
            return Promise.resolve([]);
          })();

          if (dataSrc instanceof Promise) {
            dataSrc.then(function (v) {
              Vue.set(spAnalysisApp.optionsDataMap, ATOMIC_KEY, v || []);
            });
          } else {
            Vue.set(spAnalysisApp.optionsDataMap, ATOMIC_KEY, dataSrc || []);
          }
        }
      }
    }

    var componentItems = spAnalysisApp.optionsDataMap[ATOMIC_KEY] || [];

    try {
      if (defaultValueInitVal) {
        !currentFileParent(spAnalysisApp.formData)[fileName] && Vue.set(currentFileParent(spAnalysisApp.formData), fileName, JSON.parse(defaultValueInitVal));
      } // 只针对订单里程/订单流水下拉框特殊处理


      if (componentItems.length && (fileName === 'orderDistanceOperator' || fileName === 'orderPriceOperator')) {
        !currentFileParent(spAnalysisApp.formData)[fileName] && Vue.set(currentFileParent(spAnalysisApp.formData), fileName, componentItems[0].value);
      }
    } catch (error) {
      !currentFileParent(spAnalysisApp.formData)[fileName] && Vue.set(currentFileParent(spAnalysisApp.formData), fileName, defaultValueInitVal);
    }

    var renderOptions = function renderOptions(data) {
      return data.map(function (option) {
        return h("el-option", {
          "key": option.value,
          "attrs": {
            "label": option.label,
            "value": option.value
          }
        });
      });
    };

    if (component === 'BLMBatchCitySelect') {
      if (spAnalysisApp.environment === 'query') {
        var data = spAnalysisApp.optionsDataMap[ATOMIC_KEY];
        var value = currentFileParent(spAnalysisApp.formData)[fileName];
        var currentData = data.filter(function (item) {
          return value.includes(item.value);
        });
        var currentLabelArr = currentData.map(function (item) {
          return item.label;
        });
        var codeText = '';

        if (currentLabelArr.length === 0) {
          codeText = codeText = value.join(',');
        } else {
          codeText = currentLabelArr.join(',');
        }

        return h("el-input", {
          "attrs": {
            "autosize": {
              minRows: 3
            },
            "value": codeText,
            "type": 'textarea'
          }
        });
      } else {
        return handleInjectPorpsAndEvents(h("BLMBatchCitySelect", {
          "attrs": {
            "value": currentFileParent(spAnalysisApp.formData)[fileName],
            "optionsData": spAnalysisApp.optionsDataMap[ATOMIC_KEY] || [],
            "size": 'medium'
          },
          "on": {
            "input": function input(val) {
              Vue.set(currentFileParent(spAnalysisApp.formData), fileName, val);
            },
            "change": ctx.listeners.blur
          }
        }), options, spAnalysisApp);
      }
    } else if (component === 'BLMSelectAndNestedList' || component === 'BLMSelectAndSearch') {
      return handleInjectPorpsAndEvents(h(component, {
        "class": 'crowdLabel',
        "attrs": {
          "value": currentFileParent(spAnalysisApp.formData)[fileName],
          "data": spAnalysisApp.optionsDataMap[ATOMIC_KEY] || []
        },
        "on": {
          "input": function input(val) {
            Vue.set(currentFileParent(spAnalysisApp.formData), fileName, val);
          },
          "change": ctx.listeners.blur
        }
      }), options, spAnalysisApp);
    } else {
      return handleInjectPorpsAndEvents(h("el-select", {
        "attrs": {
          "value": currentFileParent(spAnalysisApp.formData)[fileName]
        },
        "on": {
          "input": function input(val) {
            Vue.set(currentFileParent(spAnalysisApp.formData), fileName, val);
          }
        }
      }, [renderOptions(spAnalysisApp.optionsDataMap[ATOMIC_KEY] || [])]), options, spAnalysisApp);
    }
  }
};

/**
 * @file 包装el-radio
 */

var legoRadio = {
  functional: true,
  render: function render(h, ctx) {
    var _ctx$props = ctx.props,
        component = _ctx$props.component,
        schema = _ctx$props.schema,
        _ctx$props$defaultVal = _ctx$props.defaultValueByConfig,
        defaultValueByConfig = _ctx$props$defaultVal === void 0 ? null : _ctx$props$defaultVal,
        _ctx$props$spAnalysis = _ctx$props.spAnalysisApp,
        spAnalysisApp = _ctx$props$spAnalysis === void 0 ? null : _ctx$props$spAnalysis,
        _ctx$props$fileName = _ctx$props.fileName,
        fileName = _ctx$props$fileName === void 0 ? '' : _ctx$props$fileName,
        index = _ctx$props.index,
        currentFileParent = _ctx$props.currentFileParent;
    var options = schema.options;
    var ATOMIC_KEY = "".concat(fileName).concat(index);
    /**
     * 渲染子项
     * @param {any} data
     * @param {Boolean} 是否需要转换成component
     * @returns
     */

    var renderOptions = function renderOptions(data) {
      var component = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      // 允许空数组
      if (!data || !Array.isArray(eval(data))) {
        Message({
          showClose: true,
          message: '组件设计器error,请检查当前组件原子option是否配置data',
          type: 'error'
        });
        throw new Error('组件设计器error,请检查当前组件原子option是否配置data');
      }

      var finaSelectOptions = [];

      if (typeof data === 'string') {
        finaSelectOptions = eval(data);
      } // 处理全量数据


      if (defaultValueByConfig === 0 || defaultValueByConfig) {
        finaSelectOptions = finaSelectOptions.filter(function (option) {
          return Array.isArray(defaultValueByConfig) ? defaultValueByConfig.includes(option.value) : option.value === defaultValueByConfig;
        });
      }

      spAnalysisApp.optionsDataMap[ATOMIC_KEY] = finaSelectOptions;

      if (component) {
        return finaSelectOptions.map(function (option) {
          return h("el-radio", {
            "key": option.value,
            "attrs": {
              "label": option.value
            }
          }, [option.label]);
        });
      } else {
        return finaSelectOptions;
      }
    };

    var componentItems = renderOptions(options === null || options === void 0 ? void 0 : options.data, false) || [];
    var currentAllOptionValueArr = componentItems.map(function (item) {
      return item.value;
    }); // 不匹配的情况

    if (isTrue(currentFileParent(spAnalysisApp.formData)[fileName]) && !currentAllOptionValueArr.includes(currentFileParent(spAnalysisApp.formData)[fileName])) {
      Vue.set(currentFileParent(spAnalysisApp.formData), fileName, currentAllOptionValueArr[0]);
    } // 没有默认值的情况


    if (!isTrue(currentFileParent(spAnalysisApp.formData)[fileName])) {
      Vue.set(currentFileParent(spAnalysisApp.formData), fileName, currentAllOptionValueArr[0]);
    } // 皮肤组件


    if (component === 'BLMRadioGroup') {
      // eslint-disable-next-line no-undef
      return handleInjectPorpsAndEvents(h("BLMRadioGroup", {
        "attrs": {
          "value": currentFileParent(spAnalysisApp.formData)[fileName],
          "data": componentItems
        },
        "on": {
          "input": function input(val) {
            Vue.set(currentFileParent(spAnalysisApp.formData), fileName, val);
          }
        }
      }), options);
    }

    return handleInjectPorpsAndEvents(h("el-radio-group", {
      "attrs": {
        "value": currentFileParent(spAnalysisApp.formData)[fileName]
      },
      "on": {
        "input": function input(val) {
          Vue.set(currentFileParent(spAnalysisApp.formData), fileName, val);
        },
        "change": function change() {
          ctx.listeners.blur();
        }
      }
    }, [renderOptions(options === null || options === void 0 ? void 0 : options.data)]), options, spAnalysisApp);
  }
};

/**
 * @file 包装el-checkbox
 */

var legoCheckbox = {
  functional: true,
  render: function render(h, ctx) {
    var _ctx$props = ctx.props,
        schema = _ctx$props.schema,
        _ctx$props$defaultVal = _ctx$props.defaultValueByConfig,
        defaultValueByConfig = _ctx$props$defaultVal === void 0 ? null : _ctx$props$defaultVal,
        index = _ctx$props.index,
        _ctx$props$spAnalysis = _ctx$props.spAnalysisApp,
        spAnalysisApp = _ctx$props$spAnalysis === void 0 ? null : _ctx$props$spAnalysis,
        _ctx$props$fileName = _ctx$props.fileName,
        fileName = _ctx$props$fileName === void 0 ? '' : _ctx$props$fileName,
        currentFileParent = _ctx$props.currentFileParent,
        defaultValueInitVal = _ctx$props.defaultValueInitVal;
    var options = schema.options;
    var ATOMIC_KEY = "".concat(fileName).concat(index);
    /**
     * 渲染子项
     * @param {any} data
     * @returns
     */

    var handleData = function handleData(data) {
      // 允许空数组
      if (!data || !Array.isArray(eval(data))) {
        Message({
          showClose: true,
          message: '组件设计器error,请检查当前组件原子option是否配置data',
          type: 'error'
        });
        throw new Error('组件设计器error,请检查当前组件原子option是否配置data1');
      }

      var finaSelectOptions = data;

      if (typeof data === 'string') {
        finaSelectOptions = eval(data);
      }

      if (!Array.isArray(finaSelectOptions)) {
        throw new Error('原子checkbox枚举解析错误，请检查');
      } // 处理全量数据 [maximumRewardLimitFe 是一个特例，奖励上限]


      if (defaultValueByConfig && fileName !== 'maximumRewardLimitFe') {
        if (!Array.isArray(defaultValueByConfig)) {
          throw new Error('原子checkbox枚举解析错误，请检查option的数据格式');
        }

        finaSelectOptions = finaSelectOptions.filter(function (option) {
          return defaultValueByConfig.includes(option.value);
        });
      } // 特殊逻辑，拼单（最高奖励上限组件）
      // TODO 多任务后改造


      var match = spAnalysisApp.specialOption.filter(function (item) {
        return item.relationField === fileName;
      });

      if (match.length > 0) {
        finaSelectOptions = finaSelectOptions.filter(function (item) {
          return match[0].replaceOption.includes(item.value);
        });
      }

      spAnalysisApp.optionsDataMap[ATOMIC_KEY] = finaSelectOptions;
      return finaSelectOptions;
    };

    var componentItems = handleData(options === null || options === void 0 ? void 0 : options.data) || [];
    var legoValueInitVal = []; // 默认值

    try {
      legoValueInitVal = eval(defaultValueInitVal) || [];
    } catch (error) {
      legoValueInitVal = [];
    }

    var currentAllOptionValueArr = componentItems.map(function (item) {
      return item.value;
    });
    var finaAllOptionValueArr = legoValueInitVal.filter(function (item) {
      return currentAllOptionValueArr.includes(item);
    }); // 有默认值优先默认值

    if (finaAllOptionValueArr.length > 0) {
      if (currentFileParent(spAnalysisApp.formData)[fileName].filter(function (item) {
        return !currentAllOptionValueArr.includes(item);
      }).length > 0) {
        Vue.set(currentFileParent(spAnalysisApp.formData), fileName, finaAllOptionValueArr);
      }
    } else {
      if (!isTrue(currentFileParent(spAnalysisApp.formData)[fileName])) {
        Vue.set(currentFileParent(spAnalysisApp.formData), fileName, [currentAllOptionValueArr[0]]);
      }
    }

    return handleInjectPorpsAndEvents( // eslint-disable-next-line no-undef
    h("BLM-checkbox-group", {
      "attrs": {
        "value": currentFileParent(spAnalysisApp.formData)[fileName] || [],
        "data": handleData(options === null || options === void 0 ? void 0 : options.data) || []
      },
      "on": {
        "input": function input(val) {
          Vue.set(currentFileParent(spAnalysisApp.formData), fileName, val);
        },
        "change": function change(val) {
          ctx.listeners.blur();
        }
      }
    }), options, spAnalysisApp);
  }
};

/**
 * @file 原子组件map表【伪map表】
 */

var AtomicComponent = {
  functional: true,
  inject: {
    spAnalysisApp: {
      "default": {}
    }
  },
  render: function render(h, renderContext) {
    var _Atomic$data;

    var _renderContext$props = renderContext.props,
        atomAttrs = _renderContext$props.atomAttrs,
        component = _renderContext$props.component,
        schema = _renderContext$props.schema,
        configValue = _renderContext$props.configValue,
        index = _renderContext$props.index,
        fileName = _renderContext$props.fileName,
        platform = _renderContext$props.platform,
        _renderContext$props$ = _renderContext$props.validate,
        validate = _renderContext$props$ === void 0 ? function () {} : _renderContext$props$,
        fileTag = _renderContext$props.fileTag,
        ruleLayer = _renderContext$props.ruleLayer,
        newSuffix = _renderContext$props.newSuffix,
        injections = renderContext.injections,
        parent = renderContext.parent;
    var defaultValueByConfig = configValue.option; // 取出哈勃配置option的数据

    var options = renderContext.props.options;
    var defaultValueInitVal = schema.defaultValue;
    var spAnalysisApp = injections.spAnalysisApp;
    var props = {};
    var describe = null;
    var warning = ''; // 防配错警告信息
    // 原子描述

    props = atomAttrs;

    if (typeof props.describe === 'string') {
      describe = props.describe;
    }

    if (typeof props.describe === 'function') {
      describe = props.describe.call(spAnalysisApp);
    }

    var cloneFileName = fileName;
    var suffix = props.suffix || '';
    var ATOMIC_KEY = "".concat(cloneFileName).concat(index); // 扩展组件options

    options = _objectSpread2(_objectSpread2({}, options), {}, {
      taskNum: fileTag ? Number(fileTag) : fileTag,
      ruleLayer: ruleLayer ? Number(ruleLayer) : ruleLayer
    }); // 需要替换后缀

    if (newSuffix) {
      suffix = newSuffix;
    }

    try {
      if (platform === 'sp' && !(ATOMIC_KEY in spAnalysisApp.atomicInteraction)) {
        var _schema$options;

        var interaction = eval(((_schema$options = schema.options) === null || _schema$options === void 0 ? void 0 : _schema$options.interaction) || function () {}).call(spAnalysisApp);

        if (typeof (interaction === null || interaction === void 0 ? void 0 : interaction.options) === 'function') {
          // 存联动关系
          Vue.set(spAnalysisApp.optionsInteraction, ATOMIC_KEY, {
            options: interaction.options
          }); // 初始化options数据

          Promise.resolve(interaction.options(spAnalysisApp.request, spAnalysisApp.formData)).then(function (res) {
            Vue.set(spAnalysisApp.optionsDataMap, ATOMIC_KEY, res || []);
          });
        } // 原子存在联动


        typeof (interaction === null || interaction === void 0 ? void 0 : interaction.display) === 'function' && Vue.set(spAnalysisApp.atomicInteraction, ATOMIC_KEY, {
          visible: interaction.display.call(spAnalysisApp, spAnalysisApp.formData),
          display: interaction.display
        });
      }
    } catch (error) {
      console.error(schema, '交互代码配置错误，请自行检查');
    }
    /**
     *  设置原子一些样式
     */


    var setWidth = function setWidth() {
      var _props = props,
          width = _props.width;

      if (width) {
        return {
          width: width
        };
      } else {
        return {};
      }
    };
    /**
     * 设置当前字段的parent path
     * @param {object} object
     */


    var currentFileParent = function currentFileParent(object) {
      if (fileTag) {
        if (ruleLayer) {
          // 流水和固定金额需要切换字段
          if (cloneFileName === 'rewardPerOrderMoney') {
            var target = spAnalysisApp.specialField.filter(function (item) {
              return item.relationField === 'rewardPerOrderMoney';
            });

            if (target.length > 0) {
              cloneFileName = target[0].replace;
              options = _objectSpread2(_objectSpread2({}, options), {}, {
                currentFileName: target[0].replace
              });
            }
          } // 流水和固定金额需要切换字段


          if (cloneFileName === 'rewardPerOrderRange') {
            var _target = spAnalysisApp.specialField.filter(function (item) {
              return item.relationField === 'rewardPerOrderRange';
            });

            if (_target.length > 0) {
              cloneFileName = _target[0].replace;
              options = _objectSpread2(_objectSpread2({}, options), {}, {
                currentFileName: _target[0].replace
              });
            }
          }

          return _.get(object, "taskList[".concat(Number(fileTag), "].awardRules[").concat(Number(ruleLayer), "]"));
        } else {
          // ! 兼容一阶段最高奖励上限
          // TODO 优化代码
          if (cloneFileName === 'tagMaximumLimit') {
            var _target2 = spAnalysisApp.specialField.filter(function (item) {
              return item.relationField === 'tagMaximumLimit';
            });

            if (_target2.length > 0) {
              cloneFileName = _target2[0].replace;
              options = _objectSpread2(_objectSpread2({}, options), {}, {
                currentFileName: _target2[0].replace
              });
            }
          }

          return _.get(object, "taskList[".concat(Number(fileTag), "]"));
        }
      } else {
        return object;
      }
    }; // 设置字段默认值
    // 考虑什么时候可以设置默认值，


    try {
      if (defaultValueInitVal) {
        !isTrue(currentFileParent(spAnalysisApp.formData)[fileName]) && Vue.set(currentFileParent(spAnalysisApp.formData), cloneFileName, JSON.parse(defaultValueInitVal));
      } // 解析warning条件


      if (typeof props.warning === 'string' && spAnalysisApp.$route.query['environment'] !== 'query') {
        var ruleValue = spAnalysisApp === null || spAnalysisApp === void 0 ? void 0 : spAnalysisApp.formData['taskList'][options.taskNum]['awardRules'][options.ruleLayer];
        currentFileParent(spAnalysisApp.formData)[cloneFileName]; // eslint-disable-next-line no-unused-vars

        var selfValue = ruleValue[cloneFileName];
        warning = eval("`".concat(props.warning, "`"));
      }
    } catch (error) {
      !isTrue(currentFileParent(spAnalysisApp.formData)[fileName]) && Vue.set(currentFileParent(spAnalysisApp.formData), cloneFileName, defaultValueInitVal);
    }
    /**
     * 具体渲染逻辑
     * todo 梳理组件进行合并
     * @returns vnode
     */


    var renderAtomic = function renderAtomic() {
      var _options;

      if (platform === 'sp') {
        var _spAnalysisApp$atomic, _spAnalysisApp$atomic2;

        var flag = (_spAnalysisApp$atomic = spAnalysisApp.atomicInteraction) === null || _spAnalysisApp$atomic === void 0 ? void 0 : (_spAnalysisApp$atomic2 = _spAnalysisApp$atomic[ATOMIC_KEY]) === null || _spAnalysisApp$atomic2 === void 0 ? void 0 : _spAnalysisApp$atomic2.visible;
        var newArr = new Set(parent.noNeedCheck);

        if (typeof flag === 'boolean' ? flag : true) {
          // 再去查看是否必填
          parent.checkIsRequired(); // 校验当前原子

          if (newArr.has(fileName)) {
            newArr["delete"](fileName);
            parent.noNeedCheck = _toConsumableArray(newArr);
          }
        } else {
          // 不校验当前原子
          newArr.add(fileName);
          parent.noNeedCheck = _toConsumableArray(newArr);
          return;
        }
      }

      switch (component) {
        case 'el-input':
          return h("div", {
            "class": 'input-content'
          }, [" ", props.prefix && h("span", {
            "class": 'prefix'
          }, [props.prefix]), handleInjectPorpsAndEvents(h("el-input", {
            "attrs": {
              "value": currentFileParent(spAnalysisApp.formData)[cloneFileName]
            },
            "on": {
              "blur": function blur() {
                validate('blur');
              },
              "input": function input(val) {
                Vue.set(currentFileParent(spAnalysisApp.formData), cloneFileName, val);
              }
            },
            "style": _objectSpread2({}, setWidth())
          }), options, spAnalysisApp), suffix && h("span", {
            "class": 'suffix'
          }, [suffix])]);

        case 'el-textarea':
          return handleInjectPorpsAndEvents(h("el-input", {
            "attrs": {
              "value": currentFileParent(spAnalysisApp.formData)[cloneFileName],
              "type": 'textarea'
            },
            "on": {
              "input": function input(val) {
                Vue.set(currentFileParent(spAnalysisApp.formData), cloneFileName, val);
              },
              "blur": function blur() {
                return validate('blur');
              }
            }
          }), options, spAnalysisApp);

        case 'el-checkbox-group':
          return h(legoCheckbox, {
            "attrs": {
              "defaultValueInitVal": defaultValueInitVal,
              "index": index,
              "fileTag": fileTag,
              "currentFileParent": currentFileParent,
              "defaultValueByConfig": defaultValueByConfig,
              "spAnalysisApp": spAnalysisApp,
              "fileName": cloneFileName,
              "schema": schema,
              "platform": platform
            },
            "on": {
              "blur": function blur() {
                validate('blur');
              }
            }
          });

        case 'el-radio-group':
        case 'BLMRadioGroup':
          return h("div", [h(legoRadio, {
            "attrs": {
              "component": component,
              "defaultValueInitVal": defaultValueInitVal,
              "fileTag": fileTag,
              "index": index,
              "currentFileParent": currentFileParent,
              "defaultValueByConfig": defaultValueByConfig,
              "spAnalysisApp": spAnalysisApp,
              "platform": platform,
              "fileName": cloneFileName,
              "schema": schema
            },
            "on": {
              "blur": function blur() {
                validate('blur');
              }
            }
          })]);

        case 'el-select':
        case 'BLMBatchCitySelect':
        case 'BLMSelectAndNestedList':
        case 'BLMSelectAndSearch':
          return h(legoSelect, {
            "attrs": {
              "defaultValueInitVal": defaultValueInitVal,
              "fileTag": fileTag,
              "currentFileParent": currentFileParent,
              "index": index,
              "component": component,
              "defaultValueByConfig": defaultValueByConfig,
              "spAnalysisApp": spAnalysisApp,
              "platform": platform,
              "fileName": cloneFileName,
              "schema": schema
            },
            "on": {
              "blur": function blur() {
                return validate('blur');
              }
            }
          });

        case 'el-time-select':
          return handleInjectPorpsAndEvents(h("el-time-select", {
            "attrs": {
              "value": currentFileParent(spAnalysisApp.formData)[cloneFileName]
            },
            "on": {
              "input": function input(val) {
                Vue.set(currentFileParent(spAnalysisApp.formData), cloneFileName, val);
              },
              "blur": function blur() {
                return validate('blur');
              }
            }
          }), options, spAnalysisApp);

        case 'el-date-picker':
          return handleInjectPorpsAndEvents(h("el-date-picker", {
            "attrs": {
              "value": currentFileParent(spAnalysisApp.formData)[cloneFileName]
            },
            "on": {
              "input": function input(val) {
                Vue.set(currentFileParent(spAnalysisApp.formData), cloneFileName, val);
              },
              "change": function change() {
                validate('blur');
              }
            }
          }), options, spAnalysisApp);

        case 'el-date-range':
          return h("div", {
            "class": 'lego-date-range-content'
          }, [handleInjectPorpsAndEvents(h("el-date-picker", {
            "attrs": {
              "value": currentFileParent(spAnalysisApp.formData)[cloneFileName]
            },
            "on": {
              "input": function input(val) {
                Vue.set(currentFileParent(spAnalysisApp.formData), cloneFileName, val);
              },
              "change": function change() {
                return validate('blur');
              }
            }
          }), options, spAnalysisApp)]);

        case 'BLMTimePickerListLimit':
          return handleInjectPorpsAndEvents(h("BLMTimePickerListLimit", {
            "attrs": {
              "data": eval((_options = options) === null || _options === void 0 ? void 0 : _options.data).filter(function (item) {
                return defaultValueByConfig.includes(item.value);
              }) || [],
              "value": currentFileParent(spAnalysisApp.formData)[cloneFileName] || []
            },
            "on": {
              "input": function input(val) {
                Vue.set(currentFileParent(spAnalysisApp.formData), cloneFileName, val);
              },
              "change": function change() {
                validate('change');
              },
              "blur": function blur() {
                return validate('blur');
              }
            }
          }), options, spAnalysisApp);

        case 'el-input-number':
          return h("div", {
            "class": 'input-content'
          }, [" ", props.prefix && h("span", {
            "class": 'prefix'
          }, [props.prefix]), handleInjectPorpsAndEvents(h("el-input-number", {
            "attrs": {
              "value": currentFileParent(spAnalysisApp.formData)[cloneFileName]
            },
            "on": {
              "input": function input(val) {
                Vue.set(currentFileParent(spAnalysisApp.formData), cloneFileName, val);
              },
              "blur": function blur() {
                return validate('blur');
              }
            }
          }), options, spAnalysisApp), suffix && h("span", {
            "class": 'suffix'
          }, [suffix]), warning && h("span", {
            "style": {
              color: 'red',
              marginLeft: '5px',
              fontSize: '12px'
            }
          }, [warning])]);

        case 'span':
          return h("span", {
            "style": {
              marginRight: '6px'
            }
          }, [props.text, " "]);

        default:
          return handleInjectPorpsAndEvents(h(component, {
            "attrs": {
              "value": currentFileParent(spAnalysisApp.formData)[cloneFileName] || []
            },
            "on": {
              "input": function input(val) {
                Vue.set(currentFileParent(spAnalysisApp.formData), cloneFileName, val);
              },
              "blur": function blur() {
                validate('blur');
              }
            }
          }), options, spAnalysisApp);
      }
    };

    var Atomic = renderAtomic();
    spAnalysisApp.attrsMap[cloneFileName] = (Atomic === null || Atomic === void 0 ? void 0 : (_Atomic$data = Atomic.data) === null || _Atomic$data === void 0 ? void 0 : _Atomic$data.attrs) || {};
    return [h("div", {
      "class": 'atomic',
      "style": {
        marginBottom: Atomic ? '16px' : '0'
      }
    }, [Atomic]), describe ? h("p", {
      "class": 'describe',
      "domProps": {
        "innerHTML": describe
      }
    }) : ''];
  }
};

var ValidatorComp = {
  inject: {
    spAnalysisApp: {
      "default": {}
    }
  },
  props: ['fileTag', 'platform', 'chunkIndex', 'fileName', 'component', 'schema', 'configValue', 'options', 'fieldId', 'ruleLayer', 'index', 'chunkUnique', 'newSuffix', 'ruleItemTag'],
  data: function data() {
    return {
      validateState: '',
      validateMessage: '',
      currentRule: [],
      finalFileName: '',
      ruleFileName: '',
      name: this.fileName,
      finlName: '',
      flag: true,
      atomAttrs: {},
      needCheck: true
    };
  },
  created: function created() {
    var _this$schema, _this$schema$options;

    this.name = this.fileName;
    this.finlName = this.fileName; // 原子最终字段

    this.noNeedCheck = []; // TODO 待优化 需要替换字段 拼单奖

    if (this.finlName === 'rewardPerOrderMoney') {
      var target = this.spAnalysisApp.specialField.filter(function (item) {
        return item.relationField === 'rewardPerOrderMoney';
      });

      if (target.length > 0) {
        this.finlName = target[0].replace;
      }
    } // TODO 待优化 需要替换字段 拼单奖区间


    if (this.fileName === 'rewardPerOrderRange') {
      var _target = this.spAnalysisApp.specialField.filter(function (item) {
        return item.relationField === 'rewardPerOrderRange';
      });

      if (_target.length > 0) {
        this.finlName = _target[0].replace;
      }
    } // !需要替换字段 每单奖励 【一阶段兼容】


    if (this.fileName === 'tagMaximumLimit') {
      var _target2 = this.spAnalysisApp.specialField.filter(function (item) {
        return item.relationField === 'tagMaximumLimit';
      });

      if (_target2.length > 0) {
        this.finlName = _target2[0].replace;
      }
    }

    var attrs = this.options.attrs;
    this.atomAttrs = eval(attrs).call(this.spAnalysisApp, this.finlName, this.fileTag ? Number(this.fileTag) : this.fileTag, this.ruleLayer ? Number(this.ruleLayer) : this.ruleLayer);

    if ((_this$schema = this.schema) !== null && _this$schema !== void 0 && (_this$schema$options = _this$schema.options) !== null && _this$schema$options !== void 0 && _this$schema$options.rules) {
      this.getRules();
    }
  },
  mounted: function mounted() {
    var _this$schema2, _this$schema2$options;

    if ((_this$schema2 = this.schema) !== null && _this$schema2 !== void 0 && (_this$schema2$options = _this$schema2.options) !== null && _this$schema2$options !== void 0 && _this$schema2$options.rules) {
      if (!this.spAnalysisApp.fields[this.spAnalysisApp.currentStep]) {
        Vue.set(this.spAnalysisApp.fields, this.spAnalysisApp.currentStep, []);
      } // 收集一下rule中的组件


      if (this.ruleLayer) {
        if (!this.spRuleApp.ruleChunkValidator[this.ruleLayer]) {
          Vue.set(this.spRuleApp.ruleChunkValidator, this.ruleLayer, []);
        }

        this.spRuleApp.ruleChunkValidator[this.ruleLayer].push(this);
      } else {
        this.spAnalysisApp.fields[this.spAnalysisApp.currentStep].push(this);
      }
    }
  },
  methods: {
    /**
     * 获取全部rule
     */
    getRules: function getRules() {
      try {
        this.currentRule = eval(this.options.rules).apply(this.spAnalysisApp, [this.spAnalysisApp.formData, this.configValue, this, {
          taskNum: this.fileTag ? Number(this.fileTag) : this.fileTag,
          ruleLayer: this.ruleLayer ? Number(this.ruleLayer) : this.ruleLayer,
          fileName: this.finlName
        }]);
      } catch (error) {
        throw new Error('rule:配置错误');
      }
    },

    /**
     * 获取非顶层字段
     * @param {object} object
     * @returns
     */
    currentFileParent: function currentFileParent(object, customRuleLayer) {
      if (this.fileTag) {
        if (this.ruleLayer) {
          return _.get(object, "taskList[".concat(Number(this.fileTag), "].awardRules[").concat(Number(customRuleLayer === 0 || customRuleLayer ? customRuleLayer : this.ruleLayer), "][").concat(this.finlName, "]"));
        } else {
          return _.get(object, "taskList[".concat(Number(this.fileTag), "][").concat(this.finlName, "]"));
        }
      }
    },

    /**
     * 检查是否有必填属性
     * @param {array} rule
     */
    checkIsRequired: function checkIsRequired() {
      var rule = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.currentRule;

      if (this.flag) {
        var accordWith = rule.filter(function (ruleItem) {
          return ruleItem === null || ruleItem === void 0 ? void 0 : ruleItem.required;
        });

        if (accordWith.length > 0) {
          // 通知其父组件
          this.$emit('required', {
            chunkUnique: this.chunkUnique,
            isRequired: true
          });
        } else {
          this.$emit('required', {
            chunkUnique: this.chunkUnique,
            isRequired: false
          });
        }

        this.flag = false;
      }
    },

    /**
     * 获取符合条件的rule
     * @param {string} trigger
     */
    getFilteredRule: function getFilteredRule(trigger) {
      var rules = this.currentRule || [];

      if (Array.isArray(rules)) {
        return rules.filter(function (rule) {
          return !trigger || rule.trigger === trigger;
        });
      } else {
        return [];
      }
    },

    /**
     * 校验
     * @param {string} trigger input or change
     */
    validate: function validate(trigger, customRule, currentVal, customRuleLayer) {
      var _this = this;

      // 不需要再进行校验的原子实例
      if (this.noNeedCheck.includes(this.finlName)) {
        return Promise.resolve().then(function () {
          return 'success';
        });
      }

      var rules = null;

      if (customRule) {
        rules = [].concat(_toConsumableArray(customRule), _toConsumableArray(this.getFilteredRule()));
      } else {
        rules = this.getFilteredRule(trigger);
      }

      if (!rules || rules.length === 0) return true;
      this.validateState = 'validating';
      var descriptor = {};
      var model = {};
      descriptor[this.finlName] = rules;

      if (currentVal) {
        model[this.finlName] = currentVal;
      } else {
        model[this.finlName] = this.fileTag ? this.currentFileParent(this.spAnalysisApp.formData, customRuleLayer) : this.spAnalysisApp.formData[this.finlName];
      }

      var validator = new AsyncValidator(descriptor);
      validator.validate(model, {
        firstFields: true
      }, function (errors) {
        _this.validateState = !errors ? 'success' : 'error';
        _this.validateMessage = errors ? errors[0].message : '';
      });
      return Promise.resolve().then(function () {
        return _this.validateState;
      });
    }
  },
  render: function render(h) {
    var _this$spAnalysisApp$a, _this$spAnalysisApp$a2;

    var visibleAtomic = (_this$spAnalysisApp$a = this.spAnalysisApp.atomicInteraction) === null || _this$spAnalysisApp$a === void 0 ? void 0 : (_this$spAnalysisApp$a2 = _this$spAnalysisApp$a[this.finlName + this.index]) === null || _this$spAnalysisApp$a2 === void 0 ? void 0 : _this$spAnalysisApp$a2.visible;
    return h("div", {
      "style": {
        display: this.atomAttrs.inline ? 'inline-block' : 'block'
      }
    }, [h(AtomicComponent, {
      "attrs": {
        "atomAttrs": this.atomAttrs,
        "chunkIndex": this.chunkIndex,
        "index": this.index,
        "ruleLayer": this.ruleLayer || false,
        "fileTag": this.fileTag || false,
        "platform": this.platform,
        "fileName": this.fileName,
        "component": this.component,
        "options": this.options,
        "schema": this.schema,
        "configValue": this.configValue,
        "validate": this.validate,
        "newSuffix": this.newSuffix
      },
      "key": this.fieldId
    }), h("div", {
      "style": {
        zIndex: this.index,
        backgroundColor: '#fff'
      },
      "class": 'el-form-item__error',
      "directives": [{
        name: "show",
        value: !!this.validateMessage && typeof visibleAtomic === 'boolean' ? visibleAtomic : true
      }]
    }, [this.validateMessage])]);
  }
};

var RenderChunk = {
  inject: {
    spAnalysisApp: {
      "default": {}
    }
  },
  props: ['schema', 'index', 'platform', 'ruleLayer', 'fileTag', 'ruleItemTag'],
  data: function data() {
    return {
      state: {},
      update: {
        index: 1
      }
    };
  },
  computed: {
    chunk_id: function chunk_id() {
      return "".concat(this.schema.parentId).concat(this.schema.nodeCompId).concat(this.schema.name).concat(this.fileTag).concat(this.ruleLayer);
    }
  },
  created: function created() {
    this.initchunkInteraction(this.spAnalysisApp, this.chunk_id, this.fileTag, this.ruleLayer);

    if (this.chunk_id in this.spAnalysisApp.chunkInteraction) {
      this.updateTaskAndRuleLayer(this.spAnalysisApp, this.chunk_id, this.fileTag, this.ruleLayer);
    }
  },
  methods: {
    /**
     * 初始化chunk联动
     * @param {object} spAnalysisApp 根组件
     * @param {string} chunk_id chunk唯一标识
     * @param {string} fileTag 当前任务数
     * @param {string} ruleLayer 层级数
     */
    initchunkInteraction: function initchunkInteraction(spAnalysisApp, chunk_id, fileTag, ruleLayer) {
      if (!(chunk_id in spAnalysisApp.chunkInteraction)) {
        var interaction = eval(this.schema.options.interaction || function () {}).call(spAnalysisApp) || {};
        typeof interaction.display === 'function' && Vue.set(spAnalysisApp.chunkInteraction, chunk_id, {
          visible: interaction.display.call(spAnalysisApp, spAnalysisApp.formData),
          display: interaction.display,
          tag: {
            taskNum: fileTag ? Number(fileTag) : fileTag,
            ruleLayer: ruleLayer ? Number(ruleLayer) : ruleLayer
          }
        });
      }
    },

    /**
     * 更新当前chunk的所属任务数&层级数
     * @param {object} spAnalysisApp
     * @param {string} fileTag
     * @param {string} ruleLayer
     */
    updateTaskAndRuleLayer: function updateTaskAndRuleLayer(spAnalysisApp, chunk_id, fileTag, ruleLayer) {
      if (spAnalysisApp.chunkInteraction[chunk_id].tag.taskNum !== fileTag ? Number(fileTag) : fileTag) {
        spAnalysisApp.chunkInteraction[chunk_id].tag.taskNum = fileTag ? Number(fileTag) : fileTag;
      }

      if (spAnalysisApp.chunkInteraction[chunk_id].tag.ruleLayer !== ruleLayer ? Number(ruleLayer) : ruleLayer) {
        spAnalysisApp.chunkInteraction[chunk_id].tag.ruleLayer = ruleLayer ? Number(ruleLayer) : ruleLayer;
      }
    },

    /**
     * 开始渲染
     * @param {object} schema
     * @returns
     */
    startRender: function startRender(schema) {
      var h = this.$createElement;
      var fields = schema.fields,
          parentId = schema.parentId,
          nodeCompId = schema.nodeCompId,
          replaceSuffix = schema.replaceSuffix;
      return fields && h("section", {
        "class": 'lego-form-content'
      }, [this.renderChunkChildren(fields, parentId + nodeCompId, replaceSuffix), schema.options.description ? h("p", {
        "class": 'desc'
      }, [schema.options.description || '']) : '']);
    },

    /**
     * 渲染chunk孩子
     * @param {array} fields
     * @param {string} chunkUnique
     * @param {object} replaceSuffix
     * @returns
     */
    renderChunkChildren: function renderChunkChildren(fields, chunkUnique, replaceSuffix) {
      var _this = this;

      return fields.map(function (field, index) {
        return _this.renderAtomicComponent(field, index, chunkUnique, replaceSuffix);
      });
    },

    /**
     * 渲染具体原子
     * @param {object} field
     * @param {number} index
     * @param {string} chunkUnique
     * @param {object} replaceSuffix
     * @returns
     */
    renderAtomicComponent: function renderAtomicComponent(field, index, chunkUnique, replaceSuffix) {
      var _this2 = this;

      var h = this.$createElement;
      var component = field.component,
          options = field.options,
          fieldId = field.field;
      var uniqueName = this.spAnalysisApp.filedMap.filter(function (item) {
        return item.id === Number(fieldId);
      })[0].uniqueName;
      var configValue = {};
      var newSuffix = '';

      if (this.schema.operations && this.schema.operations[uniqueName]) {
        configValue = this.schema.operations[uniqueName];
        Vue.set(this.spAnalysisApp.configMap, uniqueName, configValue);
      }

      if (replaceSuffix && replaceSuffix.target === uniqueName) {
        newSuffix = replaceSuffix.newSuffix;
      }

      var currentTaskNum = null; // 如在任务中，属于第几个任务

      if (this.schema.parentField === 0 || this.schema.parentField) {
        currentTaskNum = String(this.schema.parentField);
      } else {
        currentTaskNum = false;
      }

      return h(ValidatorComp, {
        "attrs": {
          "ruleItemTag": this.ruleItemTag,
          "newSuffix": newSuffix,
          "chunkUnique": chunkUnique,
          "index": index,
          "ruleLayer": this.ruleLayer,
          "fileTag": this.ruleLayer ? this.fileTag : currentTaskNum,
          "platform": this.platform,
          "fileName": uniqueName,
          "component": component,
          "options": options,
          "schema": field,
          "configValue": configValue
        },
        "on": {
          "required": function required(_ref) {
            var chunkUniqueVal = _ref.chunkUnique,
                isRequired = _ref.isRequired;
            Vue.set(_this2.state, chunkUniqueVal, isRequired);
            _this2.update.index = _this2.update.index + 1;
          }
        },
        "key": fieldId
      });
    }
  },
  render: function render(h) {
    var _this$spAnalysisApp$c, _this$spAnalysisApp$c2;

    var flag = (_this$spAnalysisApp$c = this.spAnalysisApp.chunkInteraction) === null || _this$spAnalysisApp$c === void 0 ? void 0 : (_this$spAnalysisApp$c2 = _this$spAnalysisApp$c[this.chunk_id]) === null || _this$spAnalysisApp$c2 === void 0 ? void 0 : _this$spAnalysisApp$c2.visible;
    if (!(typeof flag === 'boolean' ? flag : true)) return h("div");
    var _this$schema = this.schema,
        label = _this$schema.label,
        parentId = _this$schema.parentId,
        nodeCompId = _this$schema.nodeCompId,
        name = _this$schema.name;
    return h("div", {
      "class": 'lego-form-item'
    }, [this.spAnalysisApp.openEditState && !this.spAnalysisApp.editableChunkArr.includes(name) && h("div", {
      "class": 'cover'
    }), h("div", {
      "attrs": {
        "id": 'lego-form-seize'
      },
      "class": this.update.index
    }), h("el-form-item", {
      "class": this.state && this.state[parentId + nodeCompId] ? 'chunk1' : 'chunk2',
      "attrs": {
        "label": label,
        "id": this.index
      }
    }, [this.startRender(this.schema)])]);
  }
};

/**
 * @file 渲染task
 * todo 一期不做实现，待优化样式
 */

var RenderTabs = {
  inject: {
    spAnalysisApp: {
      "default": {}
    }
  },
  props: {
    schema: {
      type: Object,
      "default": function _default() {}
    },
    platform: {
      type: String,
      "default": function _default() {
        return 'hubble';
      }
    }
  },
  created: function created() {
    var _this = this;

    // 设置主task
    !this.spAnalysisApp.formData.taskList && Vue.set(this.spAnalysisApp.formData, 'taskList', []); // 设置多任务

    this.schema.children.forEach(function (child, i) {
      !_this.spAnalysisApp.formData.taskList[i] && Vue.set(_this.spAnalysisApp.formData.taskList, i, {
        taskId: i + 1
      });
    });
  },
  methods: {
    /**
     * 渲染tasks
     * @param {object} schema
     */
    renderTabPane: function renderTabPane(schema) {
      var _this2 = this;

      var h = this.$createElement;
      var children = schema.children;
      return children.map(function (child, i) {
        var label = child.label;
        child.hideLabel = true;
        return h("el-tab-pane", {
          "class": 'tabs',
          "attrs": {
            "label": label
          }
        }, [h(RenderBlock, {
          "attrs": {
            "platform": _this2.platform,
            "schema": child,
            "parentField": i
          }
        })]);
      });
    }
  },
  render: function render(h) {
    return h("div", {
      "class": 'tasks'
    }, [h("el-tabs", {
      "attrs": {
        "type": 'card'
      },
      "on": {
        "tabRemove": this.removeTab
      }
    }, [this.renderTabPane(this.schema)])]);
  }
};

/**
 * @file 渲染rule
 */

var RenderRule = {
  inject: {
    spAnalysisApp: {
      "default": {}
    }
  },
  provide: function provide() {
    return {
      spRuleApp: this
    };
  },
  props: {
    schema: {
      type: Object,
      "default": function _default() {}
    },
    platform: {
      type: String,
      "default": function _default() {
        return 'hubble';
      }
    },
    parentField: {
      type: [Number, Boolean],
      "default": function _default() {
        return false;
      }
    }
  },
  data: function data() {
    return {
      currentRuleData: [],
      layer: 0,
      numberSteps: 5,
      ruleChunkValidator: {},
      baseValidator: [],
      noNeedIncreases: ['rewardPerOrderRangeMoney', 'rewardPerOrderRangePercentage'] // 不需要校验的权益

    };
  },
  created: function created() {
    this.name = this.schema.name;
    !('awardRules' in this.spAnalysisApp.formData.taskList[this.parentField]) && this.$set(this.spAnalysisApp.formData.taskList[this.parentField], 'awardRules', []); // rule字段 init
    // eslint-disable-next-line vue/no-mutating-props

    this.schema.children[0].children = this.pushLogicDescribe(this.schema);
    this.handleLayerInit();
    this.specialTreatment(this.schema.children[1].children[0]); // 收集每单奖每单奖励区间励属性，字段替换使用。此路径目前是死的不会进行改变

    var operations = this.schema.operations;

    if (operations) {
      var _operations$rewardRul, _this$schema, _this$schema$operatio;

      this.numberSteps = operations === null || operations === void 0 ? void 0 : (_operations$rewardRul = operations.rewardRule) === null || _operations$rewardRul === void 0 ? void 0 : _operations$rewardRul.numberSteps;
      Vue.set(this.spAnalysisApp.configMap, 'rewardRule', (_this$schema = this.schema) === null || _this$schema === void 0 ? void 0 : (_this$schema$operatio = _this$schema.operations) === null || _this$schema$operatio === void 0 ? void 0 : _this$schema$operatio.rewardRule);
    }
  },
  mounted: function mounted() {
    if (!this.spAnalysisApp.fields[this.spAnalysisApp.currentStep]) {
      Vue.set(this.spAnalysisApp.fields, this.spAnalysisApp.currentStep, []);
    }

    this.spAnalysisApp.fields[this.spAnalysisApp.currentStep].push(this);
  },
  methods: {
    /**
     * rule 渲染
     * @param {object} schema
     */
    renderRuleStart: function renderRuleStart(schema, layer) {
      var _this = this;

      var h = this.$createElement;
      // sp set rule-layer 数据结构
      !this.spAnalysisApp.formData.taskList[this.parentField].awardRules[layer] && this.$set(this.spAnalysisApp.formData.taskList[this.parentField].awardRules, layer, {});
      var type = schema.type,
          fileds = schema.fileds,
          children = schema.children;
      if (type !== 'rule') throw new Error('rule解析组件只能解析rule');
      return (fileds || children).map(function (filed, index) {
        return h(RenderBlock, {
          "attrs": {
            "ruleItemTag": index === 0 ? 'taskIndicators' : 'interests',
            "ruleLayer": String(layer),
            "fileTag": '0',
            "parentField": _this.parentField,
            "schema": filed,
            "platform": _this.platform
          }
        });
      });
    },

    /**
     * 添加rule层级
     */
    addLayer: function addLayer() {
      var _this2 = this;

      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var flag;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _this2.validate();

              case 2:
                flag = _context.sent;

                if (!(flag === 'error')) {
                  _context.next = 5;
                  break;
                }

                return _context.abrupt("return");

              case 5:
                _this2.currentRuleData.push({
                  schema: _this2.schema,
                  layer: _this2.currentRuleData.length
                });

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },

    /**
     * 删除rule层级
     * @param {object} ruleItem
     */
    deleteRuleItem: function deleteRuleItem(ruleItem) {
      var _this3 = this;

      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        var currentIndex, oldRuleChunkValidator, newRuleChunkValidator, currentOldValueArr, i;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.t0 = ruleItem.layer !== _this3.currentRuleData.length - 1;

                if (!_context2.t0) {
                  _context2.next = 6;
                  break;
                }

                _context2.next = 4;
                return _this3.validate();

              case 4:
                _context2.t1 = _context2.sent;
                _context2.t0 = _context2.t1 === 'error';

              case 6:
                if (!_context2.t0) {
                  _context2.next = 9;
                  break;
                }

                Message({
                  showClose: true,
                  message: '请先修正rule中的错误配置',
                  type: 'error'
                });
                return _context2.abrupt("return");

              case 9:
                _this3.spAnalysisApp.formData.taskList[_this3.parentField].awardRules.splice(ruleItem.layer, 1);

                currentIndex = _this3.currentRuleData.findIndex(function (item) {
                  return item === ruleItem;
                });

                _this3.currentRuleData.splice(currentIndex, 1); // 修正层级


                _this3.currentRuleData = _this3.currentRuleData.map(function (item, i) {
                  return _objectSpread2(_objectSpread2({}, item), {}, {
                    layer: i
                  });
                }); // 删除校验实例&修正校验层级

                delete _this3.ruleChunkValidator[ruleItem.layer];
                oldRuleChunkValidator = _this3.ruleChunkValidator;
                newRuleChunkValidator = {};
                currentOldValueArr = Object.values(oldRuleChunkValidator);

                for (i = 0; i < currentOldValueArr.length; i++) {
                  newRuleChunkValidator[i] = currentOldValueArr[i];
                }

                _this3.ruleChunkValidator = newRuleChunkValidator;

              case 19:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    },

    /**
     * 阶层数据新建和回显
     */
    handleLayerInit: function handleLayerInit() {
      var _this$spAnalysisApp$f,
          _this$spAnalysisApp$f2,
          _this4 = this;

      var awardRulesData = (_this$spAnalysisApp$f = this.spAnalysisApp.formData) === null || _this$spAnalysisApp$f === void 0 ? void 0 : (_this$spAnalysisApp$f2 = _this$spAnalysisApp$f.taskList[this.parentField]) === null || _this$spAnalysisApp$f2 === void 0 ? void 0 : _this$spAnalysisApp$f2.awardRules;

      if (awardRulesData) {
        awardRulesData.forEach(function (item, index) {
          if (Object.keys(item).length > 0) {
            _this4.currentRuleData.push({
              schema: _this4.schema,
              layer: index
            });
          }
        });

        if (this.currentRuleData.length === 0) {
          this.currentRuleData.push({
            schema: this.schema,
            layer: 0
          });
        }
      } else {
        this.currentRuleData.push({
          schema: this.schema,
          layer: 0
        });
      }
    },

    /**
     * 一些业务相关，目前写死的逻辑
     * @param {object} targetJson 目标数据信息
     */
    specialTreatment: function specialTreatment(targetJson) {
      var name = targetJson.name,
          targetOperations = targetJson.operations,
          options = targetJson.options; // 每单奖和每单奖励的字段都会改变
      // TODO 每单奖和每单奖励区间为死逻辑  后面思考待解

      if (name === 'rewardPerOrder_v2') {
        // 收集起来等待动态切换 每单奖的固定金额和流水
        for (var i = 0; i < Object.keys(options).length; i++) {
          if (Object.keys(options)[i] === 'rewardPerOrderMoney' || Object.keys(options)[i] === 'rewardPerOrderPercentage') {
            this.spAnalysisApp.specialField.findIndex(function (item) {
              return item.relationField === 'rewardPerOrderMoney';
            }) === -1 && this.spAnalysisApp.specialField.push({
              relationField: 'rewardPerOrderMoney',
              replace: Object.keys(options)[i]
            });
          }
        }
      }

      if (name === 'rewardPerOrderRange_v2') {
        // 收集起来等待动态切换 每单区间的固定金额和流水
        for (var _i = 0; _i < Object.keys(options).length; _i++) {
          if (Object.keys(options)[_i] === 'rewardPerOrderRangeMoney' || Object.keys(options)[_i] === 'rewardPerOrderRangePercentage') {
            this.spAnalysisApp.specialField.findIndex(function (item) {
              return item.relationField === 'rewardPerOrderRange';
            }) === -1 && this.spAnalysisApp.specialField.push({
              relationField: 'rewardPerOrderRange',
              replace: Object.keys(options)[_i]
            });
          }
        }
      } // 收集最高奖励上限配置======>其配置在每单奖or每单区间组件上


      if (name === 'rewardPerOrder_v2' || name === 'rewardPerOrderRange_v2') {
        var _targetOperations$cur;

        var currentPath = name === 'rewardPerOrder_v2' ? 'rewardPerOrderMoney' : 'rewardPerOrderRange';
        var tagetOptionArr = ((_targetOperations$cur = targetOperations[currentPath]) === null || _targetOperations$cur === void 0 ? void 0 : _targetOperations$cur.rewardsUpperLimit) || []; // 收集奖励上限的枚举

        this.spAnalysisApp.specialOption.findIndex(function (item) {
          return item.relationField === 'maximumRewardLimitFe';
        }) === -1 && this.spAnalysisApp.specialOption.push({
          relationField: 'maximumRewardLimitFe',
          replaceOption: tagetOptionArr
        }); // 通知完单量组件

        if (name === 'rewardPerOrder_v2') {
          this.spAnalysisApp.specialField.findIndex(function (item) {
            return item.relationField === 'orderNum';
          }) === -1 && this.spAnalysisApp.specialField.push({
            relationField: 'orderNum',
            isInterval: false
          });
        } else {
          this.spAnalysisApp.specialField.findIndex(function (item) {
            return item.relationField === 'orderNum';
          }) === -1 && this.spAnalysisApp.specialField.push({
            relationField: 'orderNum',
            isInterval: true
          });
        }
      } //! 一阶段老组件，需要代码兼容【收集最高奖励上限】


      if (name === 'rewardPerOrder') {
        for (var _i2 = 0; _i2 < Object.keys(options).length; _i2++) {
          if (Object.keys(options)[_i2] === 'rewardUpperLimitMoney' || Object.keys(options)[_i2] === 'rewardUpperLimitOrderNum') {
            this.spAnalysisApp.specialField.findIndex(function (item) {
              return item.relationField === 'tagMaximumLimit';
            }) === -1 && this.spAnalysisApp.specialField.push({
              relationField: 'tagMaximumLimit',
              replace: Object.keys(options)[_i2]
            });
            break;
          }
        }
      }
    },

    /**
     * rule 数据校验
     */
    validate: function validate() {
      var _this5 = this;

      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
        var currentLayer, currentLayerStateArrRel, currentLayerState, _loop, i, _ret;

        return _regeneratorRuntime().wrap(function _callee3$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!(_this5.currentRuleData.length === 1)) {
                  _context4.next = 10;
                  break;
                }

                currentLayer = _this5.ruleChunkValidator[_this5.currentRuleData.length - 1].map(function (child) {
                  return child.validate(null, null, null, 0);
                });
                _context4.next = 4;
                return Promise.all(currentLayer);

              case 4:
                currentLayerStateArrRel = _context4.sent;
                currentLayerState = currentLayerStateArrRel.some(function (itemStart) {
                  return itemStart === 'error';
                });

                if (!currentLayerState) {
                  _context4.next = 8;
                  break;
                }

                return _context4.abrupt("return", Promise.resolve('error'));

              case 8:
                _context4.next = 20;
                break;

              case 10:
                _loop = /*#__PURE__*/_regeneratorRuntime().mark(function _loop(i) {
                  var preLayer, currentLayer, preLayerStateArrRel, currentLayerStateArrRel, preLayerState, currentLayerState;
                  return _regeneratorRuntime().wrap(function _loop$(_context3) {
                    while (1) {
                      switch (_context3.prev = _context3.next) {
                        case 0:
                          preLayer = _this5.ruleChunkValidator[i - 1].map(function (child) {
                            return child.validate(null, null, null, i - 1);
                          });
                          currentLayer = _this5.ruleChunkValidator[i].map(function (child, index) {
                            var preVal = _this5.spAnalysisApp.formData.taskList[_this5.parentField].awardRules[i - 1][child.finlName];
                            var currentVal = _this5.spAnalysisApp.formData.taskList[_this5.parentField].awardRules[i][child.finlName];

                            if (Array.isArray(preVal)) {
                              if (preVal[1]) {
                                preVal = preVal[1] > preVal[0] ? preVal[1] : preVal[0];
                              } else {
                                preVal = preVal[0];
                              }
                            }

                            return child.validate(null, [{
                              validator: function validator(rule, value, callback) {
                                var realVal = null;
                                Array.isArray(value) ? realVal = value[0] : realVal = value; // 主要指标和权益内容，必须严格递增
                                // 新逻辑： 每单奖励区间的奖励金额和流水提成不需要递增

                                if ((index === 0 || child._props.ruleItemTag === 'interests') && !_this5.noNeedIncreases.includes(child.finlName)) {
                                  if (realVal <= preVal) {
                                    return callback(new Error('必须大于上一层级'));
                                  }
                                } else {
                                  if (realVal < preVal && !_this5.noNeedIncreases.includes(child.finlName)) {
                                    return callback(new Error('必须大于等于上一层级'));
                                  }
                                }

                                return callback();
                              }
                            }], currentVal, i);
                          });
                          _context3.next = 4;
                          return Promise.all(preLayer);

                        case 4:
                          preLayerStateArrRel = _context3.sent;
                          _context3.next = 7;
                          return Promise.all(currentLayer);

                        case 7:
                          currentLayerStateArrRel = _context3.sent;
                          preLayerState = preLayerStateArrRel.some(function (itemStart) {
                            return itemStart === 'error';
                          });
                          currentLayerState = currentLayerStateArrRel.some(function (itemStart) {
                            return itemStart === 'error';
                          });

                          if (!(preLayerState || currentLayerState)) {
                            _context3.next = 12;
                            break;
                          }

                          return _context3.abrupt("return", {
                            v: Promise.resolve('error')
                          });

                        case 12:
                        case "end":
                          return _context3.stop();
                      }
                    }
                  }, _loop);
                });
                i = Object.keys(_this5.ruleChunkValidator).length - 1;

              case 12:
                if (!(i - 1 >= 0)) {
                  _context4.next = 20;
                  break;
                }

                return _context4.delegateYield(_loop(i), "t0", 14);

              case 14:
                _ret = _context4.t0;

                if (!(_typeof(_ret) === "object")) {
                  _context4.next = 17;
                  break;
                }

                return _context4.abrupt("return", _ret.v);

              case 17:
                i--;
                _context4.next = 12;
                break;

              case 20:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee3);
      }))();
    },

    /**
     * 对指标玩法数据进行改造，push 指标之间的逻辑描述（或且）
     * @param {object} schema
     */
    pushLogicDescribe: function pushLogicDescribe(schema) {
      var _schema$children$;

      var indexRelationship = schema.operations.rewardRule.indexRelationship;
      var currentContainer = (schema === null || schema === void 0 ? void 0 : (_schema$children$ = schema.children[0]) === null || _schema$children$ === void 0 ? void 0 : _schema$children$.children) || [];
      var newContainer = [];
      var isSet = currentContainer.findIndex(function (item) {
        return item.type === 'text';
      }) !== -1; // 检查是否设置过

      if (!isSet) {
        for (var i = 0; i < currentContainer.length; i++) {
          newContainer.push(currentContainer[i]);

          if (i !== currentContainer.length - 1) {
            newContainer.push({
              type: 'text',
              message: indexRelationship && indexRelationship === 'and' ? '且' : '或'
            });
          }
        }

        return newContainer;
      } else {
        return currentContainer;
      }
    }
  },
  render: function render(h) {
    var _this$schema$options,
        _this$schema$options2,
        _this6 = this;

    return h("div", {
      "class": 'rule'
    }, [h("div", {
      "class": 'rule-right'
    }, [h("h4", {
      "class": 'rule-title'
    }, [this.schema.label]), h("h4", [" ", ((_this$schema$options = this.schema.options) === null || _this$schema$options === void 0 ? void 0 : _this$schema$options.finalDescription) || ((_this$schema$options2 = this.schema.options) === null || _this$schema$options2 === void 0 ? void 0 : _this$schema$options2.description) || '']), this.currentRuleData.map(function (ruleItem) {
      if (!ruleItem) {
        return null;
      }

      var schema = ruleItem.schema,
          layer = ruleItem.layer;
      return h("div", {
        "class": 'rule-item'
      }, [_this6.renderRuleStart(schema, layer), !_this6.spAnalysisApp.openEditState && _this6.currentRuleData.length > 1 && h("i", {
        "class": 'delete-rule-item el-icon-delete',
        "on": {
          "click": function click() {
            _this6.deleteRuleItem(ruleItem);
          }
        }
      })]);
    }), h("div", {
      "class": 'add-layer'
    }, [this.spAnalysisApp.environment !== 'query' && h("el-button", {
      "attrs": {
        "disabled": this.spAnalysisApp.openEditState || this.numberSteps === this.currentRuleData.length,
        "type": 'primary',
        "plain": true
      },
      "on": {
        "click": this.addLayer
      }
    }, ["+\u6DFB\u52A0\u5C42\u7EA7"])])])]);
  }
};

/* eslint-disable no-undef */
/**
 * @file 渲染block
 * block 属于最顶级容器，里面可以放置chunk、rule
 */

var RenderBlock = {
  name: 'RenderBlock',
  inject: {
    spAnalysisApp: {
      "default": {}
    }
  },
  props: {
    schema: {
      type: [Object, Array],
      "default": function _default() {}
    },
    platform: {
      type: String,
      "default": function _default() {
        return 'hubble';
      }
    },
    parentField: {
      type: [Number, Boolean],
      "default": function _default() {
        return false;
      }
    },
    ruleLayer: {
      type: [Boolean, String],
      "default": function _default() {
        return false;
      }
    },
    fileTag: {
      type: [String, Boolean],
      "default": function _default() {
        return false;
      }
    },
    currentStep: {
      type: [String, Number],
      "default": function _default() {
        return null;
      }
    },
    ruleItemTag: {
      type: [String, Boolean],
      "default": function _default() {
        return false;
      }
    }
  },
  methods: {
    /**
     * 开始渲染block
     * @param {object} schema block的schema
     */
    renderStart: function renderStart(schema) {
      var children = schema.children;
      children = children && children.filter(function (child) {
        return child;
      }) || [];
      return this.renderBlockChildren(children);
    },

    /**
     * 渲染block的children
     * @param {array} children block的孩子们 chunk、rule、block
     */
    renderBlockChildren: function renderBlockChildren(children) {
      var _this = this;

      return children.map(function (comp, index) {
        return comp && _this.renderSpecific(comp, index);
      });
    },

    /**
     * 具体渲染逻辑
     * @param {object} copmSchema
     */
    renderSpecific: function renderSpecific(copmSchema, index) {
      var h = this.$createElement;
      var type = copmSchema.type,
          nodeCompId = copmSchema.nodeCompId;

      switch (type) {
        case 'item':
        case 'chunk':
          return h(RenderChunk, {
            "attrs": {
              "ruleItemTag": this.ruleItemTag,
              "fileTag": this.fileTag,
              "ruleLayer": this.ruleLayer,
              "parentField": this.parentField,
              "platform": this.platform,
              "schema": copmSchema,
              "index": index
            },
            "key": nodeCompId
          });

        case 'rule':
          return h(RenderRule, {
            "attrs": {
              "parentField": this.parentField,
              "platform": this.platform,
              "schema": copmSchema
            },
            "key": nodeCompId
          });

        case 'tab':
          return h(RenderTabs, {
            "attrs": {
              "parentField": this.parentField,
              "platform": this.platform,
              "schema": copmSchema
            },
            "key": nodeCompId
          });

        case 'block':
          // eslint-disable-next-line no-undef
          return h("RenderBlock", {
            "attrs": {
              "ruleItemTag": this.ruleItemTag,
              "fileTag": this.fileTag,
              "ruleLayer": this.ruleLayer,
              "parentField": this.parentField,
              "platform": this.platform,
              "schema": copmSchema
            },
            "key": nodeCompId
          });

        case 'text':
          return h("div", {
            "class": 'lego-form-item'
          }, [h("el-form-item", {
            "class": 'lego-form-item-text'
          }, [copmSchema.message])]);

        default:
          return null;
      }
    }
  },
  render: function render(h) {
    var _this2 = this;

    var _this$schema = this.schema,
        type = _this$schema.type,
        label = _this$schema.label,
        hideLabel = _this$schema.hideLabel,
        children = _this$schema.children,
        tag = _this$schema.tag; // 塞一个皮肤,死逻辑[兼容老活动]

    if (label === '皮肤选择' && tag === 'deadCode') {
      return h("div", {
        "class": 'select-skin'
      }, [this.spAnalysisApp.openEditState && h("div", {
        "class": 'cover'
      }), h("BLMRadioGroup", {
        "style": 'text-align:center',
        "attrs": {
          "value": this.spAnalysisApp.formData.skinKey || 'LGYXHD0001',
          "height": 'auto',
          "width": 273,
          "margin": 20,
          "data": this.spAnalysisApp.optionsDataMap.skinKey
        },
        "on": {
          "input": function input(value) {
            return Vue.set(_this2.spAnalysisApp.formData, 'skinKey', value);
          }
        }
      })]);
    }

    return type === 'block' && children.length > 0 && h("div", {
      "class": 'block'
    }, [label && !hideLabel && h("h3", {
      "class": 'block-label'
    }, [label]), this.renderStart(this.schema)]);
  }
};

/**
 * @file 渲染step
 */
var RenderStep = {
  props: {
    value: {
      type: Number,
      "default": function _default() {
        return 1;
      }
    },
    schema: {
      type: Object,
      "default": function _default() {}
    },
    status: {
      "default": function _default() {
        return 'error';
      }
    }
  },
  mounted: function mounted() {
    var _this$nodes,
        _this = this;

    if (!this.schema.children.length) {
      return;
    }

    this.nodes = document.querySelectorAll('.lego-step');
    var count = (_this$nodes = this.nodes) === null || _this$nodes === void 0 ? void 0 : _this$nodes.length;

    if (count !== this.schema.children.length) {
      return;
    }

    this.handlers = [];

    var _loop = function _loop(i) {
      _this.handlers.push(function () {
        _this.$emit('click', i);
      });

      _this.nodes[i].addEventListener('click', _this.handlers[i]);
    };

    for (var i = 0; i < count; i++) {
      _loop(i);
    }
  },
  beforeDestroy: function beforeDestroy() {
    var _this$nodes2;

    var count = (_this$nodes2 = this.nodes) === null || _this$nodes2 === void 0 ? void 0 : _this$nodes2.length;

    for (var i = 0; i < count; i++) {
      this.nodes[i].removeEventListener('click', this.handlers[i]);
    }
  },
  methods: {
    /**
     * 开始渲染
     * @param {object} schema
     * @param {string} type
     */
    renderStepsStart: function renderStepsStart(schema, type) {
      var _this2 = this;

      var children = schema.children;

      if (type === 'title') {
        return children && children.map(function (child, index) {
          return _this2.renderStepsItem(child, index);
        });
      }

      return null;
    },

    /**
     * 渲染具体步骤标题
     * @param {object} childSchema
     */
    renderStepsItem: function renderStepsItem(childSchema, index) {
      var h = this.$createElement;
      var label = childSchema.label;
      childSchema.hideLabel = true;
      return h("el-step", {
        "ref": "".concat(index),
        "attrs": {
          "status": this.status[index],
          "title": label
        },
        "class": 'lego-step'
      });
    }
  },
  render: function render(h) {
    return h("el-steps", {
      "attrs": {
        "active": this.value,
        "align-center": true
      }
    }, [this.renderStepsStart(this.schema, 'title')]);
  }
};

var LegoAnalysis = {
  name: 'SpAnalysis',
  components: {
    RenderBlock: RenderBlock
  },
  provide: function provide() {
    return {
      spAnalysisApp: this
    };
  },
  props: {
    schema: {
      required: true,
      type: Object,
      "default": function _default() {}
    },
    requestProps: {
      required: true,
      type: Function,
      "default": function _default() {}
    },
    environment: {
      required: true,
      type: String,
      "default": function _default() {
        return 'query';
      }
    },
    chunksDataByScene: {
      required: true,
      type: Array,
      "default": function _default() {
        return [];
      }
    },
    fieldsByScene: {
      required: true,
      type: Array,
      "default": function _default() {
        return [];
      }
    },
    legoUtils: {
      type: Object,
      "default": function _default() {}
    }
  },
  data: function data() {
    return {
      currentStep: 0,
      // 当前所在step
      stepsNum: 2,
      // 总步骤数
      currentStepData: {},
      // 当前步骤schema
      currentCanvasCompData: {},
      // 玩法json
      formData: {},
      // 全局form 字段
      atomicInteraction: {},
      // 枚举所有atomic中有display交互的字段, 每次有表单变更去全量执行
      chunkInteraction: {},
      // 枚举所有chunk中有display交互的字段, 每次有表单变更去全量执行
      optionsInteraction: {},
      // 枚举所有原子中有options交互的字段, 每次有表单变更去全量执行
      optionsDataMap: {},
      // 全局options
      atomicDataMap: {},
      // 全局原子配置
      filedMap: [],
      // 字段map
      filedObjectMap: {},
      // 字段map
      specialField: [],
      // 需要特殊处理的字段
      specialOption: [],
      // 需要特殊处理单选多选框枚举
      request: this.requestProps,
      // lego 使用
      allStepCheckState: {},
      // all step check state
      fields: [],
      // 全局具有校验规则的原子组件实例
      openEditState: false,
      // 开启权限编辑
      editableChunkArr: [],
      // 权限编辑时可编辑的chunk
      utils: _objectSpread2({
        // lego 使用的一些工具函数
        getRelationChunk: function getRelationChunk() {},
        findComponentsDownward: findComponentsDownward(this)
      }, this.legoUtils),
      configMap: {},
      attrsMap: {}
    };
  },
  computed: {
    formDataClone: function formDataClone() {
      return JSON.parse(JSON.stringify(this.formData));
    },
    dataSource: function dataSource() {
      return {
        schema: this.schema,
        chunksDataByScene: this.chunksDataByScene,
        fieldsByScene: this.fieldsByScene
      };
    }
  },
  watch: {
    formDataClone: {
      deep: true,
      immediate: true,
      handler: function handler(v, oldValue) {
        var _arguments = arguments,
            _this = this;

        if (JSON.stringify(v) === JSON.stringify(oldValue)) return;
        this.$emit('change', v); // 表单有变动，全量执行原子和chunk交互的的display
        // chunk

        Object.keys(this.chunkInteraction).forEach(function (k) {
          var _item$display;

          var item = _this.chunkInteraction[k];
          item.visible = (_item$display = item.display).call.apply(_item$display, [_this].concat(_toConsumableArray(_arguments), [item.tag]));
        }); // 原子

        Object.keys(this.atomicInteraction).forEach(function (k) {
          var _item$display2;

          var item = _this.atomicInteraction[k];
          item.visible = (_item$display2 = item.display).call.apply(_item$display2, [_this].concat(_toConsumableArray(_arguments)));
        }); // 原子 options

        Object.keys(this.optionsInteraction).forEach(function (k) {
          var item = _this.optionsInteraction[k];
          Promise.resolve(item.options.apply(item, [_this.request].concat(_toConsumableArray(_arguments)))).then(function (res) {
            _this.$set(_this.optionsDataMap, k, res || []);
          });
        });
      }
    },
    currentStep: {
      handler: function handler(value, oldValue) {
        var _this2 = this;

        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
          var currentCheckStateArr, currentCheckStateArrRel, currentCheckState;
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  if (!(value !== oldValue)) {
                    _context.next = 10;
                    break;
                  }

                  if (Array.isArray(_this2.fields[oldValue])) {
                    _context.next = 3;
                    break;
                  }

                  return _context.abrupt("return");

                case 3:
                  currentCheckStateArr = _this2.fields[oldValue].map(function (item) {
                    return item.validate();
                  });
                  _context.next = 6;
                  return Promise.all(currentCheckStateArr);

                case 6:
                  currentCheckStateArrRel = _context.sent;
                  currentCheckState = currentCheckStateArrRel.some(function (itemStart) {
                    return itemStart === 'error';
                  });
                  _this2.fields[oldValue] = null;
                  _this2.allStepCheckState[oldValue] = currentCheckState ? 'error' : 'success';

                case 10:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }))();
      }
    },
    dataSource: {
      deep: true,
      immediate: true,
      handler: function handler(v) {
        if (!v.schema) return;
        if (!v.chunksDataByScene || !Array.isArray(v.chunksDataByScene)) return;
        if (!v.fieldsByScene || !Array.isArray(v.fieldsByScene)) return;
        this.dataInit();
      }
    }
  },
  mounted: function mounted() {
    this.utils.findComponentsDownward = findComponentsDownward(this);
  },
  methods: {
    /**
     * 处理进度条点击事件
     * @param {number} nValue
     */
    handleClick: function handleClick(nValue) {
      var _this3 = this;

      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        var i, _i;

        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                // 处理当前步骤以前的步骤
                for (i = 0; i < nValue; i++) {
                  if (_this3.allStepCheckState[i] !== 'success') {
                    _this3.allStepCheckState[i] = 'error';
                  }
                }

                if (_this3.currentStep > nValue) {
                  // 仍需触发当前校验
                  setTimeout(function () {
                    //  previous
                    _this3.fields[_this3.currentStep].forEach(function (item) {
                      return item.validate();
                    });
                  });
                } else {
                  _this3.allStepCheckState[nValue] = 'process';
                } // 处理当前步骤以后的步骤


                for (_i = nValue + 1; _i <= _this3.stepsNum; _i++) {
                  _this3.allStepCheckState[_i] = 'wait';
                }

                _this3.currentStep = nValue;

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    },

    /**
     * 数据初始化
     */
    dataInit: function dataInit() {
      var _this4 = this;

      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
        var schema;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                // 拼装all数据
                schema = _this4.schema;
                setCurrentScenesAllChunk(_this4.chunksDataByScene);
                setFilds(schema); // 拼装所有chunk

                _this4.filedMap = _this4.fieldsByScene;

                _this4.filedMap.reduce(function (obj, item) {
                  return obj[item.uniqueName] = item, obj;
                }, _this4.filedObjectMap);

                _this4.currentCanvasCompData = schema; // set 玩法schema

                _this4.utils.getRelationChunk = getRelationChunk(schema);
                _this4.stepsNum = schema.children.length - 1; // set 总步数

                if (schema.children) {
                  _this4.currentStepData = schema.children[0]; // set 当前步骤schema
                }

                _this4.initAllStepCheckState(schema.children.length);

              case 10:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }))();
    },

    /**
     * 初始化每一步的校验状态
     * @param {number} length
     */
    initAllStepCheckState: function initAllStepCheckState(length) {
      for (var i = 0; i < length; i++) {
        if (i === 0) {
          this.$set(this.allStepCheckState, i, 'process');
        } else {
          this.$set(this.allStepCheckState, i, 'wait');
        }
      }
    },

    /**
     * 获取sceneType
     */
    getSceneType: function getSceneType() {
      return this.$route.query['sceneType'] || '';
    },
    getSceneId: function getSceneId() {
      return this.$route.query['sceneId'] || '';
    },

    /**
     * next step
     */
    nextStep: function nextStep() {
      var _this5 = this;

      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
        var currentCheckStateArr, currentCheckStateArrRel, currentCheckState;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!(_this5.stepsNum > _this5.currentStep)) {
                  _context4.next = 12;
                  break;
                }

                if (!(_this5.currentStep !== _this5.stepsNum)) {
                  _context4.next = 9;
                  break;
                }

                currentCheckStateArr = _this5.fields[_this5.currentStep].map(function (item) {
                  return item.validate();
                });
                _context4.next = 5;
                return Promise.all(currentCheckStateArr);

              case 5:
                currentCheckStateArrRel = _context4.sent;
                currentCheckState = currentCheckStateArrRel.some(function (itemStart) {
                  return itemStart === 'error';
                });
                _this5.fields[_this5.currentStep] = null;
                _this5.allStepCheckState[_this5.currentStep] = currentCheckState ? 'error' : 'success';

              case 9:
                _this5.currentStep = _this5.currentStep + 1;
                _this5.allStepCheckState[_this5.currentStep] = 'process';
                setTimeout(function () {
                  // next
                  if (_this5.currentStep !== _this5.stepsNum && _this5.allStepCheckState[_this5.currentStep] !== 'process') {
                    _this5.fields[_this5.currentStep].forEach(function (item) {
                      return item.validate();
                    });
                  }
                });

              case 12:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }))();
    },

    /**
     * previous step
     */
    previousStep: function previousStep() {
      var _this6 = this;

      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
        var currentCheckStateArr, currentCheckStateArrRel, currentCheckState;
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (!(_this6.currentStep > 0)) {
                  _context5.next = 12;
                  break;
                }

                if (!(_this6.currentStep !== _this6.stepsNum)) {
                  _context5.next = 9;
                  break;
                }

                currentCheckStateArr = _this6.fields[_this6.currentStep].map(function (item) {
                  return item.validate();
                });
                _context5.next = 5;
                return Promise.all(currentCheckStateArr);

              case 5:
                currentCheckStateArrRel = _context5.sent;
                currentCheckState = currentCheckStateArrRel.some(function (itemStart) {
                  return itemStart === 'error';
                });
                _this6.fields[_this6.currentStep] = null;
                _this6.allStepCheckState[_this6.currentStep] = currentCheckState ? 'error' : 'success';

              case 9:
                _this6.allStepCheckState[_this6.currentStep] = 'wait';
                _this6.currentStep = _this6.currentStep - 1;
                setTimeout(function () {
                  //  previous
                  if (_this6.currentStep !== _this6.stepsNum && _this6.allStepCheckState[_this6.currentStep] !== 'process') {
                    _this6.fields[_this6.currentStep].forEach(function (item) {
                      return item.validate();
                    });
                  }
                });

              case 12:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }))();
    }
  },
  render: function render(h) {
    if (!this.schema || !this.chunksDataByScene || !Array.isArray(this.chunksDataByScene) || !this.fieldsByScene || !Array.isArray(this.fieldsByScene)) return;
    return Object.keys(this.currentCanvasCompData).length !== 0 && h("div", {
      "class": 'sp-form'
    }, [h(RenderStep, {
      "attrs": {
        "status": this.allStepCheckState,
        "schema": this.currentCanvasCompData,
        "value": this.currentStep
      },
      "class": 'sp-form-step',
      "on": {
        "click": this.handleClick
      }
    }), h("el-form", {
      "class": 'lego-sp-form-form',
      "props": _objectSpread2({}, {
        model: this.formData,
        labelWidth: '150px'
      })
    }, [h(RenderBlock, {
      "attrs": {
        "platform": 'sp',
        "currentStep": this.currentStep,
        "schema": this.currentCanvasCompData.children[this.currentStep]
      }
    })]), h("div", {
      "class": 'lego-sp-form-btns'
    })]);
  }
};

LegoAnalysis.install = function (Vue) {
  Vue.component(LegoAnalysis.name, LegoAnalysis);
};

export { LegoAnalysis as default };
