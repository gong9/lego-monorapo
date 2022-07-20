# lego相关【解析、组件】

- lego-editor 乐高布局编辑器
- lego-example 开发调试项目

## 开发
- pnpm i 安装依赖
- pnpm dev 启动测试项目，在此项目中进行包的调试

## 发包
- 修改changeset文件下配置文件  baseBranch：分支【master、alpha、beta】
- pnpm changeset 选择要发布的包 注意：版本类型 major：大功能 minor：小功能 patch：bug
- pnpm release:version 升版本
- push 发布 [请不要进行本地发布]