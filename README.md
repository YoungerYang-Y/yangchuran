<h1 align="center">Yang ChuRan👼</h1>

<p align="center">
  <a href="https://github.com/YoungerYang-Y/yangchuran"><img src="https://img.  shields.io/github/watchers/YoungerYang-Y/yangchuran?style=social"></a>
  <a href="https://github.com/YoungerYang-Y/yangchuran"><img src="https://img.  shields.io/github/forks/YoungerYang-Y/yangchuran?style=social"></a>
  <a href="https://github.com/YoungerYang-Y/yangchuran"><img src="https://img.  shields.io/github/stars/YoungerYang-Y/yangchuran?style=social"></a>
  <a href="https://github.com/YoungerYang-Y/yangchuran"><img src="https://img.  shields.io/github/last-commit/YoungerYang-Y/yangchuran?logo=github"></a>
</p>

## ⭐ Core Libraries Used

| Name       | Version |
| ---------- | ------- |
| axios      | ^1.9.0  |
| daisyui    | ^5.0.38 |
| less       | ^4.3.0  |
| vue        | ^3.5.15 |
| vue-router | ^4.5.1  |

## 🌵 Directory Structure

```
├── public
│   └── favicon.ico           # LOGO
├── src
│   ├── api                   # Api ajax 等
│   ├── assets                # 本地静态资源
│   ├── components            # 业务通用组件
│   ├── config                # 项目基础配置，包含路由，全局设置
│   ├── locales               # 国际化资源
│   ├── router                # Vue-Router
│   ├── utils                 # 工具库
│   ├── views                 # 业务页面入口和常用模板
│   ├── App.vue               # Vue 模板入口
│   └── main.ts               # Vue 入口 TS
├── index.html                # Vue 入口模板
├── tests                     # 测试工具
├── package.json              # Node.js 项目的配置文件
├── tailwind.config.js        # Tailwind CSS 的配置文件
├── tsconfig.json             # TypeScript的配置文件
├── vite.config.ts            # Vite的配置文件
└── README.md

```

## 📦 Usage

| 命令                    | 描述                                             |
| ----------------------- | ------------------------------------------------ |
| `pnpm install`          | 安装项目的依赖包                                 |
| `pnpm run dev`          | 开发环境下启动项目                               |
| `pnpm run build`        | 类型检查并且构建生产环境下的代码                 |
| `pnpm run preview`      | 预览模式启动应用程序，用于测试性能和可靠性       |
| `pnpm run type-check`   | 类型检查工具                                     |
| `pnpm run lint`         | 代码检查与自动修复 [ESLint](https://eslint.org/) |
| `pnpm run format`       | 格式化所有代码 [Prettier](https://prettier.io/)  |
| `pnpm run format:check` | 检查代码格式是否符合规范                         |

## 🧩 VS Code Plugin

| 名称                          | 功能                                      |
| ----------------------------- | ----------------------------------------- |
| Vue Language Features (Volar) | Vue3 支持，高亮，语法检查                 |
| Vue VSCode Snippets           | Vue 代码模板                              |
| Vue Peek                      | 快速跳转到组件、模块定义的文件            |
| Vite                          | 自动化构建、热更新                        |
| ESLint                        | 语法规则和代码风格的检查工具              |
| Code Spell Checker            | 拼写检查                                  |
| Code Translate                | 翻译                                      |
| Codeium                       | 人工智能编码自动完成和聊天                |
| Gitmoji                       | VSCode 中用于 Git 提交信息的 Gitmoji 工具 |
| Tailwind CSS IntelliSense     | TailwindCSS 语法支持                      |

## 😁 Conventional Commits

| 类型            | 描述                                                          | 语义化版本     |
| --------------- | ------------------------------------------------------------- | -------------- |
| feat            | 新增功能或特性                                                | 增加次版本号   |
| fix             | 修复 bug                                                      | 增加补丁版本号 |
| docs            | 文档相关的变更                                                | 不改变版本号   |
| style           | 代码风格相关的变更（如格式化、缩进等）                        | 不改变版本号   |
| refactor        | 代码重构，不改变功能                                          | 不改变版本号   |
| test            | 添加或修改测试                                                | 不改变版本号   |
| build           | 构建系统或外部依赖相关的变更（如 gulp, npm 等）               | 不改变版本号   |
| ci              | 持续集成配置文件或脚本相关的变更（如 CircleCi, SauceLabs 等） | 不改变版本号   |
| chore           | 其他不影响源码的变更（如更新 .gitignore 等）                  | 不改变版本号   |
| perf            | 提升性能的变更                                                | 增加次版本号   |
| revert          | 撤销之前的提交                                                | 增加补丁版本号 |
| breaking change | 引入破坏性变更，需要在脚注说明变更内容和迁移方法              | 增加主版本号   |
