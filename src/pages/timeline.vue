<script lang="ts">
import { getAssetsFile } from "@/util/CommonUse";
import { Icon } from "@iconify/vue";

export default {
  components: {
    Icon,
  },
  setup() {
    return { getAssetsFile };
  },
  data() {
    return {
      // 时间轴展示对象
      timelineData: [
        {
          id: 1,
          icon: "streamline-emojis:baby-bottle",
          image: {
            name: "0001.jpg",
            url: "0001.jpg",
          },
          date: "2022年11月15日",
          description: "出生第 1 天",
        },
        {
          id: 2,
          icon: "streamline-emojis:baby-1",
          image: {
            name: "0002.jpg",
            url: "0002.jpg",
          },
          date: "2022年12月15日",
          description: "出生第 30 天",
        },
        {
          id: 3,
          icon: "streamline-emojis:crown",
          image: {
            name: "bg.jpg",
            url: "bg.jpg",
          },
          date: "2023年1月15日",
          description: "出生第 60 天",
        },
        {
          id: 4,
          icon: "streamline-emojis:crown",
          image: {
            name: "bg.jpg",
            url: "bg.jpg",
          },
          date: "2023年1月15日",
          description: "出生第 60 天",
        },
        {
          id: 5,
          icon: "streamline-emojis:crown",
          image: {
            name: "bg.jpg",
            url: "bg.jpg",
          },
          date: "2023年1月15日",
          description: "出生第 60 天",
        },
      ],
    };
  },
};
</script>

<template>
  <div class="container mx-auto w-full h-full">
    <div class="relative overflow-hidden py-10 h-full">
      <ul class="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
        <li v-for="item in timelineData" :key="item.id">
          <div class="timeline-middle">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-5 w-5"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" /></svg>
          </div>
          <div class="timeline-start mb-10" :class="item.id % 2 === 0 ? 'timeline-end md' : 'timeline-start md:text-end'">
            <time class="font-mono italic">{{ item.date }}</time>
            <div class="text-lg font-black">
              <img :src="getAssetsFile(item.image?.url)" :alt="item.image?.name">
            </div>
            {{ item.description }}
          </div>
          <hr>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped></style>
