# Deployment Guide: GitHub → Vercel

**Status:** Ready to Deploy ✅  
**Date:** January 1, 2026

---

## ✅ Pre-Deployment Checklist (COMPLETED)

- [x] Mega-menu navigation implemented (About page added)
- [x] Plausible Analytics added to `index.html`
- [x] SEO meta tags configured
- [x] Open Graph tags for social sharing
- [x] Content Security Policy headers
- [x] Production build tested (`npm run build` successful)
- [x] README.md created

---

## 📋 STEP 1: Push to GitHub

### **1.1: Verify Git Status**

```bash
cd /Users/saikatghosh/.gemini/antigravity/scratch/nuclear-safety-edu

# Check current status
git status
```

**Expected:** All changes staged from initial commit

---

### **1.2: Create GitHub Repository**

**Option A: Via GitHub Website (Easier)**
1. Go to [github.com/new](https://github.com/new)
2. Repository name: `nuclear-safety-edu`
3. Description: "Interactive guide to nuclear energy, reactors, and safety"
4. Visibility: **Public** (for showcasing)
5. ❌ **Do NOT** initialize with README (we already have one)
6. Click **Create repository**

**Option B: Via GitHub CLI**
```bash
gh repo create nuclear-safety-edu --public --description "Interactive guide to nuclear energy, reactors, and safety" --source=. --push
```

---

### **1.3: Push Your Code**

**After creating the repo on GitHub, copy the commands GitHub provides. They'll look like:**

```bash
# Add remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/nuclear-safety-edu.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

---

### **1.4: Verify on GitHub**

Visit: `https://github.com/YOUR_USERNAME/nuclear-safety-edu`

You should see:
- ✅ All your files
- ✅ README.md displaying properly
- ✅ 20+ pages in `src/pages/`
- ✅ Components, data, contexts folders

---

### **1.5: Add Topics/Tags (Optional but Recommended)**

On your GitHub repo page:
1. Click **⚙️ (gear icon)** next to "About"
2. Add topics: `nuclear-energy`, `react`, `typescript`, `education`, `clean-tech`, `vite`, `tailwind`
3. Add website (will be your Vercel URL after deployment)
4. Save

---

## 🚀 STEP 2: Deploy to Vercel

### **2.1: Sign Up / Sign In**

1. Go to [vercel.com](https://vercel.com)
2. Click **Sign Up** (or **Login** if you have an account)
3. **IMPORTANT:** Sign up with GitHub (makes import easier)

---

### **2.2: Import Your Repository**

1. On Vercel dashboard, click **Add New...** → **Project**
2. You'll see "Import Git Repository"
3. Find `nuclear-safety-edu` in your GitHub repos
4. Click **Import**

---

### **2.3: Configure Build Settings**

Vercel will **auto-detect** your Vite project. Verify these settings:

| Setting | Value | Notes |
|---------|-------|-------|
| **Framework Preset** | Vite | Auto-detected ✅ |
| **Build Command** | `npm run build` | Auto-filled ✅ |
| **Output Directory** | `dist` | Auto-filled ✅ |
| **Install Command** | `npm install` | Auto-filled ✅ |

**Don't change anything unless you know what you're doing.**

---

### **2.4: Deploy!**

1. Click **Deploy**
2. Wait 1-2 minutes (Vercel will show build logs)
3. Watch for:
   ```
   ✅ Initializing...
   ✅ Analyzing source code...
   ✅ Installing dependencies...
   ✅ Building...
   ✅ Deploying...
   ✅ Success!
   ```

---

### **2.5: Get Your Live URL**

After deployment completes:
- Vercel assigns a URL like: `nuclear-safety-edu-abc123.vercel.app`
- Click **Visit** to see your live site!

---

## 🔧 STEP 3: Post-Deployment Configuration

### **3.1: Update Analytics Domain**

**CRITICAL:** Update Plausible Analytics to track your actual domain.

1. Open `index.html` in your repo
2. Find this line:
   ```html
   <script defer data-domain="yourdomain.vercel.app" src="https://plausible.io/js/script.js"></script>
   ```
3. Replace `yourdomain.vercel.app` with your **actual Vercel domain** (e.g., `nuclear-safety-edu-abc123.vercel.app`)

**Example:**
```html
<script defer data-domain="nuclear-safety-edu-abc123.vercel.app" src="https://plausible.io/js/script.js"></script>
```

4. Commit and push:
   ```bash
   git add index.html
   git commit -m "Update Plausible Analytics domain"
   git push
   ```

5. Vercel will **auto-deploy** your change (within 30 seconds)

---

### **3.2: Set Up Plausible Analytics Account (Optional)**

If you want to see analytics data:

1. Go to [plausible.io](https://plausible.io)
2. Sign up (30-day free trial, then $9/month)
3. Add your site: `nuclear-safety-edu-abc123.vercel.app`
4. Analytics will start collecting data automatically

**If you skip this:** Analytics script won't break anything, it just won't collect data.

---

### **3.3: Custom Domain (Optional)**

If you want a custom domain like `nuclearedu.com`:

1. Buy domain from **Namecheap**, **Google Domains**, etc.
2. In Vercel dashboard:
   - Go to your project
   - **Settings** → **Domains**
   - Click **Add**
   - Enter your domain: `nuclearedu.com`
   - Follow Vercel's DNS instructions

---

### **3.4: Update README Links**

1. Edit `README.md` on GitHub
2. Replace `[Live Demo](https://yourdomain.vercel.app)` with your actual URL
3. Commit: **"Update live demo link in README"**

---

## ✅ STEP 4: Verify Deployment

### **4.1: Test Your Live Site**

Visit your Vercel URL and check:

**Navigation:**
- [x] Mega-menu dropdowns work (Learn, Understand, Explore)
- [x] About page appears in Explore dropdown
- [x] All 16+ pages load correctly

**Features:**
- [x] Search works
- [x] Theme toggle (light/dark)
- [x] Interactive reactor diagram
- [x] Quizzes function
- [x] Mobile responsive

**SEO:**
- [x] Browser tab shows correct title: "Nuclear Safety Education | Interactive Guide to Nuclear Energy"
- [x] Share on social media → Open Graph image appears (if you added one)

---

### **4.2: Performance Check**

Run Lighthouse audit:
1. Open Chrome DevTools (F12)
2. Go to **Lighthouse** tab
3. Click **Analyze page load**
4. Target scores:
   - Performance: 90+
   - Accessibility: 95+
   - Best Practices: 90+
   - SEO: 95+

---

## 📣 STEP 5: Share Your Project

### **5.1: Soft Launch (Week 1)**

Share privately first:
- Friends & family for feedback
- 3-5 professors or industry contacts
- Portfolio reviewers

### **5.2: Public Launch (Week 2)**

**Reddit:**
- r/nuclear: "I built an interactive nuclear education platform"
- r/CleanTech: "New educational resource for nuclear energy"
- r/energy: Focus on climate angle

**Hacker News:**
- Submit as "Show HN: Interactive Nuclear Safety Education Platform"
- Include Vercel URL
- Best time: Weekday mornings (PST)

**LinkedIn:**
```
I just launched Nuclear Safety Education - an interactive platform
to make nuclear energy accessible to everyone.

Features:
• Interactive reactor diagrams (PWR, BWR, CANDU)
• 20+ comprehensive pages
• Quizzes, search, global nuclear map
• Light/dark mode, mobile-responsive

Built with React, TypeScript, and Vite.

Check it out: [your-vercel-url]

#CleanTech #NuclearEnergy #Education #ClimateAction
```

---

## 🐛 Troubleshooting

### **Issue: Build Failed on Vercel**

**Check:**
- Build logs for specific error
- npm versions match local (Node 18+)
- No TypeScript errors locally: `npm run build`

**Fix:**
```bash
# Locally
npm run build  # Must succeed

# If it works locally but not on Vercel:
# Check Vercel build logs for specific error
```

---

### **Issue: 404 on Routes**

**Cause:** Vercel doesn't know about client-side routing.

**Fix:** Verify `vercel.json` exists:
```json
{
  "rewrites": [
    { "source": "/((?!assets/).*)", "destination": "/index.html" }
  ]
}
```

Already included in your repo ✅

---

### **Issue: Analytics Not Working**

**Check:**
1. Did you update `data-domain` in `index.html`?
2. Did you create Plausible account and add your domain?
3. Wait 24 hours for data to appear

---

### **Issue: Mobile Layout Broken**

**Check:**
- Viewport meta tag in `index.html` ✅ (already added)
- Tailwind responsive classes
- Test on actual device, not just browser DevTools

---

## 📊 Post-Launch Monitoring

### **Week 1:**
- Check analytics daily
- Monitor for bug reports
- Gather user feedback

**Key Metrics to Watch:**
- Pages/session (target: 3.5)
- Bounce rate (target: <40%)
- Most viewed pages (shows what's valuable)

### **Week 2-4:**
- Iterate based on data
- Fix top 3 UX issues
- Plan v1.1 features

---

## 🎯 Success Criteria (3 Months)

| Metric | Target | Stretch |
|--------|--------|---------|
| Monthly Active Users | 500 | 1,000 |
| Pages/Session | 3.5 | 5.0 |
| Avg Session | 4 min | 6 min |
| Return Visitors | 20% | 30% |

---

## 🚀 Next Features (v1.1)

Based on your roadmap, prioritize:
1. **Radiation Dose Calculator** (high engagement)
2. **Career Path Quiz** (job seekers)
3. **Energy Economics Comparison** (policy makers)

---

## 📝 Final Checklist

Before announcing publicly:
- [ ] Vercel deployment successful
- [ ] All pages load correctly
- [ ] Navigation menus work (desktop + mobile)
- [ ] Analytics domain updated
- [ ] README links updated
- [ ] GitHub repo has description + topics
- [ ] Lighthouse score 90+ on all metrics
- [ ] Tested on mobile device

---

**🎉 You're ready to launch! Good luck with the deployment!**

**Questions?** Check:
- [Vercel Documentation](https://vercel.com/docs)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- GitHub Issues (for community help)

---

**Last Updated:** January 1, 2026  
**Ready for:** Production Deployment
