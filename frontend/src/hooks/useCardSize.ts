import { useHomeStore } from '@/store/home'

const homeStore = useHomeStore()
function useCardSize() {
  const getCardStyle = (type: 'level-item' | 'img-item') => {
    const sizeMap = {
      small: 100,
      normal: 120,
      large: 200,
    }
    const cardSize = sizeMap[homeStore.cardSize] || 120
    if (type === 'level-item') {
      return {
        width: `${cardSize}px`,
        height: `${cardSize}px`,
      }
    } else if (type === 'img-item') {
      return {
        width: `${cardSize * 0.8}px`,
        height: `${cardSize * 0.8}px`,
      }
    }
    return {}
  }

  return {
    getCardStyle,
  }
}

export { useCardSize }
