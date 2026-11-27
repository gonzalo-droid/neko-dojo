# How I use Claude Code in my Android and iOS apps: phase 1

This is the first part of a series about how I'm learning to use AI in my projects. It covers how I work with Claude Code today, what works for me and what doesn't yet. When something important changes in the way I work, I'll write phase 2.

## My apps today

I have four apps published on Android and iOS: [AnimeQuote](/en/apps/animequote), [MTCQuiz](/en/apps/mtcquiz), [ApruebaSUCAMEC](/en/apps/apruebasucamec) and [Cazadores Perú](/en/apps/peruxhunter). Four more are in development, and one of them I can't talk about yet. Almost all of them are native or built with [Kotlin Multiplatform](/en/blog/kotlin-multiplatform).

With that many projects, I kept repeating the same explanations in each one: how I name commits, which architecture I use, what a store listing needs. Most of what follows comes from that.

## Claude skills for what repeats

When a task repeats, I turn it into a skill (I explained what a skill is in [this post](/en/blog/skills-claude)). Some are global and work in every project:

- `commit-format` writes commits following Conventional Commits.
- `changelog-update` updates the CHANGELOG before a merge, in the format the file already uses.
- `store-screenshots` builds the App Store and Google Play screenshots from the simulator or emulator.
- `add-admob` and `admob-compliance` check the ads: test IDs in Debug, ATT on iOS and Google's consent form.
- `ux-audit` reviews every new screen with screenshots before I call it done.

Others live inside a single repository, because they depend on that code. MTCQuiz, for example, has a skill just for extracting the driving test questions. I explain how I decide where each one goes in [this other post](/en/blog/tipos-de-skills-claude).

## The same architecture on Android, iOS and KMP

So that every app follows the same architecture, I keep it written down in a skill. `base-kmp-audit` holds 166 rules with IDs: ARQ- for architecture, COD- for code, TST- for tests, PUB- for publishing, among others. I use it to start a new app and to audit an existing one before release. If an audit finds something the base didn't cover, I add it as a new rule.

To bring features from Android to iOS I have an agent, `android-to-ios-sync`. It reads the Android change and implements it again on iOS with native components, without translating the code line by line. It delivers the feature with its tests, the changelog entry and a run in the simulator.

Each repository also has its own `CLAUDE.md` with the project's fixed rules. The one for this website, for example, says that no testimonials or figures are made up and that all visible text exists in Spanish and English.

## Several Claude Code sessions in parallel

I now work with several Claude Code sessions at once, each on a different project or feature. One example from this week: while one session built everything SubTrack needs on this website before launch (its page, the legal pages, support, the account deletion page Google Play asks for and the download link the app shares), another one was rewriting the blog posts. To keep them from stepping on each other, each session works on its own branch.

## From developer to reviewer

My job now is mostly reviewing. Claude writes the code, opens the PR and tells me what it did and what it couldn't check. I read it, ask for changes or tell it to ship. I often do this from my phone with Remote Control, which lets me follow and reply to a session running on my computer.

## Reels and carousels with the same method

The same goes for my brands' content. With the `reels-motion` and `carruseles-ig` skills I make Instagram reels and carousels, and `neko-news` puts together the shop's weekly news. I described that workflow in [this post](/en/blog/reels-carruseles-claude).

## What I still hold on to

I still hold Claude's hand a lot, mostly with corrections. I read the PR, find something that didn't turn out the way I wanted and send it back. The goal for phase 2 is to have less to correct: whatever I correct once should end up written in a skill or a `CLAUDE.md` rule, so the PR arrives closer to what I would have done.
