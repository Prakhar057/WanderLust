const express = require("express");
const Router = require("./Routes/routes");
const connectToDb = require("./connection");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError");
const session = require("express-session");
const cookieparser = require("cookie-parser");
const app = express();
const flash = require("connect-flash");

//MiddleWares
app.set("view engine", "ejs");
app.set("Views", path.join(__dirname, "Views"));
app.use(flash());
app.use(
  session({
    secret: "Supersecretpass",
    saveUninitialized: true,
    resave: false,
    cookie: {
      expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    },
  })
);
app.use(cookieparser());
app.engine("ejs", ejsMate);
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("./Public"));
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  next();
});
app.use("/", Router);
app.use("/", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});
app.use((err, req, res, next) => {
  let { status = 500, message = "Some error occured" } = err;
  //  res.status(status).send(message);
  res.status(status).render("Error.ejs", { message });
});

app.listen(3000, (req, res) => {
  console.log("Server Listening at 3000");
  connectToDb();
});
