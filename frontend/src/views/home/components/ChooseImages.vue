<script setup lang="ts">
  import Motion from '@/components/motion'
  import Draggable from 'vuedraggable'
  import { ImgItem } from '@/views/home/types'
  import type { UploadFileInfo } from 'naive-ui'
  import { debounce } from '@/tools'
  import { useOneClickImport } from '@/views/home/hooks/useOneClickImport'
  import { usePin } from '@/views/home/hooks/usePin'
  import { defineEmits } from 'vue'

  /** ********************图片list模块***********************/
  const images = ref<ImgItem[]>([
    /*    {
      path: 'https://api.dicebear.com/7.x/adventurer/svg?seed=10',
      name: '',
    },
    {
      path: 'https://api.dicebear.com/7.x/adventurer/svg?seed=11',
      name: '',
    }, */
  ])

  const handleImportImg = () => {}

  const handleDelImg = (index: number) => {
    images.value.splice(index, 1)
  }
  const addImages = (imgs: ImgItem[]) => {
    images.value = [...images.value, ...imgs]
  }
  const handleUploadChange = (options: {
    file: UploadFileInfo
    fileList: Array<UploadFileInfo>
    event?: Event
  }) => {
    const images: ImgItem[] = options.fileList.map((file) => {
      return {
        path: URL.createObjectURL(file!.file),
        name: '',
      }
    })
    addImages(images)
  }

  const handleDelAll = () => {
    images.value = []
  }

  /** ********************一键导入***********************/
  const { variables } = useOneClickImport()

  const openOneClick = () => {
    variables.visible = true
  }

  const handleImportOneClickImgs = (imgs: string[]) => {
    addImages(
      imgs.map((imgPath) => ({
        name: '',
        path: imgPath,
      })),
    )
    variables.visible = false
  }

  const debouncedHandleUploadChange = debounce(handleUploadChange, 300)

  /** ********************pin***********************/
  const emits = defineEmits(['handleImageBoxHeightChange'])
  const chooseImagesRef = ref<Element | null>(null)
  const { isPin } = usePin(emits, chooseImagesRef)

  defineExpose({
    addImages,
  })
</script>
<template>
  <div ref="chooseImagesRef" class="choose-images" :class="isPin ? 'pin-choose-images' : null">
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
    <!--?自定义导入-->
    <Motion class="import-box">
      <n-upload
        :show-file-list="false"
        accept="image/png, image/jpeg, image/gif"
        :on-change="debouncedHandleUploadChange"
        multiple
      >
        <div class="import-btn" @click="handleImportImg">
          <i class="iconfont">&#xe613;</i>
        </div>
      </n-upload>
      <div class="import-btn-one-click" @click="openOneClick">
        <span>一</span>
        <span>键</span>
        <span>导</span>
        <span>入</span>
        <!--        <i class="iconfont">&#xe808;</i>-->
      </div>
      <div class="delete-all" @click="handleDelAll">
        <span>删</span>
        <span>除</span>
        <span>全</span>
        <span>部</span>
        <!--        <i class="iconfont">&#xe809;</i>-->
      </div>
    </Motion>
    <!--?Pin按钮-->
    <div class="pin-btn" @click="isPin = !isPin">
      <i v-show="!isPin" class="pin iconfont">&#xe864;</i>
      <i v-show="isPin" class="pin-fill iconfont">&#xe863;</i>
    </div>
    <!--?一键导入弹窗-->
    <n-modal
      v-model:show="variables.visible"
      class="one-click-model"
      :bordered="false"
      preset="dialog"
      title="Dialog"
    >
      <template #header>
        <div>选择你需要的图片集</div>
      </template>
      <div class="one-modal-box">
        <n-tag
          v-for="(collect, index) in variables.imgCollections"
          :key="index"
          @click="handleImportOneClickImgs(collect.imgs)"
        >
          {{ collect.name }}
          <template #avatar>
            <n-avatar :src="collect.logo" />
          </template>
        </n-tag>
      </div>
    </n-modal>
  </div>
</template>

<style scoped lang="scss">
  .choose-images {
    background-color: white;
    box-sizing: border-box;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    padding: 16px 30px 16px 16px;
    margin-top: 10px;
    width: 100%;
    display: flex;
    align-items: flex-start;
    position: relative;
    transition: all 0.3s ease;
    .img-row {
      // border: solid 1px red !important;
      background-color: #fafafa;
      min-height: 116px;
      // max-height: 120px;
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
          box-shadow: 0 4px 8px rgba(255, 255, 255, 0.15);
          background-color: white;
          border-radius: 2px;
          transition: all 0.3s ease;
          &:hover {
            color: #5386ed;
          }
        }
        .img-item {
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          cursor: grab;
          // padding: 8px;
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
    .import-box {
      display: flex;
      align-items: center;
      // width: 58px;
      .import-btn {
        height: 116px;
        width: 58px;
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
      .import-btn-one-click {
        @extend .import-btn;
        height: 116px;
        width: 40px;
        display: flex;
        flex-direction: column;
        font-size: 16px;
        i {
          font-size: 20px;
        }
      }
      .delete-all {
        @extend .import-btn-one-click;
      }
    }
    .pin-btn {
      position: absolute;
      right: 2px;
      top: 2px;
      cursor: pointer;
      i {
        font-size: 26px;
      }
      .pin-fill {
        color: #5386ed;
      }
    }
  }
  .pin-choose-images {
    position: fixed;
    bottom: 0;
    left: 0;
    //border: solid 1px red;
    z-index: 9999;
    box-shadow: -2px -2px 1px 0px rgba(0, 91, 211, 0.3);
    .img-row {
      max-height: 300px;
    }
  }
</style>
<style lang="scss">
  .one-click-model {
    width: 468px;
    position: fixed;
    top: 20%;
    left: calc(50% - 234px);
    .one-modal-box {
      padding: 20px;
      display: flex;
      gap: 8px;
      margin-top: 8px;
      border-radius: 8px;
      .n-tag {
        cursor: pointer;
      }
    }
  }
  .n-upload {
    // border: solid 1px red;
    width: auto;
  }
</style>
