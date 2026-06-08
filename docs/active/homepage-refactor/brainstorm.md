# 首页 + 生日页 + 时间轴 整体重构

## 概述

对 Yang ChuRan 网站三大模块进行重构，引入 GSAP 动效体系，风格定位为"趣味童真"。

## 设计决策

| 决策项     | 选择                                 | 理由                           |
| ---------- | ------------------------------------ | ------------------------------ |
| 首页定位   | 混合型（情感开场 + 内容预览 + 导航） | 兼顾温度与实用性               |
| GSAP 风格  | 趣味童真（弹性缓动 + 浮动 + bounce） | 贴合小女孩成长主题             |
| 生日页策略 | 每年独立页面 + 共享动画组件库        | 每年风格不同，组件复用降低成本 |
| 时间轴交互 | 垂直 ScrollTrigger 逐节点入场        | 自然浏览方式，移动端友好       |
| 首页主视觉 | 楚然真实照片                         | 情感共鸣强于抽象图标           |
| GSAP 依赖  | core + ScrollTrigger（免费）         | 不用 SplitText 付费插件        |

## 首页结构

### ① Hero 区（首屏）

- 楚然精选照片，圆形裁切 + scale 弹入
- 标题"楚然的成长主页"逐字弹性飞入（手动 span 拆分 + stagger）
- 副标题 + 出生天数计数器淡入
- 背景：柔和粉色渐变 + SVG 装饰元素（星星、爱心）floating 循环动画
- 向下滚动提示箭头（bounce 动画）

### ② 精选内容预览区（第二屏）

- "最新里程碑"：取 timeline 最近 2-3 条，卡片式 ScrollTrigger stagger 入场
- "下一个生日倒计时"：动画数字翻转效果
- 每个区块有"查看更多"链接跳转对应页面

### ③ 导航入口区（第三屏）

- 2-3 张功能卡片（成长时间轴、生日集、照片集）
- hover 时 GSAP scale + 阴影变化
- ScrollTrigger stagger 入场

## 成长时间轴

- 顶部标题 stagger 淡入
- 垂直时间线，事件交替左右分布
- 每个节点：照片滑入（弹性缓动）+ 圆点 scale 弹出 + 文字淡入
- ScrollTrigger 在视口 15% 位置触发
- 数据提取到 `src/data/timeline.ts`，结构：`{ id, date, description, image, milestone? }`
- 里程碑节点视觉强调（大圆点、强调色）
- 移动端：单侧布局，照片自适应

## 生日页

### 文件组织

```
src/pages/birthday/
├── one-year-old.vue
├── two-year-old.vue
├── three-year-old.vue
└── components/
    ├── BalloonRise.vue      # 气球升起（elastic Y轴 + 微摆）
    ├── ConfettiBlast.vue    # 彩纸喷射（stagger 粒子爆发）
    ├── PhotoWall.vue        # 照片墙（stagger 逐张弹入）
    ├── BirthdayHero.vue     # 开场横幅（文字逐字弹入 + 背景入场）
    └── PhotoParallax.vue    # 视差照片（ScrollTrigger Y轴视差）
```

### 每页通用结构（可自由编排）

1. 开场：全屏 hero + 气球/彩纸
2. 中段：照片展示（PhotoParallax 或 PhotoWall）
3. 结尾：祝福语 + 跳转下一年/回首页

### 差异化

- 不同主题色/背景
- 不同插画素材
- 组件组合顺序自由
- 动画参数可覆盖

## GSAP Composable 层

| Composable                                            | 职责                              |
| ----------------------------------------------------- | --------------------------------- |
| `useGsapEntrance(el, options)`                        | 元素入场（弹性 scale/fade/slide） |
| `useScrollReveal(el, options)`                        | ScrollTrigger 触发入场            |
| `useFloating(el, options)`                            | 循环浮动/摇摆                     |
| `useStaggerReveal(container, childSelector, options)` | 子元素依次 stagger 入场           |
| `useCountUp(el, target, options)`                     | 数字递增动画                      |

### 设计原则

- 接收 template ref + 配置对象
- `onMounted` 创建，`onUnmounted` 自动 kill
- 默认弹性缓动：`back.out(1.7)` 或 `elastic.out(1, 0.5)`
- 所有 options 可覆盖（duration、delay、ease）

## 不做的事

- 不改路由结构（保持文件路由）
- 不引入后端
- 不做水平滚动时间轴
- 不做全站 ScrollTrigger pin 叙事
- 不用 SplitText 付费插件

## 新增依赖

- `gsap`（含 ScrollTrigger plugin，免费）

## 构建顺序

1. 首页重构
2. 成长时间轴重构
3. 生日页模板化（one → two → three）

## Decisions

| 决策点             | 选项                                                  | 选择 | 理由                                                 |
| ------------------ | ----------------------------------------------------- | ---- | ---------------------------------------------------- |
| 照片资源管理       | A 全 public / B 全 assets / C 按用途分                | C    | 成长照片持续新增不应触发重构建，装饰图享受 hash+压缩 |
| GSAP cleanup 策略  | A composable 自管理 / B 页面级注册 / C gsap.context() | C    | GSAP 官方推荐的框架集成方案，一次 revert 全清        |
| 生日页路由发现     | A 手动配置 / B glob 自动扫描 / C 配置+元数据          | C    | 首页展示需要封面图/主题色等信息，纯扫描不够          |
| countdown.vue 去留 | A 删除 / B 保留重构 / C 替换为生日集索引页            | C    | 倒计时撑不起独立页，索引页对多年生日更有价值         |
| accordion.vue 去留 | A 删除 / B 重构为照片集 / C 搁置                      | C    | 不在核心路径，本次不动，后续迭代再决定               |
