module.exports = {
  apps: [{
    name: 'chiptech-global',
    script: 'server.js',
    instances: 'max', // 使用所有CPU核心
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'development',
      PORT: 3000
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 80
    },
    // 日志配置
    log_file: './logs/combined.log',
    out_file: './logs/out.log',
    error_file: './logs/error.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    
    // 性能监控
    monitoring: false,
    
    // 自动重启配置
    watch: false,
    ignore_watch: ['node_modules', 'logs'],
    max_memory_restart: '1G',
    
    // 进程管理
    min_uptime: '10s',
    max_restarts: 10,
    autorestart: true,
    
    // 其他配置
    merge_logs: true,
    time: true
  }]
}; 