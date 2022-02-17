var db = require("../models");
const jwt = require("jsonwebtoken");
const Users = db.User;
const JWTSECRET = "food-application";
const bcrypt = require("bcryptjs");

let registerUser = async (req, res) => {
  const { body } = req;
  try {
    const userExists = await Users.findOne({
      where: { email: body.email },
    });
    if (userExists) {
      res.status(200).json({ message: "User already exists" });
      return;
    }
    let userData = await Users.create({
      fullname: body.fullname,
      email: body.email,
      password: bcrypt.hashSync(body.password, 8)
    });
    const token = jwt.sign(
      { fullname: body.fullname, email: body.email },
      JWTSECRET,
      {
        expiresIn: 86400,
      }
    );
    const data = { ...userData.dataValues, token };
    delete data.password;
    res.status(200).json({ data, message: "User register successfully" });
  } catch (error) {
    res.status(401).json({ error });
  }
};

const userSign = async (req, res) => {
  const { body } = req;
  try {
    const userExists = await Users.findOne({ email: body.email });
    if (!userExists) {
      res.status(404).send({ message: "User Not found." });
      return;
    }
    const isPasswordValid = bcrypt.compareSync(
      body.password,
      userExists.dataValues.password
    );
    if (!isPasswordValid) {
      res.status(401).send({
        accessToken: null,
        message: "Invalid Password!",
      });
      return;
    }
    var token = jwt.sign(
      { fullname: body.fullname, email: body.email },
      JWTSECRET,
      {
        expiresIn: 86400,
      }
    );
    const data = { ...userExists.dataValues, token };
    delete data.password;
    res.status(200).json({ message: "User sign in successfully",data });
  } catch (error) {
    res.status(401).json({ error });
  }
};

let updateUser = async (req, res) => {
  let updatedUser = await Users.update(
    { fullname: "Shan Malik" },
    { where: { id: 2 } }
  );

  res.status(200).json({ data: updatedUser });
};

let deleteUser = async (req, res) => {
  let data = await Users.destroy({ where: { id: 3 } });

  res.status(200).json({ data });
};

let learning = async (req, res) => {
  // let data = await Users.findAll({}); // Select all users
  console.log("asd", JWTSECRET);
  res.status(200).json({ data: "Hellow" });
};

module.exports = {
  registerUser,
  userSign,
  updateUser,
  deleteUser,
  learning,
};
