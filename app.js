const express = require("express");
const path = require("path");
const userModel = require("./models/user");
const postModel = require("./models/posts");

const app = express();

app.set("views", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/create", async (req, res) => {
  let newUser = await userModel.create({
    username: "John Doe",
    email: "john@gmail.com",
    age: 25,
  });

  res.send(newUser);
});
app.get("/post/create", async (req, res) => {
  let newPost = await postModel.create({
    postdata: "This is a new post",
    user: "6787ba0c8f77c868836c5416",
  });

  let user = await userModel.findOne({ _id: "6787ba0c8f77c868836c5416" });

  user.posts.push(newPost._id);
  await user.save();

  res.send({ post: newPost, user });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
