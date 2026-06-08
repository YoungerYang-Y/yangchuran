import type { Ref } from 'vue'
import gsap from 'gsap'
import { inject, nextTick, onMounted } from 'vue'
import { GSAP_CONTEXT_KEY, GSAP_REDUCED_KEY } from './useGsapContext'

export interface StaggerRevealOptions {
  from?: gsap.TweenVars
  duration?: number
  stagger?: number
  ease?: string
  trigger?: string
}

export function useStaggerReveal(container: Ref<HTMLElement | undefined>, childSelector: string, options: StaggerRevealOptions = {}) {
  const context = inject<Ref<gsap.Context | null>>(GSAP_CONTEXT_KEY)
  const prefersReduced = inject<Ref<boolean>>(GSAP_REDUCED_KEY)

  const { from = { opacity: 0, y: 40, scale: 0.9 }, duration = 0.6, stagger = 0.12, ease = 'back.out(1.7)', trigger = 'top 85%' } = options

  function run() {
    if (!container.value)
      return
    const children = container.value.querySelectorAll(childSelector)
    if (!children.length)
      return
    if (prefersReduced?.value) {
      gsap.set(children, { opacity: 1, y: 0, scale: 1 })
      return
    }
    if (context?.value) {
      context.value.add(() => {
        gsap.from(children, {
          ...from,
          duration,
          stagger,
          ease,
          scrollTrigger: { trigger: container.value!, start: trigger, toggleActions: 'play none none none' },
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
