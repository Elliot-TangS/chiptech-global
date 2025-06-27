# 🚀 ChipTech Global Node.js 部署指南

## 📋 系统要求 | System Requirements

- **Node.js**: v14.0.0 或更高版本
- **npm**: v6.0.0 或更高版本  
- **内存**: 最少 512MB RAM
- **存储**: 最少 1GB 可用空间
- **操作系统**: Linux (推荐 Ubuntu/CentOS), macOS, Windows

## 🔧 快速部署 | Quick Setup

### 1. 服务器准备
```bash
# 更新系统 (Ubuntu/Debian)
sudo apt update && sudo apt upgrade -y

# 安装 Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# 验证安装
node --version
npm --version
```

### 2. 代码部署
```bash
# 克隆或上传项目文件
cd /var/www/
sudo git clone <your-repo-url> chiptech-global
# 或者上传项目文件夹

# 进入项目目录
cd chiptech-global

# 安装依赖
npm install

# 设置权限
sudo chown -R $USER:$USER /var/www/chiptech-global
```

### 3. 启动服务器
```bash
# 给启动脚本执行权限
chmod +x start.sh

# 运行启动脚本
./start.sh
```

## 🌐 部署选项 | Deployment Options

### 选项 1: 开发模式 (Development)
```bash
npm run dev
```
- 适用于开发和测试
- 自动重启 (nodemon)
- 端口 3000

### 选项 2: 生产模式 (Production)
```bash
npm start
```
- 适用于小型生产环境
- 手动重启
- 端口 3000

### 选项 3: PM2 集群模式 (推荐)
```bash
# 安装 PM2
npm install -g pm2

# 启动集群
pm2 start ecosystem.config.js --env production

# 保存配置
pm2 save

# 设置开机自启
pm2 startup
```

### 选项 4: Docker 部署
```bash
# 构建镜像
docker build -t chiptech-global .

# 运行容器
docker run -d -p 80:3000 --name chiptech chiptech-global
```

## 🔒 安全配置 | Security Configuration

### 1. 防火墙设置
```bash
# Ubuntu UFW
sudo ufw allow 3000/tcp
sudo ufw enable

# CentOS/RHEL Firewall
sudo firewall-cmd --permanent --add-port=3000/tcp
sudo firewall-cmd --reload
```

### 2. Nginx 反向代理 (推荐)
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 3. SSL 证书 (Let's Encrypt)
```bash
# 安装 Certbot
sudo apt install certbot python3-certbot-nginx

# 获取证书
sudo certbot --nginx -d yourdomain.com

# 自动续期
sudo crontab -e
# 添加: 0 12 * * * /usr/bin/certbot renew --quiet
```

## 📊 监控和日志 | Monitoring & Logging

### PM2 监控
```bash
# 查看状态
pm2 status

# 查看日志
pm2 logs

# 实时监控
pm2 monit

# 重启应用
pm2 restart chiptech-global

# 停止应用
pm2 stop chiptech-global
```

### 系统监控
```bash
# 安装 htop
sudo apt install htop

# 监控系统资源
htop

# 查看端口占用
sudo netstat -tlnp | grep :3000
```

## 🔄 自动部署 | Automated Deployment

### GitHub Actions (CI/CD)
```yaml
name: Deploy to Server

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    
    - name: Deploy to server
      uses: appleboy/ssh-action@v0.1.5
      with:
        host: ${{ secrets.HOST }}
        username: ${{ secrets.USERNAME }}
        key: ${{ secrets.KEY }}
        script: |
          cd /var/www/chiptech-global
          git pull origin main
          npm install
          pm2 restart chiptech-global
```

## 🛠️ 故障排除 | Troubleshooting

### 常见问题

1. **端口占用**
```bash
# 查看端口占用
sudo lsof -i :3000

# 杀死进程
sudo kill -9 <PID>
```

2. **权限问题**
```bash
# 修复权限
sudo chown -R $USER:$USER /var/www/chiptech-global
chmod +x start.sh
```

3. **内存不足**
```bash
# 检查内存使用
free -h

# 清理缓存
sudo sync && sudo sysctl vm.drop_caches=3
```

4. **日志查看**
```bash
# PM2 日志
pm2 logs chiptech-global

# 系统日志
sudo journalctl -f

# 应用日志
tail -f logs/combined.log
```

## 📈 性能优化 | Performance Optimization

### 1. 启用 Gzip 压缩
- 已在 Express 中配置 compression 中间件

### 2. 静态文件缓存
- CSS/JS 文件缓存 1 年
- HTML 文件缓存 1 小时

### 3. CDN 配置 (可选)
- 使用 CloudFlare 或 AWS CloudFront
- 加速全球访问

### 4. 数据库优化 (如需要)
```bash
# 安装 Redis (可选缓存)
sudo apt install redis-server
```

## 🌍 环境变量 | Environment Variables

创建 `.env` 文件：
```bash
PORT=3000
NODE_ENV=production
ALLOWED_ORIGINS=https://yourdomain.com
```

## 📞 技术支持 | Technical Support

如遇到部署问题，请检查：
1. Node.js 版本是否符合要求
2. 端口是否被占用
3. 防火墙是否正确配置
4. 日志文件中的错误信息

**联系方式**: 
- 📧 Email: support@chiptech-global.com
- 📱 电话: +86-xxx-xxxx-xxxx 