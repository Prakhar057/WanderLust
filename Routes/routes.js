const express = require("express");
const Router = express.Router({mergeParams:true});
const ExpressError = require("../utils/ExpressError");
const { listingSchema, reviewSchema } = require("../schema");
const User = require("../Models/user")

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
Router.get("/listings/new", getNewListing);
Router.get("/listings/:id", getListingInfo);
Router.get("/listings/edit/:id", editListingInfo);
Router.get("/signup",signUpForm)

Router.post("/listings/new", validateListing, addNewListing);
Router.post("/listings/:id/reviews", validateReview, addReview);
Router.post("/register",registerUser)
Router.put("/listings/edit/:id", validateListing, EditListing);

Router.delete("/listings/delete/:id", deleteListing);
Router.delete("/listings/:id/reviews/:reviewId", deleteReview);

module.exports = Router;
