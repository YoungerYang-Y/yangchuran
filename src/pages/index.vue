<script setup lang="ts">
import { onMounted, ref } from 'vue'

const currentTime = ref('')
const greeting = ref('')

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

onMounted(() => {
  updateTime()
  setInterval(updateTime, 1000)
})
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-base-100 to-base-200">
    <!-- Hero Section -->
    <section class="hero min-h-screen">
      <div class="hero-content text-center">
        <div class="max-w-md">
          <!-- Avatar -->
          <div class="avatar mb-6">
            <div class="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src="/favicon.ico" alt="Yang ChuRan" class="w-full h-full object-contain" />
            </div>
          </div>

          <!-- Title -->
          <h1
            class="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4"
          >
            Yang ChuRan
          </h1>

          <!-- Subtitle -->
          <p class="text-xl text-base-content/70 mb-6">欢迎来到我的个人空间 👼</p>

          <!-- Time Display -->
          <div class="card bg-base-100 shadow-xl mb-8">
            <div class="card-body">
              <h2 class="card-title justify-center text-primary">
                {{ greeting }}
              </h2>
              <p class="text-sm text-base-content/60">
                {{ currentTime }}
              </p>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <button class="btn btn-primary btn-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              了解更多
            </button>
            <button class="btn btn-outline btn-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              联系我
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-20 px-4">
      <div class="container mx-auto">
        <h2 class="text-3xl font-bold text-center mb-12">功能特色</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Feature 1 -->
          <div class="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
            <div class="card-body text-center">
              <div class="text-4xl mb-4">🎂</div>
              <h3 class="card-title justify-center">生日倒计时</h3>
              <p class="text-base-content/70">记录重要时刻，不错过每一个特殊的日子</p>
            </div>
          </div>

          <!-- Feature 2 -->
          <div class="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
            <div class="card-body text-center">
              <div class="text-4xl mb-4">📅</div>
              <h3 class="card-title justify-center">时间轴</h3>
              <p class="text-base-content/70">展示生活轨迹，记录美好回忆</p>
            </div>
          </div>

          <!-- Feature 3 -->
          <div class="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
            <div class="card-body text-center">
              <div class="text-4xl mb-4">🎨</div>
              <h3 class="card-title justify-center">主题切换</h3>
              <p class="text-base-content/70">多种主题风格，个性化你的体验</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="py-20 bg-base-200">
      <div class="container mx-auto px-4">
        <div class="stats stats-vertical lg:stats-horizontal shadow w-full">
          <div class="stat">
            <div class="stat-figure text-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                class="inline-block w-8 h-8 stroke-current"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <div class="stat-title">总访问量</div>
            <div class="stat-value text-primary">2.6K</div>
            <div class="stat-desc">21% 比上月</div>
          </div>

          <div class="stat">
            <div class="stat-figure text-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                class="inline-block w-8 h-8 stroke-current"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <div class="stat-title">页面浏览</div>
            <div class="stat-value text-secondary">89K</div>
            <div class="stat-desc">21% 比上月</div>
          </div>

          <div class="stat">
            <div class="stat-figure text-secondary">
              <div class="avatar online">
                <div class="w-16 rounded-full">
                  <img src="/favicon.ico" alt="Online" />
                </div>
              </div>
            </div>
            <div class="stat-value">86%</div>
            <div class="stat-title">在线时间</div>
            <div class="stat-desc text-secondary">↗︎ 12% (30天)</div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 px-4">
      <div class="container mx-auto text-center">
        <h2 class="text-3xl font-bold mb-6">开始探索</h2>
        <p class="text-xl text-base-content/70 mb-8 max-w-2xl mx-auto">
          发现更多有趣的功能，体验个性化的界面设计
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button class="btn btn-primary btn-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
            查看时间轴
          </button>
          <button class="btn btn-outline btn-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            生日倒计时
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.hero {
  background: linear-gradient(135deg, hsl(var(--b1)) 0%, hsl(var(--b2)) 100%);
}

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

.card:hover {
  transform: translateY(-5px);
  transition: transform 0.3s ease;
}
</style>
