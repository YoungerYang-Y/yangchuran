# Phase 2：DaisyUI 升级与视觉回归

## 状态

- 结果：adopt
- 执行分支：`feature/deps_1.1.0`
- 基线提交：`b53d5e6`
- 阶段提交：`337580b`（`build(deps): 升级 DaisyUI 并完成视觉回归`）

## 环境与候选

- Node.js：`v22.22.3`
- pnpm：`10.30.0`
- 浏览器：Chromium `153.0.8010.12`
- 候选：`daisyui` `^5.5.23` → `^5.7.37`；最终解析版本：`5.7.37`。
- 配置：`src/assets/css/app.css` 中的 `@plugin "daisyui"`、现有主题和生产页面源码均未改动。

## 视觉回归

在同一浏览器环境中，升级前后分别检查首页和“熟客小门”密码弹窗；控制台未出现 error，熟客入口可打开和关闭弹窗，密码输入框与确认按钮可用。

| 视口       | 首页（升级前 / 后）                                                                            | 熟客弹窗（升级前 / 后）                                                                                      |
| ---------- | ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `1440x900` | [前](./screenshots/phase-2-before-desktop.png) / [后](./screenshots/phase-2-after-desktop.png) | [前](./screenshots/phase-2-before-desktop-dialog.png) / [后](./screenshots/phase-2-after-desktop-dialog.png) |
| `375x812`  | [前](./screenshots/phase-2-before-mobile.png) / [后](./screenshots/phase-2-after-mobile.png)   | [前](./screenshots/phase-2-before-mobile-dialog.png) / [后](./screenshots/phase-2-after-mobile-dialog.png)   |

- 手机弹窗宽度为 `375px`，密码输入框宽度为 `305px`，未被裁切。
- 同环境前后未发现 DaisyUI 引入的布局、遮挡、控件主题或交互回归。
- 测试容器缺少中文字体，截图中的中文会显示为字形占位；可访问性树仍读取到实际中文文本。这是检查环境限制，且升级前后相同，不作为 DaisyUI 回归。
- 首页装饰元素在该手机视口下存在既有的水平溢出风险；升级前后均可复现，未由本阶段引入，留待独立 UI 任务处理。

## 回归与审计

- `pnpm test`：exit 0，3 files / 17 tests passed。
- `pnpm type-check`：exit 0。
- `pnpm lint`：exit 0。
- `pnpm build`：exit 0；Vite `7.3.1`、DaisyUI `5.7.37`，CSS gzip `15.47 kB`，首页主 JS gzip `36.58 kB`。
- `pnpm audit --registry=https://registry.npmjs.org --json`：critical 0 / high 10 / moderate 4 / low 1；相对 [Phase 1 审计](./phase-1-audit.json) 和 [初始基线](./baseline-audit.json) 未新增 critical/high advisory。详情见 [phase-2-audit.json](./phase-2-audit.json)。

## 结论与剩余风险

`daisyui@5.7.37` 满足本阶段的构建、交互、视觉和审计门槛，采用该版本。既有工具链审计告警、测试环境中文字体和手机装饰溢出不属于此次更新引入的变更，已如实记录，后续分别处理。
