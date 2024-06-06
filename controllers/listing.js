const Listing=require("../models/listing.js");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken=process.env.MAP_KEY;
const geocodingClient = mbxGeocoding({ accessToken:mapToken });

module.exports.index=async (req,res)=>{
    let allListings= await Listing.find({});
    res.render("listings/alllistings.ejs",{allListings})
};

module.exports.renderNewForm=(req,res)=>{
    res.render("listings/newlist.ejs");
};

module.exports.showListing=async (req,res)=>{
    let {id}=req.params;
    let list= await Listing.findById(id).populate({path:"review",populate:{path:"author"}}).populate("owner");
    if(!list){
      req.flash("error","No Such Listing available");
      res.redirect("/listings");
    }
    res.render("listings/show.ejs",{list});
};

module.exports.createListing=async (req,res)=>{
    let response=await geocodingClient.forwardGeocode({
        query: req.body.listing.location,
        limit: 2
      })
        .send()
    let url=req.file.path;
    let filename=req.file.filename;
    let newList=new Listing(req.body.listing);
    newList.owner=req.user._id;
    newList.image={url,filename};
    newList.geometry=response.body.features[0].geometry;
    let newListing=await newList.save();
    req.flash("success","New Listing Added!");
    res.redirect("/listings");
  
};

module.exports.renderEditForm=async (req,res)=>{
    let {id}=req.params;
    let list= await Listing.findById(id);
    if(!list){
      req.flash("error","No Such Listing available");
      res.redirect("/listings");
    }
   let originalImg=list.image.url;
   originalImg=originalImg.replace("/upload","/upload/h_300,w_250,e_blur:300");
    res.render("listings/edit.ejs",{list,originalImg});
};

module.exports.updateListing=async (req,res)=>{
    let {id}=req.params;
    let list=await Listing.findByIdAndUpdate(id,{...req.body.listing});
    if(typeof req.file !=="undefined"){
        let url=req.file.path;
        let filename=req.file.filename;
        list.image={url,filename};
        await list.save();
    }
    req.flash("success"," Listing Updated!");
    res.redirect(`/listings/${id}`);
};

module.exports.destroyListing=async (req,res)=>{
    let {id}=req.params;
    let deletedList= await Listing.findByIdAndDelete(id,{runValidators:true,new:true});
    req.flash("success","List Deleted!");
    res.redirect("/listings");
    console.log(deletedList);
};