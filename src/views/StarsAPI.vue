<script setup lang="ts">
// import {reactive} from "vue";

import {computed, onMounted, ref} from "vue";
import {ElNotification} from "element-plus";
import http from "../utils/Axios.ts";

const avatarUrl = `http://q.qlogo.cn/headimg_dl?dst_uin=${import.meta.env.VITE_SITE_AVATAR}&spec=640&img_type=jpg`;
const siteName = import.meta.env.VITE_SITE_NAME;

const SiteICP = computed(() => import.meta.env.VITE_SITE_ICP)
const ShowSiteICP = ref(false);

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

interface APIItem {
  title: string;
  status: string;
  billing: string;
  date: string;
  description: string;
  link: string;
}

const API = ref<APIItem[]>([])

onMounted(async () => {
  RandomQuote.value = Quotes[Math.floor(Math.random() * Quotes.length)]

  try {

    const response = await http.get('assets/config/json/api/index.json')
    if (Array.isArray(response.data)) {
      API.value = response.data
    } else {
      ElNotification({
        title: '提示',
        message: '获取的数据格式不正确',
        type: 'warning'
      })
    }
  } catch (error) {
    ElNotification({
      title: '提示',
      dangerouslyUseHTMLString: true,
      message: `数据加载失败 Σヽ(ﾟД ﾟ; )ﾉ <br/>${error}`
    })
  }

  if (SiteICP.value) {
    ShowSiteICP.value = true;
  } else {
    ShowSiteICP.value = false;
  }
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
      <div class="card-grid">
        <div v-for="(item, index) in API" :key="index" class="api-card">
          <div class="api-card__header">
            <div class="api-card__title">
              {{ item.title }}
              <div class="api-card__badge api-card__badge--status">{{ item.status }}</div>
              <div class="api-card__badge api-card__badge--paid">{{ item.billing }}</div>
            </div>
            <div class="api-card__subtitle">
              <svg-icon class="icon" iconName="icon-Time"/>
              发布时间：{{ item.date }}
            </div>
          </div>
          <div class="api-card__content">{{ item.description }}</div>
          <div class="api-card__footer">
            <a :href="item.link" class="api-card__link" target="_blank">查看文档</a>
          </div>
        </div>
      </div>

    </section>

    <!-- 底部 -->
    <footer class="mb-5">
      <div class="text-white/60 mt-50 f-c-c">
        <i i-ant-design-environment-outlined mr-1/>
        <p>{{ RandomQuote }}</p>
        <i i-ant-design-environment-outlined ml-1/>
      </div>
      <div class="text-white/60 mt-2 f-c-c gap-4">
        <div v-if="SiteICP" id="ShowSiteICP">
          {{ SiteICP }}
        </div>
        <div>© 2022-{{ CurrentYear }} {{ SiteCopyRight }} 版权所有</div>
      </div>
    </footer>
  </main>
</template>

<style scoped lang="scss">
@use "@/assets/styles/Home" as *;
@use "@/assets/styles/Download" as *;

@use "@/assets/styles/Animation" as *;

.card-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  padding: 3rem;
  margin-top: 1rem;
}

.icon {
  width: 15px;
  height: 15px;
  margin-right: 0.5rem;
}

.api-card {
  background-color: rgba(255, 255, 255, 0.05);
  padding: 1.25rem;
  border-radius: 0.75rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  backdrop-filter: blur(20px);
  backdrop-opacity: 0.6;
  transition: all 0.3s ease;
  color: #fff;

  &:hover {
    background-color: #2d2d2d;
    transform: translateY(-6px);
    backdrop-opacity: 1;
  }

  &__header {
    margin-bottom: 1rem;
  }

  &__title {
    font-size: 1.2rem;
    font-weight: bold;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  &__badge {
    font-size: 0.75rem;
    padding: 0.25rem 0.5rem;
    border-radius: 999px;
    color: #fff;

    &--status {
      background-color: #4caf50; // 绿色
    }

    &--paid {
      background-color: #2196f3; // 蓝色
    }
  }

  &__subtitle {
    font-size: 1rem;
    color: #ccc;
    display: flex;
    align-items: center;
    margin-top: 0.25rem;


    i {
      font-size: 0.9rem;
      margin-right: 0.25rem;
    }
  }

  &__content {
    font-size: 0.95rem;
    margin: 1rem 0;
  }

  &__footer {
    display: flex;
    justify-content: flex-end;
  }

  &__link {
    color: #90caf9;
    font-weight: 500;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}


</style>