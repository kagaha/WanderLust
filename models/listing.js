const mongoose=require("mongoose");
const Review = require("./review.js");
const Schema=mongoose.Schema;
const listSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
    },
    image:{
        url:String,
        filename:String
    },
    price:{
        type:Number,
    },
    location:{
        type:String,
    },
    country:{
        type:String,
    },
    geometry: {
        type: {
          type: String, // Don't do `{ location: { type: String } }`
          enum: ['Point'], // 'location.type' must be 'Point'
          required: true
        },
        coordinates: {
          type: [Number],
          required: true
        }
    },
    category:[{
        type:String,
        enum:["Trending","Boats","Rooms","Camping","Towers","Beach","Pools","Mountains","castle","Farms","Mountain-city"],
    }],
    review:[{
        type:Schema.Types.ObjectId,
        ref:"Review"
    }],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
});
listSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
        await Review.deleteMany({_id:{$in: listing.review}});
    }
})

const Listing=mongoose.model("Listing",listSchema);
module.exports=Listing;