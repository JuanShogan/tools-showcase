# 我的工具箱

个人工具展示网站，纯静态页面（HTML + CSS + 原生 JS），无任何构建步骤，
托管于 **Cloudflare Pages**，每次 `git push` 自动部署。

> **当前状态：作品开发中。**
> 网站已上线，但作品内容暂时下架整理，页面显示「开发中」占位。
> 设计风格（Apple 风格：超大字号 / 黑白分区 / 滚动渐入）已就位，
> 作品做好之后直接替换占位内容即可。

## 本地预览

直接双击 `index.html` 就能看。

## 目录结构

```
tools-showcase/
├── index.html          # 页面主体
├── assets/
│   ├── style.css       # 样式（配色在 :root 变量里改）
│   └── script.js       # 滚动渐入、导航变色、视差
├── DEPLOY.md           # 部署指南（GitHub + Cloudflare 全流程）
├── push-to-github.bat  # 一键推送脚本
└── README.md
```

## 页面分区

| 分区 | 内容 |
|---|---|
| `.hero` | 首屏：超大标题 + 「开发中」占位面板 |
| `.spotlight` | 开发进度：巨型「开发中」字样 + 规格数字 |
| `.tiles-section` | 作品位：4 张占位卡片（亮色区） |
| `.about` | 关于 + 技术标签 |
| `.footer` | 页脚三栏 + 版权行 |

## 修改指引

| 想改什么 | 去哪改 |
|---|---|
| 配色 | `assets/style.css` 顶部的 `:root` 变量 |
| 文案 | `index.html` 对应段落 |
| 作品卡片 | `index.html` 里 `.tile-grid` 的 `<article class="tile">`，复制一个改内容 |
| 占位样式 | `assets/style.css` 里 `.placeholder` / `.mock-dev` / `.dev-badge` |
| 上新作品 | 把 `.placeholder` 换成 `<img>`，把 `.mock-dev` 换回示意图形，写回标题和说明 |

> 之前用过的示意图形样式（`.mock-player`、`.mock-notif`、`.mock-keys`、`.mock-code`）
> 仍保留在 `style.css` 里，恢复作品展示时可直接使用。

## 部署（Cloudflare Pages）

1. 代码推到 GitHub 仓库
2. Cloudflare 后台 → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**
3. 选 GitHub → 授权 → 选 `tools-showcase` 仓库（**别选成空仓库**）
4. 构建设置：Framework preset 选 `None`，Build command 与输出目录**都留空**
5. 保存并部署 → 得到 `https://tools-showcase.pages.dev/`
6. 以后每次 `git push` 自动更新线上站点

详细步骤与常见问题见 [DEPLOY.md](DEPLOY.md)。
