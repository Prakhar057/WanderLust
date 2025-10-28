const express = require("express");
const {
  getListings,
  deleteListing,
  editListingInfo,
  EditListing,
  getListingInfo,
  addNewListing,
  getNewListing,
  addReview,
} = require("../Controllers/controllers");
const ExpressError = require("../utils/ExpressError")
const Router = express.Router();
const listingSchema = require("../schema");

function validateListing(req, res, next) {
  const { error } = listingSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(", ");
    return next(new ExpressError(400, msg));
  } else {
    next();
  }
}


Router.get("/", (req, res) => {
  res.redirect("/listings");
});
Router.get("/listings", getListings);
Router.get("/listings/new", getNewListing);
Router.get("/listings/:id", getListingInfo);
Router.get("/listings/edit/:id", editListingInfo);
Router.delete("/listings/delete/:id", deleteListing);

Router.post("/listings/new", validateListing, addNewListing);
Router.put("/listings/edit/:id", validateListing, EditListing);
Router.post("/listings/:id/reviews",addReview)

module.exports = Router;
