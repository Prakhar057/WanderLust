const express = require("express");
const { Listing } = require("./Models/listings");
const Router = require("./Routes/routes");
const connectToDb = require("./connection");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError")
const wrapAsync = require('./utils/wrapAsync')
connectToDb();

const app = express();


app.engine("ejs", ejsMate);
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");
app.set("Views", path.join(__dirname, "Views"));
app.use(express.static("./Public"));



app.use("/", Router);
app.use((req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});
app.use((err,req,res,next)=>{
  let {status = 500,message="Some error occured"} = err
//  res.status(status).send(message);
res.status(status).render("Error.ejs", { message });
})

app.listen(3000, (req, res) => {
  console.log("Server Listening at 3000");
});
