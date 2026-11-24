# Tiny Purple Cat website

Static Jekyll site for GitHub Pages: the studio home page plus one page per game. Design and copy live in `docs/site-spec.md`; standing rules are in `CLAUDE.md`.

## Preview locally

```powershell
bundle install            # first time only
bundle exec jekyll serve  # http://localhost:4000/showcase/
bundle exec jekyll build  # check the build passes (output goes to _site/)
```

Ruby is needed (on Windows: `winget install RubyInstallerTeam.RubyWithDevKit.3.3`). The `Gemfile` uses Jekyll 3.10 plus the two allowed plugins, which is what GitHub Pages builds with. Swap in `gem "github-pages"` on macOS/Linux if you prefer the exact gem set.

## Deploy

1. Push to the `main` branch of the `EllaLuna/showcase` repo.
2. In the repo on GitHub: **Settings → Pages → Build and deployment → Deploy from a branch → `main` / (root)**. This can only be done by you in the GitHub settings.
3. The site appears at https://ellaluna.github.io/showcase/ after a minute or two.

`_config.yml` has `baseurl: "/showcase"` because this is a project site. If you ever rename the repo to `EllaLuna.github.io` (a user site served from the root), set `baseurl: ""`.

Locally the preview is then at http://localhost:4000/showcase/.

## Update links and copy

Everything per game lives in `_data/games.yml`; site-wide links live in `_config.yml`.

| To change | Edit |
|---|---|
| **Turn on Steam wishlisting for IncreCat Café** | Paste its Steam URL into `steam_url` under `increcat-cafe`. Nothing else changes: the main button becomes "Wishlist on Steam", the closing band switches to "Wishlist IncreCat Café", and the footer gains a Steam link. |
| Show an itch.io button | Paste the URL into `itch_url`. Empty means hidden. |
| Trailer | `trailer_youtube_id` (the part after `v=`) and `poster` (a local image). Empty shows a placeholder. |
| Discord / Instagram links | `discord_url`, `instagram_url` in `_config.yml`. |
| Studio blurb on the home page | `studio_blurb` in `_config.yml`. |
| Pitch, hooks, content note, closing-band copy, credits | The matching fields in `_data/games.yml`. |

## Add screenshots and clips

1. Put images in `assets/img/games/<slug>/screenshots/` as `name.webp` (max 1920px wide) **and** `name-800.webp` (800px wide). Aim for under ~400KB each.
2. Add an entry under `screenshots:` with `file: name` (no extension) and `alt:` text. Every screenshot needs alt text.
3. Clips are short, muted MP4 (H.264) loops in `.../clips/` with a poster image next to them. Add `file`, `poster` and `alt` under `clips:`. Compress with ffmpeg, for example:
   `ffmpeg -ss 15 -t 6 -i source.mp4 -an -vf "scale=1280:-2,fps=30" -c:v libx264 -crf 27 -pix_fmt yuv420p -movflags +faststart clip.mp4`
   GitHub rejects files over 100MB; keep clips to a few MB. For anything long, upload to YouTube instead.

Do not show or name A Mind Apart's companions as a feature (spec section 7.6); keep alt text neutral about them.

## Add a game

1. Add a new entry to `_data/games.yml` (copy an existing one).
2. Create `<slug>/index.html` containing only front matter: `layout: game`, `game: <slug>`, `title: <title>`.
3. If it needs its own look, add `assets/css/theme-<name>.css` (see `theme-increcat.css`) and set `theme: <name>` in its data entry. The header, footer, buttons and game layout are shared.

## Placeholders still to fill

Each is marked in the source with `<!-- PLACEHOLDER: ... -->`.

| Where | What belongs there |
|---|---|
| `_data/games.yml` → `increcat-cafe.steam_url` | Steam store URL (empty on purpose until the page exists; Discord is the main button meanwhile). |
| `_data/games.yml` → both `itch_url` | Empty on purpose; the itch.io button is hidden. |
| IncreCat Café trailer (`trailer.html`) | Placeholder shown until `trailer_youtube_id` and `poster` are set. |
| IncreCat Café key art | None yet; its homepage door uses a screenshot (`door_image`). |
| A Mind Apart key art | `assets/img/games/a-mind-apart/key-art.webp` and `og.jpg` are made from the 920×430 `capsule_header.png`. Replace with the 1280×720 key art (`Youtube_Tumbnail.png`) when you have it (the trailer poster is shown at 16:9 and will look soft until then). |
| A Mind Apart title logo | Not supplied, so the title is set in CMU Sans Serif with the glow treatment. |
| IncreCat Café visual identity | `theme-increcat.css` is provisional (spec 7.3). |
| Alt text | All current alt text in `_data/games.yml` is a draft awaiting the studio's approval. |
| Analytics | None, on purpose. |

## Credits for bundled assets

Fonts are self-hosted in `assets/fonts/` with their licences: Pixelify Sans, Nunito and CMU Sans Serif (SIL OFL 1.1), Tinos (Apache 2.0). Brand icons are from Simple Icons (CC0).
