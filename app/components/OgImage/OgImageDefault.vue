<template>
  <div
    class="w-full h-full flex items-center justify-between px-20"
    :style="{
      background: 'linear-gradient(135deg, #0f0f11 0%, #18181b 50%, #0f0f11 100%)',
      fontFamily: 'Manrope, sans-serif',
    }"
  >
    <!-- Left content -->
    <div class="flex flex-col gap-6">
      <div class="flex items-center gap-4">
        <div
          class="w-4 h-4 rounded-full"
          :style="{ background: 'linear-gradient(135deg, #a855f7, #ec4899)' }"
        />
        <span class="text-2xl text-zinc-400">diegoalvarez.dev</span>
      </div>

      <h1 class="text-7xl font-bold text-white leading-tight">
        Diego Alvarez
      </h1>

      <p class="text-3xl text-zinc-400 max-w-xl">
        Full Stack Developer
      </p>

      <div class="flex gap-4 mt-4">
        <span
          v-for="tech in ['React', 'Nuxt', 'TypeScript', 'Node.js']"
          :key="tech"
          class="px-4 py-2 rounded-lg text-xl text-zinc-300"
          :style="{ background: 'rgba(168, 85, 247, 0.15)', border: '1px solid rgba(168, 85, 247, 0.3)' }"
        >
          {{ tech }}
        </span>
      </div>
    </div>

    <!-- Right side gradient orb -->
    <div
      class="w-80 h-80 rounded-full opacity-60 blur-3xl"
      :style="{
        background: 'radial-gradient(circle, rgba(168, 85, 247, 0.4) 0%, rgba(236, 72, 153, 0.2) 50%, transparent 70%)',
      }"
    />
  </div>
</template>

<script setup lang="ts">
defineOgImageComponent('OgImageDefault', {})
</script>
