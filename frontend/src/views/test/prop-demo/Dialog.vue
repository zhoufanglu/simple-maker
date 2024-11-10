<template>
  <!-- v-model="dialogVisible" -->
  <el-dialog
    :model-value="props.dialogVisible"
    :close-on-click-modal="false"
    title="A"
    width="30%"
    :show-close="false"
  >
    <span>{{ props.value }}</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeDialog">Cancel</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { toRefs } from 'vue'

  const props = defineProps({
    dialogVisible: {
      type: Boolean,
      default: false,
    },
    value: {
      type: String,
      default: '',
    },
  })

  // const emit = defineEmits(['closeDialog'])
  const emit = defineEmits(['update:dialogVisible'])

  /* const { dialogVisible } = toRefs(props)
  console.log(31, dialogVisible.value) */
  const closeDialog = () => {
    console.log('close')
    emit('update:dialogVisible', false)
    // emit('closeDialog', false)
  }
  const testFn = () => {
    console.log('test111')
  }
  defineExpose({ testFn })
</script>

<style scoped lang="scss">
  .test {
  }
</style>
