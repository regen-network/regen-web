module.exports = {
  apps: [{
      name: 'server',
      script: 'server/Server.ts',
      interpreter: 'server/node_modules/.bin/ts-node',
      watch: true,
      log: true
    },
    {
      name: 'docker-compose',
      script: 'docker-compose up',
      cwd: 'server/',
      log: true
    },
    {
      name: 'web',
      script: 'yarn start',
      cwd: 'web/',
      log: true
    }
  ],
  deploy: {}
};