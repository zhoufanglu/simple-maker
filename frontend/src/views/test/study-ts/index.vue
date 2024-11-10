<script setup lang="ts">
  // eager: true 为同步， false为异步
  const ms = import.meta.glob('./components/**.vue', { eager: true })
  let modules: any = {}
  Object.keys(ms).forEach((key) => {
    const index = key.split('/')[2].split('.')[0]
    // @ts-ignore
    modules[index] = ms[key].default
  })
  const activeName = ref('ReturnType')
  const moduleKeys = Object.keys(modules)

  console.log(34, import.meta.env.VITE_APP_WEB_URL)
  console.log(34, window)
</script>
<template>
  <div class="">
    <el-tabs v-model="activeName" class="demo-tabs" style="margin-top: 16px; font-size: 24px">
      <el-tab-pane v-for="i in moduleKeys" :key="i" :label="i" :name="i" />
    </el-tabs>
    <Component :is="modules[activeName]" />
  </div>
</template>

<style scoped lang="scss">
  .test {
  }
</style>
