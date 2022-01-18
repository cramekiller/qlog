const config = require("../../config.json");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../../_helpers/db");
const Boisson = db.Boisson;

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};

async function getAll() {
  return await Boisson.find();
}

async function getById(id) {
  return await Boisson.findById(id);
}

async function create(boissonParam) {
  // validate
  if (await Boisson.findOne({ name: boissonParam.name })) {
    throw 'name "' + boissonParam.name + '" is already taken';
  }

  const boisson = new Boisson(boissonParam);

  // save user
  await boisson.save();
}

async function update(id, boissonParam) {
  const boisson = await Boisson.findById(id);

  // validate
  if (!boisson) throw "boisson not found";
  if (
      boisson.name !== boissonParam.name &&
    (await Boisson.findOne({ name: boissonParam.name }))
  ) {
    throw 'name "' + boissonParam.name + '" is already taken';
  }

  // copy userParam properties to user
  Object.assign(boisson, boissonParam);

  await boisson.save();
}

async function _delete(id) {
  await Boisson.findByIdAndRemove(id);
}
