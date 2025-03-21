<script setup lang="ts">

</script>

<template>
  <div class="h-screen">
    <!-- 生日快乐 -->
    <div class="h-screen bg-fixed bg-cover bg-center bg-[url('@/assets/images/birthday/one-year-old/bg-1.png')]">
      <!-- 上 -->
      <div class="min-w-full">
        <!-- 彩旗 -->
        <img class="slide-in-top w-2/3 m-auto" src="@/assets/images/birthday/one-year-old/bunting.png" alt="">
        <!-- 标语 -->
        <img class="slide-in-top h-32 m-auto" src="@/assets/images/birthday/one-year-old/happy-birthday.png" alt="">
      </div>
      <!-- 左 -->
      <div>
        <!-- 气球 -->
        <img
          class="slide-in-bottom w-20 absolute left-10 top-1/3 transition delay-200"
          src="@/assets/images/birthday/one-year-old/balloon-1.png"
        >
        <!-- 蛋糕 -->
        <img
          class="slide-in-left w-60 absolute left-1/2 top-1/2 delay-500"
          src="@/assets/images/birthday/one-year-old/cake.svg"
        >
        <!-- 兔子 -->
        <img
          class="roll-in-right w-40 absolute right-1/4 top-1/2 delay-700"
          src="@/assets/images/birthday/one-year-old/rabbit.png"
        >
      </div>
      <!-- 下 -->
      <div />
      <!-- 右 -->
      <div>
        <!-- 气球 -->
        <img
          class="slide-in-bottom w-20 absolute right-10 top-10"
          src="@/assets/images/birthday/one-year-old/balloon-2.png"
        >
        <img
          class="slide-in-bottom w-20 absolute right-20 bottom-10"
          src="@/assets/images/birthday/one-year-old/balloon-3.png"
        >
      </div>
    </div>
    <div class="divider" />

    <!-- 相框 -->
    <div class="h-screen bg-fixed bg-cover bg-center bg-[url('@/assets/images/0001.jpg')] " />
    <div class="divider" />

    <div class="h-screen bg-fixed bg-cover bg-center bg-[url('@/assets/images/0002.jpg')] " />
    <div class="divider" />

    <div class="h-screen bg-fixed bg-cover bg-center bg-[url('@/assets/images/0001.jpg')] " />
    <div class="divider" />

    <!-- 照片墙 -->
    <div class="h-screen grid grid-cols-3 grid-rows-4 gap-10">
      <div class="img-2 bg-cover mask mask-star-2" />
      <div class="img-2 bg-cover mask mask-star-2" />
      <div class="img-2 bg-cover mask mask-star-2" />
      <div class="img-2 bg-cover mask mask-squircle" />
      <div class="img-2 bg-cover mask mask-squircle" />
      <div class="img-2 bg-cover mask mask-squircle" />
      <div class="img-2 bg-cover mask mask-circle" />
      <div class="img-2 bg-cover mask mask-circle" />
      <div class="img-2 bg-cover mask mask-circle" />
      <div class="img-2 bg-cover mask mask-heart" />
      <div class="img-2 bg-cover mask mask-heart" />
      <div class="img-2 bg-cover mask mask-heart" />
    </div>
    <div class="divider" />
  </div>
</template>

<style lang="less" scoped>
.img-1 {
  background-image: url('@/assets/images/0001.jpg');
}

.img-2 {
  background-image: url('@/assets/images/0002.jpg');
}

/* 从上滑入 */
.slide-in-top {
  -webkit-animation: slide-in-top 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  animation: slide-in-top 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  animation-delay: 0.1s;

  @-webkit-keyframes slide-in-top {
    0% {
      -webkit-transform: translateY(-1000px);
      transform: translateY(-1000px);
      opacity: 0;
    }

    100% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes slide-in-top {
    0% {
      -webkit-transform: translateY(-1000px);
      transform: translateY(-1000px);
      opacity: 0;
    }

    100% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
      opacity: 1;
    }
  }
}

/* 从左滑入 */
.slide-in-left {
  -webkit-animation: slide-in-left 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  animation: slide-in-left 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  animation-delay: 0.8s;

  @-webkit-keyframes slide-in-left {
    0% {
      -webkit-transform: translateX(-1000px);
      transform: translateX(-1000px);
      opacity: 0;
    }

    100% {
      -webkit-transform: translateX(0);
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes slide-in-left {
    0% {
      -webkit-transform: translateX(-1000px);
      transform: translateX(-1000px);
      opacity: 0;
    }

    100% {
      -webkit-transform: translateX(0);
      transform: translateX(0);
      opacity: 1;
    }
  }
}

/* 从下滑入 */
.slide-in-bottom {
  -webkit-animation: slide-in-bottom 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  animation: slide-in-bottom 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  animation-delay: 0.5s;

  @-webkit-keyframes slide-in-bottom {
    0% {
      -webkit-transform: translateY(1000px);
      transform: translateY(1000px);
      opacity: 0;
    }

    100% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes slide-in-bottom {
    0% {
      -webkit-transform: translateY(1000px);
      transform: translateY(1000px);
      opacity: 0;
    }

    100% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
      opacity: 1;
    }
  }
}

/* 从左滚入 */
.roll-in-left {
  -webkit-animation: roll-in-left 0.6s ease-out both;
  animation: roll-in-left 0.6s ease-out both;
  animation-delay: 1.5s;

  @-webkit-keyframes roll-in-left {
    0% {
      -webkit-transform: translateX(-800px) rotate(-540deg);
      transform: translateX(-800px) rotate(-540deg);
      opacity: 0;
    }

    100% {
      -webkit-transform: translateX(0) rotate(0deg);
      transform: translateX(0) rotate(0deg);
      opacity: 1;
    }
  }

  @keyframes roll-in-left {
    0% {
      -webkit-transform: translateX(-800px) rotate(-540deg);
      transform: translateX(-800px) rotate(-540deg);
      opacity: 0;
    }

    100% {
      -webkit-transform: translateX(0) rotate(0deg);
      transform: translateX(0) rotate(0deg);
      opacity: 1;
    }
  }
}

.roll-in-right {
  -webkit-animation: roll-in-right 0.6s ease-out both;
  animation: roll-in-right 0.6s ease-out both;
  animation-delay: 1.5s;

  @-webkit-keyframes roll-in-right {
    0% {
      -webkit-transform: translateX(800px) rotate(540deg);
      transform: translateX(800px) rotate(540deg);
      opacity: 0;
    }

    100% {
      -webkit-transform: translateX(0) rotate(0deg);
      transform: translateX(0) rotate(0deg);
      opacity: 1;
    }
  }

  @keyframes roll-in-right {
    0% {
      -webkit-transform: translateX(800px) rotate(540deg);
      transform: translateX(800px) rotate(540deg);
      opacity: 0;
    }

    100% {
      -webkit-transform: translateX(0) rotate(0deg);
      transform: translateX(0) rotate(0deg);
      opacity: 1;
    }
  }
}
</style>
