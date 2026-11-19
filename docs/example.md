# 例子：美国收纳用品研究起点

**问题：** 我准备向美国销售收纳用品，想了解 `storage box` 与 `storage bin` 的叫法差异和季节性，决定何时做小批试售。

## 1. 找到对应方法

在仓库根目录执行：

```sh
node skills/google-trends-research/scripts/search.mjs --query "美国收纳盒 季节性" --limit 3
node skills/google-trends-research/scripts/search.mjs --id seasonality
```

结果包含 `id`、中文操作、解释边界、视频时间戳和官方帮助。季节性方法建议先观察 3–5 年，区分重复起涨与一次新闻事件。这个年数是研究起点，应按业务与数据量调整。

## 2. 固定比较口径

```sh
node skills/google-trends-research/scripts/query-plan.mjs --terms "storage box|storage bin" --geo US --start 2021-01-01 --end 2025-12-31 --property web
```

生成的 `parameters` 应包含：

```json
{
  "terms": ["storage box", "storage bin"],
  "geo": "US",
  "start": "2021-01-01",
  "end": "2025-12-31",
  "category": "0",
  "property": "web"
}
```

`entryUrl` 是当前 Explore 入口。`classicQueryUrl` 携带经典版参数，可能受到经典版退出或登录状态影响。两种情况都要在网页核对 **字词/主题类型、国家、起止日期、类别、搜索属性**。

## 3. 在真实网页取得证据

在同一个比较请求中输入两个搜索字词，核对颜色与曲线。记录每年起涨和峰值，检查末期是否为完整统计周期。按当前界面导出 CSV，保留获取日期与链接。新版页面需登录时，在 Google 的认证界面完成；本地脚本不读取或保存登录凭据。

可参照 [带截图的五页样章](sample/README.md)。样章截图为 2026-11-17 的经典版历史教学记录，新版控件按实际页面定位。

## 4. 记录观察，再作决策

复制 [证据模板](../skills/google-trends-research/references/evidence-template.json) 到自己的研究记录，填写实际参数、CSV 路径、查询日期、观察与局限。保留“看到了什么”和“还需核实什么”的区别。

| 记录 | 应填写的实际证据 |
| --- | --- |
| 叫法差异 | 同图内整体水平及曲线，注明搜索字词类型 |
| 季节性 | 哪些年份、哪些周/月重复起涨，有无例外 |
| 业务验证 | 对应时期的订单、库存、价格、物流提前期或小样访谈 |
| 下一步 | 一次有范围的试售，写清预算、指标、复核日期与停止条件 |

这份例子没有附实际历史 CSV，不能据此断定哪个叫法更好、哪个月份应备货或能卖多少。取得数据后，搜索兴趣仍需与销售、成本和站内表现结合。

## 5. 可选：检查实时线索

```sh
node skills/google-trends-research/scripts/rss.mjs --geo US
```

实际返回什么事件就记录什么，不假设榜单包含收纳词。只有与研究对象相关且经过事件核实的线索才进入进一步研究。网络由代理管理且 Node 版本支持时，可在 `node` 后加 `--use-env-proxy`。

来源：[Trends 数据口径](https://support.google.com/trends/answer/4365533?hl=en)、[季节性与网站实践](https://developers.google.com/search/docs/monitor-debug/trends-start)、[导出与引用](https://support.google.com/trends/answer/4365538?hl=en)。
