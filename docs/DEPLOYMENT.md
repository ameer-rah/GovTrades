# GovTrades Deployment Guide

This guide covers deployment strategies and configuration for the GovTrades platform across different environments.

## 🏗 Architecture Overview

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React SPA     │    │   API Gateway   │    │   Database      │
│   (Frontend)    │◄──►│   (Future)      │◄──►│   (Future)      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
        │                       │                       │
        ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   CDN/Static    │    │   API Server    │    │   Data Pipeline │
│   Hosting       │    │   (Node.js)     │    │   (ETL)         │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🚀 Deployment Options

### Option 1: Static Site Deployment (Current)

Perfect for the current mock data implementation.

#### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deployment
vercel --prod
```

**Configuration (`vercel.json`):**
```json
{
  "name": "govtrades",
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "build"
      }
    }
  ],
  "routes": [
    {
      "src": "/static/(.*)",
      "headers": {
        "cache-control": "public, max-age=31536000, immutable"
      }
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

#### Netlify
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Build and deploy
npm run build
netlify deploy --prod --dir=build
```

**Configuration (`netlify.toml`):**
```toml
[build]
  publish = "build"
  command = "npm run build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "18"
```

#### GitHub Pages
```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build application
      run: npm run build
    
    - name: Upload coverage to Codecov
      uses: codecov/codecov-action@v3

  deploy-staging:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/staging'
    steps:
    - uses: actions/checkout@v3
    - uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build for staging
      run: npm run build:staging
      env:
        REACT_APP_API_URL: ${{ secrets.STAGING_API_URL }}
        REACT_APP_ANALYTICS_ID: ${{ secrets.STAGING_ANALYTICS_ID }}
    
    - name: Deploy to staging
      run: npx vercel --prod --token ${{ secrets.VERCEL_TOKEN }}

  deploy-production:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
    - uses: actions/checkout@v3
    - uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build for production
      run: npm run build:production
      env:
        REACT_APP_API_URL: ${{ secrets.PRODUCTION_API_URL }}
        REACT_APP_ANALYTICS_ID: ${{ secrets.PRODUCTION_ANALYTICS_ID }}
        REACT_APP_SENTRY_DSN: ${{ secrets.SENTRY_DSN }}
    
    - name: Deploy to production
      run: npx vercel --prod --token ${{ secrets.VERCEL_TOKEN }}
    
    - name: Notify deployment
      run: |
        curl -X POST -H 'Content-type: application/json' \
        --data '{"text":"🚀 GovTrades deployed to production successfully!"}' \
        ${{ secrets.SLACK_WEBHOOK_URL }}
```

## 🔧 Troubleshooting

### Common Issues

#### Build Failures
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Check for conflicting dependencies
npm ls
```

#### Memory Issues During Build
```json
{
  "scripts": {
    "build": "node --max_old_space_size=4096 node_modules/.bin/react-scripts build"
  }
}
```

#### Routing Issues in Production
Ensure your hosting platform supports client-side routing:

**Vercel:** Uses `vercel.json` configuration
**Netlify:** Uses `_redirects` file or `netlify.toml`
**Apache:** Uses `.htaccess` file

```apache
# .htaccess for Apache
Options -MultiViews
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^ index.html [QR,L]
```

### Performance Issues

#### Slow Loading
1. **Check bundle size:**
   ```bash
   npm run build:analyze
   ```

2. **Implement lazy loading:**
   ```javascript
   const LazyComponent = lazy(() => import('./Component'));
   ```

3. **Optimize images:**
   ```bash
   # Install image optimization tools
   npm install --save-dev imagemin imagemin-webp
   ```

#### High Memory Usage
1. **Monitor with React DevTools Profiler**
2. **Check for memory leaks in useEffect**
3. **Implement proper cleanup:**
   ```javascript
   useEffect(() => {
     const subscription = subscribe();
     return () => subscription.unsubscribe();
   }, []);
   ```

## 📱 Mobile Optimization

### Progressive Web App (PWA)
```json
// public/manifest.json
{
  "short_name": "GovTrades",
  "name": "Government Financial Transparency",
  "icons": [
    {
      "src": "favicon.ico",
      "sizes": "64x64 32x32 24x24 16x16",
      "type": "image/x-icon"
    },
    {
      "src": "logo192.png",
      "type": "image/png",
      "sizes": "192x192"
    },
    {
      "src": "logo512.png",
      "type": "image/png",
      "sizes": "512x512"
    }
  ],
  "start_url": ".",
  "display": "standalone",
  "theme_color": "#3b82f6",
  "background_color": "#ffffff"
}
```

### Service Worker
```javascript
// public/sw.js
const CACHE_NAME = 'govtrades-v1';
const urlsToCache = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
  );
});
```

## 🌐 Internationalization (Future)

### Setup i18n
```bash
npm install react-i18next i18next
```

```javascript
// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          "search_placeholder": "Enter first or last name...",
          "total_trades": "Total Trades"
        }
      },
      es: {
        translation: {
          "search_placeholder": "Ingrese nombre o apellido...",
          "total_trades": "Operaciones Totales"
        }
      }
    },
    lng: "en",
    fallbackLng: "en"
  });

export default i18n;
```

## 📈 Scaling Considerations

### CDN Configuration
```javascript
// webpack.config.js (if ejected)
module.exports = {
  output: {
    publicPath: process.env.NODE_ENV === 'production' 
      ? 'https://cdn.govtrades.com/' 
      : '/'
  }
};
```

### Load Balancing
```yaml
# kubernetes deployment
apiVersion: apps/v1
kind: Deployment
metadata:
  name: govtrades-frontend
spec:
  replicas: 3
  selector:
    matchLabels:
      app: govtrades-frontend
  template:
    metadata:
      labels:
        app: govtrades-frontend
    spec:
      containers:
      - name: frontend
        image: govtrades/frontend:latest
        ports:
        - containerPort: 80
        resources:
          requests:
            memory: "64Mi"
            cpu: "250m"
          limits:
            memory: "128Mi"
            cpu: "500m"
```

## 🔐 Backup & Recovery

### Database Backups (Future)
```bash
#!/bin/bash
# backup.sh
DATE=$(date +%Y%m%d_%H%M%S)
pg_dump govtrades > "backup_${DATE}.sql"
aws s3 cp "backup_${DATE}.sql" s3://govtrades-backups/
```

### Code Repository
- Use Git with multiple remotes
- Regular automated backups
- Disaster recovery procedures documented

## 📞 Support & Maintenance

### Log Aggregation
```javascript
// Centralized logging
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'govtrades-frontend' },
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});
```

### Health Checks
```javascript
// Health check endpoint (for API)
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    version: process.env.npm_package_version
  });
});
```

This comprehensive deployment guide covers all aspects of deploying GovTrades from development to production, including monitoring, security, and scaling considerations.d
      run: npm run build
    
    - name: Deploy
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./build
```

### Option 2: Full-Stack Deployment (Future)

For when implementing real API endpoints.

#### Docker Deployment

**Frontend Dockerfile:**
```dockerfile
# Build stage
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**nginx.conf:**
```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html index.htm;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://api:3001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    location /static {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

**docker-compose.yml:**
```yaml
version: '3.8'
services:
  frontend:
    build: .
    ports:
      - "80:80"
    depends_on:
      - api
    environment:
      - REACT_APP_API_URL=http://localhost:3001

  api:
    build: ./api
    ports:
      - "3001:3001"
    depends_on:
      - database
    environment:
      - DATABASE_URL=postgresql://user:pass@database:5432/govtrades
      - NODE_ENV=production

  database:
    image: postgres:15
    environment:
      - POSTGRES_DB=govtrades
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=pass
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

#### AWS Deployment

**Frontend (S3 + CloudFront):**
```bash
# Build the application
npm run build

# Upload to S3
aws s3 sync build/ s3://govtrades-frontend --delete

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id EXXXXXXXXXXXXX --paths "/*"
```

**Backend (ECS/Fargate):**
```yaml
# task-definition.json
{
  "family": "govtrades-api",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "256",
  "memory": "512",
  "taskRoleArn": "arn:aws:iam::account:role/ecsTaskRole",
  "executionRoleArn": "arn:aws:iam::account:role/ecsTaskExecutionRole",
  "containerDefinitions": [
    {
      "name": "api",
      "image": "govtrades/api:latest",
      "portMappings": [
        {
          "containerPort": 3001,
          "protocol": "tcp"
        }
      ],
      "environment": [
        {
          "name": "NODE_ENV",
          "value": "production"
        }
      ],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/govtrades-api",
          "awslogs-region": "us-east-1",
          "awslogs-stream-prefix": "ecs"
        }
      }
    }
  ]
}
```

## 🌍 Environment Configuration

### Development
```bash
# .env.development
REACT_APP_ENV=development
REACT_APP_API_URL=http://localhost:3001
REACT_APP_DEBUG=true
REACT_APP_ANALYTICS_ID=
```

### Staging
```bash
# .env.staging
REACT_APP_ENV=staging
REACT_APP_API_URL=https://api-staging.govtrades.com
REACT_APP_DEBUG=false
REACT_APP_ANALYTICS_ID=G-XXXXXXXXXX
```

### Production
```bash
# .env.production
REACT_APP_ENV=production
REACT_APP_API_URL=https://api.govtrades.com
REACT_APP_DEBUG=false
REACT_APP_ANALYTICS_ID=G-XXXXXXXXXX
REACT_APP_SENTRY_DSN=https://xxxxx@sentry.io/xxxxx
```

## 🔧 Build Optimization

### Build Configuration

**package.json scripts:**
```json
{
  "scripts": {
    "build": "react-scripts build",
    "build:analyze": "npm run build && npx webpack-bundle-analyzer build/static/js/*.js",
    "build:staging": "REACT_APP_ENV=staging npm run build",
    "build:production": "REACT_APP_ENV=production npm run build"
  }
}
```

### Performance Optimizations

1. **Code Splitting:**
```javascript
import { lazy, Suspense } from 'react';

const ProfilePage = lazy(() => import('./components/ProfilePage'));
const TrendingPage = lazy(() => import('./components/TrendingPage'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {/* Route components */}
    </Suspense>
  );
}
```

2. **Bundle Analysis:**
```bash
# Analyze bundle size
npm run build:analyze

# Check for duplicate dependencies
npx webpack-bundle-analyzer build/static/js/*.js
```

3. **Image Optimization:**
```javascript
// Use WebP with fallback
<picture>
  <source srcSet="image.webp" type="image/webp" />
  <img src="image.jpg" alt="Official portrait" />
</picture>
```

## 📊 Monitoring & Analytics

### Error Tracking (Sentry)
```bash
npm install @sentry/react @sentry/tracing
```

```javascript
// src/index.js
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN,
  environment: process.env.REACT_APP_ENV,
});
```

### Performance Monitoring
```javascript
// Performance metrics
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

function sendToAnalytics(metric) {
  // Send to your analytics service
}

getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getFCP(sendToAnalytics);
getLCP(sendToAnalytics);
getTTFB(sendToAnalytics);
```

### Google Analytics
```javascript
// src/utils/analytics.js
import ReactGA from 'react-ga4';

ReactGA.initialize(process.env.REACT_APP_ANALYTICS_ID);

export const trackPageView = (path) => {
  ReactGA.send({ hitType: "pageview", page: path });
};
```

## 🔒 Security Configuration

### Content Security Policy
```html
<!-- In public/index.html -->
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self';
  script-src 'self' 'unsafe-inline' https://www.googletagmanager.com;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  font-src 'self' https://fonts.gstatic.com;
  img-src 'self' data: https:;
  connect-src 'self' https://api.govtrades.com;
">
```

### Environment Security
```bash
# Never commit these to version control
REACT_APP_API_KEY=your_api_key_here
REACT_APP_SENTRY_DSN=your_sentry_dsn_here
```

## 🚨 Deployment Checklist

### Pre-deployment
- [ ] All tests passing
- [ ] Code review completed
- [ ] Security scan passed
- [ ] Performance budget met
- [ ] Accessibility audit passed
- [ ] Cross-browser testing completed

### Deployment
- [ ] Environment variables configured
- [ ] Database migrations run (if applicable)
- [ ] CDN cache cleared
- [ ] SSL certificates valid
- [ ] Monitoring alerts configured

### Post-deployment
- [ ] Smoke tests passed
- [ ] Performance metrics within range
- [ ] Error rates normal
- [ ] User feedback monitored
- [ ] Analytics tracking verified

## 🔄 CI/CD Pipeline

### GitHub Actions Example
```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [ main, staging ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run tests
      run: npm test -- --coverage --watchAll=false
    
    - name: Run linting
      run: npm run lint
    
    - name: Buil