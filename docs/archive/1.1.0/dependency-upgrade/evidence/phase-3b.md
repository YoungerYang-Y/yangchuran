# Phase 3B：TypeScript 6 兼容性评估

## 状态

- 结果：retain-and-record
- 执行分支：`feature/deps_1.1.0`
- 基线提交：`bf7ed72`
- 阶段提交：`fb04110`（`build(types): 清理 TypeScript 6 弃用配置`）；仅包含已验证的 `tsconfig` 迁移与评估证据，`typescript` 保持 `~5.9.3`，未提交 6.x 候选。

## 候选与 CLI 试验

- Node.js：`v22.22.3`；pnpm：`10.30.0`。
- 官方 registry 查询到 TypeScript `6.0.2`、`6.0.3`；使用最新候选 `6.0.3` 做临时试验，随后恢复为已验证的 `5.9.3`。
- 初始 `pnpm type-check` 与 `pnpm build` 均被 `TS5101` 阻断：`baseUrl` 在 TypeScript 6 中弃用，并将在 TypeScript 7 停止工作。
- 不采用 `ignoreDeprecations` 掩盖未来断点；移除冗余的 `baseUrl`，并将 `paths["@/*"]` 改为相对的 `./src/*`。该迁移满足 TypeScript 6 对无 `baseUrl` 路径值的要求，也继续兼容 TypeScript 5.9。
- 迁移后，候选下的 `pnpm test`（3 files / 17 tests passed）、`pnpm type-check`、`pnpm lint` 和 `pnpm build` 均以 exit 0 完成。

## 资料、审计与保留决定

- [TypeScript 6.0 发布说明](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-6-0.html)确认它是面向 TypeScript 7 的过渡版本，并列出 `baseUrl` 等迁移项；本项目已用实际 CLI 试验验证所需改动。
- [Vue TypeScript 指南](https://vuejs.org/guide/typescript/overview)要求 Vue SFC 使用 `vue-tsc` 做命令行类型检查，并推荐 Vue - Official（Volar）提供编辑器内 SFC 类型支持。
- `pnpm audit --registry=https://registry.npmjs.org --json`：critical 0 / high 4 / moderate 1 / low 1；相对 [Phase 3A 审计](./phase-3a-audit.json) 未新增 critical/high advisory。详情见 [phase-3b-audit.json](./phase-3b-audit.json)。
- 当前环境没有可复核的项目级 Vue - Official/Volar 编辑器会话，无法完成模板 props、事件、ref、自动导入和生成路由类型提示的人工验证。按本版本门槛，不能仅凭 CLI 通过而采用 TypeScript 6。
- 因此恢复 `typescript` `~5.9.3`；保留已验证的 `tsconfig` 去弃用迁移，为后续在真实编辑器环境中复测 TypeScript 6.0.3 做准备。TypeScript 7 未安装，也未纳入本版本。
