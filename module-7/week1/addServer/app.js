//pulls in express from npm
const express = require("express");
//we want express app or server
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json());
const cors = require("cors");
app.use(cors());

//we want a GET endpoint
app.get("/", (req, res) => {
  res.send("Hello World!!!!");
});
// created an express server that has one get endpoint called /hello
// that sends 'hello world' on port 3000 ^^^

// route params
app.get("/add/:num1/:num2", function (req, res) {
  console.log(req.params);
  res.send(`${parseInt(req.params.num1) + parseInt(req.params.num2)}`);
});
// query params
app.get("/add2", (req, res) => {
  console.log(req.query);
  res.send(`${parseInt(req.query.num1) + parseInt(req.query.num2)}`);
});

//post request in postman, post body sent in json -> bodyparser pulls out the json
app.post("/add3", (req, res) => {
  console.log(req.body);
  res.send({
    sum: parseInt(req.body.num1) + parseInt(req.body.num2),
    otherData: "String 2",
  });
});

//tell our server to listen on port 3000 for anyone trying to access /hello endpoint
app.listen(3001, () => {
  console.log(`Server is running on port 3001`);
});
