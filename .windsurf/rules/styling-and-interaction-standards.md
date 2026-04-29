# Styling and Interaction Standards - Hyniva Corporate Website

## **TAILWINDCSS v4 STYLING MANDATES**

### **Single Source of Truth**
**REQUIREMENT**: TailwindCSS v4 MUST be the EXCLUSIVE styling methodology for all components.

**STRICTLY FORBIDDEN**:
- CSS Modules imports (.module.css files)
- styled-components or any CSS-in-JS libraries
- Inline styles (style={{}} prop) except for dynamic computed values
- Material UI or any external component library styling systems
- Custom CSS classes in globals.css except theme variables
- SASS/LESS preprocessing or any alternative CSS methodologies

**MANDATORY**:
- ALL styling MUST use Tailwind utility classes
- Component styling MUST be applied through className prop only
- Responsive design MUST use Tailwind responsive prefixes (sm:, md:, lg:, xl:)
- Custom colors MUST be defined in Tailwind configuration, NOT inline
- Spacing, typography, and layout MUST use Tailwind scale exclusively

**TAILWIND USAGE PATTERN**:
```typescript
// CORRECT
<div className="flex flex-col md:flex-row gap-4 p-6 bg-primary-500 text-white rounded-lg">

// FORBIDDEN
<div style={{ display: 'flex', backgroundColor: '#000' }}>
<div className="custom-class"> // Unless defined in globals.css for theme variables
```

### **Global CSS Constraints**
**REQUIREMENT**: globals.css MUST contain ONLY theme variables and Tailwind base layers.

**MANDATORY**:
- globals.css MAY contain CSS custom properties for theme variables
- globals.css MUST include @tailwind base, components, utilities directives
- globals.css MUST NOT contain component-specific styling rules
- globals.css MUST NOT contain utility class overrides

**STRICTLY FORBIDDEN**:
- Component-specific CSS rules in globals.css
- Custom utility classes that duplicate Tailwind functionality
- Hardcoded color values outside CSS custom properties

## **THEME SWITCHING MANDATES**

### **next-themes Integration**
**REQUIREMENT**: next-themes MUST be the EXCLUSIVE theme management system.

**MANDATORY**:
- ThemeProvider MUST wrap the application in root layout
- Theme switching MUST use next-themes useTheme hook
- Dark mode styling MUST use Tailwind's dark: modifier exclusively
- Theme state MUST be managed through next-themes, NOT custom state

**STRICTLY FORBIDDEN**:
- Manual theme state management with useState
- Custom CSS variables for theme switching
- Conditional rendering based on theme outside next-themes
- Multiple theme providers or conflicting theme systems

**THEME IMPLEMENTATION PATTERN**:
```typescript
// CORRECT
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <button 
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="dark:bg-white dark:text-black bg-black text-white"
    >
      Toggle Theme
    </button>
  );
}

// FORBIDDEN
const [isDark, setIsDark] = useState(false);
<div className={isDark ? "bg-black" : "bg-white"}>
```

## **FRAMER MOTION ANIMATION MANDATES**

### **Animation Authority**
**REQUIREMENT**: Framer Motion MUST be the EXCLUSIVE animation library for all complex animations and scroll effects.

**STRICTLY FORBIDDEN**:
- CSS transitions or keyframe animations for complex interactions
- Manual scroll event listeners for animation effects
- React Spring or any other animation libraries
- jQuery animations or vanilla JavaScript animations
- CSS-only animations beyond simple hover states

**MANDATORY**:
- All scroll-triggered animations MUST use Framer Motion scroll hooks
- Complex entrance/exit animations MUST use motion components
- Animation variants MUST be defined in centralized animation library
- Performance-heavy animations MUST be client components only

### **Performance Constraints**
**REQUIREMENT**: Animation performance MUST be optimized through proper component boundaries.

**MANDATORY**:
- Components with Framer Motion MUST be marked "use client"
- Heavy animations MUST be isolated in leaf components
- Animation variants MUST be memoized or defined outside render
- Scroll animations MUST use viewport constraints for performance

**STRICTLY FORBIDDEN**:
- Server Components with Framer Motion imports
- Animation definitions inside render functions
- Unnecessary re-renders of animated components
- Heavy animations on parent components affecting children

**FRAMER MOTION USAGE PATTERN**:
```typescript
// CORRECT
"use client";
import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";

export function AnimatedCard({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {children}
    </motion.div>
  );
}

// FORBIDDEN
export function ServerComponentWithAnimation() {
  return (
    <motion.div> // Server Component cannot use Framer Motion
      Content
    </motion.div>
  );
}
```

## **TYPESCRIPT TYPING MANDATES**

### **Strict Type Enforcement**
**REQUIREMENT**: ALL component props MUST be strictly typed with TypeScript interfaces.

**STRICTLY FORBIDDEN**:
- ANY type usage under any circumstances
- Implicit any types through missing type annotations
- Type assertions (as any) to bypass type checking
- Untyped props parameters in component functions

**MANDATORY**:
- ALL component props MUST have explicit TypeScript interfaces
- ALL functions MUST have explicit return type annotations
- ALL imported components MUST be properly typed
- ALL event handlers MUST use proper event types

**TYPE IMPLEMENTATION PATTERN**:
```typescript
// CORRECT
interface ButtonProps {
  children: React.ReactNode;
  variant: "primary" | "secondary";
  onClick: () => void;
  disabled?: boolean;
}

export function Button({ children, variant, onClick, disabled }: ButtonProps) {
  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      className={`btn-${variant}`}
    >
      {children}
    </button>
  );
}

// FORBIDDEN
export function Button(props: any) {
  return <button {...props}>Button</button>;
}

// FORBIDDEN
export function Button({ children, onClick }) { // Missing types
  return <button onClick={onClick}>{children}</button>;
}
```

### **Component Typing Standards**
**MANDATORY**:
- Component props interfaces MUST be exported for reuse
- Optional props MUST use proper optional syntax (?:)
- Union types MUST be used for variant props
- React.ReactNode MUST be used for children props

**STRICTLY FORBIDDEN**:
- Generic object types (Record<string, any>) for props
- Missing type annotations for destructured props
- Type casting to bypass strict typing requirements

## **ENFORCEMENT AND COMPLIANCE**

**VIOLATION CONSEQUENCES**:
- Automatic build failure for any type usage
- Code review rejection for styling violations
- Mandatory refactoring for animation performance issues
- Linting rules to enforce strict TypeScript compliance

**APPROVAL REQUIREMENTS**:
- All new components must pass strict TypeScript compilation
- All styling must be verifiable as Tailwind-only
- All animations must use Framer Motion exclusively
- All theme switching must use next-themes patterns
