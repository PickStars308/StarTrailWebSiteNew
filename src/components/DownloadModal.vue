<template>
  <div class="download-modal" v-if="visible" @click.self="closeModal()">
    <div class="modal-content">
      <h2 v-if="data">{{ data.AppName }}</h2>
      <p v-if="data">版本：{{ data.Version }}</p>

      <div class="update-log" v-if="updateLogLines.length">
        <ul>
          <li v-for="(line, index) in updateLogLines" :key="index" :class="line.type">
            {{ line.content }}
          </li>
        </ul>
      </div>
      <div class="buttons" v-if="data">
        <a :href="data.DownloadUrl" target="_blank" rel="noopener noreferrer">
          <Button class="download-btn"> 下载 </Button>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeUnmount, watch } from "vue";
import axios from "axios";

const emit = defineEmits(["update:visible"]);

const props = defineProps({
  visible: Boolean,
  data: Object,
});

interface LogLine {
  type: "h1" | "h2" | "text";
  content: string;
}

const updateLogLines = ref<LogLine[]>([]);

watch(
  () => props.data,
  async (newVal) => {
    if (newVal && newVal.UpdateLog) {
      try {
        const res = await axios.get(newVal.UpdateLog);
        const lines = res.data.split("\n").filter((line: string) => line.trim() !== "");
        updateLogLines.value = lines.map((line: string) => {
          if (line.startsWith("##")) {
            return { type: "h2", content: line.replace(/^##\s*/, "") };
          } else if (line.startsWith("#")) {
            return { type: "h1", content: line.replace(/^#\s*/, "") };
          } else {
            return { type: "text", content: line };
          }
        });
      } catch (error) {
        updateLogLines.value = [{ type: "text", content: "更新日志加载失败" }];
      }
    }
  },
  { immediate: true },
);

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === "Escape") {
    closeModal();
  }
};
window.addEventListener("keydown", handleKeydown);
onBeforeUnmount(() => {
  window.removeEventListener("keydown", handleKeydown);
});

const closeModal = () => {
  const modal = document.querySelector(".download-modal") as HTMLElement;
  if (modal) {
    modal.classList.add("fade-out");
    setTimeout(() => {
      modal.classList.remove("fade-out");
      emit("update:visible", false);
    }, 300);
  }
};
</script>

<style scoped lang="scss">
.download-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  animation: fadeIn 0.3s ease;

  .modal-content {
    background: rgb(255 255 255 / 27%);
    border-radius: 6px;
    padding: 40px;
    animation: fadeInModal 0.3s forwards;
    max-width: 50%;
    width: 90%;
    position: relative;

    .close-btn {
      position: absolute;
      top: 10px;
      right: 15px;
      background: none;
      border: none;
      font-size: 20px;
      cursor: pointer;
    }

    .download-btn {
      display: block;
      margin: 10px auto;
      padding: 20px 20px;
      color: #fff;
      background-color: var(--el-color-primary);
      border: none;
      border-radius: 5px;
      width: 100%;
      text-align: center;
      text-decoration: none;
    }

    .update-log {
      margin-top: 20px;
      margin-bottom: 20px;
      border-radius: 6px;
      max-height: 400px;
      overflow: auto;
      word-wrap: break-word;

      * li {
        margin: 5px 0;
        padding: 5px;
        border-radius: 4px;
        list-style: none;
        position: relative;
        font-size: 14px;
        line-height: 1.5;
        color: #fff;
        font-family: "PingFang SC", "Microsoft YaHei", sans-serif;
        font-weight: 400;

        &.h1 {
          font-size: 18px;
          font-weight: bold;
          margin-top: 15px;
        }

        &.h2 {
          font-size: 16px;
          font-weight: 600;
          margin-top: 10px;
          color: #90ee90;
        }

        &.text {
          padding-left: 20px;
          font-size: 14px;
          color: #fff;
        }

        &.text::before {
          content: "👌 ";
        }
      }

      &::-webkit-scrollbar {
        width: 0px;
        background: transparent;
      }
    }
  }
}

@media (max-width: 768px) {
  .download-modal .modal-content {
    .download-btn {
      padding: 15px 15px;
    }
  }
}

/* Fade-in animation */
@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: scale(0.9);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes fadeInModal {
  0% {
    opacity: 0;
    transform: translateY(-10px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Fade-out animation */
@keyframes fadeOut {
  0% {
    opacity: 1;
    transform: scale(1);
  }

  100% {
    opacity: 0;
    transform: scale(0.9);
  }
}

/* Apply fade-out effect when closing */
.download-modal.fade-out {
  animation: fadeOut 0.3s ease forwards;
}
</style>
