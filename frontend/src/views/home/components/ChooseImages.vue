<script setup lang="ts">
  import Motion from '@/components/motion'
  import Draggable from 'vuedraggable'
  import { ImgItem } from '@/views/home/types'

  const images = ref<ImgItem[]>([
    {
      path: 'https://api.dicebear.com/7.x/adventurer/svg?seed=10',
      name: '',
    },
    {
      path: 'https://api.dicebear.com/7.x/adventurer/svg?seed=11',
      name: '',
    },
  ])

  const handleImportImg = () => {}

  const handleDelImg = (index: number) => {
    images.value.splice(index, 1)
  }
  const addImages = (imgs: ImgItem[]) => {
    images.value = [...images.value, ...imgs]
  }

  defineExpose({
    addImages,
  })
</script>
<template>
  <div class="choose-images">
    <Draggable
      v-auto-animate
      class="img-row"
      itemKey="path"
      group="img-row"
      ghost-class="ghost"
      animation="200"
      :list="images"
    >
      <template #item="{ element: img, index }">
        <div class="img-box">
          <n-image :key="img.path" :src="img.path" preview-disabled width="80" class="img-item">
          </n-image>
          <i class="iconfont img-del-icon" @click="handleDelImg(index)">&#xe616;</i>
        </div>
      </template>
    </Draggable>
    <Motion>
      <div class="import-btn" @click="handleImportImg">
        <i class="iconfont">&#xe613;</i>
      </div>
    </Motion>
  </div>
</template>

<style scoped lang="scss">
  .choose-images {
    background-color: white;
    box-sizing: border-box;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    padding: 16px;
    margin-top: 10px;
    width: 100%;
    display: flex;
    align-items: center;
    .img-row {
      // border: solid 1px red !important;
      background-color: #fafafa;
      min-height: 116px;
      width: 100%;
      overflow-y: auto;
      box-sizing: border-box;
      border-radius: 8px;
      padding: 8px;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 8px;
      border: 2px dashed #e8e8e8;
      transition: all 0.3s ease;
      .img-box {
        position: relative;
        &:hover {
          .img-del-icon {
            display: block;
          }
        }
        .img-del-icon {
          position: absolute;
          right: 2px;
          top: 2px;
          cursor: pointer;
          display: none;
          &:hover {
            color: #5386ed;
          }
        }
        .img-item {
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          cursor: grab;
          padding: 8px;
          border-radius: 8px;
          box-sizing: border-box;
          background: white;
          margin-left: 6px;
          height: 80px;
          width: 80px;
          &:hover {
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
          }
        }
      }
    }
    .import-btn {
      width: 116px;
      height: 116px;
      border: 2px dashed #e8e8e8;
      border-radius: 4px;
      box-sizing: border-box;
      margin-left: 10px;
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
