<script lang="ts"></script>
<template>
  <div class="flex flex-row items-center justify-center">
    <!-- 左侧图片区域 -->
    <div class="w-1/2 h-screen flex items-center justify-center">
      <img class="h-full w-auto object-contain" src="@/assets/images/0002.jpg" alt="Image">
    </div>
    <!-- 右侧输入区域 -->
    <div class="w-1/2 h-screen flex flex-col items-center justify-center">
      <input class="input input-bordered w-full max-w-xs mb-4" type="text" v-model="username" placeholder="Enter username">
      <button class="btn btn-success" @click="login">OK</button>
    </div>
  </div>
</template>

<style scoped>
img {
  height: 100%; /* 图片高度占满父容器 */
  width: auto; /* 宽度根据比例自动调整 */
  object-fit: contain; /* 保证图片等比例缩放 */
}
</style>