<template>
  <div class="long-list">
    <h4>虚拟列表</h4>
    <ul ref="containRef" @scroll="handleScroll">
      <div class="blank-box" :style="blankBoxPadding">
        <!--        <li v-for="(i, index) in variables.list" :key="index">{{ index }}</li>-->
        <li v-for="(i, index) in getDisplayList" :key="index">{{ i }}</li>
      </div>
    </ul>
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive, onMounted, computed } from 'vue'

  const containRef = ref<any>('')
  const variables = reactive({
    list: [] as any[],
    containHeight: 0, // 可视容器大小
    rowHeight: 20, // 每行高度 20px
    renderNums: 0, // 渲染个数
    rowStartIndex: 0, // 渲染开始的第一项索引
    rowEndIndex: 0, // 渲染结束的最后一项索引
  })

  const mockData = () => {
    variables.list = Array.from({ length: 100000 }, (v, k) => k)
  }
  mockData()

  const handleScroll = (e: any) => {
    const { scrollTop } = e.target
    variables.rowStartIndex = ~~(scrollTop / variables.rowHeight)
    // variables.rowEndIndex = variables.rowStartIndex + variables.renderNums
    console.log(variables.rowStartIndex + '---' + getRowEndIndex.value)
    // 起点不会超过数组的最大值-显示的个数
    if (variables.rowStartIndex >= variables.list.length - variables.renderNums) {
      variables.rowStartIndex = variables.list.length - variables.renderNums
    }
  }

  const getRowEndIndex = computed((): number => {
    let endIndex = variables.rowStartIndex + variables.renderNums
    return endIndex
  })

  const getDisplayList = computed(() => {
    console.log(47, variables.list.slice(variables.rowStartIndex, getRowEndIndex.value))
    return variables.list.slice(variables.rowStartIndex, getRowEndIndex.value)
  })

  const blankBoxPadding = computed(() => {
    return {
      paddingTop: variables.rowStartIndex * variables.rowHeight + 'px',
      paddingBottom: (variables.list.length - getRowEndIndex.value) * variables.rowHeight + 'px',
    }
  })

  onMounted(() => {
    // 计算容器高度
    variables.containHeight = containRef.value?.offsetHeight
    // 计算容器渲染个数
    variables.renderNums = ~~(variables.containHeight / variables.rowHeight)
    console.log(26, variables.renderNums)
  })
</script>

<style scoped lang="scss">
  .long-list {
    // height: 500px;
    // border: solid 1px red;
    ul {
      width: 500px;
      height: 200px;
      box-sizing: border-box;
      border: solid 2px red;
      overflow-y: auto;
      display: inline-block;
      li {
        background-color: #00aaaf;
        color: white;
        font-weight: bolder;
        border-bottom: solid 1px black;
        height: 20px;
        box-sizing: border-box;
      }
    }
  }
</style>
