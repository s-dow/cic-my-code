const express = require("express");
const server = express();
const cors = require("cors");
server.use(cors());
const bodyParser = require("body-parser");
server.use(bodyParser.json());

const { Client } = require("pg");
const db = new Client({ user: "hackupstate", database: "messages1" });
db.connect();
// db.query("SELECT NOW()", (err, res) => {
//   console.log(res);
// });
server.get(`/messages`, async (req, res) => {
  const messagesDB = await db.query(
    `SELECT id, content, timeStamp, received FROM messages`
  );
  res.send({
    messages: messagesDB.rows.map((message) => {
      return { ...message, text: message.content };
    }),
  });
  // res.send({ messages });
});

server.post(`/messages`, async (req, res) => {
  //   console.log(req.body);
  const insertQuery = await db.query(
    `INSERT INTO messages (content, timestamp, received) VALUES ('${req.body.text}', NOW(), false)`
  );
  const messagesDB = await db.query(
    `SELECT id, content, timeStamp, received FROM messages`
  );
  res.send({
    messages: messagesDB.rows.map((message) => {
      return { ...message, text: message.content };
    }),
  });
  //   messages.push(req.body);
  // res.send({ messages: messages });
});

server.put("/messages/:id", async (req, res) => {
  const updateQuery = await db.query(
    `UPDATE messages SET content='${req.body.text}' WHERE id=${req.params.id}`
  );
  const messagesDB = await db.query(
    `SELECT id, content, timestamp, received FROM messages`
  );
  res.send({
    messages: messagesDB.rows.map((message) => {
      return { ...message, text: message.content };
    }),
  });
  // messages[req.params.index].text = req.body.text;
  // res.send({ messages });
});

server.delete("/messages/:id", async (req, res) => {
  const deleteQuery = await db.query(
    `DELETE FROM messages WHERE id=${req.params.id}`
  );
  const messagesDB = await db.query(
    `SELECT id, content, timestamp, received FROM messages`
  );
  res.send({
    messages: messagesDB.rows.map((message) => {
      return { ...message, text: message.content };
    }),
  });
  // messages.splice(req.params.index, 1);
  // res.send({ messages });
});

server.get("/", (req, res) => {
  res.send("Hello World");
});

server.listen(3001, () => {
  console.log(`Backend Server listening on port 3001`);
});
