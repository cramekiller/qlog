const sinon = require("sinon");
const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const app = require("../server");
chai.use(require("chai-as-promised"));
let token = "";
let conencted_user_id = "";
let ingredient_id = "";

describe("Autheticate", function () {
    afterEach(function () {});
    it("Should create user", (done) => {
        chai
            .request(app)
            .post("/users/register")
            .set("content-type", "application/json")
            .send({
                firstName: "Jason2",
                lastName: "Watmore2",
                username: "jason5",
                password: "my-super-secret-password",
            })
            .end((err, res) => {
                expect(res.status).to.equal(200);
                done();
            });
    });

    it("Should authenticate user", (done) => {
        chai
            .request(app)
            .post("/users/authenticate")
            .set("content-type", "application/json")
            .send({
                username: "jason5",
                password: "my-super-secret-password",
            })
            .end((err, res) => {
                //console.log(res);
                expect(res.status).to.equal(200);
                token = res.body.token;
                conencted_user_id = res.body.id;
                console.log(conencted_user_id);
                done();
            });
    });

    it("Should delete user", (done) => {
        chai
            .request(app)
            .delete("/users/" + conencted_user_id)
            .set("content-type", "application/json")
            .set({ Authorization: `Bearer ${token}` })
            .end((err, res) => {
                expect(res.status).to.equal(200);
                done();
            });
    });
});

describe("Ingredients",function (){
    afterEach(function (){});
    it("Devrait ajouter un ingrédient",(done) =>{
        request(app)
            .post("ingredients/add")
            .set("content-type","application/json")
            .send({
            name:"Café en poudre",
            quantity:100,
            })
            .end((err,res)=>{
                expect(res.status).to.equal(200);
                done();
            })
    });

    it("Devrait afficher les ingrédients",(done) =>{
        request(app)
            .post("/ingredients/")
            .get("Accept", "application/json")
            .end((err, res) => {
                //console.log(res);
                expect(res.status).to.equal(200);
                token = res.body.token;
                ingredient_id = res.body.id;
                console.log(ingredient_id);
                done();
            });
    })

    it("Devrait supprimer un ingrédient",(done) =>{
        request(app)
            .delete("/ingredients/" + ingredient_id)
            .set("content-type", "application/json")
            .set({ Authorization: `Bearer ${token}` })
            .end((err, res) => {
                expect(res.status).to.equal(200);
                done();
            });
    });
})
