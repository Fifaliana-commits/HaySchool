# Hay School Constitution
An educational platform for Malagasy children to learn through interactive, gamified experiences.

## Core Principles

### I. Child-First Design (NON-NEGOTIABLE)
Every feature must prioritize child safety, accessibility, and educational value. Content must be age-appropriate, culturally relevant for Malagasy children, and promote positive learning experiences. All designs must pass child psychology and pedagogy reviews.

### II. Multilingual Excellence
Platform must support French as primary language with Malagasy cultural context. All content must be culturally appropriate and include Malagasy cultural elements. Language learning must be natural and contextual, not forced.

### III. Gamification-Driven Learning
Learning must be engaging through game mechanics, progress tracking, and rewards. Progress bars, achievements, and interactive elements must motivate continuous learning. Assessment must be formative, not punitive.

### IV. Offline-First Architecture
Platform must work primarily offline with optional online features. Core learning content must be accessible without internet. Online features (leaderboards, parental controls) should enhance but not be required for learning.

### V. Progressive Web App Standards
Must follow PWA best practices for mobile-first design. Fast loading, responsive design, and smooth interactions are mandatory. Must work seamlessly on low-end devices common in Madagascar.

### VI. Data Privacy & Safety
All user data must be protected with strict privacy controls. No tracking without explicit consent. Content must be safe for children with no external links or advertisements.

### VII. Modular Subject Architecture
Each subject must be independently maintainable with consistent learning patterns. Subjects can be added/removed without affecting others. Content structure must be standardized across all subjects.

## Educational Standards

### Content Quality Requirements
- All educational content must align with Malagasy curriculum standards
- Content must be reviewed by qualified educators
- Interactive elements must reinforce learning objectives
- Assessment must provide immediate, constructive feedback

### Accessibility Standards
- Must comply with WCAG 2.1 AA standards
- Support for screen readers and assistive technologies
- High contrast mode for visually impaired users
- Simple language appropriate for primary school children

### Performance Standards
- Page load time < 3 seconds on 2G connections
- Quiz responses < 200ms
- Offline content caching for entire subjects
- Battery-efficient animations and interactions

## Development Workflow

### Code Review Requirements
- All code must be reviewed by at least one team member
- Educational content changes require educator approval
- Security-related changes require security review
- Performance changes must include benchmarks

### Testing Gates
- Unit tests for all interactive components
- Integration tests for subject modules
- Accessibility testing for all new features
- Performance testing on target devices

### Deployment Approval Process
- Development → Staging → Production pipeline
- Automated testing must pass before deployment
- Manual testing by educators required for content changes
- Rollback plan must be documented for each deployment

## Governance

Constitution supersedes all other practices. Amendments require:
1. Proposal with educational impact assessment
2. Review by education specialists
3. Team consensus and documentation
4. Implementation plan with migration strategy

All PRs/reviews must verify compliance with child safety and educational standards. Complexity must be justified by educational value. Use CLAUDE.md for runtime development guidance.

**Version**: 1.0.0 | **Ratified**: 2025-09-16 | **Last Amended**: 2025-09-16