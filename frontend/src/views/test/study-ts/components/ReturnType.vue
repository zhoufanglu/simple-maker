<script setup lang="ts">
  function add(a: number, b: number): number {
    return a + b
  }

  type AddReturnType = ReturnType<typeof add>
  // AddReturnType 的类型为 number
</script>
<template>
  <div class=""></div>
</template>

<style scoped lang="scss">
  .test {
  }
</style>
