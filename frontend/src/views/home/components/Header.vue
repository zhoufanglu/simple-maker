<script setup lang="ts">
  const goGithub = () => {
    window.open('https://github.com/zhoufanglu/simple-maker/tree/main', '_blank')
  }

  const modalVisible = ref(true)

  const rewards = [
    {
      name: '拾不忆',
      money: '9.9',
      time: '2024-12-11',
    },
    {
      name: 'test',
      money: '9.9',
      time: '2024-12-11',
    },
  ]
</script>
<template>
  <div class="p-header">
    <div class="left"></div>
    <div class="right">
      <n-button quaternary type="info" @click="modalVisible = true"> coffee </n-button>
      <n-button quaternary type="info" @click="goGithub"> github </n-button>
    </div>
    <!--? buy coffee-->
    <n-modal
      v-model:show="modalVisible"
      class="buy-coffee-model"
      :bordered="false"
      preset="dialog"
      title="Dialog"
    >
      <template #header>
        <div class="header">
          <div>☕️ Buy me a coffee</div>
        </div>
      </template>
      <div class="buy-coffee-content">
        <n-tabs type="line" animated>
          <n-tab-pane name="二维码" tab="二维码">
            <n-image :height="562 / 2" :width="424 / 2" src="src/assets/imgs/pay/wxQR.JPG" />
          </n-tab-pane>
          <n-tab-pane name="打赏记录" tab="打赏记录">
            <n-timeline>
              <n-timeline-item
                v-for="(i, index) in rewards"
                :key="index"
                type="info"
                :title="i.name"
                :content="`¥${i.money}`"
                :time="i.time"
              />
            </n-timeline>
          </n-tab-pane>
        </n-tabs>
      </div>
    </n-modal>
  </div>
</template>

<style scoped lang="scss">
  .p-header {
    height: 30px;
    // border: solid 1px red;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .right {
    }
  }
</style>
<style lang="scss">
  .buy-coffee-model {
    width: 468px;
    position: fixed;
    top: 20%;
    left: calc(50% - 234px);
    .n-dialog__icon {
      display: none !important;
    }
    .buy-coffee-content {
      // border: solid 1px red;
      .n-tab-pane {
        @include vertical-center;
      }
    }
  }
</style>
