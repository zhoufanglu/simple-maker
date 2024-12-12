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
    <n-gradient-text
      v-if="from === 'Title'"
      v-show="inputState === 'text'"
      font-size="50"
      type="info"
      @click="handleTextClick"
    >
      {{ text }}
    </n-gradient-text>
    <span
      v-show="inputState === 'text' && from === 'LevelItem'"
      class="text-span"
      font-size="50"
      type="info"
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
      display: inline-block;
      min-width: 50px;
      min-height: 60px;
      @include vertical-center;
      text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.4);
      font-size: 40px;
      font-family: ALIMAMAFONT;
    }
  }
</style>
