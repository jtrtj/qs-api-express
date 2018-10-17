const chai = require("chai");
const should = chai.should();
const chaiHttp = require("chai-http");
const server = require("../index");

const environment = process.env.NODE_ENV || "development";
const configuration = require("../knexfile")[environment];
const database = require("knex")(configuration);

chai.use(chaiHttp);

describe("Meal API Routes", () => {
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

  describe("POST /api/meals/:meal_id/foods/:food_id", () => {
    it("should add the specified food to the specified meal", done => {
      chai
        .request(server)
        .post("/api/meals/1/foods/7")
        .end((err, response) => {
          response.should.have.status(201);
          response.should.be.json;
          response.body.message.should.be.a("string");
          response.body.message.should.equal(
            "Successfully added Ham Sandwich to Breakfast"
          );
          done();
        });
    });

    it("should return 404 if meal doesn't exist", done => {
      chai
        .request(server)
        .post("/api/meals/7/foods/6")
        .end((err, response) => {
          response.should.have.status(404);
          done();
        });
    });

    it("should return 404 if food doesn't exist", done => {
      chai
        .request(server)
        .post("/api/meals/1/foods/12")
        .end((err, response) => {
          response.should.have.status(404);
          done();
        });
    });
  });

  describe("DELETE /api/meals/:meal_id/foods/:food_id", () => {
    it("should delete specified food from specified meal", done => {
      chai
        .request(server)
        .delete("/api/meals/1/foods/5")
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.have.property("message");
          response.body.message.should.equal(
            "Successfully removed Boysenberries from Second Breakfast"
          );
          done();
        });
    });
  });
});
