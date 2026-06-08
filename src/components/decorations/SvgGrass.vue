<script setup lang="ts">
withDefaults(defineProps<{
  color?: string
}>(), {
  color: '#c8e6c9',
})
</script>

<template>
  <svg viewBox="0 0 1440 200" fill="none" class="w-full h-auto block grass-svg" preserveAspectRatio="none" style="min-width: 100%;">
    <path
      d="M0 80c180-20 360 20 540 0s360-30 540-10 180 30 360 10V200H0z"
      :fill="color"
      stroke="#81c784"
      stroke-width="2"
      stroke-linecap="round"
      class="grass-path"
    />
    <!-- grass blades -->
    <path d="M100 130c2-15 4-25 6-15" stroke="#66bb6a" stroke-width="2" stroke-linecap="round" class="grass-path" />
    <path d="M200 125c2-12 5-20 7-12" stroke="#66bb6a" stroke-width="2" stroke-linecap="round" class="grass-path" />
    <path d="M350 135c2-14 4-22 6-14" stroke="#66bb6a" stroke-width="2" stroke-linecap="round" class="grass-path" />
    <path d="M500 128c2-12 5-18 7-10" stroke="#66bb6a" stroke-width="2" stroke-linecap="round" class="grass-path" />
    <path d="M700 132c2-15 4-24 6-14" stroke="#66bb6a" stroke-width="2" stroke-linecap="round" class="grass-path" />
    <path d="M900 126c2-12 5-20 7-12" stroke="#66bb6a" stroke-width="2" stroke-linecap="round" class="grass-path" />
    <path d="M1100 130c2-14 4-22 6-12" stroke="#66bb6a" stroke-width="2" stroke-linecap="round" class="grass-path" />
    <path d="M1300 134c2-12 5-18 7-10" stroke="#66bb6a" stroke-width="2" stroke-linecap="round" class="grass-path" />
  </svg>
</template>
