# I-Model Diagnosis Lab - Quick Start Guide

Get up and running in 5 minutes.

## Installation (2 minutes)

```bash
# 1. Clone or download the project
cd i-model-diagnosis-lab

# 2. Install dependencies
npm install

# 3. Start development server
npm start
```

The app opens at `http://localhost:3000` and auto-reloads when you save files.

## What You'll See

1. **Opening Doors Screen** - Animated intro with "BEGIN" button
2. **6 Diagnosis Scenarios** - Drag I-Modes to identify missing ones
3. **Results Screen** - Your score and learning insights

## Basic Gameplay

1. Read the scenario (left)
2. Drag I-Mode circles (right) into the center zone to answer
3. Click "Check Answer"
4. See feedback and explanation
5. Click "Next Scenario"
6. Repeat 6 times → View results

## Quick Customizations

### Change a Scenario

Edit `src/data/scenarios.ts`:

```typescript
{
  id: "scenario1",
  title: "Your New Title",
  vignette: "Your new scenario text here...",
  missingModes: ["Intentionality"],
  explanation: "Why these modes were missing..."
}
```

Save and refresh browser.

### Change Colors

Find I-Mode colors in any component (e.g., `IModeSelector.tsx`):

```typescript
const I_MODE_COLORS = {
  Intentionality: "#NEW_COLOR",  // Change these hex codes
  ...
}
```

**Accent color** (violet buttons): Search `#8b5cf6` in CSS files and replace.

### Change Title/Subtitle

Edit `src/components/OpeningDoors.tsx`:

```tsx
<h1 className="opening-doors-title">Your New Title</h1>
<p className="opening-doors-subtitle">Your Subtitle</p>
```

## For Deployment

### Quick Build

```bash
npm run build
```

Creates optimized `build/` folder (~50KB gzipped).

### Deploy to Vercel (Free, Easiest)

```bash
npm install -g vercel
vercel
# Follow prompts, accepts your build/ folder
```

### Deploy to Any Server

Upload `build/` folder contents to your web server.

## Key Files

| File | Purpose |
|------|---------|
| `src/data/scenarios.ts` | The 6 scenarios |
| `src/components/DiagnosisGame.tsx` | Main game logic |
| `src/components/OpeningDoors.tsx` | Intro screen |
| `public/index.html` | HTML template |
| Package.json | Dependencies & scripts |

## Troubleshooting

**Port 3000 in use?**
```bash
PORT=3001 npm start
```

**Drag-and-drop not working?**
- Check browser console (F12)
- Refresh page
- Try different browser

**Build errors?**
```bash
rm -rf node_modules
npm install
npm run build
```

## What to Read Next

- **README.md** - Full feature overview
- **SETUP.md** - Deployment & customization guide
- **DESIGN_SYSTEM.md** - Colors, fonts, styling
- **ARCHITECTURE.md** - How the app works internally

## Need Help?

1. Check **SETUP.md** for common issues
2. Look at existing scenarios for examples
3. Use browser DevTools to inspect elements
4. Read component comments in source code

## Development Workflow

```bash
# Terminal 1: Run dev server
npm start

# Terminal 2: Make changes to files
# Edit src/components/*.tsx and *.css
# Browser auto-refreshes

# When satisfied:
npm run build  # Create production version
# Deploy the build/ folder
```

## Tips

- **Add more scenarios**: Just add to the array in `scenarios.ts`
- **Change visual style**: Edit CSS files and I_MODE_COLORS
- **Extend functionality**: Add new components and import in DiagnosisGame.tsx
- **Keep it simple**: Most changes don't need to touch more than 2-3 files

## File Structure (Minimal View)

```
src/
├── App.tsx              ← Main entry
├── components/
│   ├── OpeningDoors.tsx ← Intro
│   ├── DiagnosisGame.tsx ← Main game
│   ├── [other components]
│   └── [CSS files]
└── data/
    └── scenarios.ts     ← Your content
```

## One-Minute Scenario Template

```typescript
{
  id: "scenarioX",
  title: "Catchy Title",
  vignette: "Alex is working on a project. They use AI to... [describe situation in 3-5 sentences]",
  missingModes: ["Mode1", "Mode2"],  // Pick 1-2 of the 4 I-Modes
  explanation: "They missed [Mode] because... [explain why]"
}
```

The 4 I-Modes are:
- Intentionality
- Integrity
- Inquiry
- Intuition

## Performance Notes

- Build size: 40-50KB gzipped (very efficient)
- No external libraries beyond React
- Runs smoothly on modern browsers
- Drag-and-drop uses native HTML5 API

## Browser Support

- Chrome (all recent versions) ✓
- Firefox (all recent versions) ✓
- Safari (all recent versions) ✓
- Edge (all recent versions) ✓
- Mobile browsers (iOS Safari, Chrome) ✓

## Next Steps

1. **Customize scenarios** in `src/data/scenarios.ts`
2. **Test locally** with `npm start`
3. **Build** with `npm run build`
4. **Deploy** to your hosting
5. **Share** with learners!

## Common Edits Quick Reference

```bash
# Edit scenario content
code src/data/scenarios.ts

# Edit intro screen
code src/components/OpeningDoors.tsx

# Edit game layout
code src/components/DiagnosisGame.tsx

# Edit colors
code src/components/IModeSelector.tsx
# Look for I_MODE_COLORS object

# Edit styling
code src/components/DiagnosisGame.css
```

---

**That's it!** You're ready to customize and deploy. For more details, see README.md or SETUP.md.
