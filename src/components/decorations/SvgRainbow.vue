<script setup lang="ts">
withDefaults(defineProps<{
  size?: number
}>(), {
  size: 200,
})
</script>

<template>
  <svg :width="size" :height="size * 0.5" viewBox="0 0 200 100" fill="none" class="rainbow-svg">
    <path d="M20 100a80 80 0 0 1 160 0" stroke="#ef5350" stroke-width="6" stroke-linecap="round" fill="none" class="rainbow-path" />
    <path d="M30 100a70 70 0 0 1 140 0" stroke="#ff9800" stroke-width="6" stroke-linecap="round" fill="none" class="rainbow-path" />
    <path d="M40 100a60 60 0 0 1 120 0" stroke="#ffee58" stroke-width="6" stroke-linecap="round" fill="none" class="rainbow-path" />
    <path d="M50 100a50 50 0 0 1 100 0" stroke="#66bb6a" stroke-width="6" stroke-linecap="round" fill="none" class="rainbow-path" />
    <path d="M60 100a40 40 0 0 1 80 0" stroke="#42a5f5" stroke-width="6" stroke-linecap="round" fill="none" class="rainbow-path" />
    <path d="M70 100a30 30 0 0 1 60 0" stroke="#ab47bc" stroke-width="6" stroke-linecap="round" fill="none" class="rainbow-path" />
  </svg>
</template>
