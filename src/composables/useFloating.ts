import type { Ref } from 'vue'
import gsap from 'gsap'
import { inject, nextTick, onMounted } from 'vue'
import { GSAP_CONTEXT_KEY, GSAP_REDUCED_KEY } from './useGsapContext'

export interface FloatingOptions {
  y?: number
  duration?: number
  ease?: string
}

export function useFloating(el: Ref<HTMLElement | undefined>, options: FloatingOptions = {}) {
  const context = inject<Ref<gsap.Context | null>>(GSAP_CONTEXT_KEY)
  const prefersReduced = inject<Ref<boolean>>(GSAP_REDUCED_KEY)

  const { y = 10, duration = 3, ease = 'sine.inOut' } = options

  function run() {
    if (!el.value || prefersReduced?.value)
      return
    context?.value?.add(() => {
      gsap.to(el.value!, { y, duration, ease, yoyo: true, repeat: -1 })
    })
  }

  onMounted(() => {
    if (context?.value)
      run()
    else nextTick(run)
  })
}
