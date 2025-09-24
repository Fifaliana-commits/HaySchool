# HaySchool - Educational Platform for Malagasy Children

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub Repository](https://img.shields.io/badge/GitHub-Repository-blue)](https://github.com/Fifaliana-commits/HaySchool)

HaySchool is an interactive educational platform designed specifically for Malagasy children aged 6-12. Built with React, TypeScript, and Hono, it offers a comprehensive learning experience across 6 core subjects with gamification and progress tracking.

## 🌟 Features

- **6 Core Subjects**: Mathématiques, Français, Sciences, Histoire, Géographie, Anglais
- **Child-Friendly Design**: Bright colors, engaging animations, and intuitive navigation
- **Progress Tracking**: Visual indicators and achievement system
- **Gamification**: Badges, streaks, and rewards to maintain engagement
- **Offline Capabilities**: Learn anywhere, even without internet connection
- **Responsive Design**: Works perfectly on all devices
- **Multilingual**: French primary language with Malagasy cultural context

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Fifaliana-commits/HaySchool.git
   cd hayschool
   ```

2. **Install dependencies**
   ```bash
   # Frontend
   cd hay-school-react
   npm install

   # Backend (optional)
   cd ../backend-hono
   npm install
   ```

3. **Start development servers**
   ```bash
   # Terminal 1: Frontend
   cd hay-school-react
   npm run dev

   # Terminal 2: Backend (optional)
   cd ../backend-hono
   npm run dev
   ```

4. **Open your browser**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:8787

## 🏗️ Architecture

### Frontend (React + TypeScript + Vite)
- **Framework**: React 19 with TypeScript
- **Routing**: React Router DOM
- **Styling**: Tailwind CSS with custom components
- **State Management**: TanStack Query for server state
- **Build Tool**: Vite
- **Deployment**: Cloudflare Pages

### Backend (Hono + Cloudflare Workers)
- **Framework**: Hono (lightweight web framework)
- **Runtime**: Cloudflare Workers
- **Language**: TypeScript
- **Database**: In-memory (extendable to D1, KV, R2)
- **API**: RESTful with validation

## 📚 Subjects Overview

### 🧮 **Mathématiques**
- Les nombres et comptage
- Addition et soustraction
- Géométrie et formes
- Résolution de problèmes

### 📚 **Français**
- Alphabet et phonétique
- Lecture et compréhension
- Rédaction et grammaire
- Vocabulaire enrichi

### 🔬 **Sciences**
- Monde naturel
- Physique fondamentale
- Biologie élémentaire
- Expériences simples

### 🏛️ **Histoire**
- Histoire de Madagascar
- Grandes figures historiques
- Événements importants
- Chronologie

### 🌍 **Géographie**
- Continents et pays
- Madagascar et ses régions
- Environnement naturel
- Cartes et orientation

### 🇬🇧 **Anglais**
- Vocabulaire de base
- Phrases essentielles
- Communication simple
- Culture anglophone

## 🎯 Learning Features

### Adaptive Learning
- Difficulty adjustment based on performance
- Personalized learning paths
- Progress-based content unlocking

### Gamification Elements
- Achievement badges
- Streak counters
- Progress visualization
- Reward system

### Offline Capabilities
- Core lessons available offline
- Progress synchronization
- Cached content management

## 📁 Project Structure

```
hayschool/
├── hay-school-react/          # Frontend React application
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   │   ├── Layout/        # App shell and navigation
│   │   │   └── ui/            # Base UI components
│   │   ├── pages/             # Route-based page components
│   │   │   ├── Home/          # Landing page
│   │   │   ├── Categories/    # Subject selection
│   │   │   ├── Subject/       # Subject-specific content
│   │   │   ├── Profile/       # User profile management
│   │   │   └── About/         # Information pages
│   │   ├── hooks/             # Custom React hooks
│   │   ├── types/             # TypeScript definitions
│   │   ├── utils/             # Helper functions
│   │   └── test/              # Test utilities
│   ├── package.json
│   ├── tailwind.config.js
│   ├── vitest.config.ts       # Test configuration
│   └── tsconfig.json
├── backend-hono/              # Backend Hono application
│   ├── src/
│   │   ├── routes/            # API route handlers
│   │   │   ├── subjects.ts    # Subject management
│   │   │   ├── users.ts       # User profiles and progress
│   │   │   ├── progress.ts    # Learning progress tracking
│   │   │   └── contact.ts     # Contact form handling
│   │   ├── index.ts           # Main application entry
│   │   └── test/              # API tests
│   ├── wrangler.toml          # Cloudflare Workers config
│   ├── package.json
│   ├── tsconfig.json
│   └── vitest.config.ts       # Test configuration
├── backend/                   # Alternative Node.js backend
├── docs/                      # Documentation
├── specs/                     # Project specifications
├── image/                     # Static assets
├── js/                        # Legacy JavaScript files
├── styles/                    # CSS files
└── README.md
```

## 🔧 Development

### Available Scripts

#### Frontend
```bash
cd hay-school-react

# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type checking
npm run type-check

# Linting
npm run lint
```

#### Backend
```bash
cd backend-hono

# Development server
npm run dev

# Deploy to Cloudflare
npm run deploy

# Build for production
npm run build

# Type checking
npm run type-check
```

### Environment Variables

#### Frontend (.env)
```env
# No environment variables required for basic functionality
# Add API endpoints if using external services
```

#### Backend (wrangler.toml)
```toml
# Cloudflare Workers configuration
# Add your deployment-specific variables here
```

## 🚀 Deployment

### Cloudflare Pages (Frontend)
1. Connect your GitHub repository to Cloudflare Pages
2. Set build command: `npm run build`
3. Set build output directory: `dist`
4. Add environment variables if needed

### Cloudflare Workers (Backend)
1. Install Wrangler CLI: `npm install -g wrangler`
2. Login to Cloudflare: `wrangler auth login`
3. Deploy: `npm run deploy`

## 🧪 Testing

```bash
# Run frontend tests
cd hay-school-react
npm run test

# Run backend tests
cd ../backend-hono
npm run test
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Use TypeScript for all new code
- Follow ESLint configuration
- Write tests for new features
- Update documentation for API changes
- Ensure accessibility compliance

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built for Malagasy children and educators
- Inspired by modern educational platforms
- Thanks to the open-source community

## 📞 Support

- **GitHub Issues**: [Report bugs or request features](https://github.com/Fifaliana-commits/HaySchool/issues)
- **Documentation**: [docs/](docs/)

---

**Made with ❤️ for Malagasy children** 🇲🇬