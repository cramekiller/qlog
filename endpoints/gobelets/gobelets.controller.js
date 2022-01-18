const express = require("express");
const router = express.Router();
const gobeletService = require("./gobelet.service");

// routes
router.post("/add", add);
router.get("/", getAll);
router.get("/:id", getById);
router.put("/:id", update);
router.delete("/:id", _delete);

module.exports = router;

function add(req, res, next) {
  gobeletService
    .create(req.body)
    .then(() => res.json({}))
    .catch((err) => next(err));
}

function getAll(req, res, next) {
  gobeletService
    .getAll()
    .then((gobelets) => res.json(gobelets))
    .catch((err) => next(err));
}


function getById(req, res, next) {
  gobeletService
    .getById(req.params.id)
    .then((gobelet) => (gobelet ? res.json(gobelet) : res.sendStatus(404)))
    .catch((err) => next(err));
}

function update(req, res, next) {
  gobeletService
    .update(req.params.id, req.body)
    .then(() => res.json({}))
    .catch((err) => next(err));
}

function _delete(req, res, next) {
  gobeletService
    .delete(req.params.id)
    .then(() => res.json({}))
    .catch((err) => next(err));
}
