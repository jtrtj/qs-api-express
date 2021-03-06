const chai = require("chai");
const should = chai.should();
const chaiHttp = require("chai-http");
const server = require("../index");

chai.use(chaiHttp);

describe("Client Routes", () => {
  it("should return the homepage with text", done => {
    chai
      .request(server)
      .get("/")
      .end((err, response) => {
        response.should.have.status(200);
        response.should.be.html;
        response.res.text.should.equal("Welcome to the Quantified Self API");
        done();
      });
  });

  it("should return a 404 for a route that does not exist", done => {
    chai
      .request(server)
      .get("/sad")
      .end((err, response) => {
        response.should.have.status(404);
        done();
      });
  });
});
