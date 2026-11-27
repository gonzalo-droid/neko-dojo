# Reels and carousels with Claude: two skills and ElevenLabs voices

I run several brands at once: Nekodojo (this app studio), Cobaya Tech, Agrosalas Perú and the Neko Manga CIX store. Making content for all of them by hand does not scale, so I built a workflow with Claude to produce animated reels and Instagram carousels with each brand's identity. Here I explain how it works, which tools it uses and what we learned along the way.

## The idea: turn the process into two skills

Instead of explaining to Claude every time how to make a reel, I saved the process as two skills (if you do not know what a skill is, I explain it in [this article](/en/blog/skills-claude)):

| Skill | What it produces |
| --- | --- |
| **reels-motion** | Vertical reels of about 30 to 40 seconds, 6 scenes, with animations, sound effects and voiceover. It delivers the `mp4`, the cover and the post text. |
| **carruseles-ig** | Carousels of 7 to 10 slides at 1080×1350 (4:5), ready to upload, with the post text. |

Both share the brand profiles: one file per brand with colors, fonts, logo, tone, call to action and hashtags. If I change a brand's color, I change it in that file and it applies to reels and carousels.

## How a reel is made

### 1. Brief in a single message

I tell Claude something like *"make a reel for Nekodojo about why you need an app"*. Claude reads the brand profile and proposes the hook, the angle, the data it will look up and the 6-scene structure. It produces nothing until I say "go", because changing a storyboard is cheap and rendering again is not.

### 2. Verified data

Every figure comes from a real source, ideally two, with its year, and the source shows on screen. The skill forbids made-up figures, testimonials or results. If a figure is old, it looks for a more defensible one.

### 3. Animation with Remotion

The reels are made with Remotion, which lets you create video by writing React components, on top of the Motion Architect studio. The skill includes a kit of components (big title, animated figure, comparison bar, source, brand sign-off, CTA card) and a reel template. Claude copies the template, writes the scenes and checks that the code compiles.

Some design rules that work:

- One idea per scene.
- Open with an emoji and a big title.
- Every scene with a figure includes its source.
- Close with the message, the brand sign-off and the call to action.

### 4. Voiceover with ElevenLabs

For the voice we use the ElevenLabs API. The voice script detects the account's plan and picks on its own:

- On a paid plan it uses the brand's preferred voice (a Latin American voice from the library).
- On the free plan it uses an alternative voice with a neutral accent and warns that the free license does not allow commercial use.
- With no access, the reel comes out without a voice and Claude delivers the script with each scene's timing so you can add a voice in CapCut.

A reel uses about 400 to 500 voice characters; the free plan included 10,000 a month when we tried it.

To make the script sound natural:

- One sentence per scene, saying the same as the screen without reading it word for word.
- Marked pauses: `[0.5]` between sentences and `[0.2]` to `[0.3]` after commas. Without pauses the voice sounds rushed.
- Numbers in words ("seventy-four out of a hundred") and figures exactly the same as on screen.

Then a script fits each scene's length to its sentence plus a ~0.8-second breath, so the pace stays even.

### 5. Render and quality check

Claude renders the video and runs an automatic check that produces a sheet with frames from each scene and measures the audio. Then it looks at the sheet and goes through a checklist:

- 1080×1920, 30 fps, between 15 and 40 seconds.
- Voice loudness around −16 LUFS.
- Nothing touching the edges or in the bottom 20% (where Instagram puts its buttons).
- Enough contrast, and no title ending with a single word on its last line.

### 6. Delivery

Claude sends me the `mp4`, the cover and the post text, with the keywords in Unicode bold (so they survive pasting into Instagram) and at most 5 hashtags. It also flags anything to review: a placeholder logo, the voice license or a figure to confirm.

## How a carousel is made

Carousels follow the same logic, but they are generated as images:

1. Brief: Claude proposes 2 to 4 ideas with their slide-by-slide structure and recommends one. It keeps an ideas bank per brand to avoid repeating topics.
2. Content in a `slides.json` file: a cover with a concrete promise and "Swipe →", one idea per slide, titles of 8 words max and bodies of 25 words max.
3. Generation with a script that draws the whole carousel as a single panorama and then cuts it. That way a street, an arrow or the mascot crosses from one slide to the next and invites people to swipe.
4. Review of the contact sheet and the slides with the most text.
5. Delivery of the PNGs in order and the post text. Upload them in order and choose 4:5 when posting so Instagram does not crop them.

Tricks that work: ending a slide with a question answered on the next one, a two-option quiz ("comment A or B") on the second-to-last slide, and a summary to save at the end.

## What we learned

- Storyboard first, render later. Approving the structure first saves a lot of time.
- Check any math done by hand. Once we wrote "1 in every 6 waking hours" for 3.6 hours a day, and it was wrong. It became "more than 25 hours a week" (3.6 × 7).
- If the audio measures about −31 LUFS, the voice is missing and only the effects are playing.
- Do not render single frames in parallel, because the process hangs. Render the video and pull frames with ffmpeg instead.
- Keys never go in the chat. The ElevenLabs key is stored as an environment secret, and Claude uses it without seeing it.
- Every mistake gets written into the skill so it does not happen again.

## How to start with something similar

You do not need to build everything at once:

1. Write your brand profile: colors, fonts, logo, tone, CTA and hashtags.
2. Make a first reel or carousel with Claude, step by step.
3. When you like the result, ask it to save the process as a skill.
4. Every time something breaks or you improve something, update the skill.
