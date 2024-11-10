<template>
  <div class=""> keep-alive-test </div>
  <el-tabs
    v-model="editableTabsValue"
    type="card"
    editable
    class="demo-tabs"
    @edit="handleTabsEdit"
  >
    <div> 当前选中:{{ editableTabsValue }} </div>
    <div> 缓存的组件： {{ bindKeys }} </div>
    <el-tab-pane
      v-for="item in editableTabs"
      :key="item.name"
      :label="item.title"
      :name="item.name"
    >
      <!--      {{ item.content }}-->
    </el-tab-pane>
  </el-tabs>
  <div style="border: solid 1px green; padding: 20px">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="renderCom()" :key="editableTabsValue" />
      </keep-alive>
    </router-view>
    <Foo name="sss"></Foo>
  </div>
</template>

<script setup lang="ts">
  import { ref, watch, h } from 'vue'
  import type { TabsPaneContext } from 'element-plus'
  import { useRouter } from 'vue-router'
  import keepAliveComponent from '../keep-alive-detail/index.vue'
  import { useDynamicComponent } from '@/views/test/keep-alive/useDynamicComponent'
  import Foo from './OptCom.vue'
  console.log(37, Foo)

  const { getComponent, comName } = useDynamicComponent()

  const router = useRouter()
  /* const handleClick = (tab: TabsPaneContext, event: Event) => {
    router.push({
      path: `/keep-alive-detail/${tab.props.name}`
    })
  } */
  let tabIndex = 2
  const editableTabsValue = ref('1')
  const editableTabs = ref([
    {
      title: 'Tab 1',
      name: '1',
      content: 'Tab 1 content',
    },
    {
      title: 'Tab 2',
      name: '2',
      content: 'Tab 2 content',
    },
  ])

  const handleTabsEdit = (targetName: string, action: 'remove' | 'add') => {
    if (action === 'add') {
      const newTabName = `${++tabIndex}`
      editableTabsValue.value = '3'
      editableTabs.value.push({
        title: 'Tab 3',
        name: '3',
        content: 'Tab 3',
      })
      // editableTabsValue.value = newTabName
      editableTabsValue.value = '3'
    } else if (action === 'remove') {
      const tabs = editableTabs.value
      let activeName = editableTabsValue.value
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            const nextTab = tabs[index + 1] || tabs[index - 1]
            if (nextTab) {
              activeName = nextTab.name
            }
          }
        })
      }

      editableTabsValue.value = activeName
      editableTabs.value = tabs.filter((tab) => tab.name !== targetName)
    }
  }
  const bindKeys = ref(['1', '2'])
  const test1 = ref(null)
  watch(editableTabsValue, (val) => {
    // console.log(85, val)
    bindKeys.value = editableTabs.value.map((i: any) => `Tab-${i.name}`)
    comName.value = val
    /* router.push({
      path: `/keep-alive-detail/${val}`
    }) */
  })

  const renderCom = () => {
    return {
      render: () => {
        return h({
          name: `Tab-${editableTabsValue.value}`,
          render() {
            console.log(editableTabsValue.value)
            return h('span', null, 'ssss')
            // return this.$slots.default()
          },
        })
      },
    }
  }
</script>

<style scoped lang="scss">
  .test {
  }
</style>
