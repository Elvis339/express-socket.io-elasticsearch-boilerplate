const mongoose = require("mongoose");

const connUri =
  process.env.NODE_ENV === "production"
    ? process.env.MONGO_PROD_CONNECTION_URL
    : process.env.MONGO_DEV_CONNECTION_URL;
const databaseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
};

mongoose.connect(connUri, databaseOptions, (err) => {
  if (!err) {
    return console.log("Connection to the database established");
  }
  throw new Error(`Error connection to the database! ${err.toString()}`);
});
