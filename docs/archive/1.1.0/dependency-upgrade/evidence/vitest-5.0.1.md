# Vitest 5.0.1 补丁升级

## 状态

- 结果：adopt
- 执行分支：`feature/deps_1.1.0`
- 基线提交：`f091c9b`
- 阶段提交：`f78fa4a`（`build(deps): 升级 Vitest 补丁版本`）

## 版本与环境

- 候选与最终解析版本：Vitest `5.0.0` → `5.0.1`。
- Node.js：`v22.22.3`；pnpm：`10.30.0`。
- 锁文件通过 `pnpm` 解析；复核时执行 `pnpm install --frozen-lockfile --ignore-scripts`，退出码为 0。

## 验证结果

| 检查              | 结果                                |
| ----------------- | ----------------------------------- |
| `pnpm test`       | 退出码 0；3 个文件、17 个测试通过。 |
| `pnpm type-check` | 退出码 0。                          |
| `pnpm lint`       | 退出码 0。                          |
| `pnpm build`      | 退出码 0。                          |

## 审计与结论

官方 registry 审计结果为 critical 0 / high 4 / moderate 1 / low 1；与升级前对比没有新增 critical 或 high。遗留告警均位于构建工具链的传递依赖，持续跟踪见[技术债](../../../tech-debt-tracker.md)。

补丁未改变页面、路由或生产内容，因此以独立提交采用。
