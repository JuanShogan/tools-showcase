# 部署指南：从本地到 Cloudflare Pages

按顺序做，全程免费。预计 15 分钟。

---

## 第 0 步：先把网站跑起来看看（可选）

双击 `index.html` 就能在浏览器里看到网站效果。

---

## 第 1 步：在 GitHub 建一个空仓库

1. 打开 <https://github.com/new>
2. **Repository name** 填：`tools-showcase`
3. **Description**（可选）填：`我的工具作品集`
4. 选 **Public**（公开，免费且别人能看到源码）
5. **下面的勾全都不要勾**（不要勾 Add a README、不要勾 .gitignore、不要选 license）
   —— 因为我们本地已经有这些文件了，勾了会冲突
6. 点绿色按钮 **Create repository**

创建完，页面上会显示一个仓库地址，长这样：

```
https://github.com/JuanShoganVlaska/tools-showcase.git
```

**把这个地址复制下来**，下一步要用。

---

## 第 2 步：把本地代码推上去

双击运行 `push-to-github.bat`，它会提示你粘贴仓库地址，粘贴后回车即可。

首次推送会弹出 Git Credential Manager 的登录窗口 —— 选 **Sign in with your browser**，
在浏览器里点授权，之后就不用再登录了。

推送成功后，刷新 GitHub 页面就能看到文件了。

> **想手动执行？** 打开终端（cmd 或 PowerShell），依次运行：
> ```
> cd /d D:\DSH-output\sites\tools-showcase
> git remote add origin https://github.com/JuanShoganVlaska/tools-showcase.git
> git push -u origin main
> ```

---

## 第 3 步：注册 Cloudflare

1. 打开 <https://dash.cloudflare.com/sign-up>
2. 填**邮箱** + **密码** → 点 Sign Up
3. 去邮箱收验证邮件，点里面的确认链接
4. 回到 Cloudflare 登录

不需要绑定信用卡，免费套餐够用。

---

## 第 4 步：创建 Pages 项目并连接 GitHub

1. 登录 Cloudflare 后，看左侧菜单 → 点 **Workers & Pages**
2. 点 **Create**（创建）
3. 选 **Pages** 标签 → 点 **Connect to Git**
4. 点 **Connect GitHub** → 会跳转到 GitHub 授权页面
   - 选 **Only select repositories** → 勾选 `tools-showcase`（更安全，只授权这一个仓库）
   - 点 **Install & Authorize**
5. 回到 Cloudflare，选中 `tools-showcase` 仓库 → 点 **Begin setup**
6. **构建设置**（关键）：

   | 项目 | 填什么 |
   |---|---|
   | Project name | `tools-showcase`（想改也行，会变成网址的一部分） |
   | Production branch | `main` |
   | Framework preset | **None** |
   | Build command | **留空**（什么都不填） |
   | Build output directory | **留空** |

   因为这是纯静态网站，不需要构建。

7. 点 **Save and Deploy**

等 30 秒左右，会显示 `Success`，并给你一个网址：

```
https://tools-showcase.pages.dev
```

**这就是你的网站，全世界都能访问了。** 🎉

---

## 第 5 步：以后怎么更新内容

改完本地文件后，双击 `push-to-github.bat` 再推一次，Cloudflare 会自动重新部署，
一分钟内线上就更新了。不需要再去 Cloudflare 后台操作。

---

## 常见问题

**Q：能绑自己的域名吗？**
能。Cloudflare 后台 → 你的 Pages 项目 → Custom domains → 添加域名。
域名需要在 Cloudflare 托管（免费），或者按提示改 DNS 记录。

**Q：`pages.dev` 网址太长，能改吗？**
能。Pages 项目 → Settings → 改 Project name，网址跟着变（旧的会失效）。

**Q：推送时提示 `remote origin already exists`？**
说明已经加过远程地址了。想改地址的话先运行：
```
git remote set-url origin 新的仓库地址
```

**Q：推送时要求输入密码？**
GitHub 已不支持密码推送。用 Git Credential Manager 的浏览器登录，
或者去 GitHub 生成 Personal Access Token 当密码用。

**Q：网站打开是 404？**
检查 GitHub 仓库里 `index.html` 是不是在**根目录**。Cloudflare Pages 默认
把根目录作为网站根，如果你把文件放进了子文件夹，需要在 Build output directory 里填那个文件夹名。
