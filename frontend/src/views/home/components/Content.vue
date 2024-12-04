<script setup lang="ts">
  import Draggable from 'vuedraggable'
  import { RankingItem } from '../types'
  import Motion from '@/components/motion'

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
  const defaultLevelList = ['S', 'A', 'B', 'C', 'D']
  const defaultImgList = [
    'https://api.dicebear.com/7.x/adventurer/svg?seed=1',
    'https://api.dicebear.com/7.x/adventurer/svg?seed=2',
    'https://api.dicebear.com/7.x/adventurer/svg?seed=3',
    'https://api.dicebear.com/7.x/adventurer/svg?seed=4',
  ]

  rankingRows.value = []

  initRankingRows()
  rankingRows.value[0].items.push({ path: defaultImgList[0] })
  rankingRows.value[0].items.push({ path: defaultImgList[1] })
  console.log(27, rankingRows.value)

  function initRankingRows() {
    for (let i = 0; i < 5; i++) {
      rankingRows.value.push({
        levelName: defaultLevelList[i],
        items: [],
        bgColor: defaultColorList[i],
      })
    }
  }
</script>
<template>
  <div class="content">
    <!--    <ul style="height: 100px">
      <li v-for="(i, index) in rankingRows" :key="index">
        {{ i }}
      </li>
    </ul>-->
    <draggable
      handle=".handle"
      ghost-class="ghost"
      animation="200"
      :list="rankingRows"
      item-key="levelName"
    >
      <template #item="{ element: rank }">
        <ul class="rank-row">
          <!--?level-item-->
          <li class="level-item" :style="{ backgroundColor: rank.bgColor }">
            <div class="level-name">{{ rank.levelName }}</div>
          </li>
          <!--?img-list-->
          <!--          <li class="img-row">-->
          <!--!行内img拖动-->
          <draggable
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
          <!--          </li>-->
          <!--?action-->
          <li class="action-item drag-handle">
            <Motion>
              <i class="iconfont fa fa-align-justify handle">&#xe6c4;</i>
            </Motion>
          </li>
        </ul>
      </template>
    </draggable>
    <!--
<ul v-for="rank in rankingRows" :key="rank.levelName" class="rank-row">
  <li
    class="level-item"
    :style="{
      backgroundColor: rank.bgColor,
    }"
  >
    <div class="level-name">{{ rank.levelName }}</div>
  </li>
  <li class="img-row">
    <div v-for="imgPath in rank.items" :key="imgPath.path"></div>
  </li>
  <li class="action-item">
    <Motion>
      <i class="iconfont">&#xe6c4;</i>
    </Motion>
  </li>
</ul>
-->
  </div>
</template>

<style scoped lang="scss">
  .content {
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    padding: 16px;
    .rank-row {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      .level-item {
        height: 80px;
        width: 80px;
        @include vertical-center;
        font-size: 24px;
        font-weight: bold;
        color: white;
        border-radius: 8px;
        margin-right: 8px;
        .level-name {
          // text-shadow: 1px 2px 10px 0 rgba(0, 0, 0, 1);
          text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.4);
        }
      }
      .img-row {
        // border: solid 1px red !important;
        background-color: #fafafa;
        height: 80px;
        width: 100%;
        box-sizing: border-box;
        border-radius: 8px;
        padding: 8px;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 8px;
        border: 2px dashed #e8e8e8;
        transition: all 0.3s ease;
        .img-item {
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          cursor: grab;
          padding: 8px;
          border-radius: 8px;
          box-sizing: border-box;
          background: white;
          //  transition: all 0.3s ease;
          &:hover {
            // transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
          }
        }
      }
      .action-item {
        width: 40px;
        height: 80px;
        @include vertical-center;
        i {
          font-size: 24px;
          cursor: pointer;
        }
      }
    }
  }
</style>
