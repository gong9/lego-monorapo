import draggable from"vuedraggable";import _ from"lodash";import*as monaco from"monaco-editor";import"monaco-editor/esm/vs/editor/contrib/find/findController";import"monaco-editor/esm/vs/basic-languages/css/css.contribution";import"monaco-editor/esm/vs/basic-languages/xml/xml.contribution";import"monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution";function ownKeys(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function _objectSpread2(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?ownKeys(Object(n),!0).forEach((function(t){_defineProperty(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):ownKeys(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function _createClass(e,t,n){return t&&_defineProperties(e.prototype,t),n&&_defineProperties(e,n),Object.defineProperty(e,"prototype",{writable:!1}),e}function _defineProperty(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var containerData=[{type:"block",name:"block",children:[],label:"block",config:{relation:{component:"lego-select",label:"计算逻辑",componentOption:[{label:"and",value:"and"},{label:"or",value:"or"}],isBelongOption:!0},needCheck:{component:"lego-jsEditor",label:"校验逻辑",isBelongOption:!0},isCanvas:{component:"lego-switch",label:"是否画布",isBelongOption:!1},needSort:{component:"lego-switch",label:"孩子是否排序",isBelongOption:!0},disabledComChunk:{component:"lego-select",label:"当前画布不可选",componentOption:[{label:"and",value:"and"},{label:"or",value:"or"}],isBelongOption:!0},style:{component:"lego-jsEditor",label:"展示样式"},minChildrenLength:{component:"lego-input-number",label:"孩子最少数量",isBelongOption:!0},__other__:{tooltip:"一些特殊属性,会放进option中",component:"lego-jsEditor",label:"特殊属性",isBelongOption:!0}}},{type:"rule",name:"rule",children:[],label:"rule",config:{canDelete:{component:"lego-switch",label:"是否默认放置"},relation:{component:"lego-select",label:"计算逻辑",componentOption:[{label:"and",value:"and"},{label:"or",value:"or"}]},notRemoveButton:{component:"lego-switch",label:"是否展示删除按钮"},displayOrder:{component:"lego-input-number",label:"排列顺序"},description:{component:"lego-input",label:"文本描述"},style:{component:"lego-jsEditor",label:"展示样式"},ruleConfig:{component:"lego-jsEditor",label:"哈勃属性配置"},__other__:{tooltip:"一些特殊属性,会放进option中",component:"lego-jsEditor",label:"特殊属性"}}},{type:"task",name:"task",children:[],label:"task"},{type:"step",name:"step",children:[],label:"step",config:{formatter:{component:"lego-jsEditor",label:"sp提交预览"},__other__:{tooltip:"一些特殊属性,会放进option中",component:"lego-jsEditor",label:"特殊属性"}}}],blockConfigData={relation:{component:"lego-select",label:"计算逻辑",componentOption:[{label:"and",value:"and"},{label:"or",value:"or"}],isBelongOption:!0},needCheck:{component:"lego-jsEditor",label:"校验逻辑",isBelongOption:!0},isCanvas:{component:"lego-switch",label:"是否画布",isBelongOption:!1},needSort:{component:"lego-switch",label:"孩子是否排序",isBelongOption:!0},disabledComChunk:{component:"lego-select",label:"当前画布不可选",componentOption:[{label:"and",value:"and"},{label:"or",value:"or"}],isBelongOption:!0},style:{component:"lego-jsEditor",label:"展示样式"},minChildrenLength:{component:"lego-input-number",label:"孩子最少数量",isBelongOption:!0},__other__:{tooltip:"一些特殊属性,会放进option中",component:"lego-jsEditor",label:"特殊属性",isBelongOption:!0}},ruleConfigData={canDelete:{component:"lego-switch",label:"是否默认放置"},relation:{component:"lego-select",label:"计算逻辑",componentOption:[{label:"and",value:"and"},{label:"or",value:"or"}]},notRemoveButton:{component:"lego-switch",label:"是否展示删除按钮"},displayOrder:{component:"lego-input-number",label:"排列顺序"},description:{component:"lego-input",label:"文本描述"},style:{component:"lego-jsEditor",label:"展示样式"},ruleConfig:{component:"lego-jsEditor",label:"哈勃属性配置"},__other__:{tooltip:"一些特殊属性,会放进option中",component:"lego-jsEditor",label:"特殊属性"}},stepConfigData={formatter:{component:"lego-jsEditor",label:"sp提交预览"},__other__:{tooltip:"一些特殊属性,会放进option中",component:"lego-jsEditor",label:"特殊属性"}},taskConfigData={},chunkConfigData={canDelete:{component:"lego-switch",label:"是否默认放置",isBelongOption:!0},description:{component:"lego-input",label:"文本描述",props:{placeholder:"请输入文本描述"},isBelongOption:!0},displayOrder:{component:"lego-input-number",label:"排列顺序",isBelongOption:!0},notRemoveButton:{component:"lego-switch",label:"是否展示移除",isBelongOption:!0},deleteLimit:{tooltip:"仅在当前画布的限制组件有效",component:"lego-select",label:"删除限制",componentOption:"all-chunk-data",isBelongOption:!0},relationPut:{tooltip:"仅在当前画布的限制组件有效",component:"lego-select",componentOption:"all-chunk-data",label:"联动放置",isBelongOption:!0},hide:{},isRemoveAttrConfig:{},isPrefix:{component:"lego-switch",label:"是否展示前缀",isBelongOption:!0},isSuffix:{component:"lego-switch",label:"是否展示后缀",isBelongOption:!0},relationOption:{component:"lego-input",label:"xxxxx",props:{placeholder:"请输入xxxxx"},isBelongOption:!0},__other__:{tooltip:"一些特殊属性,会放进option中",component:"lego-jsEditor",label:"特殊属性",isBelongOption:!0}},handleInjectPorpsAndEvents=function handleInjectPorpsAndEvents(vnode,props){var attrs=props.attrs,on=props.on;if("string"==typeof attrs||"string"==typeof on){try{attrs=eval(attrs)()}catch(e){attrs={},console.warn("attrs解析异常")}on=eval(on)()}try{var vnodeProps=vnode.componentOptions.propsData,vnodeProps2=vnode.data.attrs,vnodeEvent=vnode.componentOptions.listeners;vnode.componentOptions.propsData=_objectSpread2(_objectSpread2({},vnodeProps),attrs),vnode.data.attrs=_objectSpread2(_objectSpread2({},vnodeProps2),attrs),vnode.componentOptions.listeners=_objectSpread2(_objectSpread2({},vnodeEvent),on)}catch(e){console.error("注入属性&事件失败"),console.error(e)}return vnode},dispatch=function(e,t,n,o){for(var a=e.$parent||e.$root,l=a.componentName;a&&(!l||l!==t);)(a=a.$parent)&&(l=a.componentName);a&&a.$emit.apply(a,[n].concat(o))},filterUselessData=function(e){var t=e[0]||{},n=_.cloneDeep(t);return function e(t){var n=t.currentConfigValue,o=void 0===n?{}:n,a={};Object.keys(o).forEach((function(e){isBelongTo(e)?a[e]=o[e]:t[e]=o[e]})),t.options=a,t.config&&delete t.config,t.fields&&delete t.fields,t.currentConfigValue&&delete t.currentConfigValue,t.children&&Array.isArray(t.children)&&t.children.length>0&&t.children.forEach((function(t){return e(t)}))}(n),n},inverseParse=function(e){var t=_.cloneDeep(e);return function e(t){addConfig(t),t.currentConfigValue={name:"block",isCanvas:!1,isSort:!1},t.children&&Array.isArray(t.children)&&t.children.length>0&&t.children.forEach((function(t){return e(t)}))}(t),t},addConfig=function(e){var t={};switch(e.type){case"block":t=blockConfigData;break;case"step":t=stepConfigData;break;case"rule":t=ruleConfigData;break;case"task":t=taskConfigData;break;case"chunk":t=chunkConfigData;break;default:t={}}e.config=t},addConfigOnlyChunk=function(e){return e.map((function(e){return _objectSpread2(_objectSpread2({},e),{},{config:chunkConfigData})}))},isBelongTo=function(e){return!["name","isCanvas"].includes(e)},legoSelect$1={functional:!0,render:function(e,t){var n=t.props,o=n.options,a=n.component;return handleInjectPorpsAndEvents("BLMBatchCitySelect"===a?e("BLMBatchCitySelect",{attrs:{optionsData:[],value:[]}}):"BLMSelectAndNestedList"===a||"BLMSelectAndSearch"===a?e(a,{attrs:{data:[],value:[]}}):e("el-select",{attrs:{value:""}}),o)}},legoRadio={functional:!0,render:function(e,t){var n;return e("el-radio-group",{attrs:{value:1}},[(n=[{label:"示例1",value:1},{label:"示例2",value:2}],n.map((function(t){return e("el-radio",{attrs:{id:t.label,label:t.value},key:t.value},[t.label])})))])}},legoCheckbox={functional:!0,render:function(e,t){var n;return e("el-checkbox-group",{attrs:{value:[1,2,3]}},[(n=[{label:"示例1",value:1},{label:"示例2",value:2},{label:"示例3",value:3}],n.map((function(t){return e("el-checkbox",{key:t.value,attrs:{label:t.value}},[t.label])})))])}},BaseAnalysis={props:{schema:{type:Object,default:function(){}}},methods:{renderAtom:function(e){var t=this.$createElement,n=e.fields[0]||{},o=n.component,a=n.options;switch(o){case"el-input":return handleInjectPorpsAndEvents(t("el-input"),a);case"el-textarea":return handleInjectPorpsAndEvents(t("el-input",{attrs:{type:"textarea"}}),a);case"el-checkbox-group":return t(legoCheckbox);case"el-radio-group":case"BLMRadioGroup":return t(legoRadio);case"el-select":case"BLMBatchCitySelect":case"BLMSelectAndNestedList":case"BLMSelectAndSearch":return t(legoSelect$1,{attrs:{component:o,options:a}});case"el-time-select":return handleInjectPorpsAndEvents(t("el-time-select"),a);case"el-date-picker":case"el-date-range":return handleInjectPorpsAndEvents(t("el-date-picker"),a);case"BLMTimePickerListLimit":return t(legoRadio,{attrs:{schema:e}});case"el-input-number":return handleInjectPorpsAndEvents(t("el-input-number"),a);default:return handleInjectPorpsAndEvents(t(o),a)}}},render:function(e){return e("div",{class:"chunk-node-atom"},[this.renderAtom(this.schema)])}},EventEmitter=_createClass((function e(){var t=this;_classCallCheck(this,e),_defineProperty(this,"on",(function(e,n){t.cache[e]=n})),_defineProperty(this,"emit",(function(e){for(var n,o=arguments.length,a=new Array(o>1?o-1:0),l=1;l<o;l++)a[l-1]=arguments[l];t.cache[e]&&(n=t.cache)[e].apply(n,a)})),_defineProperty(this,"off",(function(e,n){var o=t.cache[e];if(o){var a=o.findIndex((function(e){return e===n||e.callback===n}));a>=0&&o.splice(a,1)}})),this.cache={}})),eventBus=new EventEmitter,flagIndex=0,center={name:"NestedDraggable",components:{draggable:draggable,BaseAnalysis:BaseAnalysis},props:{tasks:{type:Array,required:!0}},data:function(){return{isSelected:!1}},methods:{renderChunk:function(e,t,n){var o=this,a=this.$createElement;return a("el-form-item",{attrs:{label:e.label},class:"chunk-node"},[a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:19},class:"cover"},[a("div",{class:"cover-box"}),a(BaseAnalysis,{attrs:{schema:e}})]),a("el-col",{attrs:{span:1}},[a("span",{class:"el-icon-delete",on:{click:function(){return o.handleDelete(n,t)}}})])])])},renderContainer:function(e,t,n){var o=this,a=this.$createElement;e.type;return a("div",{class:{"container-node-outside":!0}},[a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:19},class:"cover"},[a("nestedDraggable",{attrs:{tag:"div",tasks:e.children}})]),a("el-col",{attrs:{span:1}},[a("span",{class:"el-icon-delete",on:{click:function(){return o.handleDelete(n,t)}}})])])])},handleClickNode:function(e){eventBus.emit("setConfig",e)},handleDelete:function(e,t){e.splice(t,1)}},render:function(e){var t=this;return e(draggable,{attrs:{tag:"div",list:this.tasks,group:{put:!0},scrollSensitivity:"10px"},class:"container-node"},[this.tasks.map((function(n,o){return e("div",{key:++flagIndex,on:{click:function(e){e.stopPropagation(),t.handleClickNode(n)}}},[n.children?t.renderContainer(n,o,t.tasks):t.renderChunk(n,o,t.tasks)])}))])}},rules={"accessor-pairs":2,"brace-style":[2,"1tbs",{allowSingleLine:!0}],camelcase:[0,{properties:"always"}],"comma-dangle":[0,"always"],"comma-spacing":[2,{before:!1,after:!0}],"comma-style":[2,"last"],"constructor-super":2,curly:[2,"multi-line"],"dot-location":[2,"property"],"eol-last":2,eqeqeq:[2,"allow-null"],"handle-callback-err":[2,"^(err|error)$"],indent:[2,2,{SwitchCase:1}],"jsx-quotes":[2,"prefer-single"],"new-cap":[2,{newIsCap:!0,capIsNew:!1}],"new-parens":2,"no-array-constructor":2,"no-caller":2,"no-console":"off","no-class-assign":2,"no-cond-assign":2,"no-const-assign":2,"no-control-regex":2,"no-delete-var":2,"no-dupe-args":2,"no-dupe-class-members":2,"no-dupe-keys":2,"no-duplicate-case":2,"no-empty-character-class":2,"no-empty-pattern":2,"no-eval":2,"no-ex-assign":2,"no-extend-native":2,"no-extra-bind":2,"no-extra-boolean-cast":2,"no-extra-parens":[2,"functions"],"no-fallthrough":2,"no-floating-decimal":2,"no-func-assign":2,"no-implied-eval":2,"no-inner-declarations":[2,"functions"],"no-invalid-regexp":2,"no-irregular-whitespace":2,"no-iterator":2,"no-label-var":2,"no-labels":[2,{allowLoop:!1,allowSwitch:!1}],"no-lone-blocks":2,"no-mixed-spaces-and-tabs":2,"no-multi-spaces":2,"no-multi-str":2,"no-multiple-empty-lines":[2,{max:1}],"no-native-reassign":2,"no-negated-in-lhs":2,"no-new-object":2,"no-new-require":2,"no-new-symbol":2,"no-new-wrappers":2,"no-obj-calls":2,"no-octal":2,"no-octal-escape":2,"no-path-concat":2,"no-proto":2,"no-redeclare":2,"no-regex-spaces":2,"no-return-assign":[2,"except-parens"],"no-self-assign":2,"no-self-compare":2,"no-sequences":2,"no-shadow-restricted-names":2,"no-spaced-func":2,"no-sparse-arrays":2,"no-this-before-super":2,"no-throw-literal":2,"no-trailing-spaces":2,"no-undef":2,"no-undef-init":2,"no-unexpected-multiline":2,"no-unmodified-loop-condition":2,"no-unneeded-ternary":[2,{defaultAssignment:!1}],"no-unreachable":2,"no-unsafe-finally":2,"no-unused-vars":[2,{vars:"all",args:"none"}],"no-useless-call":2,"no-useless-computed-key":2,"no-useless-constructor":2,"no-useless-escape":0,"no-whitespace-before-property":2,"no-with":2,"one-var":[2,{initialized:"never"}],"operator-linebreak":[2,"after",{overrides:{"?":"before",":":"before"}}],"padded-blocks":[2,"never"],quotes:[1,"double"],semi:[2,"always"],"use-isnan":2,"valid-typeof":2,"wrap-iife":[2,"any"],yoda:[2,"never"],"prefer-const":2,"no-debugger":"production"===process.env.NODE_ENV?2:0},MonacoEditor={name:"MonacoEditor",props:{language:{type:String,default:"javascript"},value:{type:String,default:function(){return""}},editorHight:{type:String,default:function(){return"200px"}},editorWidth:{type:String,default:function(){return"100%"}},disabled:{type:Boolean,default:function(){return!1}},openDiff:{type:Boolean,default:function(){return!1}}},data:function(){return{monacoEditor:null,valueClone:"",setValueFlag:!1,oldValue:null,diffFlag:!1,layoutWidth:null,layoutHeight:null,model:null}},watch:{value:{deep:!0,immediate:!0,handler:function(e){e&&!this.oldValue&&(this.oldValue=this.value),this.valueClone=e,this.monacoEditor&&this.monacoEditor.setValue(this.valueClone)}}},mounted:function(){this.monacoEditor=this.initMonacoEditor();var e=this.createModel(this.monacoEditor);this.model=e,this.monacoEditor.setModel(e),this.addEditorDataListener(this.monacoEditor),this.initEvents(this.$refs.jsEditor)},destroyed:function(){var e;null===(e=this.$refs.jsEditor)||void 0===e||e.removeEventListener("keydown",this.format),this.monacoEditor.dispose()},methods:{initMonacoEditor:function(){return monaco.editor.create(this.$refs.jsEditor,{language:this.language,theme:"vs",minimap:{enabled:!1},value:this.valueClone,lineNumbers:"off"})},createModel:function(){return monaco.editor.createModel(this.valueClone,this.language)},initEvents:function(e){},addEditorDataListener:function(e){var t=this;e.onDidBlurEditorText((function(){t.valueClone=e.getValue(),t.$emit("input",t.valueClone),t.$emit("change",t.valueClone)}))},verify:function(e){var t=e.getValue(),n=linter.esLinter.verify(t,{rules:rules,parserOptions:{ecmaVersion:"latest",sourceType:"module",ecmaFeatures:{jsx:!0}},env:{browser:!0}}),o=linter.esLinter.getRules(),a=n.map((function(e){var t;return{code:{value:e.ruleId,target:null===(t=o.get(e.ruleId))||void 0===t?void 0:t.meta.docs.url},startLineNumber:e.line,endLineNumber:e.endLine,startColumn:e.column,endColumn:e.endColumn,message:e.message,source:"eslint"}}));monaco.editor.setModelMarkers(e,"eslint",a)},exitFullScreen:function(){var e=document,t=e.cancelFullScreen||e.webkitCancelFullScreen||e.mozCancelFullScreen||e.exitFullScreen;if(void 0!==t&&t)t.call(e);else if(void 0!==window.ActiveXObject){var n=new ActiveXObject("WScript.Shell");null!=n&&n.SendKeys("{F11}")}},isFullScreen:function(){return null!==document.fullscreenElement},fullScreen:function(){if(this.isFullScreen())return this.monacoEditor.layout({width:this.layoutWidth,height:this.layoutHeight}),void this.exitFullScreen();this.layoutWidth=this.monacoEditor.getLayoutInfo().width,this.layoutHeight=this.monacoEditor.getLayoutInfo().height;var e=this.$refs.jsEditor,t=e.requestFullScreen||e.webkitRequestFullScreen||e.mozRequestFullScreen||e.msRequestFullScreen;if(t)this.monacoEditor.layout({width:window.screen.width,height:window.screen.height}),t.call(e);else if(void 0!==window.ActiveXObject){var n=new ActiveXObject("WScript.Shell");null!==n&&n.SendKeys("{F11}")}},format:function(e){if((e.ctrlKey||e.metaKey)&&83===e.keyCode){e.preventDefault();var t=prettier.format("".concat(this.model.getValue()),{parser:"babel",plugins:[parserBabel]});this.monacoEditor.setValue(t)}}},render:function(e){return e("div",{class:"editor-con",style:{height:this.editorHight,width:this.editorWidth}},[e("div",{style:{width:this.editorWidth,height:"100%",position:"relative",visibility:this.diffFlag?"hidden":"visible"},ref:"jsEditor",class:"editor"},[e("span",{class:"el-icon-full-screen full-screen",on:{click:this.fullScreen.bind(this)}}),this.$props.disabled?e("input",{style:{outline:"none",position:"absolute",width:"inherit",height:"inherit",zIndex:99,top:0,left:0,bottom:0,right:0,cursor:"not-allowed"},attrs:{disabled:!0}}):null])])}},top={props:{schema:{type:[Object,Array],default:function(){return[]}},layoutJsx:{type:Object,default:function(){}},jsonSchema:{type:String,default:function(){return"{}"}}},data:function(){return{drawerFlag:!1,dialogVisible:!1}},computed:{},methods:{openDrawer:function(){this.drawerFlag=!0},closeDrawer:function(){this.drawerFlag=!1}},render:function(e){var t=this;return e("div",{class:"top-area"},[e("el-row",{attrs:{gutter:20}},[e("el-col",{attrs:{span:6}},[e("div",{class:"top-title"},["Lego布局编辑器"])]),e("el-col",{attrs:{span:4,offset:14},class:"top-center"},[e("div",{on:{click:this.openDrawer}},[e("span",{class:"el-icon-notebook-2"}),"查看json"]),e("div",{on:{click:function(){t.dialogVisible=!0}}},[e("span",{class:"el-icon-notebook-2"}),"布局信息"]),e("div",{on:{click:function(){dispatch(t,"LegoEditor","publish")}}},[e("span",{class:"el-icon-position"}),"发布布局"])])]),e("el-drawer",{attrs:{title:"布局json",visible:this.drawerFlag,direction:"rtl",beforeClose:this.closeDrawer}},[e(MonacoEditor,{attrs:{language:"json",editorHight:"100%",editorWidth:"100%",value:this.jsonSchema}})]),e("el-dialog",{attrs:{title:"布局信息",visible:this.dialogVisible,width:"30%","before-close":function(){t.dialogVisible=!1}}},[e("div",[this.layoutJsx]),e("span",{slot:"footer",class:"dialog-footer"},[e("el-button",{on:{click:function(){t.dialogVisible=!1}}},["取 消"]),e("el-button",{attrs:{type:"primary"},on:{click:function(){t.dialogVisible=!1}}},["确 定"])])])])}},left={components:{draggable:draggable},props:{data:{type:Object}},methods:{handleClone:function(e){return JSON.parse(JSON.stringify(e))}},render:function(e){var t=this;return e("div",{class:"left-area"},[Object.keys(this.data).map((function(n){return e("div",{class:"components"},[e("h4",{class:"snapshot-group-title"},[e("i",{class:"el-icon-potato-strips"}),"container"===n?"容器组件":"基础组件"]),e(draggable,{class:"snapshot-container",attrs:{tag:"div",list:t.data[n],clone:t.handleClone,sort:!1,group:{pull:"clone",put:!1}}},[t.data[n].map((function(t){return e("div",{class:"snapshot"},["".concat(t.label,"(").concat(t.name,")")])}))])])}))])}},legoSelect={inject:{baseChunk:{default:[]}},props:{schema:{type:Object,default:function(){}},value:{type:[Object,String,Boolean,Array]}},methods:{renderOptions:function(e){var t=this.$createElement,n=e.componentOption;return"all-chunk-data"===n?this.baseChunk.map((function(e){var n=e.label,o=e.name;return t("el-option",{key:o,attrs:{label:n,value:o}})})):Array.isArray(n)?n.map((function(e){var n=e.label,o=e.value;return t("el-option",{key:o,attrs:{label:n,value:o}})})):void 0}},render:function(e){var t=this;return e("el-select",{attrs:{value:this.value,placeholder:"请选择"},on:{change:function(e){dispatch(t,"LegoConfigComponent","change",e)}}},[this.renderOptions(this.schema)])}},legoSwitch={props:{schema:{type:Object,default:function(){}},value:{type:[Object,String,Boolean,Array]}},render:function(e){var t=this;return e("el-switch",{on:{change:function(e){dispatch(t,"LegoConfigComponent","change",e)}},attrs:{value:this.value,"active-color":"#13ce66","inactive-color":"#ff4949"}})}},legoInputNumber={props:{schema:{type:Object,default:function(){}},value:{type:[Object,String,Boolean,Array]}},render:function(e){var t=this;return e("el-input",{on:{input:function(e){return dispatch(t,"LegoConfigComponent","change",e)}},attrs:{value:this.value}})}},LegoConfigComponent={components:{"lego-select":legoSelect,"lego-input":legoInputNumber,"lego-switch":legoSwitch,"lego-jsEditor":legoInputNumber,"lego-input-number":legoInputNumber},props:{schema:{type:Object,default:function(){}},value:{type:[Object,String,Boolean,Array]}},created:function(){this.componentName="LegoConfigComponent"},methods:{renderConfigComponent:function(e,t){return(0,this.$createElement)(e.component,{attrs:{schema:e,value:t}})}},render:function(e){return this.renderConfigComponent(this.schema,this.value)}},right={data:function(){return{currentSchema:{},formData:{options:{},default:{}},activeName:"component-config"}},created:function(){var e=this;eventBus.on("setConfig",(function(t){e.currentSchema=t}))},methods:{renderConfig:function(e){var t=this,n=this.$createElement,o=e.config,a=void 0===o?{}:o,l=e.currentConfigValue,i=void 0===l?{}:l;return n("el-form",{attrs:{"label-width":"110px",size:"mini"}},[Object.keys(a).map((function(e){var o=a[e].label;return n("el-form-item",{attrs:{label:o}},[t.renderConfigFormItem(e,a[e],i[e])])}))])},renderConfigFormItem:function(e,t,n){var o=this,a=this.$createElement,l=t.isBelongOption;return a(LegoConfigComponent,{attrs:{schema:t,defineValue:n,value:this.formData[l?"options":"default"][e]},on:{change:function(t){o.$set(o.formData[l?"options":"default"],e,t)}}})},setChunkConfigData:function(){}},render:function(e){var t=this;return e("div",{class:"right-config"},[e("el-card",[Object.keys(this.currentSchema).length>0?e("el-tabs",{model:{value:t.activeName,callback:function(e){t.activeName=e}}},[e("el-tab-pane",{attrs:{label:"组件属性",name:"component-config"}},[this.renderConfig(this.currentSchema)]),e("el-tab-pane",{attrs:{label:"表单属性",name:"form-config"}},["表单属性"])]):e("div",["暂无配置项"])])])}},LegoEditor={name:"LegoEditor",components:{center:center,left:left,right:right,top:top},provide:function(){return{baseChunk:this.baseChunk}},props:{baseChunk:{type:Array,default:function(){return[]}},layoutJsx:{type:Object,default:function(){}},value:{type:String,default:function(){return"{}"}}},data:function(){return{list:[],allComponents:{}}},computed:{jsonSchema:function(){return JSON.stringify(filterUselessData(this.list),null,2)}},watch:{list:{deep:!0,immediate:!0,handler:function(){this.$emit("input",JSON.stringify(filterUselessData(this.list),null,2))}}},created:function(){this.componentName="LegoEditor",this.init()},methods:{init:function(){this.allComponents={container:containerData,baseChunk:addConfigOnlyChunk(this.baseChunk)},this.list="{}"===this.value?[]:[inverseParse(JSON.parse(this.value))]}},render:function(e){return e("div",{class:"editor"},[e(top,{attrs:{schema:this.list,layoutJsx:this.layoutJsx,jsonSchema:this.jsonSchema}}),e("div",{class:"editor-main"},[e("div",{class:"left"},[e(left,{attrs:{data:this.allComponents}})]),e("div",{class:"center"},[e("el-form",{attrs:{"label-width":"160px"}},[e(center,{attrs:{tasks:this.list}})])]),e("div",{class:"right"},[e(right)])])])},install:function(e){e.component(LegoEditor.name,LegoEditor)}};export{LegoEditor as default};