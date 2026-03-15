//MongoDB client library
const { MongoClient } = require("mongodb");

//MongoDB connection string
//127.0.0.1 = local machine
const url = "mongodb://127.0.0.1:27017";

//MongoDB client
const client = new MongoClient(url);

//Database name
const dbName = "nodejstestdb";

//Variable for db connection
let db;

//Connect to MongoDB function
async function connectDB() {
  //Connect client to server
  await client.connect();
  console.log("Connected to MongoDB");
  //Set database
  db = client.db(dbName);
}

//Return the MongoDB
function getDB() {
  return db;
}

//Export functions
module.exports = {
  connectDB,
  getDB,
};
