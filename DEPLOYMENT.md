# Cloudflare Deployment Guide

This guide explains how to deploy the Hay School platform to Cloudflare's edge network.

## Prerequisites

1. **Cloudflare Account**: You need a Cloudflare account
2. **API Token**: Generate an API token with the following permissions:
   - Account: Cloudflare Pages:Edit
   - Account: Workers:Edit
   - Account: Account Settings:Read
   - User: User Details:Read

## Environment Setup

### 1. GitHub Secrets (for CI/CD)

Add these secrets to your GitHub repository:

```bash
CLOUDFLARE_API_TOKEN=your_api_token_here
CLOUDFLARE_ACCOUNT_ID=2162d7153d40325f96db8ef869fee06b
```

### 2. Local Environment Variables

Create `.env` files in each service directory:

#### Backend (`backend-hono/.env`)
```env
CLOUDFLARE_API_TOKEN=your_api_token_here
CLOUDFLARE_ACCOUNT_ID=2162d7153d40325f96db8ef869fee06b
```

#### Frontend (`hay-school-react/.env`)
```env
VITE_API_URL=https://hay-school-backend.your-subdomain.workers.dev
```

## Manual Deployment

### Backend Deployment (Cloudflare Workers)

```bash
cd backend-hono
npm install
npm run cf:deploy
```

### Frontend Deployment (Cloudflare Pages)

```bash
cd hay-school-react
npm install
npm run build
npm run cf:deploy
```

### Full Deployment

From the project root:

```bash
npm run deploy
```

This will deploy both frontend and backend.

## CI/CD Deployment

The project includes GitHub Actions for automated deployment:

- **Trigger**: Push to `main` or `master` branch
- **Backend**: Deploys to Cloudflare Workers
- **Frontend**: Deploys to Cloudflare Pages

### Workflow Status

Check deployment status:
- Go to your GitHub repository
- Click "Actions" tab
- View the "Deploy to Cloudflare" workflow

## Domain Configuration

### Custom Domain (Optional)

1. **Cloudflare Pages**:
   - Go to Cloudflare Dashboard → Pages
   - Select your project
   - Go to "Custom domains"
   - Add your custom domain

2. **Cloudflare Workers**:
   - Go to Cloudflare Dashboard → Workers
   - Select your worker
   - Go to "Triggers"
   - Add custom domain

### Update Environment Variables

After setting up custom domains, update:

```env
# hay-school-react/.env
VITE_API_URL=https://your-api-domain.com
```

```toml
# backend-hono/wrangler.toml
ALLOWED_ORIGINS = "https://your-frontend-domain.com"
```

## Troubleshooting

### Common Issues

1. **Authentication Failed**:
   ```bash
   # Check your API token
   npx wrangler whoami

   # Re-authenticate if needed
   npx wrangler auth login
   ```

2. **Build Failures**:
   - Check GitHub Actions logs
   - Ensure all dependencies are installed
   - Verify Node.js version compatibility

3. **CORS Issues**:
   - Update `ALLOWED_ORIGINS` in `wrangler.toml`
   - Ensure frontend `VITE_API_URL` matches your worker domain

### Useful Commands

```bash
# Check Cloudflare authentication
npx wrangler whoami

# List deployments
npx wrangler deployments

# View worker logs
npx wrangler tail

# Check Pages deployment
npx wrangler pages deployment list
```

## Performance Monitoring

- **Cloudflare Analytics**: Monitor performance and usage
- **Workers Metrics**: Check worker execution times
- **Pages Analytics**: Track page views and performance

## Security

- API tokens are stored securely in GitHub secrets
- CORS is configured to prevent unauthorized access
- All traffic goes through Cloudflare's edge network

---

**Need Help?** Check the [main README](README.md) or open an issue.
