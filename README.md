# Network Helper

一个用于增强 Chrome DevTools「Network」能力的开发者工具扩展。通过独立的 DevTools 面板，提供更友好的 UI 与更高效的网络调试体验，包括：

- 一键复制请求与响应数据
- 一键复制到 Postman（便捷调试）
- 类型/状态过滤与关键字搜索
- 保留历史请求日志（Keep Log）
- 禁用缓存与网络限速（Throttling）
- Neumorphism 拟态风格界面，美观易读
- 虚拟化表格渲染（Element Plus TableV2），在大量数据下仍然流畅


## 开发与预览
- 安装依赖

```bash
pnpm install
```

- 开发模式

```bash
pnpm dev
```

在浏览器打开上面的地址可直接预览面板 UI。开发扩展时，也可在 Chrome DevTools 中通过扩展的面板进行调试。

## 构建与加载扩展
- 构建产物

```bash
# 开发环境构建
pnpm build:dev
# 生产环境构建
pnpm build:prod
```

- 加载到 Chrome
  - 打开 Chrome 扩展管理：chrome://extensions
  - 开启右上角「开发者模式」
  - 点击「加载已解压的扩展程序」
  - 选择输出目录：`./dist/debugger-tool`

加载后打开 DevTools，你会看到面板入口「Network Helper」，点击即可进入插件主界面

## 目录结构
- DevTools 注册入口：`src/devtools/devtools.js`
- 面板应用：`src/panel/`
  - 路由与页：`router/`、`pages/`
  - 组件：`components/`
  - 工具方法与样式：`utils/`、`styles.css`

## 许可
MIT
