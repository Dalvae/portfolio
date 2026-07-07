<script setup lang="ts">
withDefaults(defineProps<{
  title?: string
  description?: string
}>(), {
  title: 'Diego Alvarez',
  description: 'Full Stack Developer',
})
</script>

<template>
  <div 
    class="flex flex-row w-[1200px] h-[630px] p-[60px] items-center gap-[60px]"
    style="background: linear-gradient(135deg, #0f0f11 0%, #1a1a2e 50%, #16213e 100%);"
  >
    <!-- Avatar más grande -->
    <div class="flex w-[350px] justify-center items-center">
      <img
        src="https://res.cloudinary.com/dwxc8s4mq/image/upload/w_500,h_500,c_fill,q_auto,f_png,e_background_removal/v1748560366/portfolio/avatar_szpmal"
        class="w-[280px] h-[280px] rounded-full border-4 border-cyan-400"
      />
    </div>
    
    <!-- Nombre + Stack -->
    <div class="flex flex-col gap-[20px]">
      <div class="text-[72px] font-bold text-white">{{ title }}</div>
      <div class="text-[32px] text-zinc-400">{{ description }}</div>
      
      <!-- Stack con iconos en fila -->
      <div class="flex flex-row gap-[12px] mt-[20px]">
        <div class="flex items-center gap-[8px] px-[18px] py-[12px] rounded-[10px] bg-purple-500/20 border border-purple-500/40">
          <Icon name="logos:java" mode="svg" width="28" height="28" />
          <span class="text-[20px] text-zinc-300">Java</span>
        </div>
        <div class="flex items-center gap-[8px] px-[18px] py-[12px] rounded-[10px] bg-purple-500/20 border border-purple-500/40">
          <Icon name="logos:react" mode="svg" width="28" height="28" />
          <span class="text-[20px] text-zinc-300">React</span>
        </div>
        <div class="flex items-center gap-[8px] px-[18px] py-[12px] rounded-[10px] bg-purple-500/20 border border-purple-500/40">
          <Icon name="logos:nuxt-icon" mode="svg" width="28" height="28" />
          <span class="text-[20px] text-zinc-300">Nuxt</span>
        </div>
        <div class="flex items-center gap-[8px] px-[18px] py-[12px] rounded-[10px] bg-purple-500/20 border border-purple-500/40">
          <Icon name="logos:typescript-icon" mode="svg" width="28" height="28" />
          <span class="text-[20px] text-zinc-300">TS</span>
        </div>
        <div class="flex items-center gap-[8px] px-[18px] py-[12px] rounded-[10px] bg-purple-500/20 border border-purple-500/40">
          <Icon name="logos:nodejs-icon" mode="svg" width="28" height="28" />
          <span class="text-[20px] text-zinc-300">Node</span>
        </div>
      </div>
    </div>
  </div>
</template>
