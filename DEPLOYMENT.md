# Deployment Guide - AWS VPS

Hướng dẫn deploy admin-app và my-app lên AWS VPS sử dụng Docker và GitHub Actions.

## Prerequisites

1. AWS VPS (EC2 instance) đã được setup
2. Docker đã được cài đặt trên VPS
3. SSH key để kết nối với VPS
4. GitHub repository với GitHub Actions enabled

## Architecture

- **Nginx Reverse Proxy** (port 80): Route traffic đến các apps
  - `/admin/*` → Admin App (port 4001)
  - `/*` → My App (port 4000)
- **Admin App** (port 4001): Chạy trong Docker container
- **My App** (port 4000): Chạy trong Docker container

## Setup GitHub Secrets

Vào GitHub repository → Settings → Secrets and variables → Actions, thêm các secrets sau:

- `AWS_VPS_HOST`: IP address hoặc domain của VPS (ví dụ: `ec2-xxx-xxx-xxx-xxx.compute-1.amazonaws.com`)
- `AWS_VPS_USER`: Username để SSH vào VPS (thường là `ubuntu` hoặc `ec2-user`)
- `AWS_VPS_SSH_KEY`: Private SSH key để kết nối với VPS
- `AWS_VPS_PORT`: SSH port (mặc định: `22`)

### Cách lấy SSH Key:

1. Nếu bạn đã có SSH key pair:
   ```bash
   cat ~/.ssh/your-key.pem
   ```
   Copy toàn bộ nội dung (bao gồm `-----BEGIN RSA PRIVATE KEY-----` và `-----END RSA PRIVATE KEY-----`)

2. Nếu chưa có, tạo mới:
   ```bash
   ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
   ```

## Setup VPS

### 1. Cài đặt Docker trên VPS

SSH vào VPS và chạy:

```bash
# Update system
sudo apt-get update

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Add user to docker group (optional, để không cần sudo)
sudo usermod -aG docker $USER

# Install Docker Compose (optional)
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Verify installation
docker --version
docker-compose --version
```

### 2. Mở ports trên AWS Security Group

Vào AWS Console → EC2 → Security Groups → Chọn security group của instance:

- Inbound Rules:
  - Port `22` (SSH) - từ IP của bạn hoặc `0.0.0.0/0` (không khuyến khích)
  - Port `80` (HTTP - Nginx Reverse Proxy) - từ `0.0.0.0/0` hoặc IP cụ thể
  - Port `443` (HTTPS - Optional) - từ `0.0.0.0/0` nếu setup SSL

### 3. Setup SSH trên VPS

Đảm bảo SSH key của bạn đã được thêm vào VPS:

```bash
# Trên máy local
ssh-copy-id -i ~/.ssh/your-key.pem user@your-vps-ip
```

Hoặc copy public key vào `~/.ssh/authorized_keys` trên VPS.

## Setup Nginx Reverse Proxy

**Bước đầu tiên**: Setup nginx reverse proxy trên VPS:

1. Chạy workflow `setup-nginx-proxy` từ GitHub Actions (hoặc manual trigger)
2. Hoặc SSH vào VPS và chạy:

```bash
# Create Docker network
docker network create app-network

# Copy nginx config
scp nginx-reverse-proxy.conf user@vps-ip:/home/user/

# Start nginx proxy
docker run -d \
  --name nginx-proxy \
  --restart unless-stopped \
  -p 80:80 \
  --network app-network \
  -v /home/user/nginx-reverse-proxy.conf:/etc/nginx/conf.d/default.conf:ro \
  nginx:alpine
```

## Deployment Workflows

Có 4 workflows được setup:

### 1. `setup-nginx-proxy.yml`
- Trigger: Manual hoặc khi có thay đổi nginx config
- Setup: Nginx reverse proxy container

### 2. `deploy-admin-app.yml`
- Trigger: Khi có thay đổi trong `admin-app/` hoặc push vào `main`/`develop`
- Deploy: Chỉ admin-app (port 4001)
- URL: `http://your-vps-ip/admin`

### 3. `deploy-my-app.yml`
- Trigger: Khi có thay đổi trong `my-app/` hoặc push vào `main`/`develop`
- Deploy: Chỉ my-app (port 4000)
- URL: `http://your-vps-ip/`

### 4. `deploy-both.yml`
- Trigger: Push vào `main`/`develop` hoặc manual trigger
- Deploy: Cả 2 apps (nếu có thay đổi tương ứng)
- Có thể trigger riêng bằng commit message:
  - `[deploy-admin]` - chỉ deploy admin-app
  - `[deploy-my-app]` - chỉ deploy my-app

## Manual Deployment

### Deploy từ local:

```bash
# Build và push image
cd admin-app
docker build -t admin-app:latest .
docker save admin-app:latest | gzip > admin-app.tar.gz

# Copy lên VPS
scp admin-app.tar.gz user@vps-ip:/tmp/

# SSH vào VPS và deploy
ssh user@vps-ip

# Create network if not exists
docker network create app-network || true

# Load and run admin-app
docker load < /tmp/admin-app.tar.gz
docker stop admin-app || true
docker rm admin-app || true
docker run -d \
  --name admin-app \
  --restart unless-stopped \
  -p 4001:80 \
  --network app-network \
  admin-app:latest

# Same for my-app (port 4000)
cd my-app
docker build -t my-app:latest .
docker save my-app:latest | gzip > my-app.tar.gz
scp my-app.tar.gz user@vps-ip:/tmp/

# On VPS
docker load < /tmp/my-app.tar.gz
docker stop my-app || true
docker rm my-app || true
docker run -d \
  --name my-app \
  --restart unless-stopped \
  -p 4000:80 \
  --network app-network \
  my-app:latest
```

## Verify Deployment

Sau khi deploy, kiểm tra:

```bash
# Check containers đang chạy
docker ps

# Check logs
docker logs admin-app
docker logs my-app

# Test từ browser
curl http://your-vps-ip/              # My App (root)
curl http://your-vps-ip/admin         # Admin App
curl http://your-vps-ip/admin/login  # Admin App routes

# Test direct ports (internal)
curl http://localhost:4000  # My App direct
curl http://localhost:4001  # Admin App direct
```

## Troubleshooting

### Container không start:

```bash
# Check logs
docker logs admin-app

# Check container status
docker ps -a

# Restart container
docker restart admin-app
```

### Port đã được sử dụng:

```bash
# Check port đang được sử dụng
sudo netstat -tulpn | grep :80
sudo netstat -tulpn | grep :4000
sudo netstat -tulpn | grep :4001

# Kill process đang sử dụng port
sudo kill -9 <PID>
```

### Nginx proxy không route đúng:

```bash
# Check nginx logs
docker logs nginx-proxy

# Reload nginx config
docker exec nginx-proxy nginx -s reload

# Check if containers are on same network
docker network inspect app-network

# Restart nginx proxy
docker restart nginx-proxy
```

### Permission denied:

```bash
# Add user to docker group
sudo usermod -aG docker $USER
# Logout và login lại
```

## Environment Variables

Nếu cần environment variables, có thể:

1. Sử dụng `.env` file (không khuyến khích cho production)
2. Pass qua Docker run command:
   ```bash
   docker run -d \
     --name admin-app \
     -e API_URL=https://api.example.com \
     -p 3001:80 \
     admin-app:latest
   ```
3. Sử dụng Docker secrets hoặc AWS Secrets Manager

## Monitoring

### Check resource usage:

```bash
docker stats
```

### Setup log rotation:

Tạo file `/etc/docker/daemon.json`:

```json
{
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "10m",
    "max-file": "3"
  }
}
```

Restart Docker:
```bash
sudo systemctl restart docker
```

## SSL/HTTPS Setup (Optional)

Để setup HTTPS, có thể sử dụng:

1. **Nginx reverse proxy với Let's Encrypt**:
   - Cài đặt certbot
   - Setup nginx như reverse proxy
   - Configure SSL certificates

2. **AWS Application Load Balancer**:
   - Tạo ALB
   - Attach SSL certificate từ ACM
   - Route traffic đến containers

## Rollback

Nếu cần rollback về version cũ:

```bash
# List images
docker images

# Stop current container
docker stop admin-app
docker rm admin-app

# Run old image
docker run -d \
  --name admin-app \
  --restart unless-stopped \
  -p 4001:80 \
  --network app-network \
  admin-app:<old-sha>
```

