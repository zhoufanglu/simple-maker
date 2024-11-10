<script setup lang="ts">
  interface Tab {
    label: string
    value: string
  }
  const tabs = ref<Tab[]>([])
  tabs.value = [
    {
      label: 'A',
      value: 'A',
    },
    {
      label: 'B',
      value: 'B',
    },
    {
      label: 'C',
      value: 'C',
    },
  ]
  /** ********************点击和悬浮的元素的一些信息***********************/
  const clickElObj = reactive({
    width: 0,
    left: 0,
    opacity: '0',
    bindKey: '', // 这个跟tab的value对应
  })
  const hoverElObj = reactive({
    width: '',
    left: '',
    opacity: '0',
    bindKey: '', // 这个跟tab的value对应
  })
  /** ********************Event***********************/
  const handleMouseenter = (e: Event, key: string) => {
    setPositionByElement(e.currentTarget as HTMLElement, 'hover', key)
  }
  const handleMouseleave = () => {
    hoverElObj.opacity = '0'
  }
  const handleClick = (e: Event, key: string) => {
    setPositionByElement(e.currentTarget as HTMLElement, 'click', key)
  }

  const setPositionByElement = (target: HTMLElement, handle: 'hover' | 'click', key = '') => {
    const position = getElementPosition(target)
    const width = target.offsetWidth
    const element = handle === 'hover' ? hoverElObj : clickElObj
    element.opacity = '1'
    element.width = `${width}px`
    element.left = `${position.left}px`
    element.bindKey = key
  }

  onMounted(() => {
    // ?默认选中第一个
    setPositionByElement(document.querySelector('#A') as HTMLElement, 'click')
  })

  // ?获取元素相对于父元素的位置
  function getElementPosition(element: HTMLElement) {
    const rect = element.getBoundingClientRect()
    const offsetParent = element.offsetParent
    const parentRect = offsetParent!.getBoundingClientRect()

    return {
      top: rect.top - parentRect.top,
      left: rect.left - parentRect.left,
    }
  }
</script>
<template>
  <ul class="animate-tab">
    <!--?动画效果，一个点击，一个悬浮-->
    <li
      class="click-slide"
      :style="{
        width: clickElObj.width,
        left: clickElObj.left,
        opacity: clickElObj.opacity,
      }"
    ></li>
    <li
      class="hover-slide"
      :style="{ width: hoverElObj.width, left: hoverElObj.left, opacity: hoverElObj.opacity }"
    ></li>
    <li
      v-for="i in tabs"
      :id="i.label"
      :key="i.value"
      class="tab"
      @mouseenter.stop.prevent="handleMouseenter($event, i.value)"
      @mouseleave.stop.prevent="handleMouseleave"
      @click.capture="handleClick($event, i.value)"
    >
      <span>{{ i.label }}</span>
    </li>
  </ul>
</template>

<style scoped lang="scss">
  .animate-tab {
    position: relative;
    border: none;
    border-radius: 10em;
    list-style: none;
    background: #f5f5f5;
    box-shadow: 20px 40px 40px #00000033;
    padding: 10px;
    @include vertical-center;

    .hover-slide {
      // box-sizing: border-box;
      position: absolute;
      display: inline-block;
      height: 60px;
      border-radius: 10em;
      transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1.05);
      opacity: 0;
      background-color: rgba(170, 190, 255, 0.5);
      z-index: 1;
      box-shadow: 0 0 20px #ffffffaa inset;
    }

    .click-slide {
      @extend .hover-slide;
      background-color: rgb(170, 190, 255);
      z-index: 2;
      opacity: 1;
    }

    .tab {
      display: inline-block;
      // border: solid 1px red;
      box-sizing: border-box;
      cursor: pointer;
      border-radius: 10em;
      span {
        position: relative;
        padding: 15px 50px;
        font: 500 24px '优设标题黑';
        border: none;
        outline: none;
        color: rgb(70, 100, 180);
        display: inline-block;
        text-decoration: none;
        z-index: 3;
        transform: scale(0.9);
        box-sizing: border-box;
      }
    }
  }
</style>
