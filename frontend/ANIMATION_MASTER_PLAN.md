# Master Animation & Transition Implementation Plan

This document outlines the step-by-step implementation for transforming the website into a continuous cinematic portfolio for a Cloud Engineer & Full-Stack Developer. 

## Tech Stack & Global Setup
- **Lenis:** Smooth momentum scroll (already implemented in `SmoothScrollProvider` but needs tweaking for sections).
- **Framer Motion:** Layout transitions, in-view animations, magnetic effects, text reveals.
- **Three.js / React Three Fiber:** Earth model revelation, particles, lines connecting network nodes.
- **GSAP:** Complex scroll-triggered timeline animations (if Framer Motion `useScroll` isn't sufficient for the continuous Earth zooming/transition).

## Section Breakdown & Implementation Strategy

### 1. Global Setup (`PageTransition`, `Globals.css`)
- Update background to pure black (`bg-black`).
- Configure global custom cursors (magnetic cursor, custom pointer).

### 2. Header / Navigation (`components/layout/Navbar.tsx`)
- **Initial Load:** Start hidden, animated expanding line from center, reveal glassmorphism navbar.
- **Scroll Behavior:** Dynamic blur, background opacity, shrinking height based on scroll y.
- **Interactions:** Magnetic hover effects using Framer Motion (Framer Motion `useMotionValue` and `useSpring`).

### 3. Hero Section (Space to Earth)
- **Three.js Scene:** Build a realistic Earth model (`components/three/Earth.tsx`).
- **Intro Animation:** Fade in from darkness. Stars/nubula glowing particles.
- **Text Reveal:** Typographic appearance of "Cloud Engineer & Full-Stack Developer".

### 4. Hero → About Transition (The Zoom & Cloud Network)
- **ScrollTrigger/useScroll:** Tie the Three.js camera Z-axis to the scroll position. As user scrolls down, Earth slowly zooms out.
- **Node Network:** Draw connecting lines indicating a cloud network around Earth.

### 5. About Section
- Overlaid on the blurred/dimmed Earth network.
- Floating profile image mask animation.
- Staggered card reveals from various directions.

### 6. Skills Section (The Particle Ecosystem)
- Cloud networks dissolve into particles.
- Particles reform into interactive Skill Cards floating with random Three.js/Framer motion values.
- Parallax reactions on mouse move.

### 7. Statistics → Projects 
- Glowing numbers animate up.
- Project cards rise from the Z-depth using `transform: translateZ`.
- Hover interactions: 3D tilt (e.g., using `react-parallax-tilt` or Framer layout components).

### 8. Experience/Timeline → GitHub → Contact
- A continuously connecting SVG line that traces the user's scroll down the page.
- Connecting certifications -> career paths -> GitHub grid -> Contact form.
- The path dissolves into a glass card at the bottom.

### 9. Footer & Final Scene
- Re-appearance of a miniature Three.js Earth to complete the thematic loop.

---

## Next Steps for Immediate Implementation
1. Refactor `app/page.tsx` to act as the master scroll container.
2. Build the `Header` with Magnetic Hover and Expansion loading effect.
3. Replace existing 3D Background with the `EarthScene` in the Hero section.
