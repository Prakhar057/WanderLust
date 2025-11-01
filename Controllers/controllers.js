const Listings = require("../Models/listings");
const ExpressError = require("../utils/ExpressError");
const Review = require("../Models/reviews");
const User = require("../Models/user");

async function getListings(req, res) {
  const allListings = await Listings.find({});
  res.render("Home", { allListings });
}

async function getListingInfo(req, res) {
  const id = req.params.id;
  const listing = await Listings.findById(id).populate("reviews").populate("owner");
  if (!listing) {
    req.flash("error", "Listing Not Found");
    res.redirect("/listings");
  } else res.render("Listing", { listing });
}

async function getNewListing(req, res) {
  if (!req.isAuthenticated()) {
    req.flash("error", "You must be logged in to create listings");
    res.redirect("/login");
  } else res.render("NewListing");
}

async function addNewListing(req, res, next) {
  req.flash("success", "Listing created Successfully");
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
  if (!listing) {
    req.flash("error", "Listing does not exists");
    res.redirect("/listings");
  } else res.render("EditListing", { listing });
}

async function EditListing(req, res, next) {
  try {
    if (!req.body) {
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
    req.flash("success", "Listing Edited Successfully");
    res.redirect(`/listings`);
  } catch (err) {
    next(err);
  }
}

async function deleteListing(req, res) {
  const id = req.params.id;
  await Listings.findByIdAndDelete(id);
  req.flash("success", "Listing Deleted Successfully");
  res.redirect("/listings");
}

async function addReview(req, res) {
  req.flash("success", "New review Added");
  const id = req.params.id;
  console.log(id);
  let listing = await Listings.findById(id);

  const { rating, comment } = req.body.review;
  const numericRating = Number(rating);

  const review = await Review.create({
    comment: comment,
    rating: numericRating,
  });

  listing.reviews.push(review);
  await listing.save();

  res.redirect(`/listings/${id}`);
}

async function deleteReview(req, res) {
  const listingId = req.params.id;
  const reviewId = req.params.reviewId;

  await Listings.findByIdAndUpdate(listingId, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  res.redirect(`/listings/${listingId}`);
}
async function signUpForm(req, res) {
  res.render("Signup");
}
async function registerUser(req, res) {
  try {
    const { username, email, password } = req.body;
    const user = new User({
      email,
      username,
    });
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      } else {
        req.flash("success", "Welcome to Wanderlust");
        res.redirect(req.session.redirectUrl);
      }
    });
  } catch (err) {
    req.flash("error", err.message);
    res.redirect("/signup");
  }
}

async function login(req, res) {
  res.render("login");
}

async function checkLogin(req, res) {
  req.flash("success", "Welcome back to WanderLust");
  if (!res.locals.redirectUrl) res.redirect("/listings");
  else res.redirect(res.locals.redirectUrl);
}

async function logOutUser(req, res) {
  req.logout((err) => {
    if (err) {
      return next(err);
    } else {
      req.flash("success", "Logged Out Successfully");
      res.redirect("/listings");
    }
  });
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
  deleteReview,
  signUpForm,
  registerUser,
  login,
  checkLogin,
  logOutUser,
};
