# 分阶段依赖升级

## Overview

在不改变果果小小世界公开功能与熟客入口行为的前提下，以可回退、可验证的阶段升级前端依赖，并明确记录未处理的大版本风险。

## Behavior: 低风险依赖升级

### Scenario: 兼容范围内的依赖可用

Given 项目使用 Node.js 22.22.1 或更高版本以及 pnpm 10.30
When 第一阶段完成已列入设计契约的低风险依赖升级
Then 开发服务器在约定端口就绪且首页返回成功响应
And 类型检查、Lint、测试和生产构建均成功退出
And 公开首页、年度故事和熟客入口的现有路由仍可构建

### Scenario: 未使用的运行时依赖

Given `@vueuse/core` 未被源码或构建配置导入
When 第一阶段整理运行时依赖
Then `@vueuse/core` 不再出现在直接依赖中
And 生产构建不引入该包

### Scenario: 安装或校验失败

Given 某个候选依赖升级后任一验证命令失败
When 该阶段结束前进行回归校验
Then 失败的候选不与已验证候选一同提交
And 失败原因和下一步验证条件被记录

## Behavior: 样式库视觉回归控制

### Scenario: DaisyUI 小版本升级

Given 第一阶段依赖已验证
When DaisyUI 从 5.5.23 升级到 5.7.37
Then 在 375×812 与 1440×900 视口中，主页、熟客密码弹窗、按钮和输入框样式可正常呈现
And 现有主题配置仍可被生产构建解析

### Scenario: 视觉差异出现

Given DaisyUI 升级后出现组件尺寸、颜色或层叠差异
When 在桌面和手机视口检查公开首页
Then 不提交未经修复或明确接受的视觉差异
And 检查结果、截图位置和接受决定被记录为该阶段证据

### Scenario: 样式构建失败

Given DaisyUI 插件或 Tailwind 插件配置无法编译
When 执行生产构建
Then 该阶段不进入提交状态
And 依赖版本恢复到上一已验证阶段

## Behavior: 构建与类型工具链隔离升级

### Scenario: Vite 主版本评估

Given 当前 Vite 7 的构建配置、路由和自动导入链路可用
When 评估 Vite 8
Then 构建配置、开发服务器、生产构建和全量校验在独立阶段验证
And 通过时以独立提交采用 Vite 8；不通过时保留 Vite 7 并记录拒绝结论
And 评估结果不影响已完成的低风险阶段

### Scenario: TypeScript 主版本评估

Given 项目使用 Vue 单文件组件与 `vue-tsc`
When 评估 TypeScript 6 或 7
Then 仅在 `vue-tsc`、生成路由类型和编辑器 TypeScript 服务均兼容时采用候选版本
And 通过时以独立提交采用候选版本；不通过时保留现有版本并记录拒绝结论
And TypeScript 7 不因“存在最新版本”自动进入项目依赖

### Scenario: 审计仍有传递依赖告警

Given npm 官方审计报告传递依赖告警
When 各阶段完成后重新审计
Then 与阶段开始前的审计基线比较，并记录告警总数、严重度、来源链及运行时或工具链分类
And 不使用会跨主版本且未验证的自动修复

## Constraints

- 每个已提交阶段必须通过 `pnpm test`、`pnpm type-check`、`pnpm lint` 与 `pnpm build`，退出码均为 0。
- 使用 pnpm 10.30，并将 Node.js 引擎下限提升为 `>=22.22.1` 以满足 lint-staged 运行时要求；自动发布工作流使用 Node 22.22.3 与 pnpm 10.30。
- 每一阶段单独提交；不执行 `pnpm audit --fix`、不更新生产内容数据，也不修改熟客密码策略。
- DaisyUI 必须在 375×812 与 1440×900 视口检查；Vite 与 TypeScript 主版本评估必须在独立阶段完成。
- 每个阶段在 `docs/active/1.1.0/dependency-upgrade/evidence/` 留下候选版本、命令结果、审计摘要、视觉检查（如适用）、提交 SHA 与剩余风险；证据缺失时该阶段不得提交。
- 不改变现有浏览器兼容基线或构建产物策略；若主版本迁移必须改变其中任一项，须在该阶段证据中说明并明确接受。
