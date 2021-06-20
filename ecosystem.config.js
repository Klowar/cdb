module.exports = {
  apps : [{
    name: "cdb",
    script: "./build/index.js",
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
    }
  }]
}