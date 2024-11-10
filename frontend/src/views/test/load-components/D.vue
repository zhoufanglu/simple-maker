<script setup lang="ts">
  console.log('D')
</script>
<template>
  <div class="p-test"> D</div>
</template>

<style scoped lang="scss">
  .p-test {
    height: 500px;
    border: solid 1px red;
    @include vertical-center;
    font-size: 40px;
    color: white;
    background-color: #00ff00;
  }
</style>
