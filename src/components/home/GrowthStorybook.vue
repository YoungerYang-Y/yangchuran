<script setup lang="ts">
import { ref } from 'vue'
import { useStorybookScroll } from '../../composables/useStorybookScroll'
import { homeMoments } from '../../data/homeMoments'
import SvgCloud from '../decorations/SvgCloud.vue'
import SvgHeart from '../decorations/SvgHeart.vue'
import SvgStar from '../decorations/SvgStar.vue'

const storybook = ref<HTMLElement>()
const storyCharacters = homeMoments.map(moment => ({
  chapter: Array.from(`${moment.year} 年年度故事`),
  title: Array.from(moment.title),
  body: Array.from(moment.story),
}))

const {
  activeStory,
  cardStyle,
  decorationStyle,
  isEnabled: isScrollStory,
  letterStyle,
  photoStyle,
  stageStyle,
} = useStorybookScroll(storybook, homeMoments.length)
</script>

<template>
  <section
    id="moments"
    ref="storybook"
    class="moments-section relative pb-20"
    :class="{ 'is-scroll-story': isScrollStory }"
    :style="stageStyle"
    aria-label="果果的年度故事"
  >
    <div class="story-stage relative overflow-clip">
      <div class="story-atmosphere pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        <div class="story-cloud absolute" :style="decorationStyle(1.2, -1)">
          <SvgCloud :size="110" color="#dff1ff" />
        </div>
        <div class="story-star absolute" :style="decorationStyle(2.1)">
          <SvgStar :size="28" color="#f2bd39" />
        </div>
        <div class="story-heart absolute" :style="decorationStyle(1.6, -1)">
          <SvgHeart :size="22" color="#ed829d" />
        </div>
      </div>

      <div class="story-intro relative z-10 mx-auto mb-10 w-[min(100%_-_2rem,42rem)] text-center">
        <p class="eyebrow text-sm font-bold tracking-[0.12em] text-story-pink">
          一年一张照片，一段记忆
        </p>
        <h2 class="font-handwrite">
          果果的年度故事
        </h2>
      </div>

      <div class="story-track relative z-10 mx-auto grid w-[min(100%_-_2rem,42rem)] gap-16">
        <article
          v-for="(moment, index) in homeMoments"
          :key="moment.title"
          class="moment-card grid items-center gap-6 rounded-3xl border-2 border-story-ink bg-[#fffef9] p-5"
          :class="`tone-${moment.tone}`"
          :style="cardStyle(index)"
        >
          <div class="photo-frame relative bg-white" :class="`tilt-${index}`" :style="photoStyle(index)">
            <img :src="moment.image" :alt="moment.alt" width="1620" height="1080" loading="lazy">
            <span class="photo-tape" aria-hidden="true" />
          </div>

          <div class="moment-copy">
            <p class="chapter" :aria-label="`${moment.year} 年年度故事`">
              <span
                v-for="(character, characterIndex) in storyCharacters[index].chapter"
                :key="`${character}-${characterIndex}`"
                class="story-letter"
                aria-hidden="true"
                :style="letterStyle(index, 0, characterIndex, storyCharacters[index].chapter.length)"
              >
                {{ character }}
              </span>
            </p>
            <h2 class="font-handwrite" :aria-label="moment.title">
              <span
                v-for="(character, characterIndex) in storyCharacters[index].title"
                :key="`${character}-${characterIndex}`"
                class="story-letter"
                aria-hidden="true"
                :style="letterStyle(index, 1, characterIndex, storyCharacters[index].title.length)"
              >
                {{ character }}
              </span>
            </h2>
            <p class="story-body" :aria-label="moment.story">
              <span
                v-for="(character, characterIndex) in storyCharacters[index].body"
                :key="`${character}-${characterIndex}`"
                class="story-letter"
                aria-hidden="true"
                :style="letterStyle(index, 2, characterIndex, storyCharacters[index].body.length)"
              >
                {{ character }}
              </span>
            </p>
          </div>
        </article>
      </div>

      <ol class="year-progress relative z-10 flex justify-center gap-3" aria-label="果果的年度故事年份">
        <li v-for="(moment, index) in homeMoments" :key="moment.year" :class="{ active: index === activeStory }">
          <span>{{ moment.year }}</span>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.story-cloud {
  top: 3rem;
  right: -2rem;
}
.story-star {
  top: 12rem;
  left: 4%;
}
.story-heart {
  right: 8%;
  bottom: 7rem;
}
.chapter {
  margin: 0;
  font-size: 0.875rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: var(--pink);
}
h2,
p {
  text-wrap: balance;
}
.story-intro h2 {
  margin: 0.6rem 0 0;
  font-size: clamp(2.35rem, 10vw, 3.75rem);
  line-height: 1;
}
.year-progress {
  margin: 2rem 1rem 0;
  padding: 0;
  color: var(--ink-soft);
  font-size: 0.875rem;
  font-weight: 800;
  list-style: none;
}
.year-progress li {
  display: flex;
  align-items: center;
  gap: 0.15rem;
  transition:
    transform 0.2s ease-out,
    color 0.2s ease-out;
}
.year-progress span {
  display: inline-grid;
  min-width: 4rem;
  height: 2.5rem;
  padding: 0 0.625rem;
  place-items: center;
  color: var(--ink-soft);
  border: 2px dashed currentColor;
  border-radius: 999px;
  background: rgb(255 255 255 / 75%);
  font-variant-numeric: tabular-nums;
  letter-spacing: 0.02em;
  white-space: nowrap;
}
.year-progress li.active {
  color: var(--pink);
  transform: translateY(-0.35rem) rotate(-5deg);
}
.year-progress li.active span {
  color: var(--ink);
  border-style: solid;
  background: var(--yellow);
  box-shadow: 2px 2px 0 var(--ink);
}
.moments-section.is-scroll-story {
  padding-bottom: 0;
}
.moments-section.is-scroll-story .story-stage {
  position: sticky;
  top: 0;
  display: flex;
  box-sizing: border-box;
  height: 100dvh;
  align-items: center;
  padding: 5.75rem 0 4.5rem;
}
.moments-section.is-scroll-story .story-intro {
  position: absolute;
  top: 1rem;
  left: 50%;
  width: min(calc(100% - 2rem), 28rem);
  margin: 0;
  text-align: center;
  transform: translateX(-50%);
}
.moments-section.is-scroll-story .story-intro h2 {
  font-size: clamp(2.25rem, 10vw, 3.25rem);
}
.moments-section.is-scroll-story .story-track {
  display: grid;
  width: 100%;
  place-items: center;
  margin: 0;
}
.moments-section.is-scroll-story .moment-card {
  grid-area: 1 / 1;
  width: min(calc(100% - 2rem), 28rem);
  padding: 1.25rem;
  will-change: transform, opacity;
}
.moments-section.is-scroll-story .photo-frame {
  padding: 0.5rem 0.5rem 1.8rem;
}
.moments-section.is-scroll-story .moment-copy {
  padding: 0.25rem;
}
.moments-section.is-scroll-story .moment-copy h2 {
  font-size: clamp(2rem, 9vw, 2.75rem);
}
.moments-section.is-scroll-story .moment-copy > p:last-child {
  font-size: 1rem;
  line-height: 1.7;
}
.moments-section.is-scroll-story .moment-copy > * {
  will-change: transform, opacity;
}
.moments-section.is-scroll-story .year-progress {
  position: absolute;
  bottom: 0.75rem;
  left: 50%;
  width: calc(100% - 2rem);
  margin: 0;
  gap: 0.5rem;
  transform: translateX(-50%);
}
.moments-section.is-scroll-story .year-progress span {
  min-width: 2.75rem;
  height: 2rem;
  padding: 0;
  font-size: 0.7rem;
}
.moment-card {
  box-shadow: 7px 7px 0 var(--card-shadow);
}
.tone-apricot {
  --card-shadow: #ffd17c;
}
.tone-sky {
  --card-shadow: #a8d9ec;
}
.tone-peach {
  --card-shadow: #f6b8c7;
}
.photo-frame {
  padding: 0.75rem 0.75rem 2.4rem;
  box-shadow: 0 8px 18px rgb(64 89 138 / 14%);
}
.photo-frame img {
  display: block;
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
}
.tilt-0 {
  transform: rotate(-2.5deg);
}
.tilt-1 {
  transform: rotate(2deg);
}
.tilt-2 {
  transform: rotate(-1.5deg);
}
.photo-tape {
  position: absolute;
  top: -0.75rem;
  left: 50%;
  width: 5rem;
  height: 1.5rem;
  background: color-mix(in srgb, var(--yellow) 70%, white);
  transform: translateX(-50%) rotate(-3deg);
}
.moment-copy {
  padding: 0.5rem;
}
.story-letter {
  display: inline-block;
}
.moment-copy h2 {
  margin: 0.65rem 0;
  font-size: clamp(2.25rem, 10vw, 3.5rem);
  line-height: 1;
  color: var(--ink);
}
.moment-copy > p:last-child {
  margin: 0;
  font-size: 1.125rem;
  line-height: 1.8;
  color: var(--ink-soft);
}
@media (min-width: 48rem) {
  .moment-card {
    grid-template-columns: minmax(0, 1fr) minmax(14rem, 0.85fr);
    padding: 2rem;
  }
  .moment-card:nth-child(even) .photo-frame {
    order: 2;
  }
}
@media (min-width: 40rem) {
  .moments-section.is-scroll-story {
    min-height: 360dvh;
  }
  .moments-section.is-scroll-story .story-stage {
    padding-top: 7rem;
  }
  .moments-section.is-scroll-story .story-intro {
    position: absolute;
    top: 8%;
    left: 12vw;
    width: auto;
    margin: 0;
    text-align: left;
    transform: none;
  }
  .moments-section.is-scroll-story .story-intro h2 {
    font-size: clamp(2.5rem, 4vw, 4.25rem);
  }
  .moments-section.is-scroll-story .story-track {
    display: grid;
    width: 100%;
    place-items: center;
    margin: 0;
  }
  .moments-section.is-scroll-story .moment-card {
    grid-area: 1 / 1;
    width: min(84vw, 60rem);
    min-height: min(34rem, 66dvh);
    padding: 2.5rem;
    will-change: transform, opacity;
  }
  .moments-section.is-scroll-story .moment-copy > * {
    will-change: transform, opacity;
  }
  .moments-section.is-scroll-story .year-progress {
    position: absolute;
    top: 50%;
    bottom: auto;
    left: max(1rem, calc((100vw - min(82vw, 60rem)) / 2 - 7rem));
    width: auto;
    flex-direction: column;
    align-items: flex-start;
    margin: 0;
    transform: translateY(-50%);
  }
}
</style>
