module.exports = {
  development: {
    port: process.env.PORT || 5000,
    url: "http://127.0.0.1",
    env: "development",
    saltingRounds: 10,
  },
  production: {
    port: process.env.PORT || 3000,
    url: "https://your-url",
    env: "production",
    saltingRounds: 10,
    sslPath: "", // Root path to server certificates for SSL
  },
};
