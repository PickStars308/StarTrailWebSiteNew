<script setup lang="ts">
// import {reactive} from "vue";
import {computed, onMounted, ref} from 'vue'
import http from "../utils/Axios.ts";
import {ElNotification} from "element-plus"; // 使用相对路径

const avatarUrl = `http://q.qlogo.cn/headimg_dl?dst_uin=${import.meta.env.VITE_SITE_AVATAR}&spec=640&img_type=jpg`;
const siteName = import.meta.env.VITE_SITE_NAME;


const SiteICP = computed(() => import.meta.env.VITE_SITE_ICP)
const ShowSiteICP = ref(true);

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


// 加载数据

const MyProjects = ref();
const Social = ref();
const Skills = ref();

onMounted(async () => {
  RandomQuote.value = Quotes[Math.floor(Math.random() * Quotes.length)]

  // 加载项目数据
  try {
    const response = await http.get("assets/config/json/projects.json");
    if (Array.isArray(response.data)) {
      MyProjects.value = response.data;
    } else {
      ElNotification({
        title: "提示",
        message: "获取的数据格式不正确",
        type: "warning",
      });
    }
  } catch (error) {
    ElNotification({
      title: "提示",
      message: `数据加载失败 Σヽ(ﾟД ﾟ; )ﾉ <br/>${error}`,
      type: "error",
    });
  }

  // 加载技巧数据
  try {
    const response = await http.get("assets/config/json/skills.json");
    if (Array.isArray(response.data)) {
      Skills.value = response.data;
    } else {
      ElNotification({
        title: "提示",
        message: "获取的数据格式不正确",
        type: "warning",
      });
    }
  } catch (error) {
    ElNotification({
      title: "提示",
      message: `数据加载失败 Σヽ(ﾟД ﾟ; )ﾉ <br/>${error}`,
    })
  }

  // 加载const Social = ref();

  try {
    const response = await http.get("assets/config/json/social.json");
    if (Array.isArray(response.data)) {
      Social.value = response.data;
    } else {
      ElNotification({
        title: "提示",
        message: "获取的数据格式不正确",
        type: "warning",
      });
    }
  } catch (error) {
    ElNotification({
      title: "提示",
      message: `数据加载失败 Σヽ(ﾟД ﾟ; )ﾉ <br/>${error}`,
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
    <section class="wow FIL Head">

      <div class="HeadTitle"> 摘星辰</div>
      <div class="HeadSubTitle">
        <div class="mr-4 flex gap-2">
          <div class="bg-red rounded-full h-3 w-3"/>
          <div class="bg-yellow rounded-full h-3 w-3"/>
          <div class="bg-green rounded-full h-3 w-3"/>
        </div>
        <div class="Text">
          摘星辰 一款Material Design 3为风格设计的多功能工具聚合工具箱
        </div>
      </div>


    </section>

    <!-- 个人简介 -->
    <section class="wow FIL About">
      <!-- 关于我 -->
      <Title
          suffix="PickStars"
          prefix="About"
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
            <span>热爱计算机和 IT 互联网事业</span>
            <br>
            <span class="text-gray-400">Love computer science and IT internet industry</span>
          </p>
        </div>

        <img
            class="hidden rounded-full h-32 w-32 transition-shadow duration-300 md:block hover:shadow-[0_0_16px_8px_rgba(255,255,255,0.7)]"
            :src="avatarUrl"
            :alt="siteName"
        />

      </div>

      <div class="wow FIU Social">
        <div
            v-for="(item, index) in Social"
            :key="index"
            class="item"
            :style="{ '--hover-color': item.color }"
        >
          <a :href="item.link" target="_blank">
            <div class="content">
              <svg-icon className="svg" :iconName="item.icon"></svg-icon>
            </div>
          </a>
        </div>
      </div>


    </section>

    <section class="wow FIL Skills">
      <Title
          suffix="Skills"
          prefix="My"
      />

      <div class="wow FIU flex overflow-x-auto space-x-4 p-2">

        <div class="m-5 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-2">
          <div
              v-for="(skill, index) in Skills"
              :key="index"
              class="group relative bg-white/5 hover:bg-[#333] p-4 rounded-lg shadow-md flex flex-col justify-between transition backdrop-blur-3xl backdrop-opacity-60 hover:backdrop-opacity-100 hover:-translate-y-2"
          >
            <h3 class="text-base font-semibold text-white mb-3">{{ skill.Name }}</h3>

            <!-- 白色进度条底部 -->
            <div class="w-full h-2 bg-white/20 rounded-full overflow-hidden relative mb-2">
              <!-- 白色进度部分 -->
              <div
                  class="absolute top-0 left-0 h-full bg-white transition-all duration-500"
                  :style="{ width: skill.Progress + '%' }"
              ></div>

              <!-- 刻度 -->
              <div class="absolute top-0 left-0 w-full h-full flex justify-between px-1">
          <span
              v-for="i in 10"
              :key="i"
              class="w-[1px] h-full bg-white/40"
          ></span>
              </div>
            </div>

            <!-- 描述 hover 时显示 -->
            <p
                class="text-sm text-white/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              {{ skill.Description }}
            </p>
          </div>
        </div>

      </div>

    </section>

    <section class="wow FIL Projects">
      <Title
          suffix="Projects"
          prefix="My"
      />

      <div class="wow FIU flex overflow-x-auto space-x-4 p-2">

        <div class="m-5 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-2">

          <div v-for="(item, index) in MyProjects" :key="index">
            <a :href="item.Link" target="_blank">
              <div
                  class="bg-white/5 hover:bg-[#333] p-4 rounded-lg shadow-md flex transition backdrop-blur-3xl backdrop-opacity-60 hover:backdrop-opacity-100 hover:-translate-y-2"
              >
                <!-- 左侧：标题与描述 -->
                <div class="flex flex-col justify-between mr-4">
                  <div class="text-bold opacity-75 text-white">
                    {{ item.Name }}
                  </div>
                  <div class="mt-1 opacity-50 text-sm text-white">
                    {{ item.Description }}
                  </div>
                </div>

              </div>
            </a>
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

@use "@/assets/styles/Animation" as *;
</style>