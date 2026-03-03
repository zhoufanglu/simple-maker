// Declare v-auto-animate as a valid attribute so Volar/TypeScript won't warn about an unknown directive.
// This file provides a minimal typing to suppress the "Unrecognized Vue directive" diagnostic.

import 'vue'

declare module 'vue' {
  interface HTMLAttributes {
    // allow v-auto-animate directive usage on elements
    'v-auto-animate'?: any
  }
}
