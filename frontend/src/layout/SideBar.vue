<template>
  <div class="d-side-bar">
    <ds-side-bar
      v-model:menus="menus"
      :is-show-drawer="true"
      custom-class="side-bar"
      drawer-custom-class="drawer-custom-class"
      @handle-menu-click="handleMenuClick"
    />
  </div>
</template>

<script setup lang="ts">
  import test from '@/router/modules/test'
  // console.log(15, test)
  const menuChildren = test.map((r) => {
    return {
      name: r.path,
      path: r.path,
      icon: '&#xe682;',
      isCollect: true,
      activeMenu: r.path,
    }
  })
  console.log(25, menuChildren)
  // menus已与组件双向绑定
  const menus = ref([
    {
      name: 'test',
      path: '/',
      icon: '',
      children: menuChildren,
    },
  ])
  const router = useRouter()
  const handleMenuClick = async (menu: any) => {
    console.log(36, menu)
    await router.push(menu.path)
  }
</script>

<style scoped lang="scss">
  .d-side-bar {
    .side-bar {
      height: 100vh;
    }
  }
</style>
<style lang="scss">
  .drawer-custom-class {
    height: calc(100% - var(--nav-bar-height));
    margin-left: calc(var(--side-width) - 1px);
    top: var(--nav-bar-height) !important;
  }
</style>
