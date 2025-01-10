<script setup lang="ts">
  const props = defineProps<{
    from: 'Title' | 'LevelItem'
  }>()

  const text = defineModel<string>('value', {
    required: true,
  })
  const inputState = ref<'input' | 'text'>('text')
  const titleRef = ref<HTMLInputElement>()

  const handleTextClick = () => {
    inputState.value = 'input'
    nextTick(() => {
      titleRef.value.focus()
    })
  }

  const getFontSize = (text: string | number) => {
    const len = String(text).length
    let fontSize = 0
    if (len >= 0 && len < 4) {
      fontSize = 36
    } else if (len >= 4 && len <= 8) {
      fontSize = 30
    } else if (len > 8 && len <= 14) {
      fontSize = 20
    } else if (len >= 15) {
      fontSize = 14
    }
    return fontSize
  }
</script>
<template>
  <div class="p-text">
    <n-input
      v-show="inputState === 'input'"
      ref="titleRef"
      v-model:value="text"
      type="text"
      size="large"
      placeholder=" "
      @keyup.enter="
        () => {
          inputState = 'text'
        }
      "
      @blur="
        () => {
          inputState = 'text'
        }
      "
    />
    <span
      v-if="from === 'Title'"
      v-show="inputState === 'text'"
      class="title-span"
      @click="handleTextClick"
    >
      {{ text }}
    </span>
    <span
      v-show="inputState === 'text' && from === 'LevelItem'"
      class="text-span"
      :style="{ fontSize: getFontSize(text) + 'px' }"
      @click="handleTextClick"
    >
      {{ text }}
    </span>
  </div>
</template>

<style scoped lang="scss">
  .p-text {
    text-align: center;
    box-sizing: border-box;
    .n-input {
      font-size: 24px;
    }
    .n-gradient-text {
      min-width: 300px;
      min-height: 60px;
    }
    .text-span {
      display: flex;
      flex-wrap: wrap; /* 允许换行 */
      align-items: center; /* 垂直居中 */
      justify-content: center; /* 水平居中 */
      height: 100px; /* 容器高度 */
      width: 100px; /* 容器宽度 */
      text-align: center; /* 文字水平居中 */
      word-wrap: break-word; /* 强制文本换行 */
      overflow-wrap: break-word; /* 防止长单词不换行 */
      word-break: break-all;
      white-space: wrap;
      text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.4);
      font-size: 40px;
    }
    .title-span {
      font-size: 50px;
      color: #5c3f95;
      font-family: ALIMAMAFONT;
    }
  }
</style>
