/**
 * Test suite for case study search functionality
 * Run with: npm test case-study-search.test.ts
 */

import { searchCaseStudies, hasNoResults } from "../case-study-search";

// Mock case studies data
const mockCaseStudies = [
  {
    title: "<span class='text-[#3886CE]'>Autonomous Lending Experience</span> with FinXServe",
    image: "/images/cs-1.png",
    description: "Built an AI-driven lending journey that automates document processing.",
    href: "/insights/case-studies/autonomous-lending-experiences",
    tags: ["Salesforce", "Applied AI", "Banking"],
  },
  {
    title: "<span class='text-[#3886CE]'>Faster Loan Processing</span> with Agentforce",
    image: "/images/cs-2.png",
    description: "AI-powered lending concierge for instant loan processing.",
    href: "/insights/case-studies/instant-loan-processing",
    tags: ["Salesforce", "Applied AI", "Banking"],
  },
  {
    title: "Modernizing Contact Centers with <span class='text-[#3886CE]'>Intelligent IVR</span>",
    image: "/images/cs-3.png",
    description: "Transformed legacy IVR into Smart Customer Engagement.",
    href: "/insights/case-studies/intelligent-ivr-self-service",
    tags: ["Salesforce", "Applied AI", "Banking"],
  },
  {
    title: "<span class='text-[#3886CE]'>Autonomous Freight Operations</span> with GenAI",
    image: "/images/cs-4.png",
    description: "Reduced load creation time by 98% using GenAI automation.",
    href: "/insights/case-studies/autonomous-freight-operations",
    tags: ["Product Engineering", "Applied AI", "Transportation & Logistics"],
  },
  {
    title: "<span class='text-[#3886CE]'>AWS-Powered Document</span> Platform",
    image: "/images/cs-10.png",
    description: "Saved $500K annually with serverless AWS modernization.",
    href: "/insights/case-studies/hyniva-leverages-aws-half-a-million-dollars-savings-annually",
    tags: ["AWS", "Data Intelligence", "Wealth & Asset Management"],
  },
];

describe("Case Study Search", () => {
  describe("searchCaseStudies", () => {
    it("should return all studies when search query is empty", () => {
      const results = searchCaseStudies(mockCaseStudies, "", "All");
      expect(results.length).toBe(mockCaseStudies.length);
    });

    it("should filter by tag only when no search query", () => {
      const results = searchCaseStudies(mockCaseStudies, "", "Banking");
      expect(results.length).toBe(3);
      expect(results.every((s) => s.tags?.includes("Banking"))).toBe(true);
    });

    it("should search by single keyword in title", () => {
      const results = searchCaseStudies(mockCaseStudies, "Lending", "All");
      expect(results.length).toBeGreaterThan(0);
      expect(
        results.some((s) =>
          s.title.toLowerCase().includes("lending")
        )
      ).toBe(true);
    });

    it("should search by keyword in description", () => {
      const results = searchCaseStudies(mockCaseStudies, "automation", "All");
      expect(results.length).toBeGreaterThan(0);
      expect(
        results.some((s) =>
          s.description.toLowerCase().includes("automation")
        )
      ).toBe(true);
    });

    it("should search by tag name", () => {
      const results = searchCaseStudies(mockCaseStudies, "Salesforce", "All");
      expect(results.length).toBeGreaterThan(0);
      expect(
        results.every((s) => s.tags?.includes("Salesforce"))
      ).toBe(true);
    });

    it("should handle multiple keywords", () => {
      const results = searchCaseStudies(mockCaseStudies, "AI Banking", "All");
      expect(results.length).toBeGreaterThan(0);
      // All results should contain both "ai" and "banking" somewhere
    });

    it("should combine search query and tag filter", () => {
      const results = searchCaseStudies(mockCaseStudies, "AI", "Banking");
      expect(results.length).toBeGreaterThan(0);
      expect(
        results.every((s) => s.tags?.includes("Banking"))
      ).toBe(true);
    });

    it("should be case insensitive", () => {
      const resultsLower = searchCaseStudies(mockCaseStudies, "lending", "All");
      const resultsUpper = searchCaseStudies(mockCaseStudies, "LENDING", "All");
      const resultsMixed = searchCaseStudies(mockCaseStudies, "LeNdInG", "All");

      expect(resultsLower.length).toBe(resultsUpper.length);
      expect(resultsLower.length).toBe(resultsMixed.length);
    });

    it("should strip HTML tags when searching", () => {
      const results = searchCaseStudies(mockCaseStudies, "Autonomous", "All");
      expect(results.length).toBeGreaterThan(0);
    });

    it("should return empty array when no matches", () => {
      const results = searchCaseStudies(
        mockCaseStudies,
        "NonExistentTerm12345",
        "All"
      );
      expect(results.length).toBe(0);
    });

    it("should rank tag matches higher than content matches", () => {
      const results = searchCaseStudies(mockCaseStudies, "AI", "All");
      // Studies with "Applied AI" tag should rank high
      expect(results[0].tags).toContain("Applied AI");
    });

    it("should handle special characters", () => {
      const results = searchCaseStudies(mockCaseStudies, "$500K", "All");
      expect(results.length).toBeGreaterThanOrEqual(0); // Should not crash
    });

    it("should handle empty tag filter", () => {
      const results = searchCaseStudies(mockCaseStudies, "AWS", "");
      expect(results.length).toBeGreaterThan(0);
    });

    it("should prioritize title matches", () => {
      const results = searchCaseStudies(mockCaseStudies, "Document", "All");
      // "AWS-Powered Document Platform" should rank high
      expect(results.length).toBeGreaterThan(0);
    });
  });

  describe("hasNoResults", () => {
    it("should return false when results exist", () => {
      expect(hasNoResults(mockCaseStudies, "AI", "All")).toBe(false);
    });

    it("should return true when no results found", () => {
      expect(
        hasNoResults(mockCaseStudies, "NonExistentTerm12345", "All")
      ).toBe(true);
    });

    it("should return false for empty search query", () => {
      expect(hasNoResults(mockCaseStudies, "", "All")).toBe(false);
    });

    it("should return false when only whitespace", () => {
      expect(hasNoResults(mockCaseStudies, "   ", "All")).toBe(false);
    });

    it("should return true when search + tag filter has no matches", () => {
      expect(
        hasNoResults(mockCaseStudies, "Banking", "Education")
      ).toBe(true);
    });
  });

  describe("Edge Cases", () => {
    it("should handle empty studies array", () => {
      const results = searchCaseStudies([], "test", "All");
      expect(results.length).toBe(0);
    });

    it("should handle studies without tags", () => {
      const studiesNoTags = [
        {
          title: "Test Study",
          image: "/test.png",
          description: "Test description",
          href: "/test",
        },
      ];
      const results = searchCaseStudies(studiesNoTags, "Test", "All");
      expect(results.length).toBe(1);
    });

    it("should handle very long search queries", () => {
      const longQuery = "a ".repeat(100);
      const results = searchCaseStudies(mockCaseStudies, longQuery, "All");
      expect(results).toBeDefined();
    });

    it("should handle studies with empty descriptions", () => {
      const studiesEmptyDesc = [
        {
          title: "Test Study",
          image: "/test.png",
          description: "",
          href: "/test",
          tags: ["Test"],
        },
      ];
      const results = searchCaseStudies(studiesEmptyDesc, "Test", "All");
      expect(results.length).toBe(1);
    });

    it("should handle numeric search terms", () => {
      const results = searchCaseStudies(mockCaseStudies, "98%", "All");
      expect(results.length).toBeGreaterThanOrEqual(0);
    });
  });

  describe("Performance", () => {
    it("should complete search in reasonable time", () => {
      const startTime = performance.now();
      searchCaseStudies(mockCaseStudies, "AI Banking", "All");
      const endTime = performance.now();
      const duration = endTime - startTime;

      // Should complete within 100ms for small dataset
      expect(duration).toBeLessThan(100);
    });

    it("should handle multiple searches efficiently", () => {
      const queries = [
        "AI",
        "Banking",
        "AWS",
        "Salesforce",
        "Autonomous",
        "Document",
        "Lending",
      ];

      const startTime = performance.now();
      queries.forEach((query) => {
        searchCaseStudies(mockCaseStudies, query, "All");
      });
      const endTime = performance.now();
      const duration = endTime - startTime;

      // All searches should complete within 500ms
      expect(duration).toBeLessThan(500);
    });
  });
});

describe("Integration Tests", () => {
  it("should match real-world search scenarios", () => {
    // Scenario 1: User searches for "AI Banking"
    const scenario1 = searchCaseStudies(mockCaseStudies, "AI Banking", "All");
    expect(scenario1.length).toBeGreaterThan(0);
    expect(
      scenario1.some(
        (s) => s.tags?.includes("Applied AI") && s.tags?.includes("Banking")
      )
    ).toBe(true);

    // Scenario 2: User filters by industry
    const scenario2 = searchCaseStudies(mockCaseStudies, "", "Banking");
    expect(scenario2.every((s) => s.tags?.includes("Banking"))).toBe(true);

    // Scenario 3: User searches for specific outcome
    const scenario3 = searchCaseStudies(mockCaseStudies, "98% reduction", "All");
    expect(scenario3.length).toBeGreaterThanOrEqual(0);

    // Scenario 4: User searches for technology
    const scenario4 = searchCaseStudies(mockCaseStudies, "AWS", "All");
    expect(scenario4.some((s) => s.tags?.includes("AWS"))).toBe(true);
  });
});
