<script setup lang="ts">
import { computed, ref } from 'vue'
import PetalFall from '../components/atmosphere/PetalFall.vue'
import GiftBoxNav from '../components/decorations/GiftBoxNav.vue'
import SvgCloud from '../components/decorations/SvgCloud.vue'
import SvgFlower from '../components/decorations/SvgFlower.vue'
import SvgHeart from '../components/decorations/SvgHeart.vue'
import SvgStar from '../components/decorations/SvgStar.vue'
import { useCountUp } from '../composables/useCountUp'
import { useFloating } from '../composables/useFloating'
import { useGsapContext } from '../composables/useGsapContext'
import { useGsapEntrance } from '../composables/useGsapEntrance'

const root = ref<HTMLElement>()
const photoEl = ref<HTMLElement>()
const titleEl = ref<HTMLElement>()
const daysEl = ref<HTMLElement>()
const giftsEl = ref<HTMLElement>()
const cloud1 = ref<HTMLElement>()
const cloud2 = ref<HTMLElement>()
const star1 = ref<HTMLElement>()
const star2 = ref<HTMLElement>()
const heart1 = ref<HTMLElement>()
const flower1 = ref<HTMLElement>()

useGsapContext(root)
useGsapEntrance(photoEl, { from: { opacity: 0, scale: 0, rotation: -10 }, duration: 1.2, ease: 'elastic.out(1, 0.5)', delay: 0.5 })
useGsapEntrance(titleEl, { from: { opacity: 0, y: 30 }, delay: 1.2 })
useGsapEntrance(giftsEl, { from: { opacity: 0, y: 20 }, delay: 1.8 })
useFloating(cloud1, { y: -6, duration: 5 })
useFloating(cloud2, { y: 8, duration: 6 })
useFloating(star1, { y: -5, duration: 2.5 })
useFloating(star2, { y: 6, duration: 3.5 })
useFloating(heart1, { y: -4, duration: 4 })
useFloating(flower1, { y: 4, duration: 3.5 })

const birthDate = new Date('2022-11-15T23:07:00')
const daysSinceBirth = computed(() => Math.floor((Date.now() - birthDate.getTime()) / 86400000))
useCountUp(daysEl, daysSinceBirth)
</script>

<template>
  <div ref="root" class="h-screen overflow-hidden bg-paper relative flex flex-col items-center justify-center">
    <PetalFall :count="8" />

    <!-- Decorations -->
    <div class="absolute inset-0 pointer-events-none">
      <div ref="cloud1" class="absolute top-[5%] left-[3%]">
        <SvgCloud :size="130" color="#e8f4fd" />
      </div>
      <div ref="cloud2" class="absolute top-[8%] right-[5%]">
        <SvgCloud :size="100" color="#f3e5f5" />
      </div>
      <div ref="star1" class="absolute top-[15%] left-[12%]">
        <SvgStar :size="22" />
      </div>
      <div ref="star2" class="absolute top-[20%] right-[15%]">
        <SvgStar :size="16" color="#ffe0b2" />
      </div>
      <div ref="heart1" class="absolute bottom-[20%] left-[8%]">
        <SvgHeart :size="18" />
      </div>
      <div ref="flower1" class="absolute bottom-[15%] right-[8%]">
        <SvgFlower :size="24" />
      </div>
    </div>

    <!-- Content -->
    <div class="relative z-10 flex flex-col items-center text-center px-4">
      <!-- Photo -->
      <div ref="photoEl" class="bg-white p-2.5 pb-10 shadow-xl rounded-sm rotate-[-2deg] mb-6">
        <div class="w-36 h-36 sm:w-44 sm:h-44 overflow-hidden">
          <img src="/images/0001.jpg" alt="果果" class="w-full h-full object-cover" @error="($event.target as HTMLImageElement).style.background = '#fce4ec'">
        </div>
        <p class="font-handwrite text-sm text-gray-500 mt-1.5 text-center">
          小果果 ♡
        </p>
      </div>

      <!-- Title -->
      <div ref="titleEl" class="mb-8">
        <h1 class="font-handwrite text-3xl sm:text-4xl text-gray-800 mb-2">
          果果的成长主页
        </h1>
        <p class="text-xs text-gray-400">
          已陪伴 <span ref="daysEl" class="font-bold text-pink-500">0</span> 天
        </p>
      </div>

      <!-- Gift boxes - scattered -->
      <div ref="giftsEl" class="flex gap-16 items-start">
        <div class="rotate-[-8deg] translate-y-3">
          <GiftBoxNav to="/timeline" label="成长记录" color="#f48fb1" />
        </div>
        <div class="rotate-[5deg] -translate-y-2">
          <GiftBoxNav to="/birthday" label="生日集" color="#ce93d8" />
        </div>
      </div>
    </div>
  </div>
</template>
