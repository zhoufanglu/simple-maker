import { createApp, type Directive } from 'vue'
import App from './App.vue'
import router from '@/router'
import pinia from '@/store/index'
import '@/style.scss' // 引入下 不然全局scss不生效(https://github.com/vitejs/vite/issues/5682#issuecomment-968713998)
import { MotionPlugin } from '@vueuse/motion'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import {
  // create naive ui
  create,
  // component
  NButton,
  NInput,
  NGradientText,
  NImage,
  NMessageProvider,
  NUpload,
  NModal,
  NTag,
  NAvatar,
  NTabs,
  NTabPane,
  NTimeline,
  NTimelineItem,
  NSpin,
  NTooltip,
  NSwitch,
} from 'naive-ui'

// 自定义指令
import directivesTool from '@/directives'

import 'vfonts/Lato.css' // 主体文字
import 'vfonts/FiraCode.css' // 等宽字体（用于代码等）

const app = createApp(App)

const naive = create({
  components: [
    NButton,
    NInput,
    NGradientText,
    NImage,
    NMessageProvider,
    NUpload,
    NModal,
    NTag,
    NAvatar,
    NTabs,
    NTabPane,
    NTimeline,
    NTimelineItem,
    NSpin,
    NTooltip,
    NSwitch,
  ],
})

app
  .use(MotionPlugin)
  .use(naive)
  .use(router)
  .use(pinia)
  .use(directivesTool)
  .use(autoAnimatePlugin)
  .mount('#app')
