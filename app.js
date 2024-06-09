if(process.env.NODE_ENv!="production"){
require('dotenv').config();
}


const express=require("express");
const mongoose=require("mongoose");
const app=express();
const path=require("path");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.engine("ejs",ejsMate);
const ExpressError=require("./utils/expressError.js");
const listingRouter=require("./routes/listing.js");
const reviewRouter=require("./routes/review.js");
const userRouter=require("./routes/user.js");
const iconRouter=require("./routes/icons.js");
const session=require("express-session");
const MongoStore = require('connect-mongo');
const flash=require("connect-flash");
const passport=require("passport");
const LocalStrategy=require("passport-local");
const User=require("./models/user.js");
const dbUrl=process.env.ATLAS_URL;
main()
    .then((res)=>{
        console.log("Connected to db");
    })
    .catch(err => console.log(err));

async function main() {
  await mongoose.connect(dbUrl);

};
app.listen(8080,()=>{
  console.log("Listening to the port:8080");
});
app.get("/",(req,res)=>{
  res.redirect("/listings");
});
const store=MongoStore.create({
  mongoUrl:dbUrl,
  crypto: {
    secret:process.env.SECRET,
  },
  touchAfter:24*3600,
})
store.on("error",()=>{
  console.log("Error in MONGO Session store",err);
})

const sessionObject={
  store,
  secret:process.env.SECRET,
  resave:false,
  saveUninitialized:true,
  cookie:{
    exipres:Date.now()+7*24*60*60*1000,
    maxAge:7*24*60*60*1000,
    httpOnly:true
  }
};


app.use(session(sessionObject));
app.use(flash());

app.use(passport.initialize())
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
res.locals.msg=req.flash("success");
res.locals.error=req.flash("error");
res.locals.currUser=req.user;//Used to check whether u are login or not
next();
});
app.get("/listings/mountain",(req,res)=>{
  res.send("Done");
});
app.use("/listings",iconRouter);
// app.get("/getUser",async(req,res)=>{
//   let fakeUser=new User({
//     email:"Ruthik@gmail.com",
//     username:"Ruthik"
//   });
//   let ans=await User.register(fakeUser,"123456");
//   res.send(ans);
// })
app.use("/listings",listingRouter);
app.use("/listings/:id/review",reviewRouter);
app.use("/",userRouter);

app.get("/privacy",(req,res)=>{
  res.render("listings/privacy.ejs");
});
app.get("/terms",(req,res)=>{
  res.render("listings/privacy.ejs");
});
//error handling
app.all("*",(req,res,next)=>{
  next(new ExpressError(404,"Page Not found"));
})
app.use((err,req,res,next)=>{
 let {status=500,message="Something went wrong"}=err;
 res.status(status).render("error.ejs",{message});
});









// app.get("/listings",(req,res)=>{
//   let newListing= new Listing({
//     title:"My villa",
//     description:"Welcome to the villa!!",
//     proice:3000,
//     location:"Banglore karnataka",
//     country:"India"
//   });
//   newListing.save();
//   console.log("Succes saved");
//   res.send("Success added to db");
// });