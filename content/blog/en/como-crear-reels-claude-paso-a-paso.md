# How to make reels with Claude step by step and what it costs

This tutorial is for you if you have a business or a brand and want to make reels and carousels for Instagram **without knowing how to code or edit video**. By the end you will know what you need, what to ask Claude at each step and **how much you will pay per month**.

I use it for four businesses: Nekodojo, Cobaya Tech, Agrosalas Perú and the Neko Manga CIX store. *This is how I built it, by talking with Claude.* I covered the technical details of my workflow in [the previous post](/en/blog/reels-carruseles-claude). The prices in this post are the ones shown on the official [Claude](https://claude.com/pricing) and [ElevenLabs](https://elevenlabs.io/pricing) pages on November 27, 2026, in US dollars.

## What Claude is and what you will get

Claude is an artificial intelligence assistant from the company Anthropic. You write to it naturally, like you would to a person and without any special format, and it understands you. **Just give it a goal** and it does the work: it finds the data, writes the script, animates the video and builds the images.

With this guide you can produce:

- A 30 to 40 second reel with animations, sound effects and music.
- The reel's cover and the text to post with it, hashtags included.
- Instagram carousels ready to upload.
- Optional: a voiceover.

This workflow produced two reels and a carousel for the Neko Manga CIX store: "Myth or reality?" about manga, "How to read manga" and "Shonen, shojo, seinen or josei?".

## What you need

1. A Mac (macOS 11 or newer). The tool that animates the videos also runs on Linux, but **not on Windows**.
2. A Claude account on a **paid plan**. The free plan does not include Claude Code, the part that makes the videos.
3. Your logo, your colors and an idea of how you talk to your customers.
4. Optional: an ElevenLabs account if you want a voice.

## Step 1: install Claude and open the Code tab

1. Download the Claude desktop app by following the [official instructions](https://code.claude.com/docs/en/desktop-quickstart). Pick the Mac version.
2. Sign in with your account.
3. In the sidebar, click Code.
4. Choose or create a folder on your computer to keep your videos, for example one called "content", and copy your logo into it.

## Step 2: install Motion Architect

[Motion Architect](https://github.com/Hainrixz/motion-architect) is a **free, open source** tool created by Enrique Rocha. It turns Claude into a motion designer: you describe the video in words and it designs it, animates it with Remotion and renders it on your computer, without uploading anything to the internet.

I use it because it already solves the hard part of a reel:

- It shows you the storyboard (hook, development and close, with their timing) and animates nothing until you approve it.
- It takes care of the motion: smooth entrances, rhythm and bounces that do not look made with AI.
- It respects the safe zones of Reels and TikTok, so the app's buttons do not cover your text.
- It comes with a sound effects library that syncs with the animation.
- It understands reference videos: you give it a reel you like and it picks up its rhythm, cuts and palette.

On top of that I built my own skill, `reels-motion`, which adds my four brands, fact checking and the voice. *It is private to my account, but in step 3 you build yours.*

To install it, ask Claude in the Code tab:

> Install Motion Architect from github.com/Hainrixz/motion-architect and tell me if anything is missing.

If you would rather do it yourself, open Terminal and paste these lines:

```bash
git clone https://github.com/Hainrixz/motion-architect.git
cd motion-architect
./install.sh
```

The installer checks what it needs (Node.js, ffmpeg, yt-dlp and Python 3) and on a Mac offers to install whatever is missing with Homebrew. When it finishes, quit and reopen Claude.

## Step 3: tell it what your brand is like

Write something like this, with your own details:

> I have a manga store in Chiclayo. My colors are black, white and orange, my logo is in this folder and I talk to my customers in a friendly way. I want to make reels for Instagram. Save this information as my brand profile.

Claude saves that profile in a skill, which is an instruction file it reads whenever it needs it. That way **you do not repeat your colors or your tone** in every reel. I explained how skills work in [this post](/en/blog/skills-claude).

## Step 4: ask for your first reel

> Make me a 30 second reel for my store about how to read manga.

Claude replies with a proposal: the hook, the data it will look up and the 6 scenes. **It produces nothing until you say "go"**. This is the moment to change the topic or the tone, because changing a proposal is quick and redoing the video is not.

In my workflow, Claude finds the data in real sources and shows them on screen. Ask for the same, and still *read the numbers before you publish: you are the one publishing*.

## Step 5: wait for the video and ask for changes

Claude builds the video, checks it on its own and hands you the video, the cover and the text to post. It takes a few minutes.

To change something, **say it in your own words**: "the title in scene 3 is too long" or "change the orange to a darker shade".

## Step 6: make a carousel

> Make me an 8 slide carousel with 4 myths about manga.

Claude hands you the images in order. Upload them to Instagram in that order and pick the **4:5 format** so it does not crop them.

## Step 7 (optional): add a voice

You have three paths, from simplest to most technical.

1. **Your own voice**, with no extra cost. Claude gives you the script and the second where each scene starts. You record it on your phone and add the audio to the video with an editing app like CapCut.
2. **A voice generated with ElevenLabs**. Create your account at elevenlabs.io, choose a plan (Free to test, Starter to publish) and create an API key, which is a special password that lets Claude use your account. Then tell Claude: "I want to connect ElevenLabs, guide me step by step". **Never paste the key into the chat**: Claude explains where to store it.
3. **Your cloned voice**. With the Starter plan, ElevenLabs can copy your voice from a recording. The variant of recording the script and sending the audio files to Claude so it links them to each scene *is not built yet, and it is the one I want to try*.

## What it costs

| What you want to do | What you pay | Per month |
| --- | --- | --- |
| Start without a voice, or recording your own | Claude Pro | $20 |
| Reels with a generated voice to publish | Claude Pro plus ElevenLabs Starter | $26 |
| What I use | Claude Max plus ElevenLabs Starter | $106 |

**Start with Pro.** If you run out of usage before the end of the month, move up to Max, which gives more usage. I use Max because I make many reels and carousels, and I also code my apps with Claude.

### Claude plans

| Plan | Price | Includes Claude Code |
| --- | --- | --- |
| Free | $0 | No |
| Pro | $20 a month ($17 a month if you pay $200 a year) | Yes |
| Max | $100 a month | Yes |
| Ultra | $200 a month | Yes |

### ElevenLabs plans

| Plan | Price | Credits per month | What it adds |
| --- | --- | --- | --- |
| Free | $0 | 10 thousand | Good for testing. No commercial license |
| Starter | $6 a month ($5 if you pay $60 a year) | 30 thousand | Commercial license and quick cloning of your voice |
| Creator | $22 a month | 121 thousand | Professional voice cloning |
| Pro | $99 a month | 600 thousand | More credits |

One reel uses 400 to 500 characters of voice. With the model I use, one credit equals one character, so the 30 thousand credits in Starter cover **more than 60 reels a month**. *Until December 1 there is a Black Friday offer and the first month of Starter costs $1.*

### What costs nothing

Motion Architect is free and open source (MIT license). Remotion, the animation program it uses under the hood, is free for individuals and for teams of up to 3 people. A larger company needs a [paid license](https://www.remotion.dev/docs/license/faq). The music is free too, because Claude composes it.

## Music with no license

Claude composed the music for the two Neko Manga reels. It synthesized it with code at 120 beats per minute, so every scene change lands on a strong beat. Since it uses no samples and no one else's songs, there is **no license to pay and no copyright claims**. It is not inside my skill yet, so today I ask for it in the conversation.

## Tips for getting started

- **Start with one brand.**
- Make your first reel about a topic you already know, so you quickly spot a wrong fact.
- Ask for changes in your own words and repeat them as often as needed.
- When you like the result, ask Claude to save the process as a skill so you can repeat it.
