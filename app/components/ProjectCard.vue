<script setup lang="ts">
const { t } = useI18n();

interface Project {
  name: string;
  link: string;
  imageDesktop: string;
  imageMobile?: string;
  technologies: string[];
  description: string;
  github?: string;
  isPrivate?: boolean;
}

defineProps<{
  project: Project;
}>();

// Mapa de tecnologías a iconos
const techIcons: Record<string, string> = {
  react: "logos:react",
  next: "logos:nextjs-icon",
  nextjs: "logos:nextjs-icon",
  vue: "logos:vue",
  nuxt: "logos:nuxt-icon",
  typescript: "logos:typescript-icon",
  javascript: "logos:javascript",
  tailwind: "logos:tailwindcss-icon",
  node: "logos:nodejs-icon",
  nodejs: "logos:nodejs-icon",
  postgresql: "logos:postgresql",
  postgres: "logos:postgresql",
  mongodb: "logos:mongodb-icon",
  prisma: "logos:prisma",
  graphql: "logos:graphql",
  docker: "logos:docker-icon",
  aws: "logos:aws",
  vercel: "logos:vercel-icon",
  firebase: "logos:firebase",
  supabase: "logos:supabase-icon",
  astro: "logos:astro-icon",
  svelte: "logos:svelte-icon",
  python: "logos:python",
  rust: "logos:rust",
  go: "logos:go",
  php: "logos:php",
  laravel: "logos:laravel",
  wordpress: "logos:wordpress-icon",
  medusa: "simple-icons:medusa",
  payload: "simple-icons:payloadcms",
  stripe: "logos:stripe",
  redis: "logos:redis",
  int: "simple-icons:i18next",
  springboot: "logos:spring-icon",
  java: "logos:java",
  n8n: "simple-icons:n8n",
};

const getTechIcon = (tech: string) => {
  const key = tech.toLowerCase().trim();
  return techIcons[key] || "ph:code";
};
</script>

<template>
  <article class="group relative">
    <NuxtLink :to="project.link" target="_blank" class="block">
      <div class="flex flex-col gap-4">
        <!-- Project Info -->
        <div class="w-full">
          <h3 class="text-2xl font-semibold text-zinc-100 group-hover:text-teal-400 transition-colors flex items-center gap-2">
            {{ project.name }}
            <Icon
              name="ph:arrow-up-right"
              class="h-5 w-5 opacity-0 -translate-y-1 translate-x-0 group-hover:opacity-100 group-hover:-translate-y-0 group-hover:translate-x-0 transition-all"
            />
          </h3>

          <ul class="mt-4 flex flex-wrap gap-4" :aria-label="t('aria.tech_used')">
            <li
              v-for="tech in project.technologies"
              :key="tech"
              class="relative group/tech"
            >
              <Icon :name="getTechIcon(tech)" class="w-6 h-6 opacity-70 group-hover:opacity-100 transition-opacity" />
              <span class="absolute -top-9 left-1/2 -translate-x-1/2 px-2 py-1 text-[10px] font-bold uppercase tracking-wider bg-zinc-800 text-teal-400 border border-teal-500/20 rounded opacity-0 group-hover/tech:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10 shadow-xl">
                {{ tech }}
              </span>
            </li>
          </ul>

          <p class="mt-6 text-zinc-400 group-hover:text-zinc-300 transition-colors leading-relaxed">
            {{ project.description }}
          </p>

          <!-- GitHub link & Private badge -->
          <div class="mt-4 flex items-center gap-3">
            <a
              v-if="project.github"
              :href="project.github"
              target="_blank"
              class="inline-flex items-center gap-1.5 text-sm text-zinc-400 hover:text-teal-400 transition-colors"
              @click.stop
            >
              <Icon name="simple-icons:github" class="w-4 h-4" />
              <span>{{ t("view_code") }}</span>
            </a>
            <span
              v-if="project.isPrivate"
              class="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium text-zinc-500 bg-zinc-800/50 border border-zinc-700/50 rounded-full"
            >
              <Icon name="ph:lock-simple" class="w-3 h-3" />
              {{ t("private") }}
            </span>
          </div>
        </div>

        <!-- Project Mockups -->
        <div class="w-full">
          <ProjectMockups 
            :src-desktop="project.imageDesktop" 
            :src-mobile="project.imageMobile"
            :url="project.link?.replace('https://', '').replace('www.', '')"
          />
        </div>
      </div>
    </NuxtLink>
  </article>
</template>
