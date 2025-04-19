<script setup lang="ts">
import {onMounted, ref} from 'vue'
import StarTrails from './components/StarTrails.vue'

import WOW from 'wow.js/dist/wow.js'
import NavData from '@/assets/config/json/nav.json'; // ✅ 应放到顶部
import {checkDays, helloInit} from "./utils/Home";

onMounted(() => {

  checkDays();

  setTimeout(() => {
    helloInit();
  }, 1000);

  new WOW({
    boxClass: 'wow',
    offset: 100, // 定义浏览器视口底部与隐藏框顶部之间的距离。当用户滚动并到达此距离时，隐藏的框会显示出来
    mobile: true, // 在移动设备上打开/关闭WOW.js
    live: true, // 在页面上同时检查新的WOW元素
  }).init()

  // 背景固定
  window.addEventListener('scroll', () => {
    const bg = document.getElementById('Background')
    const scrollTop = window.scrollY
    if (bg) {
      if (scrollTop > 0.7 * window.innerHeight)
        bg.classList.add('fixed')
      else
        bg.classList.remove('fixed')
    }
  })


})

interface NavItem {
  Name: string;
  Path: string;
}

const navItems = ref<NavItem[]>(NavData.default || NavData);

// 热更新处理
if (import.meta.hot) {
  import.meta.hot.accept('@/assets/config/json/nav.json', (newModule) => {
    if (newModule) {
      navItems.value = newModule.default || newModule; // 更新数据
    }
  });
}

// 示例：输出带图标的日志
import {ConsoleLogger} from './utils/ConsoleLogger'; // ✅ 推荐写法

const icon = `

  ██████╗ ██╗ ██████╗██╗  ██╗    ███████╗████████╗ █████╗ ██████╗ ███████╗
  ██╔══██╗██║██╔════╝██║ ██╔╝    ██╔════╝╚══██╔══╝██╔══██╗██╔══██╗██╔════╝
  ██████╔╝██║██║     █████╔╝     ███████╗   ██║   ███████║██████╔╝███████╗
  ██╔═══╝ ██║██║     ██╔═██╗     ╚════██║   ██║   ██╔══██║██╔══██╗╚════██║
  ██║     ██║╚██████╗██║  ██╗    ███████║   ██║   ██║  ██║██║  ██║███████║
  ╚═╝     ╚═╝ ╚═════╝╚═╝  ╚═╝    ╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝

    `;

const appInfo = {
  版本: import.meta.env.VITE_PICKSTARS_VERSION,
  作者: "摘星辰",
  "作者 GitHub": "https://github.com/PickStars308",
  网站: "https://xinstudio.top/",
};

if (ConsoleLogger) {
  ConsoleLogger.logStructured(appInfo, icon, "font-size: 16px;color: #50b16e;");
} else {
  console.error("ConsoleLogger module not found. Please check the import path.");
}

</script>

<template>
  <!-- 导航 -->
  <nav class="wow FIU absolute fixed bottom-4 left-4 z-20">
    <div v-for="(item, index) in navItems" :key="index" class="my-6 text-3 text-white wv">
      <router-link
          :to="item.Path"
          class="text-white hover:text-gray-300 transition-colors"
          active-class="font-bold"
      >
        {{ item.Name }}
      </router-link>
    </div>
  </nav>

  <router-view v-slot="{ Component }">
    <transition name="fade">
      <component :is="Component"/>
    </transition>
  </router-view>


  <!-- 背景 -->
  <div id="Background" class="absolute wh-full left-0 top-0 z-0">
    <!-- 渐变阴影 -->
    <div class="to-black-500 absolute h-80vh w-full bottom--30vh left-0 from-black bg-gradient-to-t"/>
    <!-- 星轨背景 -->
    <StarTrails class="pb-45vh bg-black"/>
  </div>

</template>


<style lang="scss" scoped>

// 引入 css
@use "@/assets/styles/Animation" as *;

#Background.fixed {
  position: fixed;
  top: -70%;
}
</style>
