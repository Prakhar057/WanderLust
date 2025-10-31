const express = require("express");
const Router = require("./Routes/routes");
const connectToDb = require("./connection");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError");
const session = require("express-session");
const app = express();
const flash = require("connect-flash");
const passport = require("passport");
const localStrategy = require("passport-local");
const User = require("./Models/user");

//MiddleWares
app.set("view engine", "ejs");
app.set("Views", path.join(__dirname, "Views"));
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

app.use(flash());
//Passport Middlewares
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.engine("ejs", ejsMate);
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("./Public"));
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.notFound = req.flash("notFound");
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
