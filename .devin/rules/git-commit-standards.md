# Git Commit Standards - Hyniva Corporate Website

## **BRANCHING MANDATES**

### **Branch Naming Conventions**
**REQUIREMENT**: ALL branches MUST follow strict naming conventions.

**MANDATORY FORMATS**:
- `feature/feature-name` - New features and functionality
- `hotfix/issue-description` - Critical bug fixes for production
- `bugfix/issue-description` - Non-critical bug fixes
- `refactor/component-name` - Code refactoring without functionality changes
- `docs/documentation-type` - Documentation updates only
- `test/test-scope` - Test additions or modifications

**STRICTLY FORBIDDEN**:
- Generic branch names (master, develop, staging)
- Personal branch names (john-feature, mary-bugfix)
- Random or cryptic branch names
- Branches with spaces or special characters
- Branches longer than 50 characters

**BRANCH NAMING EXAMPLES**:
```
feature/aira-product-page
hotfix/navbar-mobile-menu-crash
bugfix/footer-link-validation
refactor/hero-carousel-performance
docs/api-documentation
test/e2e-checkout-flow
```

### **Protected Branch Enforcement**
**REQUIREMENT**: Direct commits to protected branches are STRICTLY FORBIDDEN.

**PROTECTED BRANCHES**:
- `main` - Production-ready code only
- `develop` - Integration branch (if used)
- `staging` - Pre-production environment

**MANDATORY**:
- ALL changes MUST go through pull requests
- PRs MUST have at least one approval before merge
- PRs MUST pass all automated checks
- Branch protection rules MUST be enforced in GitHub

**STRICTLY FORBIDDEN**:
- Direct pushes to main/develop/staging branches
- Force pushes to any protected branch
- Merge commits without PR approval
- Bypassing branch protection rules

## **COMMIT STANDARDS**

### **Atomic Commit Requirements**
**REQUIREMENT**: Each commit MUST represent a single logical unit of work.

**MANDATORY COMMIT CHARACTERISTICS**:
- Single feature or bug fix per commit
- Atomic and independently testable changes
- No mixing of unrelated changes in single commit
- Commits must pass all tests independently
- Commits must build successfully in isolation

**STRICTLY FORBIDDEN**:
- Large commits with multiple features
- "Work in progress" or temporary commits
- Commits that break the build
- Commits with unrelated file changes
- Merge commits without proper justification

### **Commit Message Format**
**REQUIREMENT**: ALL commit messages MUST follow conventional commit format.

**MANDATORY FORMAT**:
```
type(scope): description

[optional body]

[optional footer]
```

**COMMIT TYPES**:
- `feat` - New feature
- `fix` - Bug fix
- `refactor` - Code refactoring
- `style` - Code style changes (formatting, missing semicolons)
- `docs` - Documentation changes
- `test` - Test additions or modifications
- `chore` - Build process or dependency changes

**COMMIT MESSAGE EXAMPLES**:
```
feat(navbar): add mobile responsive menu
fix(hero): resolve carousel animation stutter
refactor(components): extract button to shared component
docs(readme): update installation instructions
test(e2e): add checkout flow coverage
```

**STRICTLY FORBIDDEN**:
- Vague commit messages ("update files", "fix stuff")
- Messages without proper type prefix
- Messages longer than 72 characters for description
- Lowercase first letter in description
- Period at end of description line

## **FILE TRACKING MANDATES**

### **AI Scratchpad Prohibition**
**REQUIREMENT**: AI-generated scratch files and temporary tracking files are STRICTLY FORBIDDEN.

**STRICTLY FORBIDDEN FILES**:
- `.ai-scratchpad*` files
- `.temp*` or `.tmp*` files
- `scratch*` or `draft*` files
- `TODO-*` files in root directory
- AI conversation logs or transcripts
- Temporary testing files with generic names

**MANDATORY**:
- Use proper file naming conventions
- Delete temporary files before committing
- Use .gitignore for legitimate temporary files
- Track only production-ready code and documentation

### **Sensitive Information Protection**
**REQUIREMENT**: Sensitive or tracking files MUST be properly excluded from version control.

**MANDATORY GITIGNORE ENTRIES**:
- Environment files (.env, .env.local)
- API keys and credentials
- Build artifacts (.next, dist, build)
- Dependency directories (node_modules)
- IDE configuration files (.vscode/settings.json)
- Log files and temporary data

**STRICTLY FORBIDDEN**:
- Committing API keys or passwords
- Including personal configuration files
- Adding build artifacts to version control
- Tracking large binary files unnecessarily

## **WORKFLOW ENFORCEMENT**

### **Pull Request Requirements**
**REQUIREMENT**: All code changes MUST go through structured pull request process.

**MANDATORY PR REQUIREMENTS**:
- Descriptive title following commit message format
- Detailed description of changes made
- Link to related issues or tickets
- Screenshots for UI changes (if applicable)
- Test coverage evidence for new features
- Performance impact assessment for significant changes

**STRICTLY FORBIDDEN**:
- PRs without proper description
- PRs that don't address specific issues
- PRs with failing automated checks
- PRs containing unrelated changes
- Self-approval of own PRs

### **Merge Strategy Mandates**
**REQUIREMENT**: Merge strategies MUST follow established patterns.

**MANDATORY MERGE APPROACHES**:
- `feat/*` branches: Squash and merge to maintain clean history
- `hotfix/*` branches: Merge commit to preserve hotfix context
- `refactor/*` branches: Squash and merge for clean refactoring history
- `docs/*` branches: Squash and merge for documentation updates

**STRICTLY FORBIDDEN**:
- Rebase merges for shared branches
- Merge commits for feature branches (unless specifically required)
- Force pushes to branches after PR creation
- Merge conflicts resolution without proper testing
