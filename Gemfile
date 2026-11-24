source "https://rubygems.org"

# Local preview. GitHub Pages builds with Jekyll 3.10 and the plugins below, so this
# mirrors it. The full `github-pages` gem would also work, but on Windows it pulls in
# the `openssl` gem (via jekyll-remote-theme), which needs an MSYS2 toolchain to compile.
# On macOS/Linux, or once MSYS2 is set up, you can swap this block for:
#   gem "github-pages", group: :jekyll_plugins
gem "jekyll", "~> 3.10.0"

group :jekyll_plugins do
  gem "jekyll-seo-tag", "~> 2.8"
  gem "jekyll-sitemap", "~> 1.4"
end

# What the github-pages gem normally provides (GitHub Pages uses kramdown + GFM)
gem "kramdown-parser-gfm"

# Silences Ruby 3.3 "will no longer be default gems" warnings from Jekyll 3's dependencies
gem "base64"
gem "bigdecimal"

# Ruby 3+ / Windows extras for `jekyll serve`
gem "webrick"
gem "tzinfo-data", platforms: [:windows, :jruby]
gem "wdm", "~> 0.1", platforms: [:windows]
