const assert = require("assert");
const chai = require("chai");
const chaiHttp = require("chai-http");
const entryModel = require("../backend/models/entryModel");
const tdd_article = require("../backend/tdd_articles.json");
let request = require("supertest");
let app;
let mongoose;

chai.use(chaiHttp);
chai.should();

describe("Array", function () {
  describe("#indexOf()", function () {
    it("should return -1 when the value is not present", function () {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});

describe("------------ API Routing ------------", () => {
  before(() => {
    app = require("../backend/server").app;
    mongoose = require("../backend/server").mongoose;
  }),
    describe("/GET Request to get all articles", () => {
      it("Should get an array of articles", (done) => {
        chai
          .request(app)
          .get("/entries")
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("array");
            done();
          });
      }).timeout(5000);
      it("Should get an array of articles", (done) => {
        chai
          .request(app)
          .get("/entries")
          .end((err, res) => {
            console.log(res.body);

            res.should.have.status(200);
            res.body.should.be.a("array");
            done();
          });
      }).timeout(5000);
    });
  after(() => {
    console.log("pass this");

    app.listen().close(() => {
      mongoose.connection.close();
    });
  });
});
