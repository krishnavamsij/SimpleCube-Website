# Navbar — recent change log (for quick revert)

File: `src/components/navbar.tsx`  
Keep this short list current when reversing menu chrome experiments.

---

## Change 2 (latest) — Full-bleed top bar

**What:** Top-of-page bar spans the full viewport (`maxWidth: 100%`, `left: 0`). Previously it was clamped to the content container (`max-w-[96rem]` / ~96rem) and centered with `left-1/2 -translate-x-1/2`, which left visible gaps on wide screens.

**Scrolled pill:** Still centered floating pill (`left: 50%`, `x: -50%`, `maxWidth: 660px`).

**Revert to inset bar:** In the header `animate` props, restore:

```ts
maxWidth: mobileOpen ? "100%" : (scrolled ? "660px" : maxContainerWidth),
```

and header class/centering:

```ts
className="fixed z-50 left-1/2 -translate-x-1/2 backdrop-blur-xl"
```

Remove the animated `left` / `x` overrides (or always use center).

---

## Change 1 — Primary blue top bar + light scrolled pill

**What (sitewide):**

- Top (not scrolled): background `#135498`, white logo, white links, **Contact Us** = white fill + primary text
- Scrolled: frosted white floating pill, blue logo, dark links, primary-filled CTA
- Mobile open / dropdowns: white panels (unchanged pattern)
- `forceDarkText` kept on the API but no longer forces a light top bar

**Revert toward pre–primary-blue top chrome:** Restore header `backgroundColor` ternary that used transparent / `forceDarkText` white instead of `#135498`; restore logo/link conditions that used `forceDarkText` for light chrome on light pages; restore CTA to always primary-filled white text.

Approximate prior top background logic:

```ts
backgroundColor: mobileOpen
  ? "#ffffff"
  : scrolled
    ? "rgba(255, 255, 255, 0.75)"
    : forceDarkText
      ? "rgba(255, 255, 255, 0.92)"
      : "rgba(10, 47, 82, 0)",
```

---

## Unrelated (do not confuse)

Homepage hero light wash / `forceDarkText` on `page.tsx` are separate from these two navbar chrome experiments.
