import type { App, Directive } from 'vue'

import { auth } from './auth'

const directivesList: { [key: string]: Directive } = {
  auth,
}
const directivesTool = {
  install: function (app: App<Element>) {
    Object.keys(directivesList).forEach((key) => {
      app.directive(key, directivesList[key])
    })
  },
}

export default directivesTool
