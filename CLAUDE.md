# Hay School - Runtime Development Guidance

## Project Overview
Hay School is an educational platform designed specifically for Malagasy children aged 6-12, providing interactive learning experiences across 6 core subjects: Mathematics, French, Sciences, History, Geography, and English.

## Constitution (NON-NEGOTIABLE PRINCIPLES)

### Article I: Child-First Design
- **PRIMARY CONSTRAINT**: Every feature must prioritize child safety, accessibility, and educational value
- **AGE CONSIDERATION**: Content must be appropriate for children aged 6-12
- **CULTURAL CONTEXT**: All content must reflect Malagasy culture and context
- **SAFETY FIRST**: No external links, advertisements, or unsafe content

### Article II: Multilingual Excellence
- **PRIMARY LANGUAGE**: French as the main interface language
- **CULTURAL INTEGRATION**: Malagasy cultural elements in all content
- **NATURAL LEARNING**: Language learning through context, not forced drills
- **CULTURAL SENSITIVITY**: Content must respect Malagasy values and traditions

### Article III: Gamification-Driven Learning
- **ENGAGEMENT FOCUS**: Learning through game-like interactions
- **PROGRESS TRACKING**: Visual indicators of advancement and achievements
- **POSITIVE REINFORCEMENT**: Encouraging feedback for all interactions
- **MOTIVATIONAL DESIGN**: Elements that encourage persistence and confidence

### Article IV: Offline-First Architecture
- **CORE FUNCTIONALITY**: Primary learning features work without internet
- **CONTENT CACHING**: Lessons and resources cached for offline access
- **GRADUAL ENHANCEMENT**: Online features enhance but don't require connectivity
- **PERFORMANCE PRIORITY**: Optimized for low-bandwidth, low-end devices

### Article V: Progressive Web App Standards
- **MOBILE-FIRST**: Responsive design for small screens and touch interfaces
- **PERFORMANCE**: < 3 second load times on 2G connections
- **ACCESSIBILITY**: WCAG 2.1 AA compliance with screen reader support
- **DEVICE COMPATIBILITY**: Works on devices common in Madagascar

### Article VI: Data Privacy & Safety
- **ZERO EXTERNAL TRACKING**: No analytics, ads, or third-party data collection
- **CHILD-SAFE CONTENT**: All content appropriate for children under 13
- **MINIMAL DATA**: Only essential learning progress data stored
- **PARENT CONTROL**: Optional parental monitoring features

### Article VII: Modular Subject Architecture
- **INDEPENDENT MODULES**: Each subject maintainable separately
- **CONSISTENT PATTERNS**: Standardized learning structure across subjects
- **SCALABILITY**: Easy addition/removal of subjects without affecting others
- **QUALITY ASSURANCE**: Consistent educational standards across all modules

## Current Specifications

### 001-hay-school-core: Core Platform Architecture
- 6-subject educational platform (Math, French, Sciences, History, Geography, English)
- Child profile management and progress tracking
- Interactive learning with immediate feedback
- Offline-first with optional online features
- Cultural relevance for Malagasy children

### 002-interactive-learning-system: Interactive Learning System
- Multiple interactive formats (visual, auditory, kinesthetic)
- Immediate encouraging feedback for all actions
- Adaptive difficulty based on performance
- Progress indicators and achievement celebrations
- Contextual help when children struggle

### 003-chatbot-assistance-system: Chatbot Assistance System
- Contextual help related to current learning activities
- Age-appropriate language and explanations
- Cultural context in responses and examples
- Multiple interaction modes (text, voice, visual)
- Learning pattern tracking for personalized support

## Development Guidelines

### Code Quality Standards
- **Child-Safe Code**: All interactions must be safe and appropriate
- **Performance First**: Optimized for low-end devices and slow connections
- **Accessibility Priority**: WCAG 2.1 AA compliance mandatory
- **Cultural Respect**: Content must reflect Malagasy values

### Testing Requirements
- **Child Psychology Review**: All new features reviewed by child development specialists
- **Cultural Appropriateness**: Content validated by Malagasy educators
- **Performance Testing**: Tested on target devices (2G, low-end smartphones)
- **Accessibility Testing**: Screen reader and keyboard navigation verified

### Content Standards
- **Educational Alignment**: All content aligned with Malagasy curriculum
- **Age Appropriateness**: Content suitable for 6-12 year olds
- **Cultural Relevance**: Examples and contexts reflect Malagasy culture
- **Language Quality**: Simple, encouraging French appropriate for children

## Implementation Priorities

### HIGH PRIORITY
1. Child safety and content appropriateness
2. Offline functionality for core learning
3. Performance optimization for target devices
4. Accessibility compliance
5. Cultural relevance and appropriateness

### MEDIUM PRIORITY
1. Interactive learning elements
2. Progress tracking and gamification
3. Chatbot assistance system
4. Parent monitoring features
5. Multi-device compatibility

### LOW PRIORITY
1. Advanced analytics (if any)
2. Social features
3. Advanced customization options
4. Premium features

## Quality Gates

### Pre-Implementation
- Constitution compliance verified
- Child safety assessment completed
- Educational value confirmed
- Cultural appropriateness reviewed

### During Development
- Daily constitution compliance checks
- Child-safe content validation
- Performance testing on target devices
- Accessibility testing with screen readers

### Pre-Release
- Full educational content review
- Child psychology expert validation
- Performance optimization verification
- Cultural sensitivity final review

## Emergency Procedures

### Child Safety Violation
If any feature is found to potentially harm children:
1. IMMEDIATE FEATURE DISABLEMENT
2. Constitution Article I compliance audit
3. Child psychology expert consultation
4. Complete feature redesign or removal

### Performance Issues
If performance targets not met:
1. Performance audit against Article V requirements
2. Code optimization for target devices
3. Content size reduction for 2G networks
4. Feature prioritization and simplification

### Cultural Inappropriateness
If content found culturally inappropriate:
1. Immediate content removal
2. Cultural sensitivity expert consultation
3. Content redesign with Malagasy educators
4. Cultural context validation process

## Success Metrics

### Learning Outcomes
- 70% improvement in subject comprehension
- 80% engagement rate during learning activities
- 60% completion rate for full curricula
- Positive feedback from 75% of child users

### Technical Performance
- < 3 second page load times on 2G
- < 200ms response time for interactions
- 95% uptime for online features
- Full offline functionality

### User Experience
- 90% of children find content enjoyable
- 85% of parents report positive learning impact
- 95% accessibility compliance score
- 100% child-safe content rating

---

*This guidance supersedes all other development practices. Constitution principles are NON-NEGOTIABLE and must be verified before any implementation begins.*
