# E2E BDD Standards - Hyniva Corporate Website

## **DIRECTORY STRUCTURE MANDATES**

### **Test Organization Requirements**
**REQUIREMENT**: ALL E2E tests MUST be organized within `/tests/e2e/` directory structure.

**MANDATORY DIRECTORY STRUCTURE**:
```
tests/e2e/
├── features/              # Gherkin .feature files only
│   ├── authentication/
│   ├── navigation/
│   ├── components/
│   └── user-journeys/
├── step-definitions/      # Step implementation files
│   ├── common/
│   ├── pages/
│   └── helpers/
├── page-objects/         # Page Object Model files
│   ├── HomePage.ts
│   ├── NavbarPage.ts
│   ├── FooterPage.ts
│   └── components/
├── support/              # Test utilities and configurations
│   ├── custom-commands/
│   ├── data-factories/
│   └── test-config.ts
└── fixtures/            # Test data and mock responses
```

**STRICTLY FORBIDDEN**:
- Test files outside `/tests/e2e/` directory
- Mixing Gherkin features with step definitions in same directory
- Page objects in step definitions directories
- Test files in source code directories
- Random test file organization

### **File Separation Protocol**
**REQUIREMENT**: Gherkin features and step definitions MUST be strictly separated.

**MANDATORY SEPARATION**:
- `.feature` files MUST reside exclusively in `/tests/e2e/features/`
- Step definition files MUST reside exclusively in `/tests/e2e/step-definitions/`
- Page objects MUST reside exclusively in `/tests/e2e/page-objects/`
- Test utilities MUST reside exclusively in `/tests/e2e/support/`

**STRICTLY FORBIDDEN**:
- Step definitions in feature files
- Page objects in step definition files
- Test logic in Gherkin features
- Mixed file types in single directories

## **GHERKIN FEATURE STANDARDS**

### **Feature File Requirements**
**REQUIREMENT**: ALL feature files MUST follow BDD best practices and proper Gherkin syntax.

**MANDATORY FEATURE STRUCTURE**:
```gherkin
Feature: [Clear, business-readable feature name]

  As a [user role]
  I want [goal/action]
  So that [benefit/value]

  Scenario: [Specific test case description]
    Given [precondition or context]
    When [action or event]
    Then [expected outcome]
    And [additional condition]
    But [negative condition]
```

**FEATURE FILE NAMING**:
- Use kebab-case: `user-authentication.feature`
- Descriptive and business-focused names
- One feature per file
- Maximum 50 characters in filename

**STRICTLY FORBIDDEN**:
- Technical implementation details in feature descriptions
- Multiple unrelated scenarios in single feature
- UI-specific language in Gherkin steps
- Hardcoded test data in feature files
- Complex conditional logic in Gherkin

### **Scenario Writing Standards**
**REQUIREMENT**: Scenarios MUST be independent, deterministic, and business-focused.

**MANDATORY SCENARIO CHARACTERISTICS**:
- Independent execution (no dependency on other scenarios)
- Deterministic outcomes (same result every run)
- Business language (no technical implementation)
- Single responsibility per scenario
- Clear Given-When-Then structure

**STRICTLY FORBIDDEN**:
- Scenario chains or dependencies
- Random or non-deterministic data
- Multiple "When" steps in single scenario
- Technical assertions in Gherkin
- Hardcoded waits or timeouts in features

## **PAGE OBJECT MODEL MANDATES**

### **POM Structure Requirements**
**REQUIREMENT**: ALL page interactions MUST go through Page Object Model.

**MANDATORY POM STRUCTURE**:
```typescript
export class HomePage {
  // Element selectors
  private readonly heroSection = '[data-testid="hero-section"]';
  private readonly trustBar = '[data-testid="trust-bar"]';
  private readonly navbar = '[data-testid="navbar"]';

  // Page interaction methods
  visit(): void {
    cy.visit('/');
  }

  getHeroTitle(): Cypress.Chainable<string> {
    return cy.get(this.heroSection).find('h1').invoke('text');
  }

  clickTrustBarLogo(logoName: string): void {
    cy.get(this.trustBar).find(`[data-logo="${logoName}"]`).click();
  }

  isNavbarVisible(): Cypress.Chainable<boolean> {
    return cy.get(this.navbar).should('be.visible');
  }
}
```

**MANDATORY POM PRINCIPLES**:
- Single page class per page/component
- Private selectors with public interaction methods
- No assertions in page objects (return Cypress.Chainable)
- Element locators using data-testid attributes
- Methods return chainable commands for fluent API

**STRICTLY FORBIDDEN**:
- Direct Cypress commands in step definitions
- Hardcoded selectors outside page objects
- Assertions or expectations in page objects
- Multiple pages in single page object class
- UI-specific logic leaking to step definitions

### **Element Locator Standards**
**REQUIREMENT**: Element locators MUST follow consistent and maintainable patterns.

**MANDATORY LOCATOR TYPES**:
- `data-testid` for test-specific elements
- Semantic HTML selectors (role, aria-label)
- CSS classes for styling-related elements
- ID attributes only for unique elements

**STRICTLY FORBIDDEN**:
- XPath selectors (except absolutely necessary)
- Complex CSS selectors with deep nesting
- Auto-generated selectors (Cypress recorder)
- Brittle selectors based on text content
- Positional selectors (nth-child, first, last)

## **TIMEOUT AND WAITING MANDATES**

### **Dynamic Waiting Requirements**
**REQUIREMENT**: Tests MUST use dynamic waits instead of hardcoded timeouts.

**MANDATORY WAITING STRATEGIES**:
```typescript
// CORRECT - Dynamic waits
cy.get('[data-testid="loading-spinner"]').should('not.exist');
cy.get('[data-testid="content"]').should('be.visible');
cy.url().should('include', '/expected-path');

// FORBIDDEN - Hardcoded timeouts
cy.wait(5000); // NEVER USE
cy.wait(3000); // NEVER USE
```

**MANDATORY WAITING PATTERNS**:
- Wait for elements to be visible/hidden
- Wait for URL changes
- Wait for network requests to complete
- Wait for text content to appear
- Wait for element state changes

**STRICTLY FORBIDDEN**:
- Fixed duration waits (cy.wait())
- Arbitrary timeout values
- Sleep or delay functions
- Time-based waiting strategies
- Assumptions about load times

### **Network Request Handling**
**REQUIREMENT**: Network-dependent tests MUST handle asynchronous operations properly.

**MANDATORY NETWORK PATTERNS**:
```typescript
// Intercept and wait for API calls
cy.intercept('GET', '/api/products').as('getProducts');
cy.visit('/products');
cy.wait('@getProducts').its('response.statusCode').should('eq', 200);

// Wait for specific network conditions
cy.intercept('POST', '/api/contact').as('submitContact');
cy.get('[data-testid="contact-form"]').submit();
cy.wait('@submitContact').should('have.property', 'status', 200);
```

**STRICTLY FORBIDDEN**:
- Assuming network request completion
- Fixed waits for network responses
- Ignoring failed network requests
- Unhandled promise rejections
- Race conditions in test execution

## **TEST COVERAGE MANDATES**

### **Negative and Edge Case Testing**
**REQUIREMENT**: ALL critical user flows MUST have comprehensive negative and edge case coverage.

**MANDATORY NEGATIVE TEST SCENARIOS**:
- Empty form submissions
- Invalid data formats (email, phone, URLs)
- Missing required fields
- Malformed API responses
- Network failure conditions
- Unauthorized access attempts
- Boundary value testing (min/max limits)

**MANDATORY EDGE CASE SCENARIOS**:
- Empty arrays and null values
- Special characters and Unicode
- Very long text inputs
- Rapid user interactions
- Browser back/forward navigation
- Tab order and accessibility
- Mobile responsive breakpoints

**STRICTLY FORBIDDEN**:
- Only happy path testing
- Assumed valid user input
- Ignoring error conditions
- Single data set testing
- Skipping edge case scenarios

### **Comprehensive Coverage Requirements**
**REQUIREMENT**: Test suites MUST achieve comprehensive coverage of user interactions.

**MANDATORY COVERAGE AREAS**:
- All navigation paths and menu interactions
- Form validation and submission flows
- Component state changes and user interactions
- Responsive design across breakpoints
- Accessibility features (keyboard navigation, screen readers)
- Performance critical user paths
- Error handling and recovery scenarios

**COVERAGE METRICS**:
- Minimum 80% statement coverage for critical paths
- All user-facing components must have E2E coverage
- All form validations must be tested
- All navigation flows must be covered
- All error states must be verified

## **TEST DATA MANAGEMENT**

### **Data Factory Requirements**
**REQUIREMENT**: Test data MUST be generated through factories, not hardcoded values.

**MANDATORY DATA PATTERNS**:
```typescript
// Data factory for test data
export class UserDataFactory {
  static valid(): User {
    return {
      name: 'Test User',
      email: 'test@example.com',
      phone: '+1234567890'
    };
  }

  static invalidEmail(): User {
    return {
      ...this.valid(),
      email: 'invalid-email'
    };
  }

  static empty(): Partial<User> {
    return {};
  }
}
```

**STRICTLY FORBIDDEN**:
- Hardcoded test data in step definitions
- Random data generation without reproducibility
- Test data in Gherkin feature files
- Shared mutable test state
- Environment-specific test data

## **ENFORCEMENT AND COMPLIANCE**

### **Test Quality Gates**
**REQUIREMENT**: All E2E tests must pass quality gates before merge.

**MANDATORY QUALITY CRITERIA**:
- All tests must be flaky-free
- Tests must run in isolation
- Proper cleanup and teardown
- No hardcoded waits or timeouts
- Comprehensive error handling
- Clear failure messages

**STRICTLY FORBIDDEN**:
- Flaky or intermittent test failures
- Tests with side effects
- Missing test cleanup
- Unclear failure messages
- Tests dependent on execution order
