# 前端架构方案 —— SSR & Anujs

每一个国家的都有其特殊国情，每个项目都有特殊的项目情况。这个项目就对 SEO 和 ie8 有了特殊的要求。

## SEO

> Search Engine Optimization,搜索引擎优化

各类搜索引擎抓取页面的源码，识别其中的文本信息并予以记录。

#### SPA

> Single Page Application 单页面应用程序

现在时下流行的前端方案就是 SPA 方案了，html 元素控制都是通过 js 渲染来进行的。在页面源码中只有基础的 demo、css 地址和 js 地址。

#### 同构直出

在现有的 SPA 工作模式下，使用同构直出的手段，不仅可以保留我们现有的开发模式，还可以减少很多工作量。前后端完全使用同一套代码，将前端的渲染逻辑移到服务器端完成，将渲染后的结果再交给用户。

当前 node 在服务端有着许多主流抑或非主流的框架，包括 express、koa、thinkjs 等，能够较快上手，利用各种中间件得以进行敏捷开发。

另外诸如 ejs、jade 这样的渲染模板能让我们轻松地把首屏内容（数据以及渲染好的 DOM 树）注入页面中。

这样用户访问到的便是已经带有首屏内容的页面，大大降低了等候时间，提升了体验。

**目录结构**

```
cmc_open_store
  ├─build   // 服务端构建目录
  │  └─server.bundle.js
  ├─dist    // 客户端端构建目录
  │  ├─bundle
  │  │  ├─home
  │  │  │  └─info.js
  │  │  ├─dashboard.js
  │  │  ├─home.js
  │  │  └─input.js
  │  ├─home
  │  │  └─info.html
  │  ├─lib
  │  │  ├─anu.full.min.js
  │  │  └─common.polyfill.min.js
  │  ├─dashboard.html
  │  ├─home.html
  │  └─input.html
  ├─lib     // 引用的三方库目录，需二次构建编译
  │  ├─anu  // anu 支持ie8的类react框架
  │  │  ├─ReactIE.js
  │  │  ├─ReactPropTypes.js
  │  │  ├─ReduxIE.js
  │  │  ├─Rematch.js
  │  │  ├─createClass.js
  │  │  └─injectTapEventPlugin.js
  │  ├─common-polyfill  // ie8垫片层
  │  │  ├─fetch-polyfill-0.0.3
  │  │  │  ├─avalon.js
  │  │  │  └─index.js
  │  │  ├─bluebird.js
  │  │  ├─console-polyfill.js
  │  │  ├─es5-shim.js
  │  │  ├─json3.js
  │  │  ├─object-create-ie8.js
  │  │  └─object-defineproperty-ie8.js
  │  ├─dist // 三方库二次构建输出目录
  │  │  ├─anu.full.min.js
  │  │  └─common.polyfill.min.js
  │  └─gulpfile.js  // 二次构建配置文件
  ├─src // 源码目录
  │  ├─client   // 客户端源码
  │  │  ├─pages
  │  │  │  ├─dashboard
  │  │  │  │  └─index.js
  │  │  │  ├─home
  │  │  │  │  ├─info
  │  │  │  │  │  └─index.js
  │  │  │  │  ├─style   // 页面样式文件
  │  │  │  │  │  └─index.less
  │  │  │  │  └─index.js
  │  │  │  └─input
  │  │  │     └─index.js
  │  │  └─styles // 全局样式文件
  │  │     └─index.less
  │  │  └─templates // ejs 模板
  │  │     └─index.ejs
  │  └─server   // 服务端源码
  │     └─index.js
  ├─tools   // 工具目录
  │  ├─compiler-client.js   // 客户端编译脚本
  │  ├─compiler-server.js   // 服务端编译脚本
  │  ├─config.js    // 通用配置文件
  │  ├─server.js    // 客户端Dev server
  │  ├─webpack-config-client.js // 客户端编译webpack配置
  │  └─webpack-config-server.js // 服务端编译webpack配置
  ├─package-lock.json
  └─package.json
```

**动态 meta**
借助于 EJS 这个高效的 JavaScript 模板引擎，可以直接由后台来控制 html 页面的渲染。

```
    <meta name="Keywords" content="<?= keywords ?>">
    <meta name="description" content="<?= description ?>" />
    <title>
        <?= title ?>
    </title>
    <script>
        window.__state__ = <?- state ?>
    </script>
    <div id='mainContainer'>
        <?- component ?>
    </div>
```

## Anujs

简介

> anujs 是一个高级兼容 React16 的迷你 React 框架，它兼容 React16.3.0 的 99%接口， 跑通了官方 788 个 case， 支持 React 生态圈的 99％的组件与 UI 库。

优势

1. 支持 React16 的各种新功能，Fragment, componentDidCatch, creactContext, createRef, forwardRef...
2. 支持 React16 的各种新功能，Fragment, componentDidCatch, creactContext, createRef, forwardRef...
3. 支持 React 全家桶（react-redux, react-router-dom, react-router-redux， react-lazy-load， react-hot-loader...）
4. 支持 99％的 antd 组件 （antd 为中国最有名的 React UI 库）

已知问题
无法做按需加载
无法压缩

解决方案
anu 编译为独立类库
垫片层编译独立类库
