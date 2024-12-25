import { defineStore } from 'pinia'
import type { ImgItem, RankingItem } from '@/views/home/types'
const useHomeStore = defineStore({
  id: 'homeInfo',
  state: () =>
    ({
      modeType: 'edit',
      rankingRows: [],
      images: [],
    }) as { modeType: 'edit' | 'preview'; rankingRows: RankingItem[]; images: ImgItem[] },
  actions: {
    switchModeType() {
      this.modeType = this.modeType === 'edit' ? 'preview' : 'edit'
    },
  },
  persist: true, // 数据持久化存储
})

export { useHomeStore }
