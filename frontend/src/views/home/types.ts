export interface ImgItem {
  path: string
  name?: string
}

export interface RankingItem {
  id: string
  levelName: string // 级别名称
  items: ImgItem[] // 该级别下的图片列表
  bgColor: string // 背景颜色
  borderColor: string // 边框颜色 - 默认为背景颜色的 80%
}

export interface ChooseImageItem {
  logo: string
  name: string
  imgs: string[]
}

export type FolderName = 'lol' | 'mapleStory' | 'wukong' | 'PVZ-RH' | 'ACE' | 'yin-yu-fei'
