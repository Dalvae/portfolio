<script setup lang="ts">
const { t } = useI18n();

// Stack tecnológico
const techStack = {
  frontend: [
    { name: "React", icon: "logos:react" },
    { name: "Next.js", icon: "logos:nextjs-icon" },
    { name: "Vue", icon: "logos:vue" },
    { name: "Nuxt", icon: "logos:nuxt-icon" },
    { name: "Astro", icon: "logos:astro-icon" },
    { name: "TypeScript", icon: "logos:typescript-icon" },
    { name: "Tailwind", icon: "logos:tailwindcss-icon" },
  ],
  backend: [
    { name: "Node.js", icon: "logos:nodejs-icon" },
    { name: "Python", icon: "logos:python" },
    { name: "FastAPI", icon: "logos:fastapi-icon" },
    { name: "Java", icon: "logos:java" },
    { name: "Spring", icon: "logos:spring-icon" },
    { name: "PHP", icon: "logos:php" },
  ],
  database: [
    { name: "PostgreSQL", icon: "logos:postgresql" },
    { name: "Redis", icon: "logos:redis" },
    { name: "Supabase", icon: "logos:supabase-icon" },
  ],
  tools: [
    { name: "Docker", icon: "logos:docker-icon" },
    { name: "AWS", icon: "logos:aws" },
    { name: "Vercel", icon: "logos:vercel-icon" },
    { name: "Git", icon: "logos:git-icon" },
  ],
  cms: [
    { name: "WordPress", icon: "logos:wordpress-icon" },
    { name: "Payload", icon: "simple-icons:payloadcms" },
    { name: "Medusa", icon: "simple-icons:medusa" },
  ],
};
</script>

<template>
  <section id="stack" class="mb-24">
    <h2 class="text-sm font-bold uppercase tracking-widest text-zinc-500 mb-8">
      {{ t("sections.stack") }}
    </h2>
    
    <div class="relative rounded-2xl border border-zinc-800 overflow-hidden">
      <!-- Flickering Grid Background -->
      <FlickeringGrid 
        class="absolute inset-0" 
        :square-size="4" 
        :grid-gap="6" 
        :flicker-chance="0.3" 
        color="#14b8a6" 
        :max-opacity="0.15"
      />
      
      <div class="relative z-10 p-6 space-y-8">
        <!-- Frontend -->
        <div>
          <h3 class="text-xs text-zinc-400 uppercase tracking-wider mb-4 flex items-center gap-2">
            <span class="w-6 h-[1px] bg-zinc-600"></span>
            {{ t("stack_categories.frontend") }}
          </h3>
          <div class="flex flex-wrap gap-3">
            <div 
              v-for="tech in techStack.frontend" 
              :key="tech.name"
              class="flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/80 backdrop-blur-sm border border-zinc-700/50 hover:border-teal-500/50 hover:bg-zinc-800/80 transition-all group cursor-default"
            >
              <Icon :name="tech.icon" class="w-5 h-5" />
              <span class="text-sm text-zinc-300 group-hover:text-white transition-colors">{{ tech.name }}</span>
            </div>
          </div>
        </div>

        <!-- Backend -->
        <div>
          <h3 class="text-xs text-zinc-400 uppercase tracking-wider mb-4 flex items-center gap-2">
            <span class="w-6 h-[1px] bg-zinc-600"></span>
            {{ t("stack_categories.backend") }}
          </h3>
          <div class="flex flex-wrap gap-3">
            <div 
              v-for="tech in techStack.backend" 
              :key="tech.name"
              class="flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/80 backdrop-blur-sm border border-zinc-700/50 hover:border-teal-500/50 hover:bg-zinc-800/80 transition-all group cursor-default"
            >
              <Icon :name="tech.icon" class="w-5 h-5" />
              <span class="text-sm text-zinc-300 group-hover:text-white transition-colors">{{ tech.name }}</span>
            </div>
          </div>
        </div>

        <!-- Database -->
        <div>
          <h3 class="text-xs text-zinc-400 uppercase tracking-wider mb-4 flex items-center gap-2">
            <span class="w-6 h-[1px] bg-zinc-600"></span>
            {{ t("stack_categories.database") }}
          </h3>
          <div class="flex flex-wrap gap-3">
            <div 
              v-for="tech in techStack.database" 
              :key="tech.name"
              class="flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/80 backdrop-blur-sm border border-zinc-700/50 hover:border-teal-500/50 hover:bg-zinc-800/80 transition-all group cursor-default"
            >
              <Icon :name="tech.icon" class="w-5 h-5" />
              <span class="text-sm text-zinc-300 group-hover:text-white transition-colors">{{ tech.name }}</span>
            </div>
          </div>
        </div>

        <!-- Tools & CMS -->
        <div>
          <h3 class="text-xs text-zinc-400 uppercase tracking-wider mb-4 flex items-center gap-2">
            <span class="w-6 h-[1px] bg-zinc-600"></span>
            {{ t("stack_categories.tools") }}
          </h3>
          <div class="flex flex-wrap gap-3">
            <div 
              v-for="tech in [...techStack.tools, ...techStack.cms]" 
              :key="tech.name"
              class="flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/80 backdrop-blur-sm border border-zinc-700/50 hover:border-teal-500/50 hover:bg-zinc-800/80 transition-all group cursor-default"
            >
              <Icon :name="tech.icon" class="w-5 h-5" />
              <span class="text-sm text-zinc-300 group-hover:text-white transition-colors">{{ tech.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
