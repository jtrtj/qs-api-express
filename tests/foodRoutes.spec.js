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

  describe("GET /api/foods", () => {
    it("should return all foods in db", done => {
      chai
        .request(server)
        .get("/api/foods")
        .end((err, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a("array");
          response.body[0].should.have.property("id");
          response.body[0].should.have.property("name");
          response.body[0].should.have.property("calories");
          done();
        });
    });
  });

  describe("GET /api/foods/:food_id", () => {
    it("should return the food specified by :food_id", done => {
      chai
        .request(server)
        .get("/api/foods/1")
        .end((err, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.have.property("id");
          response.body.should.have.property("name");
          response.body.should.have.property("calories");
          done();
        });
    });

    it("should return 404 if food doesn't exist", done => {
      chai
        .request(server)
        .get("/api/foods/345678987654")
        .end((err, response) => {
          response.should.have.status(404);
          done();
        });
    });
  });

  describe("POST /api/food", () => {
    it("should create a new food", done => {
      chai
        .request(server)
        .post("/api/foods")
        .send({
          food: {
            name: "Tristan's Power Level",
            calories: "9001"
          }
        })
        .end((err, response) => {
          response.should.status(201);
          response.body.should.be.a("object");
          response.body.should.have.property("id");
          response.body.should.have.property("name");
          response.body.should.have.property("calories");
          done();
        });
    });

    it("should not create a record with missing data", done => {
      chai
        .request(server)
        .post("/api/foods")
        .send({
          food: {
            name: "Tristan's Power Level"
          }
        })
        .end((err, response) => {
          response.should.have.status(400);
          response.body.error.should.eq(
            `Expected format: { name: <string>, calories: <integer> }. You are missing a "calories property."`
          );
          done();
        });
    });
  });
});
