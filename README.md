# polk-x

polk-x 是一个 Hugo 博客主题，提供文章归档、标签页面、Atom 订阅、明暗主题切换和文章代码复制功能。

在线演示：[Leviathan 的博客](https://leviathan.vip/)，使用本主题构建。

## 使用条件

以下操作由站点维护者在已有 Hugo 站点的根目录执行。本机需要安装 Git 和 Hugo。当前构建验证使用 Hugo `0.153.2`。

安装前，确认 `themes/polk-x/` 不存在。已有主题时，先备份自定义文件，再按[升级和恢复](#升级和恢复)处理。主题不负责服务器部署，发布方式由站点维护者决定。

## 安装主题

维护者根据站点的版本管理方式选择一种安装方式，不要重复执行。

### 克隆安装

不使用子模块管理主题时，执行以下步骤。

1. 克隆主题仓库。

   ```bash
   git clone https://github.com/leviathan0992/hugo-theme-polk-x.git themes/polk-x
   ```

预期结果是生成 `themes/polk-x/`。克隆失败时，根据 Git 错误检查网络、访问权限和目标目录。不要删除已有主题来绕过目录冲突。

### 子模块安装

站点已使用 Git 管理，且需要通过父仓库记录主题版本时，执行以下步骤。

1. 添加主题子模块。

   ```bash
   git submodule add https://github.com/leviathan0992/hugo-theme-polk-x.git themes/polk-x
   ```

预期结果是生成主题目录和对应的子模块配置。其他维护者克隆站点后，需要初始化子模块。

```bash
git submodule update --init --recursive
```

## 配置站点

1. 在站点根目录创建或编辑 `hugo.yaml`。已有相同配置项时，修改原项，不要增加重复键。

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

2. 将 `baseURL` 改为正式站点地址。部署到子目录时，需要包含子目录，例如 `https://example.com/blog/`。
3. 将 `title` 改为站点名称。
4. 将 `languageCode` 改为站点使用的语言。

主题优先使用 `languageCode` 设置 HTML 语言，未设置时回退到站点语言标识。导航项由 `menu.main` 控制。文章路径使用日期和文件名生成；修改日期或文件名可能改变已发布文章的 URL。

### 设置站点图标

需要站点图标时，执行以下步骤。

1. 将图标保存为站点根目录下的 `static/favicon.png`。
2. 在已有的 `params` 配置中添加 `favicon: "/favicon.png"`。

### 启用 Atom 订阅

需要订阅功能时，执行以下步骤。

1. 将以下配置合并到 `hugo.yaml`。已有相同配置项时，修改原项。

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
   ```

2. 在已有的 `params` 配置中添加 `rss: "/atom.xml"`。
3. 按[构建站点](#构建站点)生成正式文件。

预期结果是生成 `public/atom.xml`，并在页面中提供订阅发现链接。需要在导航中显示订阅入口时，另行添加 `menu.main` 项。

图标和订阅参数使用相对于站点部署目录的路径。主题会根据 `baseURL` 补齐部署前缀。例如，以上配置在子目录部署时分别生成 `/blog/favicon.png` 和 `/blog/atom.xml`。这两个参数也支持外部绝对地址，外部地址保持不变。

## 创建和预览内容

1. 创建文章。

   ```bash
   hugo new content posts/my-first-post.md
   ```

2. 编辑文章的标题、日期和正文。
3. 创建导航中引用的独立页面。

   ```bash
   hugo new content about.md
   ```

4. 编辑独立页面的正文。
5. 启动包含草稿的本地预览。

   ```bash
   hugo server --disableFastRender --buildDrafts
   ```

6. 在浏览器打开命令输出的站点地址。默认地址为 [本地预览](http://localhost:1313/)。

预期结果是文章、标签页和独立页面能够访问，主题资源正常加载。子目录部署时，预览地址也包含部署前缀。结束预览时，在终端按 `Ctrl+C`。

## 构建站点

内容准备发布后，执行以下步骤。

1. 将需要发布的内容的 `draft` 改为 `false`。
2. 检查未来发布的内容。

   ```bash
   hugo list future
   ```

3. 构建正式文件。

   ```bash
   hugo --minify
   ```

预期结果是命令成功退出，在 `public/` 中生成站点。正式构建默认不包含草稿和未来发布的内容。构建失败时，先按报错修正配置、内容或模板，再重新构建。

## 自定义主题

Hugo 从 `assets/` 读取 CSS 和 JavaScript，并生成带内容指纹的文件名和完整性属性。资源内容改变后，生成的文件名会变化。

维护主题源码时，直接修改主题的 `assets/` 和 `layouts/` 文件。仅自定义单个站点时，在站点根目录提供同路径文件。例如，站点的 `assets/css/style.css` 会完整覆盖主题的同名文件，不会自动合并两份样式。不要修改 `public/` 中生成的指纹文件。

主题没有内置评论系统。接入评论时，维护者需要修改文章详情页模板，并验证相关请求和交互。

| 路径 | 职责 |
| --- | --- |
| `assets/css/style.css` | 页面布局、明暗主题、表格和代码高亮样式。 |
| `assets/js/main.js` | 主题切换、文章代码复制和图片属性处理。 |
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

## 验证修改

维护者修改主题后，先完成构建，再检查页面。构建成功只说明模板和资源可以生成，浏览器交互需要单独验证。

| 检查范围 | 预期结果 |
| --- | --- |
| 首页、文章页、标签页和独立页面 | 页面能够访问，相关资源请求成功。 |
| 明暗主题 | 图标和页面配色同步变化。 |
| 文章的窄屏布局 | 表格和长代码块可以横向滚动。 |
| 文章中的高亮代码块和普通代码块 | 两类代码块都提供复制按钮。 |
| 复制按钮的触屏和键盘操作 | 触屏上按钮直接可见，键盘可以聚焦并操作按钮。 |
| 复制内容 | 粘贴内容与原代码一致。 |
| 站点图标和 Atom 订阅 | 链接与部署目录一致，订阅文件可以解析。 |

页面异常时，先检查浏览器控制台和资源响应，再按下节处理升级或恢复。显示“已复制”不能替代粘贴内容检查；本地验证通过也不能替代正式站点验证。

## 升级和恢复

升级前，维护者需要保存当前主题的提交号和站点自定义文件。主题模板、样式和脚本需要使用匹配版本。

从旧版主题升级时，`static/css/style.css` 和 `static/js/main.js` 已迁移到 `assets/`。站点曾通过同名静态文件覆盖主题时，执行以下步骤。

1. 备份原自定义文件。
2. 将样式改动合并到站点根目录的 `assets/css/style.css`。
3. 将脚本改动合并到站点根目录的 `assets/js/main.js`。
4. 完成[构建和验证](#验证修改)。

没有自定义覆盖文件时，无需创建这些站点文件。升级主题后，直接构建和验证。

| 失败条件 | 处理和恢复 |
| --- | --- |
| Hugo 构建失败 | 按错误检查配置、资源路径和模板，修正后重新构建。 |
| 升级后自定义样式失效 | 检查是否仍使用旧的 `static/` 路径，以及站点同名文件是否完整覆盖了新版主题。 |
| 本地预览正常，正式站点异常 | 检查部署目录、资源响应和实际发布文件，确认正式站点使用了本次构建产物。 |
| 升级后仍无法恢复预期行为 | 恢复升级前的主题版本和站点自定义文件，再重新构建和验证。 |

不要仅替换单个 CSS 文件来回滚整个主题。需要重新发布站点时，由维护者按站点自身的部署流程执行。

## 来源和许可

主题源自 [polk](https://github.com/chunqiuyiyu/hexo-theme-polk) 的 Hexo 主题设计，使用 [MIT 许可证](LICENSE)。
