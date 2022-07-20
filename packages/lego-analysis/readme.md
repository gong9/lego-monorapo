# lego schema解析
## 使用

### 引入
main.js
```js
import SpAnalysis from 'lego-analysis'
import 'lego-analysis/lib/index.css'
Vue.use(SpAnalysis)
```

### 应用
```jsx
 <SpAnalysis
    schema={this.schema}
    chunksDataByScene={this.chunksDataByScene}
    fieldsByScene={this.filesData}
    environment='add'
    requestProps={() => { }}
    legoUtils={{}}
  />
```
组件参数
- schema：玩法schema
- chunksDataByScene：当前场景下的所有组件
- fieldsByScene： 当前场景下的所有字段
- environment： 标明当前属于新建、查看、编辑
- requestProps 所在项目请求方法
- legoUtils： 所在项目想在透出给lego组件的工具方法