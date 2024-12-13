<script setup lang="ts">
  import Draggable from 'vuedraggable'
  import { RankingItem } from '../types'
  import Motion from '@/components/motion'
  import { useMessage } from 'naive-ui'
  import { useHomeStore } from '@/store/home'
  import InputTextEnter from '@/components/InputTextEnter.vue'
  import { defineEmits } from 'vue'

  const message = useMessage()
  const homeStore = useHomeStore()

  const rankingRows = ref<RankingItem[]>([])
  const defaultColorList = [
    '#F97875', // 纯红
    '#FF7F00', // 橙色
    '#73D13D', // 纯绿
    '#00FFFF', // 青色
    '#69C0FF', // 纯蓝
    '#8B00FF', // 紫罗兰
    '#FF1493', // 深粉色
    '#FFD700', // 金色
    '#00FA9A', // 薄荷绿
    '#9dc3b3', // 薄荷绿
  ]
  const defaultLevelList = ['S', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']
  const defaultImgList = [
    'https://api.dicebear.com/7.x/adventurer/svg?seed=1',
    'https://api.dicebear.com/7.x/adventurer/svg?seed=2',
    'https://api.dicebear.com/7.x/adventurer/svg?seed=3',
    'https://api.dicebear.com/7.x/adventurer/svg?seed=4',
  ]

  rankingRows.value = []

  initRankingRows()
  // test
  /* rankingRows.value[0].items.push({ path: defaultImgList[0] })
  rankingRows.value[0].items.push({ path: defaultImgList[1] }) */

  function initRankingRows() {
    for (let i = 0; i < 4; i++) {
      rankingRows.value.push({
        levelName: defaultLevelList[i],
        items: [],
        bgColor: defaultColorList[i],
      })
    }
  }

  function handleCreate() {
    const len = rankingRows.value.length
    if (len > 9) {
      message.info('最多10个！')
      return
    }
    rankingRows.value.push({
      levelName: defaultLevelList[len],
      items: [],
      bgColor: defaultColorList[len],
    })
  }

  const emits = defineEmits(['handleDelRow'])

  const handleDelRow = (index: number) => {
    console.log(rankingRows.value[index])
    emits('handleDelRow', rankingRows.value[index])
    rankingRows.value.splice(index, 1)
  }

  const hexToRgba = (hex: string, alpha = 0.2) => {
    hex = hex.replace('#', '')
    const r = parseInt(hex.substring(0, 2), 16)
    const g = parseInt(hex.substring(2, 4), 16)
    const b = parseInt(hex.substring(4, 6), 16)
    return `rgba(${r}, ${g}, ${b}, ${alpha})`
  }
</script>
<template>
  <div
    v-auto-animate
    class="content"
    :style="{
      height: homeStore.modeType === 'edit' ? '100%' : 'calc(100vh - 170px)',
    }"
  >
    <Draggable
      v-auto-animate
      style="height: auto"
      handle=".handle"
      ghost-class="ghost"
      animation="200"
      :list="rankingRows"
      item-key="levelName"
    >
      <template #item="{ element: rank, index }">
        <ul class="rank-row">
          <!--?level-item-->
          <li class="level-item" :style="{ backgroundColor: rank.bgColor }">
            <!--TODO: 这里双向绑定会有问题-->
            <!--            <input-text-enter v-model:value="rank.levelName" from="LevelItem"></input-text-enter>-->
            <input-text-enter :value="rank.levelName" from="LevelItem"></input-text-enter>
          </li>
          <!--?img-list-->
          <!--!行内img拖动-->
          <draggable
            :style="{
              width:
                homeStore.modeType === 'edit' ? 'calc(100% - 150px)' : 'calc(100% - 150px + 16px)',
              borderColor: hexToRgba(rank.bgColor),
            }"
            class="img-row"
            ghost-class="ghost"
            animation="200"
            :list="rank.items"
            group="img-row"
            itemKey="path"
          >
            <template #item="{ element: img }">
              <n-image :src="img.path" preview-disabled width="80" class="img-item"> </n-image>
            </template>
          </draggable>
          <!--?action-->
          <Motion v-if="homeStore.modeType === 'edit'">
            <li class="action-item drag-handle">
              <i class="iconfont fa fa-align-justify handle">&#xe6c4;</i>
              <i class="iconfont fa fa-align-justify handle" @click="handleDelRow(index)"
                >&#xe616;</i
              >
            </li>
          </Motion>
        </ul>
      </template>
    </Draggable>
    <div v-if="homeStore.modeType === 'edit'" class="add-action" @click="handleCreate">
      <i class="iconfont">&#xe613;</i>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .content {
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    padding: 16px;
    box-sizing: border-box;
    //transition: all 0.3s ease;
    .rank-row {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      .level-item {
        flex-shrink: 0;
        height: 100px;
        width: 100px;
        @include vertical-center;
        font-size: 24px;
        font-weight: bold;
        color: white;
        border-radius: 8px;
        margin-right: 8px;
        .level-name {
        }
      }
      .img-row {
        background-color: #fafafa;
        min-height: 100px;
        // width: calc(100% - 150px - 16px);
        box-sizing: border-box;
        border-radius: 8px;
        padding: 8px;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 8px;
        border: 2px dashed #e8e8e8;
        // transition: all 0.3s ease;
        .img-item {
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          cursor: grab;
          // padding: 8px;
          border-radius: 8px;
          box-sizing: border-box;
          background: white;
          height: 80px;
          width: 80px;
          &:hover {
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
          }
        }
      }
      .action-item {
        height: 80px;
        padding: 0 10px;
        @include vertical-center;
        flex-direction: column;
        transition: all 0.3s ease;
        i {
          font-size: 20px;
          cursor: pointer;
          &:hover {
            color: #5386ed;
          }
        }
        i:last-child {
          font-size: 24px;
          margin-top: 6px;
        }
      }
    }
    .add-action {
      width: 100%;
      height: 30px;
      border: 2px dashed #e8e8e8;
      border-radius: 4px;
      @include vertical-center;
      transition: all 0.3s ease;
      &:hover {
        color: #5386ed;
        border: 2px dashed #5386ed;
        cursor: pointer;
      }
      i {
        font-size: 20px;
        cursor: pointer;
      }
    }
  }
</style>
