<template>
  <div class="child-com">
    <select @change="onChange">
      <option value="1" label="1"></option>
      <option value="2" label="2"></option>
      <option value="3" label="3"></option>
    </select>
    <el-button @click="$router.push('/test?name=aaa')">go test</el-button>
  </div>
</template>

<script setup lang="ts">
  import { PropType, ref } from 'vue'
  const emit = defineEmits(['update:value'])
  const props = defineProps({
    value: {
      type: String as PropType<string>,
      default: '',
    },
  })
  console.log(20, props)
  const onChange = (e: any) => {
    // console.log(e.target.value)
    emit('update:value', e.target.value)
  }
</script>

<style scoped lang="scss">
  .child-com {
  }
</style>
