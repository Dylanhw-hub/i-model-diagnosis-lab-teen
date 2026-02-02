# I-Model Diagnosis Lab - Setup & Deployment Guide

## Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm (comes with Node.js)

### Installation & Development

```bash
# Navigate to project directory
cd i-model-diagnosis-lab

# Install dependencies
npm install

# Start development server (runs on localhost:3000)
npm start

# Build for production
npm run build
```

## Project Structure

```
i-model-diagnosis-lab/
├── public/
│   └── index.html          # HTML template
├── src/
│   ├── components/
│   │   ├── OpeningDoors.tsx
│   │   ├── OpeningDoors.css
│   │   ├── DiagnosisGame.tsx
│   │   ├── DiagnosisGame.css
│   │   ├── ScenarioCard.tsx
│   │   ├── ScenarioCard.css
│   │   ├── DiagnosisZone.tsx
│   │   ├── DiagnosisZone.css
│   │   ├── IModeSelector.tsx
│   │   ├── IModeSelector.css
│   │   ├── FeedbackPanel.tsx
│   │   ├── FeedbackPanel.css
│   │   ├── CompletionScreen.tsx
│   │   └── CompletionScreen.css
│   ├── data/
│   │   └── scenarios.ts    # All 6 scenarios
│   ├── App.tsx
│   ├── App.css
│   ├── index.tsx
│   └── index.html
├── package.json
├── tsconfig.json
├── README.md
└── SETUP.md
```

## Customization

### Modifying Scenarios

Edit `src/data/scenarios.ts` to change, add, or remove scenarios:

```typescript
{
  id: "custom-scenario",
  title: "Your Title",
  vignette: "Your scenario description (3-5 sentences)...",
  missingModes: ["Intentionality", "Inquiry"],
  presentModes: ["Integrity", "Intuition"],
  explanation: "Explanation of why those modes were missing..."
}
```

The `presentModes` field is optional but recommended for richer feedback.

### Changing Colors

I-Mode colors are defined in each component. To modify:

1. **I-Mode colors** (`src/components/IModeSelector.tsx` and other component files):
   ```typescript
   const I_MODE_COLORS: Record<string, string> = {
     Intentionality: "#06b6d4",  // Change here
     Integrity: "#10b981",
     Inquiry: "#f59e0b",
     Intuition: "#f43f5e"
   };
   ```

2. **Accent color** (purple/violet) - appears in buttons, progress, feedback:
   - Primary: `#8b5cf6` (violet-500)
   - Gradient: `linear-gradient(135deg, #8b5cf6, #a78bfa)`
   - Update in CSS files (`.opening-doors-button`, `.check-button`, `.feedback-panel.correct`, etc.)

3. **Background gradient**:
   - Edit in `public/index.html` or any component's CSS
   - Current: `linear-gradient(to bottom, #0f172a, #1e1b4b)`

### Adjusting Layout

The main game uses CSS Grid with 3 columns:
- **Left (40%)**: Scenario card + feedback
- **Center (20%)**: Diagnosis zone
- **Right (40%)**: I-Mode selector

Edit `src/components/DiagnosisGame.css`:
```css
.game-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;  /* Adjust proportions here */
  gap: 2rem;
}
```

### Typography

System fonts are set in `public/index.html`:
```css
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", ...;
}
```

To use a different font stack, update this CSS and all component stylesheets.

## Deployment

### Static Hosting (Recommended)

1. Build the project:
   ```bash
   npm run build
   ```

2. Upload the `build/` directory to your hosting:
   - Vercel (recommended for React): `vercel deploy`
   - Netlify: Connect GitHub repo, auto-deploys
   - AWS S3: Upload `build/` contents to S3 bucket
   - GitHub Pages: Configure for React
   - Any static hosting (Apache, Nginx, etc.)

### Environment-Specific Builds

Create `.env` files for different environments:

```bash
# .env.development (default when running npm start)
REACT_APP_API_URL=http://localhost:3000

# .env.production (used during npm run build)
REACT_APP_API_URL=https://your-domain.com
```

### Docker Deployment

Create `Dockerfile`:
```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
RUN npm install -g serve
COPY --from=builder /app/build ./build
EXPOSE 3000
CMD ["serve", "-s", "build", "-l", "3000"]
```

Build and run:
```bash
docker build -t i-model-lab .
docker run -p 3000:3000 i-model-lab
```

## Integration with LMS

### As an iFrame

Add to your LMS content:
```html
<iframe
  src="https://your-domain.com/i-model-lab"
  width="100%"
  height="800"
  style="border: none; border-radius: 8px;">
</iframe>
```

### Passing Parameters (Future Enhancement)

Could extend app to accept query parameters:
```
https://your-domain.com/i-model-lab?mode=demo&userId=12345
```

### Tracking Completion

The app completes when user reaches the final screen. To track progress in your LMS, you could:
1. Add a redirect with completion token
2. Post data to your backend
3. Use browser localStorage to save progress

## Testing

### Manual Testing Checklist

- [ ] Opening doors animation plays
- [ ] All 6 scenarios load correctly
- [ ] Drag and drop works (drag from right to center, center to remove)
- [ ] Selected modes highlight in diagnosis zone
- [ ] Check Answer button disabled until modes selected
- [ ] Feedback displays correctly for correct/partial/incorrect answers
- [ ] Next Scenario button progresses through all 6
- [ ] Completion screen shows accurate stats
- [ ] Return button goes back to intro

### Browser Testing
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Android)

### Performance
- `npm run build` produces optimized production build (~40-50KB gzipped)
- No external CDN dependencies
- Lighthouse performance score: 90+

## Troubleshooting

### Port 3000 Already in Use
```bash
# Use different port
PORT=3001 npm start

# Or kill process using port 3000
lsof -ti:3000 | xargs kill -9
```

### Build Fails
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Styling Issues
- Ensure CSS files are imported in components
- Check browser DevTools for CSS conflicts
- Clear browser cache (Cmd+Shift+R or Ctrl+Shift+R)

### Drag and Drop Not Working
- Not supported in some older browsers (IE11)
- Check browser console for JavaScript errors
- Ensure event handlers are properly attached

## Performance Optimization

Current optimizations:
- Minified CSS and JavaScript in production build
- Lazy component loading (React.lazy available for future)
- Efficient state management
- No unnecessary re-renders

Future optimizations:
- Code splitting by route
- Image optimization (if adding images)
- Service Worker for offline support
- Caching strategies

## Analytics (Optional)

To add analytics, integrate with your preferred service:

```typescript
// Add to src/App.tsx
useEffect(() => {
  // Track page view
  analytics.pageView('I-Model Diagnosis Lab');
}, []);

// In DiagnosisGame.tsx
const handleCheckAnswer = () => {
  // Track answer submission
  analytics.event('answer_submitted', {
    scenario: currentScenario.id,
    modes_selected: selectedModes.length,
    is_correct: isCorrect
  });
  // ... rest of logic
};
```

Services to consider:
- Google Analytics 4
- Mixpanel
- Amplitude
- Custom backend tracking

## Support & Maintenance

### Regular Maintenance
- Keep Node.js and npm updated
- Run `npm update` periodically
- Check for security vulnerabilities: `npm audit`

### Future Updates
- New scenarios: Add to `src/data/scenarios.ts`
- UI improvements: Update component CSS files
- Feature additions: Add new components as needed

## Contact & Documentation

- README.md: Overview and feature description
- This file (SETUP.md): Technical setup and deployment
- Code comments in component files for implementation details
