const mongoose = require("mongoose");
const express = require("express");
const app = express();
const port = 3000;
app.use(express.urlencoded({ extended: false }))
mongoose.connect(
  "mongodb+srv://bikashi:bikash123@cluster0.4f5lmam.mongodb.net/user-Details"
);   // connected DB 

const schema = mongoose.model("users", {  // Designed Schema(Table)
  user: String,
  password: String,
  email: String,
});

app.post("/createUser",async (req, res) => { // function should be async
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  const userExists =  await schema.findOne({  // checking user is already existed or not
    user: username,
  });
  console.log(userExists);
  if (userExists) {
    res.send("user already exists"); // if exists return response
    return
  }
  const newUser = new schema({  // adding user to DB Table
    user: username,
    password: password,
    email: email,
  });
  newUser.save();  // Saved to DB
  res.send("user saved"); 
});

app.listen(port, () => console.log("running"));
