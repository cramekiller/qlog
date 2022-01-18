const express = require("express");
const router = express.Router();
const boissonService = require("./boisson.service");

// routes
router.post("/add", add);
router.get("/", getAll);
router.get("/:id", getById);
router.put("/:id", update);
router.delete("/:id", _delete);

module.exports = router;

function add(req, res, next) {
  boissonService
    .create(req.body)
    .then(() => res.json({}))
    .catch((err) => next(err));
}

function getAll(req, res, next) {
  boissonService
    .getAll()
    .then((boissons) => res.json(boissons))
    .catch((err) => next(err));
}


function getById(req, res, next) {
  boissonService
    .getById(req.params.id)
    .then((boisson) => (boisson ? res.json(boisson) : res.sendStatus(404)))
    .catch((err) => next(err));
}

function update(req, res, next) {
  boissonService
    .update(req.params.id, req.body)
    .then(() => res.json({}))
    .catch((err) => next(err));
}

function _delete(req, res, next) {
  boissonService
    .delete(req.params.id)
    .then(() => res.json({}))
    .catch((err) => next(err));
}
