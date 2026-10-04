# 我的工具作品集

个人工具展示网站，纯静态页面（HTML + CSS + 原生 JS），无任何构建步骤，
托管于 **Cloudflare Pages**，每次 `git push` 自动部署。

## 本地预览

直接双击 `index.html` 就能看。

## 目录结构

```
tools-showcase/
├── index.html          # 页面主体
├── assets/
│   ├── style.css       # 样式（配色在 :root 变量里改）
│   ├── script.js       # 滚动动画、年份
│   └── screenshots/    # 软件截图
└── README.md
```

## 修改指引

| 想改什么 | 去哪改 |
|---|---|
| 配色 | `assets/style.css` 顶部的 `:root` 变量 |
| 文字内容 | `index.html` 对应段落 |
| 作品卡片 | `index.html` 里 `.grid` 的 `<article class="card">`，复制一个改内容即可 |
| 图片 | 替换 `assets/screenshots/` 里的文件 |
| GitHub 链接 | `index.html` 里搜 `USERNAME`，全部替换成你的 GitHub 用户名 |

## 部署（Cloudflare Pages）

1. 代码推到 GitHub 仓库
2. Cloudflare 后台 → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**
3. 选 GitHub → 授权 → 选 `tools-showcase` 仓库
4. 构建设置：**不需要任何构建命令**，输出目录留空即可
5. 保存并部署 → 得到 `https://<项目名>.pages.dev/`
6. 以后每次 `git push` 自动更新线上站点
