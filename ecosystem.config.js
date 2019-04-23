module.exports = {
  apps: [{
    name: 'url-to-pdf',
    script: 'src/index.js',

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    exp_backoff_restart_delay: 100,
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    output: './logs/out.log',
    error: './logs/error.log',
    log: './logs/combined.outerr.log',
    env: {
      NODE_ENV: 'development',
      PORT: 9000,
      ALLOW_HTTP: true,
      DEBUG_MODE: false
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 9000,
      ALLOW_HTTP: true,
      DEBUG_MODE: false
    }
  }],

  deploy: {
    production: {
      user: 'node',
      host: '212.83.163.1',
      ref: 'origin/master',
      repo: 'git@github.com:repo.git',
      path: '/var/www/production',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
};
