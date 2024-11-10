import { reactive, ref } from 'vue'

const useDialog = () => {
  const variables = reactive({
    visible_A: false,
    visible_B: false,
    value: 'AAAAAAAAAA',
  })
  return { variables }
}

export { useDialog }
