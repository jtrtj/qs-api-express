const chai = require("chai");
const should = chai.should();
const chaiHttp = require("chai-http");
const server = require("../index");

const environment = process.env.NODE_ENV || "development";
const configuration = require("../knexfile")[environment];
const database = require("knex")(configuration);

chai.use(chaiHttp);

describe("API Routes", () => {
  before(done => {
    database.migrate
      .latest()
      .then(() => done())
      .catch(error => {
        throw error;
      });
  });

  beforeEach(done => {
    database.seed
      .run()
      .then(() => done())
      .catch(error => {
        throw error;
      });
  });

  describe("GET /api/meals", () => {
    it("should return meal and its foods", done => {
      chai
        .request(server)
        .get("/api/meals")
        .end((err, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a("array");
          response.body[0].should.have.property("id");
          response.body[0].should.have.property("foods");
          response.body[0].should.have.property("name");
          response.body[0].foods.should.be.a("array");
          response.body[0].foods[0].should.have.property("id");
          response.body[0].foods[0].should.have.property("name");
          response.body[0].foods[0].should.have.property("calories");
          done();
        });
    });
  });
});
