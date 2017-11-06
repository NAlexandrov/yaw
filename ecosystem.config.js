'use strict';

const path = require('path');

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
      instances: 1,
      exec_mode: 'fork',
      watch: isWatch ? path.join(__dirname, 'source') : false,
      merge_logs: true,
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      error_file: './logs/yaw.stderr.log',
      out_file: './logs/yaw.stdout.log',
      cwd: __dirname,
      env: {
        TZ: 'Europe/Moscow',
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
    {
      name: 'phone',
      script: './services/phone/index.js',
      instances: 1,
      exec_mode: 'fork',
      watch: isWatch ? path.join(__dirname, 'services', 'phone') : false,
      merge_logs: true,
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      error_file: './logs/phone.stderr.log',
      out_file: './logs/phone.stdout.log',
      cwd: __dirname,
      env: {
        TZ: 'Europe/Moscow',
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
    {
      name: 'reports',
      script: './services/reports/index.js',
      instances: 1,
      exec_mode: 'fork',
      watch: isWatch ? path.join(__dirname, 'services', 'reports') : false,
      merge_logs: true,
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      error_file: './logs/reports.stderr.log',
      out_file: './logs/reports.stdout.log',
      cwd: __dirname,
      env: {
        TZ: 'Europe/Moscow',
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
