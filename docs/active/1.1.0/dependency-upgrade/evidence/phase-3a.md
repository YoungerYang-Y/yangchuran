# Phase 3A：Vite 8 兼容性评估

## 状态

- 结果：adopt
- 执行分支：`feature/deps_1.1.0`
- 基线提交：`337580b`
- 阶段提交：`bf7ed72`（`build(deps): 升级 Vite 8 并迁移构建配置`）

## 候选与迁移

- Node.js：`v22.22.3`；pnpm：`10.30.0`。
- 候选：`vite` `^7.3.1` → `^8.3.0`；最终解析版本：`8.3.0`。
- 按 [Vite 7 → 8 迁移指南](https://vite.dev/guide/migration)，Vite 8 改用 Rolldown/Oxc，并将 `build.rollupOptions` 改名为 `build.rolldownOptions`；现有输出命名配置已等价迁移。
- 原配置没有 `optimizeDeps.esbuildOptions`、顶层 `esbuild`、CJS 互操作、手工分包或旧 CSS 压缩选项，因此无需其他迁移。
- Vite 8 的默认浏览器目标会提高；按 [build.target 配置说明](https://vite.dev/config/build-options)，显式固定为 Vite 7 原默认基线：Chrome/Edge 107、Firefox 104、Safari 16，未收窄公开站点兼容范围。

## 开发服务器与回归

- `pnpm dev --host 127.0.0.1 --port 4173`：Vite `8.3.0` 在 `504ms` 就绪；同一运行环境的 `http://127.0.0.1:4173/` 探测返回 HTTP `200`。
- `pnpm test`：exit 0，3 files / 17 tests passed。
- `pnpm type-check`：exit 0。
- `pnpm lint`：exit 0。
- `pnpm build`：exit 0；Vite `8.3.0`、DaisyUI `5.7.37`，CSS gzip `16.72 kB`，首页主 JS gzip `35.34 kB`。
- `pnpm install --frozen-lockfile`：exit 0；受限测试沙箱阻止 Husky 写入 `.git/config`，但不影响锁文件一致性检查，实际 CI 工作区可写。

## 审计与结论

- `pnpm audit --registry=https://registry.npmjs.org --json`：critical 0 / high 4 / moderate 1 / low 1；相对 [Phase 2 审计](./phase-2-audit.json) 未新增 critical/high advisory，high 从 10 降至 4。详情见 [phase-3a-audit.json](./phase-3a-audit.json)。
- 剩余 high 均在工具链传递路径：`unplugin-auto-import > unplugin > rollup`、`unplugin-vue-components > unplugin-utils > picomatch`、`vite > less > image-size`；它们只在本地开发或构建流程解析，不归因为访客站点运行时漏洞。前两项等待 unplugin 生态上游更新；`image-size` 当前审计未给出修复版本，后续继续跟踪 Vite/less 的传递依赖更新。
- Vite 8、配置迁移、浏览器目标、开发服务器、构建、测试、类型、Lint、锁文件与审计门槛均已通过，采用该版本。
