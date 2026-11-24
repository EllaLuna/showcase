# Tiny Purple Cat — Website Build Spec

Handoff spec for Claude Code. Build a static GitHub Pages site that showcases two upcoming games by the indie studio **Tiny Purple Cat**. Everything below has been agreed with the studio. Where something is unknown, leave the marked placeholder; **do not invent content, links, names or game facts.**

---

## 0. Before you start (required)

1. **Ask the user for the path to their asset folder.** It will contain screenshots, videos and other art for both games. Do not start building pages until you have it.
2. Inventory the folder and map each file to a game (A Mind Apart or IncreCat Café). If a file's game is unclear, ask.
3. Expected contents (any that are missing become placeholders, see §9):
   - `Logo.png`: studio logo (pixel-art "P" made of night sky with cream stars and a small purple cat sitting on it; transparent background)
   - `Youtube_Tumbnail.png`: A Mind Apart key art (1280×720), used as the trailer poster and social image
   - A Mind Apart screenshots and any gameplay clips
   - IncreCat Café screenshots and videos (may be few or none; the game is early in development)
   - Fonts: `cmunssdc.ttf` (CMU Sans Serif Demi Condensed) and `Tinos-Regular.ttf`. If they are not in the folder, ask the user for them.
4. Ask the user to write or approve alt text for screenshots. Draft it from what you see in each image, then show the drafts for review.

**Do not use** `Pixeltype.ttf` or `GranaPadano.ttf`, even if present.

---

## 1. Goal and audience

- **Audience:** players and fans who just heard of one of the games. They want to see it, get excited, and find the store button fast. Press, publishers and hires are not the target.
- **Every page pushes one action:** wishlist on Steam, or for IncreCat Café (no Steam page yet) join the Discord.
- **Feel:** distinctive and handmade, not a generic dark game-studio template. The studio shell is light and cozy (cream plus a pixel night sky). Each game page takes on its own game's world.

---

## 2. Tech choice

**Jekyll, built natively by GitHub Pages.** No custom plugins, no build step, no backend.

Why Jekyll:
- Both game pages share one layout, driven by `_data/games.yml`.
- The header, footer and buttons are written once as includes.
- Updating a store link means editing one line of data. Adding a third game means one new data entry plus a one-line page file.

Details:
- Repo: `EllaLuna.github.io` (a GitHub user site). URL: `https://ellaluna.github.io`, with `baseurl: ""`.
- Only plugins on the GitHub Pages whitelist; `jekyll-seo-tag` and `jekyll-sitemap` are fine.
- Add a `Gemfile` with the `github-pages` gem for local preview (`bundle exec jekyll serve`).
- Vanilla JS only, no frameworks or libraries. Keep JS small and progressive: the site must be usable with JS off (the trailer falls back to a link and the lightbox to plain image links).
- Self-host all fonts. Make no requests to Google or other third parties on page load. The YouTube trailer loads only after a click.
- In the README, tell the user to enable Pages in the repo settings (deploy from the `main` branch, root). You cannot do this for them.

---

## 3. File and folder structure

```
EllaLuna.github.io/
├── _config.yml               # site title, description, url, social links
├── _data/
│   └── games.yml             # all per-game content and links (see §4)
├── _includes/
│   ├── head.html             # meta, OG/Twitter tags, fonts preload, favicon
│   ├── header.html           # night-sky header
│   ├── footer.html           # night-sky footer
│   ├── store-buttons.html    # primary/secondary CTA logic (see §6.3)
│   ├── trailer.html          # click-to-load YouTube
│   ├── gallery.html          # screenshots + clips, lightbox
│   ├── hooks.html            # pitch + 3 feature hooks
│   ├── content-note.html     # expandable content note (A Mind Apart only)
│   ├── cta-band.html         # final call-to-action band
│   ├── mobile-cta-bar.html   # sticky bottom bar on phones
│   ├── placeholder.html      # styled "coming soon" block
│   ├── pixel-stars.html      # decorative star layer for night bands
│   └── icons/                # inline SVG: steam, discord, instagram, itch, play
├── _layouts/
│   ├── default.html          # shell: head, header, main, footer
│   └── game.html             # game page template (sections in §5.2)
├── assets/
│   ├── css/
│   │   ├── main.css          # tokens, reset, shell, components
│   │   ├── theme-ama.css     # A Mind Apart theme
│   │   └── theme-increcat.css
│   ├── js/
│   │   └── main.js           # trailer, lightbox, mobile CTA bar
│   ├── fonts/                # .woff2 files + OFL/Apache license texts
│   └── img/
│       ├── brand/            # logo, cat sprite, favicons, OG image
│       └── games/
│           ├── a-mind-apart/     # key-art, screenshots/, clips/
│           └── increcat-cafe/    # screenshots/, clips/
├── index.html                # homepage
├── a-mind-apart/index.html   # front matter: layout: game, game: a-mind-apart
├── increcat-cafe/index.html  # front matter: layout: game, game: increcat-cafe
├── 404.html
├── Gemfile
└── README.md                 # how to update links, add media, add a game
```

---

## 4. Data model

### `_config.yml` (site-wide)
```yaml
title: Tiny Purple Cat
description: Indie games about heartfelt stories, cozy chaos and cats.
url: https://ellaluna.github.io
baseurl: ""
discord_url: https://discord.gg/2tQvcFPaSf
instagram_url: https://www.instagram.com/tinypurplecatstudio/
```

### `_data/games.yml`
One entry per game. Optional fields drive what shows (see §6.3 for the button logic).

```yaml
- slug: a-mind-apart
  title: A Mind Apart
  theme: ama
  status: upcoming
  genre: Narrative puzzle adventure
  pitch: "..."            # §8
  hooks: [...]            # §8, each {title, text}
  steam_url: https://store.steampowered.com/app/3713290/A_Mind_Apart/
  itch_url:               # empty: button hidden
  trailer_youtube_id: wmI7o-bNMDo
  poster: /assets/img/games/a-mind-apart/key-art.webp
  screenshots: [...]      # each {file, alt}
  clips: [...]            # each {file, poster, alt}; optional
  content_note: true
  credits: "..."          # §8

- slug: increcat-cafe
  title: IncreCat Café
  theme: increcat
  status: early-development
  genre: Incremental cat-café management game
  pitch: "..."
  hooks: [...]
  steam_url:              # empty: Discord becomes the primary CTA
  itch_url:
  trailer_youtube_id:     # empty: placeholder shown
  poster:                 # empty: placeholder shown
  screenshots: []
  clips: []
  content_note: false
  credits:                # intentionally empty; the co-creator does not want to be named
```

The README must explain: "To turn on Steam wishlisting for IncreCat Café, paste its Steam URL into `steam_url`." Nothing else should need to change.

---

## 5. Pages (in order of sections)

### 5.1 Homepage `/`
1. **Header** (§6.1).
2. **The two doors.** Two full-height panels, side by side on desktop (≥ 768px) and stacked on mobile. Each door shows:
   - The game's art as background: key art for A Mind Apart, and for IncreCat Café its best screenshot or a themed placeholder.
   - The title in the game's heading font, styled in its theme.
   - The pitch (one line).
   - The primary store button (§6.3).
   - A secondary text link: "See the game →" to the game page.
   - IncreCat Café gets a small "In development" tag.
   - Interaction: on desktop hover or focus, the hovered door widens slightly (e.g. flex-grow 1 to 1.15, 300ms). Disable this under `prefers-reduced-motion`. Don't nest links: the title and "See the game" link go to the game page, and the button goes to the store.
3. **Who we are.** A short section on cream: the blurb (§8), with a Discord invite button and an Instagram link.
4. **Footer** (§6.2).

### 5.2 Game page (`layout: game`, both games)
Sections in this order:
1. **Hero:** game title, trailer (§6.4) or placeholder, store buttons directly under the trailer. For A Mind Apart, the one-line content note sits directly under the buttons (§6.7).
2. **Pitch and hooks:** the pitch as a lead paragraph, then three hooks (title plus one sentence each). Lay them out as an asymmetric stack or staggered row, not three identical cards.
3. **Gallery:** screenshots and clips (§6.5). If there are none, show one placeholder block (§6.9) instead of an empty grid.
4. **Final CTA band** (§6.6).
5. **Credits line**, if `credits` is set (A Mind Apart only).
6. **Footer.**
7. **Mobile sticky CTA bar** (§6.8).

### 5.3 `404.html`
Shell styling. Show the cat sprite, the heading "This page wandered off.", the line "Even cats get lost sometimes.", and buttons to the homepage and both games.

---

## 6. Reusable components

### 6.1 Header (all pages)
- A slim indigo "night sky" band (#343b8c with a subtle gradient toward a darker indigo, like the logo) with scattered **pixel stars** (cream 4-point plus shapes matching the logo's stars, drawn as small inline SVG or CSS, never blurry).
- Left: the logo (links home). Right: "A Mind Apart", "IncreCat Café", then Discord and Instagram icons.
- **The cat sitting on the band's lower edge**, as if perched on it (cropped cat sprite, §7.4).
- It's short enough that no hamburger menu is needed. On small screens the game links wrap or shrink and the icons stay visible.
- Same look on every page, including the dark A Mind Apart page.

### 6.2 Footer (all pages)
- The same night-sky band with pixel stars.
- A small logo, "© 2026 Tiny Purple Cat", and links to Steam (A Mind Apart), Discord and Instagram. The itch.io link shows only if set.

### 6.3 Store buttons (`store-buttons.html`, takes a game)
Logic:
- **If `steam_url` is set:** the primary button is **"Wishlist on Steam"** with the Steam icon, linking to `steam_url`.
- **If `steam_url` is empty:** the primary button is **"Join the Discord for updates"** with the Discord icon, linking to `site.discord_url`.
- **If `itch_url` is set:** add a smaller secondary button, "Follow on itch.io".
- Never show Discord as a competing button next to a Steam wishlist button. Discord lives in the header and footer.
- All external links open in a new tab, with `rel="noopener"`.

Style varies by theme (§7). The primary button is always the most visually dominant element in its section.

### 6.4 Trailer (`trailer.html`)
- Shows the local poster image (key art) with a play button. On click, replace it with a `youtube-nocookie.com/embed/{id}?autoplay=1` iframe.
- No request to YouTube or Google before the click (so no `i.ytimg.com` thumbnails).
- Without JS, the poster links to `https://www.youtube.com/watch?v={id}`.
- On A Mind Apart, the frame uses the glass-shard treatment (§7.2).
- If there is no trailer, use the placeholder (§6.9) at the same 16:9 size.

### 6.5 Gallery (`gallery.html`)
- A responsive grid of screenshots, with clips first if any exist.
- Clips are short, muted, looping `<video>` elements (`playsinline`, `preload="none"`, poster set) that play on hover or focus on desktop and on tap on mobile.
- Clicking a screenshot opens a lightbox built on `<dialog>`: arrow keys and Esc work, there are prev/next/close buttons and a focus trap, and focus returns to the clicked thumbnail on close.
- Every image needs alt text from the data file.

### 6.6 Final CTA band (`cta-band.html`)
A full-width band near the bottom of each game page with a short heading, one sentence and the store buttons again. Copy is in §8.

### 6.7 Content note (`content-note.html`, A Mind Apart only)
- One calm line directly under the hero store buttons, built with `<details>`/`<summary>` so it works without JS.
- Summary text and expanded text are in §8.
- Style it as quiet and muted, not a warning box. No red, no icons that look like alerts.

### 6.8 Mobile sticky CTA bar (`mobile-cta-bar.html`)
- Phones only (< 768px). A slim bar fixed to the bottom of the screen with the game title (small) and the primary store button.
- It appears once the hero buttons scroll out of view and hides while the final CTA band is visible (use IntersectionObserver). Without JS it stays hidden.
- It respects the safe area at the bottom of the screen (`env(safe-area-inset-bottom)`).

### 6.9 Placeholder (`placeholder.html`)
- A styled "coming soon" block for missing media. It should be on-brand: the pixel cat sprite plus a short line, e.g. "Screenshots coming soon. Join the Discord to see them first."
- Each placeholder must have an HTML comment `<!-- PLACEHOLDER: ... -->` describing what belongs there.

### 6.10 Icons
Inline SVGs for Steam, Discord, Instagram, itch.io and play, using `currentColor`. Use Simple Icons (CC0) for the brand glyphs.

---

## 7. Visual style

### 7.1 Studio shell (homepage, header, footer, 404, and the base for IncreCat Café)
- **Colors** (brand-given):
  - Indigo `#343b8c`: night-sky bands, main text
  - Purple `#76428a`: primary buttons, accents, links
  - Cream `#faf7c8`: page background, stars, text on indigo
  - Derived: a darker indigo `#262b66` for gradients and hover states. Check every text/background pair against WCAG AA.
- **Fonts:**
  - Headings, nav and buttons: **Pixelify Sans** (OFL; get it from the google/fonts GitHub repo, self-hosted as woff2). Use it only at large sizes (≥ 20px) and keep it crisp.
  - Body: **Nunito** (OFL, self-hosted woff2), 17–18px base, line-height 1.6.
- **Buttons:** pixel style, square corners, with a hard 3px offset shadow in a darker shade (no blur) that shifts on hover and press, like a game UI button. Purple background, cream text.
- **Pixel art:** any pixel image (logo, cat sprite) uses `image-rendering: pixelated` and is scaled only by whole numbers.

### 7.2 A Mind Apart theme (`theme-ama`)
Colors are sampled from the key art. They're starting values, so tweak them to match the art.
- Background near-black `#0d0f15`, surfaces `#161a22`, body text `#e6e9f0`.
- Teal light `#49c6cf`: accents, the primary button background (dark text on teal), light-ray gradients.
- Pink-white title glow: headings in `#f6ecff` with a soft purple/pink `text-shadow` glow (e.g. `#c98bff` at low opacity), echoing the logo in the key art.
- **Fonts:** headings in **CMU Sans Serif Demi Condensed**, body in **Tinos** (from the asset folder; convert to woff2 with fontTools and include the license texts).
- **Shattered glass:** frame the trailer and screenshots as irregular glass shards using `clip-path` polygons, with a faint light edge (a slightly larger translucent-white shard behind each image). Scatter a few decorative empty shards in section backgrounds. Keep them subtle and don't let them cover the store buttons.
- **Buttons:** angular, with clipped corners like broken glass, a teal fill and a soft teal glow on hover.
- **Mood:** quiet and atmospheric, with lots of dark space. Motion is minimal: slow drifting light rays at most, and none under reduced motion.

### 7.3 IncreCat Café theme (`theme-increcat`)
This theme is **provisional** until the game has its own art (§9).
- Builds on the shell palette with a warmer, milkier background `#fff3e2`, indigo text, and purple for primary buttons. Provisional warm accent `#e8935a` (ginger-cat orange) for tags and highlights.
- Fonts: the shell fonts (Pixelify Sans and Nunito).
- Shapes: rounded (16px radius on panels and media) and playful. Buttons keep the pixel offset shadow but with slightly rounded corners.
- An optional small touch: paw-print or plate doodles as section dividers, kept sparse.

### 7.4 Imagery
- **Cat sprite:** crop the small purple cat from `Logo.png` (the cat sitting on the P's crossbar) into its own transparent PNG and keep it pixel-perfect. Use it in the header edge, the 404 page and placeholders. If cropping cleanly isn't possible, use a placeholder and ask the user for a separate sprite.
- **Favicons:** from the logo, at 32×32 and 180×180 (apple-touch-icon), scaled pixelated.
- **Screenshots:** convert to WebP, max 1920px wide, with an 800w version for `srcset`. Aim for under ~400KB each. Lazy-load everything below the hero.
- **Clips:** MP4 (H.264), short, muted. If a video is over ~20MB, compress it with ffmpeg if available. If that's not possible or it's a long trailer, ask the user to upload it to YouTube instead. GitHub rejects files over 100MB.
- **Social images:** set Open Graph and Twitter tags on every page. A Mind Apart uses its key art. Make the homepage image 1200×630 with the logo on cream and night sky. IncreCat Café uses the homepage image until it has art.

### 7.5 Spacing and layout
- An 8px spacing scale. Max content width 1120px. Section padding 96px on desktop and 56px on mobile.
- Mobile-first, with the main breakpoint at 768px (plus 1100px for wide layouts). Phones are a primary target: many visitors arrive from social links.

### 7.6 Copy tone
- Warm, short and personal ("we"). No hype words ("epic", "revolutionary", "immersive").
- A Mind Apart: quiet, gentle and a little mysterious. **No character spoilers:** don't name or describe the companions, and don't reveal the cat's identity or what the puzzles symbolize.
- IncreCat Café: playful, with cat puns used sparingly (at most one per section).
- Use the exact copy in §8. Don't add new claims about the games.

---

## 8. Copy (use exactly)

### Studio blurb ("Who we are")
> Tiny Purple Cat is a small indie studio that grows a little with every game. A Mind Apart is made together with artist Alexander Epelman and musician Naor Hazan, and IncreCat Café is co-created with a fellow designer and artist. Our games range from heartfelt stories to cozy chaos, and there's usually a cat involved.

### A Mind Apart
- **Genre:** Narrative puzzle adventure
- **Pitch:** A girl wakes in a surreal storybook world with no memory of who she is. To move forward, she must collect the pieces of her past, and face the guilt that comes with them.
- **Hooks:**
  1. **Bonds you choose.** Not everyone here has your best interests at heart. Decide who to let in, and who to keep at arm's length. The closer they get, the more they change you.
  2. **A bow and magic arrows.** Solve puzzles with a bow and enchanted arrows. Every puzzle you crack brings back another piece of who you were.
  3. **Paths that keep shifting.** Every choice and every bond opens some paths and closes others, right up to the final moments.
- **Content note, summary line:** Content note: A Mind Apart explores complex trauma, childhood neglect and self-destructive behavior. It handles these themes with care, but please play at your own pace.
- **Content note, expanded text:** The game does not depict self-harm directly. If any of this feels close to home, take breaks whenever you need. If you're struggling, you can find support lines in your country at [findahelpline.com](https://findahelpline.com).
- **Final CTA band:** heading "Wishlist A Mind Apart", sentence "Every wishlist helps a small studio get seen on Steam."
- **Credits:** Made by Tiny Purple Cat, with art by Alexander Epelman and music by Naor Hazan.

### IncreCat Café
- **Genre:** Incremental cat-café management game
- **Tag:** In development
- **Pitch:** Run a chaotic cat café, raise cats for their forever homes, and leave Meowlon Whiskers in the dust.
- **Hooks:**
  1. **Cats looking for homes** Raise and care for a café full of cats, then help each one find its forever home.
  2. **Cat-astrophic rush hour** Juggle orders, sling plates and keep every customer happy as your café gets busier, and furrier, by the minute.
  3. **Nine lives' worth of upgrades** Unlock new recipes, cat activities, abilities and more on a skill tree that keeps branching.
- **Final CTA band:** heading "Follow along", sentence "IncreCat Café is early in development. Join the Discord to watch it grow." When `steam_url` is set, switch to heading "Wishlist IncreCat Café" and sentence "Every wishlist helps a small studio get seen on Steam."
- **Credits:** none.

---

## 9. Accessibility and performance (must-haves)
- Semantic HTML, `lang="en"`, one `<h1>` per page, visible `:focus-visible` styles in every theme.
- WCAG AA contrast for all text and buttons in all three themes.
- All motion is disabled or reduced under `prefers-reduced-motion`.
- Every image needs alt text, and decorative shards and stars use `aria-hidden`.
- Fonts: `font-display: swap`, and preload only the shell heading font plus the current page's heading font.
- No third-party requests on load. Target Lighthouse ≥ 90 on mobile for performance and accessibility.

---

## 10. Open questions and placeholders to leave

Leave each as a visible, on-brand placeholder plus a `<!-- PLACEHOLDER: ... -->` comment, and list them all in the README:

1. **IncreCat Café Steam page:** `steam_url` stays empty, so Discord is the primary CTA.
2. **IncreCat Café trailer, key art and screenshots:** use whatever the asset folder contains, with placeholders for the rest. The homepage door needs a background, so use its best screenshot or a themed placeholder.
3. **IncreCat Café visual identity:** the theme is provisional. Its own palette and fonts come later.
4. **itch.io links:** both empty, so the buttons are hidden.
5. **A Mind Apart screenshots and clips:** take them from the asset folder. If there are none, use the gallery placeholder.
6. **A Mind Apart title logo:** if a transparent title-logo image is in the folder, use it in the hero. Otherwise set the title in CMU Sans Serif Demi Condensed with the glow treatment.
7. **Cat sprite:** cropped from the logo. Ask the user for a separate file if the crop isn't clean.
8. **Alt text:** you draft it and the user approves it.
9. **Analytics:** none for now. If wanted later, use a privacy-friendly static option (e.g. a script snippet from a hosted service). Don't add it unprompted.

---

## 11. Build order for Claude Code
1. Ask for the asset folder (§0) and inventory it.
2. Scaffold the repo structure, `_config.yml`, `games.yml` and fonts.
3. Build the shell: tokens, header, footer, pixel stars, buttons, 404.
4. Build the game layout and the components in §6.
5. Apply the A Mind Apart theme, then the IncreCat Café theme.
6. Build the homepage doors.
7. Process images and clips, then add alt text and get the user's approval.
8. Accessibility and performance pass (§9).
9. Write the README: deploying, updating links, adding media, adding a game, and the placeholder list.
