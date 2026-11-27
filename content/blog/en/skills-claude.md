# What a Claude skill is, how to create one and which ones I use

When you repeat the same task with Claude (making a reel, reviewing a text, preparing the week's news), you end up explaining the same thing over and over. A skill solves that: it is a manual Claude reads only when it needs it.

## What a skill is

A skill is a folder with a main file, `SKILL.md`, and optionally scripts, templates and reference documents:

```text
reels-motion/
├── SKILL.md          ← main instructions
├── assets/           ← templates, logos, brand profiles
├── references/       ← guides Claude reads when needed
└── scripts/          ← code Claude runs (generate voice, check quality…)
```

`SKILL.md` starts with a header with two fields:

```markdown
---
name: carruseles-ig
description: "Designs and generates Instagram carousels ready to upload…
  Use it EVERY time I ask for a carousel, several swipeable posts or Instagram slides."
---

# Instagram carousels
(step-by-step instructions)
```

## How Claude uses it

Claude does not read every skill all the time:

1. At the start, it only sees each skill's name and description.
2. When your request matches a description, it opens that `SKILL.md` and follows its instructions.
3. It opens files in `references/` or `scripts/` only when a step needs them.

That is why you can have many skills without overloading Claude. It is also why the description needs the most care: if it does not say when to use the skill, Claude will not use it.

## How it differs from a prompt or a project

A prompt works for one conversation. A project's instructions, or a `CLAUDE.md`, always apply inside that project. A skill turns on by itself in any conversation when the task matches, and it can bring its own scripts and files.

## How to create a skill

### Option 1: with the `skill-creator` skill

Claude has a skill for creating skills, and it works like this:

1. It asks what the skill should do and how.
2. It writes a first draft.
3. It prepares a few test cases and runs them with the skill.
4. You review the results together.
5. It rewrites the skill based on what failed, and repeats.

Just ask: *"Create a skill to make Instagram carousels for my brands"*.

### Option 2: from something that already worked

This is the way I use most. First I do the task with Claude step by step, correcting whatever needs it. When I like the result, I ask: *"Save this whole process as a skill"*. That way the skill copies a workflow that has worked at least once.

### Where they live

Skills are saved in your claude.ai account, in the skills section of the settings. From there you can turn them on or off, or upload a new one. Your account's skills are also available in Claude Code sessions.

## Tips for writing a good skill

- In the description, write the phrases you would use to ask for it: *"Use it EVERY time I ask for reels, short videos or 'another reel like the previous ones'"*.
- At the top, add a table of which file is where: profiles, templates, guides and scripts.
- Write the workflow as numbered steps and mark where Claude must wait for your approval.
- Write the non-negotiable rules as they are, for example "do not make up figures or testimonials".
- Keep a section of mistakes. Every time something breaks, you write it down there with the fix.
- Put the data (colors, logos, contacts) in separate files so you can change it without touching the instructions.
- Never store keys inside the skill. They go in as environment secrets.

## The skills I use

### Built for my brands

| Skill | What for |
| --- | --- |
| `reels-motion` | Animated reels for Nekodojo, Cobaya Tech, Agrosalas and Neko Manga CIX, with ElevenLabs voices. |
| `carruseles-ig` | 1080×1350 Instagram carousels with each brand's identity. |
| `neko-news` | Weekly anime and manga news for the store: search, scoring, Canva carousel, captions and logging in Notion. |
| `agrosalas-news` | Weekly agri-export content for Agrosalas Perú. |
| `animequote-frases` | Finds and checks anime quotes for AnimeQuote against two sources. |
| `morning` | My morning brief. |

### General purpose

- Documents: `docx` (Word), `pdf`, `pptx` (PowerPoint), `xlsx` (Excel), `google-workspace` and `docs`.
- Research: `deep-research`, for reports drawing on many sources.
- Browser and computer: `chrome-browser`, `built-in-browser` and `computer-use`.
- Utilities: `skill-creator` (create and improve skills) and `import-memory`.

## Where to start

Think of something you ask Claude for every week. Do it once carefully, correcting every detail, and at the end ask it to save it as a skill. Next time you will just say *"the usual, but about X"*.
