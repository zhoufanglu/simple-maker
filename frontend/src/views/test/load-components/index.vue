<script setup lang="ts">
  // import AnimateTab from '@/components/AnimateTab.vue'
  // ?异步加载组件函数
  const loadComponent = (name: string) =>
    defineAsyncComponent({
      loader: () => import(`./${name}.vue`),
    })

  // ?所有组件的名称
  const componentNames = ['A', 'B', 'C', 'D']
  // ?所有组件存的数组map
  const components = componentNames.map((name) => {
    return {
      name,
      component: loadComponent(name),
    }
  })
  // ?需要动态加载的组件名称
  const dynamicComponentName = ['B', 'C', 'D']
  // !默认加载的组件名称[], 划到底部后， 从组件名称里面拿出一个，添加到此数组里面
  const displayComponents = ref(['A'])

  /** ********************监听什么时候loadMore***********************/
  const observerElement = ref<HTMLElement | null>(null)
  onMounted(() => {
    let observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio > 0) {
            console.log('进入可视区域')
            loadMore()
          } else {
            // console.log('不可见')
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
    if (dynamicComponentName.length) {
      displayComponents.value.push(dynamicComponentName.shift()!)
    }
  }
</script>
<template>
  <div class="load-component">
    {{ displayComponents }}
    <!--    <AnimateTab />-->
    <template v-for="(i, index) in components" :key="index">
      <component :is="i.component" v-if="displayComponents.includes(i.name)" />
    </template>
    <!--?IntersectionObserver监听的对象-->
    <div ref="observerElement" class="observer-element">监听的dom</div>
  </div>
</template>

<style scoped lang="scss">
  .load-component {
    height: 100%;
    overflow-y: scroll;
    .fix-btn {
      position: fixed;
      top: 0;
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
