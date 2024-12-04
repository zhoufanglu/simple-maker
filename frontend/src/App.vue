<script setup lang="ts">
  onMounted(() => {
    const loader = document.querySelector('.loader') as HTMLElement | null
    if (loader) {
      loader!.style.display = 'none'
    }
  })
</script>

<template>
  <div class="app">
    <n-message-provider>
      <router-view></router-view>
    </n-message-provider>
  </div>
</template>

<style scoped>
  .app {
    height: 100vh;
    width: 100vw;
  }
</style>
