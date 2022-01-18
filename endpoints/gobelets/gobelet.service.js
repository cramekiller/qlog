const db = require("../../_helpers/db");
const Gobelet = db.Gobelet;

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};

async function getAll() {
  return await Gobelet.find();
}

async function getById(id) {
  return await Gobelet.findById(id);
}

async function create(gobeletParam) {
  // validate
  if (await Gobelet.findOne({ volume: gobeletParam.volume })) {
    throw 'volume "' + gobeletParam.volume + '" is already taken';
  }

  const gobelet = new Gobelet(gobeletParam);

  // save user
  await gobelet.save();
}

async function update(id, gobeletParam) {
  const gobelet = await Gobelet.findById(id);

  // validate
  if (!gobelet) throw "gobelet not found";
  if (
      gobelet.volume !== gobeletParam.volume &&
    (await Gobelet.findOne({ volume: gobeletParam.volume }))
  ) {
    throw 'volume "' + gobeletParam.volume + '" is already taken';
  }

  // copy userParam properties to user
  Object.assign(gobelet, gobeletParam);

  await gobelet.save();
}

async function _delete(id) {
  await Gobelet.findByIdAndRemove(id);
}
