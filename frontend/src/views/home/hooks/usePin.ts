import { useElementSize } from '@vueuse/core'

const usePin = (
  emits: {
    (e: 'handleImageBoxHeightChange', height: number, isPin: boolean): void
  },
  chooseImagesRef: Ref<HTMLElement | null>,
) => {
  const isPin = ref(false)
  const { height } = useElementSize(chooseImagesRef)
  watch([height, isPin], () => {
    emits('handleImageBoxHeightChange', height.value, isPin.value)
  })

  return {
    isPin,
  }
}

export { usePin }
