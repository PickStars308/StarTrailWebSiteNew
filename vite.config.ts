import {URL, fileURLToPath} from 'node:url'
import { defineConfig, loadEnv } from "vite";
import Components from 'unplugin-vue-components/vite'
import {AntDesignVueResolver} from 'unplugin-vue-components/resolvers'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import {visualizer} from "rollup-plugin-visualizer";
import viteCompression from 'vite-plugin-compression'


import AutoImport from 'unplugin-auto-import/vite'
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers'
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default ({mode}: { mode: string }) =>
    defineConfig({
        plugins: [
            vue(),
            UnoCSS(),
            Components({
                resolvers: [
                    AntDesignVueResolver({
                        importStyle: false, // css in js
                    }),
                    ElementPlusResolver()
                ],
            }),
            AutoImport({
                resolvers: [ElementPlusResolver()],
            }),
            visualizer({
                gzipSize: true,
                brotliSize: true,
                emitFile: false,
                filename: "Visualizer.html", //分析图生成的文件名
                open: true //如果存在本地服务端口，将在打包后自动展示
            }),
            viteCompression({
                threshold: 1024000 // 对大于 1mb 的文件进行压缩
            }),
            VitePWA({
                registerType: "autoUpdate",
                workbox: {
                    skipWaiting: true,
                    clientsClaim: true,
                    runtimeCaching: [
                        {
                            urlPattern: /\.(js|css|woff2|woff|ttf)$/,
                            handler: "CacheFirst",
                            options: {
                                cacheName: "js-css-cache",
                            },
                        },
                        {
                            urlPattern: /\.(png|jpe?g|svg|gif|bmp|psd|tiff|tga|eps)$/,
                            handler: "CacheFirst",
                            options: {
                                cacheName: "image-cache",
                            },
                        },
                    ],
                },
                manifest: {
                    name: loadEnv(mode, process.cwd()).VITE_SITE_NAME,
                    short_name: loadEnv(mode, process.cwd()).VITE_SITE_NAME,
                    description: loadEnv(mode, process.cwd()).VITE_SITE_DES,
                    display: "standalone",
                    start_url: "/",
                    theme_color: "#424242",
                    background_color: "#424242",
                    icons: [
                        {src: "/images/icon/48.png", sizes: "48x48", type: "image/png"},
                        {src: "/images/icon/72.png", sizes: "72x72", type: "image/png"},
                        {src: "/images/icon/96.png", sizes: "96x96", type: "image/png"},
                        {src: "/images/icon/128.png", sizes: "128x128", type: "image/png"},
                        {src: "/images/icon/144.png", sizes: "144x144", type: "image/png"},
                        {src: "/images/icon/192.png", sizes: "192x192", type: "image/png"},
                        {src: "/images/icon/512.png", sizes: "512x512", type: "image/png"},
                    ],
                },
            })
        ],
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url)),
            },
        },
        server: {
            open: true,
        },
    })
