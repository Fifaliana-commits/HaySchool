# Hay School - Educational Platform for Malagasy Children

[![Deploy to Cloudflare](https://github.com/your-username/hay-school/actions/workflows/deploy.yml/badge.svg)](https://github.com/your-username/hay-school/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Hay School is an interactive educational platform designed specifically for Malagasy children aged 6-12. Built with React, TypeScript, and deployed on Cloudflare, it offers a comprehensive learning experience across 6 core subjects with gamification and offline capabilities.

## 🌟 Features

- **6 Core Subjects**: Mathématiques, Français, Sciences, Histoire, Géographie, Anglais
- **Child-Friendly Design**: Bright colors, engaging animations, and intuitive navigation
- **Offline-First**: Learn anywhere, even without internet connection
- **Progress Tracking**: Visual indicators and achievement system
- **Gamification**: Badges, streaks, and rewards to maintain engagement
- **Multilingual**: French primary language with Malagasy cultural context
- **Responsive Design**: Works perfectly on all devices

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/hay-school.git
   cd hay-school
   ```

2. **Install dependencies**
   ```bash
   # Frontend
   cd hay-school-react
   npm install

   # Backend
   cd ../backend-hono
   npm install
   ```

3. **Start development servers**
   ```bash
   # Terminal 1: Frontend
   cd hay-school-react
   npm run dev

   # Terminal 2: Backend
   cd backend-hono
   npm run dev
   ```

4. **Open your browser**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:8787

## 🏗️ Architecture

### Frontend (React + TypeScript)
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

### Project Structure
```
hay-school/
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
├── docs/                      # Documentation
│   ├── API.md                 # API documentation
│   ├── ARCHITECTURE.md        # System architecture
│   ├── DEPLOYMENT.md          # Deployment guide
│   └── DEVELOPMENT.md         # Development guide
├── .github/workflows/         # CI/CD pipelines
│   └── deploy.yml            # GitHub Actions deployment
└── README.md
```

## 📚 Subjects Overview

### 🧮 Mathématiques
- Les nombres et comptage
- Addition et soustraction
- Géométrie et formes
- Résolution de problèmes

### 📚 Français
- Alphabet et phonétique
- Lecture et compréhension
- Rédaction et grammaire
- Vocabulaire enrichi

### 🔬 Sciences
- Monde naturel
- Physique fondamentale
- Biologie élémentaire
- Expériences simples

### 🏛️ Histoire
- Histoire de Madagascar
- Grandes figures historiques
- Événements importants
- Chronologie

### 🌍 Géographie
- Continents et pays
- Madagascar et ses régions
- Environnement naturel
- Cartes et orientation

### 🇬🇧 Anglais
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

### CI/CD Pipeline
The project includes GitHub Actions for automated deployment:
- Frontend deployment on push to main
- Backend deployment on push to main
- Automated testing and linting

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

## 📋 API Documentation

### Subjects API
```
GET    /api/subjects           # Get all subjects
GET    /api/subjects/:id       # Get subject by ID
GET    /api/subjects/:id/modules # Get modules for subject
```

### Users API
```
GET    /api/users              # Get all users
POST   /api/users              # Create user profile
GET    /api/users/:id          # Get user by ID
PUT    /api/users/:id          # Update user profile
```

### Progress API
```
GET    /api/progress/user/:userId           # Get user progress
POST   /api/progress                       # Update progress
GET    /api/progress/stats                 # Get statistics
```

### Contact API
```
POST   /api/contact            # Submit contact form
GET    /api/contact            # Get all messages (admin)
GET    /api/contact/stats      # Get contact statistics
```

## 🧪 Testing

```bash
# Run frontend tests
cd hay-school-react
npm run test

# Run backend tests
cd backend-hono
npm run test
```

## 📊 Performance

### Core Web Vitals Targets
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

### Offline Performance
- Service Worker caching strategy
- IndexedDB for local data storage
- Background sync for progress updates

## 🔒 Security

- Content Security Policy (CSP) headers
- HTTPS-only deployment
- Input validation and sanitization
- Rate limiting on API endpoints
- Child-safe content guidelines

## 🌐 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built for Malagasy children and educators
- Inspired by modern educational platforms
- Thanks to the open-source community

## 📞 Support

- **Email**: support@hay-school.mg
- **Documentation**: [docs/](docs/)
- **Issues**: [GitHub Issues](https://github.com/your-username/hay-school/issues)

---

**Made with ❤️ for Malagasy children** 🇲🇬
