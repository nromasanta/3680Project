import User from "../models/userModel.js";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// how to query documents :
// https://mongoosejs.com/docs/queries.html

const createUser = async (req, res) => {
  try {
    console.log("Received: ", req.body);
    const { email, username, password } = req.body;
    console.log("received email -> ", email);
    console.log("received username -> ", username);
    console.log("received pwd -> ", password);

    const newUser = new User({
      email: email,
      username: username,
      password: password,
    });

    const existingEmails = await User.find({ email: email });
    const existingUsername = await User.find({ username: username });

    if (existingEmails.length > 0 || existingUsername.length > 0) {
      console.log("User with this email/username already exists");
      res.status(201).send();
    }
    await newUser.save();
    return res.status(200).send();
  } catch (err) {
    return res.status(400).send();
  }
};

const loginUser = async (req, res) => {
  const jwtSecretKey = process.env.JWT_SECRET;
  console.log("req.body ->", req.body);
  const { username, password } = req.body;

  const myUser = await User.findOne({ username: username });
  console.log("MyUser-> ", myUser);
  if (!myUser) {
    return res.status(201).send();
  }
  console.log("received -> ", req.body);
  console.log("got from db ->", myUser);
  const id = myUser._id.toString();
  console.log("ID -> ", id);

  bcrypt.compare(password, myUser.password, function (err, result) {
    if (!result) {
      console.log("passwords do not match!");
      return res.status(201).send();
    } else if (result) {
      console.log("passwords match!");
      let data = { signInTime: Date.now(), id };
      const token = jwt.sign(data, jwtSecretKey);
      return res.status(200).json({ auth: true, token: token, userId: myUser._id }).send();
    } else if (err) {
      console.log("Unknown error logging in ->", err);
      return res.status(400).send();
    }
  });

};

// get all users - returns array of JSON objects
const getAllUsers = async (req, res) => {
  const users = await User.find({});
  console.log(users);

  res.status(200).json(users);
};

// get a single user
const getSingleUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such user" });
  }
  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.status(200).json(user);
};

// get a single user by username
const checkExistingUserInfo = async (req, res) => {
  const { valueToCheck, type } = req.body;
  console.log("Received value ==>", valueToCheck, " Type ==>", type);

  if (type === "username") {
    const user = await User.find({ username: valueToCheck });
    if (user.length > 0) {
      console.log("Found user -> ", user);
      return res.status(201).json({ error: `Username ${valueToCheck} already exists` });
    }
  } else if (type === "email") {
      const user = await User.find({email: valueToCheck});
      if (user.length > 0) {
        console.log("Found user -> ", user);
        return res.status(201).json({error: `Email ${valueToCheck} already in use`});
      }
  }

  res.status(200).json({message: `No exiting ${type} found`});
};

const updateUser = async (req, res) => {

  const { newUsername, newPassword, newEmail, userId } = req.body;
  console.log("newUsername->", newUsername);
  console.log("newPassword->", newPassword);
  console.log("newEmail->", newEmail);
  console.log("userId->", userId);
  const user = await User.findById(userId);
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(404).json({ error: "No such user " });
  }
  console.log("Found user -->", user);
  
  if (newUsername != null) {
    user.username = newUsername;
  }
  if (newEmail != null) {
    user.email = newEmail;
  }

  if (newPassword != null) {
    user.password = newPassword;
  }
  await user.save()

  return res.status(200).json({ message: "User updated" });
}

const checkPassword = async (req, res) => {
  console.log("req.body ->", req.body);
  console.log("req.params ->", req.params);
  const { password } = req.body;
  const { id } = req.params;

  const myUser = await User.findById(id);
  console.log("MyUser-> ", myUser);
  if (!myUser) {
    return res.status(201).send();
  }
  // console.log("received -> ", req.body);
  // console.log("got from db ->", myUser);
  // console.log("ID -> ", id);

  bcrypt.compare(password, myUser.password, function (err, result) {
    console.log("Result -----> ", result);
    if (!result) {
      console.log("passwords do not match!");
      return res.status(201).send();
    } else if (result) {
      console.log("passwords match!");
      return res.status(200).send();
    } else if (err) {
      console.log("Unknown error logging in ->", err);
      return res.status(400).send();
    }
  });
};


export { getAllUsers, getSingleUser, createUser, loginUser, updateUser, checkExistingUserInfo, checkPassword };
