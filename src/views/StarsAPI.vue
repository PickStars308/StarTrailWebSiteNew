<script setup lang="ts">
// import {reactive} from "vue";

import {computed, onMounted, ref} from "vue";

const avatarUrl = `http://q.qlogo.cn/headimg_dl?dst_uin=${import.meta.env.VITE_SITE_AVATAR}&spec=640&img_type=jpg`;
const siteName = import.meta.env.VITE_SITE_NAME;

const SiteICP = computed(() => import.meta.env.VITE_SITE_ICP)
const SiteCopyRight = computed(() => import.meta.env.VITE_SITE_AUTHOR)
const CurrentYear = new Date().getFullYear()

const RandomQuote = ref('')

const Quotes = [
  '摘星辰，探星河，包罗万象',
  '因为热爱，所以用心',
  '代码改变世界，编程创造未来',
  '求知若饥，虚心若愚',
  '技术无止境，探索不停歇',
  '用代码书写人生，用算法改变世界',
  '星辰大海，永不止步',
  '创新驱动发展，科技引领未来'
]

onMounted(async () => {
  RandomQuote.value = Quotes[Math.floor(Math.random() * Quotes.length)]
})
</script>

<template>
  <main class="Main">

    <!-- 大标题 -->
    <section class="wow FIL VersionHead">

      <div class="HeadTitle"> 摘星辰</div>
      <div class="HeadSubTitle">
        <div class="mr-4 flex gap-2">
          <div class="bg-red rounded-full h-3 w-3"/>
          <div class="bg-yellow rounded-full h-3 w-3"/>
          <div class="bg-green rounded-full h-3 w-3"/>
        </div>
        <div class="Text">
          <router-link class="text-white hover:underline" to="/">主页</router-link>
          -> StarsAPI
        </div>
      </div>


    </section>

    <!-- 个人简介 -->
    <section class="wow FIL VersionDes">
      <!-- 关于我 -->
      <Title
          prefix="About"
          suffix="StarsAPI"
      />
      <div class="mt-10 mx-10 flex justify-between">
        <div class="text-5 leading-10 ">
          <p class="text-white AboutText">
            <span class="mr-2">你好，这里是</span>
            <span
                class="shadow-[0_0_20px_#00000047] bg-[#333] rounded-[10px] px-[1%] py-[5px] mx-[5px] my-[5px]">摘星辰</span>
            <span class="mx-2">，热爱编程!</span>

            <p class="text-gray-400"> Hello, this is PickStars, passionate about coding!</p>
          </p>

          <p class="text-white">
            <span>在这个页面，我们将提供免费的API接口供你使用...</span>
            <br>
            <span class="text-gray-400">On this page, we will provide a free API interface for you to use...</span>
          </p>
        </div>

        <img
            :alt="siteName"
            :src="avatarUrl"
            class="hidden rounded-full h-32 w-32 transition-shadow duration-300 md:block hover:shadow-[0_0_16px_8px_rgba(255,255,255,0.7)]"
        />

      </div>

    </section>

    <section class="wow FIL Version">
      <Title prefix="Choice" suffix="API"/>

    </section>

    <!-- 底部 -->
    <footer class="mb-5">
      <div class="text-white/60 mt-50 f-c-c">
        <i i-ant-design-environment-outlined mr-1/>
        <p>{{ RandomQuote }}</p>
        <i i-ant-design-environment-outlined ml-1/>
      </div>
      <div class="text-white/60 mt-2 f-c-c gap-4">
        <div v-html="SiteICP"></div>
        <div>© 2022-{{ CurrentYear }} {{ SiteCopyRight }} 版权所有</div>
      </div>
    </footer>
  </main>
</template>

<style scoped lang="scss">
@use "@/assets/styles/Home" as *;
@use "@/assets/styles/Download" as *;

@use "@/assets/styles/Animation" as *;

</style>