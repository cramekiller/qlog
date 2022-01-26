require("rootpath")();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("_helpers/jwt");
const errorHandler = require("_helpers/error-handler");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// use JWT auth to secure the api
app.use(jwt());

// api routes
app.use("/users", require("./endpoints/users/users.controller"));
app.use("/ingredients", require("./endpoints/ingredients/ingredients.controller"));
app.use("/gobelets", require("./endpoints/gobelets/gobelets.controller"));
app.use("/etats", require("./endpoints/etats_commandes/etats.controller"));
app.use("/boissons", require("./endpoints/boissons/boissons.controller"));
app.use("/commandes", require("./endpoints/commandes/commande.controller"));
app.use("/app", require("./endpoints/app/commander"));

// global error handler
app.use(errorHandler);

// start server
const port =
  process.env.NODE_ENV === "production" ? process.env.PORT || 80 : 4000;
const server = app.listen(port, function () {
  console.log("Server listening on port " + port);
});

module.exports = app;
