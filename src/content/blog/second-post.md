---
title: Building Things Fast with Astro
description: Notes on why Astro + islands + Tailwind have been my go-to stack lately.
date: 2025-08-05
tags: [astro, tailwind, islands, notes]
author: Diego Alvarez
draft: false
---

Astro makes it ridiculously simple to ship fast sites with little client-side JS by default.
You hydrate only what you need using islands, and still keep the developer experience enjoyable.

Key takeaways I keep using:
- Keep most pages static, hydrate only interactive components.
- Co-locate content in `src/content` with collections for safety and validation.
- Tailwind + design tokens via CSS variables keeps themes consistent.

Expect a short write-up soon on how I structure pages and compose React islands in this portfolio.
