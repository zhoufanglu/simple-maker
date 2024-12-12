<script setup lang="ts">
  import { useHomeStore } from '@/store/home'
  import Motion from '@/components/motion'
  import { useMessage } from 'naive-ui'

  const message = useMessage()
  const wxQR = new URL('@/assets/imgs/pay/wxQR.JPG', import.meta.url)
  const goGithub = () => {
    window.open('https://github.com/zhoufanglu/simple-maker/tree/main', '_blank')
  }

  const homeStore = useHomeStore()
  const handelSwitchModel = () => {
    homeStore.switchModeType()
    message.success(`已经切换为${homeStore.modeType == 'edit' ? '【编辑】' : '【预览】'}模式`)
  }

  const modalVisible = ref(false)

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
      <Motion>
        <!--?展示/编辑状态-->
        <n-button quaternary type="info" @click="handelSwitchModel">
          <i
            class="iconfont mode-icon"
            v-html="homeStore.modeType === 'edit' ? '&#xe655;' : '&#xec86;'"
          ></i>
        </n-button>
        <!--?coffee-->
        <n-button quaternary type="info" @click="modalVisible = true">
          <i class="iconfont">&#xe60a;</i>
        </n-button>
        <!--?github-->
        <n-button quaternary type="info" @click="goGithub">
          <i class="iconfont">&#xe85a;</i>
        </n-button>
      </Motion>
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
            <n-image :height="562 / 2" :width="424 / 2" :src="wxQR" />
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
      i {
        color: #5386ed;
        font-size: 24px;
      }
      .mode-icon {
        font-size: 26px;
      }
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
