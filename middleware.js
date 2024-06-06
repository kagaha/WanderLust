const Listing=require("./models/listing.js");
const ExpressError=require("./utils/expressError.js");
const {listingSchema,reviewSchema}=require("./schema.js");
const Review=require("./models/review.js");



module.exports.isLoggedIn=(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl;
        req.flash("error","You are not Logged in!");
        return res.redirect("/login");
      }
      next();
};

module.exports.saveRedirectUrl=(req,res,next)=>{
  if(req.session.redirectUrl){
    res.locals.redirectUrl=req.session.redirectUrl;
  }
  next();
}
module.exports.isOwner=async(req,res,next)=>{
  let {id}=req.params;
  const list=await Listing.findById(id);
  if(!list.owner.equals(res.locals.currUser._id)){
    req.flash("error","You are not the owner of this Listing");
    return res.redirect(`/listings/${id}`)
  }
  next();
}

//Joi Schema to handle server side errors(from hopstoch etcc..)
module.exports.validateSchema=(req,res,next)=>{
  let {error}=listingSchema.validate(req.body);
  if(error){
    let errMsg=error.details.map((el)=>el.message).join(",");
    throw new ExpressError(400,errMsg);
  }
  else{
    next();
  }
};
//Joi Schema to handle server side errors(from hopstoch etcc..)
module.exports.validateReview=(req,res,next)=>{
  let {error}=reviewSchema.validate(req.body);
  if(error){
    let errMsg=error.details.map((el)=>el.message).join(",");
    throw new ExpressError(400,errMsg);
  }
  else{
    next();
  }
};

module.exports.isAuthor=async(req,res,next)=>{
  let {id,reviewId}=req.params;
  const review=await Review.findById(reviewId);
  if(!review.author.equals(res.locals.currUser._id)){
    req.flash("error","You are not the Author of this Review");
    return res.redirect(`/listings/${id}`)
  }
  next();
}