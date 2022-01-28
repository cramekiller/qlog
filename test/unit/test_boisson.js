const sinon = require("sinon");
const chai = require("chai");
const expect = chai.expect;
const db = require("../../_helpers/db");
chai.use(require("chai-as-promised"));

const User = db.User;
const Boisson = db.Boisson;
const boissonService = require("../../endpoints/boissons/boisson.service");
MongoID = require("../../mock/ws/user.json");
const wsBoissonMock = require("../../mock/ws/boisson.json");
const mongoBoissonMock = require("../../mock/mongo/boisson.json");
var sandbox = require("sinon").createSandbox();

describe("Get boisson",function (){
    afterEach(function (){
        Boisson.findOne.restore();
        sandbox.restore();
    });
    it("Should find boisson", async function(){
        sinon
            .stub(Boisson, "findOne")
            .withArgs({
                name: "Café",
                description: "Café bien chaud",
                price:0.80
            })
            .resolves(new Boisson(mongoBoissonMock));
        const response = await boissonService.getAll()
            .then((boisson) => {
                console.log(boisson);
                expect(boisson[0].name).to.equal(wsBoissonMock.name);
                expect(boisson[0].description).to.equal(wsBoissonMock.description);
                expect(boisson[0].price).to.equal(wsBoissonMock.price);
            });
    })
})

describe("Add Boisson", function () {
    afterEach(function () {
        Boisson.findOne.restore();
        sandbox.restore();
    });
    it("It should not create an existing Boisson", async function () {
        sinon
            .stub(Boisson, "findOne")
            .withArgs({
                name: "Café",
                description: "Café bien chaud",
                price:0.80
            })
            .resolves(new Boisson(mongoBoissonMock));

    });

    it("It should create a new Boisson", async function () {
        sandbox.stub(Boisson.prototype, "save").resolves({});
        sandbox
            .stub(Boisson, "findOne")
            .withArgs({
                name: "Chocolat chaud",
            })
            .resolves(null);

        const new_boisson = {
            name: "Chocolat chaud",
            description: "Chocolat bien chaud",
            price:0.70
        };

        await expect(boissonService.create(new_boisson)).to.be.empty;
    });
});

describe("Delete Boisson", function () {
    afterEach(function () {
        Boisson.findOne.restore();
        sandbox.restore();
    });
    it("It should delete the boisson", async function(){
            sandbox.stub(Boisson.prototype, "save").resolves({});
            sandbox
                .stub(Boisson, "findOne")
                .withArgs({
                    name: "Café",
                })
                .resolves(null);
            await expect(boissonService.delete(Boisson.prototype)).to.be.empty
        }
    );
});

describe("Update Boisson", function () {
    afterEach(function () {
        Boisson.findOne.restore();
        sandbox.restore();
    });
    it("It should delete the boisson", async function () {
        sandbox.stub(Boisson.prototype, "save").resolves({});
        sandbox
            .stub(Boisson, "findOne")
            .withArgs({
                name: "Café",
            })
            .resolves(null);
        await expect(boissonService.update(Boisson.prototype)).to.be.empty
    });
});