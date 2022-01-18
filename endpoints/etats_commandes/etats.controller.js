const express = require("express");
const router = express.Router();
const tailleService = require("./etat.service");

// routes
router.post("/add", add);
router.get("/", getAll);
router.get("/:id", getById);
router.put("/:id", update);
router.delete("/:id", _delete);

module.exports = router;

function add(req, res, next) {
  tailleService
    .create(req.body)
    .then(() => res.json({}))
    .catch((err) => next(err));
}

function getAll(req, res, next) {
  tailleService
    .getAll()
    .then((etats) => res.json(etats))
    .catch((err) => next(err));
}


function getById(req, res, next) {
  tailleService
    .getById(req.params.id)
    .then((etat) => (etat ? res.json(etat) : res.sendStatus(404)))
    .catch((err) => next(err));
}

function update(req, res, next) {
  tailleService
    .update(req.params.id, req.body)
    .then(() => res.json({}))
    .catch((err) => next(err));
}

function _delete(req, res, next) {
  tailleService
    .delete(req.params.id)
    .then(() => res.json({}))
    .catch((err) => next(err));
}
