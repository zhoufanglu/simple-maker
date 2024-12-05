<script setup lang="ts">
  import Motion from '@/components/motion'
  import Draggable from 'vuedraggable'
  import { ImgItem } from '@/views/home/types'
  import type { UploadFileInfo } from 'naive-ui'
  import { debounce } from '@/tools'

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
    console.log(31, options.fileList)
    const images: ImgItem[] = options.fileList.map((file) => {
      return {
        path: URL.createObjectURL(file!.file),
        name: '',
      }
    })
    addImages(images)
  }

  /** ********************一键导入***********************/
  const showModal = ref(false)
  const openOneClick = () => {
    showModal.value = true
  }

  const imageFiles: any = import.meta.glob('@/assets/imgs/lol/*.png', { eager: true })
  const handleImportOneClickImgs = () => {
    const imageUrls: ImgItem[] = Object.values(imageFiles).map((module) => {
      // 每个模块是 { default: URL }
      return {
        path: module!.default || module,
        name: '',
      }
    })
    addImages(imageUrls)
    showModal.value = false
  }

  const debouncedHandleUploadChange = debounce(handleUploadChange, 300)

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
        <i class="iconfont">&#xe613;</i>
      </div>
    </Motion>
    <!--?一键导入弹窗-->
    <n-modal
      v-model:show="showModal"
      class="one-click-model"
      :bordered="false"
      preset="dialog"
      title="Dialog"
    >
      <template #header>
        <div>选择你需要的图片集</div>
      </template>
      <div class="one-modal-box">
        <n-tag @click="handleImportOneClickImgs">
          英雄联盟
          <template #avatar>
            <n-avatar
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAC9ElEQVR4ARWNA6w1RxiGn9md3Vlds7Zt27YVFLFrRI0aJ43ZuLZt27g2js9Z70zP/+FF9Mj7bzp4YY+JoaFcW0jp0ex0SNIE19nRK2wEmBw/8nHcfjMlhRYMBj4zS0lLTgwOjD35Sjvc7g0QqmXiXoKxDJZwCVyIxR6UjCDtBEFOlVsYY5gaaHLHOV6fIe1yqwtbrV256jy44nBDe7NNFGqe+sTlO+tskqGD0ek81FdAjkGrjdl+hqIaKaUTTqHcdTjhGt5YmOdQ5wnuuPVINmLDt++dxPgpZ9Hstei1J8AJ0aWF8UNUexLXj5BxmmLyHtQ+Ixvbn7mVgkRbpCpETu+EDnykAIzEOAUi0ZhqA9PSdLoNZK3ZwBgbUo1l+yA0jijAAk8nBIGiWZYY10d6IXoAdNwAnVHfbiAjlaP9fUEdhe4VSEfhuxITFxTbNbJWlzg34FiIKMB0M8g0eVkR+g7SIqESY8B+iPr72JMGLUMqXSFMiR8pVKWIRgSBkqwuujC1Oyx7OHYPWeU5fQyYBOxhSp2SZhlOGGHsgMwawBkKKe2cxtISxZff4leLjI6PUNFA2jrHaA1qBLJx0AUIgQpdGjMf0/38WAaPPJR6O8Z8+wOD9Tc456AFvls5CuX8g/SVg6W7MNL/dJg+vP85cljipZ+SfvYrtW92xg4GOWSoxeP3dPkyOZV3a/uj1PdIRwmEGoBRBzP/F0JVtDspaW2G+y5U1OIU5c2x75Tg6MOmOfTUA3j40RGcoTGCoWEklkaIYdgs2CV/jzNPHiLKe7i65IZrD2J62EFXGkuUjO41wpcLml//25nJ4Q7SsZGlVuS9efjpUXbZ+ztmkp3455MW2h6lMglRIPEGQixP4f1Y8MlPFUyfg248T9zaQPqeLcenD4HJg/m3uoyfP9Do3h9UzsEIq4ucmAKTIYYcECVSa4bELBNugvKUlB3j1R67S5ZxtobjQhXXKeMtCj2P1lAUGioNGKRjYVNQaMPISMRKM2z9D3yKcee9oww3AAAAAElFTkSuQmCC"
            />
          </template>
        </n-tag>
      </div>
      <!--      <template #action>
        <n-button @click="handleImportOneClickImgs">确定</n-button>
      </template>-->
    </n-modal>
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
    align-items: flex-start;
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
    .import-box {
      display: flex;
      align-items: center;
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
      .import-btn-one-click {
        @extend .import-btn;
        height: 116px;
        width: 40px;
        display: flex;
        flex-direction: column;
        font-size: 16px;
        i {
          font-size: 14px;
        }
      }
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
</style>
