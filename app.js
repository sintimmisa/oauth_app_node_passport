const express =require("express");
const authRoutes = require('./routes/authRouter');
const profileRoutes = require("./routes/profileRouter");
const mongoose = require("mongoose");
require("./services/passport-setup");
const cookieSession = require("cookie-session");
const passport =require("passport");

const app =express();

//const port =5000;
const path = "locahost";
const keys=require("./config/keys");



//cookiesSession
app.use(cookieSession({
    masAge:24*60*60*1000,
    keys:[keys.session.sessionKeys]
}));

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

//Connecting to Mongo DB
mongoose.connect(keys.mongoDb.uri,{ useNewUrlParser: true },()=>{
    console.log("Connected to Mongo DB.")
} )


//Set up view engine- use app.set
app.set("view engine",'ejs');

//set up routes
app.use("/auth", authRoutes);//
app.use("/profile", profileRoutes);


//create a route for th ehome page
app.get("/", (req,res)=>{
    res.render("Home",{user:req.user});
});

//Listen event @ port 3000
const PORT = process.env.PORT || 5000;
app.listen(PORT, (req,res)=>{
    console.log("App Server Started at:",path+":"+PORT)
});