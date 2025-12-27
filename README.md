# polk-x

极简 **Hugo** 博客主题。

## 预览

**在线演示**: [leviathan.vip](https://leviathan.vip)

![preview](https://github.com/leviathan0992/hugo-theme-polk-x/blob/master/demo.png?raw=true)

---

## 快速开始

### 1. 安装主题

```shell
cd ~/blog.com/
git clone https://github.com/leviathan0992/hugo-theme-polk-x.git themes/polk-x
```

或使用 Git submodule（推荐，便于更新）：

```shell
git submodule add https://github.com/leviathan0992/hugo-theme-polk-x.git themes/polk-x
```

### 2. 配置站点

在你的 Hugo 站点根目录创建或编辑 `hugo.yaml`：

```yaml
baseURL: "https://your-site.com/"
title: "Your Blog Title"
theme: "polk-x"
languageCode: "zh-CN"

# 分页
pagination:
  pagerSize: 20

# 永久链接 (可选)
permalinks:
  posts: "/:year/:month/:day/:filename/"

# 主题参数
params:
  favicon: "/favicon.png"
  keywords: "blog, tech, coding"
  separator: "-"
  rss: "/atom.xml"

# 导航菜单
menu:
  main:
    - name: "Home"
      url: "/"
      weight: 10
    - name: "Tags"
      url: "/tags/"
      weight: 20
    - name: "About"
      url: "/about/"
      weight: 30
    - name: "RSS"
      url: "/atom.xml"
      weight: 40
```

### 3. 创建内容

```shell
# 创建文章
hugo new posts/my-first-post.md

# 创建独立页面
hugo new about.md
```

### 4. 本地预览

```shell
hugo server --disableFastRender
```

打开 http://localhost:1313 预览。

### 5. 构建发布

```shell
hugo --minify
```

生成的静态文件在 `public/` 目录。

---

## RSS / Atom Feed

本主题内置 Atom feed 模板，在 `hugo.yaml` 中添加以下配置启用：

```yaml
# 输出格式
outputs:
  home: ["HTML", "ATOM"]

# Atom 媒体类型
mediaTypes:
  "application/atom+xml":
    suffixes: ["xml"]

outputFormats:
  ATOM:
    mediaType: "application/atom+xml"
    baseName: "atom"
    isPlainText: false
    rel: "alternate"
```

启用后访问 `/atom.xml` 即可订阅。

---

## 目录结构

```
polk-x/
├── layouts/
│   ├── _default/
│   │   ├── baseof.html       # 基础 HTML 骨架
│   │   ├── list.html         # 列表页（分类/标签）
│   │   ├── single.html       # 单页（独立页面）
│   │   └── terms.html        # 术语页（标签云）
│   ├── partials/
│   │   ├── head.html         # <head> 部分
│   │   ├── header.html       # 页头 + 导航
│   │   ├── footer.html       # 页脚
│   │   ├── paginator.html    # 分页器
│   │   └── toc.html          # 目录（可选）
│   ├── posts/
│   │   └── single.html       # 文章详情页
│   ├── index.html            # 首页
│   └── index.atom.xml        # Atom feed 模板
├── static/
│   ├── css/style.css         # 主题样式
│   └── js/main.js            # 主题脚本
├── theme.toml                # 主题元数据
├── LICENSE
└── README.md
```

---

## 自定义

### 修改样式

编辑 `static/css/style.css` 或在你的站点 `static/css/` 下创建同名文件覆盖。

### 修改导航

在 `hugo.yaml` 的 `menu.main` 中添加/删除菜单项。

### 添加评论

在 `layouts/posts/single.html` 底部添加评论系统代码（如 Disqus、Giscus 等）。

---

## 浏览器支持

- Chrome
- Firefox
- Safari
- Edge

---

## 致谢

* [polk](https://github.com/chunqiuyiyu/hexo-theme-polk) - 原始 Hexo 主题

---

## 贡献

欢迎提交 Issue 和 Pull Request。

## License

[MIT](LICENSE)
