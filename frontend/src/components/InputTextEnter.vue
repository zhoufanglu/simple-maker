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
      display: block;
      flex-wrap: wrap;
      min-width: 60px;
      // line-height: 44px;
      min-height: 60px;
      max-height: 100px;
      max-width: 100px;
      // border: solid 1px red;
      text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.4);
      font-size: 40px;
      // font-size: calc(40px - 0.5px * var(--text-length));
      word-wrap: break-word;
      white-space: normal;
      text-align: center; /* 居中文字 */
      overflow-wrap: break-word; /* 强制长单词换行 */
      line-break: auto; /* 处理中文换行 */
    }
    .title-span {
      font-size: 50px;
      color: #5c3f95;
      font-family: ALIMAMAFONT;
    }
  }
</style>
