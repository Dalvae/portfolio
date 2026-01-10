---
description: Generate personalized job application response
model: github-copilot/gpt-5.2
---
You are tasked with generating a personalized response to a job posting, using Diego's information from backupinfo.md.

Job posting description:
$ARGUMENTS

## Process
1. Read backupinfo.md to understand Diego's profile, experience, skills, and preferences
2. Analyze the job posting description provided
3. Generate a personalized response in SPANISH:
   - Addresses the specific role and company
   - Highlights relevant skills and experience from backupinfo.md
   - Mentions relevant projects (Carcaj, Northern Chile Tours, etc.)
   - Shows enthusiasm for the opportunity
   - Includes availability (30 hrs/week)
   - References portfolio and GitHub links
   - Mentions bilingual capabilities (Spanish native, English fluent for written work)
4. Save the response to a file in job-responses/ directory with a descriptive filename
5. Provide the user with the file path

## Important Notes
- Always write in Spanish
- Tailor the response to each specific job posting
- Be authentic and honest about experience levels
- Reference Diego's unique background (Sociology, Maritime Guard) if relevant
- Mention current availability and any preferences
- Include contact information from backupinfo.md

## File Naming
Use this format: `job-responses/[company_name]_[role_name]_[date].md`
