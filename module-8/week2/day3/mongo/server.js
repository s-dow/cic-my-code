const server = require("express")();
server.use(require("body-parser").json());
server.use(require("cors")());
const MongoClient = require("mongodb").MongoClient;
const url = `mongodb://localhost:27017`;
const dbName = "messages3";
const client = new MongoClient(url);
client.connect((err) => {
  if (err) {
    console.error(err);
  } else {
    console.log("Connected successfully to the DB server.");
  }
  const db = client.db(dbName);
  const messagesCollection = db.collection("messages");
  server.get(`/messages`, (req, res) => {
    messagesCollection.find({}).toArray((err, docs) => {
      res.send({ messages: docs });
    });
  });

  server.post(`/messages`, (req, res) => {
    messagesCollection.insertMany([req.body], (err, result) => {
      if (err) {
        console.error(err);
        res.send({ error: "shit went went wrong" });
      } else {
        console.log(result);
        res.send({ result: result.ops[0] });
      }
    });
  });
});
server.listen(3003, () => {
  console.log(`API server running on 3003`);
});

process.exit("SIGTERM", () => {
  console.log(`Server terminated.`);
  client.close();
});
