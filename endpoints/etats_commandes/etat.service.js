const db = require("../../_helpers/db");
const Etat = db.Etat;

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};

async function getAll() {
  return await Etat.find();
}

async function getById(id) {
  return await Etat.findById(id);
}

async function create(etatParam) {
  // validate
  if (await Etat.findOne({ name: etatParam.name })) {
    throw 'name "' + etatParam.name + '" is already taken';
  }

  const etat = new Etat(etatParam);

  // save user
  await etat.save();
}

async function update(id, etatParam) {
  const etat = await Etat.findById(id);

  // validate
  if (!etat) throw "etat not found";
  if (
      etat.name !== etatParam.name &&
    (await Etat.findOne({ name: etatParam.name }))
  ) {
    throw 'state name "' + etatParam.name + '" is already taken';
  }

  // copy userParam properties to user
  Object.assign(etat, etatParam);

  await etat.save();
}

async function _delete(id) {
  await Etat.findByIdAndRemove(id);
}
