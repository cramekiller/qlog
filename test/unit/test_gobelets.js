const sinon = require("sinon");
const chai = require("chai");
const expect = chai.expect;
const db = require("../../_helpers/db");
chai.use(require("chai-as-promised"));

const User = db.User;

const userservice = require("../../endpoints/users/user.service");

const wsuserMock = require("../../mock/ws/user.json");
const mongoUserMock = require("../../mock/mongo/user.json");
var sandbox = require("sinon").createSandbox();