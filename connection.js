const mongoose = require("mongoose")

async function connectToDb() {
  await mongoose
    .connect("mongodb://127.0.0.1:27017/wanderlust")
    .then(() => console.log("SuccessFully Connected to Db"))
    .catch((err) => console.log(err));
}

module.exports = connectToDb