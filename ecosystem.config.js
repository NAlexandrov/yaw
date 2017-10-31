'use strict';

const isWatch = !!process.env.WATCH;

module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [
    {
      name: 'yaw',
      script: 'index.js',
      instances: isWatch ? 1 : 'max',
      exec_mode: isWatch ? 'fork' : 'cluster',
      watch: isWatch,
      merge_logs: true,
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      error_file: './logs/smp.stderr.log',
      out_file: './logs/smp.stdout.log',
      cwd: __dirname,
      env: {
        TZ: 'UTC',
      },
      env_production: {
        NODE_ENV: 'production',
      },
      env_development: {
        NODE_ENV: 'development',
      },
      ignore_watch: [
        '[\\/\\\\]\\./',
        '.git',
        'node_modules',
        'logs',
        'coverage',
        'scripts',
        'tests',
      ],
      autorestart: true,
    },
  ],
};
