import { createApp, type Directive } from 'vue'
import App from './App.vue'
import router from '@/router'
import pinia from '@/store/index'
import '@/style.scss' // 引入下 不然全局scss不生效(https://github.com/vitejs/vite/issues/5682#issuecomment-968713998)
import { MotionPlugin } from '@vueuse/motion'
import {
  // create naive ui
  create,
  // component
  NButton,
  NInput,
  NGradientText,
  NImage,
} from 'naive-ui'

// 自定义指令
import directivesTool from '@/directives'

const app = createApp(App)

const naive = create({
  components: [NButton, NInput, NGradientText, NImage],
})

app.use(MotionPlugin).use(naive).use(router).use(pinia).use(directivesTool).mount('#app')
