<script setup lang="ts">
// import {reactive} from "vue";
import {computed, onMounted, ref} from 'vue'
import axios from 'axios'
import {ElMessage, ElNotification} from 'element-plus'
import http from "../utils/Axios.ts";

const avatarUrl = `http://q.qlogo.cn/headimg_dl?dst_uin=${import.meta.env.VITE_SITE_AVATAR}&spec=640&img_type=jpg`;
const siteName = import.meta.env.VITE_SITE_NAME;

const Version = ref();


interface VersionItem {
  VersionType: string
  Use: {
    IsUse: boolean
    NoUseTip: string
  }
  AppName: string
  VersionCode: string
  Version: string
  UpdateLog: string
  DownloadUrl: string
}

const dialogVisible = ref(false)
const currentLog = ref('')
const currentDownloadUrl = ref('')

// 弹窗显示更新日志并自动执行下载
const showUpdateLogAndDownload = async (item: VersionItem) => {
  try {
    // 加载更新日志
    const response = await axios.get(item.UpdateLog)
    currentLog.value = response.data
    currentDownloadUrl.value = item.DownloadUrl

    // 弹出 Dialog 显示更新日志
    dialogVisible.value = true

    // 自动开始下载
    window.open(item.DownloadUrl, '_blank')  // 在新窗口中打开下载链接
  } catch (err) {
    ElMessage.error('无法加载更新日志')
  }
}

const SiteICP = computed(() => import.meta.env.VITE_SITE_ICP)
const SiteCopyRight = computed(() => import.meta.env.VITE_SITE_AUTHOR)
const CurrentYear = new Date().getFullYear()

const RandomQuote = ref('')

const Quotes = [
  '摘星辰，探星河，包罗万象',
  '因为热爱所以用心',
  '代码改变世界，编程创造未来',
  '求知若饥，虚心若愚',
  '技术无止境，探索不停歇',
  '用代码书写人生，用算法改变世界',
  '星辰大海，永不止步',
  '创新驱动发展，科技引领未来'
]

onMounted(async () => {
  RandomQuote.value = Quotes[Math.floor(Math.random() * Quotes.length)]

  // 加载 版本信息
  try {
    const response = await http.get("assets/config/json/version.json");
    if (Array.isArray(response.data)) {
      Version.value = response.data;
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
          <router-link to="/" class="text-white hover:underline">主页</router-link>
          -> 下载
        </div>
      </div>


    </section>

    <!-- 个人简介 -->
    <section class="wow FIL VersionDes">
      <!-- 关于我 -->
      <Title
          suffix="下载"
          prefix="Download"
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
            <span>在这个页面，你可以选择相应的版本下...</span>
            <br>
            <span class="text-gray-400">On this page, you can select the appropriate version below...</span>
          </p>
        </div>

        <img
            class="hidden rounded-full h-32 w-32 transition-shadow duration-300 md:block hover:shadow-[0_0_16px_8px_rgba(255,255,255,0.7)]"
            :src="avatarUrl"
            :alt="siteName"
        />

      </div>

    </section>

    <section class="wow FIL Version">
      <Title suffix="Version" prefix="Choice"/>

      <div class="wow FIU flex overflow-x-auto space-x-4 p-2">
        <div class="m-5 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-2">
          <div
              v-for="(item, index) in Version"
              :key="index"
              class="group relative bg-white/5 hover:bg-[#333] p-4 rounded-lg shadow-md flex flex-col justify-between transition backdrop-blur-3xl backdrop-opacity-60 hover:backdrop-opacity-100 hover:-translate-y-2"
          >
            <h3 class="text-xl font-bold text-white mb-2">
              {{ item.AppName }} - {{ item.VersionType }}
            </h3>
            <p class="text-sm text-gray-300 mb-2">版本号：{{ item.Version }}</p>
            <p class="text-sm text-gray-400 mb-4">
              {{ item.Use.IsUse ? '当前可用版本' : '当前不可用' }}
            </p>

            <div v-if="item.Use.IsUse">
              <samp
                  @click="showUpdateLogAndDownload(item)"
                  target="_blank"
                  class="mt-auto inline-block bg-green-600 text-white text-center py-2 px-4 rounded hover:bg-green-700 transition"
              >
                下载
              </samp>
            </div>
            <div v-else>
              <div
                  class="mt-auto inline-block bg-gray-500 text-white text-center py-2 px-4 rounded opacity-70 cursor-not-allowed"
                  :title="item.Use.NoUseTip"
              >
                暂不可用
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>


    <!-- 更新日志 Dialog -->
    <el-dialog v-model="dialogVisible" title="更新日志" width="auto" style="margin: 10px">
      <div class="dialog-content">
        <div class="whitespace-pre-wrap text-sm p-5 Current" style="overflow-y: hidden" v-html="currentLog">
        </div>
      </div>
      <template #footer>
    <span class="dialog-footer">
      <el-button @click="dialogVisible = false">关闭</el-button>
    </span>
      </template>
    </el-dialog>


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