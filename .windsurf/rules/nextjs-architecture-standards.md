# Next.js Architecture Standards - Hyniva Corporate Website

## **ROUTING ARCHITECTURE MANDATES**

### **App Router Structure (src/app/)**
**REQUIREMENT**: ALL routing logic MUST be exclusively contained within `src/app/` directory structure.

**STRICTLY FORBIDDEN**:
- Any routing logic outside `src/app/` directory
- Manual route creation or programmatic routing outside Next.js App Router conventions
- Mixing page components with reusable UI components in routing directories

**MANDATORY**:
- Route groups MUST use folder naming convention: `folder-name/page.tsx`
- Layout files MUST be named `layout.tsx` and placed at appropriate route levels
- Page components MUST be named `page.tsx` and export default functions only
- Route parameters MUST follow Next.js App Router conventions: `[slug]/page.tsx`

### **UI Components Structure (src/components/)**
**REQUIREMENT**: ALL reusable UI components MUST be exclusively contained within `src/components/` directory.

**STRICTLY FORBIDDEN**:
- Page components in `src/components/` directory
- Routing logic or Next.js routing hooks in UI components
- File-based routing conventions in components directory

**MANDATORY**:
- UI components MUST be reusable across multiple pages
- Component files MUST use PascalCase naming: `ComponentName.tsx`
- UI components MUST accept props for data, NOT fetch data internally
- Components MUST be organized by functionality or feature grouping

## **CENTRALIZED CONTENT MANAGEMENT MANDATES**

### **Content Authority (src/content/site-content.ts)**
**REQUIREMENT**: ALL static content, labels, and text MUST be exclusively managed through `src/content/site-content.ts`.

**STRICTLY FORBIDDEN**:
- Hardcoded strings, labels, or text content in any component
- Magic strings or inline text content in JSX
- Duplicate content definitions across multiple files
- Content scattered throughout individual components

**MANDATORY**:
- ALL navigation items MUST be imported from `navContent` object
- ALL hero content MUST be imported from `heroSlides` array
- ALL client logos MUST be imported from `trustContent.logos` array
- Component props MUST receive content objects, NOT individual strings
- Content structure MUST follow existing TypeScript interfaces

**CONTENT IMPORT PATTERN**:
```typescript
// CORRECT
import { navContent, heroSlides } from "@/content/site-content";

// FORBIDDEN
const hardcodedText = "Some hardcoded text";
```

## **SERVER vs CLIENT COMPONENT MANDATES**

### **Server Components (Default)**
**REQUIREMENT**: ALL components MUST be Server Components by default unless explicit client-side functionality is required.

**MANDATORY**:
- Components MUST NOT use "use client" directive by default
- Components MUST be optimized for server-side rendering
- Data fetching MUST occur in Server Components when possible
- Components MUST leverage React Server Component benefits (smaller bundle size)

**STRICTLY FORBIDDEN**:
- Unnecessary "use client" directives
- Client-side state management in Server Components
- Browser-only APIs in Server Components

### **Client Components ("use client")**
**REQUIREMENT**: "use client" directive MUST be used ONLY when absolutely necessary for client-side functionality.

**MANDATORY CONDITIONS FOR "use client"**:
- Component uses React hooks (useState, useEffect, etc.)
- Component uses Framer Motion animations
- Component handles browser events (onClick, onChange, etc.)
- Component uses browser APIs (window, document, etc.)
- Component requires client-side interactivity

**STRICTLY FORBIDDEN**:
- "use client" directive for simple static content display
- "use client" directive for components that only render props
- "use client" directive in layout files unless absolutely necessary
- "use client" directive in parent components when only leaf nodes need it

**CLIENT COMPONENT ARCHITECTURE**:
```typescript
// CORRECT - Leaf node with interactivity
"use client";
import { useState } from "react";

export function InteractiveButton() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>Count: {count}</button>;
}

// FORBIDDEN - Unnecessary client component
"use client"; // NOT NEEDED
export function StaticHeader({ title }: { title: string }) {
  return <h1>{title}</h1>; // No interactivity required
}
```

## **ARCHITECTURAL ENFORCEMENT**

**VIOLATION CONSEQUENCES**:
- Code review rejection for architecture violations
- Mandatory refactoring before merge approval
- Automated linting rules to enforce compliance

**APPROVAL REQUIREMENTS**:
- All new components must follow these architectural standards
- Content changes must update `src/content/site-content.ts` only
- Client component usage must be justified in code reviews
