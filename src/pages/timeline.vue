<script setup lang="ts">
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { nextTick, onMounted, ref } from 'vue'
import GlowDots from '../components/atmosphere/GlowDots.vue'
import SvgFlower from '../components/decorations/SvgFlower.vue'
import SvgHeart from '../components/decorations/SvgHeart.vue'
import SvgStar from '../components/decorations/SvgStar.vue'
import { useGsapContext } from '../composables/useGsapContext'
import { useGsapEntrance } from '../composables/useGsapEntrance'
import { timelineData } from '../data/timeline'

gsap.registerPlugin(ScrollTrigger)

const root = ref<HTMLElement>()
const titleEl = ref<HTMLElement>()
const pathEl = ref<SVGPathElement>()
const nodesContainer = ref<HTMLElement>()

const { context, prefersReduced } = useGsapContext(root)
useGsapEntrance(titleEl, { from: { opacity: 0, y: 30 }, delay: 0.2 })

// Winding path
const nodeCount = timelineData.length
const svgHeight = nodeCount * 300 + 100
const pathD = generateWindingPath(nodeCount)

function generateWindingPath(count: number): string {
  let d = 'M 50 40'
  for (let i = 0; i < count; i++) {
    const y = 40 + i * 300
    const isLeft = i % 2 === 0
    const cx1 = isLeft ? 250 : -150
    const cx2 = isLeft ? 350 : -50
    const nextY = y + 300
    d += ` C ${cx1} ${y + 90}, ${cx2} ${nextY - 90}, 50 ${nextY}`
  }
  return d
}

// Rotation for polaroid cards
function getRotation(index: number): string {
  const rotations = [-2, 1.5, -1, 2, -1.5]
  return `rotate(${rotations[index % rotations.length]}deg)`
}

// Animate
onMounted(() => {
  nextTick(() => {
    if (!context.value || !pathEl.value || !nodesContainer.value)
      return

    const pathLength = pathEl.value.getTotalLength()
    pathEl.value.style.strokeDasharray = `${pathLength}`
    pathEl.value.style.strokeDashoffset = `${pathLength}`

    if (!prefersReduced.value) {
      context.value.add(() => {
        gsap.to(pathEl.value!, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: nodesContainer.value!,
            start: 'top 80%',
            end: 'bottom 50%',
            scrub: 1,
          },
        })

        const nodes = nodesContainer.value!.querySelectorAll('.tl-node')
        nodes.forEach((node, i) => {
          const card = node.querySelector('.tl-polaroid')
          const dot = node.querySelector('.tl-dot')
          if (card) {
            gsap.set(card, { opacity: 0, x: i % 2 === 0 ? -60 : 60, rotation: i % 2 === 0 ? -8 : 8, scale: 0.8 })
            ScrollTrigger.create({
              trigger: node,
              start: 'top 90%',
              onEnter: () => {
                gsap.to(card, { opacity: 1, x: 0, rotation: 0, scale: 1, duration: 0.9, ease: 'back.out(1.4)' })
              },
              onLeaveBack: () => {
                gsap.to(card, { opacity: 0, x: i % 2 === 0 ? -60 : 60, rotation: i % 2 === 0 ? -8 : 8, scale: 0.8, duration: 0.4 })
              },
            })
          }
          if (dot) {
            gsap.set(dot, { scale: 0 })
            ScrollTrigger.create({
              trigger: node,
              start: 'top 90%',
              onEnter: () => {
                gsap.to(dot, { scale: 1, duration: 0.6, ease: 'elastic.out(1, 0.5)' })
              },
              onLeaveBack: () => {
                gsap.to(dot, { scale: 0, duration: 0.3 })
              },
            })
          }
        })
      })
    }
  })
})
</script>

<template>
  <div ref="root" class="min-h-screen py-12 px-4 bg-paper">
    <!-- Title -->
    <div ref="titleEl" class="text-center mb-16">
      <h1 class="font-handwrite text-3xl text-gray-800 mb-2">
        果果的成长记录
      </h1>
      <p class="text-sm text-gray-400">
        从出生到现在，记录每一个珍贵的瞬间
      </p>
    </div>

    <!-- Timeline -->
    <div ref="nodesContainer" class="max-w-4xl mx-auto relative">
      <GlowDots :count="12" />

      <!-- SVG winding path (desktop) -->
      <svg
        class="absolute left-1/2 -translate-x-1/2 top-0 w-full pointer-events-none hidden md:block"
        :viewBox="`-100 0 300 ${svgHeight}`"
        fill="none"
        :style="{ height: `${svgHeight}px` }"
        preserveAspectRatio="xMidYMin meet"
      >
        <path
          ref="pathEl"
          :d="pathD"
          stroke="#f8bbd0"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-dasharray="8 6"
          fill="none"
          opacity="0.7"
        />
      </svg>

      <!-- Mobile line -->
      <div class="absolute left-7 top-0 bottom-0 w-px bg-gradient-to-b from-pink-200 via-pink-300 to-pink-200 md:hidden" />

      <!-- Nodes -->
      <div
        v-for="(item, index) in timelineData"
        :key="item.id"
        class="tl-node relative mb-20 md:mb-28"
        :class="index % 2 === 0 ? 'md:pr-[52%]' : 'md:pl-[52%]'"
      >
        <!-- Dot -->
        <div
          class="tl-dot absolute z-10 left-7 md:left-1/2 -translate-x-1/2 top-6"
        >
          <template v-if="item.milestone">
            <SvgStar :size="28" />
          </template>
          <template v-else>
            <SvgHeart :size="16" />
          </template>
        </div>

        <!-- Polaroid card -->
        <div
          class="tl-polaroid ml-16 md:ml-0 bg-white p-2.5 pb-8 shadow-lg rounded-sm max-w-xs"
          :style="{ transform: getRotation(index) }"
        >
          <div class="aspect-[4/3] overflow-hidden bg-gray-50">
            <img
              :src="item.image"
              :alt="item.description"
              loading="lazy"
              class="w-full h-full object-cover"
              @error="($event.target as HTMLImageElement).style.background = '#fce4ec'"
            >
          </div>
          <div class="mt-2 text-center">
            <time
              class="font-handwrite text-xs"
              :class="item.milestone ? 'text-pink-500' : 'text-gray-400'"
            >
              {{ item.date }}
            </time>
            <p
              class="font-handwrite text-sm mt-0.5"
              :class="item.milestone ? 'text-pink-700' : 'text-gray-600'"
            >
              {{ item.description }}
            </p>
          </div>
        </div>

        <!-- Milestone decoration -->
        <div v-if="item.milestone" class="absolute top-0 pointer-events-none" :class="index % 2 === 0 ? 'right-0 md:right-[54%]' : 'right-0 md:left-[54%]'">
          <SvgFlower :size="18" />
        </div>
      </div>
    </div>
  </div>
</template>
