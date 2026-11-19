# 渠道、账号与授权

官方页面核对日期为 2026-11-18。每次用账号、API 或大规模查询前复核当前入口和授予的能力。

## 网页与实际按钮

从 [Explore](https://trends.google.com/explore) 进入。当前未登录入口显示 Sign in 以体验新版，页面还显示即将退出的经典版入口。经典版可用时，可按它的 Compare、单项更多菜单和 Change filters 操作。支持不同版本时按页面实际控件定位，特别核对国家、日期、类别和搜索属性。网页交互通常涉及 Google 账号登录，用户在认证界面自行完成。网页查询与 CSV 导出使用网页功能，Trends API 密钥由 API 渠道单独管理。

新版官方帮助列出最多 8 个比较组，经典版为 5 个。新版有快捷比较，使用前读清其参照期。自定义窗口按单项过滤做等长比较。[比较说明](https://support.google.com/trends/answer/4359550?hl=en) · [快捷比较](https://support.google.com/trends/answer/17261722?hl=en)

[Trending Now](https://trends.google.com/trending?geo=US) 有国家、时间、类别、状态和排序筛选。典型时间为 4 小时、24 小时、48 小时、7 天。当前按钮名称与状态以网页为准。导出提供 CSV、剪贴板和 RSS 等可用方式。[操作说明](https://support.google.com/trends/answer/3076011?hl=en)

## 官方 API alpha

Google 仍提供 alpha 申请入口，优先考虑能较快开始明确用例并提供反馈的开发者。需 Google 账号申请并获准，再按获准项目的官方文档完成认证、项目配置和配额核对。不要从公开介绍推断某个用户已获访问权限，也不要要求用户在聊天里粘贴密钥。

公开介绍提供滚动约五年数据、日周月年聚合、地区和次区域，以及跨请求一致缩放。alpha 数据仍表示搜索兴趣。公开介绍未列统一公开价目表，商业使用条件、配额和收费按获准方案确认。用户现有已授权凭据可按其环境正常复用。尚未获准的任务优先使用用户能访问的网页、导出或其他适配渠道。[申请与能力](https://developers.google.com/search/apis/trends) · [alpha 公告](https://developers.google.com/search/blog/2025/07/trends-api)

## BigQuery 公共数据

适合美国和国际数据集里已有的 Top 25 与 Top 25 Rising 查询及其历史。它的覆盖范围应先查表架构、刷新分区和地理范围。任意自定义商品词的历史任务先评估它是否已在数据集中。

需要用户可用的 Google Cloud 项目。可先看 BigQuery Sandbox；进入付费计量路径时核对用户授权、计费项目及扫描字节限制。先按刷新日期和地区过滤，预估扫描量后再跑。当前官方帮助列免费用量以及超出后的正常 BigQuery 计价，具体以执行时的 Cloud 页面为准。[数据集入门](https://support.google.com/trends/answer/12764470?hl=en) · [BigQuery 计价](https://cloud.google.com/bigquery/pricing)

## 辅助渠道

- 公开 RSS 可按地区读取，服务端仅返回其实际提供的字段。按需运行 `node scripts/rss.mjs --geo US`。网络受代理控制时可用 `node --use-env-proxy scripts/rss.mjs --geo US`，该选项需 Node 24 或支持该标志的版本。已有网页工具时可直接读官方链接。
- Search Console 用于自己网站已获授权的表现数据。用户自行完成账号和站点权限。查看授权范围后使用。[权限帮助](https://support.google.com/webmasters/answer/7687615?hl=en)
- Google Ads 的投放关键词、CPC 和 ROI 需要用户已授权的广告账号或提供的导出。只在用户明确授权实际投放后创建或修改广告。Trends 的关联词用于生成测试候选。[账号访问](https://support.google.com/google-ads/answer/9978556?hl=en)
- 外部商品评价、销量和研究数据记录出处、时期和统计定义。账号或付费数据库涉及到的访问条件按该来源处理。

## 记录与引用

保留查询口径、导出日期、时区和时间粒度。Google 提供的历史样例与当前界面可能不同。引用数据注明 Google Trends，图表按能取得的数据和实际授权生成。[导出、嵌入与引用](https://support.google.com/trends/answer/4365538?hl=en)
