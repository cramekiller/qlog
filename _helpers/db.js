const config = require("../config.json");
const mongoose = require("mongoose");
const connectionOptions = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};
mongoose.connect(
  process.env.MONGODB_URI || config.connectionString,
  connectionOptions
);
mongoose.Promise = global.Promise;

module.exports = {
  User: require("../endpoints/users/user.model"),
  Ingredient: require("../endpoints/ingredients/ingredient.model"),
  Gobelet: require("../endpoints/gobelets/gobelet.model"),
  Etat: require("../endpoints/etats_commandes/etat.model"),
  Boisson: require("../endpoints/boissons/boisson.model"),
  Commande: require("../endpoints/Commandes/commande.model"),
};
