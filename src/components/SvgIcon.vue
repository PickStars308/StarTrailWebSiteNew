<template>
  <svg
      :class="svgClass"
      aria-hidden="true"
      :style="{ fill: currentColor, transition: 'fill 0.3s ease' }">
    <use :xlink:href="iconClassName"/>
  </svg>
</template>

<script setup lang="ts">
import {computed, ref} from 'vue';

const props = defineProps({
  iconName: {
    type: String,
    required: true
  },
  className: {
    type: String,
    default: ''
  },
  color: {
    type: String,
    default: '#ffffff' // 默认白色
  }
});

const currentColor = ref(props.color);


const iconClassName = computed(() => `#${props.iconName}`);

const svgClass = computed(() =>
    props.className ? `svg-icon ${props.className}` : 'svg-icon'
);

</script>
<style scoped>

</style>
