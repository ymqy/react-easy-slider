# react-easy-slider

Slider Component of React

## 设计

- 支持 Plugin 机制，组件可插拔设计
- 所有组件样式支持自定义
- 兼容 PC/H5，支持响应式
- 支持自定义过渡动画
- 支持触摸滑动、鼠标拖动

## 性能优化

- 防止多余刷新
- 交互支持防抖、节流
- use what changed
- why did you render
- profiler

## 测试

- jest
- 测试用例
- 单元测试
- 集成测试
- 测试覆盖率
- 代码覆盖率
- 可访问性测试
- 混沌工程测试
- 兼容性测试：浏览器兼容性、样式兼容性

## 打包

- prepack
- 严格按照 Tree-Shaking 模式开发
- 打包体积优化（Uglify、删除注释、压缩）
- 样式体积优化
- sourcemap
- min.js iife
- banner
- development mode
- production mode
- babel helper 是否分离
- 第三方库分离

## 兼容性

## 技术栈

- Rollup
- React + Hooks
- Babel 分环境配置
- TypeScript + d.ts
- CSS
- Less
- Eslint 参考 vue-next，hook 检查
- Prettier
- Jest
- Tree-Shaking
- Commit 规范 husky precommit lint-staged
- StoryBook 部署
- CDN 部署
- Github Pages 部署
- Github Actions (Workflow/CI/Travis)
- npm 发布
- pnpm
- a11y
- github verified

## 代码质量及规范

- 代码规范
- 命名规范
- 代码风格
- 各种 linter
- https://github.com/umijs/fabric
- eslint 检查
- prettier 格式化

## Todo

- 文档编写

## Question

- dist 如何自动清理 rimraf
- 环境变量设置 cross-env
- 如何优化打包体积
- 开发时如何预览组件

## 预览

- npm start 预览
- examples/cra 缺点：无法监听到源码改变，作为开发时预览不合适

## 骚气的 README

- 标签：维护状态、build、code style、npm、downloads、license、代码覆盖率、CI
- 配图
- 使用教程
- 文档
