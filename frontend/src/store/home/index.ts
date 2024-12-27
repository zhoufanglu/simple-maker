import { defineStore } from 'pinia'
import type { ImgItem, RankingItem } from '@/views/home/types'
const useHomeStore = defineStore({
  id: 'homeInfo',
  state: () =>
    ({
      modeType: 'edit',
      rankingRows: [],
      images: [],
      title: '创建你的排名列表 🖊️',
    }) as {
      modeType: 'edit' | 'preview'
      rankingRows: RankingItem[]
      images: ImgItem[]
      title: string
    },
  actions: {
    switchModeType() {
      this.modeType = this.modeType === 'edit' ? 'preview' : 'edit'
    },
  },
  persist: true, // 数据持久化存储
})

export { useHomeStore }
