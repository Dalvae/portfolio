<template>
  <div class="min-h-screen w-full bg-[#0f0f11] text-zinc-200 font-sans selection:bg-purple-500/30 selection:text-purple-200">
    <!-- Interactive Grid Background -->
    <div class="fixed inset-0 z-0 overflow-hidden">
      <InteractiveGridPattern 
        :width="25" 
        :height="25" 
        :skew-angle="-12"
        class="opacity-50"
      />
    </div>

    <!-- Efecto Ruido Global -->
    <div class="fixed inset-0 z-50 pointer-events-none opacity-[0.03] mix-blend-overlay" 
         style="background-image: url('/noise.png');"></div>
    
    <!-- Mancha de luz ambiental (Glow) -->
    <div class="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-purple-900/20 blur-[120px] rounded-full pointer-events-none z-0"></div>

    <div class="relative z-10">
      <slot />
    </div>
    
    <footer class="relative z-10 py-8 text-center text-zinc-500 text-sm border-t border-white/5 mt-12">
      <p>&copy; {{ new Date().getFullYear() }} Diego Alvarez. Built with Nuxt & Tailwind 4.</p>
    </footer>
  </div>
</template>

<style>
.bg-noise {
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E");
}
</style>