# I-Model Diagnosis Lab

A React-based practice application that tests learners' ability to recognize missing I-Modes in real-world AI usage scenarios. This "practice" version complements the I-Model Explainer with an interactive diagnosis interface and immediate feedback.

## Overview

The I-Model Diagnosis Lab features:
- **6 scenario-based challenges** covering common AI use cases
- **Interactive drag-and-drop** interface for selecting missing I-Modes
- **Immediate feedback** with explanations for each scenario
- **Visual consistency** with the I-Model Explainer (dark slate/indigo background, I-Mode colors, refined typography)
- **Progress tracking** across all scenarios
- **Reflection summary** highlighting learning patterns

## Visual Design

### Color Palette
- **I-Modes**: Cyan (#06b6d4), Emerald Green (#10b981), Amber (#f59e0b), Rose/Pink (#f43f5e)
- **Practice Accent**: Violet (#8b5cf6) - distinguishes this from the Explainer
- **Background**: Dark gradient from slate (#0f172a) to indigo (#1e1b4b)

### Typography
- System font stack: `-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`
- Thin/light weights with refined letter-spacing for visual elegance

## Getting Started

### Installation

```bash
npm install
```

### Running the Development Server

```bash
npm start
```

Opens [http://localhost:3000](http://localhost:3000) to view in browser.

### Building for Production

```bash
npm run build
```

## How It Works

### Game Flow

1. **Opening Doors** (Intro)
   - Animated door opening sequence
   - Instructions and "BEGIN" button

2. **Diagnosis Game** (Main)
   - Left panel: Current scenario vignette
   - Center: Drop zone labeled "What's Missing?"
   - Right panel: Four draggable I-Mode circles
   - Top: Progress indicator showing scenario number and completion dots
   - Bottom: "Check Answer" button (appears once I-Modes are selected)

3. **Feedback** (Results)
   - Color-coded feedback (green for correct, amber for partial, rose for incorrect)
   - Explanation of why those modes were missing
   - "Next Scenario" button

4. **Completion Screen** (Summary)
   - Score display (X of 6 correct)
   - Most frequently missed I-Modes
   - Your biggest challenge
   - Reflection prompt for metacognition
   - "Return to Course" button

### Interaction Model

**Dragging I-Modes:**
- Drag any I-Mode circle from the right panel into the center diagnosis zone
- To remove an I-Mode, drag it back out (or drag another I-Mode into the zone to toggle)
- Drop zone highlights when dragging over it
- Multiple I-Modes can be selected if the scenario has multiple missing modes

**Checking Answers:**
- Click "Check Answer" after selecting I-Modes
- Receives immediate feedback with color-coded result
- Sees explanation panel with reasoning
- Moves to next scenario with "Next Scenario" button

## The Six Scenarios

1. **The Quick Fix**: Mia submits AI-generated essay as her own
   - Missing: Intentionality, Integrity, Inquiry

2. **The Trusted Source**: Jake builds presentation around unverified AI output
   - Missing: Inquiry

3. **The Gut Feeling**: Priya dismisses her intuition about AI-generated cover letter
   - Missing: Intuition

4. **The Perfectionist**: Carlos uses AI without questioning why
   - Missing: Intentionality

5. **The Group Project**: Group generates market analysis without critical evaluation
   - Missing: Integrity, Inquiry, Intuition

6. **The Thoughtful Approach**: Emma uses AI strategically with critical evaluation
   - Missing: None (demonstrates full I-Model in action)

## Component Structure

```
App.tsx - Main app container, phase management
├── OpeningDoors.tsx - Intro screen with animated doors
├── DiagnosisGame.tsx - Main game loop and state
│   ├── ScenarioCard.tsx - Displays vignette text
│   ├── DiagnosisZone.tsx - Drop target for I-Modes
│   ├── IModeSelector.tsx - Draggable I-Mode circles
│   ├── FeedbackPanel.tsx - Shows explanation after checking
│   ├── ProgressBar.tsx - Scenario progress indicator
│   └── GameControls.tsx - Check/Next buttons
└── CompletionScreen.tsx - End summary and reflection
```

## Key Features

### Drag and Drop
- Full HTML5 drag-and-drop implementation
- Visual feedback (highlighting, scaling, glow effects)
- Toggle selection by dragging to/from diagnosis zone

### Adaptive Feedback
- Correct: Green highlight, celebration message, explanation
- Partially Correct: Amber highlight, "X of Y" message, explanation
- Incorrect: Rose highlight, gentle guidance, explanation with correct answer

### Progress Tracking
- Visual progress dots showing completed scenarios
- Scenario counter in header
- Summary stats on completion screen

### Responsive Design
- Works on desktop and tablet viewports
- Stacks vertically on smaller screens
- Maintains visual hierarchy and spacing

## Animations

- **Fade In**: Used for panels and content appearing
- **Slide In**: Left/right/up variations for directional entry
- **Scale In**: Used for modes appearing in diagnosis zone
- **Pulse**: Color pulse on feedback panel appearance
- **Door Opening**: Animated doors on intro screen

## Development Notes

- Built with React 18 + TypeScript
- No external UI libraries (uses CSS for styling)
- Custom drag-and-drop implementation (no external libraries)
- Responsive grid layout using CSS Grid
- Gradient backgrounds and backdrop filters for visual depth

## Integration

This app can be embedded in:
- Learning management systems (LMS) via iframe
- Course websites
- Standalone deployment
- Part of a larger course platform

Ensure the hosting environment supports:
- React 18+
- Modern browsers (Chrome, Firefox, Safari, Edge)
- CSS Grid and flexbox support

## Future Enhancements

Potential additions:
- Difficulty levels (beginner/advanced scenarios)
- Scenario randomization
- Hint system
- Detailed analytics dashboard
- Multiplayer/competitive mode
- Accessibility improvements (screen reader support, keyboard navigation)

## License

Educational use. See course materials for licensing details.
