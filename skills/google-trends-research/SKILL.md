---
name: google-trends-research
description: 使用 Google Trends 查询、比较和解释搜索兴趣，为选品、图书选题、市场研究、内容排期和广告扩词提供可复核证据。
---

# Google Trends 研究

直接理解用户原始语言。先提取要做的决定、市场、研究对象和时间窗口。保留输入中的品牌、日期、引号、加减号和产品属性。只对目标市场的搜索词做本地化，跨国同词比较保持同词。

## 找方法

可运行 `node scripts/search.mjs --query "中文或英文任务" --limit 5`，返回中文方法、英文术语、边界和视频时间戳。也可直接读取相应参考。

- 解释数据和低量问题时读 [data.md](references/data.md)。
- 输入类型、筛选、图表和相关查询读 [explore.md](references/explore.md)。
- 特殊符号、跨语言、季节性、同期、跨国和导出读 [compare.md](references/compare.md)。
- 热搜、实时趋势、事件拆分和 RSS 读 [now.md](references/now.md)。
- 内容缺口、内容日历和 YouTube 搜索读 [seo.md](references/seo.md)。
- 品类、竞品、品牌声量和广告扩词读 [marketing.md](references/marketing.md)。
- 事件核实、地区矩阵和数据叙事读 [story.md](references/story.md)。
- 临近估计、外部指标连接和时序验证读 [research.md](references/research.md)。

## 查询与交付

1. 缺少会改变结论的市场、对象或窗口时，先确认该项。可合理沿用当前会话里用户已给定的条件。
2. 当前按钮、版本或数据渠道需先核对 [access.md](references/access.md)。用可用浏览器、官方页面或已授权 API 取得数据。发现工具不可访问时交付已验证部分，并明确未取得的证据。
3. 固定类别、搜索属性和可比的输入类型，比较词放同一个请求。需要批量计划时使用 `node scripts/query-plan.mjs --help` 生成待复核参数和查询链接。
4. 实时榜单先核对事件及相关性，再回 Explore 查历史。搜索兴趣结合用户实际的销量、成本、站内表现或权威事件做验证。研究型任务记录对齐规则和验证误差。
5. 按 [evidence-template.json](references/evidence-template.json) 留存口径、查询链接、获取日期及可用原始导出。按用户要求的语言交付发现、依据、局限和下一步动作，附来源。仅输出任务需要的内容。

Explore 的 0–100、Trending Now 的搜索量级、API 的一致缩放值分别注明。独立 Explore 图表的指数基准可能不同，跨请求比较需重拉同组。原视频的示例与模拟门槛在重新决策前复核。

完整视频清单和字幕覆盖见 [sources.json](references/sources.json)。开场与结尾视频已核对，其作用是系列导览和收尾。

将研究结果或教材公开发布时，核对 [publication.md](references/publication.md) 中的数据引用和品牌标识条件。
