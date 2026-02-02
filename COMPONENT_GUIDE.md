# I-Model Diagnosis Lab - Component Visual Guide

Quick reference for all 7 components with visual descriptions.

## Component Hierarchy

```
App (Phase Manager)
│
├─ INTRO PHASE
│  └─ OpeningDoors
│     ├─ Animated doors (slide out)
│     ├─ Title & subtitle
│     ├─ Description text
│     └─ BEGIN button (violet gradient)
│
├─ PLAYING PHASE
│  └─ DiagnosisGame
│     ├─ Header
│     │  └─ Progress bar with dots & scenario counter
│     │
│     ├─ Game Container (3-column grid)
│     │  ├─ LEFT PANEL (40%)
│     │  │  ├─ ScenarioCard
│     │  │  │  ├─ Title with counter badge
│     │  │  │  └─ Vignette text
│     │  │  └─ FeedbackPanel (conditional)
│     │  │     ├─ Color-coded result message
│     │  │     ├─ Missing I-Modes display
│     │  │     └─ Explanation text
│     │  │
│     │  ├─ CENTER PANEL (20%)
│     │  │  ├─ DiagnosisZone
│     │  │  │  ├─ Circular drop zone
│     │  │  │  ├─ "What's Missing?" label
│     │  │  │  └─ Display of dropped modes
│     │  │  └─ "Drag out to remove" hint
│     │  │
│     │  └─ RIGHT PANEL (40%)
│     │     └─ IModeSelector
│     │        ├─ 2×2 grid of 4 circles
│     │        └─ I-Mode names & colors
│     │
│     └─ Footer
│        └─ Check Answer or Next Scenario button
│
└─ COMPLETE PHASE
   └─ CompletionScreen
      ├─ "Practice Complete" title
      ├─ Score display (X/6)
      ├─ Most frequently missed I-Modes
      ├─ Your biggest challenge
      ├─ Reflection section
      └─ Return to Course button
```

## Component Details

### 1. OpeningDoors

**Visual Layout**
```
┌─────────────────────────────────────────────┐
│                                             │
│           /      ╲    ╱      \            │
│          /        ╲  ╱        \           │
│         │          ╱╲          │          │
│         │   [Door] /  \ [Door]  │          │
│         │    ←      ↓ ↓       →│          │
│          \        ╱  ╲        /           │
│           \      ╱    ╲      /            │
│                                             │
│       I-Model Diagnosis Lab                │
│            PRACTICE MODE                   │
│                                             │
│    Test your ability to recognize           │
│    missing I-Modes in real scenarios       │
│                                             │
│            ┌─────────────┐                 │
│            │   BEGIN     │                 │
│            └─────────────┘                 │
│                                             │
└─────────────────────────────────────────────┘

Background: Dark slate-to-indigo gradient
Doors: Slide out left/right animation
Button: Violet gradient with shadow
```

**Props**: `onOpen` callback
**State**: `isReady` for animation trigger

---

### 2. ScenarioCard

**Visual Layout**
```
┌──────────────────────────────────────────┐
│                                          │
│  The Quick Fix          ┌──────────────┐ │
│                         │  1 of 6      │ │
│                         └──────────────┘ │
│                                          │
│  Mia has a history essay due tomorrow.  │
│  She pastes the essay question into     │
│  ChatGPT, copies the response word-     │
│  for-word into her document, and        │
│  submits it. She got an A, so she       │
│  figures it worked out fine.            │
│                                          │
│                                          │
└──────────────────────────────────────────┘

Colors:
- Background: Semi-transparent dark (rgba(15, 23, 42, 0.6))
- Border: Subtle slate (rgba(148, 163, 184, 0.2))
- Title: Bright slate-100
- Counter: Violet badge
- Text: Slate-200
```

**Props**:
- `scenario`: Scenario object
- `scenarioNumber`: 1-6
- `totalScenarios`: 6

**Animations**: Slide in from left

---

### 3. DiagnosisZone

**Visual Layout**
```
                ┌─────────────────┐
                │ What's Missing? │
                └─────────────────┘
                        │
        ╱───────────────────────────────╲
       ╱                                   ╲
      │                                     │
      │  ┌─────────────────────────────┐  │
      │  │  Drag I-Modes here to       │  │
      │  │  diagnose                   │  │
      │  │                             │  │
      │  │  or if selected:            │  │
      │  │  ┌─────┐    ┌─────┐        │  │
      │  │  │ Int │    │ Inq │        │  │
      │  │  │ e   │    │ u   │        │  │
      │  │  │ n   │    │ i   │        │  │
      │  │  │ a   │    │ r   │        │  │
      │  │  └─────┘    └─────┘        │  │
      │  │                             │  │
      │  └─────────────────────────────┘  │
      │                                     │
       ╲                                   ╱
        ╲───────────────────────────────╱

Colors:
- Default: Dark (rgba(30, 27, 75, 0.5)) with dashed border
- On hover: Violet glow, lighter background, glowing shadow
- Selected circles: Glow with drop shadow
```

**Props**:
- `selectedModes`: string[] (modes in zone)
- `onDragOver`, `onDragLeave`, `onDrop`: handlers
- `isDraggingOver`: boolean

**Animations**:
- Slide in from up
- Glow effects on drag
- Scale in for each mode added

---

### 4. IModeSelector

**Visual Layout**
```
┌───────────────────────────┐
│                           │
│   ┌──────┐    ┌──────┐   │
│   │ I'ty │    │Integ │   │
│   │ Cyan │    │Green │   │
│   │      │    │      │   │
│   └──────┘    └──────┘   │
│   120px        120px      │
│      (gap: 24px)          │
│   ┌──────┐    ┌──────┐   │
│   │Inqui │    │Intui │   │
│   │Amber │    │ Rose │   │
│   │      │    │      │   │
│   └──────┘    └──────┘   │
│                           │
└───────────────────────────┘

Circle Properties:
- Size: 120×120px
- Border-radius: 50% (perfect circle)
- Colors: I-Mode specific
- Shadow: 0 10px 30px rgba(0,0,0,0.3)
- Hover: translateY(-8px), stronger shadow
- Selected: Opacity 60%
```

**Props**:
- `selectedModes`: string[] (to show which are selected)
- `onDragStart`, `onDragEnd`: handlers

**Animations**:
- Slide in from right
- Lift on hover
- Fade out when selected

---

### 5. FeedbackPanel

**Visual Layout (3 States)**

**CORRECT** (Green)
```
┌────────────────────────────────┐
│ ✓ Correct! 2 missing I-Modes   │
│ identified.                    │
│                                │
│ Missing I-Modes:              │
│ [Intentionality] [Inquiry]    │
│                                │
│ Why:                          │
│ Mia skipped Intentionality... │
│ (explanation text)            │
└────────────────────────────────┘
```

**PARTIALLY CORRECT** (Amber)
```
┌────────────────────────────────┐
│ ~ Partially Correct.           │
│   You found 2 of 3.           │
│                                │
│ Missing I-Modes:              │
│ [Intentionality][Integrity]   │
│ [Inquiry]                     │
│                                │
│ Why:                          │
│ (explanation text)            │
└────────────────────────────────┘
```

**INCORRECT** (Rose)
```
┌────────────────────────────────┐
│ ✗ Not quite. Let's look at     │
│   what was missing.            │
│                                │
│ Missing I-Modes:              │
│ [Intentionality]              │
│                                │
│ Why:                          │
│ (explanation text)            │
└────────────────────────────────┘
```

**Colors**:
- Correct border: Emerald-600 (#10b981)
- Partial border: Amber-500 (#f59e0b)
- Incorrect border: Rose-500 (#f43f5e)
- Badges: Match their I-Mode colors
- Background: Consistent dark with subtle tint

---

### 6. DiagnosisGame

**Visual Layout (Full Screen)**
```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  Scenario 1 of 6  ● ● ● ○ ○ ○  (progress indicator)           │
│                                                                 │
│ ┌──────────────────┐  ┌────────────┐  ┌──────────────────────┐│
│ │ Scenario Card    │  │ Diagnosis  │  │ IModeSelector        ││
│ │                  │  │   Zone     │  │                      ││
│ │ The Quick Fix    │  │            │  │  ┌──────┬──────┐    ││
│ │ Title + counter  │  │   Circular │  │  │Intx. │Integ │    ││
│ │                  │  │    Drop    │  │  └──────┴──────┘    ││
│ │ Vignette text    │  │   Target   │  │                      ││
│ │ (3-5 lines)      │  │            │  │  ┌──────┬──────┐    ││
│ │                  │  │ Drag here  │  │  │Inqui │Intui │    ││
│ │ (feedback panel  │  │            │  │  └──────┴──────┘    ││
│ │  appears after   │  │ Shows      │  │                      ││
│ │  checking)       │  │ selected   │  │  Drag out to remove ││
│ │                  │  │ modes      │  │                      ││
│ │                  │  │            │  │                      ││
│ └──────────────────┘  └────────────┘  └──────────────────────┘│
│                                                                 │
│  ┌────────────────────────────────────────────────────────┐  │
│  │ Mia skipped Intentionality (never asked 'what am I...  │  │
│  │ (explanation panel)                                    │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                                 │
│                      [CHECK ANSWER]                            │
│                    (or [NEXT SCENARIO])                        │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

Layout: CSS Grid 3-column
- Left: 40% (card + feedback)
- Center: 20% (diagnosis zone)
- Right: 40% (selectors)
```

**Props**: `onComplete` callback
**State**: 6 pieces (index, modes, checked, dragging, results, draggedMode)

---

### 7. CompletionScreen

**Visual Layout**
```
┌─────────────────────────────────────────┐
│                                         │
│        Practice Complete                │
│                                         │
│  ┌───────────────────────────────────┐ │
│  │              5                    │ │
│  │        of 6 scenarios correct     │ │
│  └───────────────────────────────────┘ │
│                                         │
│  ┌───────────────────────────────────┐ │
│  │  Most Frequently Missing          │ │
│  │  • Inquiry (appeared in 4)        │ │
│  │  • Intuition (appeared in 3)      │ │
│  │  • Integrity (appeared in 3)      │ │
│  └───────────────────────────────────┘ │
│                                         │
│  ┌───────────────────────────────────┐ │
│  │  Your Biggest Challenge           │ │
│  │                                   │ │
│  │  You struggled most with          │ │
│  │  recognizing Inquiry              │ │
│  │  (missed in 2 scenarios)          │ │
│  └───────────────────────────────────┘ │
│                                         │
│  ┌───────────────────────────────────┐ │
│  │ As you return to your own work    │ │
│  │ with AI, remember: the I-Model   │ │
│  │ isn't a checklist to complete—   │ │
│  │ it's a set of questions to keep  │ │
│  │ asking. Which I-Mode do you      │ │
│  │ think you'll need to pay most    │ │
│  │ attention to?                    │ │
│  └───────────────────────────────────┘ │
│                                         │
│         [RETURN TO COURSE]              │
│                                         │
└─────────────────────────────────────────┘

Colors:
- Score box: Violet tint background
- Stat cards: Dark with left borders (color-coded)
- Reflection: Green-tinted border
- Typography: Elegant, thin/light weights
```

**Props**:
- `results`: ScenarioResult[]
- `onReset`: callback

**Animations**: All fade/slide in with staggered delays

---

## Responsive Behavior

### Desktop (>1200px)
```
Left Panel    Center    Right Panel
   40%         20%         40%
────────────────────────────────
```

### Tablet (768-1200px)
```
Left Panel (larger)
Right Panel (larger)
Center Panel
────────────────────────
```

### Mobile (<768px)
```
Single Column:
- Scenario Card
- Diagnosis Zone
- I-Mode Selector
(stacked vertically)
────────────────────────
```

## Color Codes Quick Reference

| Element | Hex | Usage |
|---------|-----|-------|
| Intentionality | #06b6d4 | Cyan circle |
| Integrity | #10b981 | Green circle |
| Inquiry | #f59e0b | Amber circle |
| Intuition | #f43f5e | Rose circle |
| Accent (Violet) | #8b5cf6 | Buttons, progress |
| Accent Light | #a78bfa | Gradient, hovers |
| Dark Background | #0f172a | Base color |
| Dark Secondary | #1e1b4b | Gradient end |
| Text Primary | #f1f5f9 | Headings |
| Text Secondary | #cbd5e1 | Body text |
| Border Subtle | #475569 | Light borders |
| Correct | #10b981 | Green feedback |
| Partial | #f59e0b | Amber feedback |
| Incorrect | #f43f5e | Rose feedback |

## Animation Timings

| Animation | Duration | Timing |
|-----------|----------|--------|
| Door opening | 0.8s | ease-out |
| Component entrance | 0.4-0.5s | ease-out |
| Drag feedback | 0.3s | ease |
| Hover lift | 0.3s | ease |
| Pulse on feedback | 0.6s | ease-out |

---

**For visual design specifications, see DESIGN_SYSTEM.md**

**For component code, see src/components/**
