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
    <router-view></router-view>
  </div>
</template>

<style scoped></style>
