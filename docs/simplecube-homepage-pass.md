# SimpleCube homepage — initial pass

**Date:** 2026-09-09  
**Scope:** First public SimpleCube branding + homepage content pass (rebrand from prior Hyniva codebase).  
**Repo:** `SimpleCube-Website` (`origin` → `github.com/krishnavamsij/SimpleCube-Website`)

This note is for developers continuing the site. Prefer restoring commented sections and updating content modules over rewriting layout from scratch.

---

## Brand system

Canonical tokens live in `src/lib/brand.ts` (from BrandBoard):

| Token | Value | Use |
| --- | --- | --- |
| Primary | `#135498` | CTAs, links, logo circle, focus |
| Secondary / accent | `#3886CE` | Highlights, hero accent text |
| Ink | `#0A2F52` | Dark heroes, footer, navy headings |
| Primary hover | `#0F427A` | Button / link hover |
| Background | `#FFFFFF` | Page canvas |

- **Typeface:** Andika (site-wide via `layout.tsx` + `globals.css`). Footer metrics still use Inter where noted in CSS (`#site-footer`).
- **Logos:** `public/logos/simplecube/` — `logo-blue.png` (light UI), `logo-white.png` (dark hero/nav), `mark.svg`. Favicon: `/icon.svg` and `src/app/icon.svg`.

---

## Homepage composition (`src/app/page.tsx`)

**Visible now** (`src/app/page.tsx`)

1. Navbar  
2. Hero carousel  
3. Why SimpleCube (`WhyHyniva` component — name still legacy)  
4. Challenges  
5. Approach  
6. Footer  

`Services` and `TechPartners` are still imported in `page.tsx` but not rendered in this pass — wire them back into `<main>` when ready, or remove unused imports.

**Temporarily hidden (commented, not deleted)**

- TrustBar (client logos)  
- VoiceOfCustomer  
- CaseStudies  
- Industries  
- ProductsShowcase  
- Faq  
- AskAiraWidget (`layout.tsx`)  

Nav items also commented: **Products**, **Insights**. Footer: Proud Member / Certified By, Products column, Case Studies link, Privacy Policy link, India office (see footer content + component).

To restore a section: uncomment the import + JSX (and matching nav/footer entries). Content still exists under `src/content/` and the original components.

---

## Hero (`src/components/hero-carousel.tsx` + `heroSlides` in `site-content.ts`)

- Headline (hardcoded layout for line break):

  ```
  Complex problems,
  solved simply.
  ```

  Second line accent: `#3886CE`.

- Badge (“Boutique Software Delivery” / slide badge) — commented out.  
- Subheadline comes from `heroSlides[0].subheadline` (no “Based in Texas” prefix).  
- Active slide index is `0` (blueprint primary). Other slides remain in content for a future carousel.  
- Stats / CTAs driven from `site-content.ts`.

---

## Content modules to edit first

| Area | File(s) |
| --- | --- |
| Homepage copy, services cards, why/USP, nav labels | `src/content/site-content.ts` |
| About | `src/content/about.ts`, `src/content/about-faqs.ts`, `src/app/about/page.tsx` |
| Services listing | `src/content/services-listing.ts`, `src/app/services/page.tsx` |
| Contact | `src/content/contact.ts` |
| Lead / contact email defaults | `src/lib/email-config.ts`, `src/app/api/send-*`, `src/app/api/leads/*` |

**Contact defaults in this pass**

- Email: `kvjadapolu@simplecube.co`  
- Phone: `+1-210-913-3929`  
- US office: `9901 I-10 W, Suite 800, San Antonio, Texas - 78260`  
- LinkedIn: `https://www.linkedin.com/company/simplecube-llc`

---

## Known leftovers / next passes

Not fully cleaned in this commit — expect follow-up work:

- Component/export names still say `WhyHyniva`, `whyHynivaContent`, etc. (UI copy is SimpleCube).  
- Some careers / SES defaults and hidden testimonials may still reference Hyniva emails or quotes.  
- Service **subpages** still carry older hardcoded copy in places.  
- OG / social images in metadata may still point at legacy host URLs.  
- Homepage stats numbers left for product owner update.  
- Blueprint PDF was used as content source; keep site copy aligned when stats/addresses change.

---

## Local run

From this app root (GitHub Desktop clone path may be `SimpleCube-Website/Untitled`):

```bash
pnpm install
pnpm dev
```

App: http://localhost:3000
