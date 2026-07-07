<script setup lang="ts">
defineProps<{
  class?: string
  accentColor?: 'green' | 'purple' | 'orange' | 'white'
}>()

const shadowColors = {
  green: 'shadow-[6px_6px_0px_0px_#a3e635]',
  purple: 'shadow-[6px_6px_0px_0px_#a855f7]',
  orange: 'shadow-[6px_6px_0px_0px_#fb923c]',
  white: 'shadow-[6px_6px_0px_0px_#ffffff]',
}
</script>

<template>
  <div 
    :class="[
      'bg-[#121212] border-2 border-white transition-all duration-200 ease-in-out',
      'hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none', // Efecto de presionar botón mecánico
      shadowColors[accentColor || 'white'],
      $props.class
    ]"
  >
    <slot />
  </div>
</template>