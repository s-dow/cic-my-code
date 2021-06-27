const express = require("express");
const server = express();
const cors = require("cors");
server.use(cors());
const bodyParser = require("body-parser");
server.use(bodyParser.json());

let messages = [
  {
    text: "Hey!",
    received: false,
    timestamp: new Date(),
  },
  {
    text: "Hi!",
    received: true,
    timestamp: new Date(),
  },
];

//GET req
//App.js
//loadMessages
//send messages array
server.get(`/messages`, (req, res) => {
  res.send({ messages });
});

//POST req
//MessageInput.js
//Onsubmit - push req body into messages array and send
server.post(`/messages`, (req, res) => {
  console.log(req.body);
  messages.push(req.body);
  res.send({ messages: messages });
});

//PUT req
//MessagesList.js
//get the index of the clicked message, make message equal to 
//the body of the req (changedText = window.prompt value) and send messages back
server.put("/messages/:index", (req, res) => {
  messages[req.params.index].text = req.body.text;
  res.send({ messages });
});

//DELETE req
//MessagesList.js
//get the index of clicked message, splice that message out of the array
//of messages, send the array of messages back
server.delete("/messages/:index", (req, res) => {
  messages.splice(req.params.index, 1);
  res.send({ messages });
});

server.get("/", (req, res) => {
  res.send("Hello World");
});

//server listening on port 3001
server.listen(3001, () => {
  console.log(`Backend Server listening on port 3001`);
});
