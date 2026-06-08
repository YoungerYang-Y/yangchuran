<script setup lang="ts">
withDefaults(defineProps<{
  color?: string
  size?: number
}>(), {
  color: '#fce4ec',
  size: 120,
})
</script>

<template>
  <svg :width="size" :height="size * 0.6" viewBox="0 0 120 72" fill="none" class="cloud-svg">
    <path
      d="M20 52c-8 0-14-6-14-14s6-14 14-14c1-10 9-18 20-18 8 0 15 4 18 11 3-2 7-3 11-3 11 0 20 9 20 20 0 1 0 2 0 3 5 2 9 8 9 14 0 9-7 15-15 15H20z"
      :fill="color"
      stroke="#f8bbd0"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="cloud-path"
    />
  </svg>
</template>
