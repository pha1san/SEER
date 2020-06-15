const assert = require("assert");
const chai = require("chai");
const chaiHttp = require("chai-http");
const tdd_article = require("../backend/tdd_articles.json");

let app;
let mongoose;

chai.use(chaiHttp);
chai.should();

before(() => {
  app = require("../backend/server").app;
  mongoose = require("../backend/server").mongoose;
});

describe("Array", function () {
  describe("#indexOf()", function () {
    it("should return -1 when the value is not present", function () {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});

describe("API Routing and MongoDB Testing", () => {
  after(() => {
    app.listen().close(() => {
      mongoose.db.dropCollection("entries", (err, result) => {});
      mongoose.db.dropCollection("moderators", (err, result) => {});
      mongoose.db.dropCollection("analysts", (err, result) => {});
      mongoose.close();
    });
  });

  describe("Search article list", () => {
    let id;
    describe("Add TDD Articles to database", () => {
      it("Should add tdd artilce to DB ", (done) => {
        chai
          .request(app)
          .post("/entries/addTDD")
          .send(tdd_article)
          .end((err, res) => {
            res.should.have.status(200);
            assert.equal(res.body, "Entry added!");
            done();
          });
      }).timeout(5000);

      it("Should get an array of articles", (done) => {
        chai
          .request(app)
          .get("/entries")
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("array");
            assert.equal(res.body.length, 23);
            id = res.body[0]._id;
            done();
          });
      }).timeout(5000);
    });

    describe("Add a article and get and delete", () => {
      it("Should add a new article called test Article", (done) => {
        const article = {
          type: "article",
          title: "test artcle",
          author: "test me",
          journal: "myself",
          year: "2020",
          month: "may",
        };
        chai
          .request(app)
          .post("/entries/add")
          .send(article)
          .end((err, res) => {
            res.should.have.status(200);
            assert.equal(res.body, "Entry added!");
            done();
          });
      }).timeout(5000);

      it("Should return a article called test article", (done) => {
        chai
          .request(app)
          .get("/entries/id" + id)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a.property("_id");
            res.body.should.be.a.property("title");
            res.body._id.should.equal(id);
            done();
          });
      }).timeout(5000);

      it("Should delete and return test article", (done) => {
        chai
          .request(app)
          .delete("/entries/delete/id" + id)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a.property("_id");
            res.body.should.be.a.property("title");
            res.body._id.should.equal(id);
            done();
          });
      }).timeout(5000);
    });

    describe("Search articles on database", () => {
      it("Should return array of title search result", (done) => {
        chai
          .request(app)
          .post("/entries/search/title")
          .send({ text: "from" })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("array");
            assert.equal(res.body.length, 1);
            done();
          });
      }).timeout(5000);

      it("Should return array of author search result", (done) => {
        chai
          .request(app)
          .post("/entries/search/author")
          .send({ text: "new" })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("array");
            assert.equal(res.body.length, 1);
            done();
          });
      }).timeout(5000);
    });
  });

  describe("Moderator article list", () => {
    let id;
    describe("ADD an article in moderator list", () => {
      it("Should add a new article called moderator test Article on moderator list", (done) => {
        const article = {
          type: "article",
          title: "moderator test artcle",
          author: "test me",
          journal: "myself",
          year: "2020",
          month: "may",
        };
        chai
          .request(app)
          .post("/moderator/add")
          .send(article)
          .end((err, res) => {
            res.should.have.status(200);
            assert.equal(res.body, "Entry added to Moderator Queue!");
            done();
          });
      }).timeout(5000);
    });
    describe("Get all Articles in moderator list", () => {
      it("Should get an array of articles", (done) => {
        chai
          .request(app)
          .get("/moderator")
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("array");
            assert.equal(res.body.length, 1);
            id = res.body[0]._id;
            done();
          });
      }).timeout(5000);
    });

    describe("Add a article and get and delete to moderator list", () => {
      it("Should return a article called test article on moderator list", (done) => {
        chai
          .request(app)
          .get("/moderator/id" + id)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a.property("_id");
            res.body.should.be.a.property("title");
            res.body._id.should.equal(id);
            done();
          });
      }).timeout(5000);

      it("Should delete and return test article", (done) => {
        chai
          .request(app)
          .delete("/moderator/delete/id" + id)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a.property("_id");
            res.body.should.be.a.property("title");
            res.body._id.should.equal(id);
            done();
          });
      }).timeout(5000);
    });
  });

  describe("Analyst article list", () => {
    let id;
    describe("ADD an article in analyst list", () => {
      it("Should add a new article called analyst test Article on analyst list", (done) => {
        const article = {
          type: "article",
          title: "analyst test artcle",
          author: "test me",
          journal: "myself",
          year: "2020",
          month: "may",
        };
        chai
          .request(app)
          .post("/analyst/add")
          .send(article)
          .end((err, res) => {
            res.should.have.status(200);
            assert.equal(res.body, "Entry added to Analyst Queue!");
            done();
          });
      }).timeout(5000);
    });
    describe("Get all Articles in analyst list", () => {
      it("Should get an array of articles", (done) => {
        chai
          .request(app)
          .get("/analyst")
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("array");
            assert.equal(res.body.length, 1);
            id = res.body[0]._id;
            done();
          });
      }).timeout(5000);
    });

    describe("Add a article and get and delete to analyst list", () => {
      it("Should return a article called test article on analyst list", (done) => {
        chai
          .request(app)
          .get("/analyst/id" + id)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a.property("_id");
            res.body.should.be.a.property("title");
            res.body._id.should.equal(id);
            done();
          });
      }).timeout(5000);

      it("Should delete and return test article", (done) => {
        chai
          .request(app)
          .delete("/analyst/delete/id" + id)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a.property("_id");
            res.body.should.be.a.property("title");
            res.body._id.should.equal(id);
            done();
          });
      }).timeout(5000);
    });
  });
});
