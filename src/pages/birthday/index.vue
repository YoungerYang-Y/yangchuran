<script setup lang="ts">
import { computed, ref } from 'vue'
import { useCountUp } from '../../composables/useCountUp'
import { useGsapContext } from '../../composables/useGsapContext'
import { useGsapEntrance } from '../../composables/useGsapEntrance'
import { useStaggerReveal } from '../../composables/useStaggerReveal'
import { birthdaysData } from '../../data/birthdays'

const root = ref<HTMLElement>()
const titleEl = ref<HTMLElement>()
const countdownDaysEl = ref<HTMLElement>()
const cardsEl = ref<HTMLElement>()

useGsapContext(root)
useGsapEntrance(titleEl, { from: { opacity: 0, y: 30 } })
useStaggerReveal(cardsEl, '.birthday-card', { from: { opacity: 0, y: 40, scale: 0.8 }, ease: 'elastic.out(1, 0.6)' })

// Countdown
const nextBirthdayDays = computed(() => {
  const now = new Date()
  const thisYear = now.getFullYear()
  let next = new Date(thisYear, 10, 15)
  if (now > next)
    next = new Date(thisYear + 1, 10, 15)
  return Math.ceil((next.getTime() - now.getTime()) / 86400000)
})

const nextAge = computed(() => {
  const now = new Date()
  const thisYear = now.getFullYear()
  const birthdayThisYear = new Date(thisYear, 10, 15)
  return now > birthdayThisYear ? thisYear - 2022 + 1 : thisYear - 2022
})

useCountUp(countdownDaysEl, nextBirthdayDays)

// Date display helper
function formatDate(dateStr: string): string {
  const d = new Date(dateStr)
  if (Number.isNaN(d.getTime()))
    return ''
  return `${d.getFullYear()}.${d.getMonth() + 1}.${d.getDate()}`
}
</script>

<template>
  <div ref="root" class="min-h-screen py-12 px-4 bg-gradient-to-b from-pink-50 to-white">
    <!-- Title + Countdown -->
    <div ref="titleEl" class="text-center mb-12">
      <h1 class="text-3xl font-bold text-pink-700 mb-4">
        🎂 生日集
      </h1>
      <p class="text-sm text-gray-500 mb-6">
        每年的生日惊喜
      </p>
      <div class="inline-block bg-white border border-pink-100 rounded-2xl px-6 py-4 shadow-sm">
        <p class="text-sm text-pink-500 mb-1">
          距离 {{ nextAge }} 岁生日还有
        </p>
        <p class="text-4xl font-extrabold text-pink-600">
          <span ref="countdownDaysEl">0</span>
          <span class="text-base font-normal text-pink-400 ml-1">天</span>
        </p>
      </div>
    </div>

    <!-- Birthday cards -->
    <div v-if="birthdaysData.length" ref="cardsEl" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
      <RouterLink
        v-for="item in birthdaysData"
        :key="item.age"
        :to="item.route"
        class="birthday-card block rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 bg-white"
      >
        <div class="h-24 flex items-center justify-center text-4xl" :style="{ background: item.coverGradient }">
          {{ item.icon }}
        </div>
        <div class="p-4 text-center">
          <p class="text-lg font-bold" :style="{ color: item.themeColor }">
            {{ item.label }}
          </p>
          <p v-if="formatDate(item.date)" class="text-xs text-gray-400 mt-1">
            {{ formatDate(item.date) }}
          </p>
        </div>
      </RouterLink>
    </div>
  </div>
</template>
