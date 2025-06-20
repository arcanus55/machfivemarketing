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

## Branch Strategy
- **Main branch**: `gh-pages` (also serves as production)
- **Deployment**: Automatic via GitHub Pages when pushing to `gh-pages`
- **Domain**: Custom domain configured via CNAME file