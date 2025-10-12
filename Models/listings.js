const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  descriptions: {
    type: String,
  },
  image: {
    type: String,
    default:
      "https://unsplash.com/photos/brown-wooden-house-surrounded-by-trees-at-daytime-xvY3zEBk0Ic",
    set: (v) =>
      v === ""
        ? "https://unsplash.com/photos/brown-wooden-house-surrounded-by-trees-at-daytime-xvY3zEBk0Ic"
        : v,
  },
  price: {
    type: Number,
  },
  location: {
    type: String,
  },
  country: {
    type: String,
  },
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing ;
