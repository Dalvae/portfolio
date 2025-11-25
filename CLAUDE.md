# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website for Diego Alvarez, a Full Stack Developer. The site is built with **Nuxt 4** (using Vue 3), **Tailwind CSS 4**, and follows a Bento-grid design pattern with a dark, modern aesthetic.

## Development Commands

```bash
# Install dependencies (using pnpm)
pnpm install

# Start development server (http://localhost:3000)
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Generate static site
pnpm generate
```

## Architecture & Structure

### App Directory Structure
- `app/app.vue` - Root application component with global SEO configuration
- `app/pages/index.vue` - Homepage with Bento grid layout showcasing profile, tech stack, and projects
- `app/layouts/default.vue` - Default layout with dark background, noise texture overlay, and ambient purple glow effect
- `app/components/Bento/` - Reusable Bento grid components:
  - `Item.vue` - Base card component with hover effects and glassmorphism
  - `Profile.vue` - Profile section with avatar, bio, and social links
  - `Location.vue` - Location display component

### Data Management
- `app/assets/data/projects.json` - Project data source (main data file)
- `projects-data.es.json` / `technologies-data.json` / `technologies-data.es.json` - Legacy data files at root level
- Projects are imported directly in components via `import projectsData from '~/assets/data/projects.json'`

### Internationalization (i18n)
- **Strategy**: `prefix_except_default` - English is default (no prefix), Spanish uses `/es` prefix
- **Locales**: English (`en-US`) and Spanish (`es-CL`)
- **Locale files**: `i18n/locales/en.json` and `i18n/locales/es.json`
- **Configuration**: In `nuxt.config.ts` under the `i18n` module

### Styling System
- **Tailwind CSS 4** integrated via Vite plugin (`@tailwindcss/vite`)
- **Global CSS**: `app/assets/css/main.css` defines CSS variables and noise texture
- **Color Palette**:
  - Background: `#0f0f11` (near black)
  - Card background: `#18181b`
  - Accent: `#a855f7` (purple) with pink gradients
- **Design Features**:
  - Glassmorphism with `backdrop-blur-md`
  - Noise texture overlay for visual depth
  - Animated marquee for tech stack logos
  - Hover effects with shadows and transforms
  - Gradient glows and spotlight effects

### Key Nuxt Modules
- `@nuxtjs/i18n` - Internationalization
- `@nuxt/image` - Image optimization (using Cloudinary for project images)
- `@nuxt/icon` - Icon system (using `logos:*`, `ph:*`, and `simple-icons:*` collections)
- `@nuxt/fonts` - Google Fonts integration (Manrope font family)
- `nuxt-seo-utils` - SEO utilities
- `@nuxt/eslint` - ESLint configuration

## Component Patterns

### Bento Grid Layout
The homepage uses a CSS Grid with dynamic column/row spans:
- Profile section: 3 columns × 2 rows
- Location: 1 column × 2 rows
- Tech stack marquee: 4 columns × 1 row
- Featured projects: Variable spans (first and last projects are 2 columns wide)

### Project Cards
- Linked via `NuxtLink` with `target="_blank"`
- Display: project image, name, description (line-clamped to 2 lines), and up to 3 technologies
- Hover effects: scale image, change colors, show arrow icon
- Images optimized via `NuxtImg` component

### Tech Stack Marquee
- Dual-layer infinite scroll animation
- Icons rendered with grayscale filter, color on hover
- Uses custom CSS animations: `@keyframes marquee` and `@keyframes marquee2`

## Important Conventions

1. **Image Optimization**: All project images are hosted on Cloudinary with optimized URLs (webp format, auto quality, size limits)
2. **TypeScript**: Used throughout with `.ts` and `.vue` files
3. **Component Auto-Import**: Nuxt auto-imports components from `app/components/` (use `BentoItem`, `BentoProfile`, etc. without explicit imports)
4. **SEO**: Global title template in `app.vue` appends " - Diego Alvarez" to page titles
5. **Responsive**: Mobile-first with `md:` breakpoint classes for desktop layouts
6. **Dark Mode Only**: No light mode toggle; design is optimized for dark theme

## Data Schema

### Project Object Structure
```json
{
  "name": "Project Name",
  "link": "https://example.com",
  "image": "https://cloudinary-url.webp",
  "technologies": ["tech1", "tech2"],
  "description": "Brief description"
}
```

## Package Manager
This project uses **pnpm** (see `pnpm-lock.yaml`). Use `pnpm` for all dependency management.
