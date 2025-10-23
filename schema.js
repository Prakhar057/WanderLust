const joi = require("joi");

const listingSchema = joi.object({
   
        title : joi.string().required().strict(),
        location : joi.string().required().strict(),
        country : joi.string().required().strict(),
        price : joi.number().required().min(0),
        image : joi.string().allow("",null).strict(),
})

module.exports= listingSchema;