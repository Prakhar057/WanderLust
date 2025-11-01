const mongoose = require("mongoose");
let initdata = require("./data");
const Listing = require("../Models/listings");
const data = require("./data");
async function connectTODB() {
  await mongoose
    .connect("mongodb://127.0.0.1:27017/wanderlust")
    .then(() => console.log("SuccessFully Connected to Db"))
    .catch((err) => console.log(err));
}
connectTODB();

const initialise = async () => {
  await Listing.deleteMany({});
  initdata.data = initdata.data.map((obj) => ({
    ...obj,
    owner: "69048d04161d45d6771f040a",
  }));
  await Listing.insertMany(initdata.data).then(() => {
    console.log("data was initialised");
  });
};

initialise();
