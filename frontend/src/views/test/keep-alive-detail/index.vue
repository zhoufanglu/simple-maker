<template>
  <div class="keep-alive-detail">
    <el-input v-model="value"></el-input>
  </div>
</template>
<script setup lang="ts">
  import { getCurrentInstance, onMounted } from 'vue'
  import { ref } from 'vue'
  import { useRoute } from 'vue-router'
  const route = useRoute()
  const value = ref('')
</script>

<style scoped lang="scss">
  .test {
  }
</style>
