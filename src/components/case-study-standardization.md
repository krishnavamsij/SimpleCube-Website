# Case Study UI Standardization Guide

This document outlines the standardized UI system for all Case Study subpages to ensure complete visual consistency across the entire Case Study experience.

## Overview

Every Case Study page must follow the EXACT SAME visual structure, spacing system, typography behavior, alignment rules, responsive behavior, and card layout consistency. The entire Case Study experience should feel unified, premium, enterprise-grade, polished, and scalable.

## Core Components

### 1. Standardized Hero Section (`CaseStudyHero`)

**Location:** `src/components/case-study-hero.tsx`

**Features:**
- Enforces exactly 2-line hero heading using `cs-line-clamp-2` class
- Enforces exactly 2-line hero description using `cs-line-clamp-2` class
- Responsive typography using `clamp()` functions
- Single-row metric card layout (always 4 cards in one row on desktop, 2 on mobile)
- Consistent spacing and alignment
- Premium visual effects (background blobs, corner brackets, shimmer animations)

**Usage:**
```tsx
<CaseStudyHero
    title={renderParsedTitle(parseCaseStudyTitle(study.slug).parts, "font-black text-white")}
    summary={study.summary}
    metrics={study.metrics}
/>
```

### 2. Global CSS Utilities

**Location:** `src/app/globals.css` (lines 950-1037)

#### Line Clamp Utilities
- `.cs-line-clamp-1` - Limits text to 1 line with ellipsis
- `.cs-line-clamp-2` - Limits text to 2 lines with ellipsis
- `.cs-line-clamp-3` - Limits text to 3 lines with ellipsis

**Browser Support:** Includes fallback for browsers that don't support `-webkit-line-clamp`

#### Typography System
- `.cs-hero-heading` - Responsive heading (28px → 52px)
- `.cs-hero-description` - Responsive description (14px → 16px)
- `.cs-metric-value` - Responsive metric values (28px → 42px)
- `.cs-metric-label` - Responsive metric labels (11px → 12px)

#### Spacing System
- `.cs-section-padding` - Responsive section padding (40px → 64px)
- `.cs-card-padding` - Responsive card padding (16px → 24px)
- `.cs-gap-sm` - Responsive small gap (8px → 12px)
- `.cs-gap-md` - Responsive medium gap (12px → 20px)
- `.cs-gap-lg` - Responsive large gap (20px → 32px)

## Mandatory Rules

### 1. Hero Section Consistency

**Main Hero Heading:**
- MUST always render in EXACTLY 2 lines across all pages
- Use `cs-hero-heading` class for responsive typography
- Use `cs-line-clamp-2` class to enforce 2-line limit
- Never allow 1-line headings, 3-line headings, or awkward text wrapping

**Hero Subcontent:**
- Supporting description must remain in EXACTLY 2 lines
- Use `cs-hero-description` class for responsive typography
- Use `cs-line-clamp-2` class to enforce 2-line limit
- If content is too large, the system will truncate with ellipsis

**Hero Layout Rules:**
- Maintain identical spacing structure across all pages
- Equal top/bottom spacing
- Equal heading-to-subcontent spacing
- Equal section alignment
- Consistent responsive scaling

### 2. Metric/Stats Cards Consistency

**Card Structure Rules:**
- Top icon/button/action area must ALWAYS remain in SINGLE LINE
- Main number/title section must remain centered and aligned consistently
- Supporting text/sub-labels must ALWAYS remain in EXACTLY 2 lines using `cs-line-clamp-2`
- Never allow 1-line inconsistency, 3+ line wrapping, or broken alignment

**Long Content Handling:**
- System uses `cs-line-clamp-2` to enforce 2-line limit
- Text will truncate with ellipsis if too long
- Card widths are responsive to accommodate content

### 3. Single Row Card System

**Layout Rules:**
- ALL metric cards must ALWAYS remain in ONE SINGLE ROW
- Desktop: 4 cards in one row
- Mobile: 2 cards in one row
- Never move cards to the next line
- Never break the grid consistency

**Responsive Handling:**
- Uses `grid grid-cols-2 md:grid-cols-4` for responsive behavior
- Typography scales automatically using `clamp()` functions
- Gaps and padding adjust responsively
- Equal card heights maintained

### 4. Responsive Design Consistency

**Breakpoints:**
- Mobile: < 768px (2-column grid)
- Tablet: 768px - 1024px (transitional)
- Desktop: > 1024px (4-column grid)

**Behavior Expectations:**
- No layout shifting
- No overlapping text
- No inconsistent spacing
- No broken alignment
- No awkward wrapping
- No inconsistent card sizing

**Typography Scaling:**
- All typography uses `clamp(min, preferred, max)` for smooth scaling
- Ensures readability across all device sizes
- Maintains visual hierarchy

### 5. Typography & Spacing System

**Font Hierarchy:**
- Hero Heading: `cs-hero-heading` (28px → 52px, font-black)
- Hero Description: `cs-hero-description` (14px → 16px, font-light)
- Metric Value: `cs-metric-value` (28px → 42px, font-bold)
- Metric Label: `cs-metric-label` (11px → 12px, font-medium)

**Line Heights:**
- Hero Heading: 1.15
- Hero Description: 1.7
- Metric Value: 1.0
- Metric Label: 1.4

**Spacing System:**
- Section Padding: 40px → 64px
- Card Padding: 16px → 24px
- Small Gap: 8px → 12px
- Medium Gap: 12px → 20px
- Large Gap: 20px → 32px

### 6. Mandatory 2-Line Rule

The following MUST ALWAYS remain EXACTLY 2 lines:
- Main hero heading (enforced by `cs-line-clamp-2`)
- Hero description/subcontent (enforced by `cs-line-clamp-2`)
- Card supporting text/sub-labels (enforced by `cs-line-clamp-2`)

**Never allow overflow into additional lines.** Instead:
- Scale typography intelligently using `clamp()` functions
- System truncates with ellipsis if content exceeds limits
- Preserve single-row card structure

## Implementation Checklist

When creating or modifying a Case Study page:

- [ ] Use `CaseStudyHero` component for the hero section
- [ ] Apply `cs-line-clamp-2` to hero heading
- [ ] Apply `cs-line-clamp-2` to hero description
- [ ] Apply `cs-line-clamp-2` to metric card labels
- [ ] Use `cs-hero-heading` for responsive heading typography
- [ ] Use `cs-hero-description` for responsive description typography
- [ ] Use `cs-metric-value` for responsive metric values
- [ ] Use `cs-metric-label` for responsive metric labels
- [ ] Ensure metric cards use single-row grid layout
- [ ] Test responsive behavior across all breakpoints
- [ ] Verify no text overflow or layout breaking

## Expected Result

The complete Case Study section across all subpages should feel:
- Highly polished
- Enterprise-grade
- Visually balanced
- Modern
- Premium
- Fully responsive
- Perfectly aligned
- Globally consistent

Every Case Study page should look like part of one unified design system with zero layout inconsistencies.

## Browser Compatibility

The line-clamp utilities include fallbacks for browsers that don't support `-webkit-line-clamp`. The system gracefully degrades to use `max-height` as a fallback.

## Future Enhancements

Potential improvements to consider:
- Add automated testing for line-clamp behavior
- Create Storybook stories for the CaseStudyHero component
- Add visual regression testing for case study pages
- Extend standardization to other content sections
