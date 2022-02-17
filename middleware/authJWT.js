const jwt = require("jsonwebtoken");

let verifyToken = async (req, res, next) => {
  if (!req.header("authorization")) {
    res.status(401).json({ message: "No auth token" });
    return;
  }
  var token = req.header("authorization").trim().split(" ").pop();
  next()
};

module.exports = { verifyToken };
