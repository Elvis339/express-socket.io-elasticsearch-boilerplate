const fs = require("fs");
const path = require("path");
const https = require("https");
const http = require("http");

const app = require("./app");
const { elastic } = require("./services/elasticsearch/ElasticSearch");

module.exports = {
  startProdServer: (production) => {
    const SSL = production.sslPath;
    const httpsOpts = {
      cert: fs.readFileSync(path.join(SSL, "server.cert")), // Your cert keys here
      key: fs.readFileSync(path.join(SSL, "server.key")),
    };
    const httpsServer = https.createServer(httpsOpts, app);
    httpsServer.listen(production.port, () => {
      console.log(`Server started at ${production.url}:${production.port}`);
    });

    elastic
      .ping()
      .then(() => console.log("ElasticSearch is connected..."))
      .catch(() => {
        console.log("ElasticSearch server is not responding...");
        process.exit(1);
      });

    global.io = require("socket.io")(httpsServer);

    module.exports = app;
  },

  startDevServer: (dev) => {
    const httpServer = http.createServer(app);
    httpServer.listen(dev.port, () => {
      console.log(`Server started at ${dev.url}:${dev.port}`);
    });

    elastic
      .ping()
      .then(() => console.log("ElasticSearch is connected..."))
      .catch(() => {
        console.log("ElasticSearch server is not responding...");
        process.exit(1);
      });

    global.io = require("socket.io")(httpServer);

    module.exports = app;
  },
};
