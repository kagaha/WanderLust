const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const Listing=require("../models/listing.js");
const {isLoggedIn,isOwner,validateSchema}=require("../middleware.js");
const controller=require("../controllers/listing.js");
const multer  = require('multer')
const {storage}=require("../cloudConfig.js");
const upload = multer({storage})

//Index Route
router.get("/",wrapAsync(controller.index));
  //Create route
  router.get("/new",isLoggedIn,controller.renderNewForm);
  //Show route
  router.get("/:id",wrapAsync(controller.showListing));
  router.post("/",isLoggedIn,upload.single('listing[image]'),validateSchema,wrapAsync(controller.createListing));
 
  //edit route
  router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(controller.renderEditForm));
  //Update route
  router.patch("/:id",isLoggedIn,upload.single('listing[image]'),isOwner,validateSchema,wrapAsync(controller.updateListing));
  //Delete Route
  router.delete("/:id",isLoggedIn,isOwner,wrapAsync(controller.destroyListing));
  module.exports=router;