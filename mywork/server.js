const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path")

const app = express();

var corsOptions = {
  origin: "http://localhost:5000"
};

app.use(cors(corsOptions));


app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

// test route
app.get("/", (req, res) => {
  res.json( { message: "It's working" });
});
const db = require('./config/database');

db.sync
db.authenticate()
  .then(() => console.log('database connected'))
  .catch(err => console.log("error" +err))


db.sync();


app.use('/work', require('./routes/work.route'))


// set port, listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});