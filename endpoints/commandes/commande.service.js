const config = require("../../config.json");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../../_helpers/db");
const Commande = db.Commande;

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};

async function getAll() {
  return await Commande.find();
}

async function getById(id) {
  return await Commande.findById(id);
}

async function create(commandeParam) {
  // validate
  const commande = new Commande(commandeParam);

  // save user
  await commande.save()
  return await Commande.findOne({}, {}, { sort: { 'created_at' : -1 } });
}

async function update(id, commandeParam) {
  const commande = await Commande.findById(id);

  // validate
  if (!commande) throw "commande not found";
  if (
      commande.name !== commandeParam.name &&
    (await Commande.findOne({ name: commandeParam.name }))
  ) {
    throw 'name "' + commandeParam.name + '" is already taken';
  }

  // copy userParam properties to user
  Object.assign(commande, commandeParam);

  await commande.save();
}

async function _delete(id) {
  await Commande.findByIdAndRemove(id);
}
