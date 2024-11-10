<script setup lang="ts"></script>
<template>
  <div class="position-sticky">
    <div class="row">
      <span>aa</span>
      <el-button class="sticky">更多</el-button>
    </div>
    <div class="row">
      <span>aaaaaaaaaaaaaaaaaa</span>
      <el-button class="sticky">更多</el-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .position-sticky {
    border: solid 1px red;
    padding: 20px;
    width: 100px;
    overflow-y: auto;
    display: flex;
    align-items: center;
    flex-direction: column;
    .row {
      @include vertical-center;
      justify-content: flex-start;
    }
    .sticky {
      position: sticky;
      right: 0;
      margin-left: 20px;
    }
  }
</style>
