// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/eslint',
    '@nuxt/devtools',
    '@nuxt/fonts',
    '@nuxt/hints',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxtjs/tailwindcss',
    'nuxt-seo-utils',
    'nuxt-vitalizer',
    '@nuxtjs/i18n'
  ]
})