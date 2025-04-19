# 🌟 StarTrail Personal Landing Page

[简体中文](README-zh.md) | English

A high-quality personal homepage project built with Vue 3 + TypeScript + Vite.  
Supports component auto-import, animation effects, and mobile responsiveness.  
Perfect as a developer's portfolio showcase or a starter template.

---

## 🚀 Tech Stack

- ⚙️ **Vue 3** + **TypeScript**
- ⚡ **Vite** as the build tool
- 🎨 **SCSS** + optional UnoCSS
- 🎬 **wow.js** for scroll animations
- 📦 Modular components & dynamic JSON-driven data
- 📱 Responsive design for mobile devices

---

## 📦 Installation & Usage

```bash
# Clone the repository
git clone https://github.com/your-username/pickstars.git

# Navigate to the project directory
cd pickstars

# Install dependencies
npm install

# Start the development server
npm run dev
```

---

## 📦 Build for Production

```bash
npm run build
```

The production files will be generated in the `dist/` directory and are ready for deployment.

---

## 📁 Project Structure

```
├── src/
│   ├── assets/            # Static resources (icons, json config, etc.)
│   ├── components/        # Reusable components
│   ├── views/             # Page views
│   ├── router/            # Routing configuration
│   ├── App.vue            # Main App component
│   └── main.ts            # Entry file
├── public/                # Public static files
├── vite.config.ts         # Vite configuration
├── tsconfig.json          # TypeScript configuration
```

---

## ✨ Features

- Scroll animations powered by `wow.js`
- Icon system using `iconfont` + SVG with dynamic fill color
- Navigation, skills, and project data driven via JSON config
- Mobile-first layout with responsive social card grid
- Visualized bundle analysis support (via `rollup-plugin-visualizer`)

---

## 🛠 Developer Tips

- Recommended editors: **WebStorm** or **VS Code**
- Use `<Icon iconName="icon-name" />` to easily call icons
- Import JSON config from `@/assets/config/json/*.json`

---

## 📄 License

MIT License

---

## ✨ Preview Screenshot

> (You can place a homepage screenshot here)

---

## 🙌 Support

If you like this project, feel free to Star ⭐, Fork 🍴, or raise an Issue 👀

---

## 📚 Credits

StarTrail background powered by [@sun0225SUN](https://github.com/sun0225SUN)'s project:  
[star-trail](https://github.com/sun0225SUN/star-trail)
