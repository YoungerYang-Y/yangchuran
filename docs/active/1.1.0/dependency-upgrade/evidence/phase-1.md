# Phase 1：低风险依赖升级与 VueUse 清理

## 状态

- 结果：adopt
- 执行分支：`feature/deps_1.1.0`
- 基线提交：`2b9491108dd877b25bc972c36918df2d6d04ce89`
- 阶段提交：`b53d5e6`（`build(deps): 完成第一阶段低风险依赖升级`）

## 基线环境与验证

- Node.js：`v22.22.3`
- pnpm：`10.30.0`
- 基线验证：`pnpm test`（3 files / 17 tests passed）、`pnpm type-check`（exit 0）、`pnpm lint`（exit 0）。
- 审计基线：[`baseline-audit.json`](./baseline-audit.json)，官方 registry，critical 0 / high 32 / moderate 12 / low 2。

## 候选与范围

- 依赖目标、VueUse 清理和 CI 运行时同步以 [design.md](../design.md) 的 Phase 1 契约为准。
- `@vueuse/core` 已从直接依赖移除，且在源码、测试、构建配置、提交钩子中无引用。`unplugin-auto-import` 的 optional peer resolution 仍在锁文件中保留 `@vueuse/core@14.3.0`，仅属于开发工具链解析，不进入直接运行时依赖。

## 结果记录

- 依赖目标已全部解析到设计约定版本；`package.json`、`pnpm-lock.yaml` 与自动发布工作流中的 Node/pnpm 版本已同步更新。
- 回归：`pnpm test`（3 files / 17 tests passed）、`pnpm type-check`、`pnpm lint`、`pnpm build` 均以退出码 0 完成。
- 构建产物：Vite 7.3.1 生产构建成功，首页主 JS gzip 为 36.59 kB；本阶段未改浏览器基线或生产内容。
- 复审计：[`phase-1-audit.json`](./phase-1-audit.json)，critical 0 / high 10 / moderate 4 / low 1；相对基线没有新增 critical/high advisory。
