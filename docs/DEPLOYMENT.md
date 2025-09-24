# Deployment Guide

This guide covers deploying Hay School to Cloudflare Pages (frontend) and Cloudflare Workers (backend).

## Prerequisites

- Cloudflare account
- GitHub repository
- Node.js 18+
- Wrangler CLI installed globally

## 🚀 Quick Deployment

### Option 1: One-Click Deploy

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/your-username/hay-school)

### Option 2: Manual Deployment

## Frontend Deployment (Cloudflare Pages)

### Method 1: GitHub Integration

1. **Connect Repository**
   - Go to [Cloudflare Pages](https://pages.cloudflare.com)
   - Click "Create a project"
   - Select "Connect to Git"
   - Choose your GitHub repository

2. **Configure Build Settings**
   ```
   Build command: npm run build
   Build output directory: dist
   Root directory: hay-school-react
   ```

3. **Environment Variables** (optional)
   - Add any required environment variables
   - For production APIs, add backend URL

4. **Deploy**
   - Cloudflare will automatically deploy on git push
   - Get your Pages URL: `https://your-project.pages.dev`

### Method 2: Manual Upload

```bash
# Build the frontend
cd hay-school-react
npm run build

# The dist/ folder contains your built files
# Upload dist/ to Cloudflare Pages via dashboard
```

## Backend Deployment (Cloudflare Workers)

### Using Wrangler CLI

1. **Install Wrangler**
   ```bash
   npm install -g wrangler
   ```

2. **Authenticate**
   ```bash
   wrangler auth login
   ```

3. **Deploy Backend**
   ```bash
   cd backend-hono
   npm run deploy
   ```

4. **Get Worker URL**
   - Worker URL: `https://your-worker.your-subdomain.workers.dev`
   - Update frontend environment with this URL

## CI/CD Pipeline

### GitHub Actions Setup

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Cloudflare

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
          cache-dependency-path: hay-school-react/package-lock.json

      - name: Install dependencies
        run: |
          cd hay-school-react
          npm ci

      - name: Build
        run: |
          cd hay-school-react
          npm run build

      - name: Deploy to Cloudflare Pages
        uses: cloudflare/pages-action@v1
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          projectName: hay-school-frontend
          directory: hay-school-react/dist
          gitHubToken: ${{ secrets.GITHUB_TOKEN }}

  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
          cache-dependency-path: backend-hono/package-lock.json

      - name: Install dependencies
        run: |
          cd backend-hono
          npm ci

      - name: Deploy to Cloudflare Workers
        uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          workingDirectory: backend-hono
```

### Required Secrets

Add these to your GitHub repository secrets:

- `CLOUDFLARE_API_TOKEN`: Your Cloudflare API token
- `CLOUDFLARE_ACCOUNT_ID`: Your Cloudflare account ID

## Environment Configuration

### Production Environment Variables

#### Frontend (.env.production)
```env
VITE_API_URL=https://your-worker.your-subdomain.workers.dev
VITE_APP_ENV=production
```

#### Backend (wrangler.toml)
```toml
[vars]
NODE_ENV = "production"
ALLOWED_ORIGINS = "https://your-project.pages.dev"

# Database (if using D1)
# [[d1_databases]]
# binding = "DB"
# database_name = "hay-school-db"
# database_id = "your-database-id"

# KV for caching
# [[kv_namespaces]]
# binding = "CACHE"
# id = "your-kv-namespace-id"
```

## Domain Configuration

### Custom Domain Setup

1. **Add Domain to Cloudflare**
   - Go to Cloudflare Dashboard
   - Add your domain
   - Update nameservers

2. **Configure Pages Custom Domain**
   - Go to Pages project
   - Settings → Custom domains
   - Add your domain (e.g., `hay-school.mg`)

3. **Configure Workers Custom Domain**
   - Go to Workers
   - Your worker → Triggers
   - Add custom domain (e.g., `api.hay-school.mg`)

## Database Setup (Optional)

### Cloudflare D1 Database

1. **Create D1 Database**
   ```bash
   wrangler d1 create hay-school-db
   ```

2. **Run Migrations**
   ```bash
   # Create migration file
   wrangler d1 execute hay-school-db --file=./migrations/001_init.sql

   # Or use Prisma with D1
   npx prisma generate --schema=./prisma/schema.prisma
   npx prisma db push --schema=./prisma/schema.prisma
   ```

3. **Update wrangler.toml**
   ```toml
   [[d1_databases]]
   binding = "DB"
   database_name = "hay-school-db"
   database_id = "your-database-id"
   ```

## Monitoring & Analytics

### Cloudflare Analytics

- **Real User Monitoring**: Enable in Pages/Workers settings
- **Web Analytics**: Free analytics for your domain
- **Security Analytics**: Monitor threats and attacks

### Logging

```bash
# View worker logs
wrangler tail

# View pages deployment logs
# Available in Cloudflare dashboard
```

## Performance Optimization

### Frontend Optimizations

1. **Enable Auto Minify**
   - Pages Settings → Build & deployments
   - Enable HTML, CSS, JS minification

2. **Configure Caching**
   ```bash
   # _headers file in public/
   /*
     Cache-Control: public, max-age=31536000, immutable
   ```

3. **Image Optimization**
   - Use Cloudflare Images
   - Enable Mirage for automatic optimization

### Backend Optimizations

1. **Enable Caching**
   ```typescript
   // In your Hono app
   app.use('*', cache({
     cacheName: 'hay-school-cache',
     cacheControl: 'max-age=3600'
   }));
   ```

2. **Database Optimization**
   - Use D1 for relational data
   - Use KV for key-value caching
   - Use R2 for file storage

## Security

### HTTPS & SSL

- Cloudflare provides automatic HTTPS
- SSL certificates managed automatically

### CORS Configuration

```typescript
// In backend
app.use('*', cors({
  origin: ['https://your-domain.com', 'https://your-project.pages.dev'],
  allowHeaders: ['Content-Type', 'Authorization'],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
```

### Rate Limiting

```typescript
// Basic rate limiting
app.use('*', async (c, next) => {
  // Implement rate limiting logic
  await next();
});
```

## Troubleshooting

### Common Issues

1. **Build Failures**
   ```bash
   # Check build logs
   cd hay-school-react
   npm run build

   # Check for TypeScript errors
   npm run type-check
   ```

2. **Deployment Failures**
   ```bash
   # Check wrangler configuration
   cd backend-hono
   wrangler whoami

   # Validate wrangler.toml
   wrangler deploy --dry-run
   ```

3. **CORS Issues**
   - Check ALLOWED_ORIGINS in wrangler.toml
   - Verify frontend API_URL

4. **Performance Issues**
   - Check Cloudflare Analytics
   - Monitor function duration in Workers
   - Optimize bundle size

### Debugging

```bash
# Local development with production env
wrangler dev --env production

# Test API endpoints
curl https://your-worker.workers.dev/api/health

# Check deployment status
wrangler deployments list
```

## Cost Optimization

### Free Tier Limits

- **Pages**: 500 builds/month, 100GB bandwidth
- **Workers**: 100,000 requests/day
- **D1**: 1GB database, 1 million rows read/month
- **KV**: 1GB storage, 10 million operations/month

### Cost Monitoring

- Set up billing alerts in Cloudflare dashboard
- Monitor usage in analytics
- Optimize resource usage

## Rollback Strategy

### Emergency Rollback

1. **Pages Rollback**
   - Go to Pages project
   - Deployments tab
   - Click "Rollback" on previous deployment

2. **Workers Rollback**
   ```bash
   # Deploy previous version
   wrangler deploy --version-id <previous-version>
   ```

### Version Control

- Use git tags for releases
- Keep deployment scripts versioned
- Document breaking changes

## Maintenance

### Regular Tasks

1. **Update Dependencies**
   ```bash
   cd hay-school-react && npm update
   cd ../backend-hono && npm update
   ```

2. **Monitor Performance**
   - Check Core Web Vitals
   - Monitor API response times
   - Review error logs

3. **Security Updates**
   - Keep Cloudflare up to date
   - Update dependencies regularly
   - Review security headers

### Backup Strategy

- Database backups (if using D1)
- Configuration backups
- Asset backups (if using R2)

---

## Support

- **Cloudflare Documentation**: [developers.cloudflare.com](https://developers.cloudflare.com)
- **Wrangler CLI**: [wrangler.dev](https://wrangler.dev)
- **GitHub Issues**: Report bugs and issues

For deployment issues, check:
1. Cloudflare dashboard for errors
2. GitHub Actions logs
3. Wrangler CLI output
4. Network connectivity
