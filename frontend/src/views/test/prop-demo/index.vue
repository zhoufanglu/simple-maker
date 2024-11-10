<template>
  <div class="prop-demo">
    <ChildCom v-model:value="value" @update:value="changeFn"></ChildCom>
  </div>
</template>

<script setup lang="ts">
  import { ref, watch } from 'vue'
  import ChildCom from '@/views/test/prop-demo/ChildCom.vue'
  const value = ref()
  /* watch(value, (val) => {
    console.log(12, val)
  }) */
  const changeFn = (val: any) => {
    console.log(15, val)
    console.log('---', value.value)
  }
</script>

<style scoped lang="scss">
  .prop-demo {
    .input-box {
      border: solid 1px red;
      padding: 20px;
    }
  }
</style>
