const express = require("express")
const { getListings, getListingInfo,addNewListing, getNewListing} = require("../Controllers/controllers");
const Router = express.Router()



Router.get("/listings",getListings)
Router.get("/listings/new", getNewListing);
Router.get("/listings/:id",getListingInfo)

Router.post("/listings/new",addNewListing);


module.exports = Router