<script setup lang="ts">
  import Title from '@/views/home/components/Title.vue'
  import ChooseFiles from '@/views/home/components/ChooseImages.vue'
  import Content from '@/views/home/components/Content.vue'
</script>
<template>
  <div class="p-home">
    <Title></Title>
    <div class="container">
      <Content></Content>
      <ChooseFiles></ChooseFiles>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .p-home {
    height: 100vh;
    width: 100%;
    box-sizing: border-box;
    padding: 40px 10% 10% 10%;
    overflow-y: auto;
    .container {
      // border: dashed 1px black;
      border-radius: 10px;
      // height: 100%;
      width: 100%;
      box-sizing: border-box;
      background-color: #f5f5f5;
      padding: 10px;
      overflow-y: auto;
    }
  }
</style>
