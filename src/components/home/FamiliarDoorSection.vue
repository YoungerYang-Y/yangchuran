<script setup lang="ts">
import type { StorageLike } from '../../utils/familiarAccess'
import { nextTick, onMounted, ref } from 'vue'
import { createFamiliarAccess } from '../../utils/familiarAccess'

const familiarInput = ref<HTMLInputElement>()
const doorDialog = ref<HTMLDialogElement>()
const doorTrigger = ref<HTMLButtonElement>()
const familiarCode = ref('')
const familiarError = ref('')
const storageNotice = ref('')
const isFamiliar = ref(false)
const familiarPassword = import.meta.env.VITE_FAMILIAR_PASSWORD ?? ''
let familiarAccess: ReturnType<typeof createFamiliarAccess> | undefined

const unavailableStorage: StorageLike = {
  getItem: () => { throw new Error('Browser storage is unavailable') },
  setItem: () => { throw new Error('Browser storage is unavailable') },
  removeItem: () => { throw new Error('Browser storage is unavailable') },
}

onMounted(() => {
  familiarAccess = createFamiliarAccess({ password: familiarPassword, storage: getBrowserStorage() })
  isFamiliar.value = familiarAccess.isUnlocked()
  if (familiarAccess.hasStorageIssue())
    storageNotice.value = '这个浏览器暂时不能记住小门，本次访问仍然可以打开。'
})

function getBrowserStorage(): StorageLike {
  try {
    return window.localStorage
  }
  catch {
    return unavailableStorage
  }
}

function openDoor() {
  familiarError.value = ''
  doorDialog.value?.showModal()
  nextTick(() => familiarInput.value?.focus())
}

function closeDoor() {
  doorDialog.value?.close()
}

function resetDoor() {
  familiarCode.value = ''
  familiarError.value = ''
  nextTick(() => doorTrigger.value?.focus())
}

function unlockFamiliarPages() {
  if (!familiarAccess?.unlock(familiarCode.value.trim())) {
    familiarError.value = familiarPassword ? '小门还没有认出这个口令，再试一次吧。' : '小门的口令还没有设置。'
    return
  }
  isFamiliar.value = true
  if (familiarAccess.hasStorageIssue())
    storageNotice.value = '这个浏览器暂时不能记住小门，本次访问仍然可以打开。'
  closeDoor()
}
</script>

<template>
  <section class="familiar-section grid min-h-dvh content-center justify-items-center gap-6 px-6 py-16 text-center" aria-labelledby="familiar-title">
    <div class="little-door" :class="{ opened: isFamiliar }">
      <span class="door-window" aria-hidden="true">✦</span><span class="door-knob" aria-hidden="true" />
    </div>
    <div class="familiar-copy max-w-xl">
      <p class="chapter text-sm font-bold tracking-[0.12em] text-story-pink">
        给熟悉朋友的小门
      </p>
      <h2 id="familiar-title" class="font-handwrite">
        {{ isFamiliar ? '小门已经打开啦！' : '你也认识果果吗？' }}
      </h2>
      <p>{{ isFamiliar ? '挑一页想再看看的故事吧。' : '输入熟客口令，可以看见更多小路。' }}</p>
      <p v-if="storageNotice" class="storage-notice" role="status">
        {{ storageNotice }}
      </p>
      <button v-if="!isFamiliar" ref="doorTrigger" class="btn btn-warning door-button" type="button" @click="openDoor">
        敲敲小门
      </button>
    </div>
    <nav v-if="isFamiliar" class="familiar-links grid w-full max-w-xl gap-3 text-left" aria-label="熟客内容">
      <RouterLink to="/birthday">
        生日小舞台 <span aria-hidden="true">→</span>
      </RouterLink>
      <RouterLink to="/timeline">
        成长小路 <span aria-hidden="true">→</span>
      </RouterLink>
      <RouterLink to="/accordion">
        照片小抽屉 <span aria-hidden="true">→</span>
      </RouterLink>
    </nav>
  </section>

  <dialog ref="doorDialog" class="modal" aria-labelledby="door-dialog-title" @click.self="closeDoor" @close="resetDoor">
    <div class="modal-box door-dialog w-full max-w-[25rem]">
      <button class="btn btn-circle btn-sm dialog-close" type="button" aria-label="关上小门" @click="closeDoor">
        ×
      </button>
      <p class="chapter text-sm font-bold tracking-[0.12em] text-story-pink">
        熟客小门
      </p>
      <h2 id="door-dialog-title" class="font-handwrite">
        说一句悄悄话
      </h2>
      <p>输入家人朋友知道的口令，小门会记住这台设备 30 天。</p>
      <form @submit.prevent="unlockFamiliarPages">
        <label for="familiar-code">熟客口令</label>
        <input id="familiar-code" ref="familiarInput" v-model="familiarCode" class="input input-bordered w-full" type="password" autocomplete="current-password" :aria-invalid="Boolean(familiarError)" aria-describedby="familiar-error">
        <p id="familiar-error" class="form-error" role="alert">
          {{ familiarError }}
        </p>
        <button class="btn btn-warning door-button" type="submit">
          打开小门
        </button>
      </form>
    </div>
  </dialog>
</template>

<style scoped>
h2,
p {
  text-wrap: balance;
}
.little-door {
  position: relative;
  width: 8rem;
  height: 11rem;
  border: 3px solid var(--ink);
  border-radius: 4rem 4rem 1rem 1rem;
  background: var(--door);
  box-shadow: 7px 7px 0 #f5c2d0;
  transition: transform 0.2s ease-out;
}
.little-door.opened {
  transform: perspective(30rem) rotateY(-14deg);
}
.door-window {
  display: grid;
  width: 2.7rem;
  height: 2.7rem;
  place-items: center;
  margin: 2rem auto 0;
  border: 2px solid var(--ink);
  border-radius: 50%;
  background: #fff2bb;
  color: var(--ink);
}
.door-knob {
  position: absolute;
  right: 1rem;
  bottom: 2.5rem;
  width: 0.8rem;
  height: 0.8rem;
  border: 2px solid var(--ink);
  border-radius: 50%;
  background: var(--yellow);
}
.familiar-copy h2,
.door-dialog h2 {
  margin: 0.65rem 0;
  font-size: clamp(2.25rem, 10vw, 3.5rem);
  line-height: 1;
  color: var(--ink);
}
.familiar-copy > p:not(.chapter),
.door-dialog > p {
  margin: 0;
  font-size: 1.125rem;
  line-height: 1.8;
  color: var(--ink-soft);
}
.door-button {
  margin-top: 1.25rem;
  color: var(--ink);
  font-size: 1.1rem;
  font-weight: 800;
  border: 2px solid var(--ink);
  border-radius: 999px;
  background: var(--yellow);
  box-shadow: 3px 3px 0 var(--ink);
  transition:
    transform 0.15s ease-out,
    box-shadow 0.15s ease-out;
}
.door-button:hover {
  transform: translate(-1px, -1px);
  box-shadow: 5px 5px 0 var(--ink);
}
.door-button:active {
  transform: translate(1px, 1px);
  box-shadow: 1px 1px 0 var(--ink);
}
.door-button:focus-visible,
.familiar-links a:focus-visible,
.dialog-close:focus-visible,
input:focus-visible {
  outline: 3px solid var(--pink);
  outline-offset: 3px;
}
.familiar-links {
  margin-top: 0.5rem;
}
.familiar-links a {
  display: flex;
  justify-content: space-between;
  padding: 1rem 1.25rem;
  color: var(--ink);
  font-weight: 800;
  text-decoration: none;
  border: 2px dashed var(--ink-soft);
  border-radius: 1rem;
  background: rgb(255 255 255 / 70%);
  transition:
    transform 0.15s ease-out,
    background-color 0.15s ease-out;
}
.familiar-links a:hover {
  transform: rotate(-0.5deg) translateY(-2px);
  background: #fff;
}
.door-dialog {
  max-height: min(100dvh - 2rem, 36rem);
  padding: 2rem;
  overflow: auto;
  border: 3px solid var(--ink);
  border-radius: 1.5rem;
  background: var(--paper);
  box-shadow: 8px 8px 0 #33466d;
  text-align: center;
}
.dialog-close {
  float: right;
  color: var(--ink);
  font-size: 1.5rem;
  line-height: 1;
  border: 2px solid var(--ink);
  background: white;
}
.door-dialog form {
  display: grid;
  gap: 0.65rem;
  margin-top: 1.5rem;
  text-align: left;
}
.door-dialog form .door-button {
  justify-self: center;
}
.door-dialog label {
  font-weight: 800;
}
.door-dialog input {
  color: var(--ink);
  font: inherit;
  border: 2px solid var(--ink);
  border-radius: 0.75rem;
  background: white;
}
.form-error {
  min-height: 1.25rem;
  margin: 0;
  color: #b63c65;
  font-size: 0.875rem;
}
.storage-notice {
  margin: 0.75rem auto 0;
  color: #a4562f;
  font-size: 0.875rem;
  line-height: 1.6;
}
</style>
