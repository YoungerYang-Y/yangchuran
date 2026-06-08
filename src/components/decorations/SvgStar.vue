<script setup lang="ts">
withDefaults(defineProps<{
  color?: string
  size?: number
}>(), {
  color: '#fff9c4',
  size: 32,
})
</script>

<template>
  <svg :width="size" :height="size" viewBox="0 0 32 32" fill="none" class="star-svg">
    <path
      d="M16 2l4 8.5 9.5 1.5-7 6.5 1.5 9.5-8-4.5-8 4.5 1.5-9.5-7-6.5 9.5-1.5z"
      :fill="color"
      stroke="#ffcc02"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="star-path"
    />
  </svg>
</template>
