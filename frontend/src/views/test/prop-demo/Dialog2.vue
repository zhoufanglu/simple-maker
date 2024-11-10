<template>
  <el-dialog
    :model-value="props.dialogVisible"
    :close-on-click-modal="false"
    title="B"
    width="30%"
    :show-close="false"
  >
    <span>{{ dialogVisible }}</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeDialog">Cancel</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { toRefs, computed } from 'vue'

  const props = defineProps({
    dialogVisible: {
      type: Boolean,
      default: false,
    },
  })

  const emit = defineEmits(['update:dialogVisible'])

  const { dialogVisible } = toRefs(props)

  const closeDialog = () => {
    emit('update:dialogVisible', false)
    // innerVisible.value = false
  }
  /*  const innerVisible = computed({
    get() {
      return props.dialogVisible
    },
    set(value: boolean) {
      emit('update:dialogVisible', value)
    }
  }) */
</script>

<style scoped lang="scss">
  .test {
  }
</style>
