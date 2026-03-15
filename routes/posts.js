//Import express library
const express = require("express");
//Import MongoDB ObjectId helper
//Needed to convert string IDs to mongoDB format
const { ObjectId } = require("mongodb");
//Import dtabase getter
const { getDB } = require("../db");

//Create new Express router
const router = express.Router();

//Create Post
//Post belong to User, userId is stored
router.post("/", async (req, res) => {
  //Get database
  const db = getDB();
  //Add Post
  const post = {
    title: req.body.title,
    content: req.body.content,
    //Link User
    userId: new ObjectId(req.body.userId),
  };
  const result = await db.collection("posts").insertOne(post);
  //Return result
  res.json(result);
});

//Get all Posts
router.get("/", async (req, res) => {
  //Get databse
  const db = getDB();
  //Find all posts return array
  const posts = await db.collection("posts").find().toArray();
  //Return result
  res.json(posts);
});

//Get Posts for a User
router.get("/user/:userId", async (req, res) => {
  //Get database
  const db = getDB();
  const posts = await db
    .collection("posts")
    .find({
      userId: new ObjectId(req.params.userId),
    })
    .toArray();

  res.json(posts);
});


//Export router

module.exports = router;