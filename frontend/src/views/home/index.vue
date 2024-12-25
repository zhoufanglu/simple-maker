<script setup lang="ts">
  import Title from '@/views/home/components/Title.vue'
  import ChooseImages from '@/views/home/components/ChooseImages.vue'
  import Content from '@/views/home/components/Content.vue'
  import Header from '@/views/home/components/Header.vue'
  import { RankingItem } from '@/views/home/types'
  import { useHomeStore } from '@/store/home'
  // @ts-ignore
  import domtoimage from 'dom-to-image'
  import { useMessage } from 'naive-ui'

  const chooseImagesRef = ref<InstanceType<typeof ChooseImages>>()
  const homeStore = useHomeStore()

  const handleDelRow = (row: RankingItem) => {
    chooseImagesRef.value.addImages(row.items)
  }

  // ? 模拟一个下面的占位box
  const pinImgsBoxHeight = ref(0)
  const handleImageBoxHeightChange = (height: number, isPin: boolean) => {
    pinImgsBoxHeight.value = isPin ? height + 10 : 0
  }

  const previewBoxRef = ref<HTMLElement>()
  const titleRef = ref<InstanceType<typeof Title>>(null)
  const message = useMessage()
  const downloadLoading = ref(false)
  const handleDownload = async () => {
    const element = previewBoxRef.value
    downloadLoading.value = true
    try {
      const dataUrl = await domtoimage.toPng(element, {
        style: { background: 'transparent' }, // 保持透明背景
      })
      const link = document.createElement('a')
      link.href = dataUrl
      link.download = `${titleRef.value.title}.png` // 下载文件名
      link.click()
      message.success('导出成功')
    } catch (error) {
      message.error(`导出失败：${error}`)
      console.error('生成图片失败', error)
    } finally {
      downloadLoading.value = false
    }
  }
</script>
<template>
  <div class="p-home">
    <n-spin :show="downloadLoading">
      <template #description> 导出中... </template>
      <Header @handle-down-load="handleDownload"></Header>
      <div ref="previewBoxRef" class="preview-box">
        <Title ref="titleRef"></Title>
        <div class="container">
          <content @handle-del-row="handleDelRow"></content>
          <choose-images
            v-show="homeStore.modeType === 'edit'"
            ref="chooseImagesRef"
            @handle-image-box-height-change="handleImageBoxHeightChange"
          ></choose-images>
          <div
            class="pin-box"
            :style="{
              height: pinImgsBoxHeight + 'px',
            }"
          ></div>
        </div>
      </div>
    </n-spin>
  </div>
</template>

<style scoped lang="scss">
  .p-home {
    height: 100vh;
    width: 100%;
    box-sizing: border-box;
    padding: 0 20px 20px 20px;
    overflow-y: auto;
    position: relative;
    //border: solid 1px red;
    .container {
      // border: dashed 1px black;
      border-radius: 10px;
      // height: 100%;
      width: 100%;
      box-sizing: border-box;
      background-color: #f5f5f5;
      padding: 10px;
      overflow-y: auto;
    }
    .pin-box {
      // border: solid 1px red;
    }
  }
</style>
