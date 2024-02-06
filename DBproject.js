const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
app.use(express.urlencoded({ extended: false }));
mongoose.connect(
  "mongodb+srv://bikashi:bikash123@cluster0.4f5lmam.mongodb.net/user-Details"
);

const schema = mongoose.model("users", {
  // Designed schema
  name: String,
  email: String,
  password: String,
});

app.post("/signup", async (req, res) => {
  // create user Route
  const userName = req.headers.user;
  const email = req.headers.email;
  const password = req.headers.password;

  const userExists = await schema.findOne({
    // checking user is existed ?
    name: userName,
  });

  if (userExists) {
    res.send("user already exists"); // if exists return response
    return;
  }
  const newUser = new schema({
    name: userName,
    email: email,
    password: password,
  });
  newUser.save();
  res.json(`User Created Successfully ${newUser._id}`);
});

app.post("/update", async (req, res) => {
  // update user Route
  const id = req.headers.id;
  const userName = req.headers.username;
  const password = req.headers.password;
  const email = req.headers.email;

  const finduser = await schema.findOne({
    _id: id,
  });

  console.log(finduser);
  if (!finduser) {
    res.json("Invalid ID");
    return;
  }

  const updateUser = await schema.findByIdAndUpdate(id, {
    name: userName,
    password: password,
    email: email,
  });

  res.json("User Updated Succesfully");
});

app.post("/delete", async (req, res) => {
  // delete user Route
  const id = req.headers.id;
  const removeUser = await schema.deleteOne({
    _id: id,
  });
  res.json("deleted");
});

app.get("/userDetail", async (req, res) => {  // Find User Detail
  const allUser = await schema.find({
    name:""
  })
  console.log(allUser);
  res.json(allUser)
});

app.listen(port);
