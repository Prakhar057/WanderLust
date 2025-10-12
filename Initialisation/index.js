const mongoose  = require("mongoose")
const initdata = require("./data")
const {Listing} = require("../Models/listings");
const data = require("./data");
async function connectTODB() {
  await mongoose
    .connect("mongodb://127.0.0.1:27017/wanderlust")
    .then(() => console.log("SuccessFully Connected to Db"))
    .catch(err=>console.log(err));

}
connectTODB()

const initialise = async()=>{
    
  await  Listing.deleteMany({})
  await Listing.insertMany(initdata.data).then(()=>{
    console.log("data was initialised")
  })
}

initialise()