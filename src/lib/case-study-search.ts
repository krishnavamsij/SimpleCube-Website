/**
 * Case Study Search Utilities
 * Implements two-layer search: Card-level + Full content
 */

import { caseStudyDetails } from "@/content/case-study-details";

export interface CaseStudy {
  title: string;
  image: string;
  description: string;
  href: string;
  tags?: string[];
}

type SearchSection = {
  title?: string;
  type?: string;
  content?: Record<string, unknown> | string;
};

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" ? (value as Record<string, unknown>) : {};
}

function asString(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function stripHtml(value: string): string {
  return value.replace(/<[^>]*>/g, " ");
}

/**
 * Extract text content from case study sections
 */
function extractSectionText(section: SearchSection | null | undefined): string {
  if (!section) return "";

  let text = section.title || "";
  const content = asRecord(section.content);

  if (section.type === "text" && content) {
    text += " " + stripHtml(asString(content));
  } else if (section.type === "approach-list" && content) {
    text += " " + stripHtml(asString(content.body));
    text += " " + stripHtml(asString(content.footer));
    const items = content.items;
    if (Array.isArray(items)) {
      items.forEach((item) => {
        const record = asRecord(item);
        text += " " + asString(record.title) + " " + asString(record.desc);
      });
    }
  } else if (section.type === "outcome-list" && content) {
    text += " " + stripHtml(asString(content.body));
    text += " " + stripHtml(asString(content.footer));
    if (Array.isArray(content.items)) {
      content.items.forEach((item) => {
        text += " " + asString(item);
      });
    }
  } else if (section.type === "feature-grid" && content) {
    text += " " + stripHtml(asString(content.body));
    text += " " + stripHtml(asString(content.footer));
    const items = content.items;
    if (Array.isArray(items)) {
      items.forEach((item) => {
        const record = asRecord(item);
        text += " " + asString(record.title) + " " + asString(record.text);
      });
    }
  } else if (section.type === "impact-strip" && content) {
    text += " " + stripHtml(asString(content.body));
    const items = content.items;
    if (Array.isArray(items)) {
      items.forEach((item) => {
        const record = asRecord(item);
        text += " " + asString(record.label) + " " + asString(record.desc) + " " + asString(record.value);
      });
    }
  } else if (section.type === "future-tags" && content) {
    text += " " + stripHtml(asString(content.body));
    text += " " + stripHtml(asString(content.footer));
    if (Array.isArray(content.items)) {
      content.items.forEach((item) => {
        text += " " + asString(item);
      });
    }
  }

  return text;
}

/**
 * Get full text content from case study details
 */
function getFullCaseStudyContent(href: string): string {
  // Extract slug from href (e.g., "/insights/case-studies/slug" -> "slug")
  const slug = href.split("/").pop() || "";
  const details = caseStudyDetails[slug];

  if (!details) return "";

  let fullText = "";

  // Add eyebrow, title, summary
  fullText += " " + (details.eyebrow || "");
  fullText += " " + (details.title || "").replace(/<[^>]*>/g, " ");
  fullText += " " + (details.summary || "").replace(/<[^>]*>/g, " ");

  // Add metrics
  if (details.metrics) {
    details.metrics.forEach((metric) => {
      fullText += " " + (metric.label || "").replace(/<[^>]*>/g, " ");
      fullText += " " + (metric.value || "");
      fullText += " " + (metric.sub || "");
    });
  }

  // Add all sections
  if (details.sections) {
    details.sections.forEach((section) => {
      fullText += " " + extractSectionText(section);
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
  tags: string[]
): number {
  let score = 0;
  const normalizedCardText = normalizeText(cardText);
  const normalizedFullText = normalizeText(fullText);
  const normalizedTags = tags.map((tag) => normalizeText(tag));

  searchTerms.forEach((term) => {
    const normalizedTerm = normalizeText(term);
    if (!normalizedTerm) return;

    // Exact tag match (highest priority)
    if (normalizedTags.some((tag) => tag === normalizedTerm)) {
      score += 100;
    }

    // Partial tag match
    if (normalizedTags.some((tag) => tag.includes(normalizedTerm))) {
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
 * Search case studies with two-layer approach
 * Layer 1: Card-level (title, description, tags)
 * Layer 2: Full content (problem, solution, outcomes, technologies)
 */
export function searchCaseStudies(
  studies: CaseStudy[],
  searchQuery: string,
  selectedTag: string = "All"
): CaseStudy[] {
  // Return all if no search query and no tag filter
  if (!searchQuery.trim() && selectedTag === "All") {
    return studies;
  }

  // Split search query into individual terms
  const searchTerms = searchQuery
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter((term) => term.length > 0);

  // If only tag filtering (no search query)
  if (searchTerms.length === 0 && selectedTag !== "All") {
    return studies.filter((study) => study.tags?.includes(selectedTag));
  }

  // Two-layer search with relevance scoring
  const scoredStudies = studies.map((study) => {
    // Layer 1: Card-level content
    const cardText = `${study.title} ${study.description}`;
    
    // Layer 2: Full content
    const fullText = getFullCaseStudyContent(study.href);
    
    // Calculate relevance score
    const relevance = calculateRelevance(
      searchTerms,
      cardText,
      fullText,
      study.tags || []
    );

    // Apply tag filter if selected
    const matchesTag = selectedTag === "All" || study.tags?.includes(selectedTag);

    return {
      study,
      relevance,
      matchesTag,
    };
  });

  // Filter and sort by relevance
  return scoredStudies
    .filter((item) => item.relevance > 0 && item.matchesTag)
    .sort((a, b) => b.relevance - a.relevance)
    .map((item) => item.study);
}

/**
 * Check if search has no results (for showing fallback message)
 */
export function hasNoResults(
  studies: CaseStudy[],
  searchQuery: string,
  selectedTag: string = "All"
): boolean {
  const results = searchCaseStudies(studies, searchQuery, selectedTag);
  return searchQuery.trim().length > 0 && results.length === 0;
}
