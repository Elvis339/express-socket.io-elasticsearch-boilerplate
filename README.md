# Express - Socket.io - Mongo - JWT - ElasticSearch boilerplate

# How to

1. Setup

This command will install all dependencies required for Node

```
sh start.sh
```

Don't forget to create your own .env file, here's an example:

```
JWT_SECRET=secret-hash
MONGO_PROD_CONNECTION_URL=mongodb://127.0.0.1:27017/your-db
MONGO_DEV_CONNECTION_URL=mongodb://127.0.0.1:27017/your-db
MONGO_DB_NAME=your-db
ELASTIC_SEARCH_CONNECTION_URL=http://localhost:9200
```

In `src/config/config.js` under `production` add path to your self signed certs so you can run Node's https module.


2. Modules  
Basic User handling is provided with socket.io && elasticsearch services it's used to kickstart your project asap.