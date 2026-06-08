<script setup lang="ts">
import { ref } from 'vue'
import BalloonRise from '../../components/birthday/BalloonRise.vue'
import BirthdayHero from '../../components/birthday/BirthdayHero.vue'
import ConfettiBlast from '../../components/birthday/ConfettiBlast.vue'
import PhotoWall from '../../components/birthday/PhotoWall.vue'
import { useGsapContext } from '../../composables/useGsapContext'

const root = ref<HTMLElement>()
useGsapContext(root)

const photos = ['/images/0001.jpg', '/images/0002.jpg', '/images/0001.jpg', '/images/0002.jpg']
</script>

<template>
  <div ref="root">
    <BirthdayHero
      title="🐬 Happy 3rd Birthday!"
      subtitle="果果三岁啦～"
      background="linear-gradient(135deg, #bbdefb, #90caf9)"
    >
      <BalloonRise :colors="['#64b5f6', '#42a5f5', '#90caf9']" />
      <ConfettiBlast />
    </BirthdayHero>

    <PhotoWall :images="photos" :columns="2" />

    <!-- Footer -->
    <section class="py-12 px-4 text-center bg-gradient-to-t from-blue-50 to-white">
      <p class="text-gray-600 mb-6 max-w-md mx-auto leading-relaxed">
        三岁的果果是个小话唠，爱画画爱唱歌，开始交到了好朋友，世界越来越大啦 🌊
      </p>
      <div class="flex gap-3 justify-center">
        <RouterLink to="/" class="btn btn-outline btn-sm border-blue-300 text-blue-600">
          ← 回首页
        </RouterLink>
        <RouterLink to="/birthday/two-year-old" class="btn btn-outline btn-sm border-blue-300 text-blue-600">
          ← 两岁生日
        </RouterLink>
      </div>
    </section>
  </div>
</template>
