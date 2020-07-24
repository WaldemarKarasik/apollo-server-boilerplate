const express = require("express");
const next = require("next");
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  const db = require("./database");
  db.connect();
  require("./middlewares").init(server, db);
  const apolloServer = require("./graphql").createApolloServer();
  apolloServer.applyMiddleware({ app: server });
  server.all("*", (req, res) => {
    return handle(req, res);
  });
  server.listen(process.env.PORT || 3000, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost`);
  });
});
