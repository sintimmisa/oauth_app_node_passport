const router =require("express").Router();
const passport =require("passport");

//Login Routes
router.get("/login",(req,res)=>{
    res.render("login",{user:req.user});
});

//Logout Routes
router.get("/logout", (req, res) => {
  //handle with passport
  //res.send("Loggging Out");
  req.logout();
  res.redirect('/');
});

//Google Auth routes
router.get("/google", passport.authenticate("google", {
  scope:["profile","email"]
}));

//call back redirect
router.get("/google/callback",passport.authenticate("google"),(req,res)=>{
  //res.send(req.user)
  res.redirect("/profile/");
})
module.exports=router;