<script setup lang="ts">
withDefaults(defineProps<{
  color?: string
  size?: number
}>(), {
  color: '#f8bbd0',
  size: 28,
})
</script>

<template>
  <svg :width="size" :height="size" viewBox="0 0 28 28" fill="none" class="flower-svg">
    <!-- petals -->
    <ellipse cx="14" cy="8" rx="4" ry="6" :fill="color" stroke="#f48fb1" stroke-width="1.2" class="flower-path" />
    <ellipse cx="20" cy="12" rx="4" ry="6" :fill="color" stroke="#f48fb1" stroke-width="1.2" transform="rotate(72 20 12)" class="flower-path" />
    <ellipse cx="18" cy="20" rx="4" ry="6" :fill="color" stroke="#f48fb1" stroke-width="1.2" transform="rotate(144 18 20)" class="flower-path" />
    <ellipse cx="10" cy="20" rx="4" ry="6" :fill="color" stroke="#f48fb1" stroke-width="1.2" transform="rotate(216 10 20)" class="flower-path" />
    <ellipse cx="8" cy="12" rx="4" ry="6" :fill="color" stroke="#f48fb1" stroke-width="1.2" transform="rotate(288 8 12)" class="flower-path" />
    <!-- center -->
    <circle cx="14" cy="14" r="4" fill="#ffcc02" stroke="#f9a825" stroke-width="1" />
  </svg>
</template>
