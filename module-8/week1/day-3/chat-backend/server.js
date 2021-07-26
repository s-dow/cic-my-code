// setup express server
const express = require("express");
const server = express();
// setup cors - prevents cors errors
const cors = require("cors");
server.use(cors());
// setup body parser
const bodyParser = require("body-parser");
server.use(bodyParser.json());
// setup postgres
const { Client } = require("pg");
// what db to connect to - can add password
const db = new Client({ user: "hackupstate", database: "messages1" });
db.connect();

// test
// db.query("SELECT NOW()", (err, res) => {
//   console.log(res);
// });

// GET request - messages from db
// run async so we can run js code at same time
server.get(`/messages`, async (req, res) => {
  // local variable stores data until use during res.send
  // keep scoped in the endpoint, bc issues can arise when reqs are happening at
  // the same time or with multiple users
  const messagesDB = await db.query(
    `SELECT id, content, timeStamp, received FROM messages ORDER BY id`
    // ORDER BY keeps the messages in order (by id) - fixes PUT request issue where edited messages
    // were on the bottom
  );
  res.send({
    messages: messagesDB.rows.map((message) => {
      return { ...message, text: message.content };
      // ... spread operater takes whatever is in message and put it in here
      // text key to match front end props.text
    }),
  });
});

// POST request - send a message!
server.post(`/messages`, async (req, res) => {
  //dont use results of insertQuery
  //front end is sending req.body.text NOT .content
  const insertQuery = await db.query(
    `INSERT INTO messages (content, timestamp, received) VALUES ('${req.body.text}', NOW(), false)`
  );
  const messagesDB = await db.query(
    `SELECT id, content, timeStamp, received FROM messages ORDER BY id`
  );
  // send back updated messages
  res.send({
    messages: messagesDB.rows.map((message) => {
      return { ...message, text: message.content };
    }),
  });
});

// PUT request - edit a message
server.put("/messages/:id", async (req, res) => {
  const updateQuery = await db.query(
    //changed index to props.message.id in front end
    `UPDATE messages SET content='${req.body.text}' WHERE id=${req.params.id}`
  );
  const messagesDB = await db.query(
    `SELECT id, content, timestamp, received FROM messages ORDER BY id`
  );
  res.send({
    messages: messagesDB.rows.map((message) => {
      return { ...message, text: message.content };
    }),
  });
});

//DELETE request - delete a message
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
});

// first test - root level endpoint - route param
server.get("/", (req, res) => {
  res.send("Hello World");
});

// server listening for changes on port 3001
server.listen(3001, () => {
  console.log(`Server listening on port 3001`);
});
