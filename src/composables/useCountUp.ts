import type { Ref } from 'vue'
import gsap from 'gsap'
import { inject, nextTick, onMounted } from 'vue'
import { GSAP_CONTEXT_KEY, GSAP_REDUCED_KEY } from './useGsapContext'

export interface CountUpOptions {
  duration?: number
  ease?: string
  startVal?: number
}

export function useCountUp(el: Ref<HTMLElement | undefined>, target: number | Ref<number>, options: CountUpOptions = {}) {
  const context = inject<Ref<gsap.Context | null>>(GSAP_CONTEXT_KEY)
  const prefersReduced = inject<Ref<boolean>>(GSAP_REDUCED_KEY)

  const { duration = 2, ease = 'power2.out', startVal = 0 } = options

  function getTarget() {
    return typeof target === 'number' ? target : target.value
  }

  function run() {
    if (!el.value)
      return
    const targetVal = getTarget()
    if (prefersReduced?.value || !context?.value) {
      el.value.textContent = String(Math.round(targetVal))
      return
    }
    context.value.add(() => {
      const obj = { val: startVal }
      gsap.to(obj, {
        val: targetVal,
        duration,
        ease,
        onUpdate: () => { el.value!.textContent = String(Math.round(obj.val)) },
      })
    })
  }

  onMounted(() => {
    if (context?.value)
      run()
    else nextTick(run)
  })
}
