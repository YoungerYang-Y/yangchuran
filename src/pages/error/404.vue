<template>
  <main class="grid min-h-[80vh] place-items-center px-6 py-24">
    <div class="text-center">
      <p class="text-6xl font-bold text-pink-300">
        404
      </p>
      <h1 class="mt-4 text-3xl font-bold tracking-tight text-pink-800 sm:text-5xl">
        页面未找到
      </h1>
      <p class="mt-6 text-base leading-7 text-pink-600/70">
        抱歉，找不到你要访问的页面。
      </p>
      <div class="mt-10">
        <RouterLink
          to="/"
          class="btn btn-primary bg-pink-500 border-pink-500 hover:bg-pink-600 hover:border-pink-600 text-white"
        >
          回到首页
        </RouterLink>
      </div>
    </div>
  </main>
</template>
