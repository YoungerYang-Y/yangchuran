<script setup lang="ts">
import { ref } from 'vue'
import BalloonRise from '../../components/birthday/BalloonRise.vue'
import BirthdayHero from '../../components/birthday/BirthdayHero.vue'
import ConfettiBlast from '../../components/birthday/ConfettiBlast.vue'
import PhotoWall from '../../components/birthday/PhotoWall.vue'
import { useGsapContext } from '../../composables/useGsapContext'

const root = ref<HTMLElement>()
useGsapContext(root)

const photos = ['/images/0001.jpg', '/images/0002.jpg', '/images/0001.jpg', '/images/0002.jpg', '/images/0001.jpg', '/images/0002.jpg']
</script>

<template>
  <div ref="root">
    <BirthdayHero
      title="🎂 Happy 1st Birthday!"
      subtitle="果果一岁啦～"
      background="linear-gradient(135deg, #fce4ec, #f8bbd0)"
    >
      <BalloonRise :colors="['#f48fb1', '#ce93d8', '#ef9a9a']" />
      <ConfettiBlast />
    </BirthdayHero>

    <PhotoWall :images="photos" :columns="3" />

    <!-- Footer -->
    <section class="py-12 px-4 text-center bg-gradient-to-t from-pink-50 to-white">
      <p class="text-gray-600 mb-6 max-w-md mx-auto leading-relaxed">
        亲爱的果果，一岁的你学会了走路、学会了叫妈妈，每一天都在变成更棒的小朋友 🌟
      </p>
      <div class="flex gap-3 justify-center">
        <RouterLink to="/birthday/two-year-old" class="btn btn-primary btn-sm bg-pink-500 border-pink-500">
          → 两岁生日
        </RouterLink>
        <RouterLink to="/" class="btn btn-outline btn-sm border-pink-300 text-pink-600">
          ← 回首页
        </RouterLink>
      </div>
    </section>
  </div>
</template>
