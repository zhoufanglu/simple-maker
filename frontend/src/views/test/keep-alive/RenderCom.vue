<template>
  <render-com></render-com>
</template>

<script setup>
  import { h, defineProps } from 'vue'
  const props = defineProps(['tabIndex'])
  const renderCom = {
    render: () => {
      return h({
        name: `Tab-${props.tabIndex}`,
        render() {
          console.log(13, this)
          return h('span', null, 'ssss')
          // return this.$slots.default()
        },
      })
    },
  }
</script>

<style scoped lang="scss">
  .test {
  }
</style>
