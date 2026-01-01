# Contributing to Nuclear Safety Education

Thank you for your interest in contributing! This project aims to make nuclear energy education accessible to everyone.

## 🎯 Where to Contribute

See [ROADMAP.md](./docs/ROADMAP.md) for planned features and their priorities.

**High-priority features:**
1. **Radiation Dose Calculator** - Shareable, high engagement
2. **Energy Economics Comparison** - Policy-relevant tool
3. **Career Path Quiz** - Recruiting tool for nuclear industry

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Setup
```bash
# Clone the repository
git clone https://github.com/sghosh685/nuclear-safety-edu.git
cd nuclear-safety-edu

# Install dependencies
npm install

# Start development server
npm run dev
```

### Project Structure
```
nuclear-safety-edu/
├── src/
│   ├── pages/          # Page components (20+ pages)
│   ├── components/     # Reusable UI components
│   ├── data/           # Content and search index
│   ├── contexts/       # React Context providers
│   └── types/          # TypeScript definitions
├── docs/               # Project documentation
├── public/             # Static assets
└── README.md           # Project overview
```

## 📝 Guidelines

### Code Style
- **TypeScript:** All new code should be typed
- **Components:** Functional components with hooks
- **Styling:** Tailwind CSS utility classes
- **Formatting:** Prettier (run `npm run format`)

### Commit Messages
Follow conventional commits:
```
feat: Add radiation dose calculator
fix: Correct BWR diagram hover states
docs: Update deployment guide
style: Format navigation component
```

### Pull Requests
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/dose-calculator`)
3. Make your changes
4. Test thoroughly (desktop + mobile)
5. Submit PR with description of changes

## 🧪 Testing

```bash
# Build for production (verify no errors)
npm run build

# Preview production build
npm run preview
```

**Manual testing:**
- [ ] Desktop navigation (all dropdowns)
- [ ] Mobile navigation (accordion)
- [ ] Light/dark theme toggle
- [ ] Search functionality
- [ ] Interactive diagrams

## 📚 Documentation

When adding features:
- Update README.md if needed
- Add to docs/ROADMAP.md if planning future work
- Document complex UX decisions in docs/

## 🐛 Bug Reports

**Include:**
- Browser and version
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable

## 💡 Feature Requests

Check [ROADMAP.md](./docs/ROADMAP.md) first to see if it's already planned.

For new ideas:
- Describe the problem it solves
- Explain intended users
- Sketch the UX if applicable

## 📄 License

MIT License - see [LICENSE](./LICENSE) for details.

---

**Questions?** Open an issue on GitHub or reach out to the maintainer.

Thank you for contributing to nuclear education! ⚛️
