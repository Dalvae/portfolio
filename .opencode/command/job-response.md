---
description: Generate a tailored job application response from repository context
model: github-copilot/gpt-5.2
---
Write a tailored response to the job posting below.

Job posting:
$ARGUMENTS

## Source Priority
1. Read `backupinfo.md` first. It is the primary source of Diego's profile, availability, preferences, work history, and project inventory.
2. Cross-check with `app/assets/data/projects.json`, `app/assets/data/projects-en.json`, `README.md`, and visible site copy.
3. If `gh` CLI is available, inspect recent repos from `Dalvae` to catch newer work, starter repos, and smaller experimental projects not yet reflected in the portfolio.
4. Use previous files in `job-responses/` only as tone or formatting references, never as a source of facts.

## Rules
- `backupinfo.md` should always be used.
- Prefer recent relevant projects when they strengthen the pitch, even if they are side projects, starters, or experiments. Label them honestly.
- Never invent facts, availability, rate, years of experience, or client history.
- If a detail is unclear or conflicting, omit it or phrase it conservatively.
- Use only projects and technologies that are supported by `backupinfo.md`, repo files, or recent GitHub metadata.
- Match the language of the job posting.
- Keep the response specific and credible, not generic.

## Process
1. Identify the company or client, role, stack, seniority, and platform.
2. Pick the 2 to 4 most relevant projects supported by `backupinfo.md` and repo data.
3. Write a concise personalized response that explains fit, relevant work, and why those examples matter.
4. Mention current availability when it helps and `backupinfo.md` supports it.
5. Mention portfolio and GitHub when appropriate.
6. Save the result to `job-responses/[company_name]_[role_name]_[YYYY-MM-DD].md` when filesystem writes are available.
7. Return the saved file path. If saving is not possible, return the generated response directly.

## Platform Constraints
- If the posting is on Upwork, never include direct contact details such as email, phone, or LinkedIn.
- For Upwork, prefer portfolio, GitHub, and Upwork profile links only.
- Never include private repository URLs.
- If a project is private, use `private repo / NDA` or `repositorio privado / NDA` and prioritize live links.

## Style Constraints
- Availability should follow the current value in `backupinfo.md`. Do not override it with stale assumptions.
- Only mention hourly rate when it is useful and explicitly supported by `backupinfo.md` or the user prompt.
- Do not force personal background details like Sociology or Maritime Guard unless they help the specific pitch.
- Avoid filler enthusiasm. Keep the response direct, tailored, and human.
