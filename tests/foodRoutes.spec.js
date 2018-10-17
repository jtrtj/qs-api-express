const chai = require("chai");
const should = chai.should();
const chaiHttp = require("chai-http");
const server = require("../index");

const environment = process.env.NODE_ENV || "development";
const configuration = require("../knexfile")[environment];
const database = require("knex")(configuration);

chai.use(chaiHttp);

describe("Food API Routes", () => {
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
            calories: 9001
          }
        })
        .end((err, response) => {
          response.should.have.status(201);
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

  describe("PUT /api/foods/:food_id", () => {
    it("should update the food specified by the food_id parameter", done => {
      chai
        .request(server)
        .put("/api/foods/2")
        .send({
          food: {
            name: "Redbull",
            calories: 567
          }
        })
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.should.have.property("id");
          response.body.should.have.property("name");
          response.body.should.have.property("calories");
          done();
        });
    });

    it("should not update the food specified without required parameters", done => {
      chai
        .request(server)
        .put("/api/foods/2")
        .send({
          food: {
            calories: 567
          }
        })
        .end((err, response) => {
          response.should.have.status(400);
          response.body.error.should.eq(
            `Expected format: { name: <string>, calories: <integer> }. You are missing a "name property."`
          );
          done();
        });
    });
  });

  describe("DELETE /api/foods/:food_id", () => {
    it("should delete a food with the specified food_id", done => {
      chai
        .request(server)
        .post("/api/foods")
        .send({
          food: {
            name: "Delete me",
            calories: 543
          }
        })
        .end((err, response) => {
          const foodToDeleteId = response.body.id;

          chai
            .request(server)
            .delete(`/api/foods/${foodToDeleteId}`)
            .end((err, response) => {
              response.should.have.status(204);
              chai
                .request(server)
                .get("/api/foods")
                .end((err, response) => {
                  response.body.length.should.equal(10);
                  done();
                });
            });
        });
    });

    it("should not delete a food that doesn't exist", done => {
      chai
        .request(server)
        .delete(`/api/foods/4567890`)
        .end((err, response) => {
          response.should.have.status(404);
          done();
        });
    });
  });
});
