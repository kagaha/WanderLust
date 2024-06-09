const express=require("express");
const router=express.Router();
const Listing=require("../models/listing.js");

router.get("/mountain",async(req,res)=>{
    let filteredListings=await Listing.find({category:"Mountains"});
    let icon="Mountain";
//     let filteredListings = await Listing.find({
//     filters: {
//       $elemMatch: {
//         $eq: "mountains",
//       },
//     },
//   });
  // console.log(`Hello:${filteredListings}`);
    res.render("icons/icon.ejs",{filteredListings,icon});
  
});

router.get("/beach",async(req,res)=>{
  let filteredListings=await Listing.find({category:"Beach"});
  let icon="Beaches";
  res.render("icons/icon.ejs",{filteredListings,icon});
});

router.get("/trending",async(req,res)=>{
  let filteredListings=await Listing.find({category:"Trending"});
  let icon="Trending";
  res.render("icons/icon.ejs",{filteredListings,icon});
});
router.get("/boats",async(req,res)=>{
  let filteredListings=await Listing.find({category:"Boats"});
  let icon="Boats";
  res.render("icons/icon.ejs",{filteredListings,icon});

});
router.get("/rooms",async(req,res)=>{
  let filteredListings=await Listing.find({category:"Rooms"});
  let icon="Rooms";
  res.render("icons/icon.ejs",{filteredListings,icon});
});
router.get("/camping",async(req,res)=>{
  let filteredListings=await Listing.find({category:"Camping"});
  let icon="Camping";
  res.render("icons/icon.ejs",{filteredListings,icon});
});
router.get("/towers",async(req,res)=>{
  let filteredListings=await Listing.find({category:"Towers"});
  let icon="Towers";
  res.render("icons/icon.ejs",{filteredListings,icon});
});
router.get("/pools",async(req,res)=>{
  let filteredListings=await Listing.find({category:"Pools"});
  let icon="Pools";
  res.render("icons/icon.ejs",{filteredListings,icon});
});
router.get("/castle",async(req,res)=>{
  let filteredListings=await Listing.find({category:"castle"});
  let icon="Castle";
  res.render("icons/icon.ejs",{filteredListings,icon});
});
router.get("/farms",async(req,res)=>{
  let filteredListings=await Listing.find({category:"Farms"});
  let icon="Farms";
  res.render("icons/icon.ejs",{filteredListings,icon});
});
router.get("/mountain-city",async(req,res)=>{
  let filteredListings=await Listing.find({category:"Mountain-city"});
  let icon="Mountain-city";
  res.render("icons/icon.ejs",{filteredListings,icon});
});

module.exports=router;