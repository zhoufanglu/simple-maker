<script setup lang="ts">
  import { useHomeStore } from '@/store/home'
  import Motion from '@/components/motion'
  import { useMessage } from 'naive-ui'

  import { wxRewards } from '@/views/home/rewards'

  const emits = defineEmits(['handleDownLoad'])

  const message = useMessage()
  const wxQR = new URL('@/assets/imgs/pay/wxQR.JPG', import.meta.url).href
  const homeStore = useHomeStore()

  const goGithub = () => {
    window.open('https://github.com/zhoufanglu/simple-maker/tree/main', '_blank')
  }

  const handleDownLoad = async () => {
    // 切换为预览模式 再进行下载
    if (homeStore.modeType === 'edit') {
      homeStore.switchModeType()
    }
    await sleep(500)
    emits('handleDownLoad')
  }
  const handelSwitchModel = () => {
    homeStore.switchModeType()
    message.success(`已切换为${homeStore.modeType === 'edit' ? '【编辑】' : '【预览】'}模式`)
    rightOperateButtons.value[0].icon = homeStore.modeType !== 'edit' ? '&#xe655;' : '&#xec86;'
    rightOperateButtons.value[0].tip = `切换为${homeStore.modeType === 'edit' ? '预览' : '编辑'}模式`
  }

  const modalVisible = ref(false)

  const rightOperateButtons = ref([
    {
      icon: homeStore.modeType !== 'edit' ? '&#xe655;' : '&#xec86;',
      tip: `切换为${homeStore.modeType === 'edit' ? '预览' : '编辑'}模式`,
      click: () => {
        handelSwitchModel()
      },
    },
    {
      icon: homeStore.skin !== 'light' ? '&#xe76b;' : '&#xe617;',
      tip: `切换为${homeStore.skin === 'dark' ? '深色' : '浅色'}模式`,
      click: () => {
        homeStore.switchSkin()
        // message.success(`已切换为${homeStore.skin === 'dark' ? '深色' : '浅色'}模式`)
        rightOperateButtons.value[1].icon = homeStore.skin !== 'light' ? '&#xe76b;' : '&#xe617;'
        rightOperateButtons.value[1].tip = `切换为${homeStore.skin === 'dark' ? '深色' : '浅色'}模式`
      },
    },
    {
      icon: '&#xe60a;',
      tip: '哄冻尼戴斯噶？你要请我喝咖啡？',
      click: () => {
        modalVisible.value = true
      },
    },
    {
      icon: '&#xe66c;',
      tip: '导出为图片',
      click: () => handleDownLoad(),
    },
    {
      icon: '&#xe85a;',
      tip: 'Github',
      click: () => goGithub(),
    },
    {
      icon: '&#xe882;',
      tip: '加入qq讨论群',
      click: () => {
        window.open(
          'https://qm.qq.com/cgi-bin/qm/qr?k=hKBXKNil-4hCYjqwXZYXk6x55pjLVg7l&jump_from=webapi&authKey=jeeNxVzsPVLxFjAOBOE8zI9R3pLAc8lUnXS5aScIoGSXIjPLLok9deDZV2hI1Syv',
          '_blank',
        )
      },
    },
  ])

  // 计算总金额
  const totalMoney = computed(() => {
    return wxRewards.reduce((sum, item) => sum + parseFloat(item.money), 0)
  })
</script>
<template>
  <div class="p-header">
    <div
      :style="{
        visibility: homeStore.modeType === 'edit' ? 'visible' : 'hidden',
      }"
      class="left"
    >
      <img
        class="logo"
        :src="
          homeStore.skin !== 'dark' ? '/img/simple-logo-all.svg' : '/img/simple-logo-all-white.svg'
        "
        @click="goGithub()"
      />
    </div>
    <div class="right">
      <Motion>
        <n-tooltip v-for="(btn, index) in rightOperateButtons" :key="index" :delay="500">
          <template #trigger>
            <n-button quaternary type="info" @click="btn.click()">
              <i class="iconfont" v-html="btn.icon"></i> </n-button
          ></template>
          {{ btn.tip }}
        </n-tooltip>
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
            <div class="reward-panel">
              <n-timeline style="height: 400px; overflow-y: scroll">
                <n-timeline-item
                  v-for="(i, index) in wxRewards"
                  :key="index"
                  type="info"
                  :title="i.name"
                  :content="`¥ ${i.money}`"
                  :time="i.time"
                />
              </n-timeline>
              <div class="total-row">
                <span>总计:</span>
                <span>{{ totalMoney.toFixed(2) }}</span>
              </div>
            </div>
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
    .left {
      .logo {
        cursor: pointer;
        //border: solid 1px red;
        position: relative;
        top: 40px;
        left: -10px;
        width: 100px;
        height: 100px;
        z-index: 999;
      }
    }
    .right {
      i {
        color: #425988;
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
        .n-timeline-item-content__content {
          color: #5386ed;
          font-weight: bolder;
          font-family: ALIMAMAFONT;
        }
        .reward-panel {
          width: 100%;
          h4 {
            margin-top: 6px;
            font-weight: bolder;
            font-family: ALIMAMAFONT;
          }
          .total-row {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            span:first-child {
              margin-right: 10px;
            }
            span:last-child {
              color: #5386ed;
              font-weight: bolder;
              font-family: ALIMAMAFONT;
            }
          }
        }
      }
    }
  }
</style>
