# I-Model Diagnosis Lab - Design System

This document describes the visual language and design principles of the I-Model Diagnosis Lab application.

## Design Philosophy

The I-Model Diagnosis Lab is designed as a "sibling" to the I-Model Explainer. It shares the same visual identity while using violet as an accent color to distinguish it as the "practice" experience. The design emphasizes clarity, focus, and meaningful interaction.

## Color Palette

### Primary I-Mode Colors
These colors are consistent across both the Explainer and Diagnosis Lab:

| I-Mode | Color | Hex | Usage |
|--------|-------|-----|-------|
| Intentionality | Cyan | #06b6d4 | Intentionality mode circle |
| Integrity | Emerald Green | #10b981 | Integrity mode circle |
| Inquiry | Amber | #f59e0b | Inquiry mode circle |
| Intuition | Rose/Pink | #f43f5e | Intuition mode circle |

### Background
- **Gradient**: Linear from `#0f172a` (dark slate) to `#1e1b4b` (indigo)
- Applied to: Body, all full-screen containers
- Creates depth and sophistication

### Neutral Palette
Used for text, borders, and secondary elements:

| Use | Color | Hex | Notes |
|-----|-------|-----|-------|
| Primary Text | Slate-100 | #f1f5f9 | Main headings, body text |
| Secondary Text | Slate-200 | #cbd5e1 | Supporting text, descriptions |
| Tertiary Text | Slate-400 | #94a3b8 | Labels, hints |
| Muted Text | Slate-500 | #64748b | Disabled states, minor labels |
| Subtle Border | Slate-600 | #475569 | Borders with low contrast |

### Accent Color (Practice/Violet)
Distinguishes this app from the Explainer:

| Use | Color | Hex | Notes |
|-----|-------|-----|-------|
| Primary Accent | Violet-500 | #8b5cf6 | Buttons, progress, highlights |
| Accent Hover | Violet-400 | #a78bfa | Lighter shade for gradients |
| Accent Background | Violet-500/10% | rgba(139, 92, 246, 0.1) | Subtle background tints |
| Accent Border | Violet-500/30% | rgba(139, 92, 246, 0.3) | Borders with medium contrast |

### Feedback States
For communicating results:

| State | Color | Hex | Usage |
|-------|-------|-----|-------|
| Correct | Emerald-600 | #10b981 | Green feedback for correct answers |
| Partial | Amber-500 | #f59e0b | Yellow/amber for partially correct |
| Incorrect | Rose-500 | #f43f5e | Rose/pink for incorrect answers |

## Typography

### Font Stack
```css
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
  "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
  "Helvetica Neue", sans-serif;
```

This system font stack ensures:
- Optimal rendering across all operating systems
- No font loading delays
- Consistent appearance across platforms
- Professional, accessible appearance

### Font Weights

| Weight | Value | Usage |
|--------|-------|-------|
| Thin | 100 | Large display headings |
| Light | 300 | Primary text, body content |
| Normal | 400 | Descriptions, standard text |
| Medium | 500 | Labels, badges |
| Semibold | 600 | Buttons, section headers |
| Bold | 700 | (Reserved for emphasis) |

### Font Sizes

| Usage | Size | Line Height | Letter Spacing |
|-------|------|-------------|-----------------|
| Display Title | 3.5rem | 1 | -0.025em |
| Large Heading | 2.5rem | 1.2 | -0.02em |
| Section Title | 1.5rem | 1.3 | -0.01em |
| Subsection | 1.25rem | 1.4 | -0.005em |
| Body Text | 1rem | 1.6 | 0.01em |
| Small Text | 0.875rem | 1.5 | 0.02em |
| Tiny Text | 0.75rem | 1.4 | 0.05em |

### Letter Spacing Examples
- Wide spacing (0.05em): Labels, buttons, section headers (creates airy feel)
- Normal spacing (0.01em): Body text, descriptions
- Tight spacing (-0.01em): Large headings (creates cohesion)

## Component Styling

### Buttons

**Primary Button (Check Answer / Next Scenario)**
```css
background: linear-gradient(135deg, #8b5cf6, #a78bfa);
padding: 0.875rem 2rem;
font-size: 0.875rem;
font-weight: 600;
letter-spacing: 0.05em;
text-transform: uppercase;
border-radius: 0.5rem;
box-shadow: 0 8px 20px rgba(139, 92, 246, 0.3);
```

States:
- Default: Full opacity
- Hover: Translate up 2px, stronger shadow
- Active: No translation
- Disabled: 50% opacity, not-allowed cursor

### Cards

**Scenario Card**
```css
background: rgba(15, 23, 42, 0.6);
border: 1px solid rgba(148, 163, 184, 0.2);
border-radius: 0.75rem;
padding: 2rem;
backdrop-filter: blur(10px);
```

Provides:
- Semi-transparent background for depth
- Subtle border for definition
- Blur effect for layering
- Consistent padding

### Diagnosis Zone

**Circle Container**
```css
width: 280px;
height: 280px;
border: 2px dashed rgba(148, 163, 184, 0.4);
border-radius: 50%;
background: rgba(30, 27, 75, 0.5);
```

Hover/Active State:
```css
border-color: #8b5cf6;
background: rgba(139, 92, 246, 0.1);
box-shadow: 0 0 40px rgba(139, 92, 246, 0.2);
```

### I-Mode Circles

**Default**
```css
width: 120px;
height: 120px;
border-radius: 50%;
box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
```

Hover:
- Transform: `translateY(-8px)`
- Shadow: `0 15px 40px rgba(0, 0, 0, 0.4)`

Selected State:
- Opacity: 60%

## Spacing System

Used consistently throughout for rhythm and alignment:

| Size | Value | Usage |
|------|-------|-------|
| xs | 0.25rem (4px) | Tiny gaps |
| sm | 0.5rem (8px) | Small padding |
| md | 1rem (16px) | Default spacing |
| lg | 1.5rem (24px) | Section spacing |
| xl | 2rem (32px) | Large sections |
| 2xl | 3rem (48px) | Major sections |

## Shadow Depths

| Depth | CSS | Usage |
|-------|-----|-------|
| Elevation 1 | `0 4px 12px rgba(0, 0, 0, 0.2)` | Cards, badges |
| Elevation 2 | `0 8px 20px rgba(139, 92, 246, 0.3)` | Buttons, interactive |
| Elevation 3 | `0 10px 30px rgba(0, 0, 0, 0.3)` | Floating elements |
| Elevation 4 | `0 15px 40px rgba(0, 0, 0, 0.4)` | Hover states |

## Animations

### Timing Functions
- Entrance: `cubic-bezier(0.4, 0, 0.2, 1)` - Smooth ease-out
- Hover: `cubic-bezier(0.4, 0, 0.2, 1)` - Responsive feel
- Exit: `ease-out` - Quick departure

### Animation Durations
| Duration | Value | Usage |
|----------|-------|-------|
| Quick | 0.3s | Hover interactions |
| Standard | 0.4-0.5s | Component entrance |
| Slow | 0.6-0.8s | Page transitions |

### Standard Animations

**Fade In**
```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
```
Usage: General content appearance

**Slide In (variants)**
```css
/* Slide from left */
@keyframes slideInLeft {
  from { opacity: 0; transform: translateX(-30px); }
  to { opacity: 1; transform: translateX(0); }
}

/* Slide from right */
@keyframes slideInRight {
  from { opacity: 0; transform: translateX(30px); }
  to { opacity: 1; transform: translateX(0); }
}

/* Slide from up */
@keyframes slideInUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}
```
Usage: Directional content entrance

**Scale In**
```css
@keyframes slideInScale {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
```
Usage: Centered content with emphasis

**Pulse**
```css
@keyframes pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(139, 92, 246, 0.7); }
  50% { box-shadow: 0 0 0 20px rgba(139, 92, 246, 0); }
}
```
Usage: Attention-drawing feedback

## Accessibility Considerations

### Color Contrast
- Text on background: 4.5:1 ratio (WCAG AA)
- Interactive elements: Distinguishable by shape + color

### Focus States
- Keyboard navigation supported
- Clear focus indicators
- Visible focus rings on buttons

### Motion
- Animations respect `prefers-reduced-motion`
- No autoplay of distracting effects
- User-initiated animations only

### Typography
- Minimum font size: 14px (0.875rem)
- Line height: Minimum 1.4 for readability
- Color contrast: 4.5:1 for body text

## Responsive Design

### Breakpoints
| Device | Width | Grid Layout |
|--------|-------|------------|
| Mobile | <768px | Single column (stacked) |
| Tablet | 768-1200px | 2-3 columns (adjusted) |
| Desktop | >1200px | 3 columns (full) |

### Mobile Adjustments
- Reduced padding on small screens
- Larger touch targets (44px minimum)
- Simplified navigation
- Larger text sizes for readability

## Dark Mode Considerations

The app uses a consistent dark theme throughout. Light mode is not implemented but could be added by:
1. Creating a light color palette
2. Using CSS variables for colors
3. Adding a theme toggle
4. Persisting preference to localStorage

## Usage Examples

### Creating a New Component

```tsx
// Component with proper styling
import React from 'react';
import './MyComponent.css';

const MyComponent: React.FC<MyComponentProps> = (props) => {
  return <div className="my-component">Content</div>;
};

export default MyComponent;
```

```css
/* CSS following the design system */
.my-component {
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: 0.75rem;
  padding: 2rem;
  font-size: 1rem;
  font-weight: 300;
  line-height: 1.6;
  letter-spacing: 0.01em;
  color: #cbd5e1;
}
```

### Using I-Mode Colors

```tsx
const I_MODE_COLORS: Record<string, string> = {
  Intentionality: "#06b6d4",
  Integrity: "#10b981",
  Inquiry: "#f59e0b",
  Intuition: "#f43f5e",
};

// Usage
<div style={{ backgroundColor: I_MODE_COLORS['Intentionality'] }}>
  Cyan circle
</div>
```

## Migration Guide (from Explainer)

If updating from the I-Model Explainer:

1. **Color Variables**: Extract to shared CSS/TypeScript file
2. **Typography**: Keep existing font stack
3. **Spacing**: Use the standard spacing scale
4. **Components**: Adapt existing component patterns
5. **Animations**: Reuse animation keyframes

## Future Enhancements

Potential design improvements:
- Light mode toggle
- Custom theme builder
- Accessibility dashboard
- Design tokens export (CSS/JSON)
- Component library documentation
- Interactive design system preview
