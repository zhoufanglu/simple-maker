<script setup lang="ts">
  const title = ref('自定义标题')
  const inputStatus = ref<'input' | 'text'>('input')
  const titleRef = ref<HTMLInputElement>()

  const handleTextClick = () => {
    inputStatus.value = 'input'
    nextTick(() => {
      titleRef.value.focus()
    })
  }
</script>
<template>
  <div class="p-title">
    <n-input
      v-show="inputStatus === 'input'"
      ref="titleRef"
      v-model:value="title"
      type="text"
      size="large"
      @blur="
        () => {
          inputStatus = 'text'
        }
      "
    />
    <n-gradient-text
      v-show="inputStatus === 'text'"
      font-size="50"
      type="info"
      @click="handleTextClick"
    >
      {{ title }}
    </n-gradient-text>
  </div>
</template>

<style scoped lang="scss">
  .p-title {
  }
</style>
