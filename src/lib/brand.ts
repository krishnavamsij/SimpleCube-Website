/**
 * SimpleCube brand tokens (BrandBoard.pdf)
 *
 * Colour system
 * -------------
 * Primary:     #135498  — CTAs, links, logo circle, focus rings
 * Secondary:   #3886CE  — accents, highlights, particle effects
 * Accent:      #3886CE  — interactive accent (BrandBoard accent matches primary family;
 *                         secondary is used where a lighter accent is needed)
 * Background:  #FFFFFF  — default page canvas
 * Ink / dark:  #0A2F52  — dark heroes, footer, navy headings (derived from primary)
 * Primary hover: #0F427A
 *
 * Typography
 * ----------
 * Primary typeface: Andika (loaded in `src/app/layout.tsx` as `--font-andika`)
 * Applied site-wide via `--font-sans` / `--font-display` / `--font-body` in globals.css
 *
 * Logos
 * -----
 * Light UI:  /logos/simplecube/logo-blue.png
 * Dark UI:   /logos/simplecube/logo-white.png
 * Favicon:   /icon.svg (cube mark) + /logos/simplecube/mark.svg
 */
export const brand = {
  primary: "#135498",
  secondary: "#3886CE",
  accent: "#3886CE",
  background: "#FFFFFF",
  ink: "#0A2F52",
  primaryHover: "#0F427A",
  fonts: {
    primary: "Andika",
  },
  logos: {
    light: "/logos/simplecube/logo-blue.png",
    dark: "/logos/simplecube/logo-white.png",
    mark: "/logos/simplecube/mark.svg",
    favicon: "/icon.svg",
  },
} as const;
