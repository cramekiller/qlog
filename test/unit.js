const sinon = require("sinon");
const chai = require("chai");
const expect = chai.expect;
const db = require("../_helpers/db");
chai.use(require("chai-as-promised"));

const User = db.User;

const userservice = require("../users/user.service");

const wsuserMock = require("../mock/ws/user.json");
const mongoUserMock = require("../mock/mongo/user.json");
var sandbox = require("sinon").createSandbox();

describe("Autheticate", function () {
  afterEach(function () {
    User.findOne.restore();
    sandbox.restore();
  });
  it("Should authenticate user", async function () {
    sinon
      .stub(User, "findOne")
      .withArgs({
        username: "jason",
      })
      .resolves(new User(mongoUserMock));

    const response = await userservice
      .authenticate({
        username: "jason",
        password: "my-super-secret-password",
      })
      .then((user) => {
        expect(user.username).to.equal(wsuserMock.username);
        expect(user.password).to.equal(wsuserMock.password);
        //Verify that a token was generated
        expect(user.token).to.not.be.empty;
      });
  });
});

describe("Register a user", function () {
  afterEach(function () {
    User.findOne.restore();
    sandbox.restore();
  });
  it("It should not create an existing user", async function () {
    sinon
      .stub(User, "findOne")
      .withArgs({
        username: "jason",
      })
      .resolves(new User(mongoUserMock));

    const existingUser = {
      username: "jason",
      password: "my-super-secret-password",
    };
    // try {
    //   userservice.create(newUser);
    // } catch (error) {
    //   expect(error).to.equal('Username "jason" is already taken');
    // }
    await expect(userservice.create(existingUser)).to.be.rejectedWith(
      'Username "jason" is already taken'
    );
  });

  it("It should create a new user", async function () {
    sandbox.stub(User.prototype, "save").resolves({});
    sandbox
      .stub(User, "findOne")
      .withArgs({
        username: "jason3",
      })
      .resolves(null);

    const newUser = {
      username: "jason3",
      password: "my-super-secret-password",
      lastName: "Doe",
      firstName: "Jason3",
    };
    //sinon.stub(newUser, "save").resolves({});

    await expect(userservice.create(newUser)).to.be.empty;
  });
});
