<template>
  <div class="">
    <el-button :disabled="fn()">test</el-button>
  </div>
</template>

<script setup>
  const props = defineProps(['value'])
  const fn = () => {
    console.log(10, 'test')
    console.log(9, props)

    return false
  }
</script>

<style scoped lang="scss">
  .test {
  }
</style>
