# 首发后的观察

先观察两周，回答：有人看到吗、有人下载或克隆吗、有人用它完成具体任务吗。

在仓库 **Insights → Traffic** 记录独立访客、浏览量、克隆次数、独立克隆者、来源和热门内容。GitHub 展示过去 14 天的数据；建议每周保存一次日期范围和截图。数据按 UTC 统计。[GitHub 官方说明](https://docs.github.com/en/repositories/viewing-activity-and-data-for-your-repository/viewing-traffic-to-a-repository)

同时记录 Issue 中的具体任务、成功使用与障碍，区分维护者自己、自动化测试和外部用户。Star 可作为关注信号，下载或克隆也不能单独证明实际使用。

| 观察周期（UTC） | 独立访客 | 独立克隆者 | 具体使用反馈 | 首要障碍 | 下一步改动 |
| --- | --- | --- | --- | --- | --- |
| 待填写 | | | | | |

Traffic 是仓库流量，不等于 GitHub Pages 网站的访问量。本演示未加入第三方访客追踪，首次观察以仓库流量和主动反馈为主。

有访问但无人试用时，检查 README 的试用入口；有人试用但卡住时，优先修复该障碍；有重复的真实任务时，再围绕它补案例。没有观察数据时，不把缺少 Star 直接归因为项目价值、发布时间或变现能力。

## GitHub Pages

仓库 Settings → Pages → Source 选择 **Deploy from a branch**，分支 `main`、目录 `/docs`，保存。`docs/.nojekyll` 使演示按静态文件发布。预计网址为 `https://baoshuai921.github.io/google-trends-research-kit/`；启用后需实际打开确认部署成功。
