# Nuclear Safety Education Platform

> 🌍 Making nuclear energy education accessible to everyone through interactive design and technical accuracy.

[![Live Demo](https://img.shields.io/badge/🌐_Live-Demo-brightgreen)](https://nuclear-safety-edu.vercel.app)
[![React](https://img.shields.io/badge/React-19.2.0-blue?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.21-purple?logo=vite)](https://vitejs.dev)
[![Tailwind](https://img.shields.io/badge/Tailwind-4.1.18-cyan?logo=tailwindcss)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/License-MIT-green)](./LICENSE)

**From fission to Fukushima: Nuclear energy explained through interactive diagrams, balanced analysis, and modern UX.**



## 📚 Features

### **Comprehensive Content (20+ Pages)**
- **Nuclear Basics**: Fundamentals of fission, critical mass, chain reactions
- **Reactor Types**: Interactive diagrams of PWR, BWR, CANDU, RBMK reactors
- **Safety Systems**: Defense in depth, containment structures, emergency cores
- **Accident Analysis**: Chernobyl, Fukushima, Three Mile Island case studies
- **Climate & Nuclear**: Role in decarbonization, carbon-free baseload power
- **Nuclear Waste**: Storage, disposal, and long-term management

### **Interactive Learning**
- 🎮 **Interactive Reactor Diagrams**: Hover to explore PWR components
- 📊 **Quizzes**: Test your knowledge with localStorage score tracking  
- 🔍 **Site-Wide Search**: Instant results with keyboard navigation
- 🗺️ **Global Nuclear Map**: Reactors worldwide visualization
- 📖 **Comprehensive Glossary**: 100+ technical terms explained

### **Modern UX**
- 🌓 **Light/Dark Mode**: Theme toggle with smart defaults
- 📱 **Mobile Responsive**: Touch-optimized for all devices
- ⚡ **Smooth Animations**: Page transitions with Framer Motion
- ♿ **Accessible**: WCAG AA compliant, keyboard navigable
- 🔐 **Privacy-First**: Plausible Analytics (GDPR compliant)

---

## 🎨 Design Highlights

### **Mega-Menu Navigation**
Professional dropdown menus organizing content into logical categories:
- **Learn**: Basics, Reactors, Accidents, Safety
- **Understand**: Pros/Challenges, Climate, Waste, Myths
- **Explore**: Map, Canada, Careers, Glossary, Resources

### **Theme System**
- Dark mode default for comfortable reading
- Light mode support throughout
- Theme-locked technical diagrams preserve specialized color schemes

---

## 🛠️ Tech Stack

### **Frontend**
- **React 19.2** - UI library
- **TypeScript 5.9** - Type safety
- **Vite 5.4** - Build tool (lightning-fast dev server)
- **Tailwind CSS 4.1** - Utility-first styling
- **Framer Motion 12.23** - Smooth animations
- **React Router 7.11** - Client-side routing

### **Icons & Assets**
- **Lucide React** - Modern, tree-shakeable SVG icons

### **Analytics & Monitoring**
- **Plausible Analytics** - Privacy-friendly, GDPR compliant

### **Deployment**
- **Vercel** - Hosting platform
- **GitHub** - Version control

---

## 🚀 Getting Started

### **Prerequisites**
- Node.js 18+ and npm

### **Local Development**

```bash
# Clone the repository
git clone https://github.com/yourusername/nuclear-safety-edu.git
cd nuclear-safety-edu

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:5173
```

### **Build for Production**

```bash
# Create optimized production build
npm run build

# Preview production build locally
npm run preview
```

---

## 📂 Project Structure

```
nuclear-safety-edu/
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── Layout.tsx    # Navbar, footer, page wrapper
│   │   ├── ReactorDiagram.tsx  # Interactive PWR schematic
│   │   ├── Breadcrumbs.tsx
│   │   └── JargonTooltip.tsx
│   ├── pages/            # Route components
│   │   ├── HomePage.tsx
│   │   ├── ReactorsPage.tsx
│   │   ├── AccidentsPage.tsx
│   │   └── ... (20+ pages)
│   ├── data/             # Content and search index
│   │   ├── reactors.ts
│   │   ├── accidents.ts
│   │   ├── quizzes.ts
│   │   └── searchIndex.ts
│   ├── contexts/         # React Context providers
│   │   └── ThemeContext.tsx
│   ├── types/            # TypeScript type definitions
│   ├── index.css         # Global styles, Tailwind imports
│   └── main.tsx          # App entry point
├── public/               # Static assets
├── index.html            # HTML template
├── tailwind.config.js    # Tailwind configuration
├── vite.config.ts        # Vite configuration
└── vercel.json           # Vercel SPA routing config
```

---

## 🌍 Deployment

### **Vercel (Recommended)**

1. Push code to GitHub (see below)
2. Go to [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Vercel auto-detects Vite settings:
   - **Framework**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Click **Deploy**

**Post-Deployment:**
- Update Plausible Analytics domain in `index.html`:
  ```html
  <script defer data-domain="YOUR-DOMAIN.vercel.app" src="https://plausible.io/js/script.js"></script>
  ```

---

## 📊 Analytics

This project uses **Plausible Analytics** - a privacy-focused, GDPR-compliant alternative to Google Analytics.

**No cookies, no tracking across websites, fully transparent.**

To set up:
1. Create account at [plausible.io](https://plausible.io)
2. Add your domain
3. Update `data-domain` attribute in `index.html`

---

## 🎯 Key Features Explained

### **Interactive Reactor Diagram**
Hover over components in the PWR diagram to see:
- Component name and function
- Real-time highlighting
- Educational tooltips

### **Search Functionality**
- Instant fuzzy search across all content
- Keyboard navigation (arrow keys, Enter)
- Categorized results (reactors, accidents, concepts)

### **Quiz System**
- LocalStorage-based score persistence
- Multiple difficulty levels
- Immediate feedback

### **Theme System**
- User preference saved to localStorage
- System respects prefers-color-scheme
- Certain sections (diagrams) theme-locked for clarity

---

## 🤝 Contributing

This is an educational project. Contributions welcome!

**Areas for improvement:**
- Additional reactor types (Gen IV, SMRs, fusion)
- More interactive simulations
- Radiation dose calculator
- Career path quiz
- Country-specific pages (France, China, etc.)

See [`nuclear_edu_expansion_roadmap.md`](link) for v1.1+ ideas.

---

## 📝 License

MIT License - feel free to use for educational purposes.

---

## 👤 Author

**Saikat Ghosh**

- Building this to make nuclear energy education accessible
- Interested in clean tech, energy systems, and climate solutions
- Connect: [LinkedIn](https://www.linkedin.com/in/saikatghosh00/) | [GitHub](https://github.com/sghosh685)

---

## 📚 Data Sources & Citations

This project uses information from authoritative sources to ensure technical accuracy:

**Regulatory & Safety:**
- [International Atomic Energy Agency (IAEA)](https://www.iaea.org/) - Global nuclear safety standards
- [U.S. Nuclear Regulatory Commission (NRC)](https://www.nrc.gov/) - Regulatory oversight and safety
- [Canadian Nuclear Safety Commission (CNSC)](https://nuclearsafety.gc.ca/) - CANDU reactor expertise

**Energy Data:**
- [U.S. Energy Information Administration (EIA)](https://www.eia.gov/) - Energy statistics and analysis
- [World Nuclear Association](https://world-nuclear.org/) - Industry data and reports
- [Our World in Data - Energy](https://ourworldindata.org/energy) - Climate and energy statistics

**Academic & Technical:**
- MIT OpenCourseWare - Nuclear Engineering courses
- ITER Project Documentation - Fusion research
- DOE Office of Nuclear Energy - Advanced reactor R&D

**Accident Analysis:**
- Official investigation reports (Chernobyl Forum, Fukushima IAEA Mission, TMI President's Commission)

> **Note:** This is an educational project. For official guidance on nuclear safety or regulation, consult the relevant national authority.

---

## 🙏 Acknowledgments

**Data Sources:**
- International Atomic Energy Agency (IAEA)
- U.S. Nuclear Regulatory Commission (NRC)
- Canadian Nuclear Safety Commission (CNSC)
- U.S. Energy Information Administration (EIA)

**Inspiration:**
- World Nuclear Association educational materials
- MIT Nuclear Engineering courses
- ITER fusion project documentation

---

## 📜 Disclaimer

This is an educational project. Content is based on public information from authoritative sources (IAEA, NRC, CNSC) but should not be considered official guidance. For regulatory or safety-critical information, consult official nuclear authorities.

---

## 🔧 Development Notes

### **Performance**
- Production build: ~625 KB (gzipped: ~177 KB)
- TT (Time to Interactive): <3s on 3G
- Lighthouse Score: 95+ (Performance, Accessibility, SEO)

### **Browser Support**
- Chrome/Edge 100+
- Firefox 100+
- Safari 15+
- Mobile browsers (iOS Safari, Chrome Mobile)

### **Known Issues**
- Dev server has esbuild vulnerability (doesn't affect production)
- Large bundle size - consider code splitting for v2.0

---

## 📈 Roadmap

**v1.0** (Current)
- ✅ 20+ comprehensive pages
- ✅ Interactive reactor diagrams
- ✅ Mega-menu navigation
- ✅ Quiz system
- ✅ Light/dark mode

**v1.1** (Planned)
- [ ] Radiation dose calculator
- [ ] Energy economics comparison
- [ ] Career path quiz
- [ ] PWA support (offline mode)

**v2.0** (Future)
- [ ] Control room simulator
- [ ] 3D reactor models (Three.js)
- [ ] Country-specific pages
- [ ] Community forums

---

**Built with ❤️ for nuclear education and climate action**
