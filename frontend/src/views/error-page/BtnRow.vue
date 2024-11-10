<script setup lang="ts">
  const props = defineProps({
    dom: {
      type: Function as PropType<() => any>,
      default: () => {},
    },
  })
  const render = props.dom()
</script>

<template>
  <render />
</template>

<style scoped lang="scss">
  .test {
  }
</style>
