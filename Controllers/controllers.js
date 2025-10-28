const Listings = require("../Models/listings");
const ExpressError = require("../utils/ExpressError");
const wrapAsync = require("../utils/wrapAsync");
const listingSchema = require("../schema");
const Review = require("../Models/reviews");

async function getListings(req, res) {
  const allListings = await Listings.find({});
  res.render("Home", { allListings });
}

async function getListingInfo(req, res) {
  const id = req.params.id;
  const listing = await Listings.findById(id);

  res.render("Listing", { listing });
}

async function getNewListing(req, res) {
  res.render("NewListing");
}

async function addNewListing(req, res, next) {
  try {
    const body = req.body;
    await Listings.insertOne({
      title: body.title,
      price: body.price,
      location: body.location,
      country: body.country,
      image: body.image,
    }).then(() => {
      console.log("New Listing Added");
    });
    res.redirect("/listings");
  } catch (err) {
    next(err);
  }
}

async function editListingInfo(req, res) {
  const id = req.params.id;
  const listing = await Listings.findById(id);
  res.render("EditListing", { listing });
}

async function EditListing(req, res) {
  try {
    if (!req.body.listing) {
      throw new ExpressError(400, "Bad Request, Send Valid Data");
    }
    const id = req.params.id;
    const body = req.body;
    await Listings.findByIdAndUpdate(id, {
      title: body.title,
      price: body.price,
      location: body.location,
      country: body.country,
    });
    res.redirect(`/listings`);
  } catch (err) {
    next(err);
  }
}

async function deleteListing(req, res) {
  const id = req.params.id;
  await Listings.findByIdAndDelete(id);
  res.redirect("/listings");
}

async function addReview(req, res) {
  const id = req.params.id;
  console.log(id);
  let listing = await Listings.findById(id);

  const {rating,comment} = req.body.review;
  const numericRating = Number(rating);

  const review = await Review.create({
    comment : comment,
    rating : numericRating
  })

  listing.reviews.push(review);
  await listing.save();

  res.redirect(`/listings/${id}`)
  
  
}

module.exports = {
  getListings,
  getListingInfo,
  getNewListing,
  addNewListing,
  editListingInfo,
  EditListing,
  deleteListing,
  addReview,
};
