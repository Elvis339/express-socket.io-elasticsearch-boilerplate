const { startProdServer, startDevServer } = require("./src/utils");
const { production, development } = require("./src/config/config");

if (process.env.NODE_ENV === "production") {
    startProdServer(production);
} else {
    startDevServer(development);
}

