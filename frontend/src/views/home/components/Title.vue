<script setup lang="ts">
  import Motion from '@/components/motion'
  import InputTextEnter from '@/components/InputTextEnter.vue'

  const homeStore = useHomeStore()
  const { title } = storeToRefs(homeStore)
  const { cardSize } = storeToRefs(homeStore)

  defineExpose({ title })
</script>
<template>
  <div class="p-title">
    <Motion>
      <input-text-enter v-model:value="title" from="Title"></input-text-enter>
    </Motion>
    <!--?尺寸-->
    <n-radio-group
      v-show="homeStore.modeType !== 'preview'"
      v-model:value="cardSize"
      class="card-size-config"
      name="cardSize"
    >
      <n-radio key="large" value="large">大</n-radio>
      <n-radio key="normal" value="normal">中</n-radio>
      <n-radio key="small" value="small">小</n-radio>
    </n-radio-group>
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
    position: relative;
    .card-size-config {
      position: absolute;
      right: -10%;
      bottom: 10px;
    }
  }
</style>
