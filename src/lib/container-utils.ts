/**
 * Standardized Container Utilities
 * 
 * These utilities ensure consistent padding/margin across all systems
 * regardless of screen size, browser, or OS.
 */

/**
 * Standard container class for consistent width and padding
 * - Max width: 87.5rem (1400px at 16px base)
 * - Horizontal padding: 24px on mobile, 32px on tablet, 48px on desktop
 * - Centered with mx-auto
 */
export const CONTAINER_CLASS = "mx-auto w-full max-w-[96rem] px-6 md:px-10 lg:px-16";

/**
 * Narrow container for text-heavy content
 * - Max width: 75rem (1200px at 16px base)
 * - Same padding as standard container
 */
export const CONTAINER_NARROW_CLASS = "mx-auto w-full max-w-5xl px-6 md:px-10 lg:px-16";

/**
 * Wide container for full-width sections
 * - Max width: 100rem (1600px at 16px base)
 * - Same padding as standard container
 */
export const CONTAINER_WIDE_CLASS = "mx-auto w-full max-w-[100rem] px-6 sm:px-8 lg:px-12";

/**
 * Full-bleed container (no max-width, but consistent padding)
 * - No max-width constraint
 * - Consistent horizontal padding
 */
export const CONTAINER_FULL_CLASS = "mx-auto w-full px-6 sm:px-8 lg:px-12";

/**
 * Section padding utilities for vertical spacing
 */
export const SECTION_PADDING_Y = "py-16 sm:py-20 lg:py-28";
export const SECTION_PADDING_Y_LARGE = "py-20 sm:py-28 lg:py-36";
export const SECTION_PADDING_Y_SMALL = "py-12 sm:py-16 lg:py-20";

/**
 * Get container class based on variant
 */
export function getContainerClass(variant: 'standard' | 'narrow' | 'wide' | 'full' = 'standard'): string {
  switch (variant) {
    case 'narrow':
      return CONTAINER_NARROW_CLASS;
    case 'wide':
      return CONTAINER_WIDE_CLASS;
    case 'full':
      return CONTAINER_FULL_CLASS;
    default:
      return CONTAINER_CLASS;
  }
}
