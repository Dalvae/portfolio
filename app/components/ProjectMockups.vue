<template>
  <div class="relative w-full flex items-center group/mockup py-8 px-4">
    <!-- Safari Mockup (Desktop) -->
    <div class="relative w-[85%] transition-all duration-700 ease-out group-hover/mockup:-translate-x-4 group-hover/mockup:-rotate-1">
      <SafariMockup 
        :src="srcDesktop" 
        :url="url"
        class="w-full"
      />
    </div>
    
    <!-- iPhone Mockup (Mobile) -->
    <div 
      v-if="srcMobile"
      class="absolute right-0 bottom-2 w-[28%] transition-all duration-700 ease-out delay-75 group-hover/mockup:translate-x-4 group-hover/mockup:-translate-y-4 group-hover/mockup:rotate-2"
    >
      <IPhone15ProMockup 
        :src="srcMobile" 
        class="w-full"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import SafariMockup from './ui/safari-mockup/SafariMockup.vue'
import IPhone15ProMockup from './ui/iphone-mockup/iPhone15ProMockup.vue'

defineProps<{
  srcDesktop: string
  srcMobile?: string
  url?: string
}>()
</script>
