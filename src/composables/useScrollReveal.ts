import type { Ref } from 'vue'
import gsap from 'gsap'
import { inject, nextTick, onMounted } from 'vue'
import { GSAP_CONTEXT_KEY, GSAP_REDUCED_KEY } from './useGsapContext'

export interface ScrollRevealOptions {
  from?: gsap.TweenVars
  duration?: number
  ease?: string
  trigger?: string
}

export function useScrollReveal(el: Ref<HTMLElement | undefined>, options: ScrollRevealOptions = {}) {
  const context = inject<Ref<gsap.Context | null>>(GSAP_CONTEXT_KEY)
  const prefersReduced = inject<Ref<boolean>>(GSAP_REDUCED_KEY)

  const { from = { opacity: 0, y: 50 }, duration = 0.8, ease = 'back.out(1.7)', trigger = 'top 85%' } = options

  function run() {
    if (!el.value)
      return
    if (prefersReduced?.value) {
      gsap.set(el.value, { opacity: 1, y: 0, scale: 1 })
      return
    }
    if (context?.value) {
      context.value.add(() => {
        gsap.from(el.value!, {
          ...from,
          duration,
          ease,
          scrollTrigger: { trigger: el.value!, start: trigger, toggleActions: 'play none none none' },
        })
      })
    }
  }

  onMounted(() => {
    if (context?.value)
      run()
    else nextTick(run)
  })
}
