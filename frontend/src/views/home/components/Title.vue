<script setup lang="ts">
  import Motion from '@/components/motion'
  import InputTextEnter from '@/components/InputTextEnter.vue'

  const title = ref('创建你的排名列表 🖊️')

  defineExpose({ title })
</script>
<template>
  <div class="p-title">
    <Motion>
      <input-text-enter v-model:value="title" from="Title"></input-text-enter>
    </Motion>
  </div>
</template>

<style scoped lang="scss">
  .p-title {
    text-align: center;
    box-sizing: border-box;
    padding: 10px;
    height: 90px;
    width: 80%;
    margin: 0 auto;
  }
</style>
