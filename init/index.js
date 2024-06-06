const mongoose=require("mongoose");
const Listing=require("../models/listing.js");
const initData=require("./data.js");
main()
    .then((res)=>{
        console.log("Connected to db");
    })
    .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderLust');

};
const initDb= async()=>{
    await Listing.deleteMany({});
    initData.data=initData.data.map((obj)=>({...obj,owner: "665712757daceced617673d7"}))
    await Listing.insertMany(initData.data);
    console.log("Data was intialized");
};
initDb();