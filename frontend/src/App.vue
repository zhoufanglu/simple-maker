<script setup lang="ts">
  import { darkTheme, NConfigProvider } from 'naive-ui'
  const homeStore = useHomeStore()
  onMounted(() => {
    const loader = document.querySelector('.loader') as HTMLElement | null
    if (loader) {
      loader!.style.display = 'none'
    }
  })

  const isDark = computed(() => {
    return homeStore.skin === 'dark'
  })
</script>

<template>
  <div class="app" :class="isDark ? 'dark' : ''">
    <n-config-provider :theme="isDark ? darkTheme : null">
      <!--      <n-global-style />-->
      <n-message-provider>
        <router-view></router-view>
      </n-message-provider>
    </n-config-provider>
  </div>
</template>

<style lang="scss">
  .app {
    height: 100vh;
    width: 100vw;
  }
  .dark {
    background-color: #333;
    //? 头部
    .p-header {
      .iconfont {
        color: $text_light_color !important;
      }
    }
    .title-span {
      color: $text_light_color !important;
    }
    // ?主体
    .container {
      background: black !important;
      .iconfont {
        color: $text_light_color !important;
      }
      .img-row {
        background-color: black !important;
        .img-item {
          background-color: black !important;
        }
      }
      .add-action {
        border: dashed 2px rgba(255, 255, 255, 0.4) !important;
      }
      .content,
      .choose-images {
        background: #333 !important;
        .import-btn-one-click,
        .delete-all {
          span {
            color: $text_light_color;
          }
        }
        .img-del-icon {
          color: #5386ed !important;
        }
        .dark-row {
          border: none;
          // border: dashed 2px rgba(255, 255, 255, 0.4) !important;
        }
        .import-btn,
        .import-btn-one-click,
        .delete-all {
          border: dashed 2px rgba(255, 255, 255, 0.4) !important;
        }
      }
    }
  }
</style>
