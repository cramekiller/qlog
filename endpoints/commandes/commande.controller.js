const express = require("express");
const router = express.Router();
const commandeService = require("./commande.service");

// routes
router.post("/add", add);
router.get("/", getAll);
router.get("/:id", getById);
router.put("/:id", update);
router.delete("/:id", _delete);

module.exports = router;

function add(req, res, next) {
  commandeService
    .create(req.body)
    .then(() => res.json({}))
    .catch((err) => next(err));
}

function getAll(req, res, next) {
  commandeService
    .getAll()
    .then((commandes) => res.json(commandes))
    .catch((err) => next(err));
}


function getById(req, res, next) {
  commandeService
    .getById(req.params.id)
    .then((commande) => (commande ? res.json(commande) : res.sendStatus(404)))
    .catch((err) => next(err));
}

function update(req, res, next) {
  commandeService
    .update(req.params.id, req.body)
    .then(() => res.json({}))
    .catch((err) => next(err));
}

function _delete(req, res, next) {
  commandeService
    .delete(req.params.id)
    .then(() => res.json({}))
    .catch((err) => next(err));
}
