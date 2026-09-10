/**
 * Blog Search Utilities
 * Implements search functionality for blog posts
 */

import { blogDetails } from "@/content/blog-details";

export interface BlogPost {
  title: string;
  image: string;
  date: string;
  tag: string;
  href: string;
  isNews?: boolean;
}

/**
 * Extract text content from blog sections
 */
function extractBlogSectionText(section: { title?: string; content?: string } | null | undefined): string {
  if (!section) return "";

  let text = section.title || "";

  if (section.content) {
    // Remove HTML tags and extract plain text
    text += " " + section.content.replace(/<[^>]*>/g, " ");
  }

  return text;
}

/**
 * Get full text content from blog details
 */
function getFullBlogContent(href: string): string {
  // Extract slug from href (e.g., "/insights/blogs/slug" or "/insights/news/slug" -> "slug")
  const slug = href.split("/").pop() || "";
  const details = blogDetails[slug];

  if (!details) return "";

  let fullText = "";

  // Add title, subtitle
  fullText += " " + (details.title || "").replace(/<[^>]*>/g, " ");
  fullText += " " + (details.subtitle || "").replace(/<[^>]*>/g, " ");

  // Add all sections
  if (details.sections) {
    details.sections.forEach((section) => {
      fullText += " " + extractBlogSectionText(section);
    });
  }

  return fullText;
}

/**
 * Normalize text for search (lowercase, remove extra spaces, remove HTML)
 */
function normalizeText(text: string): string {
  return text
    .replace(/<[^>]*>/g, " ") // Remove HTML tags
    .toLowerCase()
    .replace(/\s+/g, " ") // Collapse whitespace
    .trim();
}

/**
 * Calculate search relevance score
 * Higher score = better match
 */
function calculateRelevance(
  searchTerms: string[],
  cardText: string,
  fullText: string,
  tag: string
): number {
  let score = 0;
  const normalizedCardText = normalizeText(cardText);
  const normalizedFullText = normalizeText(fullText);
  const normalizedTag = normalizeText(tag);

  searchTerms.forEach((term) => {
    const normalizedTerm = normalizeText(term);
    if (!normalizedTerm) return;

    // Exact tag match (highest priority)
    if (normalizedTag === normalizedTerm) {
      score += 100;
    }

    // Partial tag match
    if (normalizedTag.includes(normalizedTerm)) {
      score += 50;
    }

    // Title match (high priority)
    const titleMatches = (normalizedCardText.match(new RegExp(normalizedTerm, "g")) || []).length;
    score += titleMatches * 20;

    // Full content match (lower priority)
    const contentMatches = (normalizedFullText.match(new RegExp(normalizedTerm, "g")) || []).length;
    score += contentMatches * 5;

    // Check for phrase matches (bonus)
    if (normalizedCardText.includes(normalizedTerm)) {
      score += 10;
    }
    if (normalizedFullText.includes(normalizedTerm)) {
      score += 3;
    }
  });

  return score;
}

/**
 * Search blog posts with two-layer approach
 * Layer 1: Card-level (title, tag, date)
 * Layer 2: Full content (all blog sections)
 */
export function searchBlogs(
  posts: BlogPost[],
  searchQuery: string
): BlogPost[] {
  // Return all if no search query
  if (!searchQuery.trim()) {
    return posts;
  }

  // Split search query into individual terms
  const searchTerms = searchQuery
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter((term) => term.length > 0);

  // If no valid terms, return all
  if (searchTerms.length === 0) {
    return posts;
  }

  // Two-layer search with relevance scoring
  const scoredPosts = posts.map((post) => {
    // Layer 1: Card-level content
    const cardText = `${post.title} ${post.tag} ${post.date}`;
    
    // Layer 2: Full content
    const fullText = getFullBlogContent(post.href);
    
    // Calculate relevance score
    const relevance = calculateRelevance(
      searchTerms,
      cardText,
      fullText,
      post.tag
    );

    return {
      post,
      relevance,
    };
  });

  // Filter and sort by relevance
  return scoredPosts
    .filter((item) => item.relevance > 0)
    .sort((a, b) => b.relevance - a.relevance)
    .map((item) => item.post);
}

/**
 * Check if search has no results (for showing fallback message)
 */
export function hasNoResults(
  posts: BlogPost[],
  searchQuery: string
): boolean {
  const results = searchBlogs(posts, searchQuery);
  return searchQuery.trim().length > 0 && results.length === 0;
}
