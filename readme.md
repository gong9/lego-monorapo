# lego
- lego-editor 2b lowcode 编辑器
- lego-components-vue 2b 
- lego-components-react 2c
- lego-g-utils 工具方法库
- lego-example 开发调试项目【非包】
- lego-show-react 原super-h5-plus展示项目【非包】

## 开发
> 请尽量使用pnpm
- pnpm i 安装依赖
- pnpm dev 启动测试项目，在此项目中进行包的调试
## 发布
- 修改changeset文件下配置文件  baseBranch：分支【main、alpha、beta】
- pnpm changeset 选择要发布的包 注意：版本类型 major：大功能 minor：小功能 patch：bug
- pnpm release:version 升版本
- push到主分支进行发布 [请不要进行本地发布]