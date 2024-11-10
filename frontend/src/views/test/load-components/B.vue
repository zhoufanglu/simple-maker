<script setup lang="ts">
  console.log('B')
</script>
<template>
  <div class="p-test"> B</div>
</template>

<style scoped lang="scss">
  .p-test {
    height: 500px;
    border: solid 1px red;
    margin: 20px 0;
    @include vertical-center;
    font-size: 40px;
    color: white;
    background-color: #0022ff;
  }
</style>
