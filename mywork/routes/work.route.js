const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const db = require("../config/database");

const Work = require("../models/Work.model");

router.post("/login", (req, res) => {
  const user = {
    id: req.body.id,
    username: req.body.username,
    password: req.body.password,
  };

  jwt.sign({ user }, "secretkey", (err, token) => {
    res.json({
      token,
    });
  });
});
router.get("/", (req, res) =>
  Work.findAll()
    .then((works) => {
      console.log(works);
      res.sendStatus(200);
    })

    .catch((err) => console.log("err" + err))
);

// router.post('/sss' , async(req,res) =>
// {
//     const result = await Work.Create(
//         {

//         id: req.body.id,
//         day: req.body.day,
//         event: req.body.event

//         }
//     )}
// )

router.post("/", verifyToken, (req, res) => {
  /// restricting the api with jwt verification

  jwt.verify(req.token, "secretkey", (err, authData) => {
    // hardcoded the "secretkey" which can be vulnerable
    if (err) {
      res.sendStatus(403);
    } else {
      const message = Work.create({
        id: req.body.id,
        day: req.body.day,
        event: req.body.event,
      });
      return res.send(message);
    }
  });
});

router.delete("/:id", async (req, res) => {
  const result = await Work.destroy({
    // deleting the table with the id

    where: { id: req.params.id },
  });

  return res.sendStatus(200);
});

router.put("/:id", async (req, res) => {
  const result = await Work.update(
    {
      // sample update request

      day: req.body.day,
      event: req.body.event,
    },
    {
      where: { id: req.params.id },
    }
  );

  return res.sendStatus(200);
  console.log(result);
});

// implementing the verifying token function

function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" "); // splitting the array which has the info
    const beaerToken = bearer[1]; // as the token likes in the index 1

    req.token = beaerToken;

    next(); // next function to terminate
  } else {
    res.sendStatus(403);
  }
}

module.exports = router;
