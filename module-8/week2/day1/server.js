const express = require("express");
const server = express();

const cors = require("cors");
server.use(cors());

const bodyParser = require("body-parser");
server.use(bodyParser.json());

const { db } = require("./models/db");
const Message = require("./models/Message")(db);

server.get("/", (req, res) => {
  res.send({ hello: "world" });
});

server.get("/messages", async (req, res) => {
  res.send({ messages: await Message.findAll() });
});

server.post("/messages", async (req, res) => {
  await Message.create({
    timestamp: new Date(),
    content: req.body.content,
    received: req.body.received,
  });
  const messages = await Message.findAll();

  res.send({ messages });
});

/// COMBINE two messages by ID
server.post("/messages/:id/:id2", async (req, res) => {
  let originalMessage = await Message.findAll({
    where: { id: req.params.id },
  });
  let originalMessage2 = await Message.findAll({
    where: { id: req.params.id2 },
  });
  let newMessage =
    originalMessage[0].content + ` ` + originalMessage2[0].content;

  await Message.create({
    timestamp: new Date(),
    content: newMessage,
    received: req.body.received,
  });

  res.send({ messages: await Message.findAll() });
});

server.delete(`/messages/:id`, async (req, res) => {
  await Message.destroy({ where: { id: req.params.id } });
  res.send({ messages: await Message.findAll() });
});

server.put(`/messages/:id`, async (req, res) => {
  let myMessage = await Message.findOne({ where: { id: req.params.id } });
  myMessage.content = req.body.content;
  myMessage.timestamp = new Date();
  await myMessage.save();
  res.send({ messages: await Message.findAll() });
});

server.listen(3002, () => {
  console.log("Server is running on port 3002.");
});
