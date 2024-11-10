import { h, ref, render } from 'vue'
import keepAliveComponent from '../keep-alive-detail/index.vue'

export function useDynamicComponent() {
  const comName = ref('1')

  function getComponent() {
    /* const wrapper = {
      name: 'Tab-' + comName.value,
      render() {
        return this.$slots.default()
      }
    } */
    // return () => h('div', null, 11)
  }
  return {
    getComponent,
    comName,
  }
}
