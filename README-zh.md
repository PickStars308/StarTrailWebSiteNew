# 🌟 星轨个人引导页

简体中文 | [English](README.md)

一个基于 Vue 3 + TypeScript + Vite 构建的高质量个人主页项目，支持组件自动导入、动画特效、移动端适配等功能。  
适合作为开发者的个人作品集展示页或起始模板。

---

## 🚀 技术栈

- ⚙️ **Vue 3** + **TypeScript**
- ⚡ **Vite** 构建工具
- 🎨 **SCSS** + 可选 UnoCSS
- 🎬 **wow.js** 页面滚动动画
- 📦 模块化组件 & 动态数据引入（支持 JSON 配置）
- 📱 响应式设计，移动端适配

---

## 📦 安装使用

```bash
# 克隆项目
git clone https://github.com/your-username/pickstars.git

# 进入项目目录
cd pickstars

# 安装依赖
npm install

# 启动开发环境
npm run dev
```

---

## 📦 构建生产环境

```bash
npm run build
```

构建后文件将输出至 `dist/` 目录，可用于部署。

---

## 📁 项目结构简要

```
├── src/
│   ├── assets/            # 静态资源（如图标、json配置等）
│   ├── components/        # 公共组件
│   ├── views/             # 页面视图
│   ├── router/            # 路由配置
│   ├── App.vue            # 应用主入口
│   └── main.ts            # 入口文件
├── public/                # 公共资源
├── vite.config.ts         # Vite 配置
├── tsconfig.json          # TypeScript 配置
```

---

## ✨ 特性亮点

- 使用 `wow.js` 提供滚动动画特效
- 图标采用 `iconfont` + SVG 自动填充颜色
- 支持 JSON 配置导航、技能、项目数据
- 移动端自适应：社交组件可按行自动排布
- 支持构建分析（rollup-plugin-visualizer）

---

## 🛠 开发者建议

- 推荐使用 **WebStorm** / **VS Code** 编辑器开发
- 图标使用 `<Icon iconName="icon-name" />` 封装组件调用
- JSON 数据路径使用 `@/assets/config/json/*.json` 引入

---

## 📄 License

MIT License

---

## ✨ 项目展示截图

>（你可以放一张首页截图）

---

## 🙌 感谢支持

如果你喜欢这个项目，欢迎 Star ⭐、Fork 🍴、或者提 Issues 👀

## 📚 参考资料
项目星轨背景提供作者：[@sun0225SUN](https://github.com/sun0225SUN) 仓库: [star-trail](https://github.com/sun0225SUN/star-trail)

