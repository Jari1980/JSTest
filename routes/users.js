//Import express library
const express = require("express");
//Import MongoDB ObjectId helper
//Needed to convert string IDs to mongoDB format
const {ObjectId} = require("mongodb");
//Import dtabase getter
const {getDB} = require("../db");

//Create new Express router
const router = express.Router();

//Create user
//POST /users
router.post("/", async (req, res) => {
    //Get database
    const db = getDB();
    //Create user object from request body
    const user = {
        name: req.body.name,
        email: req.body.email
    };
    //Insert into users collection
    const result = await db.collection("users").insertOne(user);
    //Return result
    res.json(result)
})

//Get all user
//Get /users
router.get("/", async (req, res) => {
    //Get databse
    const db = getDB();
    //find() returns a cursor
    //toArray() converts it to array
    const users = await db.collection("users")
    .find()
    .toArray();
    //Return result
    res.json(users);
})

//Get single user
//GET /users/:id
router.get("/:id", async (req, res) => {
    //Get databse
    const db = getDB();
    //Find a single user by ID
    const user = await db.collection("users").findOne({
        _id: new ObjectId(req.params.id)
    });
    //Return result
    res.json(user);
})

//Update user
//PUT /users/:id
router.put("/:id", async (req, res) => {
    //Get databse
    const db = getDB();
    //Update user by id
    const result = await db.collection("users").updateOne(
        //Find user by id
        {_id: new ObjectId(req.params.id)},
        //Update fields
        {$set: req.body}
    );
    //Return result
    res.json(result);
})

//Delete user
//DELETE /users/:id
router.delete("/:id", async (req, res) => {
    //Get database
    const db = getDB();
    //Delete user by id
    const result = await db.collection("users").deleteOne({
        _id: new ObjectId(req.params.id)
    });
    //Return result
    res.json(result);
})

//Export router
module.exports = router;