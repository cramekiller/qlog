const express = require("express");
const router = express.Router();
const ingredientService = require("./ingredient.service");

// routes
router.post("/add", add);
router.get("/", getAll);
router.get("/:id", getById);
router.put("/:id", update);
router.delete("/:id", _delete);

module.exports = router;

function add(req, res, next) {
  ingredientService
    .create(req.body)
    .then(() => res.json({}))
    .catch((err) => next(err));
}

function getAll(req, res, next) {
  ingredientService
    .getAll()
    .then((ingredients) => res.json(ingredients))
    .catch((err) => next(err));
}


function getById(req, res, next) {
  ingredientService
    .getById(req.params.id)
    .then((ingredient) => (ingredient ? res.json(ingredient) : res.sendStatus(404)))
    .catch((err) => next(err));
}

function update(req, res, next) {
  ingredientService
    .update(req.params.id, req.body)
    .then(() => res.json({}))
    .catch((err) => next(err));
}

function _delete(req, res, next) {
  ingredientService
    .delete(req.params.id)
    .then(() => res.json({}))
    .catch((err) => next(err));
}
