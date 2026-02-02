# I-Model Diagnosis Lab - File Manifest

Complete listing of all project files with descriptions.

## Project Structure

```
i-model-diagnosis-lab/
├── Documentation
│   ├── README.md               # Main documentation
│   ├── SETUP.md                # Installation & deployment guide
│   ├── DESIGN_SYSTEM.md        # Visual design standards
│   ├── ARCHITECTURE.md         # System architecture & data flow
│   ├── FILE_MANIFEST.md        # This file
│   └── package.json            # Project metadata
│
├── Configuration
│   ├── tsconfig.json           # TypeScript configuration
│   ├── .gitignore              # Git exclusions
│   └── public/
│       └── index.html          # HTML entry point
│
├── Source Code
│   └── src/
│       ├── index.tsx           # React entry point
│       ├── App.tsx             # Main app component (phase manager)
│       ├── App.css             # App styles
│       │
│       ├── components/
│       │   ├── OpeningDoors.tsx     # Intro screen with doors animation
│       │   ├── OpeningDoors.css     # Intro styling
│       │   │
│       │   ├── DiagnosisGame.tsx    # Main game loop & state (largest)
│       │   ├── DiagnosisGame.css    # Game layout & styling
│       │   │
│       │   ├── ScenarioCard.tsx     # Scenario display component
│       │   ├── ScenarioCard.css     # Card styling
│       │   │
│       │   ├── DiagnosisZone.tsx    # Drop target for I-Modes
│       │   ├── DiagnosisZone.css    # Zone styling & animations
│       │   │
│       │   ├── IModeSelector.tsx    # Draggable I-Mode circles
│       │   ├── IModeSelector.css    # Circle grid & styling
│       │   │
│       │   ├── FeedbackPanel.tsx    # Answer feedback display
│       │   ├── FeedbackPanel.css    # Feedback styling & animations
│       │   │
│       │   ├── CompletionScreen.tsx # Results summary screen
│       │   └── CompletionScreen.css # Completion screen styling
│       │
│       └── data/
│           └── scenarios.ts    # All 6 scenario definitions
│
└── Build Output (generated)
    └── build/                  # Production build directory
```

## File Descriptions

### Documentation Files

**README.md** (Main Reference)
- Overview of the app
- Feature descriptions
- Game flow explanation
- Component structure
- Integration guidelines
- Start here for new users

**SETUP.md** (Developer Guide)
- Installation instructions
- Running development server
- Building for production
- Customization guide
- Deployment options (Vercel, Netlify, Docker, S3)
- Troubleshooting
- Performance optimization
- Analytics integration

**DESIGN_SYSTEM.md** (Design Reference)
- Complete color palette with hex codes
- Typography system (weights, sizes, spacing)
- Component styling standards
- Animation specifications
- Accessibility guidelines
- Responsive design breakpoints
- Usage examples
- Migration guide from Explainer

**ARCHITECTURE.md** (Technical Deep Dive)
- System overview diagram
- State management details
- Data flow and user journey
- Component responsibilities
- Drag-and-drop implementation
- Answer checking logic
- Statistics calculation
- Rendering strategy
- Error handling (future)
- Extensibility points
- Testing considerations

**FILE_MANIFEST.md** (This File)
- Complete file listing
- File descriptions and purposes
- Lines of code estimates
- Dependency map

### Configuration Files

**package.json**
- Project metadata (name, version)
- Dependencies (React, react-dom, react-scripts)
- NPM scripts (start, build, test)
- ESLint configuration
- Browser compatibility list

**tsconfig.json**
- TypeScript compiler options
- Target ES2020
- JSX config (react-jsx)
- Module resolution (bundler)
- Strict type checking enabled

**.gitignore**
- Excludes: node_modules, build, dist
- Excludes: .env files, logs, IDE files

**public/index.html**
- Single HTML entry point
- Inline base styles
- Meta tags for SEO
- Root div for React mounting

### Source Code Files

#### Entry Points

**src/index.tsx** (~10 lines)
- React 18 entry point
- Mounts App component to #root
- Strict mode for development checks

**src/App.tsx** (~40 lines)
- Phase management (intro → playing → complete)
- State for game results
- Conditional rendering based on phase
- Prop passing to child components

#### Components (Grouped by Purpose)

**OpeningDoors** (~60 lines + CSS)
- Purpose: Intro screen
- Features: Animated doors, title, BEGIN button
- State: isReady (animation trigger)
- CSS: Door animations, fade-in effects
- Reusable: Minimal (specific to this app)

**DiagnosisGame** (~180 lines + CSS)
- Purpose: Main game loop
- Features: Scenario loading, drag-drop, answer validation, progression
- State: 6 pieces of state (index, modes, checked, results, dragging, dragged)
- Event handlers: 7 handlers (drag/drop, check, next)
- CSS: 3-column grid layout, responsive
- Largest component (central logic)
- No re-export of complex types

**ScenarioCard** (~30 lines + CSS)
- Purpose: Display scenario content
- Features: Title, counter badge, vignette text
- Props: scenario, scenarioNumber, totalScenarios
- State: None (pure component)
- CSS: Card styling, animations
- Reusable: Yes (could be used in Explainer)

**DiagnosisZone** (~50 lines + CSS)
- Purpose: Drop target for I-Modes
- Features: Drop zone, selected modes display, drag feedback
- Props: selectedModes, drag handlers, isDraggingOver
- State: None (pure component)
- CSS: Circular zone, animations, color feedback
- Reusable: Yes (could be adapted for other interfaces)

**IModeSelector** (~50 lines + CSS)
- Purpose: Draggable I-Mode circles
- Features: 2x2 grid of 4 I-Modes, drag indication
- Props: selectedModes, drag handlers
- State: None (pure component)
- CSS: Grid layout, circle styling, hover effects
- Reusable: Yes (exact copy could work in Explainer)

**FeedbackPanel** (~60 lines + CSS)
- Purpose: Display answer feedback
- Features: Feedback message, modes display, explanation, color coding
- Props: Visibility, correctness flags, modes, explanation
- State: pulse animation trigger
- CSS: Color-coded left border, animations
- Reusable: Mostly (would need slight adaptation)

**CompletionScreen** (~80 lines + CSS)
- Purpose: Results summary
- Features: Score display, statistics, most-missed mode, reflection
- Props: results array, onReset callback
- State: None (derived from results via useMemo)
- CSS: Card layout, animations, statistics display
- Reusable: Mostly (specific to 6-scenario model)

#### Data Files

**src/data/scenarios.ts** (~90 lines)
- Contains: All 6 scenario definitions
- Structure: Array of Scenario interfaces
- Fields: id, title, vignette, missingModes, presentModes, explanation
- Size: ~3.5KB (small)
- Easy to extend: Add new objects to array
- No dependencies: Pure data

### CSS Files

Each component has a paired `.css` file (~100-200 lines each):

| Component | CSS Styles | Key Features |
|-----------|-----------|--------------|
| OpeningDoors | 150 lines | Door animation, gradient, button states |
| DiagnosisGame | 120 lines | Grid layout, responsive, progress dots |
| ScenarioCard | 80 lines | Card background, animations, counter |
| DiagnosisZone | 130 lines | Circular zone, drag feedback, modes display |
| IModeSelector | 80 lines | Grid layout, circles, hover effects |
| FeedbackPanel | 120 lines | Color states, animations, message display |
| CompletionScreen | 180 lines | Cards, statistics layout, animations |
| App | 10 lines | Base gradient |

**Total CSS**: ~850 lines (clean, modular, well-commented)

## Lines of Code Summary

| Category | Files | LOC | Notes |
|----------|-------|-----|-------|
| TypeScript/TSX | 10 | ~620 | Includes 7 components + App + data |
| CSS | 8 | ~850 | Modular, separate per component |
| Configuration | 5 | ~50 | tsconfig, package.json, .gitignore |
| Documentation | 5 | ~1200 | README, SETUP, DESIGN, ARCHITECTURE |
| **Total** | **28** | **~2720** | Production code + documentation |

## Dependencies

### Direct Dependencies
- `react` (18.2.0): UI library
- `react-dom` (18.2.0): DOM rendering
- `react-scripts` (5.0.1): Build tooling (Create React App)

### Peer Dependencies
- TypeScript (implicit, via react-scripts)
- Node.js (16+)
- npm (6+)

### No Other Dependencies
- ✓ No external component libraries
- ✓ No icon libraries
- ✓ No animation libraries
- ✓ No drag-and-drop libraries (HTML5 native)
- ✓ No state management library (React Context/hooks sufficient)
- ✓ No styling libraries (vanilla CSS)

## File Dependencies Map

```
App.tsx
├── OpeningDoors.tsx → OpeningDoors.css
├── DiagnosisGame.tsx
│   ├── DiagnosisGame.css
│   ├── scenarios.ts
│   ├── ScenarioCard.tsx → ScenarioCard.css
│   ├── DiagnosisZone.tsx → DiagnosisZone.css
│   ├── IModeSelector.tsx → IModeSelector.css
│   ├── FeedbackPanel.tsx → FeedbackPanel.css
│   └── (game state & logic)
└── CompletionScreen.tsx → CompletionScreen.css

Root
├── index.tsx
├── App.tsx (above)
├── App.css
└── index.html (public/)
```

## Build Output

When running `npm run build`:

```
build/
├── index.html          # Minified, includes inline styles
├── static/
│   ├── css/
│   │   └── main.[hash].css    # All CSS bundled/minified
│   ├── js/
│   │   ├── main.[hash].js     # All components bundled
│   │   └── [other chunks]     # React and dependencies
│   └── media/          # (Empty, no images)
└── favicon.ico
```

**Build Size**: ~40-50KB gzipped (efficient for a React app)

## How to Navigate the Codebase

### Getting Started
1. Start with **README.md** for overview
2. Read **SETUP.md** for installation
3. Review **ARCHITECTURE.md** for data flow

### Making Changes
1. Consult **DESIGN_SYSTEM.md** for styling
2. Find component in `src/components/`
3. Edit both `.tsx` and `.css` files
4. Check **SETUP.md** for customization examples

### Adding Features
1. Reference **ARCHITECTURE.md** for extension points
2. Create new component in `src/components/`
3. Add to DiagnosisGame or appropriate parent
4. Follow existing patterns for styling

### Deploying
1. Follow **SETUP.md** deployment section
2. Run `npm run build`
3. Upload `build/` directory
4. Test in target environment

## Key Files by Purpose

### For Learning the App
- **README.md**: High-level overview
- **ARCHITECTURE.md**: How it all works
- **DiagnosisGame.tsx**: Core logic

### For Customizing Content
- **scenarios.ts**: The 6 scenarios
- **SETUP.md**: Customization section

### For Changing Design
- **DESIGN_SYSTEM.md**: Color and typography specs
- **Any `.css` file**: Styling implementation
- **IModeSelector.tsx + .css**: I-Mode colors

### For Deployment
- **SETUP.md**: Deployment options
- **package.json**: Build commands
- **.gitignore**: What not to commit

### For Performance
- **SETUP.md**: Performance optimization section
- **DiagnosisGame.tsx**: State management efficiency
- **CompletionScreen.tsx**: useMemo optimization

## Checklist for Common Tasks

**Add a new scenario**
- [ ] Edit `src/data/scenarios.ts`
- [ ] Add to scenarios array
- [ ] Fill in all fields (id, title, vignette, missingModes, explanation)

**Change I-Mode colors**
- [ ] Find I_MODE_COLORS in components
- [ ] Update hex codes
- [ ] Test in both light and context

**Customize intro screen**
- [ ] Edit `src/components/OpeningDoors.tsx`
- [ ] Change title, subtitle, button text
- [ ] Update styling in `OpeningDoors.css`

**Modify accent color (violet)**
- [ ] Search for `#8b5cf6` in CSS files
- [ ] Replace with new color
- [ ] Check gradients containing color

**Deploy to production**
- [ ] Run `npm run build`
- [ ] Follow deployment section in SETUP.md
- [ ] Verify all 6 scenarios work
- [ ] Test drag-and-drop on target browsers
