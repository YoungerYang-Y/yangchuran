<script setup lang="ts">
import { ref } from 'vue'
import BalloonRise from '../../components/birthday/BalloonRise.vue'
import BirthdayHero from '../../components/birthday/BirthdayHero.vue'
import ConfettiBlast from '../../components/birthday/ConfettiBlast.vue'
import PhotoParallax from '../../components/birthday/PhotoParallax.vue'
import { useGsapContext } from '../../composables/useGsapContext'

const root = ref<HTMLElement>()
useGsapContext(root)

const photos = ['/images/0001.jpg', '/images/0002.jpg', '/images/0001.jpg']
</script>

<template>
  <div ref="root">
    <BirthdayHero
      title="🌳 Happy 2nd Birthday!"
      subtitle="果果两岁啦～"
      background="linear-gradient(135deg, #c8e6c9, #a5d6a7)"
    >
      <BalloonRise :colors="['#81c784', '#66bb6a', '#a5d6a7']" />
      <ConfettiBlast />
    </BirthdayHero>

    <PhotoParallax :images="photos" />

    <!-- Footer -->
    <section class="py-12 px-4 text-center bg-gradient-to-t from-green-50 to-white">
      <p class="text-gray-600 mb-6 max-w-md mx-auto leading-relaxed">
        两岁的果果越来越有主意了，会说好多话，会自己穿鞋，每天都有新发现 🌿
      </p>
      <div class="flex gap-3 justify-center">
        <RouterLink to="/birthday/three-year-old" class="btn btn-primary btn-sm bg-green-600 border-green-600">
          → 三岁生日
        </RouterLink>
        <RouterLink to="/birthday/one-year-old" class="btn btn-outline btn-sm border-green-300 text-green-600">
          ← 一岁生日
        </RouterLink>
      </div>
    </section>
  </div>
</template>
