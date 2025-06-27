#!/bin/bash

# ChipTech Global Node.js 服务器启动脚本
# Startup script for ChipTech Global Node.js server

echo "🚀 ChipTech Global 服务器启动"
echo "============================="

# 检查 Node.js 是否安装
if ! command -v node &> /dev/null; then
    echo "❌ 错误: Node.js 未安装"
    echo "请先安装 Node.js: https://nodejs.org/"
    exit 1
fi

# 检查是否存在 package.json
if [ ! -f "package.json" ]; then
    echo "❌ 错误: 找不到 package.json 文件"
    exit 1
fi

# 安装依赖
if [ ! -d "node_modules" ]; then
    echo "📦 安装依赖包..."
    npm install
fi

# 创建日志目录
mkdir -p logs

echo "🌐 选择启动模式:"
echo "1) 开发模式 (nodemon, 端口 3000)"
echo "2) 生产模式 (node, 端口 3000)"
echo "3) PM2 集群模式 (推荐生产环境)"
echo "4) 后台运行 (nohup)"

read -p "请选择 (1-4): " choice

case $choice in
    1)
        echo "🔧 启动开发模式..."
        if command -v nodemon &> /dev/null; then
            npm run dev
        else
            echo "安装 nodemon..."
            npm install -g nodemon
            npm run dev
        fi
        ;;
    2)
        echo "🚀 启动生产模式..."
        npm start
        ;;
    3)
        echo "⚡ 启动 PM2 集群模式..."
        if command -v pm2 &> /dev/null; then
            pm2 start ecosystem.config.js --env production
            pm2 save
            pm2 startup
        else
            echo "安装 PM2..."
            npm install -g pm2
            pm2 start ecosystem.config.js --env production
            pm2 save
            pm2 startup
        fi
        ;;
    4)
        echo "🌙 后台运行模式..."
        nohup node server.js > logs/server.log 2>&1 &
        echo $! > server.pid
        echo "服务器已在后台启动 (PID: $(cat server.pid))"
        echo "查看日志: tail -f logs/server.log"
        echo "停止服务器: kill $(cat server.pid)"
        ;;
    *)
        echo "❌ 无效选择"
        exit 1
        ;;
esac

echo ""
echo "🎉 服务器配置完成!"
echo ""
echo "📋 有用的命令:"
echo "- 查看状态: pm2 status"
echo "- 查看日志: pm2 logs"
echo "- 重启服务: pm2 restart chiptech-global"
echo "- 停止服务: pm2 stop chiptech-global"
echo "- 监控界面: pm2 monit"
echo ""
echo "🌐 访问地址: http://your-server-ip:3000" 