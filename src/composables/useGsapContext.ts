import type { Ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { onMounted, onUnmounted, provide, ref } from 'vue'

gsap.registerPlugin(ScrollTrigger)

export const GSAP_CONTEXT_KEY = Symbol('gsap-context')
export const GSAP_REDUCED_KEY = Symbol('gsap-reduced')

export function useGsapContext(scope: Ref<HTMLElement | undefined>) {
  const context = ref<gsap.Context | null>(null)
  const prefersReduced = ref(
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false,
  )

  provide(GSAP_CONTEXT_KEY, context)
  provide(GSAP_REDUCED_KEY, prefersReduced)

  onMounted(() => {
    if (!prefersReduced.value && scope.value)
      context.value = gsap.context(() => {}, scope.value)
  })

  onUnmounted(() => {
    context.value?.revert()
    context.value = null
  })

  return { context, prefersReduced }
}
