# CLAUDE.md: Tiny Purple Cat website

Static GitHub Pages site for the indie studio **Tiny Purple Cat**, showcasing two upcoming games: **A Mind Apart** and **IncreCat Café**.

**The full agreed design lives in `docs/site-spec.md`. Read it before any work.** This file holds the standing rules. If the two ever conflict, the spec wins on design and content, and this file wins on process.

---

## First session

1. Ask the user for the path to their **asset folder** (screenshots, videos, logo, key art, fonts). Don't build pages before you have it.
2. Inventory the folder and map each file to a game. Ask if anything is ambiguous.
3. Follow the build order in spec §11.

## Purpose (keep it in mind for every decision)

- Audience: **players and fans**, not press or publishers.
- Every page drives one action: **Wishlist on Steam**, or for a game without a Steam page, **Join the Discord**.
- Phones are a primary target. Check every change at 375px wide as well as desktop.

## Hard rules

- **Never invent content.** No made-up game facts, features, names, links, quotes, release dates or prices. If something is missing, leave a placeholder (see below) and tell the user.
- **No spoilers for A Mind Apart.** Don't name or describe the companion characters, reveal the cat's identity, or explain what the puzzles symbolize. Players should question who they can trust.
- **Don't name IncreCat Café's co-creator.** She doesn't want to be named.
- **Use the copy in spec §8 exactly.** If you think copy should change, suggest it to the user rather than changing it.
- **Do not use** `Pixeltype.ttf` or `GranaPadano.ttf`, even if they're in the asset folder.
- **No third-party requests on page load.** Self-host all fonts. The YouTube trailer loads only after a click, via `youtube-nocookie.com`.
- **Static only.** No backends, databases, logins, server-side forms or paid services. If something needs one, tell the user and suggest a static alternative.

## Tech

- **Jekyll, built by GitHub Pages.** Only plugins on the GitHub Pages whitelist (`jekyll-seo-tag`, `jekyll-sitemap`).
- **Vanilla JS and plain CSS.** No frameworks, no npm build step, no CSS preprocessors beyond what Jekyll supports natively (we use plain CSS).
- Progressive enhancement: the site must work with JS off.
- Repo: `EllaLuna/showcase` (project site). URL: `https://ellaluna.github.io`, with `baseurl: "/showcase"`. (The original plan was a `EllaLuna.github.io` user-site repo with `baseurl: ""`; switch back if the repo is renamed.)
- `docs/` holds planning documents only. Keep it out of the built site with `exclude: [docs, README.md, CLAUDE.md, Gemfile, Gemfile.lock]` in `_config.yml`.

## Commands

```bash
bundle install                 # first time only
bundle exec jekyll serve       # local preview at http://localhost:4000/showcase/
bundle exec jekyll build       # check the build passes before finishing a task
```

Fonts: convert TTF to WOFF2 with `fontTools` (`pip install fonttools brotli`, then `fonttools ttLib.woff2 compress <file>`).
Images: convert to WebP (max 1920px wide, plus an 800w version). Videos: compress with ffmpeg if it's available.

## How the site is organized

- **All per-game content and links live in `_data/games.yml`.** Pages are generated from it by `_layouts/game.html`. Never hard-code game text or links in templates.
- **Store button logic is in `_includes/store-buttons.html`:** a set `steam_url` makes the primary button "Wishlist on Steam", and an empty one makes it "Join the Discord for updates". An itch.io button appears only when `itch_url` is set.
- **Themes** are a body class (`theme-ama`, `theme-increcat`) that sets CSS custom properties. Shared component CSS reads those variables, so don't duplicate component styles per theme.
- Site-wide links (Discord, Instagram) live in `_config.yml`.

## Style quick reference (full detail in spec §7)

| | Shell | A Mind Apart | IncreCat Café (provisional) |
|---|---|---|---|
| Background | cream `#faf7c8` | near-black `#0d0f15` | milky `#fff3e2` |
| Accent | purple `#76428a`, indigo `#343b8c` | teal `#49c6cf`, pink-white glow | purple, ginger `#e8935a` |
| Headings | Pixelify Sans | CMU Sans Serif Demi Condensed | Pixelify Sans |
| Body | Nunito | Tinos | Nunito |
| Buttons | pixel, hard offset shadow | angular, clipped corners | pixel shadow, slightly rounded |

- Pixel art (logo, cat sprite) uses `image-rendering: pixelated` and is scaled only by whole numbers.
- Avoid generic game-studio template patterns (dark hero banner, identical card grids).

## Placeholders

When content or media is missing:
- Use `_includes/placeholder.html` (on-brand, with the cat sprite) at the same size the real content would take.
- Add an HTML comment: `<!-- PLACEHOLDER: what belongs here -->`.
- Add it to the placeholder list in `README.md`.

## Quality bar before saying a task is done

- `bundle exec jekyll build` passes with no warnings.
- Checked at 375px and 1280px wide, in both game themes.
- WCAG AA contrast, visible `:focus-visible` styles, alt text on every image, and decorative elements `aria-hidden`.
- Motion is reduced or removed under `prefers-reduced-motion`.
- No requests to outside domains on page load (check the browser's network tab or grep for `http` in the built `_site/`).

## Working with the user

- The user is the studio founder. Keep updates short and plain.
- Ask before: adding pages or sections not in the spec, changing copy, adding any third-party service, or deleting their assets.
- Draft alt text for screenshots, then show it to the user for approval.
- At the end of a session, list what changed and which placeholders remain.
