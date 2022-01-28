const sinon = require("sinon");
const chai = require("chai");
const expect = chai.expect;
const db = require("../../_helpers/db");
chai.use(require("chai-as-promised"));

const User = db.User;
const Gobelet = db.Gobelet;
const gobeletservice = require("../../endpoints/gobelets/gobelet.service");
MongoId=require('mongodb').ObjectID;

const wsgobeletMock = require("../../mock/ws/gobelet.json");
const mongoGobeletMock = require("../../mock/mongo/gobelet.json");
var sandbox = require("sinon").createSandbox();

describe("Get gobelet", function() {
    afterEach(function () {
        Gobelet.findOne.restore();
        sandbox.restore();
    });
    it("Should find gobelet", async function () {
        sinon
            .stub(Gobelet, "findOne")
            .withArgs({
                volume: 1,
                quantity: 10
            })
            .resolves(new Gobelet(mongoGobeletMock));
        const response = await gobeletservice.getAll()
            .then((gobelet) => {
                console.log(gobelet);
                expect(gobelet[0].volume).to.equal(wsgobeletMock.volume);
                expect(gobelet[0].quantity).to.equal(wsgobeletMock.quantity);
            });
    })
});

describe("Add Gobelet", function () {
    afterEach(function () {
        Gobelet.findOne.restore();
        sandbox.restore();
    });
    it("It should not create an existing Gobelet", async function () {
        sinon
            .stub(Gobelet, "findOne")
            .withArgs({
                volume: "1",
                quantity: "10"
            })
            .resolves(new Gobelet(mongoGobeletMock));

    });

    it("It should create a new Gobelet", async function () {
        sandbox.stub(Gobelet.prototype, "save").resolves({});
        sandbox
            .stub(Gobelet, "findOne")
            .withArgs({
                volume: "1",
                quantity: "10"
            })
            .resolves(null);

        const new_gobelet = {
            volume: "1",
            quantity: "10"
        };

        await expect(gobeletservice.create(new_gobelet)).to.be.empty;
    });
});

describe("Delete Gobelet", function () {
    afterEach(function () {
        Gobelet.findOne.restore();
        sandbox.restore();
    });
    it("It should delete the gobelet", async function(){
            sandbox.stub(Gobelet.prototype, "save").resolves({});
            sandbox
                .stub(Gobelet, "findOne")
                .withArgs({
                    volume: "1",
                    quantity: "10"
                })
                .resolves(null);
            await expect(gobeletservice.delete(Gobelet.prototype)).to.be.empty
        }
    );
});

describe("Update Gobelet", function () {
    afterEach(function () {
        Gobelet.findOne.restore();
        sandbox.restore();
    });
    it("It should delete the gobelet", async function () {
        sandbox.stub(Gobelet.prototype, "save").resolves({});
        sandbox
            .stub(Gobelet, "findOne")
            .withArgs({
                volume: "1",
                quantity: "10"
            })
            .resolves(null);
        await expect(gobeletservice.update(Gobelet.prototype)).to.be.empty
    });
});