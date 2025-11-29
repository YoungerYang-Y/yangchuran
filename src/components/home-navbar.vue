<script setup lang="ts"></script>

<template>
  <header
    class="navbar sticky top-0 z-20 bg-pink-50/80 backdrop-blur border-b border-pink-100 px-4 md:px-8"
  >
    <div class="flex-1">
      <RouterLink to="/" class="btn btn-ghost normal-case text-xl font-extrabold text-pink-600">
        Yang ChuRan
      </RouterLink>
    </div>
    <nav class="flex-none">
      <ul class="menu menu-horizontal px-1 text-sm text-pink-700 gap-2">
        <li>
          <RouterLink to="/" class="hover:text-pink-500"> 首页 </RouterLink>
        </li>
        <li>
          <RouterLink to="/timeline" class="hover:text-pink-500"> 成长记录 </RouterLink>
        </li>
        <li>
          <RouterLink to="/countdown" class="hover:text-pink-500"> 生日惊喜 </RouterLink>
        </li>
      </ul>
    </nav>
  </header>
</template>
