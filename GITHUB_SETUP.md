# GitHub & Vercel Deployment Guide

Your I-Model Diagnosis Lab is ready to deploy! Follow these steps to push to GitHub and deploy on Vercel.

## Step 1: Create a GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Enter repository name: `i-model-diagnosis-lab` (or your preferred name)
3. Choose "Public" (for easy sharing) or "Private" (for restricted access)
4. **Do NOT** initialize with README (we already have one)
5. Click "Create repository"

## Step 2: Connect Local Repository to GitHub

Copy the SSH or HTTPS URL from your new GitHub repo, then run:

```bash
# Option A: HTTPS (easier if you don't have SSH set up)
git remote add origin https://github.com/YOUR_USERNAME/i-model-diagnosis-lab.git
git branch -M main
git push -u origin main

# Option B: SSH (if you have SSH keys set up)
git remote add origin git@github.com:YOUR_USERNAME/i-model-diagnosis-lab.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

## Step 3: Verify Push

Visit `https://github.com/YOUR_USERNAME/i-model-diagnosis-lab` in your browser. You should see all your files.

## Step 4: Deploy to Vercel

### Option A: Automatic (Recommended)

1. Go to [vercel.com](https://vercel.com) and sign up with GitHub
2. Click "New Project"
3. Select your `i-model-diagnosis-lab` repository
4. Vercel auto-detects Create React App settings
5. Click "Deploy"
6. Your app is live! You'll get a URL like: `i-model-diagnosis-lab.vercel.app`

### Option B: Command Line

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Follow prompts to link to Vercel and GitHub
```

## Step 5: Customize Your Deployment

### Add a Custom Domain (Vercel)
1. In Vercel dashboard, go to your project
2. Settings → Domains
3. Add your custom domain (e.g., `i-model.yourschool.edu`)
4. Follow DNS setup instructions

### Enable Production Deployments
- Any push to `main` branch automatically deploys
- Preview deployments for pull requests
- Rollback to previous versions anytime

## Step 6: Update with New Changes

After pushing to GitHub:

```bash
# Make changes locally
# Edit files as needed

# Commit changes
git add .
git commit -m "Update scenarios: Add new AI usage examples"

# Push to GitHub (automatically triggers Vercel deployment)
git push origin main

# Check Vercel dashboard for deployment status
```

## Testing Your Deployment

1. Click the deployment URL from Vercel
2. Test all 6 scenarios work
3. Verify drag-and-drop functions
4. Check feedback displays correctly
5. Share the URL with learners!

## Environment Variables (Optional)

If you add backend analytics or API calls, create `.env` files:

```bash
# .env.local (development)
REACT_APP_API_URL=http://localhost:3000

# For Vercel, set in Vercel Dashboard:
# Project Settings → Environment Variables
# REACT_APP_API_URL=https://api.yourserver.com
```

## Continuous Deployment Workflow

```
Edit files locally
    ↓
git add .
git commit -m "Description"
    ↓
git push origin main
    ↓
GitHub receives changes
    ↓
Vercel detects push
    ↓
Vercel runs: npm run build
    ↓
Build succeeds
    ↓
Deploy to https://YOUR_APP.vercel.app
    ↓
See deployment status in Vercel dashboard
```

## Troubleshooting

### "Git remote already exists"
```bash
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/i-model-diagnosis-lab.git
```

### "Permission denied (publickey)"
- You need SSH keys set up
- Use HTTPS URL instead: `https://github.com/...`
- Or follow GitHub SSH setup: https://docs.github.com/en/authentication/connecting-to-github-with-ssh

### Vercel Build Fails
1. Check build logs in Vercel dashboard
2. Common issue: Node version mismatch
3. Solution: Add `vercel.json` to specify Node version:

```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm start",
  "installCommand": "npm install"
}
```

### App Won't Load After Deployment
1. Check Vercel logs
2. Verify `npm run build` works locally: `npm run build`
3. Check `.gitignore` - ensure all source files are committed (except node_modules)

## Sharing with Learners

Once deployed, share your Vercel URL:

```
Check out the I-Model Diagnosis Lab:
https://YOUR_DEPLOYMENT.vercel.app

Test your ability to recognize missing I-Modes in real scenarios!
```

### Integration with LMS

Add as an iFrame in your LMS:

```html
<iframe
  src="https://YOUR_DEPLOYMENT.vercel.app"
  width="100%"
  height="900"
  style="border: none; border-radius: 8px;">
</iframe>
```

## Monitoring Performance

### Vercel Analytics
- Dashboard shows deployment frequency
- Build times
- Function execution times (if using serverless functions)

### Check Performance
```bash
npm run build
# Check "build" folder size
du -sh build/
# Should be ~50-100KB uncompressed, ~15-25KB gzipped
```

## Updating to Production

### Regular Updates
```bash
# Make improvements locally
# Test with: npm start

# When ready to deploy:
git add .
git commit -m "Fix: Improve feedback animation timing"
git push origin main
# Automatic deployment to Vercel!
```

### Emergency Rollback
In Vercel dashboard:
1. Go to Deployments
2. Find previous working version
3. Click "Promote to Production"
4. Your live app reverts to that version

## GitHub Workflow Best Practices

### Use Branches for Features
```bash
# Create a feature branch
git checkout -b add-new-scenarios

# Make changes...

# Commit
git commit -m "Add 3 new scenarios about social media usage"

# Push
git push origin add-new-scenarios

# Create Pull Request on GitHub (or keep it simple)
# Then: git checkout main && git merge add-new-scenarios
```

### Meaningful Commit Messages
```bash
# Good
git commit -m "Add scenario about AI in healthcare"
git commit -m "Fix: Feedback panel animation timing"
git commit -m "Update design system documentation"

# Avoid
git commit -m "updates"
git commit -m "fix"
git commit -m "stuff"
```

## Vercel Secrets (Advanced)

If you add backend integrations:

1. In Vercel Dashboard → Project → Settings
2. Environment Variables section
3. Add secrets (API keys, database URLs, etc.)
4. Reference in code: `process.env.REACT_APP_MY_SECRET`
5. Secrets are not committed to git (keep in .gitignore)

## Final Checklist

- [ ] GitHub repo created and linked
- [ ] All files pushed to GitHub
- [ ] Vercel project created and linked
- [ ] App deployed and accessible
- [ ] Tested on mobile and desktop
- [ ] URL shared with learners
- [ ] Documentation accessible (README visible on GitHub)

## Next Steps

1. **Go live**: Share your URL with learners
2. **Collect feedback**: Monitor which scenarios are most challenging
3. **Iterate**: Update scenarios based on learner patterns
4. **Integrate**: Add to your LMS or course platform
5. **Expand**: Consider adding more scenarios or features

## Support

For deployment help:
- **GitHub Issues**: Ask questions in your repo
- **Vercel Docs**: https://vercel.com/docs
- **GitHub Docs**: https://docs.github.com

---

**Your app is ready for the world!** 🚀

Questions? Check SETUP.md or README.md for more details.
