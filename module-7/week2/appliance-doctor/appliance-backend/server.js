const server = require("express")();
server.use(require("body-parser").json());
server.use(require("cors")());

const { db, Customer, User, Appliance } = require("./models/db.js");
const Op = require("sequelize").Op;

const isLoggedIn = async (req, res, next) => {
  if (!req.headers.email || !req.headers.password) {
    res.send({ error: "Not authorized." });
  } else {
    const user = await User.findOne({ where: { email: req.headers.email } });

    if (!user) {
      res.send({ error: "Email address is not in our system." });
    } else {
      if (user.password === req.headers.password) {
        res.locals.user = user;
        next();
      } else {
        res.send({ error: "Password does not match." });
      }
    }
  }
};

server.get("/", (req, res) => {
  res.send("hello world!!!!!!!!");
});

server.get("/customers/:pageNum", isLoggedIn, async (req, res) => {
  const page = parseInt(req.params.pageNum);
  if (page <= 0) {
    res.send({
      customers: await Customer.findAndCountAll({
        limit: 5,
      }),
    });
  } else {
    res.send({
      customers: await Customer.findAndCountAll({
        limit: 5,
        offset: 5 * (page - 1),
      }),
    });
  }
});

server.post(`/login`, async (req, res) => {
  const user = await User.findOne({ where: { email: req.headers.email } });

  if (!user) {
    res.send({ error: "Email address is not in our system." });
  } else {
    if (user.password === req.headers.password) {
      res.send({ success: true });
    } else {
      res.send({ error: "Password does not match." });
    }
  }
});

server.post("/customers", isLoggedIn, async (req, res) => {
  if (req.body.phoneNumber.length !== 10) {
    res.send({ error: "Phone number is too short." });
  } else if (req.body.zipCode.length !== 5) {
    res.send({ error: "Zip code is too short." });
  } else {
    await Customer.create(req.body);
    res.send({ customers: await Customer.findAll() });
  }
});

server.post("/customerSearch", async (req, res) => {
  res.send({
    customers: await Customer.findAll({
      where: {
        [Op.or]: {
          firstname: { [Op.iLike]: `%${req.body.searchQuery}%` },
          lastName: { [Op.iLike]: `%${req.body.searchQuery}%` },
          phoneNumber: { [Op.iLike]: `%${req.body.searchQuery}%` },
        },
      },
    }),
  });
});

server.get("/appliances", isLoggedIn, async (req, res) => {
  res.send({ appliances: await Appliance.findAll() });
});

server.post("/appliances", isLoggedIn, async (req, res) => {
  await Appliance.create(req.body);
  res.send({ appliances: await Appliance.findAll() });
});

server.post("/applianceSearch", async (req, res) => {
  res.send({
    appliances: await Appliance.findAll({
      where: {
        [Op.or]: {
          make: { [Op.iLike]: `%${req.body.searchQuery}%` },
          model: { [Op.iLike]: `%${req.body.searchQuery}%` },
        },
      },
    }),
  });
});

server.delete("/appliances/:id", async (req, res) => {
  await Appliance.destroy({ where: { applianceID: req.params.id } });
  res.send({ appliances: await Appliance.findAll() });
});

server.listen(3001, () => {
  console.log("SERVER IS LISTENING ON PORT 3001.");
});
