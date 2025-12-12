# Hướng Dẫn Deploy Production

## 🚀 Deployment Checklist

### Pre-deployment
- [ ] Đã test đầy đủ tất cả tính năng
- [ ] Đã kết nối và test với backend API
- [ ] Đã xóa demo mode và demo data
- [ ] Đã cấu hình đúng API URL
- [ ] Đã test trên nhiều trình duyệt
- [ ] Đã test responsive trên mobile

### Build
- [ ] Chạy `npm run build` thành công
- [ ] Kiểm tra folder `dist/` được tạo
- [ ] Test preview: `npm run preview`

### Environment Variables
- [ ] Đã set `VITE_API_URL` cho production
- [ ] Đã xóa các biến môi trường không cần thiết

---

## 📦 Build for Production

### 1. Cấu hình Environment

Tạo file `.env.production`:
```env
VITE_API_URL=https://api.yourdomain.com/api
```

### 2. Build

```bash
npm run build
```

Output sẽ ở folder `dist/`:
```
dist/
├── assets/
│   ├── index-[hash].js
│   └── index-[hash].css
├── index.html
└── vite.svg
```

### 3. Preview Local

```bash
npm run preview
```

Mở http://localhost:4173 để test build

---

## 🌐 Deployment Options

### Option 1: Vercel (Recommended - Free)

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

3. Set environment variables:
```bash
vercel env add VITE_API_URL
# Nhập: https://api.yourdomain.com/api
```

4. Deploy production:
```bash
vercel --prod
```

**Vercel Config** (`vercel.json`):
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite"
}
```

---

### Option 2: Netlify (Free)

1. Install Netlify CLI:
```bash
npm i -g netlify-cli
```

2. Build:
```bash
npm run build
```

3. Deploy:
```bash
netlify deploy --prod --dir=dist
```

**Netlify Config** (`netlify.toml`):
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

### Option 3: GitHub Pages

1. Install gh-pages:
```bash
npm install -D gh-pages
```

2. Update `package.json`:
```json
{
  "homepage": "https://yourusername.github.io/ministry-page",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

3. Update `vite.config.js`:
```javascript
export default defineConfig({
  base: '/ministry-page/',
  plugins: [react()],
})
```

4. Deploy:
```bash
npm run deploy
```

---

### Option 4: Traditional Hosting (cPanel, etc.)

1. Build:
```bash
npm run build
```

2. Upload folder `dist/` lên server qua FTP/SFTP

3. Point domain to `dist/` folder

4. Configure `.htaccess` (Apache):
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

---

### Option 5: Docker

**Dockerfile:**
```dockerfile
# Build stage
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
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
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

**Build & Run:**
```bash
docker build -t ministry-page .
docker run -p 80:80 ministry-page
```

---

## 🔒 Security Checklist

- [ ] HTTPS enabled
- [ ] Environment variables không commit vào Git
- [ ] API URL sử dụng HTTPS
- [ ] CORS configured đúng trên backend
- [ ] Rate limiting trên API
- [ ] Input validation
- [ ] XSS protection (React default)

---

## ⚡ Performance Optimization

### 1. Code Splitting
Đã có sẵn với React Router

### 2. Image Optimization
```bash
npm install -D vite-plugin-imagemin
```

### 3. Compression
Enable Gzip/Brotli trên server

### 4. CDN
Sử dụng CDN cho static assets

### 5. Caching
Configure cache headers:
```
Cache-Control: public, max-age=31536000, immutable
```

---

## 📊 Monitoring

### Analytics
Thêm Google Analytics:
```html
<!-- index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Error Tracking
Sử dụng Sentry:
```bash
npm install @sentry/react
```

---

## 🔄 CI/CD

### GitHub Actions Example

`.github/workflows/deploy.yml`:
```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

---

## 🧪 Post-deployment Testing

- [ ] Test login
- [ ] Test CRUD operations
- [ ] Test search & filter
- [ ] Test pagination
- [ ] Test responsive design
- [ ] Test trên nhiều browsers
- [ ] Test performance (Lighthouse)
- [ ] Test security headers

---

## 📞 Rollback Plan

Nếu có vấn đề sau khi deploy:

1. **Vercel/Netlify**: Rollback qua dashboard
2. **GitHub Pages**: Revert commit
3. **Traditional**: Restore backup
4. **Docker**: Deploy version cũ

---

## ✅ Production URLs

Sau khi deploy, cập nhật URLs:

- **Frontend**: https://ministry-page.yourdomain.com
- **Backend API**: https://api.yourdomain.com
- **Documentation**: https://docs.yourdomain.com

---

## 🎉 Done!

Sau khi deploy thành công:
1. Test đầy đủ trên production
2. Monitor logs và errors
3. Collect user feedback
4. Plan for updates

