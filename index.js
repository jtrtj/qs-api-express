const express = require("express");
const apiRoute = require("./routes/api");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
/// use nested objects:
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use("/api", apiRoute);

app.listen("3000");
