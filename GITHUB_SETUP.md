# GitHub CI/CD Setup for Cloudflare Deployment

This guide walks you through setting up GitHub Actions for automated deployment to Cloudflare.

## 📋 Prerequisites

- ✅ **Cloudflare Account**: You have a Cloudflare account with API access
- ✅ **API Token**: `0YCukku6d_z-NYgu9IKZNrB2I6rj7-jctJXVCa6J` (already configured)
- ✅ **GitHub Repository**: `https://github.com/Fifaliana-commits/HaySchool.git`
- ✅ **Code Pushed**: All deployment files are committed and pushed

## 🔐 Step 1: Set Up GitHub Secrets

### 1.1 Navigate to Repository Settings

1. Go to your GitHub repository: https://github.com/Fifaliana-commits/HaySchool
2. Click on **"Settings"** tab
3. In the left sidebar, click **"Secrets and variables"**
4. Click **"Actions"**

### 1.2 Add Required Secrets

Add these two secrets:

#### Secret 1: CLOUDFLARE_API_TOKEN
```
Name: CLOUDFLARE_API_TOKEN
Value: 0YCukku6d_z-NYgu9IKZNrB2I6rj7-jctJXVCa6J
```

#### Secret 2: CLOUDFLARE_ACCOUNT_ID
```
Name: CLOUDFLARE_ACCOUNT_ID
Value: 2162d7153d40325f96db8ef869fee06b
```

### 1.3 Verify Secrets

After adding both secrets, you should see:
- ✅ CLOUDFLARE_API_TOKEN
- ✅ CLOUDFLARE_ACCOUNT_ID

## 🚀 Step 2: Trigger First Deployment

### 2.1 Check GitHub Actions

1. Go to your GitHub repository
2. Click on **"Actions"** tab
3. You should see the **"Deploy to Cloudflare"** workflow
4. Click on it to see the workflow details

### 2.2 Manual Trigger (Optional)

If the workflow doesn't start automatically, you can trigger it manually:

1. Go to **Actions** tab
2. Click **"Deploy to Cloudflare"**
3. Click **"Run workflow"** button
4. Select the **main** branch
5. Click **"Run workflow"**

## 📊 Step 3: Monitor Deployment

### 3.1 Watch the Workflow

The workflow will run these jobs:

#### Backend Deployment Job
- ✅ Install Node.js dependencies
- ✅ Run backend tests
- ✅ Build backend with Wrangler
- ✅ Deploy to Cloudflare Workers

#### Frontend Deployment Job
- ✅ Install Node.js dependencies
- ✅ Run frontend tests
- ✅ Build React application
- ✅ Deploy to Cloudflare Pages

### 3.2 Check Deployment Status

Monitor the deployment in real-time:

1. Click on the running workflow
2. Click on each job to see detailed logs
3. Look for these success indicators:
   - ✅ "Backend deployment successful"
   - ✅ "Frontend deployment successful"

## 🌐 Step 4: Access Your Deployed Application

### 4.1 Backend API (Cloudflare Workers)

After successful deployment, your backend will be available at:
```
https://hay-school-backend.[your-subdomain].workers.dev
```

**Note**: You'll need to register a workers.dev subdomain first. The deployment will prompt you for this.

### 4.2 Frontend (Cloudflare Pages)

Your frontend will be available at:
```
https://hay-school.pages.dev
```

## 🔧 Step 5: Configure Custom Domains (Optional)

### 5.1 Workers Custom Domain

1. Go to Cloudflare Dashboard → Workers
2. Select your worker: `hay-school-backend`
3. Click **"Triggers"**
4. Add your custom domain (e.g., `api.hay-school.mg`)

### 5.2 Pages Custom Domain

1. Go to Cloudflare Dashboard → Pages
2. Select your project: `hay-school-frontend`
3. Go to **"Custom domains"**
4. Add your custom domain (e.g., `hay-school.mg`)

### 5.3 Update Environment Variables

After adding custom domains, update these files:

#### `backend-hono/wrangler.toml`
```toml
ALLOWED_ORIGINS = "https://your-frontend-domain.com,https://hay-school.pages.dev"
```

#### `hay-school-react/.env`
```env
VITE_API_URL=https://your-api-domain.com
```

## 🔍 Step 6: Verify Everything Works

### 6.1 Test API Endpoints

Test your backend API:

```bash
# Health check
curl https://hay-school-backend.your-subdomain.workers.dev/health

# Get subjects
curl https://hay-school-backend.your-subdomain.workers.dev/api/subjects
```

### 6.2 Test Frontend

1. Visit your frontend URL
2. Check browser console for errors
3. Test all interactive features

### 6.3 Check Logs

Monitor your deployments:

1. **Workers Logs**: Cloudflare Dashboard → Workers → Your Worker → Logs
2. **Pages Logs**: Cloudflare Dashboard → Pages → Your Project → Functions (if applicable)

## 🚨 Troubleshooting

### Common Issues

#### 1. Authentication Failed
```
Error: Failed to authenticate with Cloudflare
```
**Solution**: Double-check your GitHub secrets are correct

#### 2. Build Failures
```
Error: npm install failed
```
**Solution**: Check the build logs and fix dependency issues

#### 3. Workers.dev Subdomain Required
```
Error: You need to register a workers.dev subdomain
```
**Solution**: Run `wrangler deploy` locally and follow the prompts

#### 4. CORS Issues
```
Access to fetch ... has been blocked by CORS policy
```
**Solution**: Update `ALLOWED_ORIGINS` in `wrangler.toml`

### Get Help

1. Check GitHub Actions logs for detailed error messages
2. Verify all secrets are set correctly
3. Test locally first: `npm run deploy:backend` and `npm run deploy:frontend`
4. Check Cloudflare Dashboard for service status

## 🎉 Success Indicators

Your CI/CD setup is working when:

- ✅ GitHub Actions workflow completes successfully
- ✅ Backend deployed to Cloudflare Workers
- ✅ Frontend deployed to Cloudflare Pages
- ✅ API endpoints respond correctly
- ✅ Frontend loads without errors
- ✅ All features work as expected

## 🔄 Future Deployments

Once set up, every push to the `main` branch will automatically:

1. Run tests
2. Build both services
3. Deploy to Cloudflare
4. Update your live application

**No manual intervention required!** 🚀

---

**Need help?** Check the [DEPLOYMENT.md](DEPLOYMENT.md) file for detailed deployment instructions.
