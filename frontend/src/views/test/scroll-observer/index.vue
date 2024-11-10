<script setup lang="ts">
  /* const requestList = ref<any>(new Array(10).fill(0).map((_, i) => i + 1))
  const loadList = ref<any>([])
  const observerElement = ref<HTMLElement | null>(null)
  onMounted(() => {
    let observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          /!**
           * isIntersecting
           * 0 表示目标元素完全不可见。
           * 1 表示目标元素完全可见。
           * 0~1 表示目标元素部分可见
           *!/
          console.log(15, entry.intersectionRatio)
          if (entry.intersectionRatio >= 0) {
            console.log('进入可视区域')
            loadMore()
          } else {
            console.log('不可见')
          }
        })
      },
      {
        threshold: 0,
      },
    )
    observer.observe(observerElement.value!)
  })

  const loadMore = () => {
    console.log('------')
    if (loadList.value.length >= 100) {
      console.log('已经满100条了')
      return
    }
    loadList.value.push(...requestList.value)
  } */
  import TestCom from '@/views/test/scroll-observer/testCom.vue'

  const key = ref(1)
</script>
<template>
  <button @click="key++">change key</button>
  <div class="p-scroll">
    <test-com :key="key"></test-com>
    <!--    &lt;!&ndash;?列表区域&ndash;&gt;
    <div v-for="(i, index) in loadList" :key="index" class="card">{{ i }} &#45;&#45; {{ index }}</div>
    &lt;!&ndash;?IntersectionObserver监听的对象&ndash;&gt;
    <div ref="observerElement" class="observer-element">监听的dom</div>-->
  </div>
</template>

<style scoped lang="scss">
  .p-scroll {
    border: solid 1px red;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    padding: 50px;
    box-sizing: border-box;
    .card {
      height: 200px;
      border: solid 1px blue;
      display: flex;
      align-items: center;
      justify-content: center;
      //@include vertical-center;
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
      background: green;
      color: white;
      font-size: 20px;
      height: 100px;
    }
  }
</style>
