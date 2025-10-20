const express = require("express");
const {
  getListings,
  deleteListing,
  editListingInfo,
  EditListing,
  getListingInfo,
  addNewListing,
  getNewListing,
} = require("../Controllers/controllers");
const Router = express.Router();

Router.get("/", (req, res) => {
  res.redirect("/listings");
});
Router.get("/listings", getListings);
Router.get("/listings/new", getNewListing);
Router.get("/listings/:id", getListingInfo);
Router.get("/listings/edit/:id", editListingInfo);
Router.delete("/listings/delete/:id", deleteListing);

Router.post("/listings/new", addNewListing);
Router.put("/listings/edit/:id", EditListing);

module.exports = Router;
