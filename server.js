const express = require('express')
const bodyParser = require('body-parser')
const { proxyCacheMiddleware, InMemoryCache } = require('apollo-proxy-cache')

const backendServer = "http://m2.betelgeuse.yr";

const queryCache = new InMemoryCache()
const proxyMiddlewareFactory = proxyCacheMiddleware(queryCache);

const app = express();
app.use(bodyParser.json());

proxyMiddlewareFactory(
  app,
  '/graphql',
  { target: backendServer, changeOrigin: true }
)

app.listen(4000, () => {
  console.log('Go to http://localhost:4000/graphql to run queries!');
});

