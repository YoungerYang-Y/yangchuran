<script lang="ts"></script>
<template>
  <div class="flex flex-row items-center justify-center w-screen h-screen">
    <div class="container flex items-center justify-center">
      <img class="" src="@/assets/images/0002.jpg">
    </div>
    <div class="flex items-center justify-center">
      <input class="input input-bordered w-full max-w-xs" type="text" v-model="username">
      <button class="btn btn-success" @click="login">OK</button>
    </div>
  </div>
</template>
