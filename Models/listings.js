const mongoose = require("mongoose");
const Review = require("../Models/reviews");
const listingSchema = new mongoose.Schema(
  {
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
        "https://images.unsplash.com/photo-1531183436556-51f742660c8d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2140",
      set: (v) =>
        v === ""
          ? "https://images.unsplash.com/photo-1531183436556-51f742660c8d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2140"
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
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
  },
  {
    strict: true,
    strictQuery: true,
  }
);

listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
