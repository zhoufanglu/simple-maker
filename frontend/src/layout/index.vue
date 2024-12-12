<template>
  <div class="p-layout">
    <div class="nav-bar">
      <nav-bar></nav-bar>
    </div>
    <section>
      <div class="side-bar">
        <side-bar></side-bar>
      </div>
      <div class="content">
        <router-view v-slot="{ Component, route }">
          <transition name="fade-transform">
            <component :is="Component" :key="route.fullPath" />
          </transition>
        </router-view>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
  import SideBar from '@/layout/SideBar.vue'
  import NavBar from '@/layout/NavBar.vue'
</script>

<style scoped lang="scss">
  .p-layout {
    height: 100vh;
    width: 100vw;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    .nav-bar {
      height: var(--nav-bar-height);
      width: 100%;
      background-color: #eeeeee;
    }
    section {
      height: calc(100vh - var(--nav-bar-height));
      width: 100%;

      display: flex;
      flex-direction: row;
      .content {
        // overflow: hidden;
        overflow-y: auto;
        padding: 0;
        width: 100%;
      }
    }
  }
</style>
