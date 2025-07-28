# 🚀 Railway Deployment Guide - AV+V Venue Management Platform

## 📋 Prerequisites

1. **GitHub Account** - Your code needs to be on GitHub
2. **Railway Account** - Sign up at [railway.app](https://railway.app)
3. **Railway CLI** (optional) - `npm install -g @railway/cli`

## 🎯 Deployment Steps

### Step 1: Push to GitHub
```bash
# Initialize git if not already done
git init
git add .
git commit -m "Initial commit for Railway deployment"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

### Step 2: Create Railway Project
1. Go to [railway.app](https://railway.app)
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Choose your repository
5. Railway will auto-detect your app structure

### Step 3: Configure Services
Railway will detect:
- **Frontend**: Next.js app in `frontend/`
- **Backend**: Node.js app in `backend/`
- **Database**: Will be auto-provisioned

### Step 4: Environment Variables
Add these in Railway dashboard:
```
# Database
DATABASE_URL=your_railway_postgres_url

# Backend
PORT=3001
NODE_ENV=production

# Frontend
NEXT_PUBLIC_API_URL=your_backend_railway_url
```

### Step 5: Deploy
1. Railway will automatically build and deploy
2. Check the deployment logs for any issues
3. Your app will be live at the provided URL

## 🔧 Troubleshooting

### Common Issues:
1. **Build Failures**: Check Railway logs
2. **Database Connection**: Verify DATABASE_URL
3. **Port Issues**: Ensure PORT is set correctly
4. **Environment Variables**: Double-check all variables

### Useful Commands:
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Check deployment status
railway status

# View logs
railway logs
```

## 📊 Monitoring

- **Dashboard**: Monitor your app in Railway dashboard
- **Logs**: Real-time logs available
- **Metrics**: Performance metrics included
- **Scaling**: Easy to scale up if needed

## 🔗 Useful Links

- [Railway Dashboard](https://railway.app)
- [Railway Documentation](https://docs.railway.app)
- [Railway Discord](https://discord.gg/railway)

## ✅ Success Checklist

- [ ] Code pushed to GitHub
- [ ] Railway project created
- [ ] Services configured
- [ ] Environment variables set
- [ ] Deployment successful
- [ ] App accessible via URL
- [ ] Database connected
- [ ] All features working

## 🎉 Your app will be live at: `https://your-app-name.railway.app` 