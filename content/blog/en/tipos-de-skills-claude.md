# Local, project and profile skills: where to keep each one

In the [previous post](/en/blog/skills-claude) I explained what a skill is and how to create one. The next question was: *where do I put it?* A skill is the same folder with its `SKILL.md` in every case, but where you put it changes who sees it and in which conversations it kicks in. There are three places: your computer, the project and your Claude profile.

## Quick summary

| Type | Where it lives | Who uses it |
| --- | --- | --- |
| **Local** | `~/.claude/skills/` on your computer | You, in any project on that computer |
| **Project** | `.claude/skills/` inside the repository | Anyone working in that repository |
| **Profile** | Your claude.ai account | You, on claude.ai, the desktop app and Claude Code |

## 1. Local skills

They live in Claude Code's personal folder, on your computer:

```text
~/.claude/skills/
├── commit-format/SKILL.md
├── changelog-update/SKILL.md
├── seo-audit/SKILL.md
└── ux-audit/SKILL.md
```

Claude Code loads them in **all your projects**, whatever folder you open the session in. They are ideal for the way you work: how you write commits, how you review a screen, which steps you follow before opening a PR.

**Use them when** the skill is yours and helps you across many projects. For example, `commit-format` works the same for me in an Android app, an iOS app and this website.

**Keep in mind that** they only exist on that computer. If you switch machines you have to copy the folder, nobody else sees them, and they do not reach Cowork or cloud sessions either.

## 2. Project skills

They live inside the repository, next to the code:

```text
business_manager/
├── .claude/
│   └── skills/
│       ├── efactura-sunat/SKILL.md
│       ├── api-testing/SKILL.md
│       └── laravel-upgrade/SKILL.md
├── app/
└── composer.json
```

They only load when you work **inside that project**. Since the `.claude/` folder is pushed to Git, anyone who clones the repository gets the same skills.

**Use them when** the skill depends on that project's code: its architecture, its commands, its business rules. In my projects I have, for example:

- `efactura-sunat` in a management system, with the rules for Peruvian electronic invoicing.
- `mtc-question-extractor` in MTCQuiz, to extract the driving test questions.
- `epub-shorts` in a project that makes short videos from books.

None of them make sense outside their repository, so there is no reason for them to show up in my other projects.

In a monorepo you can also put skills inside a subfolder (`apps/web/.claude/skills/`). Claude Code loads them when it starts working with files in that subfolder.

**Keep in mind that** whatever you push to the repository is visible to everyone with access. Never store keys or private data inside the skill.

## 3. Profile skills

These are the ones you upload to your **claude.ai account**, from the skills section in settings. They do not depend on a computer or a repository: they go with you wherever you sign in.

I use them in the claude.ai chat and the desktop app, and they also load in Claude Code: the skills you have enabled in your account are downloaded to `~/.claude/skills/synced/`. That is where my content skills live:

- `reels-motion` for my brands' reels.
- `carruseles-ig` for Instagram carousels.
- `neko-news` and `agrosalas-news` for the weekly content of the shop and Agrosalas.

**Use them when** the skill does not depend on any code: writing, research, design, preparing content. It is the natural place for what you do from the chat rather than from a project.

**Keep in mind that:**

- They are managed from the web. The sync with Claude Code is one-way: if you edit the copy in `synced/`, the next sync overwrites it. To change one, you upload a new version.
- They do not sync if you use Claude Code with an API key instead of your account.
- They are private: nobody else sees them, unless you are on a Team or Enterprise plan and choose to share them with colleagues.

## What if two skills have the same name?

If you have a local skill and a project skill with the same name, Claude Code keeps the **local** one (and if your company defines skills, those win over both). To avoid surprises, give them different names: `changelog-update` (local, generic) and `updating-changelog` (the version tailored to MTCQuiz) live side by side without trouble because their names differ.

There is a fourth source worth knowing: **plugins**. A plugin can bundle several skills, and they show up with the plugin's name in front (`superpowers:brainstorming`), so they never clash with yours.

## How I decide where each one goes

I ask myself three questions, in this order:

1. **Does it depend on a project's code?** It goes in the project (`.claude/skills/`).
2. **Do I use it from the chat, without code, or on several devices?** It goes in my claude.ai profile.
3. **Is it my way of working in any project?** It goes local (`~/.claude/skills/`).

And a rule of thumb: if a local skill starts filling up with "if it's project X, do this", that part should probably be a project skill.

## Where to start

Whatever its type, in Claude Code you can call any skill directly with `/skill-name`, without waiting for Claude to pick it.

Open `~/.claude/skills/` and the `.claude/skills/` folder of your main project, and look at what you have. Often a skill is in the wrong place: a single-project rule saved as local, or a content skill tied to a repository. Moving it is as simple as moving the folder.
