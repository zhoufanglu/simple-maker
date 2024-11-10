<script setup lang="ts"></script>
<script lang="ts">
  // !第二层嵌套defineComponent不能触发
  export default defineComponent({
    beforeRouteEnter(to, from, next) {
      console.log(35, to)
      console.log(36, from)
      alert('aa')

      next((e) => {
        console.log(38, e)
        e.beforeRouteEnterInner(from)
      })
    },
  })
</script>
<template>
  <div class="">beforeRouteEnter </div>
</template>

<style scoped lang="scss">
  .test {
  }
</style>
