# AGENTS.md

本文件是智能体的唯一入口，保持为"地图而不是手册"。

## 项目概述

Yang ChuRan（楚然）— 一个记录小女孩成长的个人网站。使用 Vue 3 + Vite + Tailwind CSS 4 + DaisyUI 构建的纯前端 SPA，部署在 Vercel 上。目标用户是家人和朋友，内容包括成长时间线、生日页面、照片展示等。

## 全局规范

1. 智能体优先遵循项目规范（`AGENTS.md`、`ARCHITECTURE.md`、`docs/design-docs/`）。项目约束 > 智能体全局约束。
2. Git Conventional Commits，message 中文。格式：`<type>(<scope>): <中文描述>`。
3. 文档与代码冲突时以代码为准并回写文档。

## 导航

### A. 长期约束（只读，修改需架构 RFC）

- 系统边界与依赖方向：[`ARCHITECTURE.md`](./ARCHITECTURE.md)
- 工程信条：[`docs/design-docs/core-beliefs.md`](./docs/design-docs/core-beliefs.md)
- 业务领域划分：[`docs/DOMAINS.md`](./docs/DOMAINS.md)

### B. 流转文档

- 活跃版本：[`docs/active/index.md`](./docs/active/index.md)
- 版本归档：[`docs/archive/index.md`](./docs/archive/index.md)
- 技术债：[`docs/active/tech-debt-tracker.md`](./docs/active/tech-debt-tracker.md)
- 设计决策：[`docs/design-docs/index.md`](./docs/design-docs/index.md)

### C. 参考与产物

- 自动生成的文档（禁止手改）：[`docs/generated/`](./docs/generated/)

## 开发命令

```bash
pnpm dev          # 开发服务器
pnpm build        # 类型检查 + 生产构建
pnpm preview      # 预览生产构建
pnpm lint         # ESLint 检查
pnpm lint:fix     # ESLint 自动修复
pnpm type-check   # TypeScript 类型检查
pnpm dep:check    # 检查依赖更新
pnpm dep:update   # 升级依赖
```
