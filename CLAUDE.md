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