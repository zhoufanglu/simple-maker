<script setup lang="ts">
import Title from '@/views/home/components/Title.vue'
import ChooseFiles from '@/views/home/components/ChooseFiles.vue'
</script>
<template>
  <div class="p-home">
    <Title></Title>
    <ChooseFiles></ChooseFiles>
  </div>
</template>

<style scoped lang="scss">
  .p-home {
    padding: 40px;
  }
</style>
