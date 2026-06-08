<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const props = withDefaults(defineProps<{
  to: string
  label: string
  color?: string
}>(), {
  color: '#f48fb1',
})

const router = useRouter()
const isOpen = ref(false)

function go() {
  router.push(props.to)
}
</script>

<template>
  <div
    class="gift-box flex flex-col items-center select-none relative"
    @mouseenter="isOpen = true"
    @mouseleave="isOpen = false"
    @click="go"
  >
    <div class="relative transition-transform duration-300" :class="isOpen ? 'scale-110' : 'hover:scale-105'">
      <svg width="90" height="90" viewBox="0 0 90 90" fill="none">
        <!-- Shadow -->
        <ellipse cx="45" cy="84" rx="28" ry="4" fill="rgba(0,0,0,0.08)" />
        <!-- Box body -->
        <rect x="15" y="44" width="60" height="36" rx="3" :fill="color" />
        <rect x="15" y="44" width="60" height="36" rx="3" fill="rgba(0,0,0,0.05)" />
        <rect x="18" y="47" width="8" height="30" rx="2" fill="rgba(255,255,255,0.2)" />
        <!-- Ribbon V -->
        <rect x="39" y="44" width="12" height="36" fill="#ffcc02" />
        <!-- Ribbon H -->
        <rect x="15" y="56" width="60" height="10" fill="#ffcc02" />
        <rect x="15" y="56" width="60" height="10" fill="rgba(255,255,255,0.1)" />
        <!-- Lid -->
        <g :class="isOpen ? 'lid-open' : 'lid-closed'" style="transform-origin: 45px 44px;">
          <rect x="11" y="32" width="68" height="16" rx="3" :fill="color" />
          <rect x="11" y="32" width="68" height="16" rx="3" fill="rgba(255,255,255,0.1)" />
          <rect x="39" y="32" width="12" height="16" fill="#ffcc02" />
          <!-- Bow -->
          <path d="M45 28c-4 0-10-2-10-6s6-6 10-6c4 0 10 2 10 6s-6 6-10 6z" fill="#ffcc02" stroke="#f9a825" stroke-width="1" />
          <path d="M45 28c4 0 10-2 10-6s-6-6-10-6" fill="#fdd835" stroke="#f9a825" stroke-width="1" />
          <circle cx="45" cy="28" r="3.5" fill="#f9a825" />
        </g>
        <!-- Sparkles when open -->
        <g v-if="isOpen" class="sparkles">
          <circle cx="25" cy="18" r="2.5" fill="#ffcc02" />
          <circle cx="65" cy="16" r="2" fill="#ffcc02" />
          <circle cx="45" cy="6" r="2" fill="#ffcc02" />
          <circle cx="70" cy="28" r="1.5" :fill="color" />
          <circle cx="20" cy="12" r="1.5" :fill="color" />
        </g>
      </svg>

      <!-- Label floats up from inside when open -->
      <div
        class="absolute inset-x-0 top-0 flex justify-center transition-all duration-400"
        :class="isOpen ? 'opacity-100 -translate-y-10' : 'opacity-0 translate-y-0'"
      >
        <span class="font-handwrite text-sm text-gray-700 bg-white/90 px-3 py-1 rounded-full shadow-sm whitespace-nowrap">
          {{ label }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.lid-closed {
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.lid-open {
  transform: rotate(-25deg) translateY(-12px);
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.sparkles circle {
  animation: sparkle 0.6s ease-out both;
}
.sparkles circle:nth-child(2) {
  animation-delay: 0.1s;
}
.sparkles circle:nth-child(3) {
  animation-delay: 0.15s;
}
.sparkles circle:nth-child(4) {
  animation-delay: 0.2s;
}
.sparkles circle:nth-child(5) {
  animation-delay: 0.25s;
}
@keyframes sparkle {
  from {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  to {
    transform: scale(1);
    opacity: 0.8;
  }
}
</style>
