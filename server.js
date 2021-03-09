const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require('./db')
const app = express();
const db = require('./models')
const Role = db.Role;
var corsOptions = {
  origin: "http://localhost:8081"
};
const auth = require('./routes/auth.routes');
const user = require('./routes/user.routes');

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/auth',auth);
app.use('//api/test',user);
function initial() {
  Role.create({
    id: 1,
    name: "user"
  });
 
  Role.create({
    id: 2,
    name: "moderator"
  });
 
  Role.create({
    id: 3,
    name: "admin"
  });
}
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome User." });
});
db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync Db');
  initial();
});
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});