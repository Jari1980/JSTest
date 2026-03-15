//Import express library
const express = require("express");
//Import CORS
const cors = require("cors");

//Create express app
const app = express();

//Enable CORS
app.use(cors());

//Enable JSON parsing for request bodies
app.use(express.json());

//Root route
app.get("/", (req, res) => {
    res.json({message: "Hello World"});
});

//Start server on port 3000
app.listen(3000, () => {
    console.log("Server running port 3000");
});