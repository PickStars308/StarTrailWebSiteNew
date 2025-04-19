<!-- AboutTitle.vue -->
<script setup lang="ts">
defineProps({
  prefix: {type: String, default: "About"},
  suffix: {type: String, default: "PickStars"}
});
</script>

<template>
  <div class="font-bold mb-4 ml-10 relative inline-block
  after:content-[''] after:absolute after:left-0 after:-bottom-2 after:w-1/2 after:h-1.5 after:bg-white/50">
    <span class="text-white/50 mr-2">{{ prefix }}</span>
    <span class="text-white"> {{ suffix }}</span>
  </div>
</template>

<style scoped>
div {
  font-size: 2.5rem; /* 40.0px */
}

@media (max-width: 480px) {
  div {
    font-size: 1.5rem; /* 32.0px */
  }
}
</style>