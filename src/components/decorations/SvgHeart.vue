<script setup lang="ts">
withDefaults(defineProps<{
  color?: string
  size?: number
}>(), {
  color: '#f48fb1',
  size: 24,
})
</script>

<template>
  <svg :width="size" :height="size" viewBox="0 0 24 24" fill="none" class="heart-svg">
    <path
      d="M12 21s-7-5-9-9c-1.5-3 0-7 4-7 2.5 0 4 1.5 5 3 1-1.5 2.5-3 5-3 4 0 5.5 4 4 7-2 4-9 9-9 9z"
      :fill="color"
      stroke="#e91e63"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="heart-path"
    />
  </svg>
</template>
