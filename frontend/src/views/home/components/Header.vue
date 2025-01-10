<script setup lang="ts">
  import { useHomeStore } from '@/store/home'
  import Motion from '@/components/motion'
  import { useMessage } from 'naive-ui'
  import { defineEmits } from 'vue'

  const emits = defineEmits(['handleDownLoad'])

  const message = useMessage()
  const wxQR = new URL('@/assets/imgs/pay/wxQR.JPG', import.meta.url)
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

  // 打赏列表
  const wxRewards = [
    {
      name: 'n*ll',
      money: '0.20',
      time: '2024-12-27',
    },
    {
      name: '[福]*[發]',
      money: '0.10',
      time: '2024-12-26',
    },
    {
      name: '*川',
      money: '0.10',
      time: '2024-12-12',
    },
    {
      name: '拾*忆',
      money: '9.90',
      time: '2024-12-11',
    },
  ]
</script>
<template>
  <div class="p-header">
    <div
      :style="{
        visibility: homeStore.modeType === 'edit' ? 'visible' : 'hidden',
      }"
      class="left"
    >
      <img class="logo" src="/img/simple-logo-all.svg" @click="goGithub()" />
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
            <n-timeline>
              <n-timeline-item
                v-for="(i, index) in wxRewards"
                :key="index"
                type="info"
                :title="i.name"
                :content="`¥ ${i.money}`"
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
      }
    }
  }
</style>
