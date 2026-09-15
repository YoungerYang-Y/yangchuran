# 首页卡通房间场景

## 场景描述

首页为单屏不滚动，背景是一个**卡通儿童房间的正视图**，统一可爱卡通风格：

**窗户区域（上方居中）：**

- 方形窗户 + 粉色/白色窗帘（微摆动效）
- 窗外：蓝天 + 白云（缓慢移动）+ 太阳

**墙面：**

- 墙壁为浅奶黄色/淡粉色
- 墙上挂一幅**中国地图**（卡通风格，区分每个省份不同颜色）

**家具：**

- **小熊床**（左侧）：卡通床，床头有小熊图案
- **书桌**（右侧）：木质卡通书桌，桌上放一本打开的书

**地面：**

- 木地板 + 圆形彩色地毯
- 地毯上：两个**礼盒**（互动导航元素，hover 打开显示"成长记录"/"生日集"）
- 地毯旁：一只**英短蓝白猫**（卡通坐姿，偶尔眨眼/摇尾巴动效）

## 动效规划

| 元素 | 动效                                 |
| ---- | ------------------------------------ |
| 窗帘 | GSAP 微摆（sine.inOut 循环）         |
| 云朵 | 缓慢水平移动（无限循环）             |
| 太阳 | 轻微脉冲光晕                         |
| 猫咪 | 眨眼（间歇 CSS animation）+ 尾巴摇摆 |
| 礼盒 | hover 打开盖子 + 文字浮出 + 星星闪烁 |
| 书页 | 偶尔翻动动画                         |

## 实现方案

需要专业插画素材（代码 SVG 无法实现统一卡通风格）：

**方案 A（推荐）：AI 生成 + 分层导出**

1. 用 AI 绘图工具生成完整房间场景
2. 分层导出：背景层（墙+地板）、家具层、窗外层、互动元素单独切图
3. 代码集成：CSS 定位各层 + GSAP 驱动动效

**方案 B：找现成素材拼装**

1. 从 storyset.com / undraw.co 等找卡通房间元素
2. 拼装组合 + 统一色调

**方案 C：请插画师绘制**

1. 提供本文档作为需求说明
2. 输出分层 PSD/SVG

## 素材需求清单

- [ ] 房间整体背景（墙壁 + 地板 + 窗户框架）
- [ ] 窗帘（单独切图，需要做动画）
- [ ] 窗外场景（蓝天 + 云朵 + 太阳，云朵单独切）
- [ ] 中国地图（卡通风格，省份区分颜色）
- [ ] 小熊床
- [ ] 书桌 + 书
- [ ] 圆形地毯
- [ ] 礼盒 x2（单独 SVG，需要做 hover 互动）
- [ ] 英短蓝白猫（需要眨眼帧）

## AI 绘图参考提示词

```
A cute cartoon children's bedroom front view illustration, flat design style,
soft pastel colors. Features: a window with pink curtains showing blue sky
white clouds and sun outside, a colorful map of China on the wall with
different colored provinces, a small bed with teddy bear headboard on the left,
a wooden desk with an open book on the right, a round colorful carpet on
wooden floor with two wrapped gift boxes, a British Shorthair blue-and-white
cat sitting on the carpet. Clean vector illustration style, kawaii aesthetic,
consistent art style throughout. White/cream colored walls.
```
