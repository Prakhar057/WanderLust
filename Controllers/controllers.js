const Listings  = require("../Models/listings")
async function getListings(req,res){
    const allListings = await Listings.find({})
    res.render("Home",{allListings})
}

async function getListingInfo(req,res){
    const id = req.params.id;
    const listing  = await Listings.findById(id)
    console.log(listing)
    res.render("Listing", {listing})
}

async function getNewListing(req,res){
    res.render("NewListing")
}

async function addNewListing(req,res) {
    const body  = req.body;
    await Listings.insertOne({
        title: body.title,
        price: body.price,
        location: body.location,
        country: body.country
    }).then(()=>{
        console.log("New Listing Added")
    })
    res.redirect("/listings")
}




module.exports = {
  getListings,
  getListingInfo,
  getNewListing,
  addNewListing,
};