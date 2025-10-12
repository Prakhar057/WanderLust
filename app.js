const express = require("express");
const {Listing} = require("./Models/listings");
const Router  = require("./Routes/routes")
const connectToDb = require ("./connection")
const path  = require("path")
connectToDb();
const app = express();

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.set("view engine", "ejs")
app.set("Views",path.join(__dirname,"Views"))
app.set(express.static("/Public"))


app.use("/",Router)



app.listen(8000, (req, res) => {
  console.log("Server Listening at 8000");
});
