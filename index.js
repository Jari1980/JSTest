//Import express library
const express = require("express");
//Import CORS
const cors = require("cors");
//Import db connection
const { connectDB, getDB } = require("./db");
//Import users route
const userRoutes = require("./routes/users");
//Import posts route
const postRoutes = require("./routes/posts");

//Create express app
const app = express();

//Enable CORS
app.use(cors());

//Enable JSON parsing for request bodies
app.use(express.json());

//Use userRoutes for all requests starting with /users
app.use("/users", userRoutes);

//Use postRoutes for all requests starting with /posts
app.use("/posts", postRoutes);

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
