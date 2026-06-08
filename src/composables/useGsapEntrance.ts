import type { Ref } from 'vue'
import gsap from 'gsap'
import { inject, nextTick, onMounted } from 'vue'
import { GSAP_CONTEXT_KEY, GSAP_REDUCED_KEY } from './useGsapContext'

export interface EntranceOptions {
  from?: gsap.TweenVars
  duration?: number
  ease?: string
  delay?: number
}

export function useGsapEntrance(el: Ref<HTMLElement | undefined>, options: EntranceOptions = {}) {
  const context = inject<Ref<gsap.Context | null>>(GSAP_CONTEXT_KEY)
  const prefersReduced = inject<Ref<boolean>>(GSAP_REDUCED_KEY)

  const { from = { opacity: 0, scale: 0.5, y: 30 }, duration = 0.8, ease = 'back.out(1.7)', delay = 0 } = options

  function run() {
    if (!el.value)
      return
    if (prefersReduced?.value) {
      gsap.set(el.value, { opacity: 1, scale: 1, y: 0 })
      return
    }
    if (context?.value)
      context.value.add(() => { gsap.from(el.value!, { ...from, duration, ease, delay }) })
  }

  onMounted(() => {
    if (context?.value)
      run()
    else nextTick(run)
  })
}
