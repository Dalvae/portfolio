// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  // SSG - Full Static Generation
  ssr: true,
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ["/", "/es"],
    },
    compressPublicAssets: true,
  },

  modules: [
    "@nuxt/eslint",
    "@nuxt/devtools",
    "@nuxt/fonts",
    "@nuxt/hints",
    "@nuxt/icon",
    "@nuxt/image",
    "nuxt-seo-utils",
    "nuxt-vitalizer",
    "@nuxtjs/i18n",
    "nuxt-schema-org",
    "@nuxtjs/sitemap",
    "nuxt-og-image",
  ],

  ogImage: {
    defaults: {
      cacheMaxAgeSeconds: 60 * 60 * 24 * 7, // 7 days
    },
  },

  // Experimental features for better performance
  experimental: {
    payloadExtraction: true,
    renderJsonPayloads: true,
  },

  vite: {
    plugins: [tailwindcss() as any],
    build: {
      cssMinify: "lightningcss",
      minify: "esbuild",
    },
  },

  i18n: {
    locales: [
      { code: "en", language: "en-US", file: "en.json", name: "English" },
      { code: "es", language: "es-CL", file: "es.json", name: "Español" },
    ],
    defaultLocale: "en",
    strategy: "prefix_except_default",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      redirectOn: "root",
    },
    compilation: {
      strictMessage: false,
    },
    baseUrl: "https://diegoalvarez.dev",
  },

  // Site metadata for SEO
  site: {
    url: "https://diegoalvarez.dev",
    name: "Dalvae",
    description:
      "Full Stack Developer from San Pedro de Atacama. Specialist in React, Nuxt and Modern Architectures.",
    defaultLocale: "en",
  },

  fonts: {
    families: [
      { name: "Manrope", provider: "google", weights: [300, 400, 600, 800] },
    ],
    defaults: {
      preload: true,
    },
  },

  // Image optimization
  image: {
    quality: 80,
    format: ["webp", "avif"],
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
    },
  },

  css: ["~/assets/css/main.css"],

  app: {
    head: {
      htmlAttrs: {
        lang: "en",
      },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content:
            "Full Stack Developer from San Pedro de Atacama. Specialist in React, Nuxt and Modern Architectures.",
        },
        { name: "author", content: "Diego Alvarez" },
        { name: "robots", content: "index, follow" },
        // Open Graph
        { property: "og:type", content: "website" },
        { property: "og:site_name", content: "Diego Alvarez" },
        { property: "og:locale", content: "en_US" },
        { property: "og:locale:alternate", content: "es_CL" },
        // Twitter Card
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:creator", content: "@dalvae" },
        // Theme
        { name: "theme-color", content: "#0f0f11" },
        { name: "color-scheme", content: "dark" },
      ],
      link: [
        { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
        { rel: "canonical", href: "https://diegoalvarez.dev" },
      ],
    },
  },

  // Route rules for caching
  routeRules: {
    "/**": { prerender: true },
  },
});
