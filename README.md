# polk-x

polk-x 是一个 Hugo 博客主题，提供文章归档、标签页面、Atom 订阅、明暗主题切换和代码复制功能。

[在线演示](https://leviathan.vip/)展示了主题在个人博客中的使用方式。

## 安装和配置

以下操作由站点维护者在已有 Hugo 站点的根目录执行。需要先安装 Git 和 Hugo。本次移植使用 Hugo `0.153.2` 验证。

### 安装主题

普通站点使用克隆方式安装。

```bash
git clone https://github.com/leviathan0992/hugo-theme-polk-x.git themes/polk-x
```

若站点已使用 Git 管理，也可以使用子模块方式。两种方式选择一种。

```bash
git submodule add https://github.com/leviathan0992/hugo-theme-polk-x.git themes/polk-x
```

### 配置站点

1. 在站点根目录创建或编辑 `hugo.yaml`。

   ```yaml
   baseURL: "https://example.com/"
   title: "我的博客"
   theme: "polk-x"
   languageCode: "zh-CN"

   pagination:
     pagerSize: 20

   permalinks:
     posts: "/:year/:month/:day/:contentbasename/"

   taxonomies:
     tag: "tags"

   markup:
     highlight:
       noClasses: false
       lineNumbers: false

   params:
     separator: "-"
     keywords: "博客, 技术"

   menu:
     main:
       - name: "首页"
         url: "/"
         weight: 10
       - name: "标签"
         url: "/tags/"
         weight: 20
       - name: "关于"
         url: "/about/"
         weight: 30
   ```

2. 根据站点实际域名和语言修改 `baseURL`、`title` 和 `languageCode`。

主题优先使用站点的 `languageCode` 设置 HTML 语言，未设置时回退到站点语言标识。导航内容由 `menu.main` 控制。

需要站点图标时，将图片保存到站点的 `static/` 目录，并将 `params.favicon` 设置为对应的访问路径。例如，`static/favicon.png` 对应 `/favicon.png`。

### 创建和预览内容

1. 创建文章。

   ```bash
   hugo new content posts/my-first-post.md
   ```

2. 编辑文章的标题、日期和正文。
3. 创建导航中引用的独立页面。

   ```bash
   hugo new content about.md
   ```

4. 启动包含草稿的本地预览。

   ```bash
   hugo server --disableFastRender --buildDrafts
   ```

5. 打开 [本地预览](http://localhost:1313/)，检查文章、标签和独立页面。

预期结果是页面正常显示，主题样式和脚本能够加载。结束预览时，在终端按 `Ctrl+C`。

准备发布时，将对应内容的 `draft` 改为 `false`，再构建正式站点。

```bash
hugo --minify
```

预期结果是命令成功退出，在 `public/` 中生成站点。正式构建默认不包含草稿和未来发布的内容。部署方式由使用主题的站点决定。

## 启用 Atom 订阅

维护者需要订阅功能时，将以下配置合并到站点的 `hugo.yaml`。已有相同配置项时，修改原项，不要增加重复键。

```yaml
outputs:
  home: ["HTML", "ATOM"]

mediaTypes:
  "application/atom+xml":
    suffixes: ["xml"]

outputFormats:
  ATOM:
    mediaType: "application/atom+xml"
    baseName: "atom"
    isPlainText: true
    rel: "alternate"

params:
  rss: "/atom.xml"
```

重新构建后，预期生成 `public/atom.xml`。正式订阅地址为站点域名下的 `/atom.xml`。

## 目录职责

| 路径 | 职责 |
| --- | --- |
| `assets/css/style.css` | 页面布局、明暗主题、表格和代码高亮样式。 |
| `assets/js/main.js` | 主题切换、代码复制和图片属性处理。 |
| `layouts/_default/baseof.html` | 页面骨架和脚本资源引用。 |
| `layouts/_default/_markup/render-codeblock.html` | 代码块高亮输出。 |
| `layouts/_default/list.html` | 文章归档和标签文章列表。 |
| `layouts/_default/single.html` | 独立页面。 |
| `layouts/_default/terms.html` | 标签列表。 |
| `layouts/posts/single.html` | 文章详情页。 |
| `layouts/partials/` | 页头、页脚、导航、分页和文章目录。 |
| `layouts/index.html` | 首页。 |
| `layouts/index.atom.xml` | Atom 订阅。 |
| `theme.toml` | 主题元数据。 |

## 自定义和迁移

Hugo 从 `assets/` 读取 CSS 和 JavaScript，并生成带内容指纹的文件名和完整性属性。资源内容改变后，生成的文件名会变化。

从旧版主题升级时，原 `static/css/style.css` 和 `static/js/main.js` 已迁移到 `assets/`。如果站点曾通过同名静态文件覆盖主题，需要将自定义内容合并到站点根目录的 `assets/css/style.css` 或 `assets/js/main.js`。不要修改构建输出中的指纹文件。

维护主题本身时，直接修改主题的 `assets/` 文件。仅自定义单个站点时，在站点根目录的 `assets/` 中提供同路径文件。站点文件会覆盖对应的主题文件。

需要修改页面结构时，在站点根目录的 `layouts/` 中提供同路径模板，或直接维护主题模板。主题没有内置评论系统；接入评论时，需要修改文章详情页模板并检查相关请求和交互。

## 验证和恢复

维护者修改主题后，先构建，再检查页面。构建通过只说明模板和资源可以生成，不代表浏览器交互已经验证。

| 检查范围 | 预期结果 |
| --- | --- |
| 首页、文章页、标签页和独立页面 | 布局正常，资源请求成功。 |
| 明暗主题 | 图标和页面配色同步变化。 |
| 窄屏页面 | 表格和长代码块可以横向滚动。 |
| 高亮代码块和普通代码块 | 两类代码块都提供复制按钮。 |
| 触屏与键盘操作 | 触屏上按钮直接可见，键盘可以聚焦并操作按钮。 |
| 复制内容 | 粘贴内容与原代码一致。 |
| Atom 订阅 | 启用后生成订阅文件，内容可解析。 |

构建失败时，按报错检查资源路径、模板和配置。升级后自定义样式失效时，先检查是否仍通过旧的 `static/` 路径覆盖资源。页面异常时，检查浏览器控制台和资源响应，再决定是否恢复升级前的主题及站点覆盖文件。

发布前保留主题版本和自定义文件。需要恢复时，切回此前版本并重新构建；不要只替换单个 CSS 文件，因为模板、样式和脚本需要匹配。

## 来源和许可

主题源自 [polk](https://github.com/chunqiuyiyu/hexo-theme-polk) 的 Hexo 主题设计，使用 [MIT 许可证](LICENSE)。
