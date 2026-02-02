# I-Model Diagnosis Lab - Architecture Guide

## System Overview

The I-Model Diagnosis Lab is a single-page React application that guides learners through a series of diagnostic scenarios to test their understanding of the I-Model framework.

### Core Philosophy

1. **State-Driven**: All UI updates flow from centralized game state
2. **Component-Based**: Modular components with clear responsibilities
3. **Interactive**: Drag-and-drop interface for engaging interaction
4. **Immediate Feedback**: Real-time validation and learning reinforcement
5. **Progressive Disclosure**: Information revealed step-by-step

## Architecture Diagram

```
App.tsx (Phase Management)
  ├── intro phase
  │   └── OpeningDoors.tsx
  │       └── Animated doors with BEGIN button
  │
  ├── playing phase
  │   └── DiagnosisGame.tsx (Main Game Loop)
  │       ├── State Management
  │       │   ├── currentScenarioIndex
  │       │   ├── selectedModes[]
  │       │   ├── hasChecked boolean
  │       │   ├── results[]
  │       │   └── isDraggingOver boolean
  │       │
  │       ├── ProgressBar (top)
  │       │   └── Scenario counter + progress dots
  │       │
  │       └── Game Container (3-column grid)
  │           ├── Left Panel (40%)
  │           │   ├── ScenarioCard.tsx
  │           │   │   └── Title + vignette text
  │           │   └── FeedbackPanel.tsx
  │           │       └── Result + explanation (conditional)
  │           │
  │           ├── Center Panel (20%)
  │           │   └── DiagnosisZone.tsx
  │           │       ├── Drop target (circular)
  │           │       ├── Selected modes display
  │           │       └── Drag feedback
  │           │
  │           └── Right Panel (40%)
  │               └── IModeSelector.tsx
  │                   └── 4 draggable I-Mode circles
  │
  │       └── Game Footer
  │           └── Check Answer / Next Scenario buttons
  │
  └── complete phase
      └── CompletionScreen.tsx
          ├── Score display
          ├── Statistics
          └── Reflection prompt
```

## State Management

### Game State (in DiagnosisGame.tsx)

```typescript
interface GameState {
  currentScenarioIndex: number;  // 0-5 (6 scenarios)
  selectedModes: string[];        // I-Modes in diagnosis zone
  hasChecked: boolean;            // Whether answer was submitted
  isDraggingOver: boolean;        // Visual feedback state
  results: ScenarioResult[];      // Accumulating results
  draggedMode: string | null;     // Currently dragging mode
}
```

### Result Object (ScenarioResult)

```typescript
interface ScenarioResult {
  scenarioId: string;        // References scenario ID
  selectedModes: string[];   // What learner selected
  correctModes: string[];    // What was actually missing
  isCorrect: boolean;        // Perfect match
  isPartiallyCorrect: boolean; // Some correct
}
```

### Scenario Object

```typescript
interface Scenario {
  id: string;
  title: string;
  vignette: string;                    // Situation description
  missingModes: string[];              // Answer (1-2 typically)
  presentModes?: string[];             // Optional for feedback
  explanation: string;                 // Why these modes missing
}
```

## Data Flow

### User Journey

```
1. START: User at intro screen
   └─> Clicks BEGIN
       └─> App phase changes to "playing"
           └─> DiagnosisGame mounts

2. SCENARIO PRESENTATION
   └─> DiagnosisGame loads scenario[0]
       └─> ScenarioCard displays vignette
       └─> IModeSelector shows 4 draggable circles
       └─> DiagnosisZone awaits drops

3. INTERACTION: User drags modes
   └─> onDragStart sets draggedMode
       └─> draggedMode stored in state
   └─> onDragOver called on DiagnosisZone
       └─> isDraggingOver = true (visual feedback)
   └─> onDrop called
       └─> If not in selectedModes: add it
       └─> If in selectedModes: remove it

4. ANSWER SUBMISSION
   └─> User clicks "Check Answer" button
       └─> handleCheckAnswer() runs:
           ├─> Compare selectedModes to correctModes
           ├─> Determine isCorrect / isPartiallyCorrect
           ├─> Store result in results[]
           ├─> Set hasChecked = true
           └─> FeedbackPanel becomes visible

5. RESULT DISPLAY
   └─> FeedbackPanel shows:
       ├─> Success/partial/failure message
       ├─> Missing I-Modes highlighted
       └─> Explanation revealed

6. PROGRESSION
   └─> User clicks "Next Scenario" button
       ├─> If more scenarios: increment index
       ├─> Clear selectedModes and hasChecked
       ├─> Loop back to step 2
       └─> If last scenario: move to phase "complete"

7. COMPLETION
   └─> App mounts CompletionScreen
       ├─> Calculates statistics from results[]
       ├─> Shows score breakdown
       └─> Displays reflection prompt
```

## Component Responsibilities

### App.tsx
- **Role**: Phase management and router
- **State**: `gamePhase`, `results`
- **Responsibilities**:
  - Manage intro → playing → complete transitions
  - Pass callbacks to child components
  - Handle reset to intro

### OpeningDoors.tsx
- **Role**: Intro screen
- **Props**: `onOpen` callback
- **Responsibilities**:
  - Display title and subtitle
  - Animate doors opening
  - Show BEGIN button
  - No internal state

### DiagnosisGame.tsx
- **Role**: Main game loop
- **State**:
  - `currentScenarioIndex`
  - `selectedModes`
  - `hasChecked`
  - `isDraggingOver`
  - `results`
  - `draggedMode`
- **Responsibilities**:
  - Load and manage current scenario
  - Handle all drag-and-drop interactions
  - Validate answers
  - Track results across all scenarios
  - Progress to next scenario
  - Call `onComplete` when done

### ScenarioCard.tsx
- **Role**: Display scenario content
- **Props**: `scenario`, `scenarioNumber`, `totalScenarios`
- **Responsibilities**:
  - Show title and counter
  - Display vignette text
  - Animate entrance

### DiagnosisZone.tsx
- **Role**: Drop target for I-Modes
- **Props**:
  - `selectedModes` (display)
  - `onDragOver`, `onDragLeave`, `onDrop` (handlers)
  - `isDraggingOver` (visual state)
- **Responsibilities**:
  - Render drop zone with visual feedback
  - Display dropped modes
  - Show empty state message
  - No internal state

### IModeSelector.tsx
- **Role**: Source for draggable I-Modes
- **Props**:
  - `selectedModes` (highlight selected)
  - `onDragStart`, `onDragEnd` (handlers)
- **Responsibilities**:
  - Render 4 I-Mode circles
  - Handle drag initiation
  - Visual indication of selection
  - No internal state

### FeedbackPanel.tsx
- **Role**: Display answer feedback
- **Props**:
  - `isVisible`, `isCorrect`, `isPartiallyCorrect`
  - `selectedModes`, `correctModes`
  - `explanation`
- **Responsibilities**:
  - Show feedback message
  - Display correct I-Modes
  - Explain why (explanation)
  - Color-code by correctness
  - Animate entrance with pulse
  - No internal state

### CompletionScreen.tsx
- **Role**: Final summary screen
- **Props**: `results`, `onReset`
- **Responsibilities**:
  - Calculate statistics from results
  - Show score and breakdown
  - Identify most-missed I-Mode
  - Display reflection prompt
  - Animate entrance
  - No internal state (derived from results)

## Drag-and-Drop Implementation

### HTML5 Drag Events Flow

```
User Action → Event Handler → State Update → Re-render

1. onDragStart (on I-Mode circle)
   ├─> Set draggedMode = mode name
   ├─> Set dataTransfer.effectAllowed = "move"
   └─> Circle opacity reduces (CSS)

2. onDragOver (on Diagnosis Zone)
   ├─> Prevent default
   ├─> Set dropEffect = "move"
   └─> Zone border/background changes

3. onDragLeave (on Diagnosis Zone)
   ├─> Check if mouse left the zone
   └─> Restore normal appearance

4. onDrop (on Diagnosis Zone)
   ├─> Prevent default
   ├─> If draggedMode not in selectedModes: add
   ├─> If draggedMode in selectedModes: remove
   └─> Re-render with updated selectedModes

5. onDragEnd (on I-Mode circle)
   ├─> Clear draggedMode state
   └─> Reset visual states
```

### State During Drag

```javascript
// Before drag
selectedModes = ["Intentionality"]
draggedMode = null

// User starts dragging "Integrity"
draggedMode = "Integrity"
// (Visual: circle fades)

// User drags over zone
isDraggingOver = true
// (Visual: zone border glows)

// User drops
selectedModes = ["Intentionality", "Integrity"]
draggedMode = null
isDraggingOver = false
// (Visual: circle appears in zone)
```

## Answer Checking Logic

```typescript
const handleCheckAnswer = () => {
  const correctModes = currentScenario.missingModes;

  // Check if arrays match exactly
  const isCorrect =
    selectedModes.length === correctModes.length &&
    correctModes.every((mode) => selectedModes.includes(mode));

  // Check if some are correct
  const isPartiallyCorrect =
    !isCorrect &&
    selectedModes.some((mode) => correctModes.includes(mode));

  // Store result
  const result: ScenarioResult = {
    scenarioId: currentScenario.id,
    selectedModes,
    correctModes,
    isCorrect,
    isPartiallyCorrect,
  };

  setResults([...results, result]);
  setHasChecked(true);
};
```

## Statistics Calculation

In CompletionScreen:

```typescript
const stats = useMemo(() => {
  // Count correct answers
  const correctCount = results.filter((r) => r.isCorrect).length;

  // Track I-Mode frequency across all scenarios
  const modeFrequency: Record<string, number> = {};
  results.forEach((result) => {
    result.correctModes.forEach((mode) => {
      modeFrequency[mode] = (modeFrequency[mode] || 0) + 1;
    });
  });

  // Find most-missed mode
  const mostMissedMode = Object.entries(modeMissed)
    .sort(([, a], [, b]) => b - a)[0];

  return { correctCount, modeFrequency, mostMissedMode };
}, [results]);
```

## Rendering Strategy

### Re-render Triggers

DiagnosisGame re-renders when:
- `currentScenarioIndex` changes (new scenario)
- `selectedModes` changes (modes added/removed)
- `hasChecked` changes (feedback appears)
- `isDraggingOver` changes (visual feedback)

### Performance Considerations

1. **No unnecessary re-renders**: Child components are pure and don't trigger parent updates
2. **Memoization**: CompletionScreen uses `useMemo` for statistics
3. **Event delegation**: Drag events handled at container level
4. **CSS animations**: Don't trigger re-renders

## Styling Architecture

### CSS Organization

Each component has an associated `.css` file:
- `DiagnosisGame.css`: Main layout grid
- `ScenarioCard.css`: Card styling
- `DiagnosisZone.css`: Drop zone styling
- `IModeSelector.css`: I-Mode circles
- etc.

### Color Constants

I-Mode colors are defined in multiple components (could be centralized):
```typescript
const I_MODE_COLORS: Record<string, string> = {
  Intentionality: "#06b6d4",
  Integrity: "#10b981",
  Inquiry: "#f59e0b",
  Intuition: "#f43f5e",
};
```

### Responsive Grid

```css
.game-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 2rem;
}

@media (max-width: 1200px) {
  .game-container {
    grid-template-columns: 1fr;
  }
}
```

## Error Boundaries (Future Enhancement)

Currently, the app doesn't have error boundaries. Consider adding:

```tsx
class GameErrorBoundary extends React.Component {
  componentDidCatch(error, errorInfo) {
    console.error('Game error:', error);
  }

  render() {
    return this.props.children;
  }
}
```

## Extensibility Points

### Adding New Scenarios

1. Add to `src/data/scenarios.ts`
2. No component changes needed
3. Game automatically includes in rotation

### Adding Difficulty Levels

1. Create `scenarios-advanced.ts`
2. Add difficulty toggle to DiagnosisGame
3. Load appropriate scenario set

### Adding Hints System

1. Add hint to scenario object
2. Add hint button to DiagnosisGame
3. Display hint in FeedbackPanel

### Adding Time Tracking

1. Add timestamp to ScenarioResult
2. Calculate time per scenario in CompletionScreen
3. Display in statistics

### Adding Analytics

1. Add tracking calls in handleCheckAnswer
2. Add tracking in phase transitions
3. Post events to analytics service

## Testing Considerations

### Unit Tests
- Scenario data validation
- Answer checking logic
- Statistics calculation

### Integration Tests
- Complete game flow (all 6 scenarios)
- Drag-and-drop interactions
- Phase transitions

### E2E Tests
- Opening to completion
- Various answer combinations
- Result accuracy

## Deployment Checklist

- [ ] All components render without errors
- [ ] Drag-and-drop works on target browsers
- [ ] All 6 scenarios load correctly
- [ ] Answer validation is accurate
- [ ] Animations perform smoothly
- [ ] Responsive layout works on mobile
- [ ] Build size is optimized
- [ ] No console errors or warnings
- [ ] Performance is acceptable
