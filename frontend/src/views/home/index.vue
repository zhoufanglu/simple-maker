<script setup lang="ts">
  import Title from '@/views/home/components/Title.vue'
  import ChooseImages from '@/views/home/components/ChooseImages.vue'
  import Content from '@/views/home/components/Content.vue'
  import Header from '@/views/home/components/Header.vue'
  import { RankingItem } from '@/views/home/types'
  import { useHomeStore } from '@/store/home'

  const ChooseImagesRef = ref<InstanceType<typeof ChooseImages>>()
  const homeStore = useHomeStore()

  const handleDelRow = (row: RankingItem) => {
    ChooseImagesRef.value.addImages(row.items)
  }
</script>
<template>
  <div class="p-home">
    <Header></Header>
    <Title></Title>
    <div class="container">
      <content @handle-del-row="handleDelRow"></content>
      <choose-images v-show="homeStore.modeType === 'edit'" ref="ChooseImagesRef"></choose-images>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .p-home {
    height: 100vh;
    width: 100%;
    box-sizing: border-box;
    padding: 0 20px 20px 20px;
    overflow-y: auto;
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
  }
</style>
