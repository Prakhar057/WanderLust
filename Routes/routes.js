const express = require("express");
const Router = express.Router({mergeParams:true});
const ExpressError = require("../utils/ExpressError");
const { listingSchema, reviewSchema } = require("../schema");
const passport = require("passport")
const {isLoggedIn, saveRedirectUrl} = require("../middleware")

const {
  getListings,
  deleteListing,
  editListingInfo,
  EditListing,
  getListingInfo,
  addNewListing,
  getNewListing,
  addReview,
  deleteReview,
  signUpForm,
  registerUser,
  login,
  checkLogin,
  logOutUser,
} = require("../Controllers/controllers");

function validateListing(req, res, next) {
  const { error } = listingSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(", ");
    return next(new ExpressError(400, msg));
  } else {
    next();
  }
}

function validateReview(req, res, next) {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(", ");
    return next(new ExpressError(400, msg));
  } else {
    next();
  }
}

Router.get("/", (req, res) => res.redirect("/listings"));
Router.get("/listings", getListings);
Router.get("/listings/new",isLoggedIn, getNewListing);
Router.get("/listings/:id", getListingInfo);
Router.get("/listings/edit/:id",isLoggedIn, editListingInfo);
Router.get("/signup",signUpForm)
Router.get("/login",login)
Router.get("/logout",logOutUser)

Router.post("/listings/new", validateListing,isLoggedIn, addNewListing);
Router.post("/listings/:id/reviews", validateReview,isLoggedIn, addReview);
Router.post("/register",registerUser)
Router.post(
  "/login",
saveRedirectUrl,
  passport.authenticate("local",{failureRedirect:"/login",failureFlash : true}),
  checkLogin)
Router.put("/listings/edit/:id",isLoggedIn, validateListing, EditListing);

Router.delete("/listings/delete/:id",isLoggedIn, deleteListing);
Router.delete("/listings/:id/reviews/:reviewId", deleteReview);

module.exports = Router;
