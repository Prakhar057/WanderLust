const Listings = require("../Models/listings");
const wrapAsync = require("../utils/wrapAsync");

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
  wrapAsync(async (req, res) => {
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
  });
}

async function editListingInfo(req, res) {
  const id = req.params.id;
  const listing = await Listings.findById(id);
  res.render("EditListing", { listing });
}
async function EditListing(req, res) {
  const id = req.params.id;
  const body = req.body;
  await Listings.findByIdAndUpdate(id, {
    title: body.title,
    price: body.price,
    location: body.location,
    country: body.country,
  });
  res.redirect(`/listings`);
}

async function deleteListing(req, res) {
  const id = req.params.id;
  await Listings.findByIdAndDelete(id);
  res.redirect("/listings");
}

module.exports = {
  getListings,
  getListingInfo,
  getNewListing,
  addNewListing,
  editListingInfo,
  EditListing,
  deleteListing,
};
