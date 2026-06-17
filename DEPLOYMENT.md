# 🚀 Deployment Guide

This guide covers deploying your MERN Expense Tracker to production servers.

## Backend Deployment

### Option 1: Deploy to Render.com

#### Prerequisites
- GitHub account with repository
- Render.com account
- MongoDB Atlas URI

#### Steps

1. **Push code to GitHub**
   ```bash
   git add .
   git commit -m "Ready for production"
   git push origin main
   ```

2. **Create Render Account**
   - Go to https://render.com
   - Sign up with GitHub

3. **Create Web Service**
   - Click "New +" button
   - Select "Web Service"
   - Connect your GitHub repository
   - Select `mern-expense-tracker` repository

4. **Configure Service**
   - Name: `expense-tracker-backend`
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `node server.js`
   - Root Directory: `backend`

5. **Set Environment Variables**
   - Click "Environment"
   - Add variables:
     ```
     MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/expense-tracker
     JWT_SECRET=your_super_secret_key_here
     JWT_EXPIRE=7d
     PORT=5000
     NODE_ENV=production
     FRONTEND_URL=https://your-frontend-domain.com
     ```

6. **Deploy**
   - Click "Deploy Web Service"
   - Wait for build to complete
   - Get your backend URL: `https://expense-tracker-backend-xxxx.onrender.com`

### Option 2: Deploy to Railway.app

1. **Create Railway Account**
   - Go to https://railway.app
   - Sign up with GitHub

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Connect your repository

3. **Add MongoDB Plugin**
   - In Railway dashboard
   - Click "+ Add Service"
   - Select "MongoDB"
   - Copy connection string

4. **Configure Variables**
   - Set environment variables in Railway dashboard
   - Update `MONGO_URI` with Railway MongoDB
   - Set other variables

5. **Deploy**
   - Select `backend` directory
   - Set start command: `node server.js`
   - Deploy

### Option 3: Deploy to Heroku (Alternative)

1. **Install Heroku CLI**
   ```bash
   npm install -g heroku
   ```

2. **Login to Heroku**
   ```bash
   heroku login
   ```

3. **Create App**
   ```bash
   heroku create expense-tracker-backend
   ```

4. **Set Environment Variables**
   ```bash
   heroku config:set MONGO_URI="your_mongo_uri"
   heroku config:set JWT_SECRET="your_jwt_secret"
   heroku config:set JWT_EXPIRE="7d"
   heroku config:set NODE_ENV="production"
   heroku config:set FRONTEND_URL="https://your-frontend.com"
   ```

5. **Deploy**
   ```bash
   git subtree push --prefix backend heroku main
   ```

6. **View Logs**
   ```bash
   heroku logs --tail
   ```

## Frontend Deployment

### Option 1: Deploy to Vercel

#### Prerequisites
- GitHub account
- Vercel account

#### Steps

1. **Create Vercel Account**
   - Go to https://vercel.com
   - Sign up with GitHub

2. **Import Project**
   - Click "New Project"
   - Select your GitHub repository
   - Click "Import"

3. **Configure Build**
   - Framework: `Vite`
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`

4. **Set Environment Variables**
   - Add `VITE_API_URL`: `https://your-backend-domain.com/api`

5. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete
   - Get your frontend URL

### Option 2: Deploy to Netlify

1. **Create Netlify Account**
   - Go to https://netlify.com
   - Sign up with GitHub

2. **Create New Site**
   - Click "New site from Git"
   - Select your repository

3. **Configure Build**
   - Base directory: `frontend`
   - Build command: `npm run build`
   - Publish directory: `dist`

4. **Set Environment Variables**
   - Go to Site settings → Build & Deploy → Environment
   - Add `VITE_API_URL=https://your-backend-domain.com/api`

5. **Deploy**
   - Click "Deploy site"
   - Monitor deployment progress

### Option 3: Deploy to GitHub Pages

1. **Update vite.config.js**
   ```javascript
   export default {
     base: '/',
     // other config
   }
   ```

2. **Build**
   ```bash
   cd frontend
   npm run build
   ```

3. **Deploy to GitHub Pages**
   ```bash
   npm install --save-dev gh-pages
   ```

4. **Update package.json**
   ```json
   {
     "homepage": "https://yourusername.github.io/mern-expense-tracker",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

5. **Deploy**
   ```bash
   npm run deploy
   ```

## Post-Deployment Configuration

### Update Frontend API URL

After deploying backend, update frontend environment variables:

**Vercel**
- Settings → Environment Variables
- Add: `VITE_API_URL=https://your-backend-url/api`
- Redeploy

**Netlify**
- Site settings → Build & Deploy → Environment
- Add: `VITE_API_URL=https://your-backend-url/api`
- Trigger redeploy

### Update Backend CORS

Update backend `.env` with frontend URL:

```env
FRONTEND_URL=https://your-frontend-domain.com
```

Re-deploy backend.

## MongoDB Atlas Setup for Production

1. **Create MongoDB Atlas Account**
   - Go to https://www.mongodb.com/cloud/atlas
   - Sign up

2. **Create Cluster**
   - Click "Create a Deployment"
   - Choose free tier
   - Select region close to you
   - Click "Create Deployment"

3. **Create Database User**
   - Go to "Database Access"
   - Click "Add New Database User"
   - Create username and password
   - Add to all clusters

4. **Get Connection String**
   - Go to "Database" → "Connect"
   - Choose "Drivers"
   - Copy connection string
   - Replace `<username>`, `<password>`, `<database>`

5. **Whitelist IPs**
   - Go to "Network Access"
   - Click "Add IP Address"
   - For development: Add your IP
   - For production: Add `0.0.0.0/0` (all IPs) - use with caution

## Production Best Practices

### Backend
- ✅ Set `NODE_ENV=production`
- ✅ Use strong JWT_SECRET
- ✅ Enable CORS only for your frontend domain
- ✅ Use MongoDB Atlas (production database)
- ✅ Enable database backups
- ✅ Use HTTPS only
- ✅ Set proper rate limiting
- ✅ Monitor server logs
- ✅ Set up error tracking (Sentry)

### Frontend
- ✅ Use production build (`npm run build`)
- ✅ Enable gzip compression
- ✅ Use CDN for static assets
- ✅ Set proper cache headers
- ✅ Monitor performance (Google Analytics)
- ✅ Set up error tracking
- ✅ Use HTTPS only
- ✅ Enable minification

## SSL/HTTPS Setup

### For Custom Domains on Render

1. Go to Render dashboard
2. Select your service
3. Go to "Settings"
4. Add custom domain
5. Update DNS records
6. SSL certificate auto-generated

### For Custom Domains on Vercel/Netlify

- Both services provide free SSL certificates
- Add custom domain in settings
- Update DNS records
- Certificate auto-generated

## Monitoring and Maintenance

### Server Monitoring
- Use Render/Railway/Heroku dashboards
- Monitor CPU, memory, bandwidth
- Set up alerts

### Error Tracking
- Install Sentry
- Track errors in production
- Get alerts for critical errors

### Performance Monitoring
- Use New Relic or similar
- Monitor API response times
- Identify bottlenecks

## Troubleshooting

### Backend Not Connecting to MongoDB
- Verify `MONGO_URI` is correct
- Check IP whitelist on MongoDB Atlas
- Verify database user credentials
- Check database exists

### Frontend Can't Connect to Backend
- Verify `VITE_API_URL` is correct
- Check backend is running
- Check CORS configuration
- Verify API endpoints

### Slow Performance
- Check database indexes
- Enable caching
- Use CDN for static assets
- Optimize API queries
- Enable compression

### High Memory Usage
- Check for memory leaks
- Review Node.js version
- Monitor database connections
- Enable clustering

## Scaling for Production

### Horizontal Scaling
- Use load balancer
- Run multiple server instances
- Use managed services (Render Pro, Railway Pro)

### Database Optimization
- Add indexes to frequently queried fields
- Archive old data
- Use connection pooling
- Monitor query performance

### Caching
- Implement Redis for session caching
- Cache API responses
- Use browser caching
- Implement CDN

## Security Hardening

- Use strong passwords
- Enable 2FA on all accounts
- Regular security updates
- Implement rate limiting
- Use security headers (Helmet)
- Regular backups
- Monitor suspicious activity
- Use environment variables for secrets

## Cost Optimization

- Use free tier services initially
- Monitor resource usage
- Scale vertically before horizontally
- Use auto-scaling
- Optimize database queries
- Implement caching
- Monitor and remove unused services

## Deployment Checklist

- [ ] Code committed to GitHub
- [ ] Environment variables configured
- [ ] MongoDB cluster created
- [ ] Database user created
- [ ] Backend deployed
- [ ] Frontend API URL updated
- [ ] Frontend deployed
- [ ] Backend CORS updated
- [ ] SSL certificates configured
- [ ] Domain names updated
- [ ] DNS records updated
- [ ] Error tracking set up
- [ ] Monitoring configured
- [ ] Backups enabled
- [ ] Documentation updated

Your MERN Expense Tracker is now production-ready!
