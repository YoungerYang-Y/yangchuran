import type { Ref } from 'vue'
import gsap from 'gsap'
import { inject, nextTick, onMounted } from 'vue'
import { GSAP_CONTEXT_KEY, GSAP_REDUCED_KEY } from './useGsapContext'

export interface DrawSvgOptions {
  duration?: number
  stagger?: number
  ease?: string
  delay?: number
  scrollTrigger?: boolean
  trigger?: string
}

export function useDrawSvg(container: Ref<HTMLElement | undefined>, pathSelector: string, options: DrawSvgOptions = {}) {
  const context = inject<Ref<gsap.Context | null>>(GSAP_CONTEXT_KEY)
  const prefersReduced = inject<Ref<boolean>>(GSAP_REDUCED_KEY)

  const { duration = 1.5, stagger = 0.2, ease = 'power2.inOut', delay = 0, scrollTrigger = false, trigger = 'top 80%' } = options

  function run() {
    if (!container.value)
      return
    const paths = container.value.querySelectorAll<SVGPathElement | SVGEllipseElement>(pathSelector)
    if (!paths.length)
      return

    if (prefersReduced?.value) {
      paths.forEach((p) => {
        p.style.strokeDasharray = 'none'
        p.style.strokeDashoffset = '0'
      })
      return
    }

    // Set initial state: stroke hidden
    paths.forEach((path) => {
      if (path instanceof SVGGeometryElement) {
        const length = path.getTotalLength()
        path.style.strokeDasharray = `${length}`
        path.style.strokeDashoffset = `${length}`
      }
    })

    if (context?.value) {
      context.value.add(() => {
        const tweenVars: gsap.TweenVars = {
          strokeDashoffset: 0,
          duration,
          stagger,
          ease,
          delay,
        }
        if (scrollTrigger) {
          tweenVars.scrollTrigger = {
            trigger: container.value!,
            start: trigger,
            toggleActions: 'play none none none',
          }
        }
        gsap.to(paths, tweenVars)
      })
    }
  }

  onMounted(() => {
    if (context?.value)
      run()
    else nextTick(run)
  })
}
