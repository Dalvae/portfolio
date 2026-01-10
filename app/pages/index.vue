<script setup lang="ts">
import projectsEs from "~/assets/data/projects.json";
import projectsEn from "~/assets/data/projects-en.json";

const { t, locale } = useI18n();
const localePath = useLocalePath();
const switchLocalePath = useSwitchLocalePath();

const siteUrl = "https://diegoalvarez.dev";
const ogImage = "https://res.cloudinary.com/dwxc8s4mq/image/upload/w_1200,h_630,c_fill,q_auto,f_auto/v1748560366/portfolio/avatar_szpmal.webp";

// SEO - Complete meta tags
useHead({
  title: "Dalvae",
  titleTemplate: "",
  htmlAttrs: {
    lang: locale.value === "es" ? "es-CL" : "en-US",
  },
  meta: [
    { name: "description", content: t("seo.description") },
    // Open Graph
    { property: "og:title", content: "Dalvae - Full Stack Developer" },
    { property: "og:description", content: t("seo.description") },
    { property: "og:url", content: locale.value === "es" ? `${siteUrl}/es` : siteUrl },
    { property: "og:image", content: ogImage },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:image:alt", content: "Diego Alvarez - Full Stack Developer" },
    // Twitter
    { name: "twitter:title", content: "Dalvae - Full Stack Developer" },
    { name: "twitter:description", content: t("seo.description") },
    { name: "twitter:image", content: ogImage },
  ],
  link: [
    // Favicon
    { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
    // Canonical and hreflang for i18n SEO
    { rel: "canonical", href: locale.value === "es" ? `${siteUrl}/es` : siteUrl },
    { rel: "alternate", hreflang: "en", href: siteUrl },
    { rel: "alternate", hreflang: "es", href: `${siteUrl}/es` },
    { rel: "alternate", hreflang: "x-default", href: siteUrl },
  ],
});

// Structured Data - JSON-LD for Person/Developer
useSchemaOrg([
  {
    "@type": "Person",
    "@id": `${siteUrl}/#person`,
    name: "Diego Alvarez",
    givenName: "Diego",
    familyName: "Alvarez",
    jobTitle: "Full Stack Developer",
    description: t("seo.description"),
    url: siteUrl,
    image: ogImage,
    email: "diego.alvarez.e@ug.uchile.cl",
    address: {
      "@type": "PostalAddress",
      addressLocality: "San Pedro de Atacama",
      addressCountry: "CL",
    },
    sameAs: [
      "https://github.com/Dalvae",
      "https://www.linkedin.com/in/diego-alvarez-espinoza/",
      "https://www.upwork.com/freelancers/~01911ef1e05ea67391",
    ],
    knowsAbout: [
      "React",
      "Next.js",
      "Vue.js",
      "Nuxt",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Tailwind CSS",
    ],
  },
  {
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: siteUrl,
    name: "Diego Alvarez Portfolio",
    description: t("seo.description"),
    inLanguage: ["en-US", "es-CL"],
    author: { "@id": `${siteUrl}/#person` },
  },
]);

// Load projects based on locale
const projects = computed(() => {
  return locale.value === "es" ? projectsEs : projectsEn;
});
const socialLinks = [
  {
    name: "GitHub",
    url: "https://github.com/Dalvae",
    icon: "simple-icons:github",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/diego-alvarez-espinoza/",
    icon: "simple-icons:linkedin",
  },
  {
    name: "Upwork",
    url: "https://www.upwork.com/freelancers/~01911ef1e05ea67391",
    icon: "simple-icons:upwork",
  },
  {
    name: "Email",
    url: "mailto:diego.alvarez.e@ug.uchile.cl",
    icon: "ph:envelope-simple",
  },
];

// Navegación
const activeSection = ref("stack");
const sections = computed(() => [
  { id: "stack", label: t("sections.stack") },
  { id: "projects", label: t("sections.projects") },
  { id: "bio", label: t("sections.bio") },
]);

const scrollToSection = (sectionId: string) => {
  activeSection.value = sectionId;
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

const time = ref("");
const timezoneOffset = ref("");

const updateTime = () => {
  const now = new Date();
  const localeStr = locale.value === "es" ? "es-CL" : "en-US";
  
  time.value = now.toLocaleTimeString(localeStr, {
    timeZone: "America/Santiago",
    hour: "2-digit",
    minute: "2-digit",
  });

  // Get dynamic offset (GMT-3, GMT-4, etc)
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Santiago",
    timeZoneName: "shortOffset",
  }).formatToParts(now);
  timezoneOffset.value = parts.find((p) => p.type === "timeZoneName")?.value || "";
};

onMounted(() => {
  updateTime();
  setInterval(updateTime, 1000);

  // Observer para detectar sección activa
  const observerOptions = {
    root: null,
    rootMargin: "-20% 0px -60% 0px",
    threshold: 0,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        activeSection.value = entry.target.id;
      }
    });
  }, observerOptions);

  sections.value.forEach((section) => {
    const element = document.getElementById(section.id);
    if (element) {
      observer.observe(element);
    }
  });
});
</script>

<template>
  <div
    class="min-h-screen max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20 py-12 lg:py-0"
  >
    <div class="lg:flex lg:justify-between lg:gap-12">
      <header
        class="lg:sticky lg:top-0 lg:self-start lg:max-h-screen lg:w-1/3 lg:flex lg:flex-col lg:justify-between lg:py-10"
      >
        <div>
          <div class="mb-6">
            <NuxtImg
              src="https://res.cloudinary.com/dwxc8s4mq/image/upload/w_512,h_512,c_fill,q_auto,f_auto/v1748560366/portfolio/avatar_szpmal.webp"
              alt="Diego Alvarez"
              class="w-full max-w-2/3 mx-auto aspect-square rounded-full object-cover filter contrast-125 border-3 border-cyan-400 mb-6"
            />
            <h1
              class="text-4xl font-bold tracking-tight text-white leading-tight text-center"
            >
              Diego Alvarez
            </h1>
            <p class="text-sm font-mono text-zinc-400 mt-2 text-center flex items-center justify-center gap-1.5">
              <Icon name="ph:map-pin" class="w-4 h-4" />
              {{ t("location") }}
            </p>
            <p
              class="text-lg font-medium tracking-tight text-zinc-200 sm:text-xl mt-4"
            >
              {{ t("role_title") }}
            </p>
            <p class="leading-relaxed text-zinc-300 text-sm mt-3">
              {{ t("intro") }}
              {{ t("specialist_prefix") }} <span class="text-white">Nuxt</span>,
              <span class="text-white">React</span> {{ t("specialist_suffix") }}
            </p>
          </div>

          <!-- Language Switcher Toggle Pill -->
          <div class="flex items-center gap-3 mb-6">
            <Icon name="ph:globe" class="w-4 h-4 text-zinc-500" />
            <div class="relative flex bg-zinc-800/80 rounded-full p-0.5 border border-zinc-700/50">
              <NuxtLink
                :to="switchLocalePath('en')"
                class="relative z-10 px-3 py-1 text-xs font-medium rounded-full transition-all duration-300"
                :class="locale === 'en' 
                  ? 'text-white' 
                  : 'text-zinc-400 hover:text-zinc-200'"
              >
                EN
              </NuxtLink>
              <NuxtLink
                :to="switchLocalePath('es')"
                class="relative z-10 px-3 py-1 text-xs font-medium rounded-full transition-all duration-300"
                :class="locale === 'es' 
                  ? 'text-white' 
                  : 'text-zinc-400 hover:text-zinc-200'"
              >
                ES
              </NuxtLink>
              <!-- Sliding background indicator -->
              <span 
                class="absolute top-0.5 bottom-0.5 w-[calc(50%-2px)] bg-zinc-700 rounded-full transition-all duration-300 ease-out"
                :class="locale === 'es' ? 'left-[calc(50%+1px)]' : 'left-0.5'"
              />
            </div>
          </div>

          <nav class="hidden lg:block">
            <ul
              class="space-y-4 text-xs font-bold uppercase tracking-widest text-zinc-400"
            >
              <li v-for="section in sections" :key="section.id">
                <button
                  @click="scrollToSection(section.id)"
                  class="flex items-center gap-2 transition-colors"
                  :class="activeSection === section.id ? 'text-white' : 'hover:text-zinc-200'"
                >
                  <span 
                    class="h-[1px] transition-all duration-300"
                    :class="activeSection === section.id ? 'w-8 bg-white' : 'w-4 bg-zinc-700'"
                  ></span>
                  {{ section.label }}
                </button>
              </li>
            </ul>
          </nav>
        </div>

          <div class="mt-8 lg:mt-0">
            <div class="flex gap-4 my-4">
              <NuxtLink
                v-for="social in socialLinks"
                :key="social.name"
                :to="social.url"
                target="_blank"
                class="text-zinc-400 hover:text-white transition-colors"
                :aria-label="social.name"
              >
                <Icon :name="social.icon" size="24" />
              </NuxtLink>
            </div>
            <div class="font-mono text-xs text-zinc-500">{{ time }} • {{ timezoneOffset }}</div>
          </div>
      </header>

      <main class="pt-12 lg:w-1/2 lg:py-12">
        <div class="lg:hidden mb-12 text-zinc-400 text-sm">
          {{ t("scroll_hint") }}
        </div>

        <!-- STACK -->
        <StackSection />

        <!-- PROJECTS -->
        <section id="projects" class="mb-24">
          <h2 class="text-sm font-bold uppercase tracking-widest text-zinc-500 mb-8 lg:hidden">
            {{ t("sections.projects") }}
          </h2>
          <div class="space-y-16">
            <ProjectCard
              v-for="project in projects"
              :key="project.name"
              :project="project"
            />
          </div>

          <div class="mt-12">
            <NuxtLink
              to="https://github.com/Dalvae"
              target="_blank"
              class="inline-flex items-center font-medium leading-tight text-zinc-200 font-semibold group"
            >
              <span
                class="border-b border-transparent pb-px transition group-hover:border-teal-300 motion-reduce:transition-none"
              >
                {{ t("view_all_projects") }}
              </span>
              <Icon
                name="ph:arrow-right"
                class="ml-1 h-4 w-4 transition-transform group-hover:translate-x-2"
              />
            </NuxtLink>
          </div>
        </section>

        <!-- BIO -->
        <section id="bio" class="mb-24">
          <h2 class="text-sm font-bold uppercase tracking-widest text-zinc-500 mb-8">
            {{ t("sections.bio") }}
          </h2>
          
          <div class="space-y-6 text-zinc-300 text-sm leading-relaxed">
            <p>
              {{ t("bio.para1_1") }}
              <span class="text-white font-medium">{{ t("bio.para1_experience") }}</span>{{ t("bio.para1_2") }}
              <span class="text-white font-medium">{{ t("bio.para1_lua") }}</span>{{ t("bio.para1_3") }}
              <span class="text-white font-medium">{{ t("bio.para1_wordpress") }}</span>
              {{ t("bio.para1_4") }}
              <span class="text-white font-medium">{{ t("bio.para1_react") }}</span>
              {{ t("bio.para1_5") }}
              <span class="text-white font-medium">{{ t("bio.para1_java") }}</span>{{ t("bio.para1_6") }}
            </p>
            
            <p>
              {{ t("bio.para2_1") }}
              <span class="text-white font-medium">{{ t("bio.para2_degree") }}</span>
              {{ t("bio.para2_2") }}
            </p>

            <p>
              {{ t("bio.para3_1") }}
              <span class="text-white font-medium">{{ t("bio.para3_spanish") }}</span>,
              <span class="text-white font-medium">{{ t("bio.para3_english") }}</span>
              {{ t("bio.para3_and") }}
              <span class="text-white font-medium">{{ t("bio.para3_french") }}</span>.
            </p>

            <div class="pt-6 border-t border-zinc-800">
              <h3 class="text-xs text-zinc-500 uppercase tracking-wider mb-4">
                {{ t("availability.title") }}
              </h3>
              <div class="flex flex-wrap gap-4">
                <div class="flex items-center gap-2">
                  <div class="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span class="text-zinc-300">{{ t("availability.hours") }}</span>
                </div>
                <div class="text-zinc-500">•</div>
                <div class="text-zinc-300">{{ timezoneOffset }}</div>
              </div>
            </div>
          </div>
        </section>

        <footer class="lg:hidden pt-10 text-xs text-zinc-500">
          <p>{{ t("footer.copyright", { year: new Date().getFullYear() }) }}</p>
        </footer>
      </main>
    </div>
  </div>
</template>
