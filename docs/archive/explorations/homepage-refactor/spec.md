---
id: homepage-refactor
status: in-progress
owner: ORPHAN
created: 2026-06-07
updated: 2026-09-15
---

# Homepage Refactor Spec

## Overview

为家人和朋友提供一个温馨、有动效的成长记录网站入口，通过首页引导用户探索成长时间轴和历年生日页。

## Behavior: 首页 Hero 入场动画

### Scenario: 首次加载完成

Given 用户访问首页
When 页面加载完成（DOM ready）
Then 照片元素从 scale(0) 弹性动画至 scale(1)
And 标题文字逐字依次弹入（间隔 ≤ 100ms/字）
And 副标题和天数计数器淡入
And 装饰元素（星星、爱心）开始循环浮动动画

### Scenario: 天数计数器显示

Given 楚然出生日期为 2022-11-15
When 页面加载完成
Then 显示从出生至今的天数（精确到天）
And 天数以数字递增动画从 0 滚动到目标值

### Scenario: 问候语时段切换

Given 当前时间为上午 9:00
When 页面加载完成
Then 问候语显示"早上好！新的一天开始了 ☀️"

### Scenario: 下午时段

Given 当前时间为下午 14:00
When 页面加载完成
Then 问候语显示"下午好！继续加油 💪"

### Scenario: 晚上时段

Given 当前时间为晚上 20:00
When 页面加载完成
Then 问候语显示"晚上好！今天辛苦了 🌆"

### Scenario: 凌晨边界

Given 当前时间为凌晨 3:00
When 页面加载完成
Then 问候语显示"夜深了，注意休息 🌙"

## Behavior: 首页精选内容预览

### Scenario: 最新里程碑展示

Given timeline 数据中有 5 条记录
When 用户滚动至精选预览区域
Then 显示最新的 2-3 条里程碑卡片
And 卡片以 stagger 动画依次入场（间隔 ≤ 150ms）
And 每张卡片显示日期、描述、照片缩略图

### Scenario: 生日倒计时展示

Given 楚然出生日期为 2022-11-15，当前日期为 2026-06-08
When 用户滚动至倒计时区域
Then 显示距下一个生日（2026-11-15）的天/时/分
And 数字以递增动画入场

### Scenario: timeline 数据为空

Given timeline 数据中有 0 条记录
When 用户滚动至精选预览区域
Then 里程碑区域不展示（不显示空状态占位）
And 倒计时区域正常展示

## Behavior: 首页导航入口

### Scenario: 导航卡片展示与跳转

Given 页面已加载
When 用户滚动至导航入口区域
Then 显示功能卡片（成长时间轴、生日集）以 stagger 动画入场
And 点击"成长时间轴"卡片跳转至 /timeline
And 点击"生日集"卡片跳转至 /birthday

### Scenario: 导航卡片 hover 交互

Given 用户处于桌面端
When 鼠标 hover 某张导航卡片
Then 卡片 scale 放大至 1.05 并增加阴影

### Scenario: 移动端触控

Given 用户处于移动端（无 hover）
When 用户点击导航卡片
Then 直接跳转，无 hover 态

## Behavior: 成长时间轴滚动展示

### Scenario: 桌面端交替布局

Given 用户在桌面端（viewport ≥ 768px）访问 /timeline
When 页面加载后向下滚动
Then 时间节点交替出现在时间线左右两侧
And 每个节点在进入视口 15% 位置时触发入场动画
And 照片从对应侧弹性滑入，圆点 scale 弹出，文字淡入

### Scenario: 移动端单侧布局

Given 用户在移动端（viewport < 768px）访问 /timeline
When 页面加载后向下滚动
Then 时间线靠左显示，所有节点在右侧
And 入场动画与桌面端一致（方向统一从右滑入）

### Scenario: 里程碑节点高亮

Given timeline 数据中某条 milestone 为 true
When 该节点进入视口
Then 圆点尺寸大于普通节点
And 使用强调色（区别于普通节点的粉色）
And 有光晕脉冲效果

### Scenario: 快速滚动

Given 用户快速滚动跳过多个节点
When 多个节点同时进入视口
Then 已进入视口的节点立即展示（不排队等待）
And 动画不阻塞滚动流畅性

## Behavior: 生日集索引页

### Scenario: 年份卡片展示

Given birthdays 配置中有 3 年数据（1岁、2岁、3岁）
When 用户访问 /birthday
Then 显示顶部倒计时（距下一个生日）
And 下方展示 3 张年份卡片，每张有独立主题色和图标
And 卡片以 stagger 动画入场

### Scenario: 点击进入具体生日页

Given 索引页显示了"一岁"卡片
When 用户点击该卡片
Then 跳转至 /birthday/one-year-old

### Scenario: 配置中无数据

Given birthdays 配置为空数组
When 用户访问 /birthday
Then 仅显示倒计时，卡片区域不展示

### Scenario: 配置数据格式降级

Given birthdays 配置中某条 date 字段为无效日期字符串
When 用户访问 /birthday
Then 该条卡片仍正常展示（label、icon、themeColor 可用）
And 卡片上不显示日期信息

## Behavior: 单个生日页展示

### Scenario: 开场动画

Given 用户进入某个生日页（如 /birthday/one-year-old）
When 页面加载完成
Then 气球元素从下方弹性升起
And 彩纸从中心爆发散落
And 生日祝福文字逐字弹入

### Scenario: 照片展示滚动

Given 生日页中段有照片区
When 用户向下滚动
Then 照片以视差效果或 stagger 弹入展示（取决于该年页面选择）

### Scenario: 页面间导航

Given 用户在"一岁"生日页
When 滚动到底部
Then 显示"→ 两岁生日"和"← 回首页"按钮
And 点击"两岁生日"跳转至 /birthday/two-year-old

### Scenario: 最后一年的生日页

Given 用户在最新一年的生日页（当前为三岁）
When 滚动到底部
Then 不显示"下一年"按钮，仅显示"← 回首页"

## Behavior: 页面动画生命周期管理

### Scenario: 页面离开时清理

Given 用户在 /timeline 页面，页面上有多个 ScrollTrigger 实例
When 用户通过路由跳转至 /birthday
Then 所有 /timeline 页面的 GSAP 动画实例被销毁
And 无 ScrollTrigger 残留在全局
And 无内存泄漏

### Scenario: 浏览器后退

Given 用户从 /timeline 跳转到 /birthday 后点击浏览器后退
When 回到 /timeline
Then 动画重新初始化并正常执行
And 不出现动画状态残留（如元素停留在动画终态）

### Scenario: 快速连续切换

Given 用户在 500ms 内连续切换 3 个页面
When 每个页面的入场动画尚未完成就切走
Then 未完成的动画被中断并清理
And 最终停留的页面动画正常执行

## Constraints

- 首屏加载性能：LCP ≤ 2.5s（Vercel CDN + 静态资源）
- GSAP 包体积：core + ScrollTrigger ≤ 50KB gzipped
- 动画帧率：所有动画保持 ≥ 55fps（基准：中端移动设备）
- 照片懒加载：非首屏照片不阻塞首屏渲染
- 移动端兼容：iOS Safari 15+、Android Chrome 90+
- 无障碍：prefers-reduced-motion 开启时跳过所有动画，直接展示终态
