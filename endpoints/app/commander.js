const express = require("express");
const router = express.Router();
const boissonsService = require("../boissons/boisson.service")
const ingService = require("../ingredients/ingredient.service")
const gobeletService = require("../gobelets/gobelet.service")
const commandeService = require("../commandes/commande.service")

// routes
router.get("/getBoissons", getBoissons);
router.post("/commander", commander);
router.post("/valider/:id", valider);
router.post("/annuler/:id", annuler);
/*router.get("/", getAll);
router.get("/:id", getById);
router.put("/:id", update);
router.delete("/:id", _delete);*/

module.exports = router;

function getBoissons(req, res, next) {
    boissonsService.getAll().then((boissons) => {
            ingService.getAll().then((ing) => {
                gobeletService.getAll().then((gobelets) => {
                    let chaine = "voici la liste des boissons disponible: \n\n"
                    for (let j = 0; j < gobelets.length; j++) {
                        const taille = gobelets[j].volume
                        if (gobelets[j].quantity > 0) {
                            for (let k = 0; k < boissons.length; k++) {
                                let asIngredients = true
                                for (let i = 0; i < ing.length; i++) {
                                    for (let e = 0; e < (boissons[k].ingredients).length; e++) {
                                        console.log(boissons[k])
                                        if (new String(ing[i]._id) == boissons[k].ingredients[e]._Ingredient.toString()) {
                                            if (ing[i].quantity < boissons[k].ingredients[e].quantity * taille/100) asIngredients = false
                                            console.log(ing[i])
                                        }
                                    }
                                }
                                if(asIngredients) {
                                    chaine += "- "+boissons[k].name + " en " + taille + "cl\n"
                                    chaine+= '{\n"gobelet": "'+ gobelets[j]._id +'",\n "boisson": "'+ boissons[k]._id+'"\n}\n\n'
                                }
                            }
                        }
                    }
                    res.send(chaine)
                })
            })
        }
    );
}

function commander(req, res, next) {
    console.log(req.body)
    boissonsService.getById(req.body.boisson).then((boisson) => {
            if (boisson) {
                ingService.getAll().then((ing) => {
                    gobeletService.getById(req.body.gobelet).then((gobelet) => {
                        if (gobelet) {
                            let asIngredients = true
                            const taille = gobelet.volume
                            for (let i = 0; i < ing.length; i++) {
                                for (let e = 0; e < (boisson.ingredients).length; e++) {
                                    if (new String(ing[i]._id) == boisson.ingredients[e]._Ingredient.toString()) {
                                        if (ing[i].quantity < boisson.ingredients[e].quantity * taille / 100) asIngredients = false
                                    }
                                }
                            }
                            if (asIngredients) {
                                let commande = {
                                    dateheure: Date.now(),
                                    etat_commande: "en cours",
                                    gobelet: req.body.gobelet,
                                    boisson: req.body.boisson
                                }
                                commandeService.create(commande).then((cmd) => res.send("Boisson selectionnée, veuillez soit valider, soit annuler la commande :) \n votre numero de commande est : " + cmd._id + "\n\n - /valider/:numeroCommande \n - /annuler/:numeroCommande")
                                ).catch((err) => next(err));
                                } else {
                                res.send("des ingredients sont manquants")
                            }
                        } else {
                            res.status(500).send("ce type de gobelet n'existe pas")
                        }
                    })
                })
            } else {
                res.status(500).send("cette boisson n'existe pas")
            }
        }
    );
}

function valider(req, res, next) {
    commandeService
        .update(req.params.id, {etat_commande: "validée"})
        .then(() => res.send("Votre boisson sera prete dans quelques instants ;)"))
        .catch((err) => next(err));
}

function annuler(req, res, next) {
    commandeService
        .update(req.params.id, {etat_commande: "annulée"})
        .then(() => res.send("Commande annulée :("))
        .catch((err) => next(err));
}


/*function getAll(req, res, next) {
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
} */
