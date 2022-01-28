const sinon = require("sinon");
const chai = require("chai");
const expect = chai.expect;
const db = require("../../_helpers/db");
chai.use(require("chai-as-promised"));

const User = db.User;
const Ingredient = db.Ingredient;
const ingredientservice = require("../../endpoints/ingredients/ingredient.service");
MongoId=require('mongodb').ObjectID;
const wsuserMock = require("../../mock/ws/user.json");
const wsingredientMock = require("../../mock/ws/ingredient.json");
const mongoIngredientMock = require("../../mock/mongo/ingredient.json");
var sandbox = require("sinon").createSandbox();

/*describe("Get ingredient", function() {
    afterEach(function () {
        Ingredient.findOne.restore();
        sandbox.restore();
    });
    it("Should find ingredient", async function () {
        sinon
            .stub(Ingredient, "findOne")
            .withArgs({
                name: "sucre",
                quantity: 1000
            })
            .resolves(new Ingredient(mongoIngredientMock));
        const response = await ingredientservice.getAll()
            .then((ingredient) => {
                console.log(ingredient);
                expect(ingredient[0].name).to.equal(wsingredientMock.name);
                expect(ingredient[0].quantity).to.equal(wsingredientMock.quantity);
            });
    })
});*/

describe("Add Ingredient", function () {
    afterEach(function () {
        Ingredient.findOne.restore();
        sandbox.restore();
    });
    it("It should not create an existing Ingredient", async function () {
        sinon
            .stub(Ingredient, "findOne")
            .withArgs({
                name: "sucre",
            })
            .resolves(new Ingredient(mongoIngredientMock));

    });

    it("It should create a new Ingredient", async function () {
        sandbox.stub(Ingredient.prototype, "save").resolves({});
        sandbox
            .stub(Ingredient, "findOne")
            .withArgs({
                name: "new_ing",
            })
            .resolves(null);

        const new_ingredient = {
            name: "new_ing",
            quantity: "10"
        };

        await expect(ingredientservice.create(new_ingredient)).to.be.empty;
    });
});

describe("Delete Ingredient", function () {
    afterEach(function () {
       Ingredient.findOne.restore();
        sandbox.restore();
    });
    it("It should delete the ingredient", async function(){
            sandbox.stub(Ingredient.prototype, "save").resolves({});
            sandbox
                .stub(Ingredient, "findOne")
                .withArgs({
                    name: "sucre",
                })
                .resolves(null);
            await expect(ingredientservice.delete(Ingredient.prototype)).to.be.empty
    }
    );
});

describe("Update Ingredient", function () {
    afterEach(function () {
        Ingredient.findOne.restore();
        sandbox.restore();
    });
    it("It should delete the ingredient", async function () {
        sandbox.stub(Ingredient.prototype, "save").resolves({});
        sandbox
            .stub(Ingredient, "findOne")
            .withArgs({
                name: "sucre",
            })
            .resolves(null);
        await expect(ingredientservice.update(Ingredient.prototype)).to.be.empty
    });
}); 