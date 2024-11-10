import type { Directive, DirectiveBinding } from 'vue'

export const auth: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding<string | Array<string>>) {
    const { value } = binding
    const hasAuth = true
    console.log(7, value)
    if (value) {
      !hasAuth && el.parentNode?.removeChild(el)
    } else {
      throw new Error('auth error')
    }
  },
}
