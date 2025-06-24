import type { ChooseImageItem, FolderName } from '../types'

const useOneClickImport = () => {
  const variables = reactive({
    visible: false,
    imgCollections: [] as ChooseImageItem[],
  })
  // ?初始化imgList
  variables.imgCollections = [
    {
      logo: getImageUrl('lol'),
      name: '英雄联盟',
      imgs: getImgPathList('lol'),
    },
    {
      logo: getImageUrl('mapleStory'),
      name: '冒险岛',
      imgs: getImgPathList('mapleStory'),
    },
    {
      logo: getImageUrl('wukong'),
      name: '黑神话-悟空',
      imgs: getImgPathList('wukong'),
    },
    {
      logo: getImageUrl('PVZ-RH'),
      name: '融合版究级植物-PVZ-RH',
      imgs: getImgPathList('PVZ-RH'),
    },
    {
      logo: getImageUrl('ACE'),
      name: 'ACE联盟战队队标',
      imgs: getImgPathList('ACE'),
    },
  ]

  function getImgPathList(folderName: FolderName) {
    let imageFiles: Record<FolderName, { default: string }>

    switch (folderName) {
      case 'lol':
        imageFiles = import.meta.glob('@/assets/imgs/lol/*.png', { eager: true })
        break
      case 'mapleStory':
        imageFiles = import.meta.glob('@/assets/imgs/mapleStory/*.png', { eager: true })
        break
      case 'wukong':
        imageFiles = import.meta.glob('@/assets/imgs/wukong/*.png', { eager: true })
        break
      case 'PVZ-RH':
        imageFiles = import.meta.glob('@/assets/imgs/PVZ-RH/*.png', { eager: true })
        break
      case 'ACE':
        imageFiles = import.meta.glob('@/assets/imgs/ACE/*.{png,jpg,jpeg}', { eager: true })
        break
    }
    return Object.values(imageFiles).map((module) => module.default)
  }

  function getImageUrl(name: string) {
    return new URL(`/src/assets/imgs/logo/${name}.png`, import.meta.url).href
  }

  return {
    variables,
  }
}

export { useOneClickImport }
