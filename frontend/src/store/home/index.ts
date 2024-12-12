import { defineStore } from 'pinia'
const useHomeStore = defineStore({
  id: 'homeInfo',
  state: () =>
    ({
      modeType: 'edit',
    }) as { modeType: 'edit' | 'preview' },
  actions: {
    switchModeType() {
      this.modeType = this.modeType === 'edit' ? 'preview' : 'edit'
    },
  },
  persist: true, // 数据持久化存储
})

export { useHomeStore }
