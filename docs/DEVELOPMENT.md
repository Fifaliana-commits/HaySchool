# Development Guide

This guide covers setting up the development environment, coding standards, and contribution guidelines for Hay School.

## 🛠️ Development Setup

### Prerequisites

- **Node.js**: Version 18 or higher
- **npm**: Latest version (comes with Node.js)
- **Git**: Latest version
- **Code Editor**: VS Code recommended with extensions

### Quick Setup

```bash
# Clone the repository
git clone https://github.com/your-username/hay-school.git
cd hay-school

# Setup frontend
cd hay-school-react
npm install

# Setup backend
cd ../backend-hono
npm install

# Start development servers
# Terminal 1: Frontend
npm run dev

# Terminal 2: Backend
npm run dev
```

### Environment Setup

#### Frontend Environment (.env.local)
```env
# No environment variables required for basic development
# Add your API endpoints when backend is deployed
VITE_API_URL=http://localhost:8787
```

#### Backend Environment
No environment variables needed for basic development. Add to `wrangler.toml` for production.

## 🏗️ Project Structure

```
hay-school/
├── hay-school-react/          # Frontend React application
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   │   ├── Layout/        # Layout components
│   │   │   └── ui/            # Base UI components
│   │   ├── pages/             # Page components
│   │   │   ├── Home/          # Home page
│   │   │   ├── Categories/    # Categories page
│   │   │   ├── Subject/       # Subject pages
│   │   │   ├── Profile/       # User profile
│   │   │   └── About/         # About page
│   │   ├── hooks/             # Custom React hooks
│   │   ├── types/             # TypeScript definitions
│   │   ├── utils/             # Utility functions
│   │   └── lib/               # Library configurations
│   ├── public/                # Static assets
│   └── package.json
├── backend-hono/              # Backend Hono application
│   ├── src/
│   │   ├── routes/            # API route handlers
│   │   └── index.ts           # Main application entry
│   ├── wrangler.toml          # Cloudflare configuration
│   └── package.json
├── docs/                      # Documentation
└── README.md
```

## 🎯 Development Workflow

### 1. Choose a Task

Check the [project board](https://github.com/your-username/hay-school/projects) for available tasks:

- 🔴 **High Priority**: Core functionality bugs
- 🟡 **Medium Priority**: Feature enhancements
- 🟢 **Low Priority**: Nice-to-have features

### 2. Create a Branch

```bash
# Create and switch to new branch
git checkout -b feature/your-feature-name

# Or for bug fixes
git checkout -b fix/issue-description
```

### 3. Development Process

```bash
# Start development servers
cd hay-school-react && npm run dev    # Frontend
cd ../backend-hono && npm run dev     # Backend

# Make your changes...
# Test your changes...

# Run tests
npm run test

# Lint code
npm run lint

# Type check
npm run type-check
```

### 4. Commit Changes

```bash
# Stage your changes
git add .

# Commit with descriptive message
git commit -m "feat: add user profile creation

- Add profile creation form
- Implement form validation
- Add API integration
- Update user interface"

# Push to your branch
git push origin feature/your-feature-name
```

### 5. Create Pull Request

1. Go to GitHub and create a PR
2. Fill out the PR template
3. Request review from maintainers
4. Address review feedback
5. Merge when approved

## 📝 Coding Standards

### TypeScript

- **Strict mode**: All code must pass TypeScript strict checks
- **Type definitions**: Define types for all data structures
- **Interface vs Type**: Use interfaces for objects, types for unions

```typescript
// ✅ Good
interface User {
  id: string;
  name: string;
  email: string;
}

type UserRole = 'admin' | 'teacher' | 'student';

// ❌ Bad
interface User {
  id: any;        // Use specific types
  name: string;
  email?: string; // Be explicit about optionals
}
```

### React

- **Functional components**: Use functional components with hooks
- **Custom hooks**: Extract reusable logic into custom hooks
- **Component naming**: PascalCase for components, camelCase for instances

```tsx
// ✅ Good
function UserProfile({ user }: UserProfileProps) {
  const { data, isLoading } = useUserData(user.id);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="user-profile">
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}

// ❌ Bad
const userprofile = (props) => {  // Wrong naming
  return <div>{props.user.name}</div>; // No TypeScript, no loading state
};
```

### CSS/Tailwind

- **Utility-first**: Prefer Tailwind utilities over custom CSS
- **Component classes**: Create component-specific classes for complex styles
- **Responsive design**: Mobile-first approach

```tsx
// ✅ Good
<button className="btn-primary">
  Click me
</button>

// ❌ Bad
<button style={{ backgroundColor: 'blue', color: 'white' }}>
  Click me
</button>
```

### API Design

- **RESTful**: Follow REST conventions
- **Consistent responses**: Use consistent response format
- **Error handling**: Proper error responses with status codes

```typescript
// ✅ Good API response
app.get('/api/users/:id', (c) => {
  const user = getUser(c.req.param('id'));

  if (!user) {
    return c.json({
      success: false,
      error: 'User not found'
    }, 404);
  }

  return c.json({
    success: true,
    data: user
  });
});
```

## 🧪 Testing

### Frontend Testing

```bash
cd hay-school-react

# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Backend Testing

```bash
cd backend-hono

# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch
```

### Test Structure

```typescript
// Component test example
import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import UserProfile from './UserProfile';

test('displays user name', () => {
  const user = { id: '1', name: 'John Doe', email: 'john@example.com' };

  render(<UserProfile user={user} />);

  expect(screen.getByText('John Doe')).toBeInTheDocument();
});
```

### API Testing

```typescript
// API test example
import { expect, test } from 'vitest';

test('GET /api/health returns healthy status', async () => {
  const response = await fetch('http://localhost:8787/api/health');
  const data = await response.json();

  expect(response.status).toBe(200);
  expect(data.status).toBe('healthy');
});
```

## 🔍 Code Quality

### Linting

```bash
# Frontend linting
cd hay-school-react
npm run lint

# Backend linting
cd backend-hono
npm run lint
```

### Type Checking

```bash
# Frontend type check
cd hay-school-react
npm run type-check

# Backend type check
cd backend-hono
npm run type-check
```

### Pre-commit Hooks

We use Husky for pre-commit hooks:

```bash
# Install husky
npm install husky --save-dev

# Initialize husky
npx husky init

# Add pre-commit hook
echo "npm run lint && npm run type-check && npm run test" > .husky/pre-commit
```

## 🚀 Performance

### Frontend Performance

- **Bundle size**: Keep initial bundle under 200KB
- **Lazy loading**: Use React.lazy for route components
- **Image optimization**: Use next/image or similar
- **Caching**: Implement proper caching strategies

```tsx
// ✅ Lazy loading
const SubjectPage = lazy(() => import('./pages/Subject/Subject'));

// ✅ Image optimization
import Image from 'next/image';

<Image
  src="/hero.jpg"
  alt="Hero image"
  width={800}
  height={600}
  priority
/>
```

### Backend Performance

- **Response time**: Keep API responses under 200ms
- **Caching**: Implement caching for frequently accessed data
- **Database optimization**: Use indexes and optimize queries

## 🔒 Security

### Frontend Security

- **Content Security Policy**: Implement CSP headers
- **XSS prevention**: Sanitize user inputs
- **HTTPS only**: Always use HTTPS in production

### Backend Security

- **Input validation**: Validate all inputs with Zod
- **Rate limiting**: Implement rate limiting
- **CORS**: Configure CORS properly

```typescript
// ✅ Input validation
import { z } from 'zod';

const userSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
});

app.post('/api/users', zValidator('json', userSchema), async (c) => {
  const userData = c.req.valid('json');
  // Safe to use userData
});
```

## 📱 Responsive Design

### Breakpoints

```css
/* Mobile-first approach */
.container {
  @apply w-full px-4;
}

@media (min-width: 640px) {
  .container {
    @apply max-w-screen-sm;
  }
}

@media (min-width: 768px) {
  .container {
    @apply max-w-screen-md;
  }
}

@media (min-width: 1024px) {
  .container {
    @apply max-w-screen-lg;
  }
}
```

### Testing Responsiveness

```bash
# Using Chrome DevTools
# Or use responsive testing tools
npm install -g lighthouse
lighthouse http://localhost:5173 --preset=desktop
```

## 🎨 Design System

### Colors

```css
/* Primary colors */
--color-primary-50: #eff6ff;
--color-primary-500: #3b82f6;
--color-primary-900: #1e3a8a;

/* Semantic colors */
--color-success: #22c55e;
--color-warning: #f59e0b;
--color-error: #ef4444;
```

### Typography

```css
/* Font hierarchy */
.text-display { @apply text-4xl font-bold leading-tight; }
.text-heading { @apply text-2xl font-semibold leading-snug; }
.text-body { @apply text-base leading-relaxed; }
.text-caption { @apply text-sm text-gray-600; }
```

### Components

```tsx
// Button variants
function Button({ variant = 'primary', children, ...props }) {
  const baseClasses = 'px-4 py-2 rounded-md font-medium transition-colors';
  const variants = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
    danger: 'bg-red-600 text-white hover:bg-red-700',
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]}`}
      {...props}
    >
      {children}
    </button>
  );
}
```

## 🔧 Tools & Extensions

### VS Code Extensions

```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-typescript-next",
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-eslint",
    "ms-vscode.vscode-json",
    "christian-kohler.path-intelligence",
    "ms-vscode.vscode-git-graph"
  ]
}
```

### Browser Extensions

- **React Developer Tools**: Debug React components
- **Lighthouse**: Performance auditing
- **Wave**: Accessibility testing

## 📚 Resources

### Learning Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Hono Documentation](https://hono.dev)
- [Cloudflare Workers](https://developers.cloudflare.com/workers/)

### Useful Commands

```bash
# Generate component boilerplate
npm run generate:component ComponentName

# Update dependencies
npm run update-deps

# Clean install
rm -rf node_modules package-lock.json && npm install

# Check bundle size
npm run analyze-bundle
```

## 🤝 Contributing Guidelines

### Issue Reporting

1. **Check existing issues** before creating new ones
2. **Use issue templates** when available
3. **Provide detailed information**:
   - Steps to reproduce
   - Expected vs actual behavior
   - Browser/OS information
   - Screenshots if applicable

### Pull Request Process

1. **Update documentation** for any API changes
2. **Add tests** for new features
3. **Update README** if needed
4. **Follow commit conventions**:
   ```bash
   # Types: feat, fix, docs, style, refactor, test, chore
   git commit -m "feat: add dark mode toggle

   - Add theme context
   - Implement theme switcher
   - Persist theme preference"
   ```

### Code Review Checklist

- [ ] TypeScript types are correct
- [ ] Tests pass
- [ ] Code is linted
- [ ] Documentation updated
- [ ] Performance impact considered
- [ ] Accessibility maintained
- [ ] Mobile responsive
- [ ] No console.log statements

## 🚨 Emergency Procedures

### Rollback Process

```bash
# Revert to previous commit
git revert HEAD

# Force push if needed (be careful!)
git push origin main --force-with-lease
```

### Data Recovery

1. Check database backups
2. Restore from latest backup
3. Verify data integrity
4. Notify users of incident

### Security Incident

1. **Isolate**: Disconnect affected systems
2. **Assess**: Determine scope of breach
3. **Contain**: Implement temporary fixes
4. **Recover**: Restore from clean backups
5. **Report**: Notify affected users and authorities

## 📞 Support

### Getting Help

1. **Check documentation** first
2. **Search existing issues** on GitHub
3. **Ask in discussions** for general questions
4. **Create issue** for bugs/features

### Communication

- **Issues**: Bug reports and feature requests
- **Discussions**: General questions and help
- **Pull Requests**: Code contributions
- **Security**: security@hay-school.mg for security issues

---

Happy coding! 🎉
