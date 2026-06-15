# PR Code Review Agent Workflow - Hyniva Corporate Website

## **REVIEW PROCESS MANDATES**

### **Branch Analysis Requirements**
**REQUIREMENT**: Code review agent MUST analyze ONLY the PR branch diff against target branch.

**MANDATORY**:
- Checkout PR branch locally for accurate diff analysis
- Generate diff using git diff target-branch..HEAD
- Parse diff output to map GitHub line numbers accurately
- Account for unchanged contextual lines in diff line mapping
- Review ONLY modified, added, or deleted files in the PR

**STRICTLY FORBIDDEN**:
- Reviewing files outside the PR diff scope
- Commenting on pre-existing codebase violations
- Automatically fixing code in the PR
- Making assumptions about file context outside diff

### **Line Number Mapping Protocol**
**REQUIREMENT**: GitHub diff line numbers MUST be accurately mapped to file locations.

**MANDATORY**:
- Parse git diff --unified=3 format for context lines
- Map GitHub PR line numbers to actual file line numbers
- Account for additions (+) and deletions (-) in line counting
- Include 3 lines of context above and below changes
- Verify line number accuracy before suggesting fixes

**MAPPING FORMULA**:
```
GitHub Line Number = File Line Number + (Lines Added Before) - (Lines Deleted Before)
```

## **VIOLATION DETECTION MANDATES**

### **Architecture Violation Scanning**
**REQUIREMENT**: Scan diff for SPECIFIC Next.js and Tailwind architecture violations.

**MANDATORY SCANNING RULES**:

#### **Content Management Violations**
- Detect ANY hardcoded strings in components (must reference site-content.ts)
- Flag hardcoded labels, button text, headings, or marketing copy
- Identify inline object definitions that should be in site-content.ts
- Check for missing imports from @/content/site-content

#### **Client Component Violations**
- Flag "use client" directives without hooks/Framer Motion/interactivity
- Detect Server Components using client-only features
- Identify unnecessary client-side component declarations
- Check for Framer Motion usage without "use client"

#### **Styling Violations**
- Detect ANY inline styles (style={{}} prop usage)
- Flag CSS Modules imports (.module.css files)
- Identify styled-components or CSS-in-JS usage
- Check for non-Tailwind class names in className prop
- Flag Material UI or external component library imports

#### **TypeScript Violations**
- Detect ANY type usage
- Identify missing type annotations for component props
- Flag implicit any types in function parameters
- Check for missing return type annotations

## **REVIEW OUTPUT FORMAT MANDATES**

### **Concise Bulleted Format**
**REQUIREMENT**: Review output MUST follow strict bulleted format without narrative padding.

**MANDATORY FORMAT**:
```
- [violation-type] R[start]-R[end] in [filename] - [suggestion]
```

**VIOLATION TYPE CLASSIFICATIONS**:
- **HARDCODED_CONTENT** - Hardcoded text strings
- **UNNECESSARY_CLIENT** - Unnecessary "use client" directive
- **STYLING_VIOLATION** - Non-Tailwind styling
- **TYPE_VIOLATION** - TypeScript typing issues
- **ARCHITECTURE_VIOLATION** - General architecture breaches

**EXAMPLE OUTPUTS**:
```
- HARDCODED_CONTENT R15-R18 in components/Hero.tsx - Move "Welcome to Hyniva" text to site-content.ts
- UNNECESSARY_CLIENT R1 in components/StaticCard.tsx - Remove "use client", no interactivity detected
- STYLING_VIOLATION R23 in pages/About.tsx - Replace style={{padding: '20px'}} with Tailwind className
- TYPE_VIOLATION R7 in components/Button.tsx - Add TypeScript interface for props
```

**STRICTLY FORBIDDEN**:
- Narrative explanations or paragraphs
- Code examples or lengthy suggestions
- Personal opinions or subjective feedback
- Comments about code quality outside violations
- Multiple sentences in single bullet point

## **ENFORCEMENT PROTOCOLS**

### **Scope Limitations**
**STRICTLY FORBIDDEN**:
- Automatically fixing any code in the PR
- Suggesting refactoring of unchanged code
- Commenting on pre-existing violations
- Making subjective design or architecture suggestions
- Providing educational content beyond violation fixes

**MANDATORY**:
- Focus exclusively on PR diff changes
- Provide actionable, specific violation fixes
- Reference exact line numbers for each violation
- Suggest minimal changes to resolve violations

### **Review Completion**
**REQUIREMENT**: Review MUST complete when all violations in diff are identified.

**MANDATORY**:
- Output "No violations found" if diff complies with all standards
- List ALL violations found in diff scope
- Ensure each violation has specific line number reference
- Verify suggestions align with established architecture rules

**REVIEW TERMINATION**:
- Stop analysis after complete diff scan
- Do not analyze files outside PR scope
- Do not suggest additional features or improvements
- Do not provide general code quality feedback
