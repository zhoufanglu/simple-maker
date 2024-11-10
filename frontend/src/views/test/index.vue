<script lang="ts">
  export default defineComponent({
    beforeRouteEnter(to, from, next) {
      console.log(35, to)
      console.log(36, from)
      next((e) => {
        console.log(38, e)
        // e.beforeRouteEnterInner(from)
      })
    },
  })
</script>
<script setup lang="ts">
  import Motion from '@/components/motion'
  import { ref, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  import childCom from '@/views/test/vModel/chidlrenCom.vue'
  import sticky from '@/views/test/sticky/index.vue'
  import beforeRouteEnter from './beforeRouteEnter/index.vue'
  import { message, closeAllMessage } from '@/tools/message'
  const theme = ref('light')
  const route = useRoute()
  const handleTestClick = () => {
    console.log('ss')
  }

  watch(
    () => route.query,
    (val) => {
      console.log(27, val.name)
    },
    { immediate: true },
  )
  onMounted(() => {
    switchTheme('light')
  })
  const searchForm = ref({})
  const switchTheme = (val: string) => {
    document.querySelector('body')!.setAttribute('data-theme', val)
  }
  /** ********************tree***********************/
  const treeRef: any = ref(null)
  const props = {
    label: 'name',
    children: 'zones',
    isLeaf: 'isLeaf',
  }
  const countId = ref(0)
  const loadNode = (node: Node, resolve: (data: any[]) => void) => {
    console.log(43, node)
    console.log(44, node.isLeaf)
    console.log('-----')
    if (node.level === 0) {
      return resolve([{ name: '全部', objectId: countId.value++ }])
    } else if (node.level !== 0 && !node.isLeaf) {
      setTimeout(() => {
        const data: any[] = [
          {
            name: 'leaf-no-children',
            isLeaf: true,
            zones: [],
            objectId: countId.value++,
          },
          {
            name: 'zone',
            isLeaf: false,
            zones: [{ name: '222', objectId: countId.value++ }],
            objectId: countId.value++,
          },
        ]
        console.log(81, data)
        resolve(data)
      }, 500)
    }
  }
  const refreshPartTree = (operate: any) => {
    if (operate === 'update') {
      console.log(93, treeRef.value)
      treeRef!.value!.updateKeyChildren(3, [
        {
          name: 'leaf-no-children-fuck',
          isLeaf: true,
          zones: [],
          // id: countId.value++,
        },
      ])
      console.log('执行了更新')
    }
  }
  function beforeRouteEnterInner(from: string) {
    console.log(111, from)
  }
  const openMessage = () => {
    message('aaa') // 成功
    message('aaa', { type: 'error' }) // 失败
  }

  defineExpose({ beforeRouteEnterInner })
</script>
<template>
  <div class="ds-switch-theme" :data-theme="theme">
    <el-button v-auth="['aa']" type="primary">权限按钮v-auth</el-button>
    <el-button type="primary" @click="openMessage">message test</el-button>
    <el-button @click="closeAllMessage">close all message</el-button>
    <div
      class="dom-jump-animate"
      style="display: inline-block; border: solid 1px red"
      @click="handleTestClick"
    >
      <el-input disabled value="2323">sss</el-input>
    </div>
    <beforeRouteEnter />
    <el-radio-group v-model="theme" @change="switchTheme">
      <el-radio label="light" size="large">浅色</el-radio>
      <el-radio label="dark" size="large">深色</el-radio>
    </el-radio-group>
    <p class="text">我是文字内容</p>
    <div class="bg">我是背景</div>
    {{ searchForm }}
    <childCom v-model:searchForm="searchForm" />
    <h3>树的加载</h3>
    <el-button @click="refreshPartTree('create')">create</el-button>
    <el-button @click="refreshPartTree('update')">update</el-button>
    <el-button @click="refreshPartTree('delete')">delete</el-button>
    <el-tree
      ref="treeRef"
      node-key="objectId"
      style="max-width: 600px"
      :props="props"
      :load="loadNode"
      lazy
      show-checkbox
    >
      <template #default="scope">
        <span>{{ scope.node.label }}({{ scope.node.id }})</span>
      </template>
    </el-tree>
    <sticky />

    <Motion> <h4>motion</h4> </Motion>
  </div>
</template>

<style scoped lang="scss">
  .ds-switch-theme {
    .text {
      color: $theme;
      @include themify() {
        color: themed('theme');
        background-color: themed('bg_theme');
      }
    }
  }
</style>

<style>
  /* 覆盖禁用输入框的样式（如果需要） */
  .el-input__inner[disabled] {
    pointer-events: none; /* 禁用本身的点击事件 */
    cursor: pointer; /* 让鼠标变为指针形状 */
    opacity: 1; /* 设置不透明度，使其看起来不像禁用状态 */
  }
</style>
