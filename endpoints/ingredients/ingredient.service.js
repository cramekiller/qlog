const config = require("../../config.json");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../../_helpers/db");
const Ingredient = db.Ingredient;

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};

async function getAll() {
  return await Ingredient.find();
}

async function getById(id) {
  return await Ingredient.findById(id);
}

async function create(ingredientParam) {
  // validate
  if (await Ingredient.findOne({ name: ingredientParam.name })) {
    throw 'name "' + ingredientParam.name + '" is already taken';
  }

  const ingredient = new Ingredient(ingredientParam);

  // save user
  await ingredient.save();
}

async function update(id, ingredientParam) {
  const ingredient = await Ingredient.findById(id);

  // validate
  if (!ingredient) throw "ingredient not found";
  if (
      ingredient.name !== ingredientParam.name &&
    (await Ingredient.findOne({ name: ingredientParam.name }))
  ) {
    throw 'name "' + ingredientParam.name + '" is already taken';
  }

  // copy userParam properties to user
  Object.assign(ingredient, ingredientParam);

  await ingredient.save();
}

async function _delete(id) {
  await Ingredient.findByIdAndRemove(id);
}
