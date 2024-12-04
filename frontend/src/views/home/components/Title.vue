<script setup lang="ts">
  import Motion from '@/components/motion'

  const title = ref('custom title 🖊️')
  const inputStatus = ref<'input' | 'text'>('text')
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
    <Motion>
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
    </Motion>
  </div>
</template>

<style scoped lang="scss">
  .p-title {
    text-align: center;
    box-sizing: border-box;
    padding: 10px;
    height: 90px;
  }
</style>
