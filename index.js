const express = require("express");
const apiRoute = require("./routes/api");
const bodyParser = require("body-parser");

const app = express();

app.set("port", process.env.PORT || 3000);
app.locals.title = "Qunatified Self API";
app.use(bodyParser.json());
/// use nested objects:
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST, PUT, DELETE, PATCH");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", (request, response) => {
  response.send("Welcome to the Quantified Self API");
});

app.use("/api", apiRoute);

app.listen(app.get("port"), () => {
  console.log(`${app.locals.title} is running on ${app.get("port")}.`);
});

module.exports = app;
