import { useElementSize } from '@vueuse/core'

const usePin = (
  emits: {
    (e: 'handleImageBoxHeightChange', height: number, isPin: boolean): void
  },
  chooseImagesRef: Ref<Element | null>,
) => {
  const isPin = ref(false)
  // @ts-ignore TODO: 这里类型定义需要判断下
  const { height } = useElementSize(chooseImagesRef)
  watch([height, isPin], () => {
    emits('handleImageBoxHeightChange', height.value, isPin.value)
  })

  return {
    isPin,
  }
}

export { usePin }
