export interface ImgItem {
  path: string
  name?: string
}

export interface RankingItem {
  id: string
  levelName: string
  items: ImgItem[]
  bgColor: string
}

export interface ChooseImageItem {
  logo: string
  name: string
  imgs: string[]
}

export type FolderName = 'lol' | 'mapleStory' | 'wukong' | 'PVZ-RH' | 'ACE'
