//Import express library
const express = require("express");
//Import CORS
const cors = require("cors");
//Import db connection
const { connectDB, getDB } = require("./db");

//Create express app
const app = express();

//Enable CORS
app.use(cors());

//Enable JSON parsing for request bodies
app.use(express.json());

//Root route
app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

/*
//Test route for adding post to MongoDB and verify this works
app.get("/testdb", async (req,res) => {
    const db = getDB();
    //Test document
    const result = await db.collection("test").insertOne({
        message: "MongoDB works",
        createdAt: new Date()
    });
    res.json(result);
})
*/

//Start server on port 3000 after MongoDB connects
async function startServer() {
  //Connect database
  await connectDB();
  //Start express server
  app.listen(3000, () => {
    console.log("Server running port 3000");
  });
}

startServer();
