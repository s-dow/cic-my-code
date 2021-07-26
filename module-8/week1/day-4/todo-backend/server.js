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
const db = new Client({ user: "hackupstate", database: "todo" });
db.connect();

// test include error handling
//
// db.query("SELECT NOW()", (err, res) => {
// 	if (err) {
// 		console.error(err);
// 	} else {
// 		console.log(res);
// 	}
// });

// first test - root level endpoint - route param
server.get(`/`, (req, res) => {
  res.send("Hello!!!");
});

//async function that selects all from table and returns all rows
// SELECT * FROM todos
const getTodos = async () => {
  const todos = await db.query(`SELECT * FROM todos`);
  return todos.rows;
};

//GET req - get todos
server.get(`/todos`, async (req, res) => {
  res.send({ todos: await getTodos() });
});

//POST req - add a new todo
server.post(`/todos`, async (req, res) => {
  await db.query(`INSERT INTO todos
    (done, name, timestamp) VALUES (false, '${req.body.name}', NOW())`);
  res.send({ todos: await getTodos() });
});

//PUT req - update a todo
server.put(`/todos`, async (req, res) => {
  await db.query(
    `UPDATE todos SET name='${req.body.name}' WHERE id=${req.body.id}`
  );
  res.send({ todos: await getTodos() });
});

// DELETE req - delete a todo
server.delete(`/todos`, async (req, res) => {
  await db.query(`DELETE FROM todos WHERE id=${req.body.id}`);
  res.send({ todos: await getTodos() });
});

// server listening for changes on on port 3001
server.listen(3001, () => {
  console.log(`Server is running on 3001`);
});
