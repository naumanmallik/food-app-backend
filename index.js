const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
require("./models/index");
const userController = require("./controllers/userController");
const jwtMiddleware = require("./middleware/authJWT");

const PORT = 3001;

app.get("/", userController.learning);

app.post("/user/register", userController.registerUser);
app.post("/user/signin", userController.userSign);

app.get("/updateUser", userController.updateUser);

app.get("/deleteuser", userController.deleteUser);

app.listen(PORT, () => {
  console.log("App is running");
});
