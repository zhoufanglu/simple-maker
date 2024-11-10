<script setup lang="ts">
  const requestList = ref<any>(new Array(10).fill(0).map((_, i) => i + 1))
  const loadList = ref<any>([])

  /** ********************滚动监视器***********************/
  const loadMore = () => {
    console.log('------')
    if (loadList.value.length >= 100) {
      console.log('已经满100条了')
      return
    }
    loadList.value.push(...requestList.value)
  }

  loadMore()

  // ?开始观察滚动触发元素
  const contentRef = ref()
  const handleScroll = () => {
    const container = contentRef.value
    // 判断是否滚动到底部
    if (container.scrollTop + container.clientHeight >= container.scrollHeight) {
      loadMore()
    }
  }
</script>
<template>
  <div ref="contentRef" class="p-scroll" @scroll="handleScroll">
    <div v-for="(i, index) in loadList" :key="index" class="card">{{ i }} -- {{ index }}</div>
  </div>
</template>

<style scoped lang="scss">
  .p-scroll {
    border: solid 1px red;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    padding: 50px;
    box-sizing: border-box;
    // height: 100%;
    height: calc(100vh - 48px);
    .card {
      flex-shrink: 0;
      height: 200px !important;
      border: solid 1px blue;
      @include vertical-center;
      font-size: 30px;
      // transform: translateX(100px);
      transition: 500ms;
      // opacity: 0;
      margin: 6px 0;
    }
    .show {
      transform: translateX(0);
      opacity: 1;
    }
    .observer-element {
      border: solid 1px green;
    }
  }
</style>
<style>
  .content {
    border: solid 1px red;
    overflow-y: hidden !important;
  }
</style>
