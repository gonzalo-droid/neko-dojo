# Vercel, Supabase and Claude: automatic deployments step by step

This website, Nekodojo's, publishes itself: every time a change lands on the `main` branch on GitHub, Vercel builds it and puts it online within a couple of minutes. I set the whole thing up with Claude, without opening the Vercel dashboard. Here is how the pieces connect, what broke the first time, and how you can set up the same thing in your project.

## The pieces and what each one does

| Piece | What it is for |
| --- | --- |
| **GitHub** | Stores the code. It is the source of truth: whatever is on `main` is what gets published. |
| **Vercel** | Builds the site (Next.js) and serves it. It listens to GitHub and deploys on every change. |
| **Supabase** | Postgres database, authentication, storage and functions. It is the backend when the site needs to save data. |
| **Claude** | Writes the code, pushes it to GitHub and, through connectors, creates and checks projects on Vercel and Supabase. |

The key idea: **Claude does not deploy directly**. Claude pushes changes to GitHub and Vercel reacts. That way the flow works the same whether the change comes from Claude, from you on your computer or from a teammate.

## How automatic deployments work

When you connect a repository to Vercel, two things happen:

1. **Production**: every push to the production branch (`main`) creates a deployment that becomes the public version, for example `neko-dojo.vercel.app` or your domain.
2. **Previews**: every push to any other branch gets its own test URL. It is useful to review a change before it goes to `main`.

With Claude Code in the cloud, the flow looks like this:

1. You ask Claude for a change.
2. Claude works on a branch (for example `claude/...`), pushes it and Vercel creates a preview.
3. You review the preview. If you like it, it is merged into `main` (through a pull request or directly).
4. Vercel sees the change on `main` and publishes to production.

## Step by step: connecting the project to Vercel with Claude

On claude.ai you can turn on the **Vercel connector** (Settings → Connectors). With it, Claude can list your teams and projects, create projects, read build logs and check deployments.

What Claude did in our case:

1. **Found the account's Vercel team** and checked there was no existing project for the repo.
2. **Created the project** `neko-dojo` linked to `gonzalo-droid/neko-dojo`, with `main` as the production branch. Vercel detected Next.js on its own.
3. **Followed the build**, checking the deployment status until it finished.

If you prefer to do it by hand, it is the same on vercel.com: *Add New → Project → Import Git Repository*, pick the repo and hit *Deploy*.

## The first deployment failed (and what we learned)

The first build ended in an error. Claude read the build logs through the connector and found this:

```text
Module not found: Can't resolve '@vercel/turbopack-next/internal/font/google/font'
```

The problem was the Google fonts loaded with `next/font/google`: the Next.js 16 compiler (Turbopack) could not resolve them during the build. The fix was to **serve the fonts from the project itself** with `next/font/local`, using the `woff2` files from the `@fontsource` packages (free OFL license):

```ts
import localFont from "next/font/local";

export const spaceGrotesk = localFont({
  src: [
    { path: "./files/space-grotesk-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "./files/space-grotesk-latin-700-normal.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-space-grotesk",
  display: "swap",
});
```

Since the CSS variable stays the same, nothing else on the site changed. And the build no longer depends on downloading anything from Google, so it works the same on Vercel, on your computer or in an environment with no internet.

**Lessons:**

- **Build locally before pushing** (`npm run build`). If it fails on your machine, it will fail on Vercel.
- **Read the build logs**, not just the final message. The real error is usually a few lines above.
- **Fewer external dependencies in the build** = more predictable deployments.

## Deployment protection

Vercel creates new projects with *Deployment Protection* turned on: preview URLs ask you to log in to Vercel. It is handy to avoid showing half-finished work, but check that the production version opens in an incognito window. You change it in *Settings → Deployment Protection*. If you connect your own domain, that domain is public.

## Where Supabase fits in

A site like this starts out static, but as soon as you want to save something (a waitlist, a contact form, users) you need a backend. Supabase gives you Postgres, authentication, storage and functions without running servers.

There are two ways to connect it to Vercel:

1. **The Supabase integration on the Vercel Marketplace.** It links a Supabase project to the Vercel one and copies the environment variables you need (the project URL and the keys) into Vercel, so you do not copy them by hand.
2. **Variables by hand.** You copy the URL and the public key from the Supabase dashboard (*Project Settings → API*) to *Settings → Environment Variables* on Vercel.

Rules worth following:

- The **public key** (anon or publishable) can go to the browser, but only if your tables have **Row Level Security** turned on with clear policies.
- The **service key** (service role) only goes on the server. Never in a `NEXT_PUBLIC_` variable or in the code.
- After changing variables on Vercel, **deploy again**: existing deployments do not pick them up.

With the **Supabase connector** in Claude you can also list tables, apply migrations, read logs and the project's security advisories. Always ask it to review the schema before changing it.

On Nekodojo, the forms are still in demo mode. The code is already set up to send them to a webhook (`FORMS_PROVIDER=webhook` and `FORMS_WEBHOOK_URL`), and a **Supabase Edge Function** is a good option to receive them and save them to a table.

## How to set up the same thing in your project

1. Push your project to GitHub.
2. On claude.ai, turn on the **GitHub**, **Vercel** and, if you will use it, **Supabase** connectors.
3. Ask Claude: *"Create the project on Vercel linked to my repo and deploy `main`"*.
4. If the build fails, ask it to read the logs and fix it. Build locally before pushing again.
5. Check deployment protection and open the site in incognito.
6. When you need data, create the Supabase project, connect the variables on Vercel and deploy again.
7. From then on, you just work on branches and merge into `main`: the rest is automatic.
