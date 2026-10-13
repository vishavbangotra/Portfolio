# Vishav Bangotra — portfolio

A Jekyll site built from the Claude Design mockups ("Sisyphus" design system:
Newsreader + IBM Plex Mono, bone and ink with one ember accent, day and night
themes). GitHub Pages builds it automatically; there is no build step to run
before pushing.

Live at <https://vishavbangotra.github.io/Portfolio/> (set Pages to deploy from
the branch that holds this code, at the root folder).

## Editing content

| What | Where |
| --- | --- |
| "Now" block on the home page | `_data/now.yml` |
| Experience on /work/ | `_data/experience.yml` |
| Projects (home list, /work/ cards, case-study prev/next) | `_data/projects.yml` |
| Tools chips | `_data/tools.yml` |
| Case studies | `_projects/<slug>.md` → `/work/<slug>/` |
| Journal entries | `_posts/YYYY-MM-DD-title.md` |
| Unpublished drafts | `_drafts/` |
| Footer links, email, base URL | `_config.yml` |

A journal entry needs `title`, `topic` (one of `journal_topics` in
`_config.yml`) and `description` (the one-line excerpt) in its front matter.
Use `<mark>…</mark>` for a highlight and `>` for a pull quote.

## Running locally

```sh
bundle install
bundle exec jekyll serve   # http://localhost:4000/Portfolio/
```
