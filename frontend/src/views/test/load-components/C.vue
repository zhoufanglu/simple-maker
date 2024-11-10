<script setup lang="ts">
  console.log('C')
</script>
<template>
  <div class="p-test"> C</div>
</template>

<style scoped lang="scss">
  .p-test {
    height: 500px;
    border: solid 1px red;
    @include vertical-center;
    font-size: 40px;
    color: white;
    background-color: #060607;
  }
</style>
