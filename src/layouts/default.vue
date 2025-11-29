<script setup lang="ts">
import HomeNavbar from '../components/home-navbar.vue'
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-pink-50 via-pink-100 to-pink-200">
    <HomeNavbar />
    <main>
      <RouterView />
    </main>
  </div>
</template>
