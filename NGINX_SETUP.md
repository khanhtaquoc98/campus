# Nginx Reverse Proxy Setup Guide

Hướng dẫn setup Nginx Reverse Proxy để route traffic:
- `/admin/*` → Admin App (port 4001)
- `/*` → My App (port 4000)

## Kiến trúc

```
Internet
   ↓
Nginx Reverse Proxy (port 80)
   ├── /admin/* → Admin App Container (port 4001)
   └── /* → My App Container (port 4000)
```

## Cách 1: Sử dụng GitHub Actions (Khuyến nghị)

1. **Setup nginx proxy lần đầu**:
   - Vào GitHub Actions
   - Chọn workflow `Setup Nginx Reverse Proxy`
   - Click "Run workflow" → Run

2. **Deploy apps**:
   - Deploy admin-app và my-app như bình thường
   - Nginx sẽ tự động route traffic

## Cách 2: Setup thủ công trên VPS

### Bước 1: Copy nginx config lên VPS

```bash
scp nginx-reverse-proxy.conf user@vps-ip:/home/user/
```

### Bước 2: Tạo Docker network

```bash
ssh user@vps-ip
docker network create app-network
```

### Bước 3: Start nginx proxy container

```bash
docker run -d \
  --name nginx-proxy \
  --restart unless-stopped \
  -p 80:80 \
  --network app-network \
  -v /home/user/nginx-reverse-proxy.conf:/etc/nginx/conf.d/default.conf:ro \
  nginx:alpine
```

### Bước 4: Deploy apps

Deploy admin-app và my-app như bình thường. Đảm bảo chúng chạy trên:
- Admin App: port 4001
- My App: port 4000

Và cả 2 đều join vào `app-network`:

```bash
docker run -d \
  --name admin-app \
  --restart unless-stopped \
  -p 4001:80 \
  --network app-network \
  admin-app:latest

docker run -d \
  --name my-app \
  --restart unless-stopped \
  -p 4000:80 \
  --network app-network \
  my-app:latest
```

## Kiểm tra

```bash
# Check containers đang chạy
docker ps

# Check nginx logs
docker logs nginx-proxy

# Test routing
curl http://your-vps-ip/              # Should route to my-app
curl http://your-vps-ip/admin          # Should route to admin-app
curl http://your-vps-ip/admin/login   # Should route to admin-app
```

## Troubleshooting

### Nginx không route đúng

1. **Check nginx config**:
```bash
docker exec nginx-proxy cat /etc/nginx/conf.d/default.conf
```

2. **Reload nginx**:
```bash
docker exec nginx-proxy nginx -s reload
```

3. **Check network**:
```bash
docker network inspect app-network
```

4. **Check containers có cùng network**:
```bash
docker inspect admin-app | grep NetworkMode
docker inspect my-app | grep NetworkMode
docker inspect nginx-proxy | grep NetworkMode
```

### Containers không communicate được

1. **Đảm bảo tất cả containers trên cùng network**:
```bash
docker network connect app-network admin-app
docker network connect app-network my-app
```

2. **Test connectivity**:
```bash
docker exec nginx-proxy ping admin-app
docker exec nginx-proxy ping my-app
```

### 404 Not Found khi truy cập /admin

Nginx config đang strip `/admin` prefix khi forward. Nếu admin-app cần giữ prefix, cần update nginx config:

```nginx
location /admin {
    proxy_pass http://admin_app/admin;  # Giữ prefix
    # ... rest of config
}
```

Hoặc update admin-app để handle root path thay vì `/admin`.

## Update nginx config

1. **Edit config file**:
```bash
nano nginx-reverse-proxy.conf
```

2. **Copy lên VPS**:
```bash
scp nginx-reverse-proxy.conf user@vps-ip:/home/user/
```

3. **Reload nginx**:
```bash
docker exec nginx-proxy nginx -s reload
```

Hoặc restart container:
```bash
docker restart nginx-proxy
```

## SSL/HTTPS Setup

Để setup HTTPS, cần:

1. **Cài certbot trên VPS**:
```bash
sudo apt-get install certbot python3-certbot-nginx
```

2. **Get certificate**:
```bash
sudo certbot certonly --standalone -d your-domain.com
```

3. **Update nginx config** để include SSL:
```nginx
server {
    listen 443 ssl;
    server_name your-domain.com;
    
    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;
    
    # ... rest of config
}

server {
    listen 80;
    server_name your-domain.com;
    return 301 https://$server_name$request_uri;
}
```

4. **Mount certificates vào nginx container**:
```bash
docker run -d \
  --name nginx-proxy \
  --restart unless-stopped \
  -p 80:80 \
  -p 443:443 \
  --network app-network \
  -v /home/user/nginx-reverse-proxy.conf:/etc/nginx/conf.d/default.conf:ro \
  -v /etc/letsencrypt:/etc/letsencrypt:ro \
  nginx:alpine
```

