<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import BagIcon from '../components/icons/BagIcon.vue'
import BikeIcon from '../components/icons/BikeIcon.vue'
import BottleIcon from '../components/icons/BottleIcon.vue'
import GogglesIcon from '../components/icons/GogglesIcon.vue'

const currentTime = ref('')
const greeting = ref('')
let scrollObserver: IntersectionObserver | null = null

function updateTime() {
  const now = new Date()
  const hours = now.getHours()

  if (hours < 6)
    greeting.value = '夜深了，注意休息 🌙'
  else if (hours < 12)
    greeting.value = '早上好！新的一天开始了 ☀️'
  else if (hours < 18)
    greeting.value = '下午好！继续加油 💪'
  else greeting.value = '晚上好！今天辛苦了 🌆'

  currentTime.value = now.toLocaleString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    weekday: 'long',
  })
}

function setupScrollAnimations() {
  const elements = document.querySelectorAll<HTMLElement>('[data-scroll-fade]')

  elements.forEach((el) => {
    el.classList.add('scroll-fade-init')
  })

  scrollObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('scroll-fade-in')
          scrollObserver?.unobserve(entry.target)
        }
      })
    },
    {
      threshold: 0.15,
    },
  )

  elements.forEach(el => scrollObserver?.observe(el))
}

onMounted(() => {
  updateTime()
  setInterval(updateTime, 1000)
  setupScrollAnimations()
})

onUnmounted(() => {
  scrollObserver?.disconnect()
  scrollObserver = null
})
</script>

<template>
  <div>
    <!-- Hero：粉色主视觉 + 卡通元素 -->
    <section class="hero min-h-screen px-4 pt-10 pb-10">
      <div class="hero-content flex-col lg:flex-row-reverse gap-10 lg:gap-16" data-scroll-fade>
        <!-- Illustration：三岁小女孩 + 卡通元素 -->
        <div class="relative">
          <div
            class="w-64 h-64 sm:w-72 sm:h-72 rounded-full bg-gradient-to-br from-pink-200 via-pink-300 to-pink-400 shadow-xl flex items-center justify-center"
          >
            <div class="grid grid-cols-2 gap-4">
              <!-- 奶瓶 -->
              <div class="flex flex-col items-center gap-1">
                <BottleIcon class="w-10 h-10 sm:w-12 sm:h-12" />
                <span class="text-xs sm:text-sm text-pink-50">奶瓶</span>
              </div>
              <!-- 书包 -->
              <div class="flex flex-col items-center gap-1">
                <BagIcon class="w-10 h-10 sm:w-12 sm:h-12" />
                <span class="text-xs sm:text-sm text-pink-50">书包</span>
              </div>
              <!-- 游泳镜 -->
              <div class="flex flex-col items-center gap-1">
                <GogglesIcon class="w-10 h-10 sm:w-12 sm:h-12" />
                <span class="text-xs sm:text-sm text-pink-50">游泳镜</span>
              </div>
              <!-- 自行车 -->
              <div class="flex flex-col items-center gap-1">
                <BikeIcon class="w-10 h-10 sm:w-12 sm:h-12" />
                <span class="text-xs sm:text-sm text-pink-50">自行车</span>
              </div>
            </div>
          </div>
          <!-- 装饰星星/丝带 -->
          <div class="pointer-events-none">
            <span class="floating-star bg-pink-200">⭐</span>
            <span class="floating-star floating-star-2 bg-pink-300">✨</span>
            <span class="floating-ribbon bg-pink-100" />
          </div>
        </div>

        <!-- 文案 + 时间卡片 -->
        <div class="max-w-xl text-center lg:text-left" data-scroll-fade>
          <p class="text-sm font-semibold text-pink-500 tracking-wide uppercase mb-2">
            Little Growing Story
          </p>
          <h1
            class="text-4xl sm:text-5xl font-extrabold mb-4 bg-gradient-to-r from-pink-500 via-pink-400 to-pink-600 bg-clip-text text-transparent"
          >
            楚然的成长主页
          </h1>

          <!-- 时间 & 问候卡片 -->
          <div class="card bg-pink-50/80 border border-pink-100 shadow-lg mb-6">
            <div class="card-body gap-2">
              <h2 class="card-title justify-center lg:justify-start text-pink-600">
                {{ greeting }}
              </h2>
              <p class="text-xs sm:text-sm text-pink-900/70">
                {{ currentTime }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 成长小冒险卡片区：对应四种元素 -->
    <section class="min-h-screen py-16 px-4 flex items-center" data-scroll-fade>
      <div class="max-w-6xl mx-auto">
        <h2 class="text-2xl sm:text-3xl font-bold text-center text-pink-700 mb-4">
          奶瓶 · 书包 · 游泳镜 · 自行车
        </h2>
        <p class="text-sm sm:text-base text-center text-pink-900/70 mb-10 max-w-2xl mx-auto">
          每一件小小的物品，都是小女孩成长路上的伙伴：从喝奶到背上书包，从学会游泳到骑上小车车，
          一点点变得勇敢又独立。
        </p>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <!-- 奶瓶 -->
          <div
            class="card bg-pink-50 shadow-md hover:shadow-xl transition-shadow border border-pink-100"
            data-scroll-fade
          >
            <div class="card-body items-center text-center gap-3">
              <div class="w-14 h-14">
                <BottleIcon class="w-full h-full" />
              </div>
              <h3 class="card-title justify-center text-pink-700 text-lg">
                暖暖奶瓶
              </h3>
              <p class="text-xs sm:text-sm text-pink-900/80">
                记录从小奶宝宝到大女孩的每一次“喝光光”，陪伴最安心的入睡时刻。
              </p>
            </div>
          </div>

          <!-- 书包 -->
          <div
            class="card bg-pink-50 shadow-md hover:shadow-xl transition-shadow border border-pink-100"
            data-scroll-fade
          >
            <div class="card-body items-center text-center gap-3">
              <div class="w-14 h-14">
                <BagIcon class="w-full h-full" />
              </div>
              <h3 class="card-title justify-center text-pink-700 text-lg">
                小小书包
              </h3>
              <p class="text-xs sm:text-sm text-pink-900/80">
                把画画本和小贴纸都装进去，背上书包，就是准备好去探索世界的小小冒险家。
              </p>
            </div>
          </div>

          <!-- 游泳镜 -->
          <div
            class="card bg-pink-50 shadow-md hover:shadow-xl transition-shadow border border-pink-100"
            data-scroll-fade
          >
            <div class="card-body items-center text-center gap-3">
              <div class="w-14 h-14">
                <GogglesIcon class="w-full h-full" />
              </div>
              <h3 class="card-title justify-center text-pink-700 text-lg">
                粉色游泳镜
              </h3>
              <p class="text-xs sm:text-sm text-pink-900/80">
                在水里睁大眼睛看这个世界，每一次扑腾都是新的勇气值 +1。
              </p>
            </div>
          </div>

          <!-- 自行车 -->
          <div
            class="card bg-pink-50 shadow-md hover:shadow-xl transition-shadow border border-pink-100"
            data-scroll-fade
          >
            <div class="card-body items-center text-center gap-3">
              <div class="w-14 h-14">
                <BikeIcon class="w-full h-full" />
              </div>
              <h3 class="card-title justify-center text-pink-700 text-lg">
                小小自行车
              </h3>
              <p class="text-xs sm:text-sm text-pink-900/80">
                从滑步车到真正的小自行车，在每一圈绕圈圈里，慢慢学会保持平衡。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
@reference "tailwindcss";

@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

.avatar img {
  animation: float 3s ease-in-out infinite;
}

.floating-star {
  @apply absolute w-10 h-10 rounded-full flex items-center justify-center text-lg text-pink-500/90;
  animation: float 4s ease-in-out infinite;
  top: -1.5rem;
  right: -1.5rem;
}

.floating-star-2 {
  top: auto;
  bottom: -1.25rem;
  right: 1rem;
  animation-delay: 0.8s;
}

.floating-ribbon {
  @apply absolute w-16 h-16 rounded-full opacity-70;
  left: -1.5rem;
  top: 1.5rem;
  filter: blur(2px);
  animation: float 5s ease-in-out infinite;
}
</style>
