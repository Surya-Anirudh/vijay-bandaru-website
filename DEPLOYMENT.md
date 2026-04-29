# Deployment Guide - Vijay Bandaru Website

## Project Overview
- **Repository**: https://github.com/Surya-Anirudh/vijay-bandaru-website
- **Tech Stack**: React 19 + Vite + Express.js + Tailwind CSS v4
- **Build Tool**: Vite
- **Backend**: Node.js Express server for contact form and static file serving

---

## Prerequisites
- Node.js v18+ and npm
- Git
- A hosting provider (Vercel, Netlify, AWS, DigitalOcean, etc.)
- SMTP credentials for email (Gmail or other provider)

---

## Local Development Setup

### 1. Clone the Repository
```bash
git clone https://github.com/Surya-Anirudh/vijay-bandaru-website.git
cd "vijay-bandaru-website"
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables
Create a `.env` file in the project root:
```env
# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
CONTACT_EMAIL=vijaybandaru@learnovative.com

# Client URL (for CORS)
CLIENT_URL=http://localhost:5173

# Server Port
PORT=3001
```

**Note**: For Gmail, use an [App Password](https://support.google.com/accounts/answer/185833), not your regular password.

### 4. Run Development Server
```bash
npm run dev
```
- Frontend: http://localhost:5173 (Vite)
- Backend: http://localhost:3001 (Express)

### 5. Build for Production
```bash
npm run build
```
This generates the optimized build in the `dist/` folder.

---

## Deployment Options

### Option 1: Vercel (Recommended - Simple)
**Best for**: Static site with serverless functions

#### Steps:
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import the repository
4. Vercel auto-detects Vite setup
5. Add environment variables in Settings → Environment Variables
6. Deploy with a single click
7. Custom domain configuration in Vercel dashboard

**Limitations**: Contact form may need Vercel Functions setup or external service

---

### Option 2: Netlify (Alternative - Easy)
**Best for**: JAMstack deployment with forms

#### Steps:
1. Push code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Click "New site from Git"
4. Select repository
5. Build command: `npm run build`
6. Publish directory: `dist`
7. Add environment variables in Site Settings
8. Deploy

**Note**: For contact form, use Netlify Forms or redirect to external API

---

### Option 3: Self-Hosted (VPS/DigitalOcean)
**Best for**: Full control, custom domain, own server

#### Steps:
1. Create a VPS (DigitalOcean, AWS EC2, Linode, etc.)
2. SSH into server and install Node.js:
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

3. Clone repository:
   ```bash
   git clone https://github.com/Surya-Anirudh/vijay-bandaru-website.git
   cd vijay-bandaru-website
   ```

4. Install dependencies:
   ```bash
   npm install
   ```

5. Build application:
   ```bash
   npm run build
   ```

6. Setup PM2 for process management:
   ```bash
   sudo npm install -g pm2
   pm2 start server/index.js --name "vijay-website"
   pm2 startup
   pm2 save
   ```

7. Setup Nginx as reverse proxy:
   ```nginx
   server {
       listen 80;
       server_name vijaybandaru.com www.vijaybandaru.com;
       
       location / {
           proxy_pass http://localhost:3001;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

8. Setup SSL with Let's Encrypt:
   ```bash
   sudo apt-get install certbot python3-certbot-nginx
   sudo certbot --nginx -d vijaybandaru.com -d www.vijaybandaru.com
   ```

9. Add environment variables:
   ```bash
   nano /path/to/project/.env
   # Add SMTP and other configs
   ```

10. Restart application:
    ```bash
    pm2 restart all
    ```

---

## Content Management - Blog Updates (No Code Changes)

### How to Update Blogs Without Coding

The blog content is currently stored in `src/pages/Blog.tsx`. To allow non-technical updates, follow this approach:

#### Option 1: CMS Integration (Recommended)
Set up a headless CMS like:
- **Contentful** (free tier available)
- **Strapi** (self-hosted)
- **Sanity** (free tier available)

**Steps**:
1. Create a CMS account
2. Define blog post schema (title, content, category, image, date)
3. Update `src/pages/Blog.tsx` to fetch from CMS API instead of static data
4. Owner can manage blogs through CMS dashboard without touching code

#### Option 2: JSON File Approach (Simple)
1. Create `public/blogs.json`:
   ```json
   {
     "blogs": [
       {
         "id": 1,
         "title": "Article Title",
         "category": "Agile",
         "content": "Article content here...",
         "image": "/blog-image.jpg",
         "date": "2024-01-15"
       }
     ]
   }
   ```

2. Update `src/pages/Blog.tsx` to fetch from this JSON
3. Owner updates `public/blogs.json` and redeploys (or uses a simple admin panel)

#### Option 3: Admin Panel (Advanced)
Create a simple admin interface where owner can:
- Add/edit/delete blog posts
- Upload images
- Manage categories
- Update without accessing code

This requires:
- Admin login authentication
- Database setup (MongoDB, PostgreSQL)
- Backend API endpoints for CRUD operations

---

## Environment Variables for Production

### Email Configuration (Required for Contact Form)
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
CONTACT_EMAIL=vijaybandaru@learnovative.com
```

### Server Configuration
```env
PORT=3001
CLIENT_URL=https://vijaybandaru.com
NODE_ENV=production
```

---

## Production Checklist

- [ ] Environment variables are set securely
- [ ] SMTP credentials are configured
- [ ] Email testing works (contact form)
- [ ] All static assets load correctly
- [ ] Images are optimized
- [ ] SSL certificate is installed
- [ ] Domain is configured
- [ ] 404 page is functional
- [ ] Performance is tested
- [ ] Analytics tracking is enabled (if needed)
- [ ] Backup strategy is in place

---

## Monitoring & Maintenance

### Performance Monitoring
- Monitor server logs for errors
- Check website uptime (use Uptime Robot, Pingdom)
- Monitor email delivery (check spam folder regularly)

### Regular Updates
1. Pull latest changes from git:
   ```bash
   cd /path/to/project
   git pull origin main
   ```

2. Rebuild if needed:
   ```bash
   npm install
   npm run build
   ```

3. Restart application:
   ```bash
   pm2 restart all
   ```

---

## Troubleshooting

### Contact Form Not Working
- Check SMTP credentials in `.env`
- Verify email is not going to spam
- Check server logs for errors: `pm2 logs`

### Images Not Loading
- Ensure images are in `public/` folder
- Check image paths in code (should start with `/`)

### Build Errors
- Clear node_modules: `rm -rf node_modules && npm install`
- Clear build cache: `rm -rf dist`
- Rebuild: `npm run build`

### SSL Certificate Issues
- Renew Let's Encrypt: `sudo certbot renew`
- Check certificate expiry: `sudo certbot certificates`

---

## Git Workflow

### Making Updates
1. Clone/pull latest:
   ```bash
   git pull origin main
   ```

2. Make changes locally and test

3. Commit changes:
   ```bash
   git add .
   git commit -m "Update: brief description"
   ```

4. Push to GitHub:
   ```bash
   git push origin main
   ```

5. Deployment happens automatically (if using Vercel/Netlify) or manually redeploy

---

## Quick Start - Deployment Command Summary

### Vercel/Netlify
```bash
git push origin main  # Auto-deploys
```

### Self-Hosted (VPS)
```bash
cd /path/to/project
git pull origin main
npm install
npm run build
pm2 restart all
```

---

## Support & Questions
- GitHub: https://github.com/Surya-Anirudh/vijay-bandaru-website
- Issues: Use GitHub Issues for bug reports
- Email: vijaybandaru@learnovative.com

---

**Last Updated**: April 29, 2026
