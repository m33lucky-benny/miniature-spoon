# payments.ebiya.sg

Jekyll site for Ebiya.sg — Southeast Asia payment systems consulting.

## Stack

- **Jekyll 4.3** — static site generator
- **GitHub Actions** — build and deploy to GitHub Pages
- **Sass/SCSS** — modular partials, no CSS framework
- **Vanilla JS** — no dependencies, ES5-compatible
- **Formspree** — contact form backend (configure below)
- **System fonts** — no external font CDN required

---

## Local development

```bash
bundle install
bundle exec jekyll serve --livereload
# Open http://localhost:4000
```

---

## Deployment

Push to `main`. The workflow at `.github/workflows/deploy.yml` builds and deploys automatically.

**First-time GitHub setup:**
1. Repository **Settings → Pages** → Source: **GitHub Actions**
2. Confirm `CNAME` file contains `payments.ebiya.sg`
3. Add a DNS `CNAME` record: `payments.ebiya.sg → <username>.github.io`
4. Enable "Enforce HTTPS" in Pages settings after SSL provisions

---

## Configure the contact form

1. Create a free account at [formspree.io](https://formspree.io)
2. Create a new form — copy the form ID (e.g. `xrgvjdkp`)
3. In `contact.md`, change `YOUR_FORM_ID` to your real ID:
   ```
   action="https://formspree.io/f/xrgvjdkp"
   ```

---

## Content editing reference

| What | File |
|---|---|
| Business info, email, links | `_data/site.yml` |
| Navigation | `_data/nav.yml` |
| Services / pricing | `_data/services.yml` |
| Stats bar | `_data/stats.yml` |
| Feature cards | `_data/features.yml` |
| Market list | `_data/markets.yml` |
| FAQ | `_data/faq.yml` |
| Home page | `index.html` |
| About page | `about.md` |
| Contact page | `contact.md` |
| Services page | `payments.md` |

---

## SCSS architecture

```
_sass/
  core/       _variables, _mixins, _base, _utilities
  layout/     _header, _footer, _grid
  components/ _buttons, _cards, _forms, _hero, _sections
  pages/      _home, _contact, _products, _payments
assets/css/main.scss   (imports only)
```

To change the accent colour: `_sass/core/_variables.scss` → `$c-accent`.

---

## CSP notes

### GitHub Pages (meta tag — enforced now)
Lives in `_includes/head.html`. Policy:
- `script-src 'self'` — no CDN scripts, no inline JS
- `style-src 'self'` — compiled SCSS only, no inline styles
- `connect-src 'self' https://formspree.io` — contact form AJAX
- `form-action 'self' https://formspree.io` — form POST target

### Cloudflare (optional, header-based — stronger)
Add as a Custom Header in Cloudflare Transform Rules → Response Headers:
```
Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data: https:; font-src 'self'; connect-src 'self' https://formspree.io; form-action 'self' https://formspree.io; frame-ancestors 'none'; base-uri 'self'; upgrade-insecure-requests; block-all-mixed-content;
```
HTTP headers take precedence over meta tags and cannot be overridden by injected HTML.

---

## Adding a new page

```yaml
---
layout: page
title: "Page Title"
label: "Eyebrow label"
lead: "Optional subtitle shown under the heading."
permalink: /yourpage/
---
```

Then add to `_data/nav.yml` if it should appear in the nav.
