const joi = require("joi");

const listingSchema = joi.object({
  title: joi.string().required().strict(),
  location: joi.string().required().strict(),
  country: joi.string().required().strict(),
  price: joi.number().required().min(0),
  image: joi.string().allow("", null).strict(),
});

const reviewSchema = joi.object({
  review: joi.object({
    comment: joi.string().required().strict(),
    rating: joi.number().required().min(1),
  }).required(),
});

module.exports = { listingSchema, reviewSchema };
