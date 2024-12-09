module.exports = {
    apps: [{
      name: "optimize",
      script: "server.js",
      exp_backoff_restart_delay: 100,
      shutdown_with_message: true,
      log: './logs/combined.outerr.log',
      watch: true,
      args: [
        "--color"
      ],
      ignore_watch: ["node_modules", "logs/*"],

      env: {
        NODE_ENV: 'local'
      }
    }]
  }