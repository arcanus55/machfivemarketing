# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

MachFive Marketing is a static website hosted on GitHub Pages (www.machfivemarketing.com) built without a build system - using pure HTML, CSS, and JavaScript. The site features PWA capabilities, smooth animations, and a dual-template architecture.

## Development Commands

Since this is a static site with no build process:

- **Local Development**: Open `index.html` in a browser or use a simple HTTP server
- **Testing Changes**: No automated tests - manual browser testing required
- **Deployment**: Push to `gh-pages` branch for automatic GitHub Pages deployment

## Architecture

### Directory Structure
- `/accelerators/` - Service-specific landing pages with separate styling
- `/categories/` & `/tags/` - Content organization system
- `/css/` - External stylesheets (mainly for accelerators section)
- `/js/` - JavaScript libraries and custom scripts
- `/img/` - Image assets
- `/lottie/` - Animation JSON files

### Dual Template System
1. **Main Site** (`index.html`): Modern design with inline CSS using custom properties
2. **Accelerators Section**: Uses external `css/neodigm.css` with different styling approach

Both maintain brand consistency using the same color scheme:
- Primary Orange: `#DD4124`
- Primary Blue: `#34495E` 
- Dark Blue: `#2C3E50`

### Technology Stack
- **Frontend**: Pure HTML5, CSS3, JavaScript (no framework)
- **JavaScript Libraries**: GSAP/ScrollTrigger (animations), Flickity (carousels), D3.js (data viz), THREE.js (3D)
- **PWA**: Service Worker with Workbox 6.5.4, NetworkFirst caching strategy
- **Hosting**: GitHub Pages on `gh-pages` branch

## Development Patterns

### CSS Architecture
- **Main site**: Inline styles with CSS custom properties in `<style>` tags
- **Accelerators**: External stylesheet `css/neodigm.css`
- **Consistency**: Use established CSS variables for colors and spacing

### JavaScript Patterns
- **No Build Process**: Direct file inclusion from `/js/` directory
- **Animations**: Use GSAP with Intersection Observer API for scroll-triggered effects
- **Interactions**: Vanilla JavaScript following existing patterns

### Making Changes

**For Main Site Updates:**
- Edit inline styles within `<style>` tags in `index.html`
- Use existing CSS custom properties for consistency
- Add JavaScript at bottom of HTML file

**For Accelerators Section:**
- Modify `css/neodigm.css` for styling changes
- Update individual HTML files in `/accelerators/` subdirectories
- Maintain brand color consistency

**For New Features:**
- Add new JavaScript libraries to `/js/` directory
- Include via `<script>` tags in HTML
- Follow existing animation patterns using GSAP and Intersection Observer

### Service Worker & PWA
- Uses Workbox with 5-second network timeout
- Cache name: "Neodigm55Cache"
- Automatically updates via `skipWaiting()` and `clients.claim()`
- Update cache version when making significant changes

### Performance Considerations
- Uses `requestAnimationFrame` for smooth animations
- Intersection Observer for efficient scroll-based animations
- WebP image format where supported
- Font preconnection to Google Fonts CDN

## GSAP (GreenSock Animation Platform) Implementation

### Library Setup & Versions

**Current Version**: GSAP 3.12.2

**Implementation Methods**:
- **Local Files**: `/js/gsap.min.js`, `/js/ScrollTrigger.min.js` (used in basic pages)
- **CDN**: Modern implementation uses CDN for latest features
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollToPlugin.min.js"></script>
```

### Plugins Used

1. **ScrollTrigger**: Scroll-based animation triggers

## Scroll-Locked Step-by-Step Experience Implementation

### Overview
The `index-hero-split.html` page implements a scroll-locked, step-by-step experience where users scroll through different sections, each with a left side showing "I need a [changing word]" and a right side with supporting content.

### Key Architecture Components

#### 1. HTML Structure
```html
<div class="experience-container" id="experienceContainer">
    <section class="experience-section" data-step="1">
        <div class="hero-left">
            <div class="need-state-container">
                <div class="need-state-static">I need a</div>
                <div class="need-state-options">
                    <div class="need-state-option" data-step="1">strategy.</div>
                    <div class="need-state-option" data-step="2">market traction.</div>
                    <div class="need-state-option" data-step="3">tools that scale.</div>
                    <div class="need-state-option" data-step="4">smarter stack.</div>
                    <div class="need-state-option" data-step="5">clear way forward.</div>
                </div>
            </div>
        </div>
        <div class="step-supporting">
            <div class="step-supporting-content step-content">
                <!-- Right side content -->
            </div>
        </div>
    </section>
    <!-- Repeat for each step -->
</div>
```

#### 2. CSS Structure
```css
.experience-container {
    scroll-snap-type: y mandatory;
    height: 100vh;
    overflow-y: auto;
    overflow-x: hidden;
    position: relative;
    z-index: 1;
}

.experience-section {
    height: 100vh;
    display: flex;
    position: relative;
    scroll-snap-align: start;
}

.hero-left {
    width: 50%;
    background: var(--m5m-white);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    position: relative;
}

.step-supporting {
    width: 50%;
    background: var(--m5m-gray-light);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    position: relative;
}

/* Left side content is always visible */
.hero-left .need-state-container {
    opacity: 1 !important;
    transform: none !important;
}

/* Options container */
.need-state-options {
    position: relative;
    height: 15rem;
}

/* Individual option styling */
.need-state-option {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 1.75rem;
    line-height: 1.8;
    color: var(--m5m-gray);
    font-weight: 400;
    position: absolute;
    left: 0;
    width: 100%;
    transition: all 0.6s ease;
}

/* Position each option vertically */
.need-state-option[data-step="1"] { top: 0; }
.need-state-option[data-step="2"] { top: 2.5rem; }
.need-state-option[data-step="3"] { top: 5rem; }
.need-state-option[data-step="4"] { top: 7.5rem; }
.need-state-option[data-step="5"] { top: 10rem; }

/* Active option styling */
.need-state-option.active {
    color: var(--m5m-orange);
    font-weight: 700;
    text-shadow: 0 0 20px rgba(221, 65, 36, 0.3);
}
```

#### 3. JavaScript Implementation
```javascript
class StepExperience {
    constructor() {
        this.currentStep = 1;
        this.totalSteps = 6;
        this.isScrolling = false;
        this.isManualNavigation = false;
        this.scrollTimeout = null;
        this.init();
    }

    init() {
        this.container = document.getElementById('experienceContainer');
        this.stepIndicator = document.getElementById('stepIndicator');
        this.scrollHint = document.getElementById('scrollHint');
        this.steps = document.querySelectorAll('.experience-section');
        this.dots = document.querySelectorAll('.step-dot');
        
        this.setupEventListeners();
        this.activateStep(1);
        this.updateScrollHint();
    }

    setupEventListeners() {
        // Scroll event with throttling
        let ticking = false;
        this.container.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        });

        // Step indicator clicks
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.goToStep(index + 1);
            });
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowDown' || e.key === 'PageDown') {
                e.preventDefault();
                this.nextStep();
            } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
                e.preventDefault();
                this.previousStep();
            }
        });
    }

    handleScroll() {
        if (this.isScrolling || this.isManualNavigation) {
            return;
        }

        const scrollTop = this.container.scrollTop;
        const windowHeight = this.container.clientHeight;
        const containerCenter = scrollTop + (windowHeight / 2);

        // Find which step is most visible in the center of the viewport
        let newStep = 1;
        let stepFound = false;
        
        this.steps.forEach((step, index) => {
            const stepTop = step.offsetTop;
            const stepBottom = stepTop + step.offsetHeight;
            
            if (containerCenter >= stepTop && containerCenter < stepBottom) {
                newStep = index + 1;
                stepFound = true;
            }
        });

        if (newStep !== this.currentStep) {
            this.activateStep(newStep);
        }
    }

    activateStep(stepNumber) {
        if (stepNumber < 1 || stepNumber > this.totalSteps) {
            return;
        }

        this.currentStep = stepNumber;
        this.isScrolling = true;

        // Update step indicator
        this.dots.forEach((dot, index) => {
            dot.classList.remove('active', 'completed');
            if (index + 1 < stepNumber) {
                dot.classList.add('completed');
            } else if (index + 1 === stepNumber) {
                dot.classList.add('active');
            }
        });

        // Update active step highlighting
        this.steps.forEach((step, index) => {
            step.classList.remove('active-step');
            if (index + 1 === stepNumber) {
                step.classList.add('active-step');
            }
        });

        // Ensure all step content is visible for the current step
        const currentStep = document.querySelector(`[data-step="${stepNumber}"]`);
        if (currentStep) {
            const stepContents = currentStep.querySelectorAll('.step-content');
            
            stepContents.forEach((content, index) => {
                // Immediately make content visible
                content.style.opacity = '1';
                content.style.transform = 'translateY(0)';
                content.classList.add('active');
            });
            
            // Update the left side highlighting (once, outside the loop)
            this.updateLeftSide(stepNumber);
        }

        // Update scroll hint
        this.updateScrollHint();

        // Reset scrolling flag after animation
        setTimeout(() => {
            this.isScrolling = false;
        }, 1000);
    }

    updateLeftSide(activeStep) {
        // Find ALL options and update them
        const allOptions = document.querySelectorAll('.need-state-option');
        
        allOptions.forEach((option, index) => {
            const optionStep = parseInt(option.getAttribute('data-step'));
            
            if (optionStep === activeStep) {
                // Active option - orange and glowing
                option.style.color = '#DD4124';
                option.style.fontWeight = '700';
                option.style.textShadow = '0 0 20px rgba(221, 65, 36, 0.3)';
                option.classList.add('active');
            } else {
                // Inactive options - gray
                option.style.color = '#aaa';
                option.style.fontWeight = '400';
                option.style.textShadow = 'none';
                option.classList.remove('active');
            }
        });
    }

    goToStep(stepNumber) {
        if (stepNumber < 1 || stepNumber > this.totalSteps) {
            return;
        }

        this.isManualNavigation = true;
        
        const targetScrollTop = (stepNumber - 1) * this.container.clientHeight;
        
        // Immediately activate the step content
        this.activateStep(stepNumber);
        
        this.container.scrollTo({
            top: targetScrollTop,
            behavior: 'smooth'
        });

        // Reset flags after animation completes
        setTimeout(() => {
            this.isScrolling = false;
            this.isManualNavigation = false;
        }, 1000);
    }

    nextStep() {
        if (this.currentStep < this.totalSteps) {
            this.isScrolling = false;
            this.isManualNavigation = false;
            this.goToStep(this.currentStep + 1);
        }
    }

    previousStep() {
        if (this.currentStep > 1) {
            this.isScrolling = false;
            this.isManualNavigation = false;
            this.goToStep(this.currentStep - 1);
        }
    }
}
```

### Critical Implementation Lessons

#### 1. **Left Side Content Visibility**
**Problem**: Left side content was being hidden because it had the `step-content` class, which gets `opacity: 0` applied during step transitions.

**Solution**: 
```css
/* Left side content is always visible */
.hero-left .need-state-container {
    opacity: 1 !important;
    transform: none !important;
}
```

#### 2. **JavaScript Method Call Placement**
**Problem**: `updateLeftSide()` was being called inside a loop, causing it to execute multiple times per step activation.

**Solution**: Move the method call outside the loop:
```javascript
stepContents.forEach((content, index) => {
    // Make content visible
    content.style.opacity = '1';
    content.style.transform = 'translateY(0)';
    content.classList.add('active');
});

// Update the left side highlighting (once, outside the loop)
this.updateLeftSide(stepNumber);
```

#### 3. **Option Targeting Strategy**
**Problem**: Initially tried to target only visible options, but this was unreliable because content visibility changes during transitions.

**Solution**: Target ALL options and update them all:
```javascript
updateLeftSide(activeStep) {
    // Find ALL options and update them
    const allOptions = document.querySelectorAll('.need-state-option');
    
    allOptions.forEach((option, index) => {
        const optionStep = parseInt(option.getAttribute('data-step'));
        
        if (optionStep === activeStep) {
            // Active option - orange and glowing
            option.style.color = '#DD4124';
            option.style.fontWeight = '700';
            option.style.textShadow = '0 0 20px rgba(221, 65, 36, 0.3)';
            option.classList.add('active');
        } else {
            // Inactive options - gray
            option.style.color = '#aaa';
            option.style.fontWeight = '400';
            option.style.textShadow = 'none';
            option.classList.remove('active');
        }
    });
}
```

#### 4. **Scroll Event Management**
**Problem**: Scroll events and manual navigation were interfering with each other.

**Solution**: Use flags to prevent conflicts:
```javascript
this.isScrolling = false;
this.isManualNavigation = false;

handleScroll() {
    if (this.isScrolling || this.isManualNavigation) {
        return;
    }
    // ... rest of scroll logic
}
```

#### 5. **CSS Positioning for Options**
**Problem**: Options were overlapping or not positioned correctly.

**Solution**: Use absolute positioning with specific top values:
```css
.need-state-option[data-step="1"] { top: 0; }
.need-state-option[data-step="2"] { top: 2.5rem; }
.need-state-option[data-step="3"] { top: 5rem; }
.need-state-option[data-step="4"] { top: 7.5rem; }
.need-state-option[data-step="5"] { top: 10rem; }
```

### Common Pitfalls to Avoid

1. **Don't put left side content inside `step-content`** - it will be hidden during transitions
2. **Don't call update methods inside loops** - they'll execute multiple times
3. **Don't try to target only "visible" options** - target all and update all
4. **Don't forget scroll event flags** - manual navigation and scroll events will conflict
5. **Don't use complex selectors** - simple `querySelectorAll('.need-state-option')` works best

### Testing Checklist

When implementing this pattern again:

- [ ] Left side content is always visible (not affected by step transitions)
- [ ] All options are found and updated (check console for option count)
- [ ] Highlighting works on scroll navigation
- [ ] Highlighting works on button navigation
- [ ] Highlighting works on dot navigation
- [ ] No duplicate method calls (check console for multiple executions)
- [ ] Scroll and manual navigation don't conflict
- [ ] Options are properly positioned and don't overlap
2. **ScrollToPlugin**: Smooth scrolling functionality
3. **Core GSAP**: Tweening and timeline functionality

**Plugin Registration**: Always register plugins with `gsap.registerPlugin(ScrollTrigger);`

### Animation Patterns & Techniques

#### 1. Scroll-Triggered Animations
```javascript
// Element reveal pattern
gsap.fromTo(el, 
    { opacity: 0, y: 30 },
    {
        opacity: 1, y: 0, duration: 0.8, ease: "power2.out",
        scrollTrigger: {
            trigger: el, start: "top 80%", end: "bottom 20%",
            toggleActions: "play none none reverse"
        }
    }
);
```

#### 2. Parallax Effects System
```javascript
// Multi-layer parallax with different speeds
gsap.to("#heroBackground", {
    yPercent: -10, ease: "none",
    scrollTrigger: { trigger: "#heroSection", start: "top bottom", end: "bottom top", scrub: 0.8 }
});
```

#### 3. Interactive Mouse Animations
```javascript
// Parallax mouse movement
heroSection.addEventListener('mousemove', (e) => {
    let x = (e.clientX - rect.left) / rect.width - 0.5;
    gsap.to("#heroBackground", { x: x * 15, y: y * 10, duration: 1.2, ease: "power2.out" });
});
```

#### 4. Card Hover Effects
```javascript
// Enhanced 3D card animations
const tl = gsap.timeline({ paused: true });
tl.to(card, { y: -8, scale: 1.02, rotationX: 5, duration: 0.3, ease: "power2.out" });
card.addEventListener('mouseenter', () => tl.play());
card.addEventListener('mouseleave', () => tl.reverse());
```

#### 5. Continuous Ambient Animations
```javascript
// Breathing effects for brand elements
gsap.to("#heroAccent1", {
    scale: 1.1, opacity: 0.8, duration: 4,
    yoyo: true, repeat: -1, ease: "power1.inOut"
});
```

### Performance Optimizations

**CSS Preparations**:
```css
.hero-parallax-layer { will-change: transform; }
```

**Scrub Values**: Use different scrub values for layer smoothness (0.8, 1.2, 1.5, 2.0)

**Cleanup**: Always cleanup event listeners and paused timelines

### Easing Functions Used

- `"power2.out"`: Primary easing for smooth deceleration
- `"power1.inOut"`: Breathing animations
- `"none"`: Linear ScrollTrigger animations
- `"power1.out"`: Subtle interactions

### Architecture Integration

**File-Specific Usage**:
- `index-fastmail-inspired.html`: Advanced GSAP with full parallax system
- `tags/ga4/index.html` & `categories/analytics/index.html`: Basic ScrollTrigger setup
- `index.html`: Uses vanilla JavaScript animations (no GSAP)

**Performance Considerations**:
- Works with `requestAnimationFrame` for smooth performance
- Integrates with Intersection Observer API
- Supports `prefers-reduced-motion` for accessibility

### Best Practices

1. **Plugin Registration**: Always register plugins before use
2. **Timeline Management**: Use paused timelines for interactive animations
3. **Performance**: Utilize `will-change` CSS property for animated elements
4. **Accessibility**: Respect user motion preferences
5. **Progressive Enhancement**: Animations enhance, don't break functionality

### Learning Insights

- **Dual Implementation**: Sophisticated animations for marketing pages, minimal for content pages
- **Brand Integration**: Animations reinforce technology-forward brand positioning
- **Layered Parallax**: Multiple elements with different speeds create depth
- **Interactive Feedback**: Mouse movements and hover states provide engaging user feedback
- **Scrub Optimization**: Fine-tuned scrub values prevent animation lag

## Brand & Visual Design Principles

### Logo Usage Guidelines
- **Desktop Navigation**: Use `Logo_M5M Light Web.png` for web display
- **Mobile Navigation**: Use `Logo_M5T Light Print-16.png` for better readability on small screens
- **Brand Family Logos**: 
  - M5G: `Logo_M5G Light Web.png` (Mach Five Group)
  - M5T: `Logo_M5T Light Web.png` (Mach Five Tech)
  - M5M: `Logo_M5M Light Web.png` (Mach Five Marketing)
- **Logo Sizing**: Standard navigation height of 64px, mobile at 80px for prominence

### Color Psychology & Usage
- **Primary Orange (`#DD4124`)**: Action, urgency, CTAs, emphasis elements
- **Primary Blue (`#34495E`)**: Trust, technology, hero emphasis, branded elements
- **Dark Blue (`#2C3E50`)**: Depth, sophistication, gradients with primary blue
- **Color Combinations**: Avoid using orange and blue together except in gradients

### Typography & Messaging Tone
- **Font Stack**: 'Inter' for clean, modern readability; 'Roboto Condensed' for impact headlines
- **Tone**: Professional yet approachable, data-driven confidence
- **Messaging Pattern**: Problem → Solution → Value
- **Voice**: "We help ambitious companies" (empowering, partnership-focused)

### Visual Hierarchy & Spacing
- **Section Spacing**: 5rem between major sections (avoid template-like 8rem+ spacing)
- **Element Spacing**: 3rem for headers, 2.5rem for sub-elements
- **Mobile Considerations**: Tighter spacing on mobile (4rem sections, 2rem elements)
- **Spacing Philosophy**: Tight, professional spacing avoids "template-like" appearance

### Interactive Elements & Animations
- **Hover States**: Subtle movement (-2px to -8px translateY) with box-shadow enhancement
- **Animation Timing**: 0.3s for interactions, 0.8s for page loads, 1.2s for complex animations
- **Easing**: `cubic-bezier(0.34, 1.56, 0.64, 1)` for bouncy, dynamic feel
- **Scroll Triggers**: Use Intersection Observer for performance, 30% visibility threshold

### Component Styling Patterns

#### Ripped Tape Effect (Service Tags)
```css
.service-tag {
    position: relative;
    background: /* Complex gradient with scratches and scuff marks */;
    box-shadow: /* Inset shadows for depth */;
    transform: rotate(-1deg);
}
.service-tag::before, .service-tag::after {
    clip-path: polygon(/* Jagged edges */);
}
```

#### Mobile-First Navigation
- **Hamburger Position**: Right side for better thumb accessibility
- **Logo Treatment**: Centered on mobile, left-aligned on desktop
- **Menu Slide**: Left-to-right slide animation
- **Dual Logo System**: Separate desktop/mobile logo elements with CSS show/hide

#### Card Layouts
- **Equal Heights**: Use `display: flex; flex-direction: column` on cards
- **CTA Alignment**: `flex: 1` on content, `justify-content: space-between` for bottom-alignment
- **Hover Effects**: Combine scale, shadow, and translateY for depth
- **Responsive Gaps**: `gap: 2rem` for cards, `gap: 4rem` for sections

### Content Structure & Narrative
- **Hero Pattern**: Benefit-focused tagline with blue emphasis words
- **Problem-Solution Flow**: "Marketing is broken" → supporting evidence → clear solution statement
- **Social Proof**: Specific metrics over generic claims ("85% Lead Quality Score" vs "Many satisfied clients")
- **Value Proposition**: "Growth Story" emphasizes client success over company features

### Technical Implementation Notes
- **CSS Architecture**: Inline styles with custom properties for main site consistency
- **Animation Libraries**: GSAP for complex effects, CSS transitions for simple interactions
- **Performance**: Intersection Observer for scroll triggers, `will-change` for animated elements
- **Accessibility**: Respect `prefers-reduced-motion`, maintain focus states

### User Experience Principles
- **Mobile Navigation**: Hamburger on right, logo centered, menu slides from left
- **CTA Strategy**: Single focused action per section, avoid choice paralysis
- **Visual Feedback**: Immediate response to user interactions (hover, click)
- **Progressive Enhancement**: Core functionality works without JavaScript

### Brand Consistency Across MachFive Family
- **Shared Elements**: Color scheme, typography, component patterns
- **Unique Differentiation**: Logo variations, content focus, imagery style
- **Cross-linking**: "More from Mach Five" section with appropriate logos and descriptions
- **Unified Voice**: Consistent messaging tone across all properties

### Code Quality Standards
- **Clean CSS**: Avoid `!important` declarations, use specificity instead
- **Semantic Naming**: `.service-tag`, `.hero-statement`, `.about-logo` over generic classes
- **Maintainable Structure**: Logical grouping, clear comments, consistent indentation
- **Performance**: Minimize DOM manipulation, batch style changes, optimize animations

### Development Workflow Insights
- **Iterative Design**: Small, testable changes over large rewrites
- **User Feedback Integration**: Quick response to spacing, positioning, and functionality requests
- **Brand Consistency**: Always reference existing patterns before creating new ones
- **Mobile-First Approach**: Design for mobile constraints, enhance for desktop

## Branch Strategy
- **Main branch**: `gh-pages` (also serves as production)
- **Deployment**: Automatic via GitHub Pages when pushing to `gh-pages`
- **Domain**: Custom domain configured via CNAME file