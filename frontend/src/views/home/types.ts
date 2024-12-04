export interface ImgItem {
  path: string
  name?: string
}

export interface RankingItem {
  levelName: string
  items: ImgItem[]
  bgColor: string
}
